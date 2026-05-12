"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useSeoBriefRowActions } from "../hooks/useSeoBriefRowActions";
import {
  computeContentScore,
  type SeoBriefRow,
  type SeoBriefRowFields,
  type SeoBriefRowRef,
} from "../types/seo-brief";

export interface SweetSeoCellRow extends SeoBriefRowFields {
  id: string;
  primary_keyword: string | null;
}

interface SweetSeoCellProps {
  row: SweetSeoCellRow;
  kind: SeoBriefRowRef["kind"];
  onChange?: () => void | Promise<void>;
  compact?: boolean;
}

/* ─────────────────────────── Score ring ─────────────────────────── */

const R = 14;
const CX = 18;
const CY = 18;
const CIRC = 2 * Math.PI * R;

function scoreColor(score: number | null): string {
  if (score == null) return "#d1d5db";
  if (score >= 75) return "#10b981";
  if (score >= 50) return "#f59e0b";
  if (score > 0) return "#f97316";
  return "#ef4444";
}

function CircleRing({ score, spinning }: { score: number | null; spinning?: boolean }) {
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
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e5e7eb" strokeWidth="3" />
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

/* ───────────────────────── Helpers ───────────────────────── */

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

/* ───────────────────────── Main cell ───────────────────────── */

export default function SweetSeoCell({ row, kind, onChange, compact = false }: SweetSeoCellProps) {
  const ref: SeoBriefRowRef = { kind, id: row.id };
  const { states, createBriefForRow, refreshBrief, setGuidanceApplied } = useSeoBriefRowActions();
  const rowKey = `${kind}:${row.id}`;
  const action = states[rowKey];

  const [brief, setBrief] = useState<SeoBriefRow | null>(null);
  const [briefLoading, setBriefLoading] = useState(false);
  const [optimisticApplied, setOptimisticApplied] = useState<boolean | null>(null);

  const briefId = row.seo_brief_id;
  const hasBrief = !!briefId;
  const isProcessing = brief?.status === "processing" || action?.status === "loading";

  // Hydrate the joined brief whenever the row's brief id changes.
  const lastFetchedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!briefId) {
      setBrief(null);
      lastFetchedRef.current = null;
      return;
    }
    if (lastFetchedRef.current === briefId) return;
    lastFetchedRef.current = briefId;
    setBriefLoading(true);
    void (async () => {
      const { data } = await supabase
        .from("seo_briefs")
        .select("*")
        .eq("id", briefId)
        .maybeSingle();
      setBrief((data as SeoBriefRow | null) ?? null);
      setBriefLoading(false);
    })();
  }, [briefId]);

  // Poll while processing.
  useEffect(() => {
    if (!briefId || brief?.status !== "processing") return;
    const t = setInterval(async () => {
      const { data } = await supabase
        .from("seo_briefs")
        .select("*")
        .eq("id", briefId)
        .maybeSingle();
      setBrief((data as SeoBriefRow | null) ?? null);
      if ((data as SeoBriefRow | null)?.status !== "processing") {
        await onChange?.();
      }
    }, 5000);
    return () => clearInterval(t);
  }, [briefId, brief?.status, onChange]);

  const score =
    brief && brief.status === "ready"
      ? computeContentScore(brief.draft_content ?? "", brief.content_structure, brief.important_terms).score
      : null;

  const applied = optimisticApplied !== null ? optimisticApplied : row.seo_guidance_applied;

  const noKeyword = !row.primary_keyword?.trim();
  const statusTitle = hasBrief
    ? `Score: ${score ?? "—"} · Updated ${relativeAge(brief?.updated_at ?? null)}`
    : noKeyword
      ? "Set a primary keyword to generate a Sweet SEO brief"
      : "Generate a Sweet SEO content brief for this keyword";

  const handleCreate = useCallback(async () => {
    if (!row.primary_keyword?.trim()) return;
    await createBriefForRow(ref, row.primary_keyword);
    await onChange?.();
  }, [createBriefForRow, onChange, ref, row.primary_keyword]);

  const handleRefresh = useCallback(async () => {
    if (!briefId) return;
    await refreshBrief(ref, briefId);
    await onChange?.();
  }, [briefId, onChange, refreshBrief, ref]);

  const handleToggleApplied = useCallback(
    async (next: boolean) => {
      setOptimisticApplied(next);
      const ok = await setGuidanceApplied(ref, next);
      if (!ok) {
        setOptimisticApplied(!next);
        return;
      }
      setOptimisticApplied(null);
      await onChange?.();
    },
    [onChange, ref, setGuidanceApplied],
  );

  return (
    <div className={`relative flex items-center gap-2 ${compact ? "" : "min-w-[280px]"}`}>
      {/* Score ring (links to brief if we have one) */}
      {hasBrief && briefId ? (
        <Link
          href={`/admin/sweet-seo/${briefId}`}
          title={statusTitle}
          className="cursor-pointer"
        >
          <CircleRing score={score} spinning={isProcessing || briefLoading} />
        </Link>
      ) : (
        <div title={statusTitle}>
          <CircleRing score={null} spinning={false} />
        </div>
      )}

      {/* Linked vs Create */}
      {hasBrief && briefId ? (
        <Link
          href={`/admin/sweet-seo/${briefId}`}
          title="Open Sweet SEO brief"
          className="inline-flex items-center gap-1 px-2 h-7 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-emerald-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-sparkling-2-fill text-xs" />
          {brief?.status === "processing" ? "Researching" : brief?.status === "error" ? "Errored" : "Linked"}
        </Link>
      ) : (
        <button
          type="button"
          disabled={noKeyword || action?.status === "loading"}
          onClick={() => void handleCreate()}
          title={
            noKeyword
              ? "Set a primary keyword to create a Sweet SEO brief"
              : "Create Sweet SEO content brief"
          }
          className={`inline-flex items-center gap-1 px-2 h-7 rounded-lg border text-[10px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
            noKeyword
              ? "bg-neutral-50 border-neutral-200 text-neutral-300 cursor-not-allowed"
              : action?.status === "loading"
                ? "bg-[#3d6f7f]/10 border-[#3d6f7f]/30 text-[#3d6f7f] cursor-wait"
                : "bg-white border-[#3d6f7f]/30 text-[#3d6f7f] hover:bg-[#3d6f7f]/8 cursor-pointer"
          }`}
        >
          {action?.status === "loading" ? (
            <i className="ri-loader-4-line animate-spin text-xs" />
          ) : (
            <i className="ri-sparkling-2-line text-xs" />
          )}
          Brief
        </button>
      )}

      {/* Applied checkbox */}
      <label
        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
          hasBrief ? "text-neutral-600 cursor-pointer" : "text-neutral-300 cursor-not-allowed"
        }`}
        title={
          hasBrief
            ? "Mark when this row's content has been rewritten using the Sweet SEO brief"
            : "Available once a Sweet SEO brief is linked"
        }
      >
        <input
          type="checkbox"
          checked={applied === true}
          disabled={!hasBrief}
          onChange={(e) => void handleToggleApplied(e.target.checked)}
          className="w-3.5 h-3.5 rounded border-neutral-300 accent-emerald-600 cursor-pointer disabled:cursor-not-allowed"
        />
        Applied
      </label>

      {/* Refresh */}
      <button
        type="button"
        onClick={() => void handleRefresh()}
        disabled={!hasBrief || isProcessing}
        title={
          !hasBrief
            ? "Create a brief first"
            : isProcessing
              ? "Brief is still researching"
              : "Refresh score from latest brief draft"
        }
        className={`w-7 h-7 inline-flex items-center justify-center rounded-lg border transition-all ${
          !hasBrief || isProcessing
            ? "border-neutral-200 text-neutral-300 cursor-not-allowed"
            : "border-neutral-200 text-neutral-500 hover:text-[#3d6f7f] hover:bg-[#3d6f7f]/6 cursor-pointer"
        }`}
      >
        <i
          className={`text-sm ${
            isProcessing || action?.status === "loading" ? "ri-loader-4-line animate-spin" : "ri-refresh-line"
          }`}
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
      {!action && brief?.status === "error" && brief.error_message && (
        <span
          title={brief.error_message}
          className="inline-flex max-w-[180px] items-center gap-1 px-1.5 h-6 rounded-md bg-red-50 text-red-600 text-[10px] truncate"
        >
          <i className="ri-error-warning-line text-xs flex-shrink-0" />
          {brief.error_message.length > 36 ? brief.error_message.slice(0, 36) + "…" : brief.error_message}
        </span>
      )}
    </div>
  );
}
