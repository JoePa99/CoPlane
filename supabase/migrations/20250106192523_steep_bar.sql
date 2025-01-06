/*
  # Update bookings table schema
  
  1. Changes
    - Remove flight_type and pilot_type columns
    - Add pilot_id column with foreign key reference
    - Update RLS policies
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop old columns and constraints
ALTER TABLE bookings 
  DROP COLUMN IF EXISTS flight_type,
  DROP COLUMN IF EXISTS pilot_type;

-- Add pilot_id column
ALTER TABLE bookings 
  ADD COLUMN pilot_id uuid REFERENCES profiles(id);

-- Add constraint for other pilots
ALTER TABLE bookings
  ADD CONSTRAINT bookings_other_pilot_notes_check
  CHECK (
    (pilot_id IS NULL AND notes IS NOT NULL AND notes != '') OR
    (pilot_id IS NOT NULL)
  );

-- Update RLS policies
DROP POLICY IF EXISTS "Users can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Users can manage bookings" ON bookings;

CREATE POLICY "Users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage own bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (
    pilot_id = auth.uid() OR 
    pilot_id IS NULL
  )
  WITH CHECK (
    pilot_id = auth.uid() OR 
    pilot_id IS NULL
  );