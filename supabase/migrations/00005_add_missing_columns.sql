-- Add missing columns to registrations table for admit card functionality
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS player_id TEXT UNIQUE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS dob DATE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS total_fee INTEGER;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS parent_name TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS address TEXT;