/**
 * Shared types for the Surfer SEO integration.
 *
 * These mirror the columns added by
 * `apps/client-template/supabase/migrations/2026-05-10_surfer_seo_integration.sql`.
 */

export type SurferAuditState = "scheduled" | "completed" | "error";

/**
 * Subset of Surfer-related columns surfaced on both `blog_posts` and
 * `tracked_pages`. UI components hydrate this directly from Supabase rows.
 */
export interface SurferRowFields {
  surfer_content_editor_id: number | null;
  surfer_permalink_hash: string | null;
  surfer_audit_id: number | null;
  surfer_audit_state: SurferAuditState | null;
  surfer_content_score: number | null;
  surfer_score_updated_at: string | null;
  surfer_last_error: string | null;
  surfer_guidance_applied: boolean;
  published_url: string | null;
}

/**
 * What we send to /api/admin/surfer/* endpoints to identify the row.
 * `kind` selects the table; `id` is the row's UUID.
 */
export interface SurferRowRef {
  kind: "blog" | "page";
  id: string;
}

export interface SurferContentEditorCreateInput extends SurferRowRef {
  /** Optional override; defaults to the row's primary keyword. */
  keyword?: string;
}

export interface SurferAuditResponse {
  ok: boolean;
  state: SurferAuditState | "no_audit" | string;
  audit_id?: number | null;
  content_score: number | null;
  /** Present only on poll responses; true when the audit reached a terminal state. */
  completed?: boolean;
  /** Present only on kick-audit responses. */
  url?: string;
  error?: string;
}

export interface SurferContentEditorResponse {
  ok: boolean;
  content_editor_id: number | null;
  permalink_hash: string | null;
  drafts_url: string | null;
  share_url: string | null;
  error?: string;
}

export interface SurferRefreshStaleResponse {
  ok: boolean;
  scheduled: number;
  completed: number;
  errors: number;
  total_examined: number;
}

/** True if the score is fresh enough that we should not re-audit yet. */
export function isSurferScoreFresh(
  updatedAt: string | null,
  maxAgeMs: number = 24 * 60 * 60 * 1000,
): boolean {
  if (!updatedAt) return false;
  const ts = Date.parse(updatedAt);
  if (Number.isNaN(ts)) return false;
  return Date.now() - ts < maxAgeMs;
}

/** Public Surfer drafts URL for a Content Editor id. */
export function surferEditorUrl(id: number | string): string {
  return `https://app.surferseo.com/drafts/${id}`;
}

/** Public Surfer share URL for a permalink hash. */
export function surferShareUrl(hash: string): string {
  return `https://app.surferseo.com/drafts/s/${hash}`;
}
