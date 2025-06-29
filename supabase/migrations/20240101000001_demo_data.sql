-- Bali Malayali B2B Travel Platform - Demo Data
-- Complete runnable demo data for development and testing

-- Insert sample hotels
INSERT INTO hotels (id, name, location, description, star_rating, base_price_idr, amenities, images) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Ubud Serenity Resort', 'Ubud, Bali', 'Luxury resort nestled in the heart of Ubud with stunning rice terrace views', 5, 2500000, 
 '["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Room Service", "Concierge"]',
 '["https://example.com/ubud1.jpg", "https://example.com/ubud2.jpg"]'),

('550e8400-e29b-41d4-a716-446655440002', 'Seminyak Beach Hotel', 'Seminyak, Bali', 'Modern beachfront hotel with direct beach access and vibrant nightlife nearby', 4, 1800000,
 '["WiFi", "Pool", "Beach Access", "Restaurant", "Bar", "Room Service"]',
 '["https://example.com/seminyak1.jpg", "https://example.com/seminyak2.jpg"]'),

('550e8400-e29b-41d4-a716-446655440003', 'Canggu Surf Lodge', 'Canggu, Bali', 'Trendy surf lodge perfect for beach lovers and surfers', 3, 1200000,
 '["WiFi", "Pool", "Surf Lessons", "Restaurant", "Bike Rental"]',
 '["https://example.com/canggu1.jpg", "https://example.com/canggu2.jpg"]'),

('550e8400-e29b-41d4-a716-446655440004', 'Sanur Peaceful Villa', 'Sanur, Bali', 'Traditional Balinese villa with private pool and garden', 4, 2000000,
 '["WiFi", "Private Pool", "Garden", "Kitchen", "Parking"]',
 '["https://example.com/sanur1.jpg", "https://example.com/sanur2.jpg"]'),

('550e8400-e29b-41d4-a716-446655440005', 'Nusa Dua Luxury Resort', 'Nusa Dua, Bali', 'Premium resort with world-class amenities and pristine beaches', 5, 3500000,
 '["WiFi", "Multiple Pools", "Spa", "Golf Course", "Multiple Restaurants", "Kids Club", "Butler Service"]',
 '["https://example.com/nusadua1.jpg", "https://example.com/nusadua2.jpg"]');

-- Insert hotel rooms
INSERT INTO hotel_rooms (id, hotel_id, room_type, max_occupancy, price_per_night_idr, amenities) VALUES
-- Ubud Serenity Resort rooms
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'double', 2, 2500000, '["King Bed", "Balcony", "Mini Bar", "Safe"]'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'suite', 4, 4500000, '["King Bed", "Living Area", "Balcony", "Mini Bar", "Safe", "Jacuzzi"]'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'villa', 6, 7500000, '["2 Bedrooms", "Private Pool", "Kitchen", "Living Area", "Garden"]'),

-- Seminyak Beach Hotel rooms
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'double', 2, 1800000, '["Queen Bed", "Ocean View", "Mini Bar", "Safe"]'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'twin', 2, 1600000, '["Twin Beds", "City View", "Mini Bar", "Safe"]'),
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'suite', 4, 3200000, '["King Bed", "Ocean View", "Living Area", "Balcony", "Mini Bar"]'),

-- Canggu Surf Lodge rooms
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 'double', 2, 1200000, '["Queen Bed", "Shared Balcony", "Locker"]'),
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'dormitory', 8, 400000, '["Bunk Beds", "Shared Bathroom", "Locker"]'),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'family', 4, 2000000, '["2 Bedrooms", "Kitchen", "Living Area"]'),

-- Sanur Peaceful Villa rooms
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004', 'villa', 6, 2000000, '["3 Bedrooms", "Private Pool", "Full Kitchen", "Garden", "Parking"]'),
('660e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440004', 'double', 2, 1500000, '["King Bed", "Garden View", "Mini Kitchen", "Balcony"]'),

