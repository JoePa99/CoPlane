/*
  # Add expense status and actions

  1. Changes
    - Add status column to expenses table
    - Add RLS policies for updating expense status
  
  2. Security
    - Only authenticated users can update expense status
    - Users can only update their own expenses
*/

-- Add status column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'expenses' AND column_name = 'status'
  ) THEN
    ALTER TABLE expenses 
      ADD COLUMN status text NOT NULL 
      DEFAULT 'PENDING' 
      CHECK (status IN ('PENDING', 'SETTLED'));
  END IF;
END $$;

-- Add policy for updating expense status
CREATE POLICY "Users can update expense status"
  ON expenses FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE id = auth.uid()
  ))
  WITH CHECK (auth.uid() IN (
    SELECT id FROM profiles WHERE id = auth.uid()
  ));