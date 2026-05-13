/**
 * Service-role Supabase client + row-type definitions for the content
 * editor pipeline. Centralized here so phase functions can stay focused
 * on business logic.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ContentEditorError } from "./errors";

export type ContentEditorStatus =
  | "pending"
  | "fetching_serp"
  | "extracting_content"
  | "analyzing_nlp"
  | "extracting_facts"
  | "computing_guidelines"
  | "ready"
  | "failed";

export interface ContentEditorRow {
  id: string;
  created_by: string | null;
  primary_keyword: string;
  secondary_keywords: string[];
  location_code: number;
  language_code: string;
  device: string;
  competitor_pool_size: number;
  status: ContentEditorStatus;
  status_message: string | null;
  error: string | null;
  total_cost_usd: number;
  blog_post_id: string | null;
  recommended_word_count_min: number | null;
  recommended_word_count_max: number | null;
  recommended_word_count_target: number | null;
  recommended_h2_min: number | null;
  recommended_h2_max: number | null;
  recommended_h3_min: number | null;
  recommended_h3_max: number | null;
  recommended_image_min: number | null;
  recommended_image_max: number | null;
  recommended_paragraph_count_min: number | null;
  recommended_paragraph_count_max: number | null;
  competitor_avg_score: number | null;
  target_score: number | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface CompetitorRow {
  id: string;
  editor_id: string;
  serp_position: number;
  url: string;
  domain: string;
  title: string | null;
  meta_description: string | null;
  word_count: number | null;
  h1_text: string | null;
  h2_count: number | null;
  h3_count: number | null;
  paragraph_count: number | null;
  image_count: number | null;
  internal_link_count: number | null;
  external_link_count: number | null;
  cleaned_text: string | null;
  headings: Array<{ level: number; text: string; position: number }> | null;
  individual_content_score: number | null;
  included_in_benchmark: boolean;
  fetch_status: "pending" | "scraping" | "scraped" | "failed";
  fetch_error: string | null;
}

export function getAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    throw new ContentEditorError(
      "Supabase service-role config missing (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).",
      { source: "pipeline", status: 500 },
    );
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function loadEditor(
  client: SupabaseClient,
  editorId: string,
): Promise<ContentEditorRow | null> {
  const { data, error } = await client
    .from("content_editors")
    .select("*")
    .eq("id", editorId)
    .maybeSingle();
  if (error) {
    throw new ContentEditorError(`Failed to load editor: ${error.message}`, {
      source: "pipeline",
      status: 500,
    });
  }
  return (data as ContentEditorRow | null) ?? null;
}

export async function loadCompetitors(
  client: SupabaseClient,
  editorId: string,
): Promise<CompetitorRow[]> {
  const { data, error } = await client
    .from("content_editor_competitors")
    .select("*")
    .eq("editor_id", editorId)
    .order("serp_position", { ascending: true });
  if (error) {
    throw new ContentEditorError(`Failed to load competitors: ${error.message}`, {
      source: "pipeline",
      status: 500,
    });
  }
  return (data as CompetitorRow[]) ?? [];
}

export async function loadBlacklistedDomains(
  client: SupabaseClient,
): Promise<string[]> {
  const { data, error } = await client
    .from("content_editor_domain_blacklist")
    .select("domain_pattern");
  if (error) {
    // Soft fail — blacklist is an enhancement, not a hard requirement.
    return [];
  }
  return (data ?? []).map((d) => (d as { domain_pattern: string }).domain_pattern);
}

/** Update status + status_message on the editor row. Logs failures but throws. */
export async function setStatus(
  client: SupabaseClient,
  editorId: string,
  status: ContentEditorStatus,
  message?: string,
): Promise<void> {
  const { error } = await client
    .from("content_editors")
    .update({
      status,
      status_message: message ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", editorId);
  if (error) {
    throw new ContentEditorError(`Failed to set status=${status}: ${error.message}`, {
      source: "pipeline",
      status: 500,
    });
  }
}

/**
 * Atomically add `delta` USD to the editor's total_cost_usd column.
 * Uses a one-row update with returning so we don't need a stored procedure.
 */
export async function addCost(
  client: SupabaseClient,
  editorId: string,
  delta: number,
): Promise<void> {
  if (!delta || delta <= 0) return;
  const { data, error } = await client
    .from("content_editors")
    .select("total_cost_usd")
    .eq("id", editorId)
    .maybeSingle();
  if (error || !data) return;
  const current = (data as { total_cost_usd: number | null }).total_cost_usd ?? 0;
  const next = Math.round((current + delta) * 10000) / 10000;
  await client
    .from("content_editors")
    .update({ total_cost_usd: next, updated_at: new Date().toISOString() })
    .eq("id", editorId);
}

/**
 * Deletes all pipeline-produced rows for an editor while preserving drafts.
 * Draft rows (and FK usage rows) persist; cascade removes `*_draft_term_usage`
 * rows when linked terms are deleted.
 *
 * Resets guideline + score columns on `content_editors` so phases 3–8
 * re-populate cleanly. Used for manual "fresh SERP" re-runs.
 */
export async function clearPipelineArtifacts(
  client: SupabaseClient,
  editorId: string,
): Promise<void> {
  const tables = [
    "content_editor_competitors",
    "content_editor_terms",
    "content_editor_questions",
    "content_editor_facts",
    "content_editor_outlines",
  ] as const;
  for (const t of tables) {
    const { error } = await client.from(t).delete().eq("editor_id", editorId);
    if (error) {
      throw new ContentEditorError(`Failed to clear ${t}: ${error.message}`, {
        source: "pipeline",
        status: 500,
      });
    }
  }

  const { error: editErr } = await client
    .from("content_editors")
    .update({
      status: "pending",
      status_message: null,
      error: null,
      recommended_word_count_min: null,
      recommended_word_count_max: null,
      recommended_word_count_target: null,
      recommended_h2_min: null,
      recommended_h2_max: null,
      recommended_h3_min: null,
      recommended_h3_max: null,
      recommended_image_min: null,
      recommended_image_max: null,
      recommended_paragraph_count_min: null,
      recommended_paragraph_count_max: null,
      competitor_avg_score: null,
      target_score: null,
      completed_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", editorId);
  if (editErr) {
    throw new ContentEditorError(`Failed to reset editor after clear: ${editErr.message}`, {
      source: "pipeline",
      status: 500,
    });
  }
}
