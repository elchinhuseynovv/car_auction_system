/*
  # Add remaining mock vehicles

  1. Changes
    - Insert remaining mock vehicle data with matching IDs
    - Ensure seller profile exists
*/

-- First, ensure we have a test profile if not exists
INSERT INTO profiles (id, first_name, last_name)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Test', 'Seller')
ON CONFLICT (id) DO NOTHING;

-- Insert remaining vehicles
INSERT INTO vehicles (
  id,
  title,
  make,
  model,
  year,
  mileage,
  fuel_type,
  transmission,
  color,
  description,
  images,
  starting_bid,
  current_bid,
  bid_increment,
  end_time,
  seller_id,
  category,
  features,
  condition,
  location
) VALUES
(
  '123e4567-e89b-12d3-a456-426614174001',
  '2022 BMW M4 Competition',
  'BMW',
  'M4 Competition',
  2022,
  8500,
  'Gasoline',
  'Automatic',
  'Alpine White',
  'High-performance luxury coupe with M Sport package. One owner, garage kept.',
  ARRAY['https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
  62000,
  62000,
  500,
  NOW() + INTERVAL '5 days',
  '00000000-0000-0000-0000-000000000000',
  'Sports',
  ARRAY['M Sport Package', 'Carbon Fiber Trim', 'Harman Kardon Audio'],
  'Excellent',
  'Miami, FL'
),
(
  '123e4567-e89b-12d3-a456-426614174002',
  '2024 Audi e-tron GT',
  'Audi',
  'e-tron GT',
  2024,
  3200,
  'Electric',
  'Automatic',
  'Daytona Gray',
  'All-electric performance sedan with cutting-edge technology and premium interior.',
  ARRAY['https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
  82000,
  82000,
  1000,
  NOW() + INTERVAL '10 days',
  '00000000-0000-0000-0000-000000000000',
  'Electric',
  ARRAY['Virtual Cockpit', 'Bang & Olufsen Sound System', 'Matrix LED Headlights'],
  'Like New',
  'Los Angeles, CA'
),
(
  '123e4567-e89b-12d3-a456-426614174003',
  '2021 Tesla Model S Plaid',
  'Tesla',
  'Model S Plaid',
  2021,
  12000,
  'Electric',
  'Automatic',
  'Red Multi-Coat',
  'High-performance electric vehicle with incredible acceleration and range.',
  ARRAY['https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
  78000,
  78000,
  500,
  NOW() + INTERVAL '6 days',
  '00000000-0000-0000-0000-000000000000',
  'Electric',
  ARRAY['Autopilot', 'Full Self-Driving Hardware', 'Premium Interior'],
  'Excellent',
  'San Francisco, CA'
),
(
  '123e4567-e89b-12d3-a456-426614174004',
  '2020 Porsche 911 Carrera S',
  'Porsche',
  '911 Carrera S',
  2020,
  18500,
  'Gasoline',
  'PDK',
  'GT Silver Metallic',
  'Iconic sports car with exceptional handling and performance. Well maintained with full service history.',
  ARRAY['https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
  88000,
  88000,
  1000,
  NOW() + INTERVAL '8 days',
  '00000000-0000-0000-0000-000000000000',
  'Sports',
  ARRAY['Sport Chrono Package', 'PASM Sport Suspension', 'Premium Package'],
  'Very Good',
  'Chicago, IL'
),
(
  '123e4567-e89b-12d3-a456-426614174005',
  '2022 Range Rover Sport HSE',
  'Land Rover',
  'Range Rover Sport HSE',
  2022,
  15000,
  'Gasoline',
  'Automatic',
  'Santorini Black',
  'Luxury SUV with off-road capability and premium interior. Dealer maintained.',
  ARRAY['https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
  72000,
  72000,
  500,
  NOW() + INTERVAL '9 days',
  '00000000-0000-0000-0000-000000000000',
  'SUV',
  ARRAY['Panoramic Roof', 'Meridian Sound System', 'Terrain Response 2'],
  'Excellent',
  'Dallas, TX'
) ON CONFLICT (id) DO NOTHING;