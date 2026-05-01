import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. ' +
      'Server-side Supabase calls will fail.'
  );
}

/**
 * Server-side Supabase client. Uses service role key to bypass RLS for
 * server-rendered share viewer queries. NEVER use in client components.
 */
export const supabaseAdmin = createClient(
  supabaseUrl ?? '',
  supabaseServiceKey ?? '',
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);
