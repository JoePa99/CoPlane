/*
  # Add Attachment Support for Squawks
  
  1. Changes
    - Add attachment_url column to squawks table
    - Add policies for attachment management
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

-- Add policy for updating attachments if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'squawks' AND policyname = 'Users can update attachments'
  ) THEN
    CREATE POLICY "Users can update attachments"
      ON squawks FOR UPDATE
      TO authenticated
      USING (auth.uid() = reported_by)
      WITH CHECK (
        (attachment_url IS NULL OR attachment_url IS NOT NULL) AND
        status = 'OPEN'
      );
  END IF;
END $$;