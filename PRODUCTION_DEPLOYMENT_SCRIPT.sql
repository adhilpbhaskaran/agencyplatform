-- =====================================================
-- PRODUCTION DEPLOYMENT SCRIPT FOR AUTOMATION SYSTEM
-- =====================================================
-- Execute this script in your Supabase SQL Editor
-- Project: https://mjgenczhddoglqupyhxg.supabase.co
-- =====================================================

-- STEP 1: Enable Required Extensions
-- =====================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS http;

-- STEP 2: Create Quote Expiry Function
-- =====================================================
CREATE OR REPLACE FUNCTION expire_stale_quotes()
RETURNS TABLE(
  expired_count INTEGER,
  time_expired_count INTEGER,
  fx_expired_count INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
  quote_record RECORD;
  current_rate DECIMAL;
  rate_difference_percent DECIMAL;
  fx_threshold_percent DECIMAL := 2.0; -- 2% threshold for FX drift
  total_expired INTEGER := 0;
  time_expired INTEGER := 0;
  fx_expired INTEGER := 0;
  expiry_reason TEXT;
BEGIN
  -- Log function start
  RAISE NOTICE 'Starting expire_stale_quotes function at %', NOW();
  
  -- Loop through all quotes with status 'sent'
  FOR quote_record IN 
    SELECT 
      q.id,
      q.quote_number,
      q.agent_id,
      q.expires_at,
      q.exchange_rate_used,
      q.currency_code,
      q.created_at
    FROM quotes q
    WHERE q.status = 'sent'
  LOOP
    expiry_reason := NULL;
    
    -- Check 1: Time-based expiry
    IF quote_record.expires_at IS NOT NULL AND quote_record.expires_at < NOW() THEN
      expiry_reason := 'time_expired';
      time_expired := time_expired + 1;
      
    -- Check 2: FX drift expiry (only if not already expired by time)
    ELSIF quote_record.exchange_rate_used IS NOT NULL AND quote_record.currency_code IS NOT NULL THEN
      -- Get current exchange rate for the quote's currency
      SELECT rate_to_idr INTO current_rate
      FROM exchange_rates
      WHERE currency_code = quote_record.currency_code
      AND last_updated >= NOW() - INTERVAL '24 hours'; -- Only use recent rates
      
      IF current_rate IS NOT NULL THEN
        -- Calculate percentage difference
        rate_difference_percent := ABS((current_rate - quote_record.exchange_rate_used) / quote_record.exchange_rate_used * 100);
        
        -- Log the rate comparison for debugging
        RAISE NOTICE 'Quote %: Original rate %, Current rate %, Difference %', 
          quote_record.quote_number, 
          quote_record.exchange_rate_used, 
          current_rate, 
          rate_difference_percent;
        
        -- Check if difference exceeds threshold
        IF rate_difference_percent > fx_threshold_percent THEN
          expiry_reason := 'fx_drift';
          fx_expired := fx_expired + 1;
        END IF;
      END IF;
    END IF;
    
    -- If quote should be expired, update it and create notification
    IF expiry_reason IS NOT NULL THEN
      -- Update quote status to expired
      UPDATE quotes 
      SET 
        status = 'expired',
        updated_at = NOW()
      WHERE id = quote_record.id;
      
      -- Create notification for the agent
      INSERT INTO notifications (
        type,
        title,
        message,
        quote_id,
        created_at
      ) VALUES (
        'quote_expired',
        'Quote Expired',
        CASE 
          WHEN expiry_reason = 'time_expired' THEN
            'Quote ' || quote_record.quote_number || ' has expired due to time limit.'
          WHEN expiry_reason = 'fx_drift' THEN
            'Quote ' || quote_record.quote_number || ' has expired due to significant currency fluctuation (' || 
            ROUND(rate_difference_percent, 2) || '% change).'
          ELSE
            'Quote ' || quote_record.quote_number || ' has expired.'
        END,
        quote_record.id,
        NOW()
      );
      
      total_expired := total_expired + 1;
      
      -- Log the expiry
      RAISE NOTICE 'Expired quote % due to %', quote_record.quote_number, expiry_reason;
    END IF;
  END LOOP;
  
  -- Log function completion
  RAISE NOTICE 'Completed expire_stale_quotes: % total expired (% time, % FX)', 
    total_expired, time_expired, fx_expired;
  
  -- Return summary
  RETURN QUERY SELECT total_expired, time_expired, fx_expired;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION expire_stale_quotes() TO authenticated;
GRANT EXECUTE ON FUNCTION expire_stale_quotes() TO service_role;

-- STEP 3: Create Wrapper Function for Cron Jobs
-- =====================================================
CREATE OR REPLACE FUNCTION run_daily_quote_expiry()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  result_record RECORD;
BEGIN
  -- Call the main expiry function
  SELECT * INTO result_record FROM expire_stale_quotes();
  
  -- Log the results
  RAISE NOTICE 'Daily quote expiry completed: % quotes expired (% time-based, % FX-based)',
    result_record.expired_count,
    result_record.time_expired_count,
    result_record.fx_expired_count;
END;
$$;

-- Grant execute permission for the wrapper function
GRANT EXECUTE ON FUNCTION run_daily_quote_expiry() TO authenticated;
GRANT EXECUTE ON FUNCTION run_daily_quote_expiry() TO service_role;

-- STEP 4: Create Manual Trigger Functions
-- =====================================================

-- Function to manually trigger FX update
CREATE OR REPLACE FUNCTION trigger_fx_update()
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE
  result json;
BEGIN
  -- Call the Edge Function manually
  SELECT net.http_post(
    url := 'https://mjgenczhddoglqupyhxg.supabase.co/functions/v1/fetch_exchange_rates',
    headers := jsonb_build_object(
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ2VuY3poZGRvZ2xxdXB5aHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjY2ODAsImV4cCI6MjA2NjcwMjY4MH0.FgJxrW-R379VQV4gdHiAFv0sywgW7iPzrit6FlsvQWY',
      'Content-Type', 'application/json'
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Grant execute permission for manual trigger function
GRANT EXECUTE ON FUNCTION trigger_fx_update() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_fx_update() TO service_role;

-- Function to manually trigger quote expiry
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

-- Function to view current cron jobs
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

-- STEP 5: Create Automation Status View
-- =====================================================
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

-- STEP 6: Schedule Cron Jobs
-- =====================================================

-- Schedule hourly FX rate updates
SELECT cron.schedule(
  'hourly-fx-update',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT net.http_post(
    url := 'https://mjgenczhddoglqupyhxg.supabase.co/functions/v1/fetch_exchange_rates',
    headers := jsonb_build_object(
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ2VuY3poZGRvZ2xxdXB5aHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjY2ODAsImV4cCI6MjA2NjcwMjY4MH0.FgJxrW-R379VQV4gdHiAFv0sywgW7iPzrit6FlsvQWY',
      'Content-Type', 'application/json'
    )
  );
  $$
);

-- Schedule daily quote expiry check
SELECT cron.schedule(
  'daily-quote-expiry',
  '0 0 * * *', -- Every day at midnight
  'SELECT run_daily_quote_expiry();'
);

-- STEP 7: Verification Queries
-- =====================================================

-- Check if extensions are enabled
SELECT extname FROM pg_extension WHERE extname IN ('pg_cron', 'http');

-- Check if functions are created
SELECT proname FROM pg_proc WHERE proname IN (
  'expire_stale_quotes', 
  'run_daily_quote_expiry', 
  'trigger_fx_update', 
  'trigger_quote_expiry', 
  'get_cron_jobs'
);

-- Check if cron jobs are scheduled
SELECT jobname, schedule, active FROM cron.job WHERE jobname IN ('hourly-fx-update', 'daily-quote-expiry');

-- Check automation status
SELECT * FROM automation_status;

-- =====================================================
-- DEPLOYMENT COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Deploy the Edge Function using: supabase functions deploy fetch_exchange_rates
-- 2. Test manual triggers: SELECT trigger_fx_update(); SELECT * FROM trigger_quote_expiry();
-- 3. Monitor automation status via the admin dashboard at /admin/automation
-- =====================================================