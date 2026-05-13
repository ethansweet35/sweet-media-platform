/**
 * Server-side helpers for `tracked_page_content_blocks`.
 *
 * The Page Mode Auto-Optimize pipeline writes 'pending' blocks here; admin
 * routes apply them to 'active'; the public <TrackedPageBody/> server
 * component reads 'active' blocks via the anon key (RLS-gated).
 *
 * Import from `@sweetmedia/admin-core/server` (never from React code).
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ContentEditorError } from "./contentEditor/errors";

export type TrackedPageBlockType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "paragraph"
  | "list"
  | "numbered"
  | "pullquote"
  | "callout"
  | "stat-row"
  | "table"
  | "divider";

export type TrackedPageBlockStatus =
  | "pending"
  | "active"
  | "archived"
  | "rejected";

export type TrackedPageBlockSource = "manual" | "ai-generated" | "imported";

export interface TrackedPageBlockRow {
  id: string;
  tracked_page_id: string;
  editor_id: string | null;
  position: number;
  block_type: TrackedPageBlockType;
  heading: string | null;
  body_markdown: string | null;
  list_items: string[] | null;
  callout_variant: string | null;
  stats: Array<{ value: string; label: string }> | null;
  table_headers: string[] | null;
  table_rows: string[][] | null;
  status: TrackedPageBlockStatus;
  source: TrackedPageBlockSource;
  ai_rationale: string | null;
  ai_target_heading: string | null;
  created_at: string;
  updated_at: string;
  applied_at: string | null;
}

/**
 * Block shape consumed by `insertAiBlocks` — matches what the Auto-Optimize
 * AI prompt emits (mirrors the BlockShape union in autoOptimize.ts).
 */
export interface AiBlockInput {
  block_type: TrackedPageBlockType;
  heading?: string | null;
  body_markdown?: string | null;
  list_items?: string[] | null;
  callout_variant?: string | null;
  stats?: Array<{ value: string; label: string }> | null;
  table_headers?: string[] | null;
  table_rows?: string[][] | null;
  ai_rationale?: string | null;
  ai_target_heading?: string | null;
}

