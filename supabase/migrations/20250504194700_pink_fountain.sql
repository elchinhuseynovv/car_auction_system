/*
  # Add initial vehicles and fix bid constraints

  1. Changes
    - Insert initial vehicle data for testing
    - Add necessary profile data
    - Set reasonable starting bids and increments
*/

-- First, ensure we have a test profile
INSERT INTO profiles (id, first_name, last_name)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Test', 'Seller')
ON CONFLICT (id) DO NOTHING;

-- Insert vehicle data
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
  '123e4567-e89b-12d3-a456-426614174000',
  '2023 Mercedes-Benz S-Class',
  'Mercedes-Benz',
  'S-Class',
  2023,
  5000,
  'Hybrid',
  'Automatic',
  'Black',
  'Luxury sedan with premium features and excellent condition. Low mileage and well maintained.',
  ARRAY['https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'],
  65000,
  65000,
  500,
  NOW() + INTERVAL '7 days',
  '00000000-0000-0000-0000-000000000000',
  'Luxury',
  ARRAY['Heated Seats', 'Navigation', 'Sunroof', 'Premium Sound System'],
  'Excellent',
  'New York, NY'
) ON CONFLICT (id) DO NOTHING;