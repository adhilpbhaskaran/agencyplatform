-- Bali Malayali B2B Travel Platform - Initial Schema
-- PHASE 0: Complete Database Setup

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- Create custom types and enums
CREATE TYPE quote_status AS ENUM (
  'draft',
  'sent',
  'viewed',
  'negotiating',
  'final',
  'accepted',
  'paid',
  'confirmed',
  'cancelled',
  'expired',
  'on_hold_external_issue'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed',
  'refunded',
  'cancelled'
);

CREATE TYPE payment_method AS ENUM (
  'bank_transfer',
  'credit_card',
  'paypal',
  'crypto',
  'cash',
  'manual'
);

CREATE TYPE room_type AS ENUM (
  'single',
  'double',
  'twin',
  'triple',
  'quad',
  'family',
  'suite',
  'villa',
  'dormitory'
);

CREATE TYPE transport_type AS ENUM (
  'airport_pickup',
  'airport_dropoff',
  'intercity',
  'local_tour',
  'day_trip',
  'custom'
);

CREATE TYPE vehicle_type AS ENUM (
  'sedan',
  'suv',
  'van',
  'minibus',
  'bus',
  'luxury_car',
  'motorbike'
);

CREATE TYPE notification_type AS ENUM (
  'quote_created',
  'quote_updated',
  'quote_accepted',
  'payment_received',
  'commission_earned',
  'system_alert',
  'external_disruption'
);

CREATE TYPE funnel_event_type AS ENUM (
  'quote_created',
  'quote_sent',
  'quote_viewed',
  'quote_downloaded',
  'quote_shared',
  'quote_negotiated',
  'quote_accepted',
  'payment_initiated',
  'payment_completed'
);

-- Core Tables

-- Agents table (linked to Clerk users)
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  logo_url TEXT,
  commission_rate DECIMAL(5,4) DEFAULT 0.10 CHECK (commission_rate >= 0 AND commission_rate <= 1),
  is_active BOOLEAN DEFAULT true,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotels table
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  star_rating INTEGER CHECK (star_rating >= 1 AND star_rating <= 5),
  base_price_idr BIGINT NOT NULL CHECK (base_price_idr > 0),
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hotel rooms table
CREATE TABLE hotel_rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_type room_type NOT NULL,
  max_occupancy INTEGER NOT NULL CHECK (max_occupancy > 0),
  price_per_night_idr BIGINT NOT NULL CHECK (price_per_night_idr > 0),
  amenities JSONB DEFAULT '[]',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transport providers table
