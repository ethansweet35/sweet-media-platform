/**
 * Server-only orchestration helpers for the Surfer SEO integration.
 *
 * These functions:
 *   1. Take a `kind` ("blog" | "page") + row id
 *   2. Call the Surfer API
 *   3. Persist the result back to Supabase using the service-role client
 *
 * They are designed to be invoked from per-app API routes
 * (apps/<slug>/src/app/api/admin/surfer/*).
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  createAudit,
  createContentEditor,
  getAudit,
  SurferApiError,
  type SurferAuditDetail,
} from "./surferClient";
import type { AuditDetails } from "../../types/surfer";

export type SurferRowKind = "blog" | "page";

const TABLE_BY_KIND: Record<SurferRowKind, string> = {
  blog: "blog_posts",
  page: "tracked_pages",
};

interface RowSnapshot {
  id: string;
  primary_keyword: string | null;
  published_url: string | null;
  surfer_audit_id: number | null;
  surfer_content_editor_id: number | null;
  // For blog rows
  slug?: string | null;
  status?: string | null;
  // For page rows
  route_path?: string | null;
  is_active?: boolean | null;
}

function getServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new SurferApiError(
      "Supabase service role is not configured. Set NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.",
      500,
      null,
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function siteOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  if (!raw) {
    throw new SurferApiError(
      "NEXT_PUBLIC_SITE_URL is not configured. Set it in this app's Vercel env vars.",
      500,
      null,
    );
  }
  return raw.replace(/\/+$/, "");
}

function blogPathBase(): string {
  const raw = (process.env.NEXT_PUBLIC_BLOG_PATH_BASE ?? "/blog").trim();
  const normalized = raw.startsWith("/") ? raw : `/${raw}`;
  return normalized.replace(/\/+$/, "");
}

/** Compute the public URL Surfer should audit for a given row. */
export function resolvePublicUrl(kind: SurferRowKind, row: RowSnapshot): string {
  if (row.published_url && row.published_url.trim()) {
    return row.published_url.trim();
  }
  const origin = siteOrigin();
  if (kind === "blog") {
    if (!row.slug) {
      throw new SurferApiError("Blog post is missing a slug.", 400, null);
    }
    return `${origin}${blogPathBase()}/${row.slug}`;
  }
  if (!row.route_path) {
    throw new SurferApiError("Tracked page is missing a route_path.", 400, null);
  }
  const path = row.route_path.startsWith("/") ? row.route_path : `/${row.route_path}`;
  return `${origin}${path}`;
}

async function loadRow(
  supabase: SupabaseClient,
  kind: SurferRowKind,
  id: string,
): Promise<RowSnapshot> {
  const table = TABLE_BY_KIND[kind];
  const select =
    kind === "blog"
      ? "id, slug, status, primary_keyword:focus_keyword, published_url, surfer_audit_id, surfer_content_editor_id"
      : "id, route_path, is_active, primary_keyword, published_url, surfer_audit_id, surfer_content_editor_id";

  // Note: blog_posts uses `focus_keyword` historically; we alias it to
  // primary_keyword for a uniform shape. If you've added an explicit
  // `primary_keyword` column to blog_posts, update the select.
  const { data, error } = await supabase
    .from(table)
    .select(select)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    throw new SurferApiError(`Supabase error: ${error.message}`, 500, error);
  }
  if (!data) {
    throw new SurferApiError(`${kind} row not found.`, 404, null);
  }
  return data as unknown as RowSnapshot;
}

// =========================================================
// Audit orchestration
// =========================================================

export interface KickAuditResult {
  audit_id: number;
  state: string;
  url: string;
}

