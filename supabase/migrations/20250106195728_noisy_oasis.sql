/*
  # Add Flight Logs Feature

  1. New Tables
    - `flight_logs`
      - `id` (uuid, primary key)
      - `date` (date, required)
      - `pilot_id` (uuid, references profiles)
      - `departure_airport` (text, required)
      - `arrival_airport` (text, required)
      - `hobbs_start` (decimal, required)
      - `hobbs_end` (decimal, required)
      - `description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `flight_logs` table
    - Add policies for authenticated users to:
      - View all flight logs
      - Create flight logs
      - Update own flight logs
      - Delete own flight logs
*/

-- Create flight_logs table
CREATE TABLE flight_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  pilot_id uuid REFERENCES profiles(id),
  departure_airport text NOT NULL,
  arrival_airport text NOT NULL,
  hobbs_start decimal(10,1) NOT NULL,
  hobbs_end decimal(10,1) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT hobbs_time_check CHECK (hobbs_end >= hobbs_start)
);

-- Enable RLS
ALTER TABLE flight_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all flight logs"
  ON flight_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create flight logs"
  ON flight_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own flight logs"
  ON flight_logs FOR UPDATE
  TO authenticated
  USING (pilot_id = auth.uid());

CREATE POLICY "Users can delete own flight logs"
  ON flight_logs FOR DELETE
  TO authenticated
  USING (pilot_id = auth.uid());