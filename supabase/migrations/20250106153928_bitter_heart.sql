-- Drop and recreate only the update policy
DROP POLICY IF EXISTS "Users can update own open squawks" ON squawks;

-- Create new update policy that allows attachment updates
CREATE POLICY "Users can update own open squawks"
  ON squawks FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = reported_by AND 
    status = 'OPEN'
  )
  WITH CHECK (
    auth.uid() = reported_by AND 
    status = 'OPEN'
  );