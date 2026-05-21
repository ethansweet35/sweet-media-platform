/**
 * Client-safe helpers for Content Editor ↔ blog sync status in admin tables.
 */

export type BlogEditorSyncStatus = "synced" | "needs_sync" | "no_draft" | "none";

export function computeBlogEditorSyncStatus(opts: {
  hasEditor: boolean;
  hasDraftBody: boolean;
  draftUpdatedAt: string | null | undefined;
  syncedAt: string | null | undefined;
}): BlogEditorSyncStatus {
  if (!opts.hasEditor) return "none";
  if (!opts.hasDraftBody) return "no_draft";
  const draftTs = opts.draftUpdatedAt ? Date.parse(opts.draftUpdatedAt) : NaN;
  const syncTs = opts.syncedAt ? Date.parse(opts.syncedAt) : NaN;
  if (!Number.isFinite(syncTs)) return "needs_sync";
  if (!Number.isFinite(draftTs)) return "needs_sync";
  return draftTs <= syncTs ? "synced" : "needs_sync";
}

export const BLOG_SYNC_STATUS_LABEL: Record<BlogEditorSyncStatus, string> = {
  synced: "Synced",
  needs_sync: "Sync",
  no_draft: "No draft",
  none: "",
};