-- Nusa Dua Luxury Resort rooms
('660e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440005', 'double', 2, 3500000, '["King Bed", "Ocean View", "Marble Bathroom", "Butler Service"]'),
('660e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440005', 'suite', 4, 6500000, '["King Bed", "Ocean View", "Living Area", "Private Terrace", "Butler Service"]'),
('660e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440005', 'villa', 8, 12000000, '["4 Bedrooms", "Private Pool", "Full Kitchen", "Butler Service", "Golf Cart"]');

-- Insert transport providers
INSERT INTO transport_providers (id, name, contact_info, vehicle_types, base_rate_idr) VALUES
('770e8400-e29b-41d4-a716-446655440001', 'Bali Premium Transport', 
 '{"phone": "+62-361-123456", "email": "info@balipremium.com", "whatsapp": "+62-812-3456789"}',
 '["sedan", "suv", "van", "luxury_car"]', 150000),

('770e8400-e29b-41d4-a716-446655440002', 'Island Hopper Tours',
 '{"phone": "+62-361-234567", "email": "bookings@islandhopper.com", "whatsapp": "+62-813-4567890"}',
 '["van", "minibus", "bus"]', 200000),

('770e8400-e29b-41d4-a716-446655440003', 'Surf & Turf Transport',
 '{"phone": "+62-361-345678", "email": "rides@surfturf.com", "whatsapp": "+62-814-5678901"}',
 '["sedan", "suv", "motorbike"]', 100000),

('770e8400-e29b-41d4-a716-446655440004', 'Luxury Bali Rides',
 '{"phone": "+62-361-456789", "email": "concierge@luxuryrides.com", "whatsapp": "+62-815-6789012"}',
 '["luxury_car", "suv"]', 300000);

-- Insert transport services
INSERT INTO transport_services (id, provider_id, service_type, vehicle_type, max_passengers, price_per_km_idr, fixed_price_idr, description) VALUES
-- Bali Premium Transport services
('880e8400-e29b-41d4-a716-446655440001', '770e8400-e29b-41d4-a716-446655440001', 'airport_pickup', 'sedan', 3, NULL, 350000, 'Airport pickup service with sedan'),
('880e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', 'airport_pickup', 'suv', 6, NULL, 450000, 'Airport pickup service with SUV'),
('880e8400-e29b-41d4-a716-446655440003', '770e8400-e29b-41d4-a716-446655440001', 'intercity', 'sedan', 3, 8000, NULL, 'Intercity travel with sedan'),
('880e8400-e29b-41d4-a716-446655440004', '770e8400-e29b-41d4-a716-446655440001', 'day_trip', 'van', 8, NULL, 800000, 'Full day tour with van (8 hours)'),

-- Island Hopper Tours services
('880e8400-e29b-41d4-a716-446655440005', '770e8400-e29b-41d4-a716-446655440002', 'local_tour', 'van', 8, NULL, 600000, 'Half day local tour'),
('880e8400-e29b-41d4-a716-446655440006', '770e8400-e29b-41d4-a716-446655440002', 'day_trip', 'minibus', 15, NULL, 1200000, 'Full day group tour'),
('880e8400-e29b-41d4-a716-446655440007', '770e8400-e29b-41d4-a716-446655440002', 'airport_pickup', 'van', 8, NULL, 400000, 'Airport pickup for groups'),

-- Surf & Turf Transport services
('880e8400-e29b-41d4-a716-446655440008', '770e8400-e29b-41d4-a716-446655440003', 'local_tour', 'motorbike', 1, 5000, NULL, 'Motorbike rental per km'),
('880e8400-e29b-41d4-a716-446655440009', '770e8400-e29b-41d4-a716-446655440003', 'intercity', 'sedan', 3, 6000, NULL, 'Budget intercity travel'),
('880e8400-e29b-41d4-a716-446655440010', '770e8400-e29b-41d4-a716-446655440003', 'airport_dropoff', 'suv', 6, NULL, 400000, 'Airport dropoff service'),

