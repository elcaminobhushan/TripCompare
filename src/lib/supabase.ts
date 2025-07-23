import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.");
}


// Check if we're using placeholder values
const usingPlaceholders = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');

if (usingPlaceholders) {
  console.error('Missing Supabase credentials. Please connect to Supabase using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly connected
export const isSupabaseConnected = () => {
  return !usingPlaceholders;
};
