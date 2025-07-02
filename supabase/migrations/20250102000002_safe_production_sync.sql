-- =================================================================
-- SAFE PRODUCTION SYNC MIGRATION
-- This migration safely applies changes without conflicting with existing objects
-- =================================================================

-- Enable extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS http;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create types only if they don't exist
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('travel_agent', 'freelancer', 'affiliate');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE agent_tier AS ENUM ('bronze', 'silver', 'gold');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE quote_status AS ENUM ('draft', 'sent', 'revised', 'approved', 'paid', 'expired', 'void', 'on_hold_external_issue');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE trip_status AS ENUM ('pending', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE pricing_season AS ENUM ('low', 'high', 'peak');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE travel_region AS ENUM ('mainland', 'nusa_penida');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE dispute_status AS ENUM ('open', 'investigating', 'resolved_refund', 'resolved_credit', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create tables only if they don't exist
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cancellation_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_default BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS cancellation_policy_rules (
    id BIGSERIAL PRIMARY KEY,
    policy_id UUID NOT NULL REFERENCES cancellation_policies(id) ON DELETE CASCADE,
    days_before_arrival INT NOT NULL,
    refund_percentage NUMERIC NOT NULL CHECK (refund_percentage >= 0 AND refund_percentage <= 100),
    notes TEXT,
    UNIQUE(policy_id, days_before_arrival)
);

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'support_lead'
);

-- Insert admin record if it doesn't exist
INSERT INTO admins (clerk_id, name, email, role)
VALUES ('user_2zBkyCKLtVvyVGSMte3GFE4PjU2', 'Admin User', 'admin@bali-malayali.com', 'super_admin')
ON CONFLICT (clerk_id) DO NOTHING;

-- Update or insert FX buffer settings
INSERT INTO settings (key, value, description)
VALUES
    ('fx_buffer_idr_absolute_per_usd', '400', 'The absolute IDR value to subtract from the live USD->IDR rate for profit.'),
    ('fx_buffer_inr_absolute', '1.0', 'The absolute value to ADD to the calculated USD-INR rate for profit.'),
    ('fx_buffer_aed_absolute', '0.1', 'The absolute value to ADD to the calculated USD-AED rate for profit.')
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value, description = EXCLUDED.description;

-- Create or replace the FX fetching function
CREATE OR REPLACE FUNCTION public.fetch_and_store_exchange_rates()
RETURNS text
LANGUAGE plpgsql
AS $$
DECLARE
  api_key TEXT := '0fde6e9302c33da8bd46ccc64695c3c6';
  response JSON;
  updates_count INT := 0;
  api_url TEXT;
  
  usd_to_idr_from_api DECIMAL;
  usd_to_inr_from_api DECIMAL;
  usd_to_aed_from_api DECIMAL;

  inr_profit_margin DECIMAL;
  idr_profit_margin_per_usd DECIMAL;
  aed_profit_margin DECIMAL;

  final_usd_rate_for_client DECIMAL;
  final_inr_rate_for_client DECIMAL;
  final_aed_rate_for_client DECIMAL;

BEGIN
  -- Fetch your profit margin settings
  SELECT value::DECIMAL INTO inr_profit_margin FROM public.settings WHERE key = 'fx_buffer_inr_absolute';
  SELECT value::DECIMAL INTO idr_profit_margin_per_usd FROM public.settings WHERE key = 'fx_buffer_idr_absolute_per_usd';
  SELECT value::DECIMAL INTO aed_profit_margin FROM public.settings WHERE key = 'fx_buffer_aed_absolute';
  
  -- Use safe defaults
  inr_profit_margin := COALESCE(inr_profit_margin, 0);
  idr_profit_margin_per_usd := COALESCE(idr_profit_margin_per_usd, 0);
  aed_profit_margin := COALESCE(aed_profit_margin, 0);

  -- Fetch live rates from the API
  api_url := 'https://api.exchangerate.host/live?access_key=' || api_key;
  SELECT content::json INTO response FROM http_get(api_url);

  IF (response->>'success')::BOOLEAN IS NOT TRUE THEN
    RAISE WARNING 'API call failed. Response: %', response;
    RETURN 'API call failed.';
  END IF;

  usd_to_idr_from_api := (response->'quotes'->>'USDIDR')::DECIMAL;
  usd_to_inr_from_api := (response->'quotes'->>'USDINR')::DECIMAL;
  usd_to_aed_from_api := (response->'quotes'->>'USDAED')::DECIMAL;

  -- APPLY CORRECT PROFIT MARGIN LOGIC
  final_usd_rate_for_client := usd_to_idr_from_api - idr_profit_margin_per_usd;
  
  IF usd_to_inr_from_api > 0 THEN
    final_inr_rate_for_client := final_usd_rate_for_client / (usd_to_inr_from_api + inr_profit_margin);
  END IF;

  IF usd_to_aed_from_api > 0 THEN
    final_aed_rate_for_client := final_usd_rate_for_client / (usd_to_aed_from_api + aed_profit_margin);
  END IF;
  
  -- SAVE THE NEW, PROFITABLE RATES TO THE DATABASE
  INSERT INTO public.exchange_rates (currency_code, rate_to_idr, source, last_updated) VALUES ('USD', final_usd_rate_for_client, 'exchangerate.host_w_margin', now()) ON CONFLICT (currency_code) DO UPDATE SET rate_to_idr = EXCLUDED.rate_to_idr, last_updated = EXCLUDED.last_updated;
  INSERT INTO public.exchange_rates (currency_code, rate_to_idr, source, last_updated) VALUES ('INR', final_inr_rate_for_client, 'exchangerate.host_w_margin', now()) ON CONFLICT (currency_code) DO UPDATE SET rate_to_idr = EXCLUDED.rate_to_idr, last_updated = EXCLUDED.last_updated;
  INSERT INTO public.exchange_rates (currency_code, rate_to_idr, source, last_updated) VALUES ('AED', final_aed_rate_for_client, 'exchangerate.host_w_margin', now()) ON CONFLICT (currency_code) DO UPDATE SET rate_to_idr = EXCLUDED.rate_to_idr, last_updated = EXCLUDED.last_updated;
  
  updates_count := 3;

  RETURN 'Successfully updated ' || updates_count || ' currency rates with profit margins.';
END;
$$;

-- Create or replace the quote currency update function
CREATE OR REPLACE FUNCTION public.update_quote_currency(p_quote_id UUID)
RETURNS void AS $$
DECLARE
  q RECORD;
  fx_rate NUMERIC;
  v_adjusted_rate NUMERIC;
BEGIN
  SELECT * INTO q FROM public.quotes WHERE id = p_quote_id;
  
  SELECT rate_to_idr INTO fx_rate FROM public.exchange_rates
  WHERE currency_code = q.display_currency
  ORDER BY last_updated DESC LIMIT 1;

  IF fx_rate IS NULL OR fx_rate = 0 THEN
    RAISE WARNING 'No exchange rate found for currency %. Using 1.', q.display_currency;
    v_adjusted_rate = 1;
  ELSE
    v_adjusted_rate = 1 / fx_rate;
  END IF;

  UPDATE public.quotes
  SET
    exchange_rate_used = fx_rate,
    display_final_total = CEIL(final_total_idr * v_adjusted_rate)
  WHERE id = p_quote_id;

END;
$$ LANGUAGE plpgsql;

-- Safely update cron jobs
DO $$ BEGIN 
    PERFORM cron.unschedule('daily-fx-update-direct'); 
EXCEPTION 
    WHEN OTHERS THEN 
        RAISE NOTICE 'Job daily-fx-update-direct did not exist, skipping.'; 
END $$;

DO $$ BEGIN 
    PERFORM cron.unschedule('twice_daily_fx_update'); 
EXCEPTION 
    WHEN OTHERS THEN 
        RAISE NOTICE 'Job twice_daily_fx_update did not exist, skipping.'; 
END $$;

DO $$ BEGIN 
    PERFORM cron.unschedule('twice_daily_fx_update_wita'); 
EXCEPTION 
    WHEN OTHERS THEN 
        RAISE NOTICE 'Job twice_daily_fx_update_wita did not exist, skipping.'; 
END $$;

-- Schedule the job to run at 10 AM and 3 PM Bali Time (WITA), which is 2 AM and 7 AM UTC.
SELECT cron.schedule(
  'twice_daily_fx_update_wita',
  '0 2,7 * * *',
  'SELECT public.fetch_and_store_exchange_rates();'
);

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.fetch_and_store_exchange_rates() TO authenticated;
GRANT EXECUTE ON FUNCTION public.fetch_and_store_exchange_rates() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_quote_currency(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_quote_currency(UUID) TO service_role;