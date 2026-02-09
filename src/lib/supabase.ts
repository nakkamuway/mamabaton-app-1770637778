import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Teacher {
  id: string;
  name: string;
  image_url: string;
  background: string;
  education: string;
  location: string;
  message: string;
  children: string[];
  specialties: string[];
  achievements: string[];
  rating: number;
  review_count: number;
  available_hours: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  kana_first_name?: string;
  kana_last_name?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  teacher_id: string;
  child_age: number;
  child_gender: string;
  special_needs: string;
  location: string;
  location_detail: string;
  preferred_date_1: string;
  preferred_date_2?: string;
  preferred_date_3?: string;
  support_type: string;
  additional_support: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  teacher_id: string;
  user_id: string;
  booking_id?: string;
  rating: number;
  comment: string;
  created_at: string;
}
