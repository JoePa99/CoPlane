/*
  # Add Attachment Support for Squawks

  1. Changes
    - Add attachment_url column to squawks table
    - Add delete policy for squawks

  2. Security
    - Users can delete their own squawks
*/

-- Add attachment_url column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'squawks' AND column_name = 'attachment_url'
  ) THEN
    ALTER TABLE squawks ADD COLUMN attachment_url text;
  END IF;
END $$;

-- Add delete policy if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'squawks' AND policyname = 'Users can delete squawks'
  ) THEN
    CREATE POLICY "Users can delete squawks"
      ON squawks FOR DELETE
      TO authenticated
      USING (auth.uid() = reported_by);
  END IF;
END $$;