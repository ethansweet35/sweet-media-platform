import type { SupabaseClient } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import {
  SEO_OVERRIDE_KEYS,
  SEO_OVERRIDE_KEY_LIST,
  type PageEditorEntityType,
  type PageEditorSeoContextResult,
  type PageEditorSeoSnapshot,
} from "../../components/page-editor/pageEditorSeoTypes";
import { revalidatePageContentCaches } from "./revalidatePageContentCaches";
import { recordBlogPostChanges, recordTrackedPageChanges } from "./contentChangeLogServer";

export {
  SEO_OVERRIDE_KEYS,
  SEO_OVERRIDE_KEY_LIST,
  type PageEditorEntityType,
  type PageEditorSeoContextResult,
  type PageEditorSeoSnapshot,
} from "../../components/page-editor/pageEditorSeoTypes";

export interface PageEditorRouteInfo {
  entityType: PageEditorEntityType;
  routePath: string;
  blogSlug: string | null;
}

export function parsePageEditorRoute(routePath: string): PageEditorRouteInfo {
  const normalized = normalizeRoutePathForSeo(routePath);
  if (normalized.startsWith("/admin")) {
    return { entityType: "unsupported", routePath: normalized, blogSlug: null };
  }
  const blogMatch = normalized.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    return {
      entityType: "blog",
      routePath: normalized,
      blogSlug: blogMatch[1],
    };
  }
  return { entityType: "page", routePath: normalized, blogSlug: null };
}

export function normalizeRoutePathForSeo(routePath: string): string {
  let trimmed = routePath.trim();
  if (!trimmed.startsWith("/")) trimmed = `/${trimmed}`;
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed || "/";
}

export function slugSegmentFromRoute(routePath: string): string {
  const normalized = normalizeRoutePathForSeo(routePath);
  if (normalized === "/") return "";
  return normalized.slice(1);
}

export function routeFromSlugSegment(slug: string): string {
  const cleaned = slug
    .trim()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
  if (!cleaned) return "/";
  return `/${cleaned}`;
}

function normalizeBlogSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function snapshotFromOverrideRows(
  rows: Array<{ field_key: string; draft_value: string | null; published_value: string | null }>,
  mode: "draft" | "published",
): Partial<PageEditorSeoSnapshot> {
  const out: Partial<PageEditorSeoSnapshot> = {};
  for (const row of rows) {
    const raw = mode === "draft" ? row.draft_value : row.published_value;
    if (typeof raw !== "string" || !raw.trim()) continue;
    switch (row.field_key) {
      case SEO_OVERRIDE_KEYS.pageTitle:
        out.pageTitle = raw;
        break;
      case SEO_OVERRIDE_KEYS.seoTitle:
        out.seoTitle = raw;
        break;
      case SEO_OVERRIDE_KEYS.metaDescription:
        out.metaDescription = raw;
        break;
      case SEO_OVERRIDE_KEYS.slug:
        out.slug = raw;
        break;
      default:
        break;
    }
  }
  return out;
}

function mergeSeoSnapshot(
  source: PageEditorSeoSnapshot,
  published: Partial<PageEditorSeoSnapshot>,
  draft: Partial<PageEditorSeoSnapshot>,
): PageEditorSeoSnapshot {
  return {
    pageTitle: draft.pageTitle ?? published.pageTitle ?? source.pageTitle,
    seoTitle: draft.seoTitle ?? published.seoTitle ?? source.seoTitle,
    metaDescription:
      draft.metaDescription ?? published.metaDescription ?? source.metaDescription,
    slug: draft.slug ?? published.slug ?? source.slug,
  };
}

async function loadSeoOverrides(
  client: SupabaseClient,
  routePath: string,
): Promise<{
  published: Partial<PageEditorSeoSnapshot>;
  draft: Partial<PageEditorSeoSnapshot>;
}> {
  const { data, error } = await client
    .from("page_content_overrides")
    .select("field_key, draft_value, published_value")
    .eq("route_path", routePath)
    .in("field_key", SEO_OVERRIDE_KEY_LIST);
  if (error || !data) {
    return { published: {}, draft: {} };
  }
  const rows = data as Array<{
    field_key: string;
    draft_value: string | null;
    published_value: string | null;
  }>;
  return {
    published: snapshotFromOverrideRows(rows, "published"),
    draft: snapshotFromOverrideRows(rows, "draft"),
  };
}