export async function kickAudit(
  kind: SurferRowKind,
  id: string,
): Promise<KickAuditResult> {
  const supabase = getServiceRoleClient();
  const row = await loadRow(supabase, kind, id);
  const url = resolvePublicUrl(kind, row);
  const keyword = row.primary_keyword?.trim();
  if (!keyword) {
    throw new SurferApiError(
      "Row has no primary_keyword. Set one before running an audit.",
      400,
      null,
    );
  }

  const created = await createAudit({
    url,
    keywords: [keyword],
    location: "United States",
    device: "mobile",
  });

  await supabase
    .from(TABLE_BY_KIND[kind])
    .update({
      surfer_audit_id: created.id,
      surfer_audit_state: created.state ?? "scheduled",
      surfer_last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  return { audit_id: created.id, state: created.state, url };
}

export interface PollAuditResult {
  state: string;
  content_score: number | null;
  completed: boolean;
}

export async function pollAuditAndPersist(
  kind: SurferRowKind,
  id: string,
): Promise<PollAuditResult> {
  const supabase = getServiceRoleClient();
  const row = await loadRow(supabase, kind, id);
  if (!row.surfer_audit_id) {
    return { state: "no_audit", content_score: null, completed: false };
  }

  let detail: SurferAuditDetail;
  try {
    detail = await getAudit(row.surfer_audit_id);
  } catch (err) {
    if (err instanceof SurferApiError) {
      await supabase
        .from(TABLE_BY_KIND[kind])
        .update({
          surfer_audit_state: "error",
          surfer_last_error: err.message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);
    }
    throw err;
  }

  const score =
    typeof detail.audited_page?.content_score === "number"
      ? Math.round(detail.audited_page.content_score)
      : null;

  if (detail.state === "completed" && score !== null) {
    await supabase
      .from(TABLE_BY_KIND[kind])
      .update({
        surfer_audit_state: "completed",
        surfer_content_score: score,
        surfer_score_updated_at: new Date().toISOString(),
        surfer_last_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    return { state: "completed", content_score: score, completed: true };
  }

  if (detail.state === "error") {
    const msg =
      detail.error ??
      detail.message ??
      "Surfer audit returned an error state.";
    await supabase
      .from(TABLE_BY_KIND[kind])
      .update({
        surfer_audit_state: "error",
        surfer_last_error: msg,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    return { state: "error", content_score: null, completed: true };
  }

  // Still scheduled / running — leave row state alone.
  return { state: detail.state ?? "scheduled", content_score: null, completed: false };
}

// =========================================================
// Content Editor orchestration
// =========================================================

export interface CreateEditorResult {
  content_editor_id: number;
  permalink_hash: string;
  drafts_url: string;
  share_url: string;
}

export async function createEditorForRow(
  kind: SurferRowKind,
  id: string,
  opts: { keywordOverride?: string } = {},
): Promise<CreateEditorResult> {
  const supabase = getServiceRoleClient();
  const row = await loadRow(supabase, kind, id);
  const keyword = (opts.keywordOverride ?? row.primary_keyword ?? "").trim();
  if (!keyword) {
    throw new SurferApiError(
      "Row has no primary_keyword. Set one before creating a Content Editor.",
      400,
      null,
    );
  }
  if (row.surfer_content_editor_id) {
    throw new SurferApiError(
      "A Surfer Content Editor already exists for this row.",
      409,
      { content_editor_id: row.surfer_content_editor_id },
    );
  }

  const created = await createContentEditor({
    keywords: [keyword],
    location: "United States",
    device: "mobile",
  });

  await supabase
    .from(TABLE_BY_KIND[kind])
    .update({
      surfer_content_editor_id: created.id,
      surfer_permalink_hash: created.permalink_hash ?? null,
      surfer_last_error: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  return {
    content_editor_id: created.id,
    permalink_hash: created.permalink_hash,
    drafts_url: `https://app.surferseo.com/drafts/${created.id}`,
    share_url: `https://app.surferseo.com/drafts/s/${created.permalink_hash}`,
  };
}

// =========================================================
// Audit details (competitors + score breakdown)
// =========================================================

export async function getAuditDetails(
  kind: SurferRowKind,
  id: string,
): Promise<AuditDetails> {
  const supabase = getServiceRoleClient();
  const row = await loadRow(supabase, kind, id);
  if (!row.surfer_audit_id) {
    throw new SurferApiError("No audit exists for this row yet.", 404, null);
  }
  const detail = await getAudit(row.surfer_audit_id);
  const competitors = (detail.competitors_pages ?? []).map((c) => ({
    url: c.url,
    content_score: c.content_score ?? null,
  }));
  const scores = competitors
    .map((c) => c.content_score)
    .filter((s): s is number => s !== null);
  const competitor_avg =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;
  return {
    audit_id: row.surfer_audit_id,
    state: detail.state ?? "unknown",
    audited_url: detail.audited_page?.url ?? null,
    audited_score: detail.audited_page?.content_score ?? null,
    competitors,
    competitor_avg,
    surfer_url: `https://app.surferseo.com/audits/${row.surfer_audit_id}`,
  };
}

// =========================================================
// Bulk stale refresh
// =========================================================

export interface RefreshStaleSummary {
  scheduled: number;
  completed: number;
  errors: number;
  total_examined: number;
}

interface StaleCandidate {
  id: string;
  primary_keyword: string | null;
  published_url: string | null;
  surfer_audit_id: number | null;
  surfer_score_updated_at: string | null;
  // Blog
  slug?: string | null;
  status?: string | null;
  // Page
  route_path?: string | null;
  is_active?: boolean | null;
}

/**
 * Refreshes Surfer audits for all eligible rows older than `maxAgeMs`.
 * Eligible:
 *   - blog_posts where status = 'published' AND primary keyword set
 *   - tracked_pages where is_active = true AND primary keyword set
 *
 * Strategy:
 *   - For rows with an in-flight audit, poll first (no extra credit cost).
 *   - For stale rows (no in-flight audit and score is older than maxAgeMs),
 *     kick a fresh audit.
 */
export async function refreshStaleAudits(
  maxAgeMs: number = 24 * 60 * 60 * 1000,
): Promise<RefreshStaleSummary> {
  const supabase = getServiceRoleClient();
  const cutoff = new Date(Date.now() - maxAgeMs).toISOString();

  let scheduled = 0;
  let completed = 0;
  let errors = 0;
  let examined = 0;

  const processRow = async (kind: SurferRowKind, row: StaleCandidate) => {
    examined++;
    try {
      // Poll any in-flight audit
      if (row.surfer_audit_id) {
        const r = await pollAuditAndPersist(kind, row.id);
        if (r.completed) completed++;
        if (r.state === "scheduled") return;
      }

      // If score is fresh (and no in-flight), skip
      const updated = row.surfer_score_updated_at
        ? Date.parse(row.surfer_score_updated_at)
        : 0;
      const isFresh = updated && Date.now() - updated < maxAgeMs;
      if (isFresh) return;

      if (!row.primary_keyword?.trim()) {
        // Can't audit without a keyword; skip silently.
        return;
      }

      await kickAudit(kind, row.id);
      scheduled++;
    } catch (err) {
      errors++;
      // eslint-disable-next-line no-console
      console.error(`[surfer refresh] ${kind}:${row.id}`, err);
    }
  };

  // BLOG POSTS
  const { data: blogRows } = await supabase
    .from("blog_posts")
    .select(
      "id, slug, status, focus_keyword, published_url, surfer_audit_id, surfer_score_updated_at",
    )
    .eq("status", "published")
    .or(`surfer_score_updated_at.is.null,surfer_score_updated_at.lt.${cutoff}`)
    .limit(200);

  for (const r of (blogRows ?? []) as Array<
    StaleCandidate & { focus_keyword: string | null }
  >) {
    await processRow("blog", { ...r, primary_keyword: r.focus_keyword });
  }

  // TRACKED PAGES
  const { data: pageRows } = await supabase
    .from("tracked_pages")
    .select(
      "id, route_path, is_active, primary_keyword, published_url, surfer_audit_id, surfer_score_updated_at",
    )
    .eq("is_active", true)
    .or(`surfer_score_updated_at.is.null,surfer_score_updated_at.lt.${cutoff}`)
    .limit(200);

  for (const r of (pageRows ?? []) as StaleCandidate[]) {
    await processRow("page", r);
  }

  return { scheduled, completed, errors, total_examined: examined };
}
