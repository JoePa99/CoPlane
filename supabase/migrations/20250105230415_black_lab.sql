/*
  # Fix expense recording functionality

  1. Changes
    - Add foreign key constraint to expense_shares
    - Update RLS policies for expenses and shares
*/

-- Update expense_shares foreign key
ALTER TABLE expense_shares
  DROP CONSTRAINT IF EXISTS expense_shares_profile_id_fkey,
  ADD CONSTRAINT expense_shares_profile_id_fkey 
    FOREIGN KEY (profile_id) 
    REFERENCES profiles(id)
    ON DELETE CASCADE;

-- Update expense policies
DROP POLICY IF EXISTS "Users can create expenses" ON expenses;
CREATE POLICY "Users can create expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE id = auth.uid()
  ));

-- Update expense shares policies
DROP POLICY IF EXISTS "Users can insert expense shares" ON expense_shares;
CREATE POLICY "Users can insert expense shares"
  ON expense_shares FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM expenses e
      WHERE e.id = expense_id
      AND e.paid_by = auth.uid()
    )
  );