import { createClient } from "@supabase/supabase-js";
import { dbToBlogPost, type BlogPost, type DbBlogPost } from "@/types/blog";
import type { AutoLinkMapping } from "@/lib/autoInternalLinks";

/** Isolated anon client so we never touch the browser session or default storageKey. */
function createBlogRenderSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";
  if (!url || !key) {
    throw new Error("Supabase URL and anon/public key required for SSR blog fetch.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: "blog-render-ssr",
    },
  });
}

export async function fetchPublishedBlogPostForRender(slug: string): Promise<BlogPost | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!url || !key) return null;

  const client = createBlogRenderSupabaseClient();

  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;

  try {
    return dbToBlogPost(data as DbBlogPost);
  } catch {
    return null;
  }
}

export async function fetchPublishedBlogPostsForListing(): Promise<BlogPost[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!url || !key) return [];

  const client = createBlogRenderSupabaseClient();

  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error || !data) return [];

  try {
    return (data as DbBlogPost[]).map(dbToBlogPost);
  } catch {
    return [];
  }
}

export async function fetchManualLinkMappingsForServer(): Promise<AutoLinkMapping[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!url || !key) return [];

  const client = createBlogRenderSupabaseClient();

  const { data, error } = await client
    .from("internal_links")
    .select("keyword, href, priority")
    .eq("active", true)
    .order("priority", { ascending: false });

  if (error || !data) return [];

  return data.map((row: { keyword: string; href: string; priority: number }) => ({
    keyword: row.keyword,
    href: row.href,
    priority: row.priority,
  }));
}
