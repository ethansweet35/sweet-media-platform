"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { useSeoBriefs } from "../hooks/useSeoBriefs";
import {
  DEFAULT_SEO_BRIEF_MODEL,
  SEO_BRIEF_MODELS,
  computeContentScore,
  type SeoBriefRow,
  type SeoBriefStatus,
} from "../types/seo-brief";

const inputCls =
  "w-full px-4 py-3 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#3d6f7f] transition-colors";

const STATUS_LABELS: Record<SeoBriefStatus, string> = {
  pending: "Pending",
  processing: "Researching",
  ready: "Ready",
  error: "Error",
};

const STATUS_CLS: Record<SeoBriefStatus, string> = {
  pending: "bg-neutral-100 text-neutral-600",
  processing: "bg-amber-50 text-amber-700",
  ready: "bg-emerald-50 text-emerald-700",
  error: "bg-red-50 text-red-700",
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

function scoreForBrief(brief: SeoBriefRow): number {
  if (brief.status !== "ready") return 0;
  return computeContentScore(
    brief.draft_content ?? "",
    brief.content_structure,
    brief.important_terms,
  ).score;
}

function scoreClass(score: number): string {
  if (score >= 75) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  if (score > 0) return "text-orange-600";
  return "text-neutral-300";
}

export default function AdminSweetSeoPage() {
  const { rows, loading, error, createBrief, removeBrief, refresh } = useSeoBriefs();
  const [keyword, setKeyword] = useState("");
  const [model, setModel] = useState(DEFAULT_SEO_BRIEF_MODEL);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sortedRows = useMemo(() => rows, [rows]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = keyword.trim();
    if (!cleaned || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    const created = await createBrief(cleaned, model);
    setSubmitting(false);
    if (!created) {
      setSubmitError(error ?? "Failed to start the analysis.");
      return;
    }
    setKeyword("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this Sweet SEO brief? This cannot be undone.")) return;
    await removeBrief(id);
  };

  return (
    <div>
      <AdminPageHeader
        title="Sweet SEO"
        subtitle="Generate a competitor-aware content brief for any keyword. Live-scores your draft against the targets, just like Surfer."
      />

      <div className="mx-auto max-w-screen-xl py-6 space-y-6">
        {/* New brief form */}
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
              placeholder='e.g. "living with an addict"'
              className={inputCls}
              autoFocus
              disabled={submitting}
            />
            <div className="flex gap-3">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={submitting}
                className="px-3 py-3 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-700 cursor-pointer disabled:opacity-50 min-w-[220px]"
              >
                {SEO_BRIEF_MODELS.map((m) => (
                  <option key={m.id} value={m.id} title={m.description}>
                    {m.displayName}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={submitting || !keyword.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                style={{ backgroundColor: ADMIN_OCEAN }}
              >
                {submitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" /> Analyzing
                  </>
                ) : (
                  <>
                    <i className="ri-sparkling-2-line" /> Analyze
                  </>
                )}
              </button>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-neutral-400">
            Scans top-ranking Google US results for the keyword, then extracts target word/heading/image
            counts, important NLP terms, questions to answer, and facts to include. Typically 30–90 seconds.
          </p>
          {submitError ? (
            <p className="mt-2 text-[12px] text-red-600 flex items-center gap-1.5">
              <i className="ri-error-warning-line" /> {submitError}
            </p>
          ) : null}
        </form>

        {/* Briefs list */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-100">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
                Recent briefs
                <span className="ml-2 text-neutral-400 normal-case font-normal tracking-normal">
                  ({sortedRows.length})
                </span>
              </p>
              <p className="mt-0.5 text-[11px] text-neutral-400">
                Click any brief to open the editor and view targets.
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
              <i className="ri-loader-4-line animate-spin mr-2" /> Loading briefs…
            </p>
          ) : sortedRows.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div
                className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${ADMIN_OCEAN}18` }}
              >
                <i className="ri-sparkling-2-line text-2xl" style={{ color: ADMIN_OCEAN }} />
              </div>
              <p className="text-sm font-semibold text-neutral-700">No briefs yet.</p>
              <p className="mt-1.5 text-[12px] text-neutral-500 leading-relaxed max-w-md mx-auto">
                Enter a target keyword above to generate your first Sweet SEO brief. We&apos;ll scan
                the top-ranking pages and tell you exactly what to include.
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
                    <th className="px-3 py-2.5 whitespace-nowrap">Updated</th>
                    <th className="px-3 py-2.5 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {sortedRows.map((brief) => {
                    const score = scoreForBrief(brief);
                    const wordRange = brief.content_structure
                      ? `${brief.content_structure.words.min}–${brief.content_structure.words.max}`
                      : "—";
                    return (
                      <tr key={brief.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="px-5 py-3">
                          <Link
                            href={`/admin/sweet-seo/${brief.id}`}
                            className="text-[13px] text-neutral-900 hover:text-[#3d6f7f] font-medium"
                          >
                            {brief.keyword}
                          </Link>
                          {brief.error_message ? (
                            <p className="mt-0.5 text-[11px] text-red-600 truncate max-w-md">
                              {brief.error_message}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${STATUS_CLS[brief.status]}`}
                          >
                            {brief.status === "processing" ? (
                              <i className="ri-loader-4-line animate-spin" />
                            ) : null}
                            {STATUS_LABELS[brief.status]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right font-mono text-[12px] text-neutral-600">
                          {wordRange}
                        </td>
                        <td className="px-3 py-3 text-right">
                          <span className={`font-mono text-[13px] font-semibold ${scoreClass(score)}`}>
                            {brief.status === "ready" ? score : "—"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-[12px] text-neutral-500">
                          {relativeTime(brief.updated_at)}
                        </td>
                        <td className="px-3 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href={`/admin/sweet-seo/${brief.id}`}
                              className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer hover:opacity-90 transition-opacity"
                              style={{ backgroundColor: ADMIN_OCEAN }}
                            >
                              <i className="ri-edit-line mr-0.5" />
                              Open
                            </Link>
                            <button
                              type="button"
                              onClick={() => void handleDelete(brief.id)}
                              title="Delete brief"
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
