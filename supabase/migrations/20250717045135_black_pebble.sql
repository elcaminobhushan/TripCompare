/*
  # Initial Schema for TripCompare

  1. New Tables
    - `packages` - Main package information
    - `destinations` - Destination information
    - `tour_operators` - Tour operator information
    - `package_inclusions` - Package inclusions
    - `package_exclusions` - Package exclusions
    - `package_tags` - Package tags
    - `package_transports` - Package transport relations
    - `transports` - Transport information
    - `accommodations` - Accommodation information
    - `accommodation_amenities` - Accommodation amenities
    - `itinerary_days` - Itinerary days
    - `itinerary_activities` - Itinerary activities relations
    - `activities` - Activity information
    - `itinerary_transports` - Itinerary transport relations
    - `itinerary_meals` - Itinerary meal relations
    - `meals` - Meal information
    - `reviews` - Package reviews

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  destination_id UUID NOT NULL,
  image TEXT NOT NULL,
  price INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  rating NUMERIC(3,1) NOT NULL,
  reviews INTEGER NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  accommodation_id UUID NOT NULL,
  tour_operator_id UUID NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  discount INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  popular_months TEXT[] NOT NULL,
  climate TEXT NOT NULL,
  languages TEXT[] NOT NULL,
  currency TEXT NOT NULL,
  time_zone TEXT NOT NULL,
  trending BOOLEAN NOT NULL DEFAULT false,
  searches INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tour_operators table
CREATE TABLE IF NOT EXISTS tour_operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  description TEXT NOT NULL,
  rating NUMERIC(3,1) NOT NULL,
  reviews INTEGER NOT NULL DEFAULT 0,
  years_in_business INTEGER NOT NULL,
  specializations TEXT[] NOT NULL,
  certifications TEXT[] NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create package_inclusions table
CREATE TABLE IF NOT EXISTS package_inclusions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create package_exclusions table
CREATE TABLE IF NOT EXISTS package_exclusions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create package_tags table
CREATE TABLE IF NOT EXISTS package_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create transports table
CREATE TABLE IF NOT EXISTS transports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create package_transports table
CREATE TABLE IF NOT EXISTS package_transports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  transport_id UUID NOT NULL REFERENCES transports(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  rating NUMERIC(3,1) NOT NULL,
  image TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create accommodation_amenities table
CREATE TABLE IF NOT EXISTS accommodation_amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  accommodation_id UUID NOT NULL REFERENCES accommodations(id) ON DELETE CASCADE,
  amenity TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create itinerary_days table
CREATE TABLE IF NOT EXISTS itinerary_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  accommodation_id UUID REFERENCES accommodations(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  image TEXT NOT NULL,
  included BOOLEAN NOT NULL DEFAULT true,
  price INTEGER,
  minimum_age INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create itinerary_activities table
CREATE TABLE IF NOT EXISTS itinerary_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_day_id UUID NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create itinerary_transports table
CREATE TABLE IF NOT EXISTS itinerary_transports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_day_id UUID NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
  transport_id UUID NOT NULL REFERENCES transports(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  cuisine TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  included BOOLEAN NOT NULL DEFAULT true,
  price INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create itinerary_meals table
CREATE TABLE IF NOT EXISTS itinerary_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  itinerary_day_id UUID NOT NULL REFERENCES itinerary_days(id) ON DELETE CASCADE,
  meal_id UUID NOT NULL REFERENCES meals(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add foreign key constraints
ALTER TABLE packages ADD CONSTRAINT fk_packages_destination
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE;

ALTER TABLE packages ADD CONSTRAINT fk_packages_accommodation
  FOREIGN KEY (accommodation_id) REFERENCES accommodations(id) ON DELETE CASCADE;

ALTER TABLE packages ADD CONSTRAINT fk_packages_tour_operator
  FOREIGN KEY (tour_operator_id) REFERENCES tour_operators(id) ON DELETE CASCADE;

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_inclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_exclusions ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE transports ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_transports ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodation_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_transports ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON packages FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON destinations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tour_operators FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON package_inclusions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON package_exclusions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON package_tags FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON transports FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON package_transports FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON accommodations FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON accommodation_amenities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON itinerary_days FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON activities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON itinerary_activities FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON itinerary_transports FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON meals FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON itinerary_meals FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON reviews FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update their own reviews
CREATE POLICY "Allow authenticated users to insert reviews" ON reviews 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own reviews" ON reviews 
  FOR UPDATE USING (auth.uid() = user_id);