-- Create asset_gallery table for managing images for hotels, rooms, and activities
CREATE TABLE asset_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_url TEXT NOT NULL,
  alt_text TEXT,
  entity_type TEXT NOT NULL, -- e.g., 'hotel', 'hotel_room', 'activity'
  related_entity_id UUID NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create an index for efficient lookups
CREATE INDEX idx_asset_gallery_entity ON asset_gallery(entity_type, related_entity_id);

-- Add RLS policies for asset_gallery
ALTER TABLE asset_gallery ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all asset gallery items
CREATE POLICY "Allow authenticated users to read asset gallery" ON asset_gallery
  FOR SELECT TO authenticated USING (true);

-- Allow admin users to manage asset gallery items
CREATE POLICY "Allow admin users to manage asset gallery" ON asset_gallery
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Insert some demo asset gallery data
INSERT INTO asset_gallery (asset_url, alt_text, entity_type, related_entity_id, display_order) VALUES
  ('https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'Luxury villa with infinity pool', 'hotel', (SELECT id FROM hotels WHERE name = 'The Mulia' LIMIT 1), 1),
  ('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', 'Beachfront resort view', 'hotel', (SELECT id FROM hotels WHERE name = 'The Mulia' LIMIT 1), 2),
  ('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 'Traditional Balinese architecture', 'hotel', (SELECT id FROM hotels WHERE name = 'COMO Shambhala Estate' LIMIT 1), 1),
  ('https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800', 'White water rafting adventure', 'activity', (SELECT id FROM activities WHERE name = 'White Water Rafting' LIMIT 1), 1),
  ('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800', 'Traditional Balinese dance performance', 'activity', (SELECT id FROM activities WHERE name = 'Traditional Dance Show' LIMIT 1), 1);