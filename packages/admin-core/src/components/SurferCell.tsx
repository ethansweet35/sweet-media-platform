"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSurferActions } from "../hooks/useSurferActions";
import {
  surferEditorUrl,
  type SurferAuditState,
  type SurferRowFields,
  type SurferRowRef,
} from "../types/surfer";

export interface SurferCellRow extends SurferRowFields {
  /** UUID of the underlying row in blog_posts or tracked_pages. */
  id: string;
  /** Used in error messages. */
  primary_keyword: string | null;
}

interface SurferCellProps {
  row: SurferCellRow;
  kind: SurferRowRef["kind"];
  /** Called after a successful Surfer mutation so the parent can refetch. */
  onChange?: () => void | Promise<void>;
  /** Compact mode hides labels, used inside dense table cells. */
  compact?: boolean;
}

function scoreBadgeClass(score: number | null | undefined): string {
  if (score == null) return "bg-neutral-100 text-neutral-400 border-neutral-200";
  if (score >= 70) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 50) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
}

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

/**
 * Renders the Surfer SEO column for a blog or tracked-page row:
 *   - Live content score badge
 *   - "Linked"/"Create editor" indicator + button
 *   - "Applied" checkbox the writer ticks when they've optimized the content
 *   - Refresh + Open-in-Surfer actions
 */
export default function SurferCell({ row, kind, onChange, compact = false }: SurferCellProps) {
  const ref: SurferRowRef = { kind, id: row.id };
  const {
    states,
    kickAudit,
    pollAudit,
    createContentEditor,
    setGuidanceApplied,
  } = useSurferActions();
  const rowKey = `${kind}:${row.id}`;
  const action = states[rowKey];

  const auditState: SurferAuditState | null = row.surfer_audit_state ?? null;
  const isScheduled = auditState === "scheduled";
  const hasEditor = !!row.surfer_content_editor_id;
  const score = row.surfer_content_score;

  const [optimisticApplied, setOptimisticApplied] = useState<boolean | null>(null);
  const applied =
    optimisticApplied !== null ? optimisticApplied : row.surfer_guidance_applied;

  // ── Auto-poll while audit is scheduled ────────────────────────────────────
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
      if (r.completed) {
        await onChange?.();
        return;
      }
      if (attempts >= 24) return;
      pollTimerRef.current = setTimeout(tick, 30_000);
    };
    pollTimerRef.current = setTimeout(tick, 8_000);
    return () => {
      cancelled = true;
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
    // We intentionally only react to audit changes for this row.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScheduled, row.surfer_audit_id]);

  const handleRefresh = useCallback(async () => {
    const result = await kickAudit(ref);
    if (result?.ok) {
      await onChange?.();
    }
  }, [kickAudit, onChange, ref]);

  const handleCreateEditor = useCallback(async () => {
    if (!row.primary_keyword?.trim()) return;
    const r = await createContentEditor(ref);
    if (r?.ok) {
      await onChange?.();
    }
  }, [createContentEditor, onChange, ref, row.primary_keyword]);

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

  const noKeyword = !row.primary_keyword?.trim();
  const statusTitle =
    auditState === "error" && row.surfer_last_error
      ? `Last audit error: ${row.surfer_last_error}`
      : `Score: ${score ?? "—"} · Updated ${relativeAge(row.surfer_score_updated_at)}`;

  return (
    <div className={`flex items-center gap-2 ${compact ? "" : "min-w-[260px]"}`}>
      {/* Score badge */}
      <div
        title={statusTitle}
        className={`inline-flex items-center justify-center min-w-[42px] h-7 px-2 rounded-lg border text-[12px] font-bold tracking-tight ${scoreBadgeClass(score)}`}
      >
        {isScheduled ? (
          <i className="ri-loader-4-line animate-spin text-sm" />
        ) : score != null ? (
          score
        ) : (
          "—"
        )}
      </div>

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

      {/* Applied checkbox — only meaningful once an editor exists */}
      <label
        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
          hasEditor ? "text-neutral-600 cursor-pointer" : "text-neutral-300 cursor-not-allowed"
        }`}
        title={
          hasEditor
            ? "Mark when this page has been rewritten using the Surfer Content Editor's recommendations"
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

      {/* Inline error tag */}
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
