/*
  # Clear all user data

  1. Changes
    - Remove all data from auth.users
    - Remove all data from profiles
    - Remove all data from related tables
    
  2. Security
    - Maintains table structure
    - Preserves RLS policies
*/

-- Clear data from child tables first
DELETE FROM expense_shares;
DELETE FROM expenses;
DELETE FROM maintenance_logs;
DELETE FROM squawks;
DELETE FROM bookings;

-- Clear profiles table
DELETE FROM profiles;

-- Clear auth.users table (requires superuser privileges)
DELETE FROM auth.users;