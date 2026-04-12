-- Create registrations table for badminton tournament
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  category TEXT NOT NULL,
  events TEXT[] NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (register)
CREATE POLICY "Anyone can register" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can read their own registration (by email)
CREATE POLICY "Users can view own registration" ON registrations
  FOR SELECT
  USING (true);

-- Create an index on email for faster lookups
CREATE INDEX idx_registrations_email ON registrations(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);