async function loadPageSeoSource(
  client: SupabaseClient,
  routePath: string,
): Promise<{ source: PageEditorSeoSnapshot; trackedPageId: string | null }> {
  const { data, error } = await client
    .from("tracked_pages")
    .select("id, route_path, page_title, seo_title, meta_description")
    .eq("route_path", routePath)
    .maybeSingle();

  if (error || !data) {
    const slug = slugSegmentFromRoute(routePath);
    return {
      source: {
        pageTitle: slug ? slug.replace(/-/g, " ") : "Home",
        seoTitle: "",
        metaDescription: "",
        slug,
      },
      trackedPageId: null,
    };
  }

  const row = data as {
    id: string;
    route_path: string;
    page_title: string | null;
    seo_title: string | null;
    meta_description: string | null;
  };

  return {
    trackedPageId: row.id,
    source: {
      pageTitle: (row.page_title ?? "").trim() || slugSegmentFromRoute(routePath),
      seoTitle: (row.seo_title ?? "").trim(),
      metaDescription: (row.meta_description ?? "").trim(),
      slug: slugSegmentFromRoute(row.route_path),
    },
  };
}

async function loadBlogSeoSource(
  client: SupabaseClient,
  blogSlug: string,
  routePath: string,
): Promise<{ source: PageEditorSeoSnapshot; blogPostId: string | null }> {
  const { data, error } = await client
    .from("blog_posts")
    .select("id, slug, title, seo_title, meta_title, meta_description, excerpt")
    .eq("slug", blogSlug)
    .maybeSingle();

  if (error || !data) {
    return {
      blogPostId: null,
      source: {
        pageTitle: blogSlug.replace(/-/g, " "),
        seoTitle: "",
        metaDescription: "",
        slug: blogSlug,
      },
    };
  }

  const row = data as {
    id: string;
    slug: string;
    title: string | null;
    seo_title: string | null;
    meta_title: string | null;
    meta_description: string | null;
    excerpt: string | null;
  };

  return {
    blogPostId: row.id,
    source: {
      pageTitle: (row.title ?? "").trim() || blogSlug,
      seoTitle: (row.seo_title ?? row.meta_title ?? "").trim(),
      metaDescription:
        (row.meta_description ?? row.excerpt ?? "").trim(),
      slug: (row.slug ?? blogSlug).trim() || blogSlug,
    },
  };
}

export async function fetchPageEditorSeoContext(
  client: SupabaseClient,
  routePath: string,
): Promise<PageEditorSeoContextResult> {
  const info = parsePageEditorRoute(routePath);
  const overrides = await loadSeoOverrides(client, info.routePath);

  if (info.entityType === "blog" && info.blogSlug) {
    const { source, blogPostId } = await loadBlogSeoSource(client, info.blogSlug, info.routePath);
    const effective = mergeSeoSnapshot(source, overrides.published, overrides.draft);
    return {
      entityType: "blog",
      routePath: info.routePath,
      blogSlug: info.blogSlug,
      source,
      publishedOverrides: overrides.published,
      draftOverrides: overrides.draft,
      effective,
      trackedPageId: null,
      blogPostId,
    };
  }

  if (info.entityType === "page") {
    const { source, trackedPageId } = await loadPageSeoSource(client, info.routePath);
    const effective = mergeSeoSnapshot(source, overrides.published, overrides.draft);
    return {
      entityType: "page",
      routePath: info.routePath,
      blogSlug: null,
      source,
      publishedOverrides: overrides.published,
      draftOverrides: overrides.draft,
      effective,
      trackedPageId,
      blogPostId: null,
    };
  }

  const slug = slugSegmentFromRoute(info.routePath);
  const empty: PageEditorSeoSnapshot = {
    pageTitle: "",
    seoTitle: "",
    metaDescription: "",
    slug,
  };
  return {
    entityType: "unsupported",
    routePath: info.routePath,
    blogSlug: null,
    source: empty,
    publishedOverrides: overrides.published,
    draftOverrides: overrides.draft,
    effective: mergeSeoSnapshot(empty, overrides.published, overrides.draft),
    trackedPageId: null,
    blogPostId: null,
  };
}

