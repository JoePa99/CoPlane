/*
  # Add receipt_url to expenses table

  1. Changes
    - Add receipt_url column to expenses table
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'expenses' AND column_name = 'receipt_url'
  ) THEN
    ALTER TABLE expenses ADD COLUMN receipt_url text;
  END IF;
END $$;