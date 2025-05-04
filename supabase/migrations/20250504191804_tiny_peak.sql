/*
  # Reset and clean up database state

  1. Changes
    - Drop all existing tables and functions
    - Recreate tables with proper constraints
    - Set up RLS policies
    - Create necessary triggers and functions
*/

-- Drop existing objects
DROP TABLE IF EXISTS bids CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS check_bid_validity() CASCADE;
DROP FUNCTION IF EXISTS update_vehicle_current_bid() CASCADE;

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vehicles table
CREATE TABLE vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  mileage integer NOT NULL,
  fuel_type text NOT NULL,
  transmission text NOT NULL,
  color text NOT NULL,
  description text NOT NULL,
  images text[] NOT NULL DEFAULT '{}',
  starting_bid numeric NOT NULL,
  current_bid numeric NOT NULL,
  bid_increment numeric NOT NULL CHECK (bid_increment > 0),
  end_time timestamptz NOT NULL,
  seller_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  condition text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT vehicles_current_bid_check CHECK (current_bid >= starting_bid)
);

-- Create bids table
CREATE TABLE bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS vehicles_category_idx ON vehicles(category);
CREATE INDEX IF NOT EXISTS vehicles_make_model_idx ON vehicles(make, model);
CREATE INDEX IF NOT EXISTS vehicles_end_time_idx ON vehicles(end_time);
CREATE INDEX IF NOT EXISTS bids_vehicle_id_idx ON bids(vehicle_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Vehicles policies
CREATE POLICY "Anyone can view vehicles"
  ON vehicles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update own vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Bids policies
CREATE POLICY "Anyone can view bids"
  ON bids FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, '', '');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION check_bid_validity()
RETURNS trigger AS $$
DECLARE
  vehicle_record RECORD;
BEGIN
  SELECT current_bid, bid_increment, end_time
  INTO vehicle_record
  FROM vehicles
  WHERE id = NEW.vehicle_id;

  IF vehicle_record.end_time < now() THEN
    RAISE EXCEPTION 'Auction has ended';
  END IF;

  IF NEW.amount <= vehicle_record.current_bid THEN
    RAISE EXCEPTION 'Bid must be higher than current bid';
  END IF;

  IF NEW.amount < (vehicle_record.current_bid + vehicle_record.bid_increment) THEN
    RAISE EXCEPTION 'Bid must meet minimum increment requirement';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION update_vehicle_current_bid()
RETURNS trigger AS $$
BEGIN
  UPDATE vehicles
  SET current_bid = NEW.amount,
      updated_at = now()
  WHERE id = NEW.vehicle_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

CREATE TRIGGER check_bid_before_insert
  BEFORE INSERT ON bids
  FOR EACH ROW EXECUTE FUNCTION check_bid_validity();

CREATE TRIGGER update_vehicle_bid
  AFTER INSERT ON bids
  FOR EACH ROW EXECUTE FUNCTION update_vehicle_current_bid();