"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import {
  useContentEditor,
  useDraftAutosave,
  useLiveScore,
  type DraftInputs,
} from "../hooks/useContentEditors";
import { useAiOptimizeRuns, type AiOptimizeRun } from "../hooks/useAiOptimizeRuns";
import {
  EEAT_CHECK_LABELS,
  STATUS_IS_PROCESSING,
  STATUS_LABELS,
  type ContentEditorFactRow,
  type ContentEditorQuestionRow,
  type ContentEditorTermRow,
  type EeatBreakdown,
  type ScoreBreakdown,
  type StructuralCheck,
  type TermUsage,
} from "../types/content-editor";

interface Props {
  briefId?: string;
}

function scoreColor(score: number): string {
  if (score >= 75) return "#0e9f6e"; // emerald
  if (score >= 50) return "#d97706"; // amber
  if (score > 0) return "#ea580c"; // orange
  return "#a3a3a3"; // neutral
}

function statusColor(status: TermUsage["status"]): string {
  switch (status) {
    case "good": return "text-emerald-600";
    case "under": return "text-orange-500";
    case "over": return "text-rose-500";
    case "missing":
    default: return "text-neutral-300";
  }
}

function statusIcon(status: TermUsage["status"]): string {
  switch (status) {
    case "good": return "ri-checkbox-circle-fill";
    case "under": return "ri-arrow-down-circle-line";
    case "over": return "ri-error-warning-line";
    case "missing":
    default: return "ri-circle-line";
  }
}

// ─── Pipeline timeline ────────────────────────────────────────────────

const PIPELINE_PHASES = [
  { id: "pending", label: "Queued", desc: "Waiting for worker to pick up the job", eta: 2 },
  { id: "fetching_serp", label: "Fetching SERP", desc: "Pulling top-ranking pages from Google", eta: 8 },
  { id: "extracting_content", label: "Scraping competitors", desc: "Reading and cleaning competitor pages with Firecrawl", eta: 45 },
  { id: "analyzing_nlp", label: "Analyzing topics", desc: "Google NLP entity extraction + TF-IDF n-gram analysis + AI term curation", eta: 35 },
  { id: "extracting_facts", label: "Extracting facts", desc: "Claude Haiku reads each competitor for citable facts", eta: 40 },
  { id: "computing_guidelines", label: "Building guidelines", desc: "Synthesizing outline, questions, structural targets", eta: 25 },
  { id: "ready", label: "Ready", desc: "All phases complete", eta: 0 },
] as const;

type PhaseState = "done" | "active" | "upcoming";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.max(0, Math.round(seconds))}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return s === 0 ? `${m}m` : `${m}m ${s}s`;
}

