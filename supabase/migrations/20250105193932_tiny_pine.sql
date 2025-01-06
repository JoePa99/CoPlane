/*
  # Update bookings schema for pilot types

  1. Changes
    - Remove pilot_id foreign key constraint
    - Add pilot_type column with allowed values
    - Make flight_type required with allowed values
    - Add notes for pilot name when type is 'other'

  2. Security
    - Maintain existing RLS policies
*/

-- Modify bookings table
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_pilot_id_fkey;
ALTER TABLE bookings DROP COLUMN IF EXISTS pilot_id;

-- Add pilot_type column
ALTER TABLE bookings ADD COLUMN pilot_type text NOT NULL CHECK (pilot_type IN ('joe', 'sean', 'other'));

-- Add check constraint for flight_type
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'bookings_flight_type_check'
  ) THEN
    ALTER TABLE bookings ADD CONSTRAINT bookings_flight_type_check
      CHECK (flight_type IN ('joe', 'sean', 'other'));
  END IF;
END $$;

-- Make notes required when pilot_type is 'other'
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_other_pilot_notes_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_other_pilot_notes_check
  CHECK (
    (pilot_type = 'other' AND notes IS NOT NULL AND notes != '') OR
    (pilot_type != 'other')
  );