function collectSeoValuesFromMap(
  values: Map<string, string>,
): Partial<PageEditorSeoSnapshot> {
  const out: Partial<PageEditorSeoSnapshot> = {};
  const pageTitle = values.get(SEO_OVERRIDE_KEYS.pageTitle);
  const seoTitle = values.get(SEO_OVERRIDE_KEYS.seoTitle);
  const metaDescription = values.get(SEO_OVERRIDE_KEYS.metaDescription);
  const slug = values.get(SEO_OVERRIDE_KEYS.slug);
  if (pageTitle !== undefined) out.pageTitle = pageTitle;
  if (seoTitle !== undefined) out.seoTitle = seoTitle;
  if (metaDescription !== undefined) out.metaDescription = metaDescription;
  if (slug !== undefined) out.slug = slug;
  return out;
}

async function loadPublishedSeoOverrideMap(
  client: SupabaseClient,
  routePath: string,
): Promise<Map<string, string>> {
  const { data } = await client
    .from("page_content_overrides")
    .select("field_key, published_value")
    .eq("route_path", routePath)
    .in("field_key", SEO_OVERRIDE_KEY_LIST);
  const map = new Map<string, string>();
  for (const row of (data ?? []) as Array<{ field_key: string; published_value: string | null }>) {
    if (typeof row.published_value === "string" && row.published_value.trim()) {
      map.set(row.field_key, row.published_value.trim());
    }
  }
  return map;
}

/**
 * After page_content_overrides SEO fields are published, copy them into
 * tracked_pages or blog_posts and revalidate metadata caches.
 */
export async function syncPublishedSeoToCanonical(
  client: SupabaseClient,
  routePath: string,
  adminEmail: string,
  freshlyPublished?: Map<string, string>,
): Promise<{ routePath: string; slugChanged: boolean }> {
  const info = parsePageEditorRoute(routePath);
  if (info.entityType === "unsupported") {
    return { routePath: info.routePath, slugChanged: false };
  }

  const stored = await loadPublishedSeoOverrideMap(client, info.routePath);
  if (freshlyPublished) {
    for (const [k, v] of freshlyPublished) stored.set(k, v);
  }
  if (stored.size === 0) {
    return { routePath: info.routePath, slugChanged: false };
  }

  const seo = collectSeoValuesFromMap(stored);
  const now = new Date().toISOString();

  if (info.entityType === "blog" && info.blogSlug) {
    return syncBlogSeo(client, info, seo, adminEmail, now);
  }

  return syncTrackedPageSeo(client, info.routePath, seo, adminEmail, now);
}

async function syncBlogSeo(
  client: SupabaseClient,
  info: PageEditorRouteInfo,
  seo: Partial<PageEditorSeoSnapshot>,
  adminEmail: string,
  now: string,
): Promise<{ routePath: string; slugChanged: boolean }> {
  if (!info.blogSlug) {
    return { routePath: info.routePath, slugChanged: false };
  }

  const { data: existing } = await client
    .from("blog_posts")
    .select("id, slug, title, seo_title, meta_title, meta_description, seo_description, focus_keyword, status, excerpt, content")
    .eq("slug", info.blogSlug)
    .maybeSingle();

  if (!existing) {
    return { routePath: info.routePath, slugChanged: false };
  }

  const row = existing as { id: string; slug: string };
  const updates: Record<string, string> = { updated_at: now };
  if (seo.pageTitle !== undefined) updates.title = seo.pageTitle.trim();
  if (seo.seoTitle !== undefined) {
    updates.seo_title = seo.seoTitle.trim();
    updates.meta_title = seo.seoTitle.trim();
  }
  if (seo.metaDescription !== undefined) {
    updates.meta_description = seo.metaDescription.trim();
    updates.seo_description = seo.metaDescription.trim();
  }

  let newSlug = info.blogSlug;
  let slugChanged = false;
  if (seo.slug !== undefined) {
    const nextSlug = normalizeBlogSlug(seo.slug);
    if (nextSlug && nextSlug !== info.blogSlug) {
      newSlug = nextSlug;
      updates.slug = nextSlug;
      slugChanged = true;
    }
  }

  const { error } = await client.from("blog_posts").update(updates).eq("id", row.id);
  if (error) {
    throw new Error(`Failed to sync blog SEO: ${error.message}`);
  }

  await recordBlogPostChanges({
    entity_id: row.id,
    route_path: `/blog/${newSlug}`,
    prior: existing as Record<string, unknown>,
    updates,
    changed_by: adminEmail,
  });

  const newRoutePath = `/blog/${newSlug}`;
  if (slugChanged) {
    await migrateOverrideRoute(client, info.routePath, newRoutePath);
    await client
      .from("tracked_pages")
      .update({ route_path: newRoutePath, updated_at: now })
      .eq("route_path", info.routePath);
  }

  revalidatePageContentCaches(info.routePath);
  if (slugChanged) {
    revalidatePageContentCaches(newRoutePath);
  }
  revalidateTag("tracked-page-metadata", { expire: 0 });
  try {
    revalidateTag("blog-posts", { expire: 0 });
  } catch {
    /* optional tag */
  }

  return { routePath: slugChanged ? newRoutePath : info.routePath, slugChanged };
}