-- Luxury Bali Rides services
('880e8400-e29b-41d4-a716-446655440011', '770e8400-e29b-41d4-a716-446655440004', 'airport_pickup', 'luxury_car', 3, NULL, 750000, 'Premium airport pickup'),
('880e8400-e29b-41d4-a716-446655440012', '770e8400-e29b-41d4-a716-446655440004', 'day_trip', 'luxury_car', 3, NULL, 1500000, 'Luxury day tour'),
('880e8400-e29b-41d4-a716-446655440013', '770e8400-e29b-41d4-a716-446655440004', 'custom', 'suv', 6, 15000, NULL, 'Custom luxury transport per km');

-- Insert sample agents (these will be linked to Clerk users)
INSERT INTO agents (id, clerk_id, email, name, phone, company_name, commission_rate, is_active, is_approved) VALUES
('990e8400-e29b-41d4-a716-446655440001', 'user_demo_agent_1', 'agent1@balitravel.com', 'Rajesh Kumar', '+91-9876543210', 'Kerala Travels Pvt Ltd', 0.12, true, true),
('990e8400-e29b-41d4-a716-446655440002', 'user_demo_agent_2', 'agent2@balitravel.com', 'Priya Nair', '+91-9876543211', 'Malabar Tours & Travels', 0.15, true, true),
('990e8400-e29b-41d4-a716-446655440003', 'user_demo_agent_3', 'agent3@balitravel.com', 'Suresh Menon', '+91-9876543212', 'Coconut Palm Holidays', 0.10, true, true),
('990e8400-e29b-41d4-a716-446655440004', 'user_demo_agent_4', 'agent4@balitravel.com', 'Lakshmi Pillai', '+91-9876543213', 'Backwater Adventures', 0.18, true, false), -- Not approved yet
('990e8400-e29b-41d4-a716-446655440005', 'user_demo_agent_5', 'agent5@balitravel.com', 'Arun Krishnan', '+91-9876543214', 'Spice Route Travels', 0.14, true, true);

-- Insert sample clients
INSERT INTO clients (id, agent_id, name, email, phone, nationality) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'Ramesh Sharma', 'ramesh.sharma@email.com', '+91-9123456789', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 'Deepika Patel', 'deepika.patel@email.com', '+91-9123456790', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 'Vikram Singh', 'vikram.singh@email.com', '+91-9123456791', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440002', 'Anita Gupta', 'anita.gupta@email.com', '+91-9123456792', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440003', 'Rohit Verma', 'rohit.verma@email.com', '+91-9123456793', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440006', '990e8400-e29b-41d4-a716-446655440003', 'Kavya Nair', 'kavya.nair@email.com', '+91-9123456794', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440007', '990e8400-e29b-41d4-a716-446655440005', 'Arjun Reddy', 'arjun.reddy@email.com', '+91-9123456795', 'Indian'),
('aa0e8400-e29b-41d4-a716-446655440008', '990e8400-e29b-41d4-a716-446655440005', 'Meera Iyer', 'meera.iyer@email.com', '+91-9123456796', 'Indian');

