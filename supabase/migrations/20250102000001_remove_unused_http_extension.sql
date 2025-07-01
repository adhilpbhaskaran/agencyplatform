-- =================================================================
-- REMOVE UNUSED HTTP EXTENSION ONLY
-- This migration removes only the http extension which is not needed
-- in the current v8.3 schema, while preserving all required types
-- =================================================================

-- Drop unused HTTP extension only
DROP EXTENSION IF EXISTS "http";

-- Success message
SELECT 'HTTP extension removed successfully!' as message;