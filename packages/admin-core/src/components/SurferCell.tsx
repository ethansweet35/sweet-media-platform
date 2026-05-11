"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSurferActions } from "../hooks/useSurferActions";
import {
  surferEditorUrl,
  type AuditDetails,
  type SurferAuditState,
  type SurferRowFields,
  type SurferRowRef,
} from "../types/surfer";

export interface SurferCellRow extends SurferRowFields {
  id: string;
  primary_keyword: string | null;
}

interface SurferCellProps {
  row: SurferCellRow;
  kind: SurferRowRef["kind"];
  onChange?: () => void | Promise<void>;
  compact?: boolean;
}

// ── Circular score ring ────────────────────────────────────────────────────

const R = 14;
const CX = 18;
const CY = 18;
const CIRC = 2 * Math.PI * R; // ~87.96

function scoreColor(score: number | null): string {
  if (score == null) return "#d1d5db";
  if (score >= 70) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

function CircleRing({
  score,
  spinning,
}: {
  score: number | null;
  spinning?: boolean;
}) {
  const pct = score != null ? Math.min(100, Math.max(0, score)) / 100 : 0;
  const offset = CIRC * (1 - pct);
  const color = scoreColor(score);

  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      className={spinning ? "animate-spin" : ""}
      style={{ flexShrink: 0 }}
    >
      {/* Track */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e5e7eb" strokeWidth="3" />
      {/* Progress arc */}
      {score != null && (
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${CX} ${CY})`}
          style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.4s ease" }}
        />
      )}
      {/* Center label */}
      <text
        x={CX}
        y={CY + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="9"
        fontWeight="700"
        fill={spinning ? "#9ca3af" : color}
      >
        {spinning ? "…" : score != null ? score : "—"}
      </text>
    </svg>
  );
}

// ── "See Why" details popover ──────────────────────────────────────────────

function DetailsPopover({
  details,
  loading,
  onClose,
}: {
  details: AuditDetails | null;
  loading: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg"
    >
      {loading && (
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <i className="ri-loader-4-line animate-spin" />
          Loading audit details…
        </div>
      )}
      {!loading && !details && (
        <p className="text-xs text-neutral-400">Could not load audit details.</p>
      )}
      {!loading && details && (
        <>
          {/* Score comparison */}
          <div className="mb-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-neutral-50 p-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                Your Score
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: scoreColor(details.audited_score) }}
              >
                {details.audited_score ?? "—"}
              </p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                Comp. Avg
              </p>
              <p
                className="text-xl font-bold"
                style={{ color: scoreColor(details.competitor_avg) }}
              >
                {details.competitor_avg ?? "—"}
              </p>
            </div>
          </div>

          {/* Gap indicator */}
          {details.audited_score != null && details.competitor_avg != null && (
            <p className="mb-3 text-[11px] leading-snug text-neutral-500">
              {details.audited_score >= details.competitor_avg ? (
                <span className="font-semibold text-emerald-600">
                  +{details.audited_score - details.competitor_avg} pts above avg
                </span>
              ) : (
                <>
                  <span className="font-semibold text-red-500">
                    {details.competitor_avg - details.audited_score} pts below avg
                  </span>
                  {" — optimize with a Content Editor to close the gap."}
                </>
              )}
            </p>
          )}

          {/* Competitor list */}
          {details.competitors.length > 0 && (
            <div className="mb-3">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                Top Competitors
              </p>
              <ul className="space-y-1">
                {details.competitors.slice(0, 5).map((c, i) => (
                  <li key={i} className="flex items-center justify-between gap-2">
                    <span
                      className="truncate text-[11px] text-neutral-500"
                      title={c.url}
                    >
                      {new URL(c.url).hostname.replace(/^www\./, "")}
                    </span>
                    <span
                      className="shrink-0 text-[11px] font-bold"
                      style={{ color: scoreColor(c.content_score) }}
                    >
                      {c.content_score ?? "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href={details.surfer_url}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-[#3d6f7f]/30 bg-[#3d6f7f]/5 py-1.5 text-[11px] font-semibold text-[#3d6f7f] transition hover:bg-[#3d6f7f]/10"
          >
            <i className="ri-external-link-line text-xs" />
            View full audit in Surfer
          </a>
        </>
      )}
    </div>
  );
}

// ── Main cell ──────────────────────────────────────────────────────────────

function relativeAge(iso: string | null): string {
  if (!iso) return "never";
  const ms = Date.now() - Date.parse(iso);
  if (Number.isNaN(ms)) return "never";
  const mins = Math.round(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.round(days / 30)}mo ago`;
}

export default function SurferCell({ row, kind, onChange, compact = false }: SurferCellProps) {
  const ref: SurferRowRef = { kind, id: row.id };
  const {
    states,
    kickAudit,
    pollAudit,
    createContentEditor,
    setGuidanceApplied,
    fetchAuditDetails,
  } = useSurferActions();
  const rowKey = `${kind}:${row.id}`;
  const action = states[rowKey];

  const auditState: SurferAuditState | null = row.surfer_audit_state ?? null;
  const isScheduled = auditState === "scheduled";
  const hasEditor = !!row.surfer_content_editor_id;
  const score = row.surfer_content_score;
  const hasScore = score != null;

  const [optimisticApplied, setOptimisticApplied] = useState<boolean | null>(null);
  const applied = optimisticApplied !== null ? optimisticApplied : row.surfer_guidance_applied;

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState<AuditDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // ── Auto-poll while scheduled ────────────────────────────────────────────
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!isScheduled || !row.surfer_audit_id) return;
    let cancelled = false;
    let attempts = 0;
    const tick = async () => {
      attempts++;
      const r = await pollAudit(ref);
      if (cancelled) return;
      if (!r) return;
      if (r.completed) { await onChange?.(); return; }
      if (attempts >= 24) return;
      pollTimerRef.current = setTimeout(tick, 30_000);
    };
    pollTimerRef.current = setTimeout(tick, 8_000);
    return () => {
      cancelled = true;
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScheduled, row.surfer_audit_id]);

  const handleRefresh = useCallback(async () => {
    const result = await kickAudit(ref);
    if (result?.ok) await onChange?.();
  }, [kickAudit, onChange, ref]);

  const handleCreateEditor = useCallback(async () => {
    if (!row.primary_keyword?.trim()) return;
    const r = await createContentEditor(ref);
    if (r?.ok) await onChange?.();
  }, [createContentEditor, onChange, ref, row.primary_keyword]);

  const handleToggleApplied = useCallback(async (next: boolean) => {
    setOptimisticApplied(next);
    const ok = await setGuidanceApplied(ref, next);
    if (!ok) { setOptimisticApplied(!next); return; }
    setOptimisticApplied(null);
    await onChange?.();
  }, [onChange, ref, setGuidanceApplied]);

  const handleShowDetails = useCallback(async () => {
    if (showDetails) { setShowDetails(false); return; }
    setShowDetails(true);
    if (!details) {
      setDetailsLoading(true);
      const d = await fetchAuditDetails(ref);
      setDetails(d);
      setDetailsLoading(false);
    }
  }, [details, fetchAuditDetails, ref, showDetails]);

  const noKeyword = !row.primary_keyword?.trim();
  const statusTitle =
    auditState === "error" && row.surfer_last_error
      ? `Last audit error: ${row.surfer_last_error}`
      : `Score: ${score ?? "—"} · Updated ${relativeAge(row.surfer_score_updated_at)}`;

  return (
    <div className={`relative flex items-center gap-2 ${compact ? "" : "min-w-[280px]"}`}>
      {/* Circular score ring — click to open details if score exists */}
      <div
        className={hasScore ? "cursor-pointer" : ""}
        title={hasScore ? "Click to see audit details" : statusTitle}
        onClick={hasScore ? () => void handleShowDetails() : undefined}
      >
        <CircleRing score={score} spinning={isScheduled || action?.status === "loading"} />
      </div>

      {/* Details popover */}
      {showDetails && (
        <DetailsPopover
          details={details}
          loading={detailsLoading}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* Linked vs No editor */}
      {hasEditor ? (
        <a
          href={surferEditorUrl(row.surfer_content_editor_id ?? "")}
          target="_blank"
          rel="noreferrer noopener"
          title="Open in Surfer SEO Content Editor"
          className="inline-flex items-center gap-1 px-2 h-7 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-emerald-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-checkbox-circle-fill text-xs" />
          Linked
        </a>
      ) : (
        <button
          type="button"
          disabled={noKeyword || action?.status === "loading"}
          onClick={() => void handleCreateEditor()}
          title={noKeyword ? "Set a primary keyword to create a Content Editor" : "Create Surfer Content Editor"}
          className={`inline-flex items-center gap-1 px-2 h-7 rounded-lg border text-[10px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
            noKeyword
              ? "bg-neutral-50 border-neutral-200 text-neutral-300 cursor-not-allowed"
              : action?.status === "loading"
                ? "bg-violet-50 border-violet-200 text-violet-500 cursor-wait"
                : "bg-white border-violet-200 text-violet-600 hover:bg-violet-50 cursor-pointer"
          }`}
        >
          {action?.status === "loading" ? (
            <i className="ri-loader-4-line animate-spin text-xs" />
          ) : (
            <i className="ri-add-line text-xs" />
          )}
          Editor
        </button>
      )}

      {/* Applied */}
      <label
        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
          hasEditor ? "text-neutral-600 cursor-pointer" : "text-neutral-300 cursor-not-allowed"
        }`}
        title={
          hasEditor
            ? "Mark when this page has been rewritten using Surfer Content Editor recommendations"
            : "Available once a Surfer Content Editor is linked"
        }
      >
        <input
          type="checkbox"
          checked={applied === true}
          disabled={!hasEditor}
          onChange={(e) => void handleToggleApplied(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-neutral-300 accent-emerald-600 cursor-pointer disabled:cursor-not-allowed"
        />
        Applied
      </label>

      {/* Refresh */}
      <button
        type="button"
        onClick={() => void handleRefresh()}
        disabled={isScheduled || noKeyword || action?.status === "loading"}
        title={
          noKeyword
            ? "Set a primary keyword to run a Surfer audit"
            : isScheduled
              ? "Audit in progress — re-checking every 30s"
              : "Re-run Surfer audit (1 credit)"
        }
        className={`w-7 h-7 inline-flex items-center justify-center rounded-lg border transition-all ${
          isScheduled || noKeyword
            ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
            : "border-neutral-200 text-neutral-500 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/6 cursor-pointer"
        }`}
      >
        <i
          className={`text-sm ${isScheduled || action?.status === "loading" ? "ri-loader-4-line animate-spin" : "ri-refresh-line"}`}
        />
      </button>

      {/* Inline error */}
      {action?.status === "error" && action.error && (
        <span
          title={action.error}
          className="inline-flex max-w-[180px] items-center gap-1 px-1.5 h-6 rounded-md bg-red-50 text-red-600 text-[10px] truncate"
        >
          <i className="ri-error-warning-line text-xs flex-shrink-0" />
          {action.error.length > 36 ? action.error.slice(0, 36) + "…" : action.error}
        </span>
      )}
    </div>
  );
}
