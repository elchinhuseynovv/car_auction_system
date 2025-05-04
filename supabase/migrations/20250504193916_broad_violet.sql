/*
  # Add initial vehicles

  1. Changes
    - Insert initial vehicle data for testing
    - Use realistic values for all fields
    - Set reasonable starting bids and increments
*/

INSERT INTO vehicles (
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
  (SELECT id FROM profiles LIMIT 1), -- Get the first available profile as seller
  'Luxury',
  ARRAY['Heated Seats', 'Navigation', 'Sunroof', 'Premium Sound System'],
  'Excellent',
  'New York, NY'
),
(
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
  (SELECT id FROM profiles LIMIT 1),
  'Sports',
  ARRAY['M Sport Package', 'Carbon Fiber Trim', 'Harman Kardon Audio'],
  'Excellent',
  'Miami, FL'
),
(
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
  (SELECT id FROM profiles LIMIT 1),
  'Electric',
  ARRAY['Virtual Cockpit', 'Bang & Olufsen Sound System', 'Matrix LED Headlights'],
  'Like New',
  'Los Angeles, CA'
);