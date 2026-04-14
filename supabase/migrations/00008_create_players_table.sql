-- Create players table for tournament registration
CREATE TABLE IF NOT EXISTS players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  gender VARCHAR(20) NOT NULL,
  category VARCHAR(20) NOT NULL,
  parent_name VARCHAR(255),
  address TEXT,
  events JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_fee INTEGER DEFAULT 0,
  photo_url TEXT,
  pdf_url TEXT,
  payment_mode VARCHAR(20) DEFAULT 'cash',
  payment_status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_players_email ON players(email);

-- Create index on phone for faster lookups
CREATE INDEX IF NOT EXISTS idx_players_phone ON players(phone);

-- Create index on player_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_players_player_id ON players(player_id);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_players_created_at ON players(created_at DESC);

-- Enable Row Level Security
ALTER TABLE players ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON players
  FOR SELECT
  USING (true);

-- Create policy to allow public insert
CREATE POLICY "Allow public insert" ON players
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role full access
CREATE POLICY "Allow service role full access" ON players
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for player documents (admit cards)
INSERT INTO storage.buckets (id, name, public)
VALUES ('player-documents', 'player-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for player documents
CREATE POLICY "Allow public read access to player documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'player-documents');

CREATE POLICY "Allow authenticated upload to player documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'player-documents');

CREATE POLICY "Allow authenticated update to player documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'player-documents');
