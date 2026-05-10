import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Warn at runtime rather than throwing at module-init time. A synchronous throw
// here crashes the entire client bundle before any error boundary can catch it,
// resulting in a blank page with a frozen spinner. Instead we surface a clear
// console error and let auth calls fail with network errors (which AuthContext
// handles) so the login page can show a readable config-error message.
if (!supabaseUrl || !supabaseKey) {
  console.error(
    "[admin-core] Missing Supabase env vars. " +
      "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY " +
      "(or NEXT_PUBLIC_SUPABASE_ANON_KEY) in your environment."
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseKey ?? "placeholder-key"
);

/** True when the required env vars are present. */
export const supabaseConfigured = !!(supabaseUrl && supabaseKey);
