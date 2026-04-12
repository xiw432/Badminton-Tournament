-- Create a simple items table for the example
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations for now" ON items
  FOR ALL
  USING (true)
  WITH CHECK (true);
