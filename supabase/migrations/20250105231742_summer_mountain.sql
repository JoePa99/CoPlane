/*
  # Add expense status and update functionality

  1. Changes
    - Add status column to expenses table
    - Add policies for expense status updates
  
  2. Security
    - Add policy for expense status updates
    - Ensure proper access control for status updates
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
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'expenses' AND policyname = 'Users can update expense status'
  ) THEN
    CREATE POLICY "Users can update expense status"
      ON expenses FOR UPDATE
      TO authenticated
      USING (auth.uid() IN (
        SELECT id FROM profiles WHERE id = auth.uid()
      ))
      WITH CHECK (auth.uid() IN (
        SELECT id FROM profiles WHERE id = auth.uid()
      ));
  END IF;
END $$;