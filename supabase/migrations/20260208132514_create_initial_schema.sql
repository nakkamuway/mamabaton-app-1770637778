/*
  # Create initial schema for teacher matching platform

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `kana_first_name` (text)
      - `kana_last_name` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `teachers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image_url` (text)
      - `background` (text) - e.g., "専業主婦 50代"
      - `education` (text) - e.g., "最終学歴：高校卒業"
      - `location` (text) - e.g., "東京都港区"
      - `message` (text) - teacher's introduction message
      - `children` (jsonb) - array of children's achievements
      - `specialties` (jsonb) - array of specialties
      - `achievements` (jsonb) - array of achievements
      - `rating` (numeric) - average rating
      - `review_count` (integer) - number of reviews
      - `available_hours` (jsonb) - available time slots
      - `is_active` (boolean) - whether accepting new students
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `teacher_id` (uuid, references teachers)
      - `child_age` (integer)
      - `child_gender` (text)
      - `special_needs` (text)
      - `location` (text)
      - `location_detail` (text)
      - `preferred_date_1` (timestamptz)
      - `preferred_date_2` (timestamptz)
      - `preferred_date_3` (timestamptz)
      - `support_type` (text) - "light", "standard", "premium"
      - `additional_support` (boolean)
      - `status` (text) - "pending", "confirmed", "cancelled", "completed"
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `teacher_id` (uuid, references teachers)
      - `user_id` (uuid, references profiles)
      - `booking_id` (uuid, references bookings)
      - `rating` (integer) - 1 to 5
      - `comment` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read all teacher profiles
      - Create and read their own bookings
      - Create reviews for completed bookings
      - Read and update their own profile
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  kana_first_name text,
  kana_last_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  background text NOT NULL,
  education text NOT NULL,
  location text NOT NULL,
  message text NOT NULL,
  children jsonb DEFAULT '[]'::jsonb,
  specialties jsonb DEFAULT '[]'::jsonb,
  achievements jsonb DEFAULT '[]'::jsonb,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  available_hours jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active teachers"
  ON teachers FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  child_age integer NOT NULL,
  child_gender text NOT NULL,
  special_needs text DEFAULT '',
  location text NOT NULL,
  location_detail text NOT NULL,
  preferred_date_1 timestamptz NOT NULL,
  preferred_date_2 timestamptz,
  preferred_date_3 timestamptz,
  support_type text NOT NULL DEFAULT 'standard',
  additional_support boolean DEFAULT false,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for completed bookings"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE bookings.id = reviews.booking_id
      AND bookings.user_id = auth.uid()
      AND bookings.status = 'completed'
    )
  );

-- Create function to update teacher ratings
CREATE OR REPLACE FUNCTION update_teacher_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE teachers
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2)
      FROM reviews
      WHERE teacher_id = NEW.teacher_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM reviews
      WHERE teacher_id = NEW.teacher_id
    )
  WHERE id = NEW.teacher_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update teacher ratings
CREATE TRIGGER update_teacher_rating_trigger
AFTER INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_teacher_rating();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_teachers_updated_at
BEFORE UPDATE ON teachers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();