-- Insert sample quotes with various statuses
INSERT INTO quotes (id, agent_id, clerk_id, client_id, quote_number, status, check_in_date, check_out_date, guest_count, special_requests, currency_code) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'user_demo_agent_1', 'aa0e8400-e29b-41d4-a716-446655440001', 'BM-20240315-0001', 'draft', '2024-04-15', '2024-04-20', 2, 'Honeymoon package, prefer ocean view', 'USD'),
('bb0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 'user_demo_agent_1', 'aa0e8400-e29b-41d4-a716-446655440002', 'BM-20240315-0002', 'sent', '2024-05-10', '2024-05-17', 4, 'Family vacation with kids', 'USD'),
('bb0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 'user_demo_agent_2', 'aa0e8400-e29b-41d4-a716-446655440003', 'BM-20240315-0003', 'accepted', '2024-06-01', '2024-06-08', 6, 'Group tour for friends', 'EUR'),
('bb0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440002', 'user_demo_agent_2', 'aa0e8400-e29b-41d4-a716-446655440004', 'BM-20240315-0004', 'paid', '2024-03-25', '2024-03-30', 2, 'Anniversary celebration', 'USD'),
('bb0e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440003', 'user_demo_agent_3', 'aa0e8400-e29b-41d4-a716-446655440005', 'BM-20240315-0005', 'confirmed', '2024-04-01', '2024-04-10', 8, 'Corporate retreat', 'USD'),
('bb0e8400-e29b-41d4-a716-446655440006', '990e8400-e29b-41d4-a716-446655440003', 'user_demo_agent_3', 'aa0e8400-e29b-41d4-a716-446655440006', 'BM-20240315-0006', 'negotiating', '2024-07-15', '2024-07-22', 3, 'Budget-conscious travelers', 'GBP'),
('bb0e8400-e29b-41d4-a716-446655440007', '990e8400-e29b-41d4-a716-446655440005', 'user_demo_agent_5', 'aa0e8400-e29b-41d4-a716-446655440007', 'BM-20240315-0007', 'viewed', '2024-08-01', '2024-08-05', 2, 'Wellness retreat', 'AUD'),
('bb0e8400-e29b-41d4-a716-446655440008', '990e8400-e29b-41d4-a716-446655440005', 'user_demo_agent_5', 'aa0e8400-e29b-41d4-a716-446655440008', 'BM-20240315-0008', 'expired', '2024-02-01', '2024-02-05', 4, 'Last minute booking', 'USD');

-- Insert quote hotels (accommodations for each quote)
INSERT INTO quote_hotels (id, quote_id, hotel_id, room_id, check_in_date, check_out_date, room_count, guests_per_room, rate_per_night_idr, total_nights, subtotal_idr) VALUES
-- Quote 1: Honeymoon at Ubud Serenity Resort
('cc0e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '2024-04-15', '2024-04-20', 1, 2, 2500000, 5, 12500000),

-- Quote 2: Family at Seminyak Beach Hotel
('cc0e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006', '2024-05-10', '2024-05-17', 1, 4, 3200000, 7, 22400000),

-- Quote 3: Group at Canggu Surf Lodge
('cc0e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440009', '2024-06-01', '2024-06-08', 2, 3, 2000000, 7, 28000000),

-- Quote 4: Anniversary at Nusa Dua Luxury Resort
('cc0e8400-e29b-41d4-a716-446655440004', 'bb0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440013', '2024-03-25', '2024-03-30', 1, 2, 6500000, 5, 32500000),

-- Quote 5: Corporate retreat at Sanur Peaceful Villa
('cc0e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440010', '2024-04-01', '2024-04-10', 2, 4, 2000000, 9, 36000000),

-- Quote 6: Budget travelers at Canggu Surf Lodge
('cc0e8400-e29b-41d4-a716-446655440006', 'bb0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440007', '2024-07-15', '2024-07-22', 2, 2, 1200000, 7, 16800000),

-- Quote 7: Wellness retreat at Ubud Serenity Resort
('cc0e8400-e29b-41d4-a716-446655440007', 'bb0e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440002', '2024-08-01', '2024-08-05', 1, 2, 4500000, 4, 18000000),

-- Quote 8: Last minute at Seminyak Beach Hotel
('cc0e8400-e29b-41d4-a716-446655440008', 'bb0e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', '2024-02-01', '2024-02-05', 2, 2, 1800000, 4, 14400000);

-- Insert quote transport (transportation for each quote)
INSERT INTO quote_transport (id, quote_id, service_id, pickup_location, dropoff_location, pickup_datetime, passenger_count, distance_km, rate_idr, subtotal_idr, special_instructions) VALUES
-- Quote 1: Airport pickup + day trip
('dd0e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440001', 'Ngurah Rai Airport', 'Ubud Serenity Resort', '2024-04-15 14:00:00+07', 2, NULL, 350000, 350000, 'Flight arrives at 2 PM'),
('dd0e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440001', '880e8400-e29b-41d4-a716-446655440004', 'Ubud Serenity Resort', 'Various temples and rice terraces', '2024-04-17 09:00:00+07', 2, NULL, 800000, 800000, 'Full day Ubud cultural tour'),

-- Quote 2: Airport pickup + local tour
('dd0e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440007', 'Ngurah Rai Airport', 'Seminyak Beach Hotel', '2024-05-10 16:30:00+07', 4, NULL, 400000, 400000, 'Family with 2 children'),
('dd0e8400-e29b-41d4-a716-446655440004', 'bb0e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440005', 'Seminyak Beach Hotel', 'Tanah Lot and surroundings', '2024-05-13 10:00:00+07', 4, NULL, 600000, 600000, 'Half day family tour'),

-- Quote 3: Group transport
('dd0e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440006', 'Ngurah Rai Airport', 'Canggu Surf Lodge', '2024-06-01 12:00:00+07', 6, NULL, 1200000, 1200000, 'Group of friends'),
('dd0e8400-e29b-41d4-a716-446655440006', 'bb0e8400-e29b-41d4-a716-446655440003', '880e8400-e29b-41d4-a716-446655440006', 'Canggu Surf Lodge', 'Volcano and hot springs', '2024-06-04 08:00:00+07', 6, NULL, 1200000, 1200000, 'Adventure day trip'),

-- Quote 4: Luxury transport
('dd0e8400-e29b-41d4-a716-446655440007', 'bb0e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440011', 'Ngurah Rai Airport', 'Nusa Dua Luxury Resort', '2024-03-25 20:00:00+07', 2, NULL, 750000, 750000, 'VIP service required'),
('dd0e8400-e29b-41d4-a716-446655440008', 'bb0e8400-e29b-41d4-a716-446655440004', '880e8400-e29b-41d4-a716-446655440012', 'Nusa Dua Luxury Resort', 'Romantic dinner locations', '2024-03-27 18:00:00+07', 2, NULL, 1500000, 1500000, 'Anniversary dinner tour'),

-- Quote 5: Corporate transport
('dd0e8400-e29b-41d4-a716-446655440009', 'bb0e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440007', 'Ngurah Rai Airport', 'Sanur Peaceful Villa', '2024-04-01 10:00:00+07', 8, NULL, 400000, 400000, 'Corporate group arrival'),
('dd0e8400-e29b-41d4-a716-446655440010', 'bb0e8400-e29b-41d4-a716-446655440005', '880e8400-e29b-41d4-a716-446655440006', 'Sanur Peaceful Villa', 'Team building venues', '2024-04-05 09:00:00+07', 8, NULL, 1200000, 1200000, 'Team building activities'),

-- Quote 6: Budget transport
('dd0e8400-e29b-41d4-a716-446655440011', 'bb0e8400-e29b-41d4-a716-446655440006', '880e8400-e29b-41d4-a716-446655440009', 'Ngurah Rai Airport', 'Canggu Surf Lodge', '2024-07-15 11:00:00+07', 3, 35, 6000, 210000, 'Budget option'),

-- Quote 7: Wellness transport
('dd0e8400-e29b-41d4-a716-446655440012', 'bb0e8400-e29b-41d4-a716-446655440007', '880e8400-e29b-41d4-a716-446655440001', 'Ngurah Rai Airport', 'Ubud Serenity Resort', '2024-08-01 15:00:00+07', 2, NULL, 350000, 350000, 'Wellness retreat guests'),

-- Quote 8: Last minute transport
('dd0e8400-e29b-41d4-a716-446655440013', 'bb0e8400-e29b-41d4-a716-446655440008', '880e8400-e29b-41d4-a716-446655440002', 'Ngurah Rai Airport', 'Seminyak Beach Hotel', '2024-02-01 22:00:00+07', 4, NULL, 450000, 450000, 'Late night arrival');

-- Update quote totals using the function
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440001');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440002');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440003');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440004');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440005');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440006');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440007');
SELECT update_quote_totals('bb0e8400-e29b-41d4-a716-446655440008');

