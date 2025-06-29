# Platform Automation & Intelligence Deployment Guide

## Overview

This guide covers the deployment of Phase 5: Platform Automation & Intelligence, which includes:

1. **Automated FX Engine**: Hourly exchange rate updates
2. **Quote Expiry Monitor**: Daily automated quote expiration based on time and FX drift
3. **Admin Dashboard**: Monitoring and manual control interface

## Prerequisites

- Supabase project with database access
- Supabase Edge Functions enabled
- pg_cron extension enabled in your Supabase database
- Admin access to Supabase dashboard

## Deployment Steps

### 1. Database Migrations

Apply the following migrations in order:

```bash
# Apply the expire_stale_quotes function
psql -h <your-db-host> -U postgres -d postgres -f supabase/migrations/20240101000003_expire_stale_quotes_function.sql

# Apply the cron jobs setup
psql -h <your-db-host> -U postgres -d postgres -f supabase/migrations/20240101000004_setup_cron_jobs.sql
```

Or apply via Supabase Dashboard:
1. Go to SQL Editor in your Supabase dashboard
2. Copy and execute the contents of each migration file

### 2. Deploy Edge Function

```bash
# Deploy the FX rates fetcher function
supabase functions deploy fetch_exchange_rates

# Set environment variables for the function
supabase secrets set SUPABASE_URL=your-project-url.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Configure Cron Jobs

Update the cron job configuration with your actual Supabase URL and keys:

```sql
-- Update the FX update cron job with your actual URL
SELECT cron.unschedule('hourly-fx-update');
SELECT cron.schedule(
  'hourly-fx-update',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR-PROJECT-REF.supabase.co/functions/v1/fetch_exchange_rates',
    headers := jsonb_build_object(
      'Authorization', 'Bearer YOUR-ANON-KEY',
      'Content-Type', 'application/json'
    )
  );
  $$
);
```

### 4. Enable Required Extensions

Ensure these extensions are enabled in your Supabase database:

```sql
-- Enable pg_cron for scheduled jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Enable http extension for API calls
CREATE EXTENSION IF NOT EXISTS http;
```

### 5. Test the System

#### Manual Testing

```sql
-- Test FX update manually
SELECT trigger_fx_update();

-- Test quote expiry manually
SELECT * FROM trigger_quote_expiry();

-- Check automation status
SELECT * FROM automation_status;

-- View current cron jobs
SELECT * FROM get_cron_jobs();
```

#### Frontend Testing

1. Navigate to `/admin/automation` in your application
2. Verify all status indicators show correct information
3. Test manual triggers for both FX updates and quote expiry
4. Confirm exchange rates are displayed correctly

## Configuration

### Exchange Rate Settings

- **Update Frequency**: Every hour (configurable in cron schedule)
- **Supported Currencies**: USD, INR, AED (configurable in Edge Function)
- **Data Source**: exchangerate.host API
- **Base Currency**: IDR

### Quote Expiry Settings

- **Check Frequency**: Daily at midnight
- **FX Drift Threshold**: 2% (configurable in database function)
- **Time-based Expiry**: Based on `expires_at` field
- **Notification**: Automatic notifications created for expired quotes

## Monitoring

### Admin Dashboard Features

- **Real-time Status**: View automation component health
- **Manual Controls**: Trigger updates and expiry checks manually
- **Exchange Rates**: Current rates with last update timestamps
- **Cron Jobs**: Status of scheduled automation tasks

### Database Views

```sql
-- Monitor automation health
SELECT * FROM automation_status;

-- Check recent exchange rate updates
SELECT * FROM exchange_rates ORDER BY last_updated DESC;

-- View expired quotes from last 24 hours
SELECT * FROM quotes 
WHERE status = 'expired' 
AND updated_at >= NOW() - INTERVAL '1 day';
```

## Troubleshooting

### Common Issues

1. **Cron Jobs Not Running**
   - Check if pg_cron extension is enabled
   - Verify cron jobs are active: `SELECT * FROM cron.job;`
   - Check database logs for errors

2. **FX Updates Failing**
   - Verify Edge Function is deployed correctly
   - Check function logs in Supabase dashboard
   - Ensure API keys are set correctly
   - Test external API access: `curl https://api.exchangerate.host/latest?base=IDR`

3. **Quote Expiry Not Working**
   - Check function permissions
   - Verify quotes have proper `expires_at` and `exchange_rate_used` values
   - Test function manually: `SELECT * FROM expire_stale_quotes();`

### Logs and Debugging

```sql
-- Check cron job execution history
SELECT * FROM cron.job_run_details 
WHERE jobname IN ('hourly-fx-update', 'daily-quote-expiry')
ORDER BY start_time DESC;

-- Enable function logging
SET log_statement = 'all';
SET log_min_messages = 'notice';
```

## Security Considerations

1. **API Keys**: Store Supabase keys securely using Supabase secrets
2. **Function Access**: Edge Functions use service role key for database access
3. **Cron Jobs**: Run with appropriate database permissions
4. **External APIs**: Monitor rate limits and implement error handling

## Performance Optimization

1. **Exchange Rates**: Cached for 1 hour, only updated when necessary
2. **Quote Expiry**: Runs daily to minimize database load
3. **Indexing**: Ensure proper indexes on `quotes.status`, `quotes.expires_at`
4. **Batch Processing**: Quote expiry processes all quotes in single transaction

## Maintenance

### Regular Tasks

1. **Monitor Logs**: Check Edge Function and cron job logs weekly
2. **Verify Data**: Ensure exchange rates are updating correctly
3. **Performance**: Monitor database performance during automation runs
4. **Backup**: Regular backups of exchange_rates table

### Updates

1. **Currency Support**: Add new currencies by updating Edge Function
2. **Thresholds**: Adjust FX drift threshold in database function
3. **Schedules**: Modify cron schedules as needed
4. **Notifications**: Customize notification messages in database function

## API Endpoints

The automation system provides these admin API endpoints:

- `GET /api/admin/automation/status` - Automation component status
- `GET /api/admin/automation/exchange-rates` - Current exchange rates
- `GET /api/admin/automation/cron-jobs` - Scheduled job status
- `POST /api/admin/automation/trigger-fx-update` - Manual FX update
- `POST /api/admin/automation/trigger-quote-expiry` - Manual quote expiry

## Success Metrics

- **FX Updates**: 24 successful updates per day
- **Quote Expiry**: Daily processing of all 'sent' quotes
- **Accuracy**: Exchange rates within 1% of market rates
- **Reliability**: 99%+ uptime for automation processes
- **Performance**: Quote expiry completes within 5 minutes

---

**Note**: This automation system makes the platform self-maintaining and protects against currency fluctuation risks while ensuring quotes remain current and valid.