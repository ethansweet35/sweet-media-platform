import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { scanAppRoutes } from "../scanAppRoutes";
import {
  buildSitemapPartitionEntries,
  discoverSitemapGroups,
  toSitemapIndexXml,
  toSitemapXml,
  type SitemapConfig,
  type SitemapPageRow,
  type SitemapPostRow,
} from "../sitemap";

export type PublicSitemapSources = {
  pages: SitemapPageRow[];
  posts: SitemapPostRow[];
  config: SitemapConfig | null;
};

function createPublicSitemapClient(supabaseUrl: string, supabaseAnonKey: string): SupabaseClient {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false, storageKey: "sitemap-server" },
  });
}

async function loadSitemapConfig(client: SupabaseClient): Promise<SitemapConfig | null> {
  const { data, error } = await client
    .from("system_settings")
    .select("value")
    .eq("key", "sitemap_config")
    .maybeSingle();

  if (error || !data?.value) return null;
  return data.value as SitemapConfig;
}

export async function loadPublicSitemapSources(options: {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  cwd?: string;
}): Promise<PublicSitemapSources> {
  const supabaseUrl = options.supabaseUrl?.trim();
  const supabaseAnonKey = options.supabaseAnonKey?.trim();
  const cwd = options.cwd ?? process.cwd();

  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      pages: scanAppRoutes(cwd),
      posts: [],
      config: null,
    };
  }

  const client = createPublicSitemapClient(supabaseUrl, supabaseAnonKey);
  const [pagesRes, postsRes, config] = await Promise.all([
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
    loadSitemapConfig(client),
  ]);

  let pages = pagesRes.error ? [] : ((pagesRes.data as SitemapPageRow[] | null) ?? []);
  const posts = postsRes.error ? [] : ((postsRes.data as SitemapPostRow[] | null) ?? []);

  if (pages.length === 0) {
    pages = scanAppRoutes(cwd);
  }

  return { pages, posts, config };
}

export async function buildPublicSitemapIndexXml(options: {
  origin: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  cwd?: string;
}): Promise<string> {
  const { pages, posts, config } = await loadPublicSitemapSources(options);
  const groups = discoverSitemapGroups(pages, posts, config);
  return toSitemapIndexXml(options.origin, groups);
}

export async function buildPublicSitemapGroupXml(options: {
  origin: string;
  groupId: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  cwd?: string;
}): Promise<string> {
  const { pages, posts, config } = await loadPublicSitemapSources(options);
  const entries = buildSitemapPartitionEntries(options.origin, options.groupId, pages, posts, config);
  return toSitemapXml(entries);
}
