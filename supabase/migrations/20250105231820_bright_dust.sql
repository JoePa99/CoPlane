/*
  # Update expense shares constraints

  1. Changes
    - Add percentage validation for expense shares
    - Ensure percentages are between 0 and 100
  
  2. Validation
    - Drop existing constraint if present
    - Add new constraint with proper validation range
*/

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