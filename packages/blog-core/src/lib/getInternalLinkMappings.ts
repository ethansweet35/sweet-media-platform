import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";
import type { AutoLinkMapping } from "./autoInternalLinks";

let _client: SupabaseClient | null = null;
let _clientKey: string | null = null;

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Service role bypasses RLS; falls back to anon (which can read active=true rows
  // because internal_links has a public read policy in the schema).
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  if (_client && _clientKey === key) return _client;

  _client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: "internal-links-fetcher",
    },
  });
  _clientKey = key;
  return _client;
}

/**
 * Server-only fetcher for active internal_links mappings.
 * React `cache()` ensures one DB hit per request even if many <AutoLinkedText>
 * components render on the same page.
 */
export const getInternalLinkMappings = cache(
  async (): Promise<AutoLinkMapping[]> => {
    const client = getClient();
    if (!client) return [];

    try {
      const { data, error } = await client
        .from("internal_links")
        .select("keyword, href, priority")
        .eq("active", true)
        .order("priority", { ascending: false });

      if (error || !data) return [];

      return (data as { keyword: string; href: string; priority: number }[]).map(
        (row) => ({
          keyword: row.keyword,
          href: row.href,
          priority: row.priority,
        })
      );
    } catch {
      return [];
    }
  }
);
