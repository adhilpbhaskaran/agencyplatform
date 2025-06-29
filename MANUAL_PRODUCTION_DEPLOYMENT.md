# Manual Production Deployment Guide

## 🚀 Complete Automation System Deployment

**Production Environment:** https://mjgenczhddoglqupyhxg.supabase.co

---

## Step 1: Database Setup (SQL Editor)

1. **Open Supabase Dashboard**
   - Go to: https://mjgenczhddoglqupyhxg.supabase.co
   - Navigate to **SQL Editor**

2. **Execute the Production Deployment Script**
   - Copy the entire contents of `PRODUCTION_DEPLOYMENT_SCRIPT.sql`
   - Paste into SQL Editor
   - Click **Run** to execute all functions and cron jobs

---

## Step 2: Edge Function Deployment (Manual)

### Option A: Using Supabase Dashboard

1. **Navigate to Edge Functions**
   - Go to **Functions** in the Supabase dashboard
   - Click **Create Function**
   - Name: `fetch_exchange_rates`

2. **Upload Function Code**
   - Copy the contents from `supabase/functions/fetch_exchange_rates/index.ts`
   - Paste into the function editor
   - Click **Deploy**

### Option B: Manual Function Creation

If dashboard upload fails, create the function manually:

```sql
-- Create a simple trigger function that calls external API
CREATE OR REPLACE FUNCTION fetch_exchange_rates_manual()
RETURNS json
LANGUAGE plpgsql
AS $$
DECLARE
  api_response json;
  rate_data json;
  currency_code text;
BEGIN
  -- Fetch exchange rates from external API
  SELECT net.http_get('https://api.exchangerate.host/latest?base=IDR&symbols=USD,INR,AED') INTO api_response;
  
  -- Extract rates from response
  rate_data := api_response->'response'->'body'::text::json->'rates';
  
  -- Update USD rate
  INSERT INTO exchange_rates (currency_code, rate_to_idr, last_updated)
  VALUES ('USD', (rate_data->>'USD')::decimal, NOW())
  ON CONFLICT (currency_code) 
  DO UPDATE SET 
    rate_to_idr = EXCLUDED.rate_to_idr,
    last_updated = EXCLUDED.last_updated;
  
  -- Update INR rate
  INSERT INTO exchange_rates (currency_code, rate_to_idr, last_updated)
  VALUES ('INR', (rate_data->>'INR')::decimal, NOW())
  ON CONFLICT (currency_code) 
  DO UPDATE SET 
    rate_to_idr = EXCLUDED.rate_to_idr,
    last_updated = EXCLUDED.last_updated;
  
  -- Update AED rate
  INSERT INTO exchange_rates (currency_code, rate_to_idr, last_updated)
  VALUES ('AED', (rate_data->>'AED')::decimal, NOW())
  ON CONFLICT (currency_code) 
  DO UPDATE SET 
    rate_to_idr = EXCLUDED.rate_to_idr,
    last_updated = EXCLUDED.last_updated;
  
  RETURN json_build_object(
    'success', true,
    'updated_at', NOW(),
    'rates_updated', 3
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION fetch_exchange_rates_manual() TO authenticated;
GRANT EXECUTE ON FUNCTION fetch_exchange_rates_manual() TO service_role;

-- Update the cron job to use the manual function
SELECT cron.unschedule('hourly-fx-update');
SELECT cron.schedule(
  'hourly-fx-update',
  '0 * * * *',
  'SELECT fetch_exchange_rates_manual();'
);
```

---

## Step 3: Verification & Testing

### Database Verification

Run these queries in SQL Editor to verify setup:

```sql
-- 1. Check extensions
SELECT extname FROM pg_extension WHERE extname IN ('pg_cron', 'http');

-- 2. Check functions
SELECT proname FROM pg_proc WHERE proname IN (
  'expire_stale_quotes', 
  'run_daily_quote_expiry', 
  'trigger_fx_update', 
  'trigger_quote_expiry', 
  'get_cron_jobs',
  'fetch_exchange_rates_manual'
);

-- 3. Check cron jobs
SELECT jobname, schedule, active FROM cron.job 
WHERE jobname IN ('hourly-fx-update', 'daily-quote-expiry');

-- 4. Test manual FX update
SELECT trigger_fx_update();
-- OR if using manual function:
SELECT fetch_exchange_rates_manual();

-- 5. Test quote expiry
SELECT * FROM trigger_quote_expiry();

-- 6. Check automation status
SELECT * FROM automation_status;

-- 7. View exchange rates
SELECT * FROM exchange_rates ORDER BY last_updated DESC;
```

