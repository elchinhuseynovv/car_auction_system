/*
  # Fix Bid Policies and Add Public Read Access

  1. Changes
    - Add policy for public read access to bids
    - Add policy for authenticated users to read all bids
    - Add index on vehicle_id for better query performance

  2. Security
    - Maintain existing RLS policies
    - Add new policies for broader read access
*/

-- Add policy for public read access to bids
CREATE POLICY "Anyone can view bids"
  ON bids
  FOR SELECT
  TO public
  USING (true);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS bids_vehicle_id_idx ON bids(vehicle_id);