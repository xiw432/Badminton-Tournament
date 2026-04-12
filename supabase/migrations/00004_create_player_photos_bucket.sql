-- Create storage bucket for player photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'player-photos',
  'player-photos',
  true,
  2097152, -- 2MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png']
) ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the bucket
CREATE POLICY "Anyone can view player photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'player-photos');

CREATE POLICY "Anyone can upload player photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'player-photos');

CREATE POLICY "Anyone can update player photos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'player-photos');

CREATE POLICY "Anyone can delete player photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'player-photos');