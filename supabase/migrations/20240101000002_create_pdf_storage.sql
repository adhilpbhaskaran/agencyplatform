-- Create storage bucket for quote PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quotes-pdf',
  'quotes-pdf',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf']
);

-- Create policy to allow agents to upload PDFs for their own quotes
CREATE POLICY "Agents can upload PDFs for their quotes" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'quotes-pdf' AND
  auth.uid()::text IN (
    SELECT agent_id FROM quotes 
    WHERE quotes.id = (storage.filename(name))::uuid
  )
);

-- Create policy to allow agents to view PDFs for their own quotes
CREATE POLICY "Agents can view PDFs for their quotes" ON storage.objects
FOR SELECT USING (
  bucket_id = 'quotes-pdf' AND
  auth.uid()::text IN (
    SELECT agent_id FROM quotes 
    WHERE quotes.id = (storage.filename(name))::uuid
  )
);

-- Create policy to allow public access to PDFs (for client viewing)
CREATE POLICY "Public can view quote PDFs" ON storage.objects
FOR SELECT USING (bucket_id = 'quotes-pdf');

-- Add pdf_url column to quotes table if it doesn't exist
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Create index on pdf_url for faster queries
CREATE INDEX IF NOT EXISTS idx_quotes_pdf_url ON quotes(pdf_url) WHERE pdf_url IS NOT NULL;