---

## Step 4: Frontend Configuration

### Update Environment Variables

Ensure your `.env.local` contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mjgenczhddoglqupyhxg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ2VuY3poZGRvZ2xxdXB5aHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjY2ODAsImV4cCI6MjA2NjcwMjY4MH0.FgJxrW-R379VQV4gdHiAFv0sywgW7iPzrit6FlsvQWY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qZ2VuY3poZGRvZ2xxdXB5aHhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTEyNjY4MCwiZXhwIjoyMDY2NzAyNjgwfQ.sDNop8X4zIS9LYkDpCT51uS4qPrYX9ARXxbajc2g9a8
```

### Test Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/automation`
3. Verify all components show correct status
4. Test manual triggers

---

## Step 5: Production Monitoring

### Daily Checks

```sql
-- Check recent FX updates
SELECT 
  currency_code,
  rate_to_idr,
  last_updated,
  NOW() - last_updated as age
FROM exchange_rates 
ORDER BY last_updated DESC;

-- Check recent quote expiries
SELECT 
  COUNT(*) as expired_today,
  status
FROM quotes 
WHERE updated_at >= CURRENT_DATE
AND status = 'expired'
GROUP BY status;

-- Check cron job execution
SELECT 
  jobname,
  start_time,
  end_time,
  return_message
FROM cron.job_run_details 
WHERE start_time >= CURRENT_DATE - INTERVAL '1 day'
ORDER BY start_time DESC;
```

### Weekly Maintenance

```sql
-- Clean old cron job logs (keep last 30 days)
DELETE FROM cron.job_run_details 
WHERE start_time < NOW() - INTERVAL '30 days';

-- Verify automation health
SELECT * FROM automation_status;

-- Check for any failed jobs
SELECT * FROM cron.job_run_details 
WHERE return_message IS NOT NULL 
AND start_time >= NOW() - INTERVAL '7 days'
ORDER BY start_time DESC;
```

---

## 🎯 Success Criteria

✅ **Database Functions**: All 6 functions created successfully  
✅ **Cron Jobs**: 2 scheduled jobs active  
✅ **Extensions**: pg_cron and http enabled  
✅ **FX Updates**: Manual trigger returns success  
✅ **Quote Expiry**: Manual trigger processes quotes  
✅ **Admin Dashboard**: All status indicators green  
✅ **Exchange Rates**: Current rates displayed  

---

## 🚨 Troubleshooting

### Common Issues

1. **Cron Jobs Not Running**
   ```sql
   -- Check if jobs are active
   SELECT * FROM cron.job WHERE active = false;
   
   -- Reactivate if needed
   SELECT cron.alter_job(jobid, active := true) 
   FROM cron.job WHERE jobname = 'hourly-fx-update';
   ```

2. **FX Updates Failing**
   ```sql
   -- Test external API access
   SELECT net.http_get('https://api.exchangerate.host/latest?base=IDR&symbols=USD');
   
   -- Check recent errors
   SELECT * FROM cron.job_run_details 
   WHERE jobname = 'hourly-fx-update' 
   AND return_message IS NOT NULL;
   ```

3. **Quote Expiry Issues**
   ```sql
   -- Check quotes ready for expiry
   SELECT COUNT(*) FROM quotes 
   WHERE status = 'sent' 
   AND (expires_at < NOW() OR exchange_rate_used IS NOT NULL);
   
   -- Run manual expiry with logging
   SELECT * FROM expire_stale_quotes();
   ```

---

## 🎉 Deployment Complete!

Your automation system is now live and will:
- ✅ Update exchange rates every hour
- ✅ Check for expired quotes daily at midnight
- ✅ Protect against currency fluctuation risks
- ✅ Provide full admin monitoring and control

The platform is now **fully automated and production-ready**! 🚀