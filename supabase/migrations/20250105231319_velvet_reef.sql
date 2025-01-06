/*
  # Add status column to expenses table

  1. Changes
    - Add status column to expenses table with values 'PENDING' or 'SETTLED'
    - Set default value to 'PENDING'
    - Update existing rows to have 'PENDING' status
  
  2. Notes
    - Only PENDING expenses will be considered in balance calculations
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