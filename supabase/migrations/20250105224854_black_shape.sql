/*
  # Add expense shares functionality
  
  1. Changes
    - Add split_type column to expenses table
    - Create expense_shares table for tracking split percentages
    - Add RLS policies for expense_shares
  
  2. Security
    - Enable RLS on expense_shares table
    - Add policies for authenticated users to view and insert shares
*/

-- Add split_type to expenses if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'expenses' AND column_name = 'split_type'
  ) THEN
    ALTER TABLE expenses ADD COLUMN split_type text NOT NULL CHECK (split_type IN ('EQUAL', 'CUSTOM'));
  END IF;
END $$;

-- Create expense_shares table if it doesn't exist
CREATE TABLE IF NOT EXISTS expense_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id uuid REFERENCES expenses(id) ON DELETE CASCADE,
  profile_id text NOT NULL,
  percentage decimal(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE expense_shares ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view all expense shares" ON expense_shares;
  DROP POLICY IF EXISTS "Users can insert expense shares" ON expense_shares;
END $$;

-- Add RLS policies
CREATE POLICY "Users can view all expense shares"
  ON expense_shares FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert expense shares"
  ON expense_shares FOR INSERT
  TO authenticated
  WITH CHECK (true);