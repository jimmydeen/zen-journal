import { createClient } from '@supabase/supabase-js'

const supabase_url = process.env.REACT_APP_SUPABASE_URL
const supabase_key = process.env.REACT_APP_SUPABASE_KEY

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabase_url, supabase_key);
export default supabase
