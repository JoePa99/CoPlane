/*
  # Fix cascade delete for expenses

  1. Changes
    - Add ON DELETE CASCADE to expense_shares foreign key constraint
    - Ensure proper cleanup of related records when deleting expenses
*/

-- First drop existing foreign key if it exists
ALTER TABLE expense_shares 
  DROP CONSTRAINT IF EXISTS expense_shares_expense_id_fkey;

-- Re-create foreign key with CASCADE
ALTER TABLE expense_shares
  ADD CONSTRAINT expense_shares_expense_id_fkey 
  FOREIGN KEY (expense_id) 
  REFERENCES expenses(id) 
  ON DELETE CASCADE;