-- Insert sample payments
INSERT INTO payments (id, quote_id, amount_idr, currency_code, exchange_rate, display_amount, payment_method, status, transaction_id, processed_at) VALUES
('ee0e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440004', 37375000, 'USD', 0.0000635, 2373.44, 'bank_transfer', 'completed', 'TXN_20240325_001', '2024-03-25 10:30:00+07'),
('ee0e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440005', 44040000, 'USD', 0.0000635, 2796.54, 'credit_card', 'completed', 'TXN_20240401_002', '2024-04-01 14:15:00+07');

-- Insert sample commissions
INSERT INTO commissions (id, agent_id, quote_id, payment_id, commission_rate, base_amount_idr, commission_amount_idr, status, paid_at) VALUES
('ff0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440004', 'ee0e8400-e29b-41d4-a716-446655440001', 0.15, 32500000, 4875000, 'paid', '2024-03-26 09:00:00+07'),
('ff0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440005', 'ee0e8400-e29b-41d4-a716-446655440002', 0.10, 36000000, 3600000, 'paid', '2024-04-02 11:30:00+07');

-- Insert sample notifications
INSERT INTO notifications (id, agent_id, type, title, message, data) VALUES
('110e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'quote_created', 'New Quote Created', 'Quote BM-20240315-0001 has been created for Ramesh Sharma', '{"quote_id": "bb0e8400-e29b-41d4-a716-446655440001"}'),
('110e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', 'payment_received', 'Payment Received', 'Payment of $2,373.44 received for quote BM-20240315-0004', '{"quote_id": "bb0e8400-e29b-41d4-a716-446655440004", "amount": "$2,373.44"}'),
('110e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 'commission_earned', 'Commission Earned', 'You earned ₹4,875,000 commission from quote BM-20240315-0004', '{"commission_amount": "₹4,875,000", "quote_id": "bb0e8400-e29b-41d4-a716-446655440004"}'),
('110e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440003', 'quote_accepted', 'Quote Accepted', 'Quote BM-20240315-0003 has been accepted by Vikram Singh', '{"quote_id": "bb0e8400-e29b-41d4-a716-446655440003"}'),
('110e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440005', 'system_alert', 'Welcome to Bali Malayali Platform', 'Welcome! Your account has been approved and you can start creating quotes.', '{}');

-- Insert sample quote funnel events
INSERT INTO quote_funnel_events (id, quote_id, agent_id, event_type, metadata, ip_address) VALUES
('120e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'quote_created', '{"client_name": "Ramesh Sharma"}', '192.168.1.100'),
('120e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 'quote_created', '{"client_name": "Deepika Patel"}', '192.168.1.100'),
('120e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', 'quote_sent', '{"sent_via": "email"}', '192.168.1.100'),
('120e8400-e29b-41d4-a716-446655440004', 'bb0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440002', 'quote_accepted', '{"acceptance_method": "email_reply"}', '192.168.1.101'),
('120e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440002', 'payment_completed', '{"payment_method": "bank_transfer"}', '192.168.1.101');

-- Insert sample AI recommendations
INSERT INTO ai_recommendations (id, agent_id, recommendation_type, title, description, confidence_score, data) VALUES
('130e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', 'hotel_combo', 'High Converting Hotel Combination', 'Ubud Serenity Resort + Seminyak Beach Hotel combination has 85% acceptance rate', 0.85, '{"hotels": ["Ubud Serenity Resort", "Seminyak Beach Hotel"], "conversion_rate": 0.85}'),
('130e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', 'pricing_optimization', 'Margin Optimization', 'Consider increasing margin to 18% for luxury packages - market analysis shows acceptance', 0.78, '{"current_margin": 0.15, "suggested_margin": 0.18, "package_type": "luxury"}'),
('130e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', 'itinerary_structure', 'Optimal Itinerary Length', '7-day packages have highest satisfaction scores for corporate groups', 0.92, '{"optimal_days": 7, "group_type": "corporate", "satisfaction_score": 0.92}');

-- Insert sample system logs
INSERT INTO system_logs (level, message, metadata, source) VALUES
('info', 'Database schema initialized successfully', '{"version": "1.0", "tables_created": 25}', 'migration'),
('info', 'Demo data populated successfully', '{"agents": 5, "quotes": 8, "hotels": 5}', 'seed_data'),
('info', 'Exchange rates updated', '{"currencies_updated": 8, "source": "exchangerate.host"}', 'fx_engine'),
('warn', 'Quote expiry check completed', '{"quotes_checked": 8, "expired": 1}', 'cron_job'),
('info', 'Analytics views refreshed', '{"views": ["quote_analytics", "agent_performance"]}', 'analytics');

-- Insert sample retry queue items
INSERT INTO retry_queue (job_type, payload, max_retries, next_retry_at) VALUES
('pdf_generation', '{"quote_id": "bb0e8400-e29b-41d4-a716-446655440001", "template": "standard"}', 3, NOW() + INTERVAL '1 hour'),
('email_notification', '{"agent_id": "990e8400-e29b-41d4-a716-446655440001", "type": "quote_reminder"}', 5, NOW() + INTERVAL '30 minutes'),
('fx_rate_fetch', '{"currencies": ["USD", "EUR", "GBP"], "source": "exchangerate.host"}', 3, NOW() + INTERVAL '15 minutes');

-- Refresh materialized views with initial data
SELECT refresh_analytics_views();

-- Insert sample quote expiry records
INSERT INTO quote_expiry (quote_id, original_rate, current_rate, rate_change_percentage, expired, expiry_reason) VALUES
('bb0e8400-e29b-41d4-a716-446655440008', 0.0000635, 0.0000635, 0.0, true, 'Quote expired by date');

-- Insert sample copilot logs
INSERT INTO copilot_logs (agent_id, function_name, input_data, output_data, execution_time_ms, success) VALUES
('990e8400-e29b-41d4-a716-446655440001', 'recommend_hotels', '{"location": "Ubud", "budget": "luxury", "guests": 2}', '{"recommendations": [{"hotel_id": "550e8400-e29b-41d4-a716-446655440001", "confidence": 0.95}]}', 245, true),
('990e8400-e29b-41d4-a716-446655440002', 'optimize_itinerary', '{"days": 7, "interests": ["culture", "beach", "adventure"]}', '{"optimized_schedule": "3 days Ubud, 4 days Seminyak"}', 1200, true),
('990e8400-e29b-41d4-a716-446655440003', 'analyze_pricing', '{"quote_id": "bb0e8400-e29b-41d4-a716-446655440005"}', '{"suggested_margin": 0.12, "market_comparison": "competitive"}', 890, true);

-- Create some quote versions for revision tracking
INSERT INTO quote_versions (quote_id, version_number, data, created_by) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', 1, '{"hotels": [{"hotel_id": "550e8400-e29b-41d4-a716-446655440001", "room_type": "double", "nights": 5}], "transport": [{"type": "airport_pickup"}], "total_idr": 13650000}', '990e8400-e29b-41d4-a716-446655440001'),
('bb0e8400-e29b-41d4-a716-446655440002', 1, '{"hotels": [{"hotel_id": "550e8400-e29b-41d4-a716-446655440002", "room_type": "suite", "nights": 7}], "transport": [{"type": "airport_pickup"}, {"type": "local_tour"}], "total_idr": 23400000}', '990e8400-e29b-41d4-a716-446655440001'),
('bb0e8400-e29b-41d4-a716-446655440003', 1, '{"hotels": [{"hotel_id": "550e8400-e29b-41d4-a716-446655440003", "room_type": "family", "nights": 7, "rooms": 2}], "transport": [{"type": "group_transport"}], "total_idr": 31600000}', '990e8400-e29b-41d4-a716-446655440002');

-- Set some quotes to have locked prices (status changed from draft to sent/final)
UPDATE quotes 
SET price_locked_at = created_at + INTERVAL '1 hour'
WHERE status IN ('sent', 'viewed', 'negotiating', 'final', 'accepted', 'paid', 'confirmed');

-- Set expiry dates for active quotes (30 days from creation)
UPDATE quotes 
SET expires_at = created_at + INTERVAL '30 days'
WHERE status IN ('sent', 'viewed', 'negotiating') AND expires_at IS NULL;

-- Demo data population complete
INSERT INTO system_logs (level, message, metadata, source) VALUES
('info', 'Demo data population completed successfully', 
 '{"agents": 5, "clients": 8, "quotes": 8, "hotels": 5, "rooms": 14, "transport_providers": 4, "transport_services": 13, "payments": 2, "commissions": 2}', 
 'demo_data_seed');

COMMENT ON SCHEMA public IS 'Bali Malayali B2B Travel Platform - Demo Data Populated v1.0';