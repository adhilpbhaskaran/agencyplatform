-- Create function to expire stale quotes based on time and FX drift
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
      
      -- If we have a current rate, check for drift
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

-- Create a wrapper function for cron job execution
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