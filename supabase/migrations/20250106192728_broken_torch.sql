-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Users can manage own bookings" ON bookings;

-- Create new policies
CREATE POLICY "Users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (
    pilot_id = auth.uid() OR 
    pilot_id IS NULL OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (
    pilot_id = auth.uid() OR 
    pilot_id IS NULL OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid()
    )
  );