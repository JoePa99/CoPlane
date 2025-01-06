/*
  # Fix profile policies for registration

  1. Changes
    - Add policy to allow profile creation during registration
    - Update existing policies for better security

  2. Security
    - Enable RLS on profiles table
    - Allow authenticated users to view all profiles
    - Allow users to update their own profile
    - Allow profile creation during registration
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Create new policies
CREATE POLICY "Allow profile creation during registration"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);