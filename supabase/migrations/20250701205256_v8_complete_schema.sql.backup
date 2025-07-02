-- =================================================================
-- BALI MALAYALI B2B PLATFORM - FINAL & COMPLETE SETUP SCRIPT (v8.3)
-- This single script creates all tables, functions, and the corrected automation schedule with final profit margins.
-- Run this on a clean, reset database.
-- =================================================================

-- PART 1: Enable Required Extensions
-- =================================================================
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS http;
CREATE EXTENSION IF NOT EXISTS pg_net;


-- PART 2: CUSTOM TYPE DEFINITIONS
-- =================================================================
CREATE TYPE user_type AS ENUM ('travel_agent', 'freelancer', 'affiliate');
CREATE TYPE agent_tier AS ENUM ('bronze', 'silver', 'gold');
CREATE TYPE quote_status AS ENUM ('draft', 'sent', 'revised', 'approved', 'paid', 'expired', 'void', 'on_hold_external_issue');
CREATE TYPE trip_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE pricing_season AS ENUM ('low', 'high', 'peak');
CREATE TYPE travel_region AS ENUM ('mainland', 'nusa_penida');
CREATE TYPE dispute_status AS ENUM ('open', 'investigating', 'resolved_refund', 'resolved_credit', 'rejected');


-- =================================================================
-- PART 3: CORE DATABASE TABLES
-- =================================================================

CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE cancellation_policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    is_default BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE cancellation_policy_rules (
    id BIGSERIAL PRIMARY KEY,
    policy_id UUID NOT NULL REFERENCES cancellation_policies(id) ON DELETE CASCADE,
    days_before_arrival INT NOT NULL,
    refund_percentage NUMERIC NOT NULL CHECK (refund_percentage >= 0 AND refund_percentage <= 100),
    notes TEXT,
    UNIQUE(policy_id, days_before_arrival)
);

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'support_lead'
);

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  tier agent_tier NOT NULL DEFAULT 'bronze',
  type user_type,
  logo_url TEXT,
  referred_by_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  company_name TEXT,
  social_handle TEXT,
  role_in_company TEXT
);

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  cancellation_policy_id UUID REFERENCES cancellation_policies(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE hotel_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  max_capacity INT NOT NULL DEFAULT 2,
  allow_triple BOOLEAN NOT NULL DEFAULT false,
  allow_child BOOLEAN NOT NULL DEFAULT true,
  base_price_idr NUMERIC NOT NULL CHECK (base_price_idr >= 0),
  extra_adult_price_idr NUMERIC CHECK (extra_adult_price_idr >= 0),
  child_price_idr NUMERIC CHECK (child_price_idr >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE seasonal_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_room_id UUID NOT NULL REFERENCES hotel_rooms(id) ON DELETE CASCADE,
  season pricing_season NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  rate_idr NUMERIC NOT NULL CHECK (rate_idr >= 0),
  CONSTRAINT unique_season_per_room_per_period UNIQUE (hotel_room_id, start_date, end_date)
);

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  location TEXT,
  price_idr NUMERIC NOT NULL CHECK (price_idr >= 0),
  cancellation_policy_id UUID REFERENCES cancellation_policies(id) ON DELETE SET NULL
);

CREATE TABLE entry_fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL UNIQUE,
  price_idr NUMERIC NOT NULL CHECK (price_idr >= 0)
);

CREATE TABLE transport_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region travel_region NOT NULL,
  pax_limit INT NOT NULL,
  vehicle_type TEXT NOT NULL,
  rate_per_day_idr NUMERIC NOT NULL CHECK (rate_per_day_idr >= 0),
  UNIQUE(region, pax_limit)
);

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  clerk_id TEXT,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  pax INT NOT NULL CHECK (pax > 0),
  children INT DEFAULT 0,
  travel_start DATE NOT NULL,
  travel_end DATE NOT NULL,
  base_cost_idr NUMERIC,
  markup_idr NUMERIC DEFAULT 0,
  final_total_idr NUMERIC,
  quote_ref TEXT UNIQUE,
  status quote_status NOT NULL DEFAULT 'draft',
  trip_status trip_status NOT NULL DEFAULT 'pending',
  pdf_url TEXT,
  expires_at TIMESTAMPTZ,
  display_currency TEXT NOT NULL DEFAULT 'USD',
  exchange_rate_used NUMERIC,
  display_final_total NUMERIC,
  cancellation_policy_snapshot JSONB,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ
);

CREATE TABLE quote_versions (
  id BIGSERIAL PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  version_number INT NOT NULL DEFAULT 1,
  pdf_url TEXT,
  changes_summary TEXT,
  created_by_user_id UUID REFERENCES agents(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(quote_id, version_number)
);

CREATE TABLE quote_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  option_number INT NOT NULL CHECK (option_number IN (1, 2, 3)),
  hotel_room_ids UUID[],
  room_cost_idr NUMERIC,
  land_cost_idr NUMERIC,
  total_cost_idr NUMERIC,
  UNIQUE(quote_id, option_number)
);

CREATE TABLE quote_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  day_date DATE NOT NULL,
  region travel_region NOT NULL,
  notes TEXT,
  activities JSONB,
  entry_fee_ids UUID[],
  UNIQUE(quote_id, day_number)
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE RESTRICT,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE RESTRICT,
  amount_paid NUMERIC NOT NULL,
  currency_paid TEXT NOT NULL,
  amount_idr NUMERIC,
  payment_gateway TEXT,
  gateway_transaction_id TEXT,
  status TEXT,
  fx_rate_used NUMERIC,
  tax_details JSONB,
  is_manual BOOLEAN NOT NULL DEFAULT false,
  payment_method TEXT,
  proof_url TEXT,
  verified_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  originating_agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT CHECK (status IN ('pending', 'approved', 'paid', 'void')) DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  currency_code TEXT NOT NULL UNIQUE,
  rate_to_idr NUMERIC NOT NULL,
  source TEXT,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE quote_status_history (
  id BIGSERIAL PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  status_from quote_status,
  status_to quote_status NOT NULL,
  changed_by_user_id UUID,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id),
  quote_id UUID REFERENCES quotes(id),
  subject TEXT NOT NULL,
  description TEXT,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')) DEFAULT 'open',
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES quotes(id),
  support_ticket_id UUID REFERENCES support_tickets(id),
  agent_id UUID NOT NULL REFERENCES agents(id),
  reason TEXT NOT NULL,
  status dispute_status NOT NULL DEFAULT 'open',
  resolution_details TEXT,
  refund_amount_idr NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

CREATE TABLE inventory_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_type TEXT NOT NULL,
  vendor_id UUID NOT NULL,
  snapshot_date DATE NOT NULL,
  available_units INT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id),
  type TEXT,
  title TEXT,
  message TEXT NOT NULL,
  target_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE agent_notifications (
  id BIGSERIAL PRIMARY KEY,
  notification_id UUID NOT NULL REFERENCES notifications(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ
);

CREATE TABLE logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  action TEXT NOT NULL,
  object_type TEXT,
  object_id UUID,
  changes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE quote_funnel_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id),
  agent_id UUID REFERENCES agents(id),
  event_type TEXT CHECK (event_type IN ('created', 'sent_to_client', 'client_viewed', 'revised', 'finalized', 'paid')),
  metadata JSONB,
  occurred_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE retry_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_type TEXT CHECK (job_type IN ('pdf_generation', 'fx_fetch', 'email_send')),
  reference_id UUID,
  payload JSONB,
  attempts INT DEFAULT 0,
  max_attempts INT DEFAULT 3,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'failed', 'succeeded')) DEFAULT 'pending',
  error_log TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_attempt_at TIMESTAMPTZ
);

CREATE TABLE asset_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_url TEXT NOT NULL,
  alt_text TEXT,
  entity_type TEXT NOT NULL,
  related_entity_id UUID NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_asset_gallery_entity ON asset_gallery(entity_type, related_entity_id);


-- =================================================================
-- PART 4: BUSINESS LOGIC & AUTOMATION (Final Corrected Version)
-- =================================================================

-- Insert Final Buffer Settings
INSERT INTO public.settings (key, value, description)
VALUES
    ('fx_buffer_idr_absolute_per_usd', '400', 'The absolute IDR value to subtract from the live USD->IDR rate for profit.'),
    ('fx_buffer_inr_absolute', '1.0', 'The absolute value to ADD to the calculated USD-INR rate for profit.'),
    ('fx_buffer_aed_absolute', '0.1', 'The absolute value to ADD to the calculated USD-AED rate for profit.')
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value, description = EXCLUDED.description;

-- Create the FX Fetching Function with Correct Profit Logic
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


-- Create the Quote Currency Rounding Function
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


-- Corrected Cron Job Schedule for WITA (UTC+8)
DO $$ BEGIN PERFORM cron.unschedule('daily-fx-update-direct'); EXCEPTION WHEN OTHERS THEN RAISE NOTICE 'Job did not exist, skipping.'; END $$;
DO $$ BEGIN PERFORM cron.unschedule('twice_daily_fx_update'); EXCEPTION WHEN OTHERS THEN RAISE NOTICE 'Job did not exist, skipping.'; END $$;
DO $$ BEGIN PERFORM cron.unschedule('twice_daily_fx_update_wita'); EXCEPTION WHEN OTHERS THEN RAISE NOTICE 'Job did not exist, skipping.'; END $$;

-- Schedule the job to run at 10 AM and 3 PM Bali Time (WITA), which is 2 AM and 7 AM UTC.
SELECT cron.schedule(
  'twice_daily_fx_update_wita',
  '0 2,7 * * *',
  'SELECT public.fetch_and_store_exchange_rates();'
);