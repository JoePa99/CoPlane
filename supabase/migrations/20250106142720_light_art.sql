/*
  # Fix expense deletion policies

  1. Changes
    - Add DELETE policy for expenses table
    - Ensure authenticated users can delete their expenses
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can delete expenses" ON expenses;

-- Create new delete policy
CREATE POLICY "Users can delete expenses"
  ON expenses FOR DELETE
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM profiles WHERE id = auth.uid()
  ));