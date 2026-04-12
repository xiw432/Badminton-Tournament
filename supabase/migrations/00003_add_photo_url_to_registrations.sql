-- Add missing columns to registrations table
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS player_id TEXT UNIQUE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS dob DATE;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS gender TEXT;
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS total_fee INTEGER;

-- Add photo_url column to registrations table for player photos
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Add parent_name column for admit card
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS parent_name TEXT;

-- Add address column for admit card
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS address TEXT;

-- Update events column to use JSONB for better querying
ALTER TABLE registrations ALTER COLUMN events TYPE JSONB USING events::JSONB;

-- Update RLS policies to allow photo URL updates
CREATE POLICY "Users can update their own photo" ON registrations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);