function PipelineTimeline({
  editorId,
  status,
  statusMessage,
  fallbackStart,
  error,
}: {
  editorId: string;
  status: string;
  statusMessage: string | null;
  fallbackStart: number;
  error: string | null;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Persist run start to sessionStorage so it survives reloads but resets
  // when status leaves the processing set. updated_at is unsuitable because
  // it bumps on every phase change.
  const startedAt = useMemo(() => {
    if (typeof window === "undefined") return fallbackStart;
    const key = `content-editor-run-start:${editorId}`;
    const existing = window.sessionStorage.getItem(key);
    if (existing) {
      const parsed = Number(existing);
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
    const t = Date.now();
    window.sessionStorage.setItem(key, String(t));
    return t;
  }, [editorId, fallbackStart]);

  // Clear stored start when not processing (next run starts fresh).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "ready" || status === "failed") {
      window.sessionStorage.removeItem(`content-editor-run-start:${editorId}`);
    }
  }, [status, editorId]);

  const elapsed = Math.max(0, (now - startedAt) / 1000);
  const activeIdx = PIPELINE_PHASES.findIndex((p) => p.id === status);

  // Cumulative ETA up to the END of each phase (running total of estimates).
  const cumulativeEta = useMemo(() => {
    let total = 0;
    return PIPELINE_PHASES.map((p) => (total += p.eta));
  }, []);
  const totalEta = cumulativeEta[cumulativeEta.length - 1];
  const etaRemaining =
    activeIdx >= 0 && activeIdx < cumulativeEta.length
      ? Math.max(2, cumulativeEta[activeIdx] - Math.min(elapsed, cumulativeEta[activeIdx] - 1))
      : Math.max(0, totalEta - elapsed);

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <i className="ri-loader-4-line animate-spin text-2xl text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <p className="text-sm font-semibold text-amber-900">
              {PIPELINE_PHASES[activeIdx]?.label ?? "Processing"}…
            </p>
            <div className="text-[11px] font-mono text-amber-800 tabular-nums">
              <span className="opacity-70">elapsed</span>{" "}
              <span className="font-semibold">{formatDuration(elapsed)}</span>
              {etaRemaining > 0 ? (
                <>
                  <span className="opacity-50 mx-1.5">·</span>
                  <span className="opacity-70">est. remaining</span>{" "}
                  <span className="font-semibold">~{formatDuration(etaRemaining)}</span>
                </>
              ) : null}
            </div>
          </div>
          <p className="mt-1 text-[12px] text-amber-800">
            {statusMessage ?? PIPELINE_PHASES[activeIdx]?.desc ?? "Working…"}
          </p>
        </div>
      </div>

      {/* Inline error banner — pipeline can keep going on soft errors but
          we surface anything non-fatal that bubbled up. */}
      {error ? (
        <div className="mb-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 flex items-start gap-2">
          <i className="ri-alert-line text-rose-600 mt-0.5 text-sm" />
          <p className="text-[11px] text-rose-900 leading-snug">
            <span className="font-semibold">Warning: </span>
            {error}
          </p>
        </div>
      ) : null}

      {/* Phase timeline */}
      <ol className="space-y-2.5">
        {PIPELINE_PHASES.map((phase, idx) => {
          if (phase.id === "ready") return null;
          let state: PhaseState;
          if (activeIdx === -1) state = "upcoming";
          else if (idx < activeIdx) state = "done";
          else if (idx === activeIdx) state = "active";
          else state = "upcoming";

          const iconClass =
            state === "done"
              ? "ri-checkbox-circle-fill text-emerald-600"
              : state === "active"
                ? "ri-loader-4-line animate-spin text-amber-600"
                : "ri-circle-line text-neutral-300";

          const textColor =
            state === "done"
              ? "text-neutral-700"
              : state === "active"
                ? "text-amber-900"
                : "text-neutral-400";

          const descColor =
            state === "done"
              ? "text-neutral-500"
              : state === "active"
                ? "text-amber-700"
                : "text-neutral-400";

          return (
            <li key={phase.id} className="flex items-start gap-3">
              <i className={`${iconClass} mt-0.5 text-base flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`text-[12px] font-semibold ${textColor}`}>{phase.label}</p>
                  {state === "done" ? (
                    <span className="text-[10px] font-mono text-emerald-700 opacity-70">done</span>
                  ) : state === "active" ? (
                    <span className="text-[10px] font-mono text-amber-700">in progress</span>
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-400">
                      ~{formatDuration(phase.eta)}
                    </span>
                  )}
                </div>
                <p className={`text-[11px] leading-snug ${descColor}`}>{phase.desc}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 pt-4 border-t border-amber-200 text-[10px] text-amber-700 opacity-75">
        Estimates are based on typical runs. Live page refreshes every few seconds.
      </p>
    </div>
  );
}

function PageModeBanner({
  routePath,
  snapshot,
  scanning,
  scanError,
  onClearError,
}: {
  routePath: string;
  snapshot: { fetched_at: string; word_count: number | null; computed_content_score: number | null; status_code: number | null; fetch_error: string | null } | null;
  scanning: boolean;
  scanError: string | null;
  onClearError: () => void;
}) {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  // Production URL when SSR'd from another origin would be wrong; the
  // server uses NEXT_PUBLIC_SITE_URL. For the link in the UI we just use
  // the route path which works regardless.
  const href = routePath.startsWith("/") ? routePath : `/${routePath}`;

  const fetchedDate = snapshot?.fetched_at ? new Date(snapshot.fetched_at) : null;
  const ageMs = fetchedDate ? Date.now() - fetchedDate.getTime() : null;
  const ageLabel =
    ageMs == null
      ? "never"
      : ageMs < 60_000
        ? "just now"
        : ageMs < 3_600_000
          ? `${Math.round(ageMs / 60_000)}m ago`
          : `${Math.round(ageMs / 3_600_000)}h ago`;

  return (
    <div className="mb-4 rounded-2xl border border-[#3d6f7f]/30 bg-[#3d6f7f]/[0.04] p-5">
      <div className="flex items-start gap-4">
        <i className="ri-global-line text-2xl text-[#3d6f7f] mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-sm font-semibold text-[#1f4452]">Page Mode</p>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-mono text-[#3d6f7f] hover:underline"
            >
              {siteUrl ? `${siteUrl}${href === "/" ? "" : href}` : href}
              <i className="ri-external-link-line ml-1 text-[10px]" />
            </a>
          </div>
          <p className="mt-1 text-[11px] text-neutral-600 leading-snug">
            The brief is scoring your <strong>live page</strong> against top-ranking competitors.
            Body content is read-only — the editor surfaces SEO gaps and Auto-Optimize generates
            recommendations you can selectively apply.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-neutral-500">
            <span>
              Last scan: <span className="font-mono font-semibold text-neutral-700">{ageLabel}</span>
            </span>
            {snapshot?.word_count != null ? (
              <span>
                Words: <span className="font-mono font-semibold text-neutral-700">{snapshot.word_count}</span>
              </span>
            ) : null}
            {snapshot?.computed_content_score != null ? (
              <span>
                Score: <span className="font-mono font-semibold text-neutral-700">{Math.round(snapshot.computed_content_score)}</span>
              </span>
            ) : null}
            {snapshot?.status_code != null && snapshot.status_code !== 200 ? (
              <span className="text-amber-700">
                HTTP <span className="font-mono font-semibold">{snapshot.status_code}</span>
              </span>
            ) : null}
            {scanning ? (
              <span className="text-[#3d6f7f] flex items-center gap-1">
                <i className="ri-loader-4-line animate-spin" /> Scanning live page…
              </span>
            ) : null}
          </div>
          {snapshot?.fetch_error ? (
            <p className="mt-2 text-[11px] text-red-700">
              <i className="ri-error-warning-line mr-1" />
              Last scan error: {snapshot.fetch_error}
            </p>
          ) : null}
        </div>
      </div>
      {scanError ? (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 flex items-start gap-2">
          <i className="ri-error-warning-line text-red-600 mt-0.5 text-sm" />
          <p className="flex-1 text-[11px] text-red-900">{scanError}</p>
          <button type="button" onClick={onClearError} className="text-red-400 hover:text-red-600 text-sm">
            <i className="ri-close-line" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ─── AI Optimize Runs panel ─────────────────────────────────────────── */

function statusBadgeClasses(status: AiOptimizeRun["status"]): string {
  switch (status) {
    case "queued":
      return "bg-neutral-100 text-neutral-700";
    case "running":
      return "bg-amber-100 text-amber-800";
    case "pr_opened":
      return "bg-emerald-100 text-emerald-800";
    case "merged":
      return "bg-emerald-700 text-white";
    case "failed":
      return "bg-rose-100 text-rose-800";
    case "cancelled":
      return "bg-neutral-200 text-neutral-600";
    default:
      return "bg-neutral-100 text-neutral-700";
  }
}

function statusLabel(status: AiOptimizeRun["status"]): string {
  switch (status) {
    case "queued":
      return "Queued";
    case "running":
      return "Running";
    case "pr_opened":
      return "PR open";
    case "merged":
      return "Merged";
    case "failed":
      return "Failed";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}

function relativeAgo(iso: string | null): string {
  if (!iso) return "never";
  const ms = Date.now() - Date.parse(iso);
  if (Number.isNaN(ms)) return "never";
  const mins = Math.round(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

/** Cursor SDK model options surfaced in the panel's per-run model picker. */
const OPTIMIZE_PR_MODELS: { id: string; label: string; hint: string }[] = [
  { id: "composer-2", label: "Composer 2", hint: "Fastest · cheapest · default" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6", hint: "Thoughtful · balanced" },
  { id: "claude-opus-4-7", label: "Claude Opus 4.7", hint: "Best reasoning · slowest" },
  { id: "gpt-5-5-pro", label: "GPT-5.5 Pro", hint: "Strong alt opinion" },
];

function AiOptimizeRunsPanel({
  runs,
  triggering,
  onTrigger,
  onCancel,
  cancellingId,
}: {
  runs: AiOptimizeRun[];
  triggering: boolean;
  onTrigger: (opts?: { model?: string; customInstructions?: string }) => void | Promise<void>;
  onCancel: (id: string) => void | Promise<void>;
  cancellingId: string | null;
}) {
  const [selectedModel, setSelectedModel] = useState<string>(OPTIMIZE_PR_MODELS[0].id);

  return (
    <div className="rounded-2xl border border-[#3d6f7f]/30 bg-[#f9fbfc] shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-[#3d6f7f]/15 bg-[#3d6f7f]/[0.06] flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <i className="ri-git-pull-request-line text-[#3d6f7f]" />
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#1f4452]">
            AI optimization PRs
            <span className="ml-1.5 text-neutral-400 normal-case font-normal tracking-normal">
              ({runs.length})
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <label
            className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500"
            htmlFor="optimize-pr-model-select"
          >
            Model
          </label>
          <select
            id="optimize-pr-model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={triggering}
            className="text-[11px] font-mono border border-neutral-200 rounded-md px-2 py-1 bg-white cursor-pointer disabled:opacity-50"
            title={
              OPTIMIZE_PR_MODELS.find((m) => m.id === selectedModel)?.hint ?? selectedModel
            }
          >
            {OPTIMIZE_PR_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => void onTrigger({ model: selectedModel })}
            disabled={triggering}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] bg-[#3d6f7f] text-white hover:bg-[#2f5a6b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            title="Fire a Cursor cloud agent that reads this page's .tsx + the brief, and opens a PR with code-level edits matching the brand design system"
          >
            {triggering ? (
              <>
                <i className="ri-loader-4-line animate-spin" /> Dispatching…
              </>
            ) : (
              <>
                <i className="ri-magic-line" /> Open new optimization PR
              </>
            )}
          </button>
        </div>
      </div>

      <div className="px-5 py-4 space-y-2 text-[12px]">
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Each run fires a Cursor cloud agent that clones the repo, reads this
          page&apos;s <code className="px-1 py-0.5 rounded bg-neutral-100 font-mono">.tsx</code> files
          + the brand design system rules + the content brief, and opens a real
          GitHub PR with the edits. You review the diff, then merge for Vercel
          to deploy.
        </p>

        {runs.length === 0 ? (
          <p className="rounded-xl border border-neutral-200 bg-white px-4 py-6 text-center text-[12px] text-neutral-500">
            No runs yet. Click <strong>Open new optimization PR</strong> above
            to fire the first one.
          </p>
        ) : (
          <ul className="space-y-2">
            {runs.map((run) => (
              <li
                key={run.id}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase flex-shrink-0 ${statusBadgeClasses(run.status)}`}
                    >
                      {statusLabel(run.status)}
                    </span>
                    {run.pr_url ? (
                      <a
                        href={run.pr_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[12px] text-[#3d6f7f] hover:underline truncate"
                      >
                        #{run.pr_number ?? "?"} ·{" "}
                        {run.branch_name ?? run.pr_url.split("/").pop()}
                        <i className="ri-external-link-line ml-1 text-[10px]" />
                      </a>
                    ) : run.cursor_agent_id ? (
                      <span className="font-mono text-[11px] text-neutral-500 truncate">
                        agent {run.cursor_agent_id}
                      </span>
                    ) : (
                      <span className="text-[11px] text-neutral-400 italic">
                        Awaiting agent…
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                    <span>{relativeAgo(run.created_at)}</span>
                    {run.status === "running" || run.status === "queued" ? (
                      <button
                        type="button"
                        onClick={() => void onCancel(run.id)}
                        disabled={cancellingId === run.id}
                        className="text-rose-600 hover:text-rose-800 disabled:opacity-50"
                        title="Cancel this run"
                      >
                        {cancellingId === run.id ? (
                          <i className="ri-loader-4-line animate-spin" />
                        ) : (
                          <i className="ri-close-line" />
                        )}
                      </button>
                    ) : null}
                  </div>
                </div>

                {run.status_message ? (
                  <p className="text-[10px] text-neutral-500">{run.status_message}</p>
                ) : null}

                {run.diff_summary ? (
                  <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-3">
                    {run.diff_summary}
                  </p>
                ) : null}

                {run.error ? (
                  <p className="text-[10px] text-rose-700">
                    <i className="ri-error-warning-line mr-1" />
                    {run.error}
                  </p>
                ) : null}

                <div className="flex items-center gap-3 text-[10px] text-neutral-400 mt-0.5">
                  {run.model_id ? <span>{run.model_id}</span> : null}
                  {run.triggered_by_email ? (
                    <span>by {run.triggered_by_email}</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
function OptimizingBanner({
  startedAt,
  onReset,
}: {
  startedAt: number;
  onReset?: () => void;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const elapsed = Math.max(0, (now - startedAt) / 1000);
  const eta = Math.max(0, 120 - elapsed);

  // Vercel function maxDuration is 300s. After that, the `after()` task
  // gets SIGKILL'd silently. We surface this with progressively-stronger
  // warnings so the user knows when something's actually wrong vs. just slow.
  const isSlow = elapsed > 180 && elapsed <= 300;
  const isLikelyTimedOut = elapsed > 300;
  const isCertainlyDead = elapsed > 330;

  const bgClass = isCertainlyDead
    ? "border-red-300 bg-red-50"
    : isLikelyTimedOut
      ? "border-amber-300 bg-amber-50"
      : isSlow
        ? "border-amber-200 bg-amber-50/60"
        : "border-[#3d6f7f]/30 bg-[#3d6f7f]/5";

  const accentClass = isCertainlyDead
    ? "text-red-700"
    : isLikelyTimedOut || isSlow
      ? "text-amber-700"
      : "text-[#3d6f7f]";

  return (
    <div className={`rounded-2xl border p-5 mb-4 ${bgClass}`}>
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0 mt-0.5">
          <i className={`ri-magic-line text-2xl ${accentClass}`} />
          {!isCertainlyDead ? (
            <span className="absolute -top-1 -right-1 inline-flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 ${isLikelyTimedOut ? "bg-amber-600" : isSlow ? "bg-amber-500" : "bg-[#3d6f7f]"}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isLikelyTimedOut ? "bg-amber-600" : isSlow ? "bg-amber-500" : "bg-[#3d6f7f]"}`} />
            </span>
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <p className={`text-sm font-semibold ${isCertainlyDead ? "text-red-900" : isLikelyTimedOut || isSlow ? "text-amber-900" : "text-[#1f4452]"}`}>
              {isCertainlyDead
                ? "Auto-Optimize appears to have failed"
                : isLikelyTimedOut
                  ? "Taking longer than expected"
                  : isSlow
                    ? "Auto-Optimize taking a while…"
                    : "Auto-Optimize in progress…"}
            </p>
            <div className={`text-[11px] font-mono tabular-nums ${accentClass}`}>
              <span className="opacity-70">elapsed</span>{" "}
              <span className="font-semibold">{formatDuration(elapsed)}</span>
              {eta > 0 && !isLikelyTimedOut ? (
                <>
                  <span className="opacity-50 mx-1.5">·</span>
                  <span className="opacity-70">est. remaining</span>{" "}
                  <span className="font-semibold">~{formatDuration(eta)}</span>
                </>
              ) : !isLikelyTimedOut ? (
                <>
                  <span className="opacity-50 mx-1.5">·</span>
                  <span className="font-semibold">finalizing…</span>
                </>
              ) : null}
            </div>
          </div>
          <p className={`mt-1 text-[12px] leading-snug ${isCertainlyDead ? "text-red-800" : isLikelyTimedOut || isSlow ? "text-amber-800" : "text-[#3d6f7f]/90"}`}>
            {isCertainlyDead
              ? "The background task should have finished by now. Vercel's 5-minute function limit was likely exceeded. Reset and try again — the page brief is unchanged."
              : isLikelyTimedOut
                ? "Past Vercel's 5-minute function limit. The task may have been killed. If no recommendations appear in another minute or two, reset and retry."
                : isSlow
                  ? "AI is still working. Most runs finish in 90–180s; this one is unusual but may still complete."
                  : "AI is rewriting your draft against the content brief. This runs in the background — you can navigate away and come back. The new draft will appear here automatically when ready."}
          </p>
          {(isLikelyTimedOut || isCertainlyDead) && onReset ? (
            <button
              type="button"
              onClick={onReset}
              className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] ${isCertainlyDead ? "bg-red-700 text-white hover:bg-red-800" : "bg-amber-700 text-white hover:bg-amber-800"}`}
            >
              <i className="ri-restart-line" /> Reset & retry
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function structuralColor(status: StructuralCheck["status"]): string {
  switch (status) {
    case "good": return "text-emerald-600";
    case "under": return "text-orange-500";
    case "over": return "text-rose-500";
    case "missing":
    default: return "text-neutral-300";
  }
}

function structuralIcon(status: StructuralCheck["status"]): string {
  switch (status) {
    case "good": return "ri-checkbox-circle-fill";
    case "under": return "ri-arrow-down-circle-line";
    case "over": return "ri-error-warning-line";
    case "missing":
    default: return "ri-circle-line";
  }
}

function ScoreRing({ score, label, size = 80 }: { score: number; label?: string; size?: number }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, score));
  const offset = circumference - (clamped / 100) * circumference;
  const color = scoreColor(score);
  const cx = size / 2;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cx} r={radius} stroke="#f1f1f1" strokeWidth={6} fill="none" />
        <circle
          cx={cx}
          cy={cx}
          r={radius}
          stroke={color}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span
          className="font-bold tracking-tight"
          style={{
            color,
            fontSize: Math.round(size * (label ? 0.26 : 0.32)),
            lineHeight: 1,
          }}
        >
          {Math.round(score)}
        </span>
        {label ? (
          <span
            className="uppercase text-neutral-400 font-semibold"
            style={{
              fontSize: Math.max(6, Math.round(size * 0.08)),
              letterSpacing: "0.08em",
              lineHeight: 1,
              marginTop: Math.round(size * 0.04),
            }}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TermsList({
  terms,
  termUsage,
  filter,
}: {
  terms: ContentEditorTermRow[];
  termUsage: TermUsage[];
  filter: "all" | "missing" | "good" | "over";
}) {
  const usageMap = useMemo(() => {
    const m = new Map<string, TermUsage>();
    for (const u of termUsage) m.set(u.term.toLowerCase(), u);
    return m;
  }, [termUsage]);

  const filtered = terms.filter((t) => {
    if (t.user_blacklisted) return false;
    const usage = usageMap.get(t.term.toLowerCase());
    const status = usage?.status ?? "missing";
    if (filter === "all") return true;
    if (filter === "missing") return status === "missing" || status === "under";
    if (filter === "good") return status === "good";
    if (filter === "over") return status === "over";
    return true;
  });

  if (!filtered.length) {
    return <p className="text-[12px] text-neutral-400 italic px-3 py-2">No terms match the filter.</p>;
  }

  return (
    <ul className="max-h-96 overflow-y-auto -mx-2">
      {filtered.map((t) => {
        const usage = usageMap.get(t.term.toLowerCase());
        const status: TermUsage["status"] = usage?.status ?? "missing";
        const value = usage?.occurrences ?? 0;
        return (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 py-1.5 px-3 rounded-lg hover:bg-neutral-50 transition-colors"
            title={t.is_heading_recommended ? "Recommended for a heading" : undefined}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {t.is_primary_keyword ? (
                <i className="ri-star-fill text-amber-500 text-[10px] shrink-0" />
              ) : null}
              <span className="text-[12px] text-neutral-700 truncate">{t.term}</span>
              {t.is_heading_recommended ? (
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider shrink-0">H</span>
              ) : null}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`font-mono text-[11px] ${statusColor(status)}`}>{value}</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                /{t.min_recommended_uses}–{t.max_recommended_uses}
              </span>
              <i className={`${statusIcon(status)} text-sm ${statusColor(status)}`} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function StructuralPanel({
  checks,
  score,
}: {
  checks: StructuralCheck[];
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
          Content structure
        </p>
        <span className="text-[11px] font-bold" style={{ color: scoreColor(score) }}>
          {Math.round(score)}/100
        </span>
      </div>
      <div className="space-y-1.5">
        {checks.map((c) => (
          <div key={c.key} className="flex items-center justify-between text-[12px]">
            <span className="text-neutral-600 capitalize">{c.key.replace(/_/g, " ")}</span>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[12px] ${structuralColor(c.status)}`}>{c.value}</span>
              <span className="text-[11px] text-neutral-400 font-mono">/{c.min}–{c.max}</span>
              <i className={`${structuralIcon(c.status)} text-base ${structuralColor(c.status)}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionsPanel({ questions, score }: { questions: ContentEditorQuestionRow[]; score: number | undefined }) {
  if (!questions.length) return null;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
          Questions to answer
          <span className="ml-1.5 text-neutral-300 normal-case font-normal tracking-normal">
            ({questions.length})
          </span>
        </p>
        {score != null ? (
          <span className="text-[11px] font-bold" style={{ color: scoreColor(score) }}>
            {Math.round(score)}/100
          </span>
        ) : null}
      </div>
      <ul className="space-y-2 max-h-72 overflow-y-auto">
        {questions.slice(0, 30).map((q) => (
          <li key={q.id} className="text-[12px] text-neutral-600 leading-relaxed flex items-start gap-2">
            <i className="ri-question-line text-[12px] mt-0.5 text-neutral-300 shrink-0" />
            <span>{q.question}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactsPanel({ facts }: { facts: ContentEditorFactRow[] }) {
  if (!facts.length) return null;

  // Group by topic_cluster
  const grouped = facts.reduce<Record<string, ContentEditorFactRow[]>>((acc, f) => {
    const key = f.topic_cluster ?? "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
        Facts to include
        <span className="ml-1.5 text-neutral-300 normal-case font-normal tracking-normal">
          ({facts.length})
        </span>
      </p>
      <div className="space-y-4 max-h-[28rem] overflow-y-auto">
        {Object.entries(grouped).map(([topic, group]) => (
          <div key={topic}>
            <p className="text-[11px] font-bold text-neutral-700 mb-1.5">{topic}</p>
            <ul className="space-y-1.5">
              {group.map((f) => (
                <li
                  key={f.id}
                  className="text-[12px] text-neutral-600 leading-relaxed flex items-start gap-2"
                  title={`${f.source_count} source(s) — ${f.source_domain}`}
                >
                  <span
                    className="mt-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold shrink-0"
                    style={{
                      backgroundColor: f.source_count >= 2 ? "#ecfdf5" : "#f5f5f5",
                      color: f.source_count >= 2 ? "#047857" : "#737373",
                    }}
                  >
                    {f.source_count}
                  </span>
                  <span>{f.fact_text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function EeatPanel({ eeat }: { eeat: EeatBreakdown }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
            E-E-A-T (YMYL)
          </p>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Expertise · Authoritativeness · Trustworthiness
          </p>
        </div>
        <span className="text-[14px] font-bold" style={{ color: scoreColor(eeat.score) }}>
          {Math.round(eeat.score)}/100
        </span>
      </div>
      <ul className="space-y-1.5">
        {eeat.checks.map((c) => (
          <li
            key={c.key}
            className="flex items-start justify-between gap-2 text-[12px]"
            title={c.detail}
          >
            <span className={`flex items-center gap-1.5 ${c.passed ? "text-neutral-700" : "text-neutral-400"}`}>
              <i
                className={
                  c.passed
                    ? "ri-checkbox-circle-fill text-emerald-500 text-sm"
                    : "ri-close-circle-line text-neutral-300 text-sm"
                }
              />
              {EEAT_CHECK_LABELS[c.key]}
            </span>
            <span className={`text-[10px] font-mono ${c.passed ? "text-emerald-600" : "text-neutral-300"}`}>
              {c.passed ? `+${c.weight}` : `−${c.weight}`}
            </span>
          </li>
        ))}
      </ul>
      {eeat.authoritative_citation_count > 0 ? (
        <p className="mt-3 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 leading-relaxed">
          <span className="font-bold text-emerald-700">{eeat.authoritative_citation_count}</span> unique
          authoritative source{eeat.authoritative_citation_count === 1 ? "" : "s"} cited (.gov, .edu, SAMHSA, NIH, Mayo, etc.)
        </p>
      ) : (
        <p className="mt-3 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 leading-relaxed">
          Link to .gov, .edu, samhsa.gov, nih.gov, apa.org, or mayoclinic.org to boost authority.
        </p>
      )}
    </div>
  );
}

function CompetitorsPanel({ competitors }: { competitors: { id: string; serp_position: number; url: string; domain: string; word_count: number | null; individual_content_score: number | null; included_in_benchmark: boolean }[] }) {
  if (!competitors.length) return null;
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
        Competitors analyzed
      </p>
      <ul className="space-y-1.5 max-h-64 overflow-y-auto -mx-2">
        {competitors.map((c) => (
          <li
            key={c.id}
            className="px-3 py-1.5 rounded-lg hover:bg-neutral-50 flex items-center justify-between gap-2"
          >
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-neutral-600 hover:text-[#3d6f7f] flex items-center gap-1.5 min-w-0"
            >
              <span className="font-mono text-neutral-300 shrink-0">#{c.serp_position}</span>
              <span className="truncate">{c.domain}</span>
              <i className="ri-external-link-line text-[10px] shrink-0 opacity-50" />
            </a>
            <div className="flex items-center gap-2 shrink-0">
              {c.word_count ? (
                <span className="text-[10px] text-neutral-400 font-mono">{c.word_count}w</span>
              ) : null}
              {c.individual_content_score != null ? (
                <span
                  className="text-[10px] font-bold font-mono"
                  style={{ color: scoreColor(c.individual_content_score) }}
                >
                  {Math.round(c.individual_content_score)}
                </span>
              ) : null}
              {!c.included_in_benchmark ? (
                <i className="ri-eye-off-line text-[10px] text-neutral-300" title="Excluded from benchmark" />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export default function AdminContentEditorBriefPage({ briefId: briefIdProp }: Props = {}) {
  const params = useParams();
  const rawId = params?.id;
  const idFromRoute = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;
  const editorId = briefIdProp ?? idFromRoute ?? null;

  const { state, loading, error, rerun, refresh, clearError } = useContentEditor(editorId);

  const [drafts, setDrafts] = useState<DraftInputs>({
    titleTag: "",
    metaDescription: "",
    h1Text: "",
    bodyMarkdown: "",
  });
  const [filter, setFilter] = useState<"all" | "missing" | "good" | "over">("all");
  const [factCoverageEnabled, setFactCoverageEnabled] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeError, setOptimizeError] = useState<string | null>(null);
  const [optimizeStartedAt, setOptimizeStartedAt] = useState<number | null>(null);
  /**
   * Baseline marker used to detect when Auto-Optimize completes. We use the
   * draft's updated_at timestamp at click time because saveDraft does an
   * in-place UPDATE (not INSERT) — the draft id is stable across runs so
   * we can't compare ids. If currentDraft.updated_at advances past this
   * baseline, the optimize has landed.
   */
  const [optimizeBaselineUpdatedAt, setOptimizeBaselineUpdatedAt] = useState<string | null>(null);

  // Page Mode state — when the editor is linked to a tracked page.
  const isPageMode = !!state?.linkedPage;
  const trackedPageIdForRuns = state?.linkedPage?.id ?? null;
  const {
    runs: aiOptimizeRuns,
    refetch: refetchAiRuns,
    triggerRun,
    cancelRun,
    triggering: triggeringAiRun,
    cancellingId,
  } = useAiOptimizeRuns({ editorId, trackedPageId: trackedPageIdForRuns });
  const [livePageScanning, setLivePageScanning] = useState(false);
  const [livePageScanError, setLivePageScanError] = useState<string | null>(null);
  const [applyingSeoMeta, setApplyingSeoMeta] = useState(false);
  const [applySeoMetaResult, setApplySeoMetaResult] = useState<{ ok: boolean; message: string } | null>(null);

  // Hydrate draft from server when state loads / changes.
  //
  // Page Mode: hydrate from the live-page snapshot + the tracked page's
  // current SEO meta. The center column shows this read-only; the right
  // column scores against this content. AI Auto-Optimize results land in
  // currentDraft as recommendations that the user can selectively apply.
  useEffect(() => {
    if (state?.linkedPage) {
      const snap = state.linkedPage.liveSnapshot;
      setDrafts({
        titleTag: state.linkedPage.seo_title ?? "",
        metaDescription: state.linkedPage.meta_description ?? "",
        h1Text: snap?.headings?.find((h) => h.level === 1)?.text ?? "",
        bodyMarkdown: snap?.plaintext ?? "",
      });
      return;
    }
    if (!state?.currentDraft) return;
    setDrafts({
      titleTag: state.currentDraft.title_tag ?? "",
      metaDescription: state.currentDraft.meta_description ?? "",
      h1Text: state.currentDraft.h1_text ?? "",
      bodyMarkdown: state.currentDraft.body_markdown ?? "",
    });
  }, [state?.currentDraft, state?.linkedPage]);

  // Page Mode: auto-trigger an initial live scan once the editor is Ready
  // and we don't have a snapshot yet. (Don't fire while the pipeline is
  // still running — the scan route would 409.)
  useEffect(() => {
    if (!isPageMode || !editorId || !state?.linkedPage) return;
    if (state.linkedPage.liveSnapshot) return;
    if (state.editor.status !== "ready") return;
    if (livePageScanning) return;
    void (async () => {
      setLivePageScanning(true);
      setLivePageScanError(null);
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${state.linkedPage!.id}/scan-live`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ editorId, force: false }),
          },
        );
        const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (!res.ok || j.ok === false) {
          throw new Error(j.error ?? `Live scan failed (HTTP ${res.status}).`);
        }
        // Snapshot typically lands in 3-10s. Poll a few times then stop.
        setTimeout(() => void refresh({ silent: true }), 4000);
        setTimeout(() => void refresh({ silent: true }), 10000);
        setTimeout(() => void refresh({ silent: true }), 20000);
        setTimeout(() => setLivePageScanning(false), 25000);
      } catch (err) {
        setLivePageScanError(err instanceof Error ? err.message : String(err));
        setLivePageScanning(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageMode, editorId, state?.linkedPage?.id, state?.editor.status, state?.linkedPage?.liveSnapshot?.id]);

  async function handleRescanLivePage() {
    if (!editorId || !state?.linkedPage) return;
    setLivePageScanning(true);
    setLivePageScanError(null);
    try {
      const res = await fetch(
        `/api/admin/tracked-pages/${state.linkedPage.id}/scan-live`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ editorId, force: true }),
        },
      );
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || j.ok === false) {
        throw new Error(j.error ?? `Live scan failed (HTTP ${res.status}).`);
      }
      // Poll briefly so the new snapshot picks up.
      setTimeout(() => void refresh({ silent: true }), 5000);
      setTimeout(() => void refresh({ silent: true }), 12000);
      setTimeout(() => setLivePageScanning(false), 15000);
    } catch (err) {
      setLivePageScanError(err instanceof Error ? err.message : String(err));
      setLivePageScanning(false);
    }
  }

  async function handleApplySeoMeta() {
    if (!state?.linkedPage || !state.currentDraft) return;
    const title = state.currentDraft.title_tag?.trim() ?? null;
    const desc = state.currentDraft.meta_description?.trim() ?? null;
    if (!title && !desc) {
      setApplySeoMetaResult({ ok: false, message: "No AI-recommended title or description available yet. Run Auto-Optimize first." });
      return;
    }
    const summary = [
      title ? `Title:\n${title}` : null,
      desc ? `Meta description:\n${desc}` : null,
    ].filter(Boolean).join("\n\n");
    const ok = window.confirm(
      `Apply these SEO updates to the live page (${state.linkedPage.route_path})?\n\n${summary}\n\nThe page will be revalidated immediately — change is live as soon as you confirm.`,
    );
    if (!ok) return;
    setApplyingSeoMeta(true);
    setApplySeoMetaResult(null);
    try {
      const res = await fetch(
        `/api/admin/tracked-pages/${state.linkedPage.id}/apply-seo-meta`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seoTitle: title, metaDescription: desc }),
        },
      );
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || j.ok === false) {
        throw new Error(j.error ?? `Apply failed (HTTP ${res.status}).`);
      }
      setApplySeoMetaResult({ ok: true, message: "Applied. The page metadata is live." });
      await refresh({ silent: true });
    } catch (err) {
      setApplySeoMetaResult({
        ok: false,
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setApplyingSeoMeta(false);
    }
  }

  // Restore in-flight auto-optimize state from sessionStorage on mount.
  // Survives page navigation so the user can leave and come back.
  useEffect(() => {
    if (typeof window === "undefined" || !editorId) return;
    const startedKey = `content-editor-optimize-start:${editorId}`;
    const baselineKey = `content-editor-optimize-baseline:${editorId}`;
    const startedRaw = window.sessionStorage.getItem(startedKey);
    const baseline = window.sessionStorage.getItem(baselineKey);
    if (startedRaw) {
      const startedAt = Number(startedRaw);
      if (Number.isFinite(startedAt) && startedAt > 0) {
        // 6-minute safety stale-out — Vercel kills functions at 5min, so
        // anything past 6min is definitely dead. Show the banner anyway so
        // the user sees the timed-out state and can click Reset & retry.
        if (Date.now() - startedAt < 6 * 60 * 1000) {
          setOptimizing(true);
          setOptimizeStartedAt(startedAt);
          setOptimizeBaselineUpdatedAt(baseline);
        } else {
          window.sessionStorage.removeItem(startedKey);
          window.sessionStorage.removeItem(baselineKey);
        }
      }
    }
  }, [editorId]);

  // Detect completion by watching the current draft's updated_at advance
  // past the baseline captured at click time. saveDraft does in-place
  // UPDATE so the row id is stable — updated_at is the signal.
  useEffect(() => {
    if (!optimizing || !editorId) return;
    const currentUpdatedAt = state?.currentDraft?.updated_at ?? null;
    if (!currentUpdatedAt) return;
    const baseline = optimizeBaselineUpdatedAt;
    // If we have no baseline (rare — e.g. user clicked Reset and the
    // sessionStorage was cleared) treat any timestamp newer than the
    // optimize start as completion.
    const baselineDate = baseline ? Date.parse(baseline) : (optimizeStartedAt ?? 0);
    if (!Number.isFinite(baselineDate)) return;
    const curDate = Date.parse(currentUpdatedAt);
    if (Number.isFinite(curDate) && curDate > baselineDate) {
      setOptimizing(false);
      setOptimizeStartedAt(null);
      setOptimizeBaselineUpdatedAt(null);
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(`content-editor-optimize-start:${editorId}`);
        window.sessionStorage.removeItem(`content-editor-optimize-baseline:${editorId}`);
      }
    }
  }, [optimizing, state?.currentDraft?.updated_at, optimizeBaselineUpdatedAt, optimizeStartedAt, editorId]);

  // While optimizing, poll the server every 4s so we pick up the new draft.
  useEffect(() => {
    if (!optimizing || !editorId) return;
    const t = setInterval(() => {
      void refresh({ silent: true });
    }, 4000);
    return () => clearInterval(t);
  }, [optimizing, editorId, refresh]);

  // In Page Mode we want to compute scores from the live plaintext (so the
  // right column term counts are accurate) but we don't want to persist
  // those scores to the editor's draft row — the snapshot owns its score.
  const { score, scoring } = useLiveScore(drafts, {
    editorId,
    includeFactCoverage: factCoverageEnabled,
    debounceMs: 1200,
    persist: !isPageMode,
  });
  // No autosave in Page Mode — there is no editable draft.
  const { saving, saved } = useDraftAutosave(drafts, isPageMode ? null : editorId, 4000);

  function resetOptimizingState() {
    setOptimizing(false);
    setOptimizeStartedAt(null);
    setOptimizeBaselineUpdatedAt(null);
    if (typeof window !== "undefined" && editorId) {
      window.sessionStorage.removeItem(`content-editor-optimize-start:${editorId}`);
      window.sessionStorage.removeItem(`content-editor-optimize-baseline:${editorId}`);
    }
  }

  async function handleAutoOptimize() {
    if (!state || !editorId) return;
    const confirmed = window.confirm(
      "Auto-Optimize will replace your current draft with an AI-written version optimized against this brief. The optimization runs in the background — you can navigate away and come back. Continue?",
    );
    if (!confirmed) return;
    setOptimizeError(null);

    const baselineUpdatedAt = state.currentDraft?.updated_at ?? new Date().toISOString();
    const startedAt = Date.now();

    try {
      const res = await fetch(`/api/admin/content-editor/${editorId}/auto-optimize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || data.ok === false) {
        throw new Error(data.error ?? `Auto-Optimize request failed (HTTP ${res.status}).`);
      }
      setOptimizing(true);
      setOptimizeStartedAt(startedAt);
      setOptimizeBaselineUpdatedAt(baselineUpdatedAt);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          `content-editor-optimize-start:${editorId}`,
          String(startedAt),
        );
        window.sessionStorage.setItem(
          `content-editor-optimize-baseline:${editorId}`,
          baselineUpdatedAt,
        );
      }
    } catch (err) {
      setOptimizeError(err instanceof Error ? err.message : String(err));
      setOptimizing(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-neutral-500">
        <i className="ri-loader-4-line animate-spin mr-2" /> Loading editor…
      </div>
    );
  }

  if (!state) {
    return (
      <div className="mx-auto max-w-screen-md py-16 text-center">
        <i className="ri-error-warning-line text-4xl text-neutral-300" />
        <p className="mt-4 text-sm text-neutral-700">{error ?? "Editor not found."}</p>
        <Link
          href="/admin/content-editor"
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 text-[12px] font-semibold text-neutral-700 hover:border-neutral-400"
        >
          <i className="ri-arrow-left-line" /> Back to editors
        </Link>
      </div>
    );
  }

  const { editor, competitors, terms, questions, facts } = state;
  const processing = STATUS_IS_PROCESSING[editor.status];

  // Build a structural-targets display block from editor's recommended_* fields.
  const wordTarget = editor.recommended_word_count_target ??
    Math.round(((editor.recommended_word_count_min ?? 0) + (editor.recommended_word_count_max ?? 0)) / 2);

  return (
    <div>
      <AdminPageHeader
        title={editor.primary_keyword}
        subtitle={
          processing
            ? STATUS_LABELS[editor.status] + "…"
            : editor.status === "failed"
              ? "Pipeline failed — view error below"
              : isPageMode
                ? `Page Mode — scoring ${state.linkedPage!.route_path} against the live page.`
                : "Live-scored against the top-ranking competitors. Edits autosave."
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {isPageMode && state.currentDraft ? (
              <button
                type="button"
                onClick={() => void handleApplySeoMeta()}
                disabled={applyingSeoMeta || optimizing || processing}
                className="px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] bg-emerald-700 text-white hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                title="Apply the AI-recommended SEO title and meta description to the live page"
              >
                {applyingSeoMeta ? (
                  <><i className="ri-loader-4-line animate-spin" /> Applying…</>
                ) : (
                  <><i className="ri-check-line" /> Apply SEO Meta</>
                )}
              </button>
            ) : null}
            {/* Blog Mode: Auto-Optimize generates a full AI draft directly.
                Page Mode: handled by the AiOptimizeRunsPanel below, which fires
                a Cursor cloud agent to open a real PR against the page's tsx
                — preserves the brand design system. */}
            {!isPageMode ? (
              <button
                type="button"
                onClick={() => void handleAutoOptimize()}
                disabled={optimizing || processing}
                className="px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] bg-[#3d6f7f] text-white hover:bg-[#2f5a6b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                title="Generate a fully-optimized draft from this brief using AI"
              >
                {optimizing ? (
                  <><i className="ri-loader-4-line animate-spin" /> Optimizing…</>
                ) : (
                  <><i className="ri-magic-line" /> Auto-Optimize</>
                )}
              </button>
            ) : null}
            {isPageMode ? (
              <button
                type="button"
                onClick={() => void handleRescanLivePage()}
                disabled={livePageScanning || processing}
                className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                title="Re-fetch the live page and re-score against the brief"
              >
                {livePageScanning ? (
                  <><i className="ri-loader-4-line animate-spin" /> Scanning…</>
                ) : (
                  <><i className="ri-radar-line" /> Rescan</>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void rerun()}
                className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
              >
                <i className="ri-refresh-line mr-1" /> Re-run
              </button>
            )}
            <Link
              href="/admin/content-editor"
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
            >
              <i className="ri-arrow-left-line mr-1" /> Editors
            </Link>
          </div>
        }
      />

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 mx-auto max-w-screen-xl mb-4">
          <i className="ri-error-warning-line text-red-600 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-red-900">Re-run</p>
            <p className="mt-0.5 text-[11px] text-red-700 break-words">{error}</p>
          </div>
          <button type="button" onClick={() => clearError()} className="text-red-400 hover:text-red-600 text-sm shrink-0">
            <i className="ri-close-line" />
          </button>
        </div>
      ) : null}

      {optimizeError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <i className="ri-error-warning-line text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-red-900">Auto-Optimize failed</p>
            <p className="mt-0.5 text-[11px] text-red-700">{optimizeError}</p>
          </div>
          <button
            type="button"
            onClick={() => setOptimizeError(null)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            <i className="ri-close-line" />
          </button>
        </div>
      ) : null}

      {optimizing ? (
        <OptimizingBanner
          startedAt={optimizeStartedAt ?? Date.now()}
          onReset={resetOptimizingState}
        />
      ) : null}

      {applySeoMetaResult ? (
        <div
          className={`mb-4 rounded-2xl border p-4 flex items-start gap-3 ${
            applySeoMetaResult.ok
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <i
            className={`${
              applySeoMetaResult.ok ? "ri-check-double-line text-emerald-700" : "ri-error-warning-line text-red-600"
            } mt-0.5 text-sm`}
          />
          <p className={`flex-1 text-[12px] ${applySeoMetaResult.ok ? "text-emerald-900" : "text-red-900"}`}>
            {applySeoMetaResult.message}
          </p>
          <button
            type="button"
            onClick={() => setApplySeoMetaResult(null)}
            className={`${applySeoMetaResult.ok ? "text-emerald-400 hover:text-emerald-700" : "text-red-400 hover:text-red-600"} text-sm`}
          >
            <i className="ri-close-line" />
          </button>
        </div>
      ) : null}

      {isPageMode && state.linkedPage ? (
        <PageModeBanner
          routePath={state.linkedPage.route_path}
          snapshot={state.linkedPage.liveSnapshot}
          scanning={livePageScanning}
          scanError={livePageScanError}
          onClearError={() => setLivePageScanError(null)}
        />
      ) : null}

      {processing ? (
        <PipelineTimeline
          editorId={editor.id}
          status={editor.status}
          statusMessage={editor.status_message}
          fallbackStart={new Date(editor.created_at).getTime()}
          error={editor.error}
        />
      ) : editor.status === "failed" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-900">Pipeline failed.</p>
          <p className="mt-1 text-[12px] text-red-700 whitespace-pre-wrap">
            {editor.error ?? "Unknown error."}
          </p>
          <button
            type="button"
            onClick={() => void rerun()}
            className="mt-3 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white bg-red-700 hover:bg-red-800"
          >
            <i className="ri-refresh-line mr-1" /> Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_320px] gap-6">
          {/* LEFT: score, structure, competitors */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <ScoreRing score={score?.content_score ?? 0} label="Content" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Content score
                  </p>
                  <p className="mt-1 text-[13px] text-neutral-700">
                    Target: <span className="font-bold">{Math.round(editor.target_score ?? 0)}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    Competitor avg: {Math.round(editor.competitor_avg_score ?? 0)}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400">Coverage</p>
                  <p className="text-[14px] font-mono font-bold text-neutral-700">{Math.round(score?.coverage_score ?? 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400">Freq</p>
                  <p className="text-[14px] font-mono font-bold text-neutral-700">{Math.round(score?.frequency_score ?? 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400">Place</p>
                  <p className="text-[14px] font-mono font-bold text-neutral-700">{Math.round(score?.placement_score ?? 0)}</p>
                </div>
              </div>
            </div>

            {/* AI Search score */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                  AI Search readiness
                </p>
                <button
                  type="button"
                  onClick={() => setFactCoverageEnabled((v) => !v)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${factCoverageEnabled ? "bg-emerald-50 text-emerald-700" : "text-neutral-400 hover:bg-neutral-100"}`}
                  title="Enable embedding-based fact coverage (~$0.001 per score)"
                >
                  {factCoverageEnabled ? "Facts: ON" : "Facts: OFF"}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <ScoreRing
                  score={score?.ai_search_score ?? score?.citable_structure_score ?? 0}
                  label="AI"
                  size={64}
                />
                <div className="text-[11px] text-neutral-500 leading-relaxed">
                  {score?.question_coverage_score != null ? (
                    <p>Questions: <span className="font-mono font-bold">{Math.round(score.question_coverage_score)}</span></p>
                  ) : null}
                  {score?.citable_structure_score != null ? (
                    <p>Citable: <span className="font-mono font-bold">{Math.round(score.citable_structure_score)}</span></p>
                  ) : null}
                  {score?.fact_coverage_score != null ? (
                    <p>Facts: <span className="font-mono font-bold">{Math.round(score.fact_coverage_score)}</span></p>
                  ) : factCoverageEnabled ? (
                    <p className="text-neutral-300">Facts: scoring…</p>
                  ) : null}
                </div>
              </div>
            </div>

            {score?.structural_checks?.length ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <StructuralPanel
                  checks={score.structural_checks}
                  score={score.structural_alignment ?? 0}
                />
              </div>
            ) : null}

            {score?.eeat ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <EeatPanel eeat={score.eeat} />
              </div>
            ) : null}

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <CompetitorsPanel competitors={competitors} />
            </div>
          </aside>

          {/* CENTER: editor (or live page view in Page Mode) */}
          <section className="space-y-3">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {isPageMode ? "Live SEO title" : "Title tag"}
                  </label>
                  <input
                    type="text"
                    value={drafts.titleTag}
                    onChange={(e) => isPageMode ? undefined : setDrafts((d) => ({ ...d, titleTag: e.target.value }))}
                    readOnly={isPageMode}
                    placeholder={isPageMode ? "(no SEO title set on tracked page)" : "60-char SEO title…"}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${
                      isPageMode
                        ? "border-neutral-200 bg-neutral-50 text-neutral-600 cursor-default"
                        : "border-neutral-200 bg-white focus:border-[#3d6f7f]"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {isPageMode ? "Live H1" : "H1"}
                  </label>
                  <input
                    type="text"
                    value={drafts.h1Text}
                    onChange={(e) => isPageMode ? undefined : setDrafts((d) => ({ ...d, h1Text: e.target.value }))}
                    readOnly={isPageMode}
                    placeholder={isPageMode ? "(no H1 found on live page)" : "The visible page headline…"}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${
                      isPageMode
                        ? "border-neutral-200 bg-neutral-50 text-neutral-600 cursor-default"
                        : "border-neutral-200 bg-white focus:border-[#3d6f7f]"
                    }`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    {isPageMode ? "Live meta description" : "Meta description"}
                  </label>
                  <input
                    type="text"
                    value={drafts.metaDescription}
                    onChange={(e) => isPageMode ? undefined : setDrafts((d) => ({ ...d, metaDescription: e.target.value }))}
                    readOnly={isPageMode}
                    placeholder={isPageMode ? "(no meta description set on tracked page)" : "150-160 char description…"}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none ${
                      isPageMode
                        ? "border-neutral-200 bg-neutral-50 text-neutral-600 cursor-default"
                        : "border-neutral-200 bg-white focus:border-[#3d6f7f]"
                    }`}
                  />
                </div>
              </div>
              <div className="px-5 py-2.5 border-b border-neutral-100 flex items-center justify-between gap-3 text-[11px]">
                <p className="font-bold uppercase tracking-[0.12em] text-neutral-700">
                  {isPageMode ? "Live page content" : "Draft"}
                </p>
                <div className="flex items-center gap-3 text-neutral-400">
                  <span>Words: <span className="font-mono font-bold text-neutral-700">
                    {drafts.bodyMarkdown.trim() ? drafts.bodyMarkdown.trim().split(/\s+/).filter(Boolean).length : 0}
                  </span> / {wordTarget}</span>
                  {scoring ? <span><i className="ri-loader-4-line animate-spin" /> Scoring</span> : null}
                  {!isPageMode && (saving ? <span><i className="ri-loader-4-line animate-spin" /> Saving</span> : saved ? <span><i className="ri-cloud-line" /> Saved</span> : null)}
                </div>
              </div>
              {isPageMode ? (
                <div className="w-full min-h-[40vh] max-h-[70vh] overflow-y-auto px-6 py-5 text-[13px] leading-relaxed text-neutral-700 font-mono whitespace-pre-wrap bg-neutral-50/40">
                  {drafts.bodyMarkdown.trim() ? (
                    drafts.bodyMarkdown
                  ) : (
                    <p className="text-neutral-400 text-center italic mt-10">
                      {livePageScanning ? "Scanning live page…" : "No live page content yet — click Rescan to fetch."}
                    </p>
                  )}
                </div>
              ) : (
                <textarea
                  value={drafts.bodyMarkdown}
                  onChange={(e) => setDrafts((d) => ({ ...d, bodyMarkdown: e.target.value }))}
                  placeholder={`# ${editor.primary_keyword}

Start writing the opening paragraph that names the problem and previews the solution…

## First section heading

Body copy here. Use markdown — \`#\` headings, \`![alt](url)\` images, \`-\` bullets.`}
                  className="w-full min-h-[70vh] resize-y px-6 py-5 text-[14px] leading-relaxed text-neutral-800 placeholder-neutral-300 focus:outline-none font-mono"
                  spellCheck
                />
              )}
            </div>

            {/* AI Optimization PRs — Cursor cloud agent opens real PRs
                against the tracked page's tsx + brand design system. */}
            {isPageMode && editorId ? (
              <AiOptimizeRunsPanel
                runs={aiOptimizeRuns}
                triggering={triggeringAiRun}
                onTrigger={async (opts) => {
                  await triggerRun(opts);
                  await refetchAiRuns();
                }}
                onCancel={async (id) => {
                  await cancelRun(id);
                  await refetchAiRuns();
                }}
                cancellingId={cancellingId}
              />
            ) : null}

            {/* Placement checks */}
            {score?.placement_checks ? (
              <PlacementBar checks={score.placement_checks} />
            ) : null}
          </section>

          {/* RIGHT: terms, questions, facts */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                  Important terms
                  <span className="ml-1.5 text-neutral-300 normal-case font-normal tracking-normal">
                    ({terms.length})
                  </span>
                </p>
                <div className="flex items-center gap-1">
                  {(["all", "missing", "good", "over"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-colors cursor-pointer ${
                        filter === f
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <TermsList terms={terms} termUsage={score?.term_usage ?? []} filter={filter} />
            </div>

            {questions.length > 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <QuestionsPanel
                  questions={questions.filter((q) => !q.user_dismissed)}
                  score={score?.question_coverage_score}
                />
              </div>
            ) : null}

            {facts.length > 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <FactsPanel facts={facts.filter((f) => !f.user_dismissed)} />
              </div>
            ) : null}
          </aside>
        </div>
      )}

      {/* Hidden helper to keep refresh fn referenced (used by polling in hook) */}
      <button type="button" onClick={() => void refresh()} className="hidden">refresh</button>
    </div>
  );
}

function PlacementBar({ checks }: { checks: ScoreBreakdown["placement_checks"] }) {
  const items: Array<{ key: keyof ScoreBreakdown["placement_checks"]; label: string }> = [
    { key: "primary_kw_in_title", label: "Title" },
    { key: "primary_kw_in_h1", label: "H1" },
    { key: "primary_kw_in_meta", label: "Meta" },
    { key: "primary_kw_in_first_100", label: "First 100" },
    { key: "primary_kw_in_early_heading", label: "Early H2/H3" },
  ];
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm flex items-center gap-3 flex-wrap">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
        Primary keyword placement
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {items.map((it) => {
          const ok = checks[it.key];
          return (
            <span
              key={it.key}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${
                ok ? "bg-emerald-50 text-emerald-700" : "bg-neutral-50 text-neutral-400"
              }`}
            >
              <i className={ok ? "ri-checkbox-circle-fill" : "ri-circle-line"} />
              {it.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
