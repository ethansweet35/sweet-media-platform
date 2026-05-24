import { createClient } from "@supabase/supabase-js";
import type { DbBlogPost } from "../types/blog";

export type BlogPostMetadataRow = Pick<
  DbBlogPost,
  | "title"
  | "seo_title"
  | "meta_title"
  | "meta_description"
  | "excerpt"
  | "hero_image_url"
  | "author"
  | "published_at"
  | "category"
  | "updated_at"
>;

/**
 * Server-only fetch for App Router metadata. Uses NEXT_PUBLIC Supabase env vars.
 */
export async function fetchPublishedBlogPostForMetadata(
  slug: string
): Promise<BlogPostMetadataRow | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const client = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      storageKey: "metadata-fetcher",
    },
  });
  const { data, error } = await client
    .from("blog_posts")
    .select(
      "title, seo_title, meta_title, meta_description, excerpt, hero_image_url, author, published_at, category, updated_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) return null;
  return data as BlogPostMetadataRow;
}
