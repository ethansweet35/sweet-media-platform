"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import AdminContentBulkBar from "../components/content-list/AdminContentBulkBar";
import ContentEditorBulkCreateModal from "../components/content-editor/ContentEditorBulkCreateModal";
import ContentEditorLinkBadge from "../components/content-editor/ContentEditorLinkBadge";
import { useContentEditorBulkJob } from "../contexts/ContentEditorBulkJobContext";
import { ADMIN_ACCENT, ADMIN_ACCENT_SOFT, ADMIN_OCEAN } from "../lib/adminTheme";
import { useContentEditors } from "../hooks/useContentEditors";
import {
  STATUS_IS_PROCESSING,
  STATUS_LABELS,
  type ContentEditorListRow,
  type ContentEditorStatus,
} from "../types/content-editor";

const inputCls =
  "w-full px-4 py-3 text-sm border border-[#E2E8F0] rounded-xl bg-white text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:border-[#7B9FD4] transition-colors";

const STATUS_CLS: Record<ContentEditorStatus, string> = {
  pending: "bg-[#F4F7FB] text-[#64748B]",
  fetching_serp: "bg-blue-50 text-blue-700",
  extracting_content: "bg-blue-50 text-blue-700",
  analyzing_nlp: "bg-amber-50 text-amber-700",
  extracting_facts: "bg-amber-50 text-amber-700",
  computing_guidelines: "bg-amber-50 text-amber-700",
  ready: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
};