async function syncTrackedPageSeo(
  client: SupabaseClient,
  routePath: string,
  seo: Partial<PageEditorSeoSnapshot>,
  adminEmail: string,
  now: string,
): Promise<{ routePath: string; slugChanged: boolean }> {
  const { data: existing } = await client
    .from("tracked_pages")
    .select("id, route_path, page_title, seo_title, meta_description, is_active, notes")
    .eq("route_path", routePath)
    .maybeSingle();

  let targetRoute = routePath;
  let slugChanged = false;

  if (seo.slug !== undefined) {
    const nextRoute = routeFromSlugSegment(seo.slug);
    if (nextRoute !== routePath) {
      targetRoute = nextRoute;
      slugChanged = true;
    }
  }

  const row: Record<string, unknown> = {
    updated_at: now,
  };
  if (seo.pageTitle !== undefined) row.page_title = seo.pageTitle.trim();
  if (seo.seoTitle !== undefined) row.seo_title = seo.seoTitle.trim() || null;
  if (seo.metaDescription !== undefined) {
    row.meta_description = seo.metaDescription.trim() || null;
  }
  if (slugChanged) row.route_path = targetRoute;

  if (existing) {
    const prior = existing as {
      id: string;
      route_path: string;
      page_title?: string;
      seo_title?: string | null;
      meta_description?: string | null;
      is_active?: boolean;
      notes?: string | null;
    };
    const { error } = await client
      .from("tracked_pages")
      .update(row)
      .eq("route_path", routePath);
    if (error) {
      throw new Error(`Failed to sync page SEO: ${error.message}`);
    }
    await recordTrackedPageChanges({
      entity_id: prior.id,
      route_path: targetRoute,
      prior: {
        page_title: prior.page_title,
        seo_title: prior.seo_title,
        meta_description: prior.meta_description,
        route_path: prior.route_path,
        is_active: prior.is_active,
        notes: prior.notes,
      },
      updates: {
        page_title: seo.pageTitle !== undefined ? seo.pageTitle.trim() : undefined,
        seo_title: seo.seoTitle !== undefined ? seo.seoTitle.trim() || null : undefined,
        meta_description:
          seo.metaDescription !== undefined ? seo.metaDescription.trim() || null : undefined,
        route_path: slugChanged ? targetRoute : undefined,
      },
      changed_by: adminEmail,
    });
  } else {
    const { error } = await client.from("tracked_pages").insert({
      route_path: targetRoute,
      page_title: (seo.pageTitle ?? slugSegmentFromRoute(targetRoute)).trim(),
      seo_title: seo.seoTitle?.trim() || null,
      meta_description: seo.metaDescription?.trim() || null,
      is_active: true,
      display_order: 0,
      updated_at: now,
      created_at: now,
    });
    if (error) {
      throw new Error(`Failed to create tracked page for SEO: ${error.message}`);
    }
    slugChanged = targetRoute !== routePath;
  }

  if (slugChanged) {
    await migrateOverrideRoute(client, routePath, targetRoute);
  }

  revalidatePageContentCaches(routePath);
  if (slugChanged) {
    revalidatePageContentCaches(targetRoute);
  }
  revalidateTag("tracked-page-metadata", { expire: 0 });

  return { routePath: targetRoute, slugChanged };
}

async function migrateOverrideRoute(
  client: SupabaseClient,
  fromRoute: string,
  toRoute: string,
): Promise<void> {
  if (fromRoute === toRoute) return;
  const { error } = await client
    .from("page_content_overrides")
    .update({ route_path: toRoute })
    .eq("route_path", fromRoute);
  if (error) {
    console.warn(`[page-content] migrate overrides ${fromRoute} → ${toRoute}:`, error.message);
  }
}
