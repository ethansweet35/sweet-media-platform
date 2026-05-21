import type { SupabaseClient } from "@supabase/supabase-js";
import { categories as defaultCategoryList } from "../types/blog";

const FALLBACK_NAMES = defaultCategoryList.filter((c) => c !== "All");

export interface FetchBlogCategoryNamesOptions {
  siteId: string;
  /** `brand_settings.site_key` — defaults to `siteId`. */
  siteKey?: string;
  /** Include categories already used on posts (default true). */
  includeFromPosts?: boolean;
  /** When true, only read categories from published posts. */
  publishedPostsOnly?: boolean;
  /** Always include these values (e.g. current post category while editing). */
  ensureValues?: string[];
}

export async function fetchBlogCategoryNames(
  client: SupabaseClient,
  opts: FetchBlogCategoryNamesOptions
): Promise<string[]> {
  const siteKey = opts.siteKey ?? opts.siteId;
  const seen = new Set<string>();
  const ordered: string[] = [];

  const add = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    ordered.push(trimmed);
  };

  const { data: tableCats } = await client
    .from("blog_categories")
    .select("name, sort_order")
    .eq("site_id", opts.siteId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (tableCats?.length) {
    for (const row of tableCats) {
      if (typeof row.name === "string") add(row.name);
    }
  }

  const { data: brand } = await client
    .from("brand_settings")
    .select("blog_categories")
    .eq("site_key", siteKey)
    .maybeSingle();

  const brandCats = brand?.blog_categories;
  if (Array.isArray(brandCats)) {
    for (const c of brandCats) {
      if (typeof c === "string") add(c);
    }
  }

  if (opts.includeFromPosts !== false) {
    let query = client.from("blog_posts").select("category").not("category", "is", null);
    if (opts.publishedPostsOnly) {
      query = query.eq("status", "published");
    }
    const { data: posts } = await query;
    const fromPosts = (posts ?? [])
      .map((r) => r.category)
      .filter((c): c is string => typeof c === "string" && c.trim().length > 0)
      .sort((a, b) => a.localeCompare(b));
    for (const c of fromPosts) add(c);
  }

  for (const v of opts.ensureValues ?? []) {
    if (typeof v === "string") add(v);
  }

  if (ordered.length === 0) {
    for (const c of FALLBACK_NAMES) add(c);
  }

  return ordered;
}