function relativeTime(iso: string): string {
  const ts = Date.parse(iso);
  if (Number.isNaN(ts)) return "";
  const diffMin = Math.round((Date.now() - ts) / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const hours = Math.round(diffMin / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

function scoreClass(score: number | null): string {
  if (score == null) return "text-[#CBD5E1]";
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  if (score > 0) return "text-orange-600";
  return "text-[#CBD5E1]";
}

function wordRangeText(row: ContentEditorListRow): string {
  if (row.recommended_word_count_min != null && row.recommended_word_count_max != null) {
    return `${row.recommended_word_count_min}–${row.recommended_word_count_max}`;
  }
  return "—";
}

function canBulkSyncRow(row: ContentEditorListRow): boolean {
  return row.link_kind === "blog" && row.draft_body_present;
}

export default function AdminContentEditorPage() {
  const { rows, loading, error, createEditor, removeEditor, refresh } = useContentEditors();
  const { startBulkCreate, loading: bulkCreateLoading } = useContentEditorBulkJob();
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkCreateError, setBulkCreateError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [submittingMode, setSubmittingMode] = useState<"lite" | "deep" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [optimizingIds, setOptimizingIds] = useState<Set<string>>(() => new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [bulkSyncing, setBulkSyncing] = useState(false);
  const [bulkSyncResult, setBulkSyncResult] = useState<string | null>(null);

  const syncableRows = useMemo(() => rows.filter(canBulkSyncRow), [rows]);
  const selectedSyncable = useMemo(
    () => rows.filter((r) => selectedIds.has(r.id) && canBulkSyncRow(r)),
    [rows, selectedIds],
  );
  const allSyncableSelected =
    syncableRows.length > 0 && syncableRows.every((r) => selectedIds.has(r.id));
  const someSyncableSelected = syncableRows.some((r) => selectedIds.has(r.id)) && !allSyncableSelected;

  const toggleSelect = useCallback((id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const toggleSelectAllSyncable = useCallback(
    (checked: boolean) => {
      if (!checked) {
        setSelectedIds(new Set());
        return;
      }
      setSelectedIds(new Set(syncableRows.map((r) => r.id)));
    },
    [syncableRows],
  );

  const handleBulkSyncToBlog = useCallback(async () => {
    const ids = selectedSyncable.map((r) => r.id);
    if (ids.length === 0) return;
    const ok = window.confirm(
      `Sync ${ids.length} blog editor${ids.length === 1 ? "" : "s"} to their linked blog posts? This overwrites each post's title, meta, excerpt, and body.`,
    );
    if (!ok) return;
    setBulkSyncing(true);
    setBulkSyncResult(null);
    try {
      const res = await fetch("/api/admin/content-editor/bulk-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editorIds: ids }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        succeeded?: number;
        failed?: number;
        skipped?: number;
        results?: { editorId: string; ok: boolean; error?: string; slug?: string; skipped?: boolean }[];
      };
      if (!res.ok || json.ok === false) {
        throw new Error(json.error ?? `Bulk sync failed (HTTP ${res.status}).`);
      }
      const parts = [
        `${json.succeeded ?? 0} synced`,
        (json.failed ?? 0) > 0 ? `${json.failed} failed` : null,
        (json.skipped ?? 0) > 0 ? `${json.skipped} skipped` : null,
      ].filter(Boolean);
      setBulkSyncResult(parts.join(" · "));
      setSelectedIds(new Set());
      await refresh();
    } catch (err) {
      setBulkSyncResult(err instanceof Error ? err.message : "Bulk sync failed.");
    } finally {
      setBulkSyncing(false);
    }
  }, [selectedSyncable, refresh]);

  // Poll sessionStorage for any active auto-optimize flags so the list page
  // can show an "Optimizing" badge for editors whose brief page the user
  // started Auto-Optimize on and then navigated away from.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const scan = () => {
      const next = new Set<string>();
      const prefix = "content-editor-optimize-start:";
      for (let i = 0; i < window.sessionStorage.length; i++) {
        const key = window.sessionStorage.key(i);
        if (!key || !key.startsWith(prefix)) continue;
        const raw = window.sessionStorage.getItem(key);
        if (!raw) continue;
        const startedAt = Number(raw);
        if (!Number.isFinite(startedAt) || Date.now() - startedAt > 6 * 60 * 1000) {
          window.sessionStorage.removeItem(key);
          window.sessionStorage.removeItem(
            `content-editor-optimize-baseline:${key.slice(prefix.length)}`,
          );
          continue;
        }
        next.add(key.slice(prefix.length));
      }
      setOptimizingIds((prev) => {
        if (prev.size === next.size) {
          let same = true;
          for (const id of prev) if (!next.has(id)) { same = false; break; }
          if (same) return prev;
        }
        return next;
      });
    };
    scan();
    const t = setInterval(scan, 2000);
    return () => clearInterval(t);
  }, []);

  const handleRetry = async (id: string) => {
    setRetryingId(id);
    try {
      await fetch(`/api/admin/content-editor/${id}/run`, { method: "POST" });
      await refresh();
    } finally {
      setRetryingId(null);
    }
  };

  const startAnalysis = async (mode: "lite" | "deep") => {
    const cleaned = keyword.trim();
    if (!cleaned || submittingMode) return;
    setSubmittingMode(mode);
    setSubmitError(null);
    const created = await createEditor({ primaryKeyword: cleaned, analysisMode: mode });
    setSubmittingMode(null);
    if (!created) {
      setSubmitError(error ?? "Failed to start the analysis.");
      return;
    }
    setKeyword("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this content editor? This cannot be undone.")) return;
    await removeEditor(id);
  };

  return (
    <div>
      <AdminPageHeader
        title="Content Editor"
        subtitle="Surfer-style content optimization: real SERP scraping, NLP entity extraction, fact mining, and live scoring against the top-ranking competitors."
      />

      <div className="mx-auto max-w-screen-xl py-6 space-y-6">
        {/* New editor form */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B]">
              New editor
            </label>
            <button
              type="button"
              onClick={() => {
                setBulkCreateError(null);
                setBulkModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#7B9FD4]/50 bg-[#F4F7FB] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A1F44] hover:border-[#7B9FD4] transition-colors"
            >
              <i className="ri-stack-line" /> Bulk create
            </button>
          </div>
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#64748B] mb-1.5">
            Target keyword
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder='e.g. "intensive outpatient program orange county"'
              className={inputCls}
              autoFocus
              disabled={Boolean(submittingMode)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void startAnalysis("lite");
                }
              }}
            />
            <div className="flex flex-col gap-2 sm:flex-row shrink-0">
              <button
                type="button"
                disabled={Boolean(submittingMode) || !keyword.trim()}
                onClick={() => void startAnalysis("lite")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                style={{ backgroundColor: ADMIN_OCEAN }}
              >
                {submittingMode === "lite" ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" /> Starting
                  </>
                ) : (
                  <>
                    <i className="ri-sparkling-2-line" /> Analyze
                  </>
                )}
              </button>
              <button
                type="button"
                disabled={Boolean(submittingMode) || !keyword.trim()}
                onClick={() => void startAnalysis("deep")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] border border-[#7B9FD4] text-[#0A1F44] bg-white transition-opacity hover:bg-[#F4F7FB] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {submittingMode === "deep" ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" /> Starting
                  </>
                ) : (
                  <>
                    <i className="ri-flask-line" /> Deep analyze
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-[#94A3B8] leading-relaxed">
            <strong className="text-[#64748B] font-semibold">Analyze</strong> — top 10 SERP, hybrid fetch + Firecrawl fallback, rules-based terms, heuristic outline, batched facts. ~60–120s, ~$0.08–0.15.
            {" "}
            <strong className="text-[#64748B] font-semibold">Deep analyze</strong> — top 20, Firecrawl on every page, Sonnet curation + outline, per-page fact extraction. ~90–180s, ~$0.30.
          </p>
          {submitError ? (
            <p className="mt-2 text-[12px] text-red-600 flex items-center gap-1.5">
              <i className="ri-error-warning-line" /> {submitError}
            </p>
          ) : null}
          {bulkCreateError ? (
            <p className="mt-2 text-[12px] text-red-600 flex items-center gap-1.5">
              <i className="ri-error-warning-line" /> {bulkCreateError}
            </p>
          ) : null}
        </div>

        <ContentEditorBulkCreateModal
          open={bulkModalOpen}
          loading={bulkCreateLoading}
          onClose={() => setBulkModalOpen(false)}
          onSubmit={async (input) => {
            try {
              setBulkCreateError(null);
              await startBulkCreate(input);
              setBulkModalOpen(false);
              await refresh();
            } catch (err) {
              setBulkCreateError(err instanceof Error ? err.message : String(err));
            }
          }}
        />

        <AdminContentBulkBar
          count={selectedSyncable.length}
          noun="blog editor"
          detail={
            selectedIds.size > selectedSyncable.length
              ? `${selectedIds.size - selectedSyncable.length} non-blog selection ignored`
              : "Sync draft → linked blog post"
          }
        >
          <button
            type="button"
            disabled={bulkSyncing || selectedSyncable.length === 0}
            onClick={() => void handleBulkSyncToBlog()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A1F44] transition-opacity hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {bulkSyncing ? (
              <i className="ri-loader-4-line animate-spin" />
            ) : (
              <i className="ri-upload-cloud-2-line" />
            )}
            Sync to blog
          </button>
        </AdminContentBulkBar>

        {bulkSyncResult ? (
          <p className="mb-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-[12px] text-[#334155]">
            <i className="ri-information-line mr-1.5 text-[#64748B]" />
            {bulkSyncResult}
          </p>
        ) : null}

        {/* List */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#E2E8F0]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#334155]">
                Recent editors
                <span className="ml-2 text-[#94A3B8] normal-case font-normal tracking-normal">
                  ({rows.length})
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-[#94A3B8]">
                Blog editors can bulk-sync to posts. Page editors use Apply SEO Meta on the brief.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void refresh()}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] border border-[#E2E8F0] text-[#334155] hover:border-[#7B9FD4] cursor-pointer transition-colors"
            >
              <i className="ri-refresh-line mr-1" />
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="p-8 text-center text-sm text-[#64748B]">
              <i className="ri-loader-4-line animate-spin mr-2" /> Loading editors…
            </p>
          ) : rows.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div
                className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: ADMIN_ACCENT_SOFT }}
              >
                <i className="ri-sparkling-2-line text-2xl" style={{ color: ADMIN_ACCENT }} />
              </div>
              <p className="text-sm font-semibold text-[#334155]">No editors yet.</p>
              <p className="mt-1.5 text-[12px] text-[#64748B] leading-relaxed max-w-md mx-auto">
                Enter a target keyword above to generate your first content editor. We&apos;ll
                scrape the top-ranking pages and build a complete writing brief.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#F4F7FB] text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
                  <tr>
                    <th className="w-10 py-2.5 pl-4 pr-1">
                      <input
                        type="checkbox"
                        checked={allSyncableSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = someSyncableSelected;
                        }}
                        disabled={syncableRows.length === 0}
                        onChange={(e) => toggleSelectAllSyncable(e.target.checked)}
                        title="Select all blog editors with a draft"
                        className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1] accent-[#0A1F44] disabled:opacity-40"
                      />
                    </th>
                    <th className="px-3 py-2.5">Linked to</th>
                    <th className="px-5 py-2.5">Keyword</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Word target</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Score</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Cost</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Updated</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {rows.map((row) => {
                    const processing = STATUS_IS_PROCESSING[row.status];
                    const bulkOk = canBulkSyncRow(row);
                    return (
                      <tr key={row.id} className="hover:bg-[#F4F7FB]/50 transition-colors">
                        <td className="py-3 pl-4 pr-1 align-middle">
                          {bulkOk ? (
                            <input
                              type="checkbox"
                              checked={selectedIds.has(row.id)}
                              onChange={(e) => toggleSelect(row.id, e.target.checked)}
                              className="h-4 w-4 cursor-pointer rounded border-[#CBD5E1] accent-[#0A1F44]"
                              aria-label={`Select ${row.primary_keyword}`}
                            />
                          ) : (
                            <span
                              className="inline-block h-4 w-4"
                              title={
                                row.link_kind === "page"
                                  ? "Pages are updated manually on the brief"
                                  : row.link_kind === "blog"
                                    ? "Run Auto-Optimize or add a draft first"
                                    : "Link from Blog Posts or Pages first"
                              }
                            />
                          )}
                        </td>
                        <td className="px-3 py-3 align-middle max-w-[140px]">
                          <ContentEditorLinkBadge
                            linkKind={row.link_kind}
                            linkLabel={row.link_label}
                            linkTitle={row.link_title}
                            blogSyncStatus={row.blog_sync_status}
                          />
                        </td>
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/content-editor/${row.id}`}
                            className="text-[13px] text-[#0A1F44] hover:text-[#0A1F44] font-medium"
                          >
                            {row.primary_keyword}
                          </Link>
                          {row.error ? (
                            <p className="mt-0.5 text-[11px] text-red-600 truncate max-w-md">
                              {row.error}
                            </p>
                          ) : row.status_message ? (
                            <p className="mt-0.5 text-[11px] text-[#94A3B8] truncate max-w-md">
                              {row.status_message}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${STATUS_CLS[row.status]}`}
                          >
                            {processing ? <i className="ri-loader-4-line animate-spin" /> : null}
                            {STATUS_LABELS[row.status]}
                          </span>
                          {optimizingIds.has(row.id) ? (
                            <span className="ml-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#0A1F44]/10 text-[#1f4452]">
                              <i className="ri-magic-line animate-pulse" />
                              Optimizing
                            </span>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-[12px] text-[#64748B]">
                          {wordRangeText(row)}
                        </td>
                        <td className="px-3 py-3 text-right">
                          {(() => {
                            // Page Mode editors show the LIVE page score (not the
                            // AI-generated draft's recommendation score). The recs
                            // are aspirational until manually ported.
                            const isPageMode = !!row.linked_tracked_page_id;
                            const score = isPageMode
                              ? (row.live_page_score ?? null)
                              : (row.current_content_score ?? null);
                            const targetLabel = row.target_score != null ? Math.round(row.target_score) : "—";
                            return score != null ? (
                              <span className="inline-flex items-center gap-1 font-mono text-[12px]" title={isPageMode ? "Live page score" : "Current draft score"}>
                                <span className={`font-bold ${scoreClass(score)}`}>
                                  {Math.round(score)}
                                </span>
                                <span className="text-[#CBD5E1]">/</span>
                                <span className="text-[#94A3B8]">{targetLabel}</span>
                                {isPageMode ? (
                                  <span className="ml-1 px-1 py-0.5 rounded bg-[#0A1F44]/10 text-[#0A1F44] text-[9px] font-bold tracking-wider">LIVE</span>
                                ) : null}
                              </span>
                            ) : (
                              <span className={`font-mono text-[13px] font-semibold ${scoreClass(row.target_score)}`}>
                                {row.target_score != null ? <>— <span className="text-[#94A3B8] text-[11px]">/ {targetLabel}</span></> : "—"}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-[11px] text-[#64748B]">
                          ${Number(row.total_cost_usd ?? 0).toFixed(3)}
                        </td>
                        <td className="px-3 py-3 text-[12px] text-[#64748B]">
                          {relativeTime(row.updated_at)}
                        </td>
                        <td className="px-3 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            {row.status === "failed" ? (
                              <button
                                type="button"
                                onClick={() => void handleRetry(row.id)}
                                disabled={retryingId === row.id}
                                title="Retry from last failed phase"
                                className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.08em] text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 cursor-pointer transition-colors"
                              >
                                {retryingId === row.id ? (
                                  <i className="ri-loader-4-line animate-spin" />
                                ) : (
                                  <><i className="ri-refresh-line mr-0.5" />Retry</>
                                )}
                              </button>
                            ) : null}
                            <Link
                              href={`/admin/content-editor/${row.id}`}
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: ADMIN_OCEAN }}
                            >
                              <i className="ri-edit-line mr-0.5" />
                              Open
                            </Link>
                            <button
                              type="button"
                              onClick={() => void handleDelete(row.id)}
                              title="Delete editor"
                              className="px-2 py-1 rounded-md text-[10px] font-semibold text-[#94A3B8] hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
                            >
                              <i className="ri-delete-bin-line" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
