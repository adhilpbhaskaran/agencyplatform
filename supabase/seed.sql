-- =================================================================
-- BALI MALAYALI B2B PLATFORM - SEED DATA (v8.3)
-- Sample data for development and testing
-- =================================================================

-- Insert Exchange Rates
INSERT INTO public.exchange_rates (currency_code, rate_to_idr, source, last_updated) VALUES
('USD', 15600.00, 'seed_data', now()),
('INR', 187.50, 'seed_data', now()),
('AED', 4247.00, 'seed_data', now()),
('EUR', 17100.00, 'seed_data', now()),
('GBP', 19800.00, 'seed_data', now())
ON CONFLICT (currency_code) DO UPDATE SET
  rate_to_idr = EXCLUDED.rate_to_idr,
  last_updated = EXCLUDED.last_updated;

-- Insert Settings
INSERT INTO public.settings (key, value, description) VALUES
('fx_buffer_idr_absolute_per_usd', '400', 'The absolute IDR value to subtract from the live USD->IDR rate for profit.'),
('fx_buffer_inr_absolute', '1.0', 'The absolute value to ADD to the calculated USD-INR rate for profit.'),
('fx_buffer_aed_absolute', '0.1', 'The absolute value to ADD to the calculated USD-AED rate for profit.'),
('platform_commission_percentage', '5.0', 'Platform commission percentage on bookings'),
('referral_commission_percentage', '2.0', 'Commission percentage for referrals')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description;

-- Insert Cancellation Policies
INSERT INTO public.cancellation_policies (id, name, description, is_default) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Standard Policy', 'Standard cancellation policy for most bookings', true),
('550e8400-e29b-41d4-a716-446655440002', 'Flexible Policy', 'More flexible cancellation terms', false),
('550e8400-e29b-41d4-a716-446655440003', 'Strict Policy', 'Strict cancellation terms for peak season', false)
ON CONFLICT (id) DO NOTHING;

-- Insert Cancellation Policy Rules
INSERT INTO public.cancellation_policy_rules (policy_id, days_before_arrival, refund_percentage, notes) VALUES
('550e8400-e29b-41d4-a716-446655440001', 30, 100, 'Full refund if cancelled 30+ days before'),
('550e8400-e29b-41d4-a716-446655440001', 14, 75, '75% refund if cancelled 14-29 days before'),
('550e8400-e29b-41d4-a716-446655440001', 7, 50, '50% refund if cancelled 7-13 days before'),
('550e8400-e29b-41d4-a716-446655440001', 0, 0, 'No refund if cancelled less than 7 days before'),
('550e8400-e29b-41d4-a716-446655440002', 14, 100, 'Full refund if cancelled 14+ days before'),
('550e8400-e29b-41d4-a716-446655440002', 3, 50, '50% refund if cancelled 3-13 days before'),
('550e8400-e29b-41d4-a716-446655440002', 0, 0, 'No refund if cancelled less than 3 days before'),
('550e8400-e29b-41d4-a716-446655440003', 45, 100, 'Full refund if cancelled 45+ days before'),
('550e8400-e29b-41d4-a716-446655440003', 21, 25, '25% refund if cancelled 21-44 days before'),
('550e8400-e29b-41d4-a716-446655440003', 0, 0, 'No refund if cancelled less than 21 days before')
ON CONFLICT (policy_id, days_before_arrival) DO NOTHING;

-- Insert Sample Hotels
INSERT INTO public.hotels (id, name, city, cancellation_policy_id) VALUES
('550e8400-e29b-41d4-a716-446655440010', 'Ubud Paradise Resort', 'Ubud', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440011', 'Seminyak Beach Hotel', 'Seminyak', '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440012', 'Canggu Surf Lodge', 'Canggu', '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440013', 'Nusa Penida Island Resort', 'Nusa Penida', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440014', 'Sanur Beachfront Villa', 'Sanur', '550e8400-e29b-41d4-a716-446655440001')
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Hotel Rooms
INSERT INTO public.hotel_rooms (id, hotel_id, name, max_capacity, allow_triple, allow_child, base_price_idr, extra_adult_price_idr, child_price_idr) VALUES
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Deluxe Garden View', 2, true, true, 1200000, 300000, 150000),
('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440010', 'Pool Villa', 4, false, true, 2500000, 400000, 200000),
('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440011', 'Ocean View Suite', 2, true, true, 1800000, 350000, 175000),
('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440012', 'Surf Bungalow', 2, false, true, 900000, 250000, 125000),
('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440013', 'Cliff Top Room', 2, true, true, 1500000, 300000, 150000)
ON CONFLICT (id) DO NOTHING;