CREATE TABLE transport_providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_info JSONB,
  vehicle_types JSONB DEFAULT '[]',
  base_rate_idr BIGINT NOT NULL CHECK (base_rate_idr > 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transport services table
CREATE TABLE transport_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID NOT NULL REFERENCES transport_providers(id) ON DELETE CASCADE,
  service_type transport_type NOT NULL,
  vehicle_type vehicle_type NOT NULL,
  max_passengers INTEGER NOT NULL CHECK (max_passengers > 0),
  price_per_km_idr BIGINT,
  fixed_price_idr BIGINT,
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quotes table (main quote entity)
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  clerk_id TEXT NOT NULL, -- Denormalized for RLS performance
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  quote_number TEXT UNIQUE NOT NULL,
  status quote_status DEFAULT 'draft',
  total_cost_idr BIGINT NOT NULL DEFAULT 0,
  agent_margin_idr BIGINT NOT NULL DEFAULT 0,
  final_price_idr BIGINT NOT NULL DEFAULT 0,
  currency_code TEXT DEFAULT 'USD',
  exchange_rate DECIMAL(10,4),
  display_price DECIMAL(12,2),
  check_in_date DATE,
  check_out_date DATE,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  special_requests TEXT,
  internal_notes TEXT,
  pdf_url TEXT,
  expires_at TIMESTAMPTZ,
  price_locked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote versions table (for tracking revisions)
CREATE TABLE quote_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  data JSONB NOT NULL,
  created_by UUID NOT NULL REFERENCES agents(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(quote_id, version_number)
);

-- Quote hotels (many-to-many relationship)
CREATE TABLE quote_hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  hotel_id UUID NOT NULL REFERENCES hotels(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES hotel_rooms(id) ON DELETE CASCADE,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  room_count INTEGER NOT NULL CHECK (room_count > 0),
  guests_per_room INTEGER NOT NULL CHECK (guests_per_room > 0),
  rate_per_night_idr BIGINT NOT NULL CHECK (rate_per_night_idr > 0),
  total_nights INTEGER NOT NULL CHECK (total_nights > 0),
  subtotal_idr BIGINT NOT NULL CHECK (subtotal_idr > 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote transport (many-to-many relationship)
CREATE TABLE quote_transport (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES transport_services(id) ON DELETE CASCADE,
  pickup_location TEXT NOT NULL,
  dropoff_location TEXT NOT NULL,
  pickup_datetime TIMESTAMPTZ NOT NULL,
  passenger_count INTEGER NOT NULL CHECK (passenger_count > 0),
  distance_km DECIMAL(8,2),
  rate_idr BIGINT NOT NULL CHECK (rate_idr > 0),
  subtotal_idr BIGINT NOT NULL CHECK (subtotal_idr > 0),
  special_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  amount_idr BIGINT NOT NULL CHECK (amount_idr > 0),
  currency_code TEXT NOT NULL DEFAULT 'USD',
  exchange_rate DECIMAL(10,4) NOT NULL,
  display_amount DECIMAL(12,2) NOT NULL,
  payment_method payment_method NOT NULL,
  status payment_status DEFAULT 'pending',
  transaction_id TEXT,
  gateway_response JSONB,
  is_manual BOOLEAN DEFAULT false,
  proof_url TEXT,
  verified_by UUID REFERENCES agents(id),
  verified_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Commissions table
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  commission_rate DECIMAL(5,4) NOT NULL,
  base_amount_idr BIGINT NOT NULL,
  commission_amount_idr BIGINT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exchange rates table
CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_currency TEXT NOT NULL,
  to_currency TEXT NOT NULL DEFAULT 'IDR',
  rate DECIMAL(10,4) NOT NULL CHECK (rate > 0),
  source TEXT DEFAULT 'exchangerate.host',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_currency, to_currency, created_at)
);

-- FX rate history table
CREATE TABLE fx_rate_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_currency TEXT NOT NULL,
  to_currency TEXT NOT NULL DEFAULT 'IDR',
  rate DECIMAL(10,4) NOT NULL CHECK (rate > 0),
  previous_rate DECIMAL(10,4),
  change_percentage DECIMAL(5,2),
  source TEXT DEFAULT 'exchangerate.host',
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote expiry tracking table
CREATE TABLE quote_expiry (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  original_rate DECIMAL(10,4) NOT NULL,
  current_rate DECIMAL(10,4),
  rate_change_percentage DECIMAL(5,2),
  expired BOOLEAN DEFAULT false,
  expiry_reason TEXT,
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cancellation policies table
CREATE TABLE cancellation_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cancellation policy rules table
CREATE TABLE cancellation_policy_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  policy_id UUID NOT NULL REFERENCES cancellation_policies(id) ON DELETE CASCADE,
  days_before_checkin INTEGER NOT NULL CHECK (days_before_checkin >= 0),
  penalty_percentage DECIMAL(5,2) NOT NULL CHECK (penalty_percentage >= 0 AND penalty_percentage <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote funnel events table
CREATE TABLE quote_funnel_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  event_type funnel_event_type NOT NULL,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Retry queue table
CREATE TABLE retry_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  max_retries INTEGER DEFAULT 3,
  current_retries INTEGER DEFAULT 0,
  next_retry_at TIMESTAMPTZ NOT NULL,
  last_error TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disputes table
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  client_email TEXT NOT NULL,
  dispute_reason TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'closed')),
  resolution TEXT,
  resolved_by UUID REFERENCES agents(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Copilot tables
CREATE TABLE copilot_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  function_name TEXT NOT NULL,
  input_data JSONB NOT NULL,
  output_data JSONB,
  execution_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  data JSONB DEFAULT '{}',
  applied BOOLEAN DEFAULT false,
  applied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operational tables
CREATE TABLE system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  level TEXT NOT NULL CHECK (level IN ('info', 'warn', 'error', 'debug')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_agents_clerk_id ON agents(clerk_id);
CREATE INDEX idx_agents_email ON agents(email);
CREATE INDEX idx_clients_agent_id ON clients(agent_id);
CREATE INDEX idx_quotes_agent_id ON quotes(agent_id);
CREATE INDEX idx_quotes_clerk_id ON quotes(clerk_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created_at ON quotes(created_at);
CREATE INDEX idx_quote_hotels_quote_id ON quote_hotels(quote_id);
CREATE INDEX idx_quote_transport_quote_id ON quote_transport(quote_id);
CREATE INDEX idx_payments_quote_id ON payments(quote_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_commissions_agent_id ON commissions(agent_id);
CREATE INDEX idx_exchange_rates_currencies ON exchange_rates(from_currency, to_currency);
CREATE INDEX idx_exchange_rates_created_at ON exchange_rates(created_at);
CREATE INDEX idx_notifications_agent_id ON notifications(agent_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_quote_funnel_events_quote_id ON quote_funnel_events(quote_id);
CREATE INDEX idx_quote_funnel_events_agent_id ON quote_funnel_events(agent_id);
CREATE INDEX idx_retry_queue_status ON retry_queue(status);
CREATE INDEX idx_retry_queue_next_retry ON retry_queue(next_retry_at);

-- GIN index for quote search
CREATE INDEX idx_quotes_search ON quotes USING GIN (
  to_tsvector('english', 
    COALESCE(quote_number, '') || ' ' ||
    COALESCE(special_requests, '') || ' ' ||
    COALESCE(internal_notes, '')
  )
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotel_rooms_updated_at BEFORE UPDATE ON hotel_rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transport_providers_updated_at BEFORE UPDATE ON transport_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_transport_services_updated_at BEFORE UPDATE ON transport_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_hotels_updated_at BEFORE UPDATE ON quote_hotels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_transport_updated_at BEFORE UPDATE ON quote_transport FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON commissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exchange_rates_updated_at BEFORE UPDATE ON exchange_rates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cancellation_policies_updated_at BEFORE UPDATE ON cancellation_policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_retry_queue_updated_at BEFORE UPDATE ON retry_queue FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_disputes_updated_at BEFORE UPDATE ON disputes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Generate quote number function
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
  quote_num TEXT;
  counter INTEGER;
BEGIN
  -- Generate quote number in format: BM-YYYYMMDD-XXXX
  SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM 'BM-[0-9]{8}-([0-9]{4})') AS INTEGER)), 0) + 1
  INTO counter
  FROM quotes
  WHERE quote_number LIKE 'BM-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-%';
  
  quote_num := 'BM-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(counter::TEXT, 4, '0');
  
  RETURN quote_num;
END;
$$ LANGUAGE plpgsql;

-- Auto-generate quote number trigger
CREATE OR REPLACE FUNCTION set_quote_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quote_number IS NULL OR NEW.quote_number = '' THEN
    NEW.quote_number := generate_quote_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_quote_number
  BEFORE INSERT ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION set_quote_number();

-- Calculate quote cost function
CREATE OR REPLACE FUNCTION calculate_quote_cost(
  p_quote_id UUID,
  p_agent_margin_percentage DECIMAL DEFAULT 0.15
)
RETURNS TABLE(
  total_cost_idr BIGINT,
  agent_margin_idr BIGINT,
  final_price_idr BIGINT
) AS $$
DECLARE
  v_hotel_cost BIGINT := 0;
  v_transport_cost BIGINT := 0;
  v_total_cost BIGINT;
  v_margin BIGINT;
  v_final_price BIGINT;
BEGIN
  -- Calculate hotel costs
  SELECT COALESCE(SUM(subtotal_idr), 0)
  INTO v_hotel_cost
  FROM quote_hotels
  WHERE quote_id = p_quote_id;
  
  -- Calculate transport costs
  SELECT COALESCE(SUM(subtotal_idr), 0)
  INTO v_transport_cost
  FROM quote_transport
  WHERE quote_id = p_quote_id;
  
  -- Prevent zero-cost transport failures
  IF v_transport_cost = 0 AND EXISTS(
    SELECT 1 FROM quote_transport WHERE quote_id = p_quote_id
  ) THEN
    RAISE EXCEPTION 'Transport cost cannot be zero when transport services are included';
  END IF;
  
  v_total_cost := v_hotel_cost + v_transport_cost;
  v_margin := ROUND(v_total_cost * p_agent_margin_percentage);
  v_final_price := v_total_cost + v_margin;
  
  RETURN QUERY SELECT v_total_cost, v_margin, v_final_price;
END;
$$ LANGUAGE plpgsql;

-- Currency conversion function
CREATE OR REPLACE FUNCTION convert_currency(
  p_amount_idr BIGINT,
  p_target_currency TEXT DEFAULT 'USD'
)
RETURNS TABLE(
  exchange_rate DECIMAL(10,4),
  converted_amount DECIMAL(12,2)
) AS $$
DECLARE
  v_rate DECIMAL(10,4);
  v_amount DECIMAL(12,2);
BEGIN
  -- Get latest exchange rate
  SELECT rate INTO v_rate
  FROM exchange_rates
  WHERE from_currency = 'IDR' 
    AND to_currency = p_target_currency
    AND is_active = true
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF v_rate IS NULL THEN
    RAISE EXCEPTION 'Exchange rate not found for IDR to %', p_target_currency;
  END IF;
  
  v_amount := ROUND((p_amount_idr * v_rate)::DECIMAL, 2);
  
  RETURN QUERY SELECT v_rate, v_amount;
END;
$$ LANGUAGE plpgsql;

-- Update quote totals function
CREATE OR REPLACE FUNCTION update_quote_totals(p_quote_id UUID)
RETURNS VOID AS $$
DECLARE
  v_costs RECORD;
  v_conversion RECORD;
  v_currency TEXT;
BEGIN
  -- Get quote currency
  SELECT currency_code INTO v_currency
  FROM quotes
  WHERE id = p_quote_id;
  
  -- Calculate costs
  SELECT * INTO v_costs
  FROM calculate_quote_cost(p_quote_id);
  
  -- Convert to display currency
  SELECT * INTO v_conversion
  FROM convert_currency(v_costs.final_price_idr, v_currency);
  
  -- Update quote
  UPDATE quotes
  SET 
    total_cost_idr = v_costs.total_cost_idr,
    agent_margin_idr = v_costs.agent_margin_idr,
    final_price_idr = v_costs.final_price_idr,
    exchange_rate = v_conversion.exchange_rate,
    display_price = v_conversion.converted_amount,
    updated_at = NOW()
  WHERE id = p_quote_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update quote totals
CREATE OR REPLACE FUNCTION trigger_update_quote_totals()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM update_quote_totals(COALESCE(NEW.quote_id, OLD.quote_id));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_quote_hotels_totals
  AFTER INSERT OR UPDATE OR DELETE ON quote_hotels
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_quote_totals();

CREATE TRIGGER trigger_quote_transport_totals
  AFTER INSERT OR UPDATE OR DELETE ON quote_transport
  FOR EACH ROW
  EXECUTE FUNCTION trigger_update_quote_totals();

-- Row Level Security (RLS) Policies
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_transport ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_funnel_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE copilot_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agents
CREATE POLICY "Agents can view own profile" ON agents
  FOR SELECT USING (clerk_id = auth.jwt() ->> 'sub');

CREATE POLICY "Agents can update own profile" ON agents
  FOR UPDATE USING (clerk_id = auth.jwt() ->> 'sub');

-- RLS Policies for clients
CREATE POLICY "Agents can manage own clients" ON clients
  FOR ALL USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for quotes (optimized with clerk_id)
CREATE POLICY "Agents can manage own quotes" ON quotes
  FOR ALL USING (clerk_id = auth.jwt() ->> 'sub');

-- RLS Policies for quote_hotels
CREATE POLICY "Agents can manage own quote hotels" ON quote_hotels
  FOR ALL USING (
    quote_id IN (
      SELECT id FROM quotes WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for quote_transport
CREATE POLICY "Agents can manage own quote transport" ON quote_transport
  FOR ALL USING (
    quote_id IN (
      SELECT id FROM quotes WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for payments
CREATE POLICY "Agents can view own payments" ON payments
  FOR SELECT USING (
    quote_id IN (
      SELECT id FROM quotes WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for commissions
CREATE POLICY "Agents can view own commissions" ON commissions
  FOR SELECT USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for notifications
CREATE POLICY "Agents can manage own notifications" ON notifications
  FOR ALL USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for quote_funnel_events
CREATE POLICY "Agents can view own funnel events" ON quote_funnel_events
  FOR SELECT USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for disputes
CREATE POLICY "Agents can manage own disputes" ON disputes
  FOR ALL USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for copilot_logs
CREATE POLICY "Agents can view own copilot logs" ON copilot_logs
  FOR SELECT USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- RLS Policies for ai_recommendations
CREATE POLICY "Agents can manage own AI recommendations" ON ai_recommendations
  FOR ALL USING (
    agent_id IN (
      SELECT id FROM agents WHERE clerk_id = auth.jwt() ->> 'sub'
    )
  );

-- Create materialized views for analytics
CREATE MATERIALIZED VIEW quote_analytics AS
SELECT 
  DATE_TRUNC('day', created_at) as date,
  status,
  COUNT(*) as quote_count,
  AVG(final_price_idr) as avg_price_idr,
  SUM(final_price_idr) as total_value_idr
FROM quotes
GROUP BY DATE_TRUNC('day', created_at), status;

CREATE UNIQUE INDEX idx_quote_analytics_date_status ON quote_analytics(date, status);

CREATE MATERIALIZED VIEW agent_performance AS
SELECT 
  a.id as agent_id,
  a.name as agent_name,
  COUNT(q.id) as total_quotes,
  COUNT(CASE WHEN q.status = 'accepted' THEN 1 END) as accepted_quotes,
  COUNT(CASE WHEN q.status = 'paid' THEN 1 END) as paid_quotes,
  COALESCE(SUM(c.commission_amount_idr), 0) as total_commission_idr,
  CASE 
    WHEN COUNT(q.id) > 0 THEN 
      ROUND((COUNT(CASE WHEN q.status IN ('accepted', 'paid') THEN 1 END)::DECIMAL / COUNT(q.id)) * 100, 2)
    ELSE 0
  END as conversion_rate_percentage
FROM agents a
LEFT JOIN quotes q ON a.id = q.agent_id
LEFT JOIN commissions c ON a.id = c.agent_id AND c.status = 'paid'
GROUP BY a.id, a.name;

CREATE UNIQUE INDEX idx_agent_performance_agent_id ON agent_performance(agent_id);

-- Refresh materialized views function
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY quote_analytics;
  REFRESH MATERIALIZED VIEW CONCURRENTLY agent_performance;
END;
$$ LANGUAGE plpgsql;

-- Schedule analytics refresh (every hour)
SELECT cron.schedule('refresh-analytics', '0 * * * *', 'SELECT refresh_analytics_views();');

-- Data archiving function
CREATE OR REPLACE FUNCTION archive_old_data()
RETURNS VOID AS $$
BEGIN
  -- Archive quotes older than 2 years
  DELETE FROM quotes 
  WHERE created_at < NOW() - INTERVAL '2 years'
    AND status IN ('cancelled', 'expired');
  
  -- Archive old system logs (keep 6 months)
  DELETE FROM system_logs 
  WHERE created_at < NOW() - INTERVAL '6 months';
  
  -- Archive old audit logs (keep 1 year)
  DELETE FROM audit_logs 
  WHERE created_at < NOW() - INTERVAL '1 year';
  
  -- Archive old exchange rate history (keep 1 year)
  DELETE FROM fx_rate_history 
  WHERE recorded_at < NOW() - INTERVAL '1 year';
END;
$$ LANGUAGE plpgsql;

-- Schedule data archiving (monthly)
SELECT cron.schedule('archive-data', '0 0 1 * *', 'SELECT archive_old_data();');

-- Insert default cancellation policy
INSERT INTO cancellation_policies (name, description, is_default) VALUES
('Standard Cancellation Policy', 'Default cancellation policy for all bookings', true);

-- Insert default cancellation rules
INSERT INTO cancellation_policy_rules (policy_id, days_before_checkin, penalty_percentage)
SELECT 
  id,
  days,
  penalty
FROM cancellation_policies cp,
(VALUES 
  (0, 100.0),   -- Same day: 100% penalty
  (1, 50.0),    -- 1 day before: 50% penalty
  (7, 25.0),    -- 7 days before: 25% penalty
  (14, 10.0),   -- 14 days before: 10% penalty
  (30, 0.0)     -- 30+ days before: No penalty
) AS rules(days, penalty)
WHERE cp.is_default = true;

-- Insert sample exchange rates
INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES
('USD', 'IDR', 15750.00),
('EUR', 'IDR', 17200.00),
('GBP', 'IDR', 19800.00),
('AUD', 'IDR', 10500.00),
('SGD', 'IDR', 11650.00),
('MYR', 'IDR', 3350.00),
('JPY', 'IDR', 105.50),
('CNY', 'IDR', 2180.00);

-- Create function to check quote expiry
CREATE OR REPLACE FUNCTION check_quote_expiry()
RETURNS VOID AS $$
DECLARE
  quote_rec RECORD;
  current_rate DECIMAL(10,4);
  rate_change DECIMAL(5,2);
BEGIN
  FOR quote_rec IN 
    SELECT q.id, q.currency_code, q.exchange_rate, q.expires_at
    FROM quotes q
    WHERE q.status IN ('sent', 'viewed', 'negotiating')
      AND (q.expires_at IS NULL OR q.expires_at > NOW())
  LOOP
    -- Get current exchange rate
    SELECT rate INTO current_rate
    FROM exchange_rates
    WHERE from_currency = 'IDR' 
      AND to_currency = quote_rec.currency_code
      AND is_active = true
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF current_rate IS NOT NULL AND quote_rec.exchange_rate IS NOT NULL THEN
      -- Calculate rate change percentage
      rate_change := ABS((current_rate - quote_rec.exchange_rate) / quote_rec.exchange_rate * 100);
      
      -- Check if quote should expire due to rate change
      IF rate_change > 2.0 THEN
        INSERT INTO quote_expiry (quote_id, original_rate, current_rate, rate_change_percentage, expired, expiry_reason)
        VALUES (quote_rec.id, quote_rec.exchange_rate, current_rate, rate_change, true, 'Exchange rate drift > 2%');
        
        UPDATE quotes 
        SET status = 'expired', updated_at = NOW()
        WHERE id = quote_rec.id;
      END IF;
    END IF;
    
    -- Check if quote expired by date
    IF quote_rec.expires_at IS NOT NULL AND quote_rec.expires_at < NOW() THEN
      INSERT INTO quote_expiry (quote_id, original_rate, current_rate, expired, expiry_reason)
      VALUES (quote_rec.id, quote_rec.exchange_rate, current_rate, true, 'Quote expired by date');
      
      UPDATE quotes 
      SET status = 'expired', updated_at = NOW()
      WHERE id = quote_rec.id;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Schedule quote expiry check (every hour)
SELECT cron.schedule('check-quote-expiry', '0 * * * *', 'SELECT check_quote_expiry();');

-- Create function to process retry queue
CREATE OR REPLACE FUNCTION process_retry_queue()
RETURNS VOID AS $$
DECLARE
  job_rec RECORD;
BEGIN
  FOR job_rec IN 
    SELECT id, job_type, payload, current_retries, max_retries
    FROM retry_queue
    WHERE status = 'pending'
      AND next_retry_at <= NOW()
      AND current_retries < max_retries
  LOOP
    -- Update status to processing
    UPDATE retry_queue 
    SET status = 'processing', updated_at = NOW()
    WHERE id = job_rec.id;
    
    -- Here you would implement the actual job processing logic
    -- For now, we'll just increment the retry count
    UPDATE retry_queue
    SET 
      current_retries = current_retries + 1,
      next_retry_at = NOW() + INTERVAL '1 hour',
      status = CASE 
        WHEN current_retries + 1 >= max_retries THEN 'failed'
        ELSE 'pending'
      END,
      updated_at = NOW()
    WHERE id = job_rec.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Schedule retry queue processing (every 15 minutes)
SELECT cron.schedule('process-retry-queue', '*/15 * * * *', 'SELECT process_retry_queue();');

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (table_name, operation, old_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), 
            COALESCE((auth.jwt() ->> 'sub')::UUID, NULL));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (table_name, operation, old_data, new_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW),
            COALESCE((auth.jwt() ->> 'sub')::UUID, NULL));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (table_name, operation, new_data, user_id)
    VALUES (TG_TABLE_NAME, TG_OP, row_to_json(NEW),
            COALESCE((auth.jwt() ->> 'sub')::UUID, NULL));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Apply audit triggers to critical tables
CREATE TRIGGER audit_quotes AFTER INSERT OR UPDATE OR DELETE ON quotes
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_payments AFTER INSERT OR UPDATE OR DELETE ON payments
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_agents AFTER INSERT OR UPDATE OR DELETE ON agents
  FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- Schema setup complete
COMMENT ON SCHEMA public IS 'Bali Malayali B2B Travel Platform - Complete Schema v1.0';