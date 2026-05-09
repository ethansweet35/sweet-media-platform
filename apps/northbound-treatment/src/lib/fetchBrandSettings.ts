import { createClient } from "@supabase/supabase-js";
import type { BrandSettings } from "@sweetmedia/seo-schema";

function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: "brand-settings-ssr",
    },
  });
}

/**
 * Fetch the brand_settings row for this app server-side.
 * Safe to call from any Server Component or async route handler.
 * Returns null if the row is missing or env vars are unset — callers
 * should skip schema injection rather than throw.
 */
export async function fetchBrandSettingsForServer(): Promise<BrandSettings | null> {
  const siteKey = process.env.NEXT_PUBLIC_SITE_ID;
  if (!siteKey) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!url || !key) return null;

  try {
    const client = createServerClient();
    const { data, error } = await client
      .from("brand_settings")
      .select("*")
      .eq("site_key", siteKey)
      .single();

    if (error || !data) return null;
    return data as unknown as BrandSettings;
  } catch {
    return null;
  }
}
