/*
  # Update Squawks Table

  1. Changes
    - Drop existing table if it exists
    - Create squawks table with updated schema
    - Enable RLS
    - Add policies for authenticated users

  2. Security
    - Users can view all squawks
    - Users can create squawks
    - Users can resolve squawks they reported
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS squawks CASCADE;

-- Create squawks table
CREATE TABLE squawks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  priority text NOT NULL CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
  status text NOT NULL CHECK (status IN ('OPEN', 'CLOSED')),
  reported_by uuid NOT NULL REFERENCES profiles(id),
  resolution text,
  resolved_by uuid REFERENCES profiles(id),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE squawks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all squawks"
  ON squawks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create squawks"
  ON squawks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Users can resolve squawks"
  ON squawks FOR UPDATE
  TO authenticated
  USING (status = 'OPEN')
  WITH CHECK (
    status = 'CLOSED' AND 
    auth.uid() = resolved_by AND
    resolution IS NOT NULL AND
    resolved_at IS NOT NULL
  );