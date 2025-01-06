/*
  # Add expense status and update constraints

  1. Changes
    - Add status column to expenses table with PENDING/SETTLED options
    - Add validation to ensure expense shares total 100%
    - Add trigger to validate expense shares on insert/update

  2. Security
    - Add policy for updating expense status
    - Ensure proper access controls for status updates
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

-- Create function to validate expense shares total 100%
CREATE OR REPLACE FUNCTION validate_expense_shares()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if shares total 100% for each expense
  IF EXISTS (
    SELECT expense_id, SUM(percentage)
    FROM expense_shares
    WHERE expense_id = NEW.expense_id
    GROUP BY expense_id
    HAVING ABS(SUM(percentage) - 100) > 0.01
  ) THEN
    RAISE EXCEPTION 'Expense shares must total 100%%';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for expense shares validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'validate_expense_shares_trigger'
  ) THEN
    CREATE TRIGGER validate_expense_shares_trigger
      AFTER INSERT OR UPDATE ON expense_shares
      FOR EACH ROW
      EXECUTE FUNCTION validate_expense_shares();
  END IF;
END $$;

-- Add policy for updating expense status if it doesn't exist
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