/*
  # Update expense shares constraints

  1. Changes
    - Add status column to expenses table if it doesn't exist
    - Update expense shares constraints to ensure valid percentages
  
  2. Validation
    - Check for existing columns before adding
    - Ensure proper constraints on percentage values
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

-- Update expense shares constraints
DO $$ 
BEGIN
  -- Drop existing constraint if it exists
  ALTER TABLE expense_shares
    DROP CONSTRAINT IF EXISTS expense_shares_percentage_check;
    
  -- Add new constraint
  ALTER TABLE expense_shares
    ADD CONSTRAINT expense_shares_percentage_check 
    CHECK (percentage >= 0 AND percentage <= 100);
END $$;