import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { buildSitemapEntries, type SitemapPageRow, type SitemapPostRow } from "@sweetmedia/admin-core";
import { getPublicSiteOrigin } from "@/lib/publicSiteUrl";

export const revalidate = 86400;

// Scans src/app at request time when tracked_pages is empty.
function scanAppRoutes(): SitemapPageRow[] {
  const appDir = join(process.cwd(), "src", "app");
  function collect(dir: string): string[] {
    const out: string[] = [];
    try {
      for (const name of readdirSync(dir)) {
        if (name.startsWith(".")) continue;
        const full = join(dir, name);
        if (statSync(full).isDirectory()) out.push(...collect(full));
        else if (name === "page.tsx") out.push(full);
      }
    } catch { /* non-fatal */ }
    return out;
  }
  const seen = new Set<string>();
  const rows: SitemapPageRow[] = [];
  for (const file of collect(appDir).sort()) {
    const norm = relative(appDir, dirname(file)).replace(/\\/g, "/");
    const segs = norm.split("/").filter(Boolean);
    if (segs.some((s) => s.startsWith("@") || /^\([^)]+\)$/.test(s) || s.includes("[") || s === "admin" || s === "api")) continue;
    const route = segs.filter((s) => !s.startsWith("_")).join("/");
    const path = route ? `/${route}` : "/";
    if (!seen.has(path)) { seen.add(path); rows.push({ route_path: path, updated_at: null }); }
  }
  return rows;
}

function createSitemapSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, storageKey: "sitemap-server" } });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createSitemapSupabaseClient();
  const origin = getPublicSiteOrigin();

  let pages: SitemapPageRow[] = [];
  let posts: SitemapPostRow[] = [];

  if (client) {
    const [pagesRes, postsRes] = await Promise.all([
      client.from("tracked_pages").select("route_path,updated_at").eq("is_active", true)
        .order("display_order", { ascending: true }).order("updated_at", { ascending: false }).limit(500),
      client.from("blog_posts").select("slug,updated_at,published_at").eq("status", "published")
        .order("published_at", { ascending: false }).limit(500),
    ]);
    pages = pagesRes.error ? [] : ((pagesRes.data as SitemapPageRow[] | null) ?? []);
    posts = postsRes.error ? [] : ((postsRes.data as SitemapPostRow[] | null) ?? []);
  }

  if (pages.length === 0) pages = scanAppRoutes();

  return buildSitemapEntries(origin, pages, posts).map((e) => ({
    url: e.url,
    lastModified: e.lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
