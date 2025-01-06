/*
  # Maintenance System Updates

  1. Changes
    - Add maintenance type field to distinguish between quick logs and scheduled maintenance
    - Add priority field for scheduled maintenance
    - Add completion tracking fields
    - Add status field

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns one at a time with safe defaults
DO $$ 
BEGIN
  -- Add maintenance_type with a safe default
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'maintenance_logs' AND column_name = 'maintenance_type'
  ) THEN
    ALTER TABLE maintenance_logs 
      ADD COLUMN maintenance_type text NOT NULL DEFAULT 'SCHEDULED';
    
    ALTER TABLE maintenance_logs 
      ADD CONSTRAINT maintenance_type_check 
      CHECK (maintenance_type IN ('QUICK', 'SCHEDULED'));
  END IF;

  -- Add priority field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'maintenance_logs' AND column_name = 'priority'
  ) THEN
    ALTER TABLE maintenance_logs 
      ADD COLUMN priority text;
    
    ALTER TABLE maintenance_logs 
      ADD CONSTRAINT priority_check 
      CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH'));
  END IF;

  -- Add completion tracking fields
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'maintenance_logs' AND column_name = 'completion_date'
  ) THEN
    ALTER TABLE maintenance_logs 
      ADD COLUMN completion_date date,
      ADD COLUMN completed_by text;
  END IF;

  -- Add status field
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'maintenance_logs' AND column_name = 'status'
  ) THEN
    ALTER TABLE maintenance_logs 
      ADD COLUMN status text NOT NULL DEFAULT 'PENDING';
    
    ALTER TABLE maintenance_logs 
      ADD CONSTRAINT status_check 
      CHECK (status IN ('PENDING', 'COMPLETED'));
  END IF;
END $$;

-- Add validation constraints
DO $$ 
BEGIN
  -- Drop existing constraints if they exist
  ALTER TABLE maintenance_logs 
    DROP CONSTRAINT IF EXISTS quick_log_requirements,
    DROP CONSTRAINT IF EXISTS scheduled_maintenance_requirements;

  -- Add new constraints
  ALTER TABLE maintenance_logs
    ADD CONSTRAINT quick_log_requirements
    CHECK (
      (maintenance_type = 'QUICK' AND completion_date IS NOT NULL AND completed_by IS NOT NULL) OR
      maintenance_type = 'SCHEDULED'
    );

  ALTER TABLE maintenance_logs
    ADD CONSTRAINT scheduled_maintenance_requirements
    CHECK (
      (maintenance_type = 'SCHEDULED' AND priority IS NOT NULL) OR
      maintenance_type = 'QUICK'
    );
END $$;