function getAdminClient(): SupabaseClient {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new ContentEditorError(
      "Supabase URL or service role key is missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      { source: "api", status: 500 },
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Reads                                                                 */
/* ────────────────────────────────────────────────────────────────────── */

/**
 * List all blocks for a tracked page (any status, ordered by position).
 * Admin-only entry-point — uses the service-role client.
 */
export async function listBlocksForPage(
  trackedPageId: string,
): Promise<TrackedPageBlockRow[]> {
  if (!trackedPageId) {
    throw new ContentEditorError("trackedPageId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .select("*")
    .eq("tracked_page_id", trackedPageId)
    .order("status", { ascending: true })
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) {
    throw new ContentEditorError(`Failed to load blocks: ${error.message}`, {
      source: "api",
      status: 500,
    });
  }
  return (data ?? []) as TrackedPageBlockRow[];
}

/**
 * Pending blocks for a specific editor's last Auto-Optimize run.
 * Used by the admin brief page to show the review queue.
 */
export async function listPendingBlocksForEditor(
  editorId: string,
): Promise<TrackedPageBlockRow[]> {
  if (!editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .select("*")
    .eq("editor_id", editorId)
    .eq("status", "pending")
    .order("position", { ascending: true });
  if (error) {
    throw new ContentEditorError(
      `Failed to load pending blocks: ${error.message}`,
      { source: "api", status: 500 },
    );
  }
  return (data ?? []) as TrackedPageBlockRow[];
}

/**
 * Public-facing read used by the <TrackedPageBody/> server component.
 *
 * Returns ONLY status='active' blocks. Uses the service-role client (RLS
 * also allows anon SELECT for active blocks, but using the admin client
 * here is simpler since this function is called from server components in
 * Next.js route handlers / page.tsx files which already have the secret).
 */
export async function listActiveBlocksByRoutePath(
  routePath: string,
): Promise<TrackedPageBlockRow[]> {
  if (!routePath) return [];
  const adm = getAdminClient();
  const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;

  // Look up the tracked page id from the route path.
  const { data: page } = await adm
    .from("tracked_pages")
    .select("id, is_active")
    .eq("route_path", normalized)
    .maybeSingle();

  const pageRow = page as { id: string; is_active: boolean } | null;
  if (!pageRow || !pageRow.is_active) return [];

  const { data: blocks } = await adm
    .from("tracked_page_content_blocks")
    .select("*")
    .eq("tracked_page_id", pageRow.id)
    .eq("status", "active")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  return (blocks ?? []) as TrackedPageBlockRow[];
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Writes                                                                */
/* ────────────────────────────────────────────────────────────────────── */

/**
 * Replace any existing pending blocks for an editor with a fresh set.
 *
 * Called by `runAutoOptimize` after every Auto-Optimize pass so the admin
 * always sees the latest AI proposal queue (no stale items from prior runs).
 * Previously-applied blocks (status='active') are NOT touched.
 */
export async function replaceAiPendingBlocks(opts: {
  trackedPageId: string;
  editorId: string;
  blocks: AiBlockInput[];
}): Promise<TrackedPageBlockRow[]> {
  if (!opts.trackedPageId) {
    throw new ContentEditorError("trackedPageId is required.", {
      source: "api",
      status: 400,
    });
  }
  if (!opts.editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();

  // Hard-delete the editor's prior pending queue so a re-run replaces it.
  // We keep active/archived/rejected rows untouched.
  const { error: delErr } = await adm
    .from("tracked_page_content_blocks")
    .delete()
    .eq("editor_id", opts.editorId)
    .eq("status", "pending");
  if (delErr) {
    throw new ContentEditorError(
      `Failed to clear prior pending blocks: ${delErr.message}`,
      { source: "api", status: 500 },
    );
  }

  if (opts.blocks.length === 0) return [];

  // Determine the next pending position offset so we don't collide visually
  // with already-active blocks in the admin review UI.
  const { data: maxRow } = await adm
    .from("tracked_page_content_blocks")
    .select("position")
    .eq("tracked_page_id", opts.trackedPageId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  const baseOffset = (((maxRow as { position?: number } | null)?.position ?? 0) + 10);

  const rows = opts.blocks.map((b, idx) => ({
    tracked_page_id: opts.trackedPageId,
    editor_id: opts.editorId,
    position: baseOffset + idx,
    block_type: b.block_type,
    heading: b.heading ?? null,
    body_markdown: b.body_markdown ?? null,
    list_items: b.list_items ?? null,
    callout_variant: b.callout_variant ?? null,
    stats: b.stats ?? null,
    table_headers: b.table_headers ?? null,
    table_rows: b.table_rows ?? null,
    status: "pending" as const,
    source: "ai-generated" as const,
    ai_rationale: b.ai_rationale ?? null,
    ai_target_heading: b.ai_target_heading ?? null,
  }));

  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .insert(rows)
    .select("*");
  if (error) {
    throw new ContentEditorError(
      `Failed to insert pending blocks: ${error.message}`,
      { source: "api", status: 500 },
    );
  }
  return (data ?? []) as TrackedPageBlockRow[];
}

/** Flip a single block to status='active'. */
export async function applyBlock(blockId: string): Promise<TrackedPageBlockRow> {
  if (!blockId) {
    throw new ContentEditorError("blockId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .update({ status: "active", applied_at: new Date().toISOString() })
    .eq("id", blockId)
    .select("*")
    .single();
  if (error || !data) {
    throw new ContentEditorError(
      `Failed to apply block: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as TrackedPageBlockRow;
}

/** Apply every pending block for an editor in one shot. */
export async function applyAllPendingForEditor(
  editorId: string,
): Promise<TrackedPageBlockRow[]> {
  if (!editorId) {
    throw new ContentEditorError("editorId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .update({ status: "active", applied_at: new Date().toISOString() })
    .eq("editor_id", editorId)
    .eq("status", "pending")
    .select("*");
  if (error) {
    throw new ContentEditorError(
      `Failed to apply pending blocks: ${error.message}`,
      { source: "api", status: 500 },
    );
  }
  return (data ?? []) as TrackedPageBlockRow[];
}

/** Mark a pending block rejected (kept for audit history). */
export async function rejectBlock(blockId: string): Promise<TrackedPageBlockRow> {
  if (!blockId) {
    throw new ContentEditorError("blockId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .update({ status: "rejected" })
    .eq("id", blockId)
    .select("*")
    .single();
  if (error || !data) {
    throw new ContentEditorError(
      `Failed to reject block: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as TrackedPageBlockRow;
}

/** Archive a live block (hides it from the page). */
export async function archiveBlock(blockId: string): Promise<TrackedPageBlockRow> {
  if (!blockId) {
    throw new ContentEditorError("blockId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .update({ status: "archived" })
    .eq("id", blockId)
    .select("*")
    .single();
  if (error || !data) {
    throw new ContentEditorError(
      `Failed to archive block: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as TrackedPageBlockRow;
}

/** Hard-delete a block (use for cleanup; prefer reject/archive for history). */
export async function deleteBlock(blockId: string): Promise<void> {
  if (!blockId) {
    throw new ContentEditorError("blockId is required.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { error } = await adm
    .from("tracked_page_content_blocks")
    .delete()
    .eq("id", blockId);
  if (error) {
    throw new ContentEditorError(`Failed to delete block: ${error.message}`, {
      source: "api",
      status: 500,
    });
  }
}

export interface UpdateBlockInput {
  heading?: string | null;
  body_markdown?: string | null;
  list_items?: string[] | null;
  callout_variant?: string | null;
  stats?: Array<{ value: string; label: string }> | null;
  table_headers?: string[] | null;
  table_rows?: string[][] | null;
  position?: number;
  block_type?: TrackedPageBlockType;
  ai_rationale?: string | null;
  ai_target_heading?: string | null;
  status?: TrackedPageBlockStatus;
}

/** Patch an existing block (admin inline edit). */
export async function updateBlock(
  blockId: string,
  patch: UpdateBlockInput,
): Promise<TrackedPageBlockRow> {
  if (!blockId) {
    throw new ContentEditorError("blockId is required.", {
      source: "api",
      status: 400,
    });
  }
  if (Object.keys(patch).length === 0) {
    throw new ContentEditorError("No fields to update.", {
      source: "api",
      status: 400,
    });
  }
  const adm = getAdminClient();
  const { data, error } = await adm
    .from("tracked_page_content_blocks")
    .update(patch)
    .eq("id", blockId)
    .select("*")
    .single();
  if (error || !data) {
    throw new ContentEditorError(
      `Failed to update block: ${error?.message ?? "no data"}`,
      { source: "api", status: 500 },
    );
  }
  return data as TrackedPageBlockRow;
}

/**
 * Look up the route_path for a tracked page id so the API route caller can
 * invoke revalidatePath() after a write. Always called from a route handler.
 */
export async function getRoutePathForTrackedPage(
  trackedPageId: string,
): Promise<string | null> {
  if (!trackedPageId) return null;
  const adm = getAdminClient();
  const { data } = await adm
    .from("tracked_pages")
    .select("route_path")
    .eq("id", trackedPageId)
    .maybeSingle();
  return (data as { route_path?: string } | null)?.route_path ?? null;
}

/**
 * Reverse lookup — given a block id, return its tracked page's route path.
 * Used by single-block apply/reject routes to know which path to revalidate.
 */
export async function getRoutePathForBlock(blockId: string): Promise<string | null> {
  if (!blockId) return null;
  const adm = getAdminClient();
  const { data } = await adm
    .from("tracked_page_content_blocks")
    .select("tracked_pages:tracked_page_id(route_path)")
    .eq("id", blockId)
    .maybeSingle();
  const joined = (data as { tracked_pages?: { route_path?: string } | { route_path?: string }[] } | null)?.tracked_pages;
  if (!joined) return null;
  if (Array.isArray(joined)) return joined[0]?.route_path ?? null;
  return joined.route_path ?? null;
}