-- Insert Sample Activities
INSERT INTO public.activities (id, name, location, price_idr, cancellation_policy_id) VALUES
('550e8400-e29b-41d4-a716-446655440030', 'Ubud Rice Terrace Tour', 'Ubud', 350000, '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440031', 'Mount Batur Sunrise Trekking', 'Kintamani', 450000, '550e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440032', 'Tanah Lot Temple Tour', 'Tabanan', 250000, '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440033', 'Nusa Penida Day Trip', 'Nusa Penida', 650000, '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440034', 'Uluwatu Temple & Kecak Dance', 'Uluwatu', 300000, '550e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440035', 'White Water Rafting', 'Ubud', 400000, '550e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (id) DO NOTHING;

-- Insert Entry Fees
INSERT INTO public.entry_fees (id, location, price_idr) VALUES
('550e8400-e29b-41d4-a716-446655440040', 'Tanah Lot Temple', 60000),
('550e8400-e29b-41d4-a716-446655440041', 'Uluwatu Temple', 30000),
('550e8400-e29b-41d4-a716-446655440042', 'Besakih Temple', 60000),
('550e8400-e29b-41d4-a716-446655440043', 'Sekumpul Waterfall', 20000),
('550e8400-e29b-41d4-a716-446655440044', 'Nusa Penida', 25000)
ON CONFLICT (id) DO NOTHING;

-- Insert Transport Rates
INSERT INTO public.transport_rates (id, region, pax_limit, vehicle_type, rate_per_day_idr) VALUES
('550e8400-e29b-41d4-a716-446655440050', 'mainland', 4, 'Car', 600000),
('550e8400-e29b-41d4-a716-446655440051', 'mainland', 8, 'Van', 800000),
('550e8400-e29b-41d4-a716-446655440052', 'mainland', 12, 'Mini Bus', 1200000),
('550e8400-e29b-41d4-a716-446655440053', 'nusa_penida', 4, 'Car', 700000),
('550e8400-e29b-41d4-a716-446655440054', 'nusa_penida', 8, 'Van', 900000)
ON CONFLICT (region, pax_limit) DO NOTHING;

-- Insert Sample Admin (for testing)
INSERT INTO public.admins (id, clerk_id, name, email, role) VALUES
('550e8400-e29b-41d4-a716-446655440060', 'admin_test_001', 'Test Admin', 'admin@balimalayali.com', 'super_admin')
ON CONFLICT (clerk_id) DO NOTHING;

-- Insert Sample Agents (for testing)
INSERT INTO public.agents (id, clerk_id, name, email, phone, tier, type, is_approved, company_name) VALUES
('550e8400-e29b-41d4-a716-446655440070', 'agent_test_001', 'Rajesh Kumar', 'rajesh@example.com', '+91-9876543210', 'gold', 'travel_agent', true, 'Kerala Tours & Travels'),
('550e8400-e29b-41d4-a716-446655440071', 'agent_test_002', 'Priya Nair', 'priya@example.com', '+91-9876543211', 'silver', 'freelancer', true, 'Priya Travel Services'),
('550e8400-e29b-41d4-a716-446655440072', 'agent_test_003', 'Arun Menon', 'arun@example.com', '+91-9876543212', 'bronze', 'affiliate', false, 'Menon Travel Hub')
ON CONFLICT (clerk_id) DO NOTHING;

-- Insert Sample Clients
INSERT INTO public.clients (id, agent_id, name, email, phone) VALUES
('550e8400-e29b-41d4-a716-446655440080', '550e8400-e29b-41d4-a716-446655440070', 'Suresh Pillai', 'suresh@example.com', '+91-9876543220'),
('550e8400-e29b-41d4-a716-446655440081', '550e8400-e29b-41d4-a716-446655440070', 'Maya Krishnan', 'maya@example.com', '+91-9876543221'),
('550e8400-e29b-41d4-a716-446655440082', '550e8400-e29b-41d4-a716-446655440071', 'Ravi Varma', 'ravi@example.com', '+91-9876543222')
ON CONFLICT (id) DO NOTHING;

-- Insert Seasonal Rates (Sample for 2025)
INSERT INTO public.seasonal_rates (id, hotel_room_id, season, start_date, end_date, rate_idr) VALUES
('550e8400-e29b-41d4-a716-446655440090', '550e8400-e29b-41d4-a716-446655440020', 'low', '2025-02-01', '2025-05-31', 1200000),
('550e8400-e29b-41d4-a716-446655440091', '550e8400-e29b-41d4-a716-446655440020', 'high', '2025-06-01', '2025-08-31', 1500000),
('550e8400-e29b-41d4-a716-446655440092', '550e8400-e29b-41d4-a716-446655440020', 'peak', '2025-12-15', '2025-12-31', 2000000),
('550e8400-e29b-41d4-a716-446655440093', '550e8400-e29b-41d4-a716-446655440022', 'low', '2025-02-01', '2025-05-31', 1800000),
('550e8400-e29b-41d4-a716-446655440094', '550e8400-e29b-41d4-a716-446655440022', 'high', '2025-06-01', '2025-08-31', 2200000),
('550e8400-e29b-41d4-a716-446655440095', '550e8400-e29b-41d4-a716-446655440022', 'peak', '2025-12-15', '2025-12-31', 2800000)
ON CONFLICT (hotel_room_id, start_date, end_date) DO NOTHING;

-- Success message
SELECT 'Seed data inserted successfully! Database is ready for development and testing.' as message;