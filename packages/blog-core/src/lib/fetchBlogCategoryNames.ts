import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getBrandBlogCategoryDefaults,
  isTemplateBlogCategoryList,
} from "./brandBlogCategoryDefaults";

export interface FetchBlogCategoryNamesOptions {
  siteId: string;
  /** `brand_settings.site_key` — defaults to `siteId`. */
  siteKey?: string;
  /**
   * Merge categories already used on posts (default false).
   * Admin dropdowns should leave this false so stray values (e.g. migrated "SEO") do not appear.
   */
  includeFromPosts?: boolean;
  /** When true, only read categories from published posts (only applies if includeFromPosts). */
  publishedPostsOnly?: boolean;
  /** Always include these values (e.g. current post category while editing). */
  ensureValues?: string[];
}

export async function fetchBlogCategoryNames(
  client: SupabaseClient,
  opts: FetchBlogCategoryNamesOptions
): Promise<string[]> {
  const siteKey = opts.siteKey ?? opts.siteId;
  const brandDefaults = getBrandBlogCategoryDefaults(opts.siteId);
  const seen = new Set<string>();
  const ordered: string[] = [];

  const add = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    ordered.push(trimmed);
  };

  const addMany = (names: string[]) => {
    for (const name of names) add(name);
  };

  const { data: tableCats } = await client
    .from("blog_categories")
    .select("name, sort_order")
    .eq("site_id", opts.siteId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const tableNames =
    tableCats?.map((r) => (typeof r.name === "string" ? r.name.trim() : "")).filter(Boolean) ??
    [];

  if (tableNames.length > 0 && !(brandDefaults && isTemplateBlogCategoryList(tableNames))) {
    addMany(tableNames);
  }

  const { data: brand } = await client
    .from("brand_settings")
    .select("blog_categories")
    .eq("site_key", siteKey)
    .maybeSingle();

  const brandCats = Array.isArray(brand?.blog_categories)
    ? (brand.blog_categories as unknown[]).filter((c): c is string => typeof c === "string")
    : [];

  if (
    brandCats.length > 0 &&
    !(brandDefaults && isTemplateBlogCategoryList(brandCats))
  ) {
    addMany(brandCats);
  }

  if (ordered.length === 0 && brandDefaults) {
    addMany(brandDefaults);
  }

  if (opts.includeFromPosts === true) {
    let query = client.from("blog_posts").select("category").not("category", "is", null);
    if (opts.publishedPostsOnly) {
      query = query.eq("status", "published");
    }
    const { data: posts } = await query;
    const canonical = new Set(ordered);
    const fromPosts = (posts ?? [])
      .map((r) => r.category)
      .filter((c): c is string => typeof c === "string" && c.trim().length > 0)
      .filter((c) => canonical.has(c.trim()))
      .sort((a, b) => a.localeCompare(b));
    addMany(fromPosts);
  }

  for (const v of opts.ensureValues ?? []) {
    if (typeof v === "string") add(v);
  }

  if (ordered.length === 0 && brandDefaults) {
    addMany(brandDefaults);
  }

  return ordered;
}
