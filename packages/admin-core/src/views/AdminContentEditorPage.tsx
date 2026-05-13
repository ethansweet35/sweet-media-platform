"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { useContentEditors } from "../hooks/useContentEditors";
import {
  STATUS_IS_PROCESSING,
  STATUS_LABELS,
  type ContentEditorListRow,
  type ContentEditorStatus,
} from "../types/content-editor";

const inputCls =
  "w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#3d6f7f] transition-colors";

const STATUS_CLS: Record<ContentEditorStatus, string> = {
  pending: "bg-neutral-100 text-neutral-600",
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
  if (score == null) return "text-neutral-300";
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  if (score > 0) return "text-orange-600";
  return "text-neutral-300";
}

function wordRangeText(row: ContentEditorListRow): string {
  if (row.recommended_word_count_min != null && row.recommended_word_count_max != null) {
    return `${row.recommended_word_count_min}–${row.recommended_word_count_max}`;
  }
  return "—";
}

export default function AdminContentEditorPage() {
  const { rows, loading, error, createEditor, removeEditor, refresh } = useContentEditors();
  const [keyword, setKeyword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [optimizingIds, setOptimizingIds] = useState<Set<string>>(() => new Set());

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
        if (!Number.isFinite(startedAt) || Date.now() - startedAt > 10 * 60 * 1000) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = keyword.trim();
    if (!cleaned || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    const created = await createEditor({ primaryKeyword: cleaned });
    setSubmitting(false);
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
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <label className="block text-[11px] font-bold tracking-[0.12em] uppercase text-neutral-500 mb-1.5">
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
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !keyword.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              style={{ backgroundColor: ADMIN_OCEAN }}
            >
              {submitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin" /> Starting
                </>
              ) : (
                <>
                  <i className="ri-sparkling-2-line" /> Analyze
                </>
              )}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400 leading-relaxed">
            Scans the top organic results in Google US, scrapes each page with Firecrawl, extracts NLP entities + n-grams + facts, and builds a content brief.
            Typically 90–180 seconds. Cost: ~$0.30 per editor.
          </p>
          {submitError ? (
            <p className="mt-2 text-[12px] text-red-600 flex items-center gap-1.5">
              <i className="ri-error-warning-line" /> {submitError}
            </p>
          ) : null}
        </form>

        {/* List */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-100">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
                Recent editors
                <span className="ml-2 text-neutral-400 normal-case font-normal tracking-normal">
                  ({rows.length})
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-neutral-400">
                Click an editor to open the workspace.
              </p>
            </div>
            <button
              type="button"
              onClick={() => void refresh()}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400 cursor-pointer transition-colors"
            >
              <i className="ri-refresh-line mr-1" />
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="p-8 text-center text-sm text-neutral-500">
              <i className="ri-loader-4-line animate-spin mr-2" /> Loading editors…
            </p>
          ) : rows.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div
                className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${ADMIN_OCEAN}18` }}
              >
                <i className="ri-sparkling-2-line text-2xl" style={{ color: ADMIN_OCEAN }} />
              </div>
              <p className="text-sm font-semibold text-neutral-700">No editors yet.</p>
              <p className="mt-1.5 text-[12px] text-neutral-500 leading-relaxed max-w-md mx-auto">
                Enter a target keyword above to generate your first content editor. We&apos;ll
                scrape the top-ranking pages and build a complete writing brief.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.08em] text-neutral-500">
                  <tr>
                    <th className="px-5 py-2.5">Keyword</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Word target</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Score</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Cost</th>
                    <th className="px-3 py-2.5 whitespace-nowrap">Updated</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {rows.map((row) => {
                    const processing = STATUS_IS_PROCESSING[row.status];
                    return (
                      <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/content-editor/${row.id}`}
                            className="text-[13px] text-neutral-900 hover:text-[#3d6f7f] font-medium"
                          >
                            {row.primary_keyword}
                          </Link>
                          {row.error ? (
                            <p className="mt-0.5 text-[11px] text-red-600 truncate max-w-md">
                              {row.error}
                            </p>
                          ) : row.status_message ? (
                            <p className="mt-0.5 text-[11px] text-neutral-400 truncate max-w-md">
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
                            <span className="ml-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#3d6f7f]/10 text-[#1f4452]">
                              <i className="ri-magic-line animate-pulse" />
                              Optimizing
                            </span>
                          ) : null}
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-600">
                          {wordRangeText(row)}
                        </td>
                        <td className="px-3 py-3 text-right">
                          {row.current_content_score != null ? (
                            <span className="inline-flex items-center gap-1 font-mono text-[12px]">
                              <span className={`font-bold ${scoreClass(row.current_content_score)}`}>
                                {Math.round(row.current_content_score)}
                              </span>
                              <span className="text-neutral-300">/</span>
                              <span className="text-neutral-400">{row.target_score ?? "—"}</span>
                            </span>
                          ) : (
                            <span className={`font-mono text-[13px] font-semibold ${scoreClass(row.target_score)}`}>
                              {row.target_score != null ? <>— <span className="text-neutral-400 text-[11px]">/ {row.target_score}</span></> : "—"}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-[11px] text-neutral-500">
                          ${Number(row.total_cost_usd ?? 0).toFixed(3)}
                        </td>
                        <td className="px-3 py-3 text-[12px] text-neutral-500">
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
                              className="px-2 py-1 rounded-md text-[10px] font-semibold text-neutral-400 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
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
