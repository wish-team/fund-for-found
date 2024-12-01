import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
