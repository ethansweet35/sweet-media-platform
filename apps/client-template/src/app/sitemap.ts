import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { buildSitemapEntries, type SitemapPageRow, type SitemapPostRow } from "@sweetmedia/admin-core";
import { getPublicSiteOrigin } from "@/lib/publicSiteUrl";

export const revalidate = 86400;

function createSitemapSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: "sitemap-server",
    },
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createSitemapSupabaseClient();
  const origin = getPublicSiteOrigin();

  if (!client) {
    return buildSitemapEntries(origin, [], []).map((entry) => ({
      url: entry.url,
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    }));
  }

  const [pagesRes, postsRes] = await Promise.all([
    client
      .from("tracked_pages")
      .select("route_path,updated_at")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("updated_at", { ascending: false })
      .limit(500),
    client
      .from("blog_posts")
      .select("slug,updated_at,published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(500),
  ]);

  const pages: SitemapPageRow[] = pagesRes.error ? [] : ((pagesRes.data as SitemapPageRow[] | null) ?? []);
  const posts: SitemapPostRow[] = postsRes.error ? [] : ((postsRes.data as SitemapPostRow[] | null) ?? []);

  return buildSitemapEntries(origin, pages, posts).map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
