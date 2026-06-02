/**
 * SEO deliverables + live changelog for marketing reports (server-only).
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  LiveChangelogEntry,
  SeoContentUpdate,
  SeoDeliverables,
  SeoNewPage,
  SeoPublishedBlog,
} from "../../types/marketing";

function siteId(): string {
  return process.env.NEXT_PUBLIC_SITE_ID?.trim() || "";
}

function periodEndExclusive(endDate: string): string {
  const d = new Date(`${endDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString();
}

export async function fetchPublishedBlogsInPeriod(
  admin: SupabaseClient,
  startDate: string,
  endDate: string,
): Promise<SeoPublishedBlog[]> {
  const endExclusive = periodEndExclusive(endDate);
  const { data, error } = await admin
    .from("blog_posts")
    .select("title, slug, published_at")
    .eq("status", "published")
    .gte("published_at", `${startDate}T00:00:00.000Z`)
    .lt("published_at", endExclusive)
    .order("published_at", { ascending: false });

  if (error || !data) return [];

  return data
    .filter((row) => row.slug && row.title)
    .map((row) => ({
      title: String(row.title),
      slug: String(row.slug),
      route_path: `/blog/${row.slug}`,
      published_at: String(row.published_at),
    }));
}

export async function fetchNewTrackedPagesInPeriod(
  admin: SupabaseClient,
  startDate: string,
  endDate: string,
): Promise<SeoNewPage[]> {
  const endExclusive = periodEndExclusive(endDate);
  const { data, error } = await admin
    .from("tracked_pages")
    .select("route_path, page_title, created_at")
    .gte("created_at", `${startDate}T00:00:00.000Z`)
    .lt("created_at", endExclusive)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    route_path: String(row.route_path),
    page_title: String(row.page_title || row.route_path),
    added_at: String(row.created_at),
  }));
}

export async function fetchContentUpdatesInPeriod(
  admin: SupabaseClient,
  startDate: string,
  endDate: string,
  limit = 40,
): Promise<SeoContentUpdate[]> {
  const endExclusive = periodEndExclusive(endDate);
  const sid = siteId();

  let query = admin
    .from("content_change_log")
    .select("id, entity_type, route_path, summary, field_label, created_at")
    .gte("created_at", `${startDate}T00:00:00.000Z`)
    .lt("created_at", endExclusive)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (sid) query = query.eq("site_id", sid);

  const { data, error } = await query;
  if (error || !data) return [];

  return data
    .filter((row) => row.entity_type === "page" || row.entity_type === "blog")
    .filter((row) => row.summary !== "Page added to inventory")
    .map((row) => ({
      id: String(row.id),
      entity_type: row.entity_type as "page" | "blog",
      route_path: String(row.route_path ?? ""),
      summary: String(row.summary ?? row.field_label ?? "Updated"),
      field_label: String(row.field_label ?? ""),
      created_at: String(row.created_at),
    }));
}

export async function fetchSeoDeliverablesForPeriod(
  admin: SupabaseClient | null,
  startDate: string,
  endDate: string,
): Promise<SeoDeliverables | null> {
  if (!admin) return null;

  const [blogs_published, pages_added, updates] = await Promise.all([
    fetchPublishedBlogsInPeriod(admin, startDate, endDate),
    fetchNewTrackedPagesInPeriod(admin, startDate, endDate),
    fetchContentUpdatesInPeriod(admin, startDate, endDate),
  ]);

  if (blogs_published.length === 0 && pages_added.length === 0 && updates.length === 0) {
    return null;
  }

  return { blogs_published, pages_added, updates };
}

export async function fetchLiveSiteChangelog(
  admin: SupabaseClient | null,
  limit = 18,
): Promise<LiveChangelogEntry[]> {
  if (!admin) return [];

  const sid = siteId();
  const entries: LiveChangelogEntry[] = [];

  let logQuery = admin
    .from("content_change_log")
    .select("entity_type, route_path, summary, field_label, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (sid) logQuery = logQuery.eq("site_id", sid);

  const { data: logRows } = await logQuery;

  for (const row of logRows ?? []) {
    if (row.entity_type !== "page" && row.entity_type !== "blog") continue;
    const summary = String(row.summary ?? row.field_label ?? "Updated");
    entries.push({
      kind: summary === "Page added to inventory" ? "published" : "update",
      entity_type: row.entity_type as "page" | "blog",
      route_path: String(row.route_path ?? ""),
      title: String(row.route_path ?? "Site update"),
      summary,
      occurred_at: String(row.created_at),
    });
  }

  const { data: drafts } = await admin
    .from("blog_posts")
    .select("title, slug, status, scheduled_publish_at, updated_at")
    .in("status", ["draft", "scheduled"])
    .order("updated_at", { ascending: false })
    .limit(8);

  for (const row of drafts ?? []) {
    if (!row.title) continue;
    const status = String(row.status ?? "draft");
    entries.push({
      kind: "in_progress",
      entity_type: "blog",
      route_path: row.slug ? `/blog/${row.slug}` : "/blog",
      title: String(row.title),
      summary:
        status === "scheduled" && row.scheduled_publish_at
          ? `Scheduled for publish`
          : "Draft in progress",
      status,
      occurred_at: String(row.updated_at ?? new Date().toISOString()),
    });
  }

  entries.sort((a, b) => b.occurred_at.localeCompare(a.occurred_at));
  return entries.slice(0, limit);
}
