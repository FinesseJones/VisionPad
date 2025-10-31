import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://dpurasnfugybmoopzjym.supabase.co';
const supabaseKey = 'sb_publishable_eFI0179CO5z0wKXU2Yxlpw_eO6Dh1NX';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };