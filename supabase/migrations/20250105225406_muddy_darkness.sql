/*
  # Update expense shares constraints

  1. Changes
    - Add foreign key constraint if it doesn't exist
    - Update profile_id column type to UUID if needed
*/

-- Check and update profile_id type if needed
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'expense_shares' 
    AND column_name = 'profile_id' 
    AND data_type != 'uuid'
  ) THEN
    ALTER TABLE expense_shares 
      ALTER COLUMN profile_id TYPE uuid USING profile_id::uuid;
  END IF;
END $$;