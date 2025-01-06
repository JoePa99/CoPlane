/*
  # Update Squawk Policies
  
  1. Changes
    - Add conditional policy creation
    - Only create policies if they don't already exist
    - Maintain existing policy logic
*/

-- Add policies only if they don't exist
DO $$ 
BEGIN
  -- View policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'squawks' AND policyname = 'Users can view all squawks'
  ) THEN
    CREATE POLICY "Users can view all squawks"
      ON squawks FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  -- Create policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'squawks' AND policyname = 'Users can create squawks'
  ) THEN
    CREATE POLICY "Users can create squawks"
      ON squawks FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = reported_by);
  END IF;

  -- Update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'squawks' AND policyname = 'Users can update own open squawks'
  ) THEN
    CREATE POLICY "Users can update own open squawks"
      ON squawks FOR UPDATE
      TO authenticated
      USING (
        auth.uid() = reported_by AND 
        status = 'OPEN'
      );
  END IF;

  -- Resolve policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'squawks' AND policyname = 'Users can resolve open squawks'
  ) THEN
    CREATE POLICY "Users can resolve open squawks"
      ON squawks FOR UPDATE
      TO authenticated
      USING (status = 'OPEN')
      WITH CHECK (
        status = 'CLOSED' AND 
        resolution IS NOT NULL AND
        resolved_at IS NOT NULL
      );
  END IF;
END $$;