/*
  # Initial COPLANE Schema

  1. Tables
    - users (managed by Supabase Auth)
    - profiles
      - id (references auth.users)
      - full_name
      - email
      - created_at
    - expenses
      - id
      - date
      - amount
      - category
      - description
      - paid_by (references profiles)
      - split_type
      - created_at
    - expense_shares
      - id
      - expense_id
      - profile_id
      - percentage
      - amount
      - created_at
    - squawks
      - id
      - date
      - description
      - priority
      - status
      - reported_by
      - notes
      - created_at
    - maintenance_logs
      - id
      - title
      - type
      - schedule_type
      - hobbs_time
      - due_date
      - mechanic_name
      - description
      - notes
      - created_at
    - bookings
      - id
      - flight_type
      - title
      - start_time
      - end_time
      - pilot_id
      - notes
      - created_at

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  amount decimal(10,2) NOT NULL,
  category text NOT NULL,
  description text,
  paid_by uuid REFERENCES profiles(id) NOT NULL,
  split_type text NOT NULL CHECK (split_type IN ('EQUAL', 'CUSTOM')),
  created_at timestamptz DEFAULT now()
);

-- Expense shares table
CREATE TABLE expense_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id uuid REFERENCES expenses(id) NOT NULL,
  profile_id uuid REFERENCES profiles(id) NOT NULL,
  percentage decimal(5,2) NOT NULL,
  amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Squawks table
CREATE TABLE squawks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  description text NOT NULL,
  priority text NOT NULL CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')),
  status text NOT NULL CHECK (status IN ('OPEN', 'CLOSED')),
  reported_by uuid REFERENCES profiles(id) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Maintenance logs table
CREATE TABLE maintenance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  schedule_type text NOT NULL CHECK (schedule_type IN ('DATE', 'HOBBS')),
  hobbs_time decimal(10,1),
  due_date date,
  mechanic_name text NOT NULL,
  description text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  flight_type text NOT NULL,
  title text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  pilot_id uuid REFERENCES profiles(id) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE squawks ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view all expenses"
  ON expenses FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create expenses"
  ON expenses FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view all expense shares"
  ON expense_shares FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create expense shares"
  ON expense_shares FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view all squawks"
  ON squawks FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create and update squawks"
  ON squawks FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view all maintenance logs"
  ON maintenance_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create and update maintenance logs"
  ON maintenance_logs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);