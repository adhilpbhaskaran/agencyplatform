-- Enable the pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule hourly FX rate updates
-- This will call the Edge Function every hour at minute 0
SELECT cron.schedule(
  'hourly-fx-update',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT net.http_post(
    url := 'https://' || current_setting('app.settings.supabase_url', true) || '/functions/v1/fetch_exchange_rates',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.supabase_anon_key', true),
      'Content-Type', 'application/json'
    )
  );
  $$
);

-- Schedule daily quote expiry check
-- This will run every day at midnight (00:00)
SELECT cron.schedule(
  'daily-quote-expiry',
  '0 0 * * *', -- Every day at midnight
  'SELECT run_daily_quote_expiry();'
);

-- Create a function to manually trigger FX update (for testing)
CREATE OR REPLACE FUNCTION trigger_fx_update()
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE
  result json;
BEGIN
  -- Call the Edge Function manually
  SELECT net.http_post(
    url := 'https://' || current_setting('app.settings.supabase_url', true) || '/functions/v1/fetch_exchange_rates',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.settings.supabase_anon_key', true),
      'Content-Type', 'application/json'
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permission for manual trigger function
GRANT EXECUTE ON FUNCTION trigger_fx_update() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_fx_update() TO service_role;

-- Create a function to view current cron jobs
CREATE OR REPLACE FUNCTION get_cron_jobs()
RETURNS TABLE(
  jobid bigint,
  schedule text,
  command text,
  nodename text,
  nodeport integer,
  database text,
  username text,
  active boolean,
  jobname text
)
LANGUAGE sql
AS $$
  SELECT 
    jobid,
    schedule,
    command,
    nodename,
    nodeport,
    database,
    username,
    active,
    jobname
  FROM cron.job
  WHERE jobname IN ('hourly-fx-update', 'daily-quote-expiry');
$$;

-- Grant execute permission for cron jobs view function
GRANT EXECUTE ON FUNCTION get_cron_jobs() TO authenticated;
GRANT EXECUTE ON FUNCTION get_cron_jobs() TO service_role;

-- Create a function to manually run quote expiry (for testing)
CREATE OR REPLACE FUNCTION trigger_quote_expiry()
RETURNS TABLE(
  expired_count INTEGER,
  time_expired_count INTEGER,
  fx_expired_count INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Call the quote expiry function manually
  RETURN QUERY SELECT * FROM expire_stale_quotes();
END;
$$;

-- Grant execute permission for manual trigger function
GRANT EXECUTE ON FUNCTION trigger_quote_expiry() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_quote_expiry() TO service_role;

-- Insert initial configuration settings (these would typically be set via environment variables)
-- Note: In production, these should be set through Supabase dashboard or environment variables
INSERT INTO pg_settings (name, setting) VALUES 
  ('app.settings.supabase_url', 'your-project-url.supabase.co'),
  ('app.settings.supabase_anon_key', 'your-anon-key')
ON CONFLICT (name) DO UPDATE SET setting = EXCLUDED.setting;

-- Create a view to monitor automation status
CREATE OR REPLACE VIEW automation_status AS
SELECT 
  'Exchange Rates' as component,
  (
    SELECT COUNT(*) 
    FROM exchange_rates 
    WHERE last_updated >= NOW() - INTERVAL '2 hours'
  ) as recent_updates,
  (
    SELECT MAX(last_updated) 
    FROM exchange_rates
  ) as last_update,
  (
    SELECT COUNT(*) 
    FROM cron.job 
    WHERE jobname = 'hourly-fx-update' AND active = true
  ) as active_jobs
UNION ALL
SELECT 
  'Quote Expiry' as component,
  (
    SELECT COUNT(*) 
    FROM quotes 
    WHERE status = 'expired' 
    AND updated_at >= NOW() - INTERVAL '1 day'
  ) as recent_updates,
  (
    SELECT MAX(updated_at) 
    FROM quotes 
    WHERE status = 'expired'
  ) as last_update,
  (
    SELECT COUNT(*) 
    FROM cron.job 
    WHERE jobname = 'daily-quote-expiry' AND active = true
  ) as active_jobs;

-- Grant access to the automation status view
GRANT SELECT ON automation_status TO authenticated;
GRANT SELECT ON automation_status TO service_role;