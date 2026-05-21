"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import {
  useContentEditorRowActions,
  type ContentEditorRowRef,
} from "../hooks/useContentEditorRowActions";
import {
  computeBlogEditorSyncStatus,
  BLOG_SYNC_STATUS_LABEL,
  type BlogEditorSyncStatus,
} from "../lib/contentEditorSyncStatus";
import {
  STATUS_IS_PROCESSING,
  STATUS_LABELS,
  type ContentEditorStatus,
} from "../types/content-editor";
import ContentEditorBriefModePicker, {
  type ContentEditorAnalysisModeChoice,
} from "./content-editor/ContentEditorBriefModePicker";

/**
 * The minimum row shape this cell needs. Both blog_posts and tracked_pages
 * supply these fields after the 2026-05-12 link migration.
 */
export interface ContentEditorCellRow {
  id: string;
  primary_keyword: string | null;
  content_editor_id: string | null;
  /** Blog posts only — when the post last received the editor draft. */
  content_editor_synced_at?: string | null;
}

interface ContentEditorCellProps {
  row: ContentEditorCellRow;
  kind: ContentEditorRowRef["kind"];
  onChange?: () => void | Promise<void>;
  compact?: boolean;
}

/* ─── Score ring ─────────────────────────────────────────────────────── */
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
        {spinning ? "…" : score != null ? Math.round(score) : "—"}
      </text>
    </svg>
  );
}

/* ─── Joined editor shape (just what the cell needs) ─────────────────── */

interface JoinedEditor {
  id: string;
  status: ContentEditorStatus;
  status_message: string | null;
  error: string | null;
  target_score: number | null;
  competitor_avg_score: number | null;
  updated_at: string;
  current_content_score: number | null;
  /** When set, this editor is in Page Mode (linked to tracked_pages.id). */
  linked_tracked_page_id: string | null;
  /** Live-page score for the linked tracked page (Page Mode only). */
  live_page_score: number | null;
  live_page_fetched_at: string | null;
  current_draft_updated_at: string | null;
  current_draft_has_body: boolean;
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

/* ─── Main cell ──────────────────────────────────────────────────────── */

export default function ContentEditorCell({
  row,
  kind,
  onChange,
  compact = false,
}: ContentEditorCellProps) {
  const ref: ContentEditorRowRef = { kind, id: row.id };
  const { states, createEditorForRow } = useContentEditorRowActions();
  const rowKey = `${kind}:${row.id}`;
  const action = states[rowKey];

  const [editor, setEditor] = useState<JoinedEditor | null>(null);
  const [editorLoading, setEditorLoading] = useState(false);
  const [briefPickerOpen, setBriefPickerOpen] = useState(false);
  const [briefSubmitting, setBriefSubmitting] =
    useState<ContentEditorAnalysisModeChoice | null>(null);

  const editorId = row.content_editor_id;
  const hasEditor = !!editorId;
  const editorProcessing = editor ? STATUS_IS_PROCESSING[editor.status] : false;
  const isProcessing = editorProcessing || action?.status === "loading";

  const fetchJoinedEditor = useCallback(async (targetId: string): Promise<JoinedEditor | null> => {
    setEditorLoading(true);
    try {
      const { data } = await supabase
        .from("content_editors")
        .select(
          "id, status, status_message, error, target_score, competitor_avg_score, updated_at, linked_tracked_page_id, content_editor_drafts(computed_content_score, body_markdown, updated_at, is_current)",
        )
        .eq("id", targetId)
        .maybeSingle();
      let result: JoinedEditor | null = null;
      if (data) {
        const raw = data as Record<string, unknown>;
        const drafts = Array.isArray(raw.content_editor_drafts) ? raw.content_editor_drafts : [];
        const cur = drafts.find((d: Record<string, unknown>) => d.is_current) as
          | Record<string, unknown>
          | undefined;
        const current_content_score =
          (cur?.computed_content_score as number | null | undefined) ?? null;
        const draftMd = typeof cur?.body_markdown === "string" ? cur.body_markdown : "";
        const current_draft_has_body = draftMd.trim().length > 0;
        const current_draft_updated_at =
          typeof cur?.updated_at === "string" ? cur.updated_at : null;
        const linked_tracked_page_id = (raw.linked_tracked_page_id as string | null) ?? null;

        // Page Mode: pull the most recent live-page snapshot for this editor.
        let live_page_score: number | null = null;
        let live_page_fetched_at: string | null = null;
        if (linked_tracked_page_id) {
          const { data: snap } = await supabase
            .from("tracked_page_live_snapshots")
            .select("computed_content_score, fetched_at")
            .eq("tracked_page_id", linked_tracked_page_id)
            .eq("scored_against_editor_id", targetId)
            .order("fetched_at", { ascending: false })
            .limit(1)
            .maybeSingle();
          if (snap) {
            live_page_score = (snap as { computed_content_score: number | null }).computed_content_score ?? null;
            live_page_fetched_at = (snap as { fetched_at: string | null }).fetched_at ?? null;
          }
        }

        const { content_editor_drafts: _d, ...rest } = raw;
        result = {
          ...rest,
          current_content_score,
          live_page_score,
          live_page_fetched_at,
          current_draft_updated_at,
          current_draft_has_body,
        } as JoinedEditor;
        setEditor(result);
      } else {
        setEditor(null);
      }
      return result;
    } finally {
      setEditorLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!editorId) {
      setEditor(null);
      return;
    }
    void fetchJoinedEditor(editorId);
  }, [editorId, fetchJoinedEditor]);

  useEffect(() => {
    if (!editorId || !editor || !STATUS_IS_PROCESSING[editor.status]) return;
    const t = setInterval(() => {
      void (async () => {
        const next = await fetchJoinedEditor(editorId);
        if (next && !STATUS_IS_PROCESSING[next.status]) {
          await onChange?.();
        }
      })();
    }, 5000);
    return () => clearInterval(t);
  }, [editorId, editor?.status, fetchJoinedEditor, editor, onChange]);

  const noKeyword = !row.primary_keyword?.trim();
  const isPageMode = !!editor?.linked_tracked_page_id;
  // In Page Mode the ring shows the LIVE page score; in Blog Mode it
  // shows the current draft's score (both fall back to target).
  const currentScore = isPageMode
    ? (editor?.live_page_score ?? null)
    : (editor?.current_content_score ?? null);
  const targetScore = editor?.target_score ?? null;
  const displayScore = currentScore ?? targetScore;

  const liveScanAge = isPageMode ? relativeAge(editor?.live_page_fetched_at ?? null) : null;

  const blogSyncStatus: BlogEditorSyncStatus =
    kind === "blog"
      ? computeBlogEditorSyncStatus({
          hasEditor: hasEditor && !!editor,
          hasDraftBody: editor?.current_draft_has_body ?? false,
          draftUpdatedAt: editor?.current_draft_updated_at,
          syncedAt: row.content_editor_synced_at,
        })
      : "none";

  const statusTitle = hasEditor && editor
    ? isPageMode
      ? `Live page: ${currentScore != null ? Math.round(currentScore) : "—"} / Target: ${targetScore != null ? Math.round(targetScore) : "—"} · Last scan ${liveScanAge ?? "never"} · ${STATUS_LABELS[editor.status]}`
      : `Score: ${currentScore != null ? Math.round(currentScore) : "—"} / Target: ${targetScore != null ? Math.round(targetScore) : "—"} · ${STATUS_LABELS[editor.status]} · Updated ${relativeAge(editor.updated_at)}`
    : noKeyword
      ? "Set a primary keyword to generate a content editor"
      : "Generate a Content Editor brief for this keyword";

  const handleBriefModeSelect = useCallback(
    async (mode: ContentEditorAnalysisModeChoice) => {
      const kw = row.primary_keyword?.trim();
      if (!kw) return;
      setBriefSubmitting(mode);
      const result = await createEditorForRow(ref, kw, mode);
      setBriefSubmitting(null);
      if (result) {
        setBriefPickerOpen(false);
        await onChange?.();
      }
    },
    [createEditorForRow, onChange, ref, row.primary_keyword],
  );

  const handleRerun = useCallback(async () => {
    if (!editorId) return;
    // Page Mode: clicking refresh re-scans the live page instead of rerunning the pipeline.
    if (editor?.linked_tracked_page_id) {
      const res = await fetch(`/api/admin/tracked-pages/${editor.linked_tracked_page_id}/scan-live`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editorId, force: true }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        console.warn("[ContentEditorCell] live-scan failed:", j.error ?? res.status);
        return;
      }
      // Wait a moment for the snapshot to land, then refresh.
      setTimeout(() => {
        void (async () => {
          await fetchJoinedEditor(editorId);
          await onChange?.();
        })();
      }, 8000);
      return;
    }
    const forceRebuild = editor?.status === "ready";
    const res = await fetch(`/api/admin/content-editor/${editorId}/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ force: forceRebuild }),
    });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      console.warn("[ContentEditorCell] re-run failed:", j.error ?? res.status);
      return;
    }
    await fetchJoinedEditor(editorId);
    await onChange?.();
  }, [editorId, editor?.status, editor?.linked_tracked_page_id, onChange, fetchJoinedEditor]);

  const openBriefPicker = useCallback(() => {
    if (noKeyword || action?.status === "loading" || briefSubmitting != null) return;
    // Defer one frame so the opening click cannot hit a newly mounted button (Analyze).
    window.requestAnimationFrame(() => setBriefPickerOpen(true));
  }, [noKeyword, action?.status, briefSubmitting]);

  return (
    <div className={`relative flex items-center gap-2 ${compact ? "" : "min-w-[240px]"}`}>
      {/* Score ring */}
      {hasEditor && editorId ? (
        <Link
          href={`/admin/content-editor/${editorId}`}
          title={statusTitle}
          className="cursor-pointer"
        >
          <CircleRing score={displayScore} spinning={isProcessing || editorLoading} />
        </Link>
      ) : (
        <div title={statusTitle}>
          <CircleRing score={null} spinning={false} />
        </div>
      )}

      {/* Linked vs Create */}
      {hasEditor && editorId ? (
        <Link
          href={`/admin/content-editor/${editorId}`}
          title="Open Content Editor"
          className={`inline-flex items-center gap-1 px-2 h-7 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] transition-colors cursor-pointer whitespace-nowrap ${
            editor?.status === "failed"
              ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              : editorProcessing
                ? "border border-amber-200 bg-amber-50 text-amber-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          }`}
        >
          {editorProcessing ? (
            <i className="ri-loader-4-line animate-spin text-xs" />
          ) : editor?.status === "failed" ? (
            <i className="ri-error-warning-line text-xs" />
          ) : (
            <i className="ri-sparkling-2-fill text-xs" />
          )}
          {editor ? STATUS_LABELS[editor.status] : "Linked"}
        </Link>
      ) : (
        <button
          type="button"
          disabled={noKeyword || action?.status === "loading" || briefSubmitting != null}
          onClick={(e) => {
            e.stopPropagation();
            openBriefPicker();
          }}
          title={
            noKeyword
              ? "Set a primary keyword to create a Content Editor"
              : "Create Content Editor brief (choose Analyze or Deep analyze)"
          }
          className={`inline-flex items-center gap-1 px-2 h-7 rounded-lg border text-[10px] font-bold uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
            noKeyword
              ? "bg-[#F4F7FB] border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed"
              : action?.status === "loading"
                ? "bg-[#0A1F44]/10 border-[#0A1F44]/30 text-[#0A1F44] cursor-wait"
                : "bg-white border-[#0A1F44]/30 text-[#0A1F44] hover:bg-[#0A1F44]/8 cursor-pointer"
          }`}
        >
          {action?.status === "loading" ? (
            <i className="ri-loader-4-line animate-spin text-xs" />
          ) : (
            <i className="ri-quill-pen-line text-xs" />
          )}
          Brief
        </button>
      )}

      {/* Blog sync status */}
      {kind === "blog" && hasEditor && blogSyncStatus !== "none" ? (
        <span
          title={
            blogSyncStatus === "synced"
              ? "Draft matches what was last pushed to this blog post"
              : blogSyncStatus === "needs_sync"
                ? "Draft is newer than the live post — open the brief and use Sync to blog"
                : "Open the brief and use Import from blog, or run Auto-Optimize to generate a draft"
          }
          className={`inline-flex items-center gap-1 px-2 h-7 rounded-lg text-[10px] font-bold uppercase tracking-[0.1em] whitespace-nowrap ${
            blogSyncStatus === "synced"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : blogSyncStatus === "needs_sync"
                ? "border border-amber-200 bg-amber-50 text-amber-800"
                : "border border-[#E2E8F0] bg-[#F4F7FB] text-[#94A3B8]"
          }`}
        >
          {blogSyncStatus === "synced" ? (
            <i className="ri-check-double-line text-xs" />
          ) : blogSyncStatus === "needs_sync" ? (
            <i className="ri-upload-cloud-line text-xs" />
          ) : (
            <i className="ri-file-text-line text-xs" />
          )}
          {BLOG_SYNC_STATUS_LABEL[blogSyncStatus]}
        </span>
      ) : null}

      {/* Re-run */}
      <button
        type="button"
        onClick={() => void handleRerun()}
        disabled={!hasEditor || isProcessing}
        title={
          !hasEditor
            ? "Create a Content Editor first"
            : isProcessing
              ? "Already processing"
              : "Re-run pipeline against the latest SERP"
        }
        className={`w-7 h-7 inline-flex items-center justify-center rounded-lg border transition-all ${
          !hasEditor || isProcessing
            ? "border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed"
            : "border-[#E2E8F0] text-[#64748B] hover:text-[#0A1F44] hover:bg-[#0A1F44]/6 cursor-pointer"
        }`}
      >
        <i
          className={`text-sm ${
            isProcessing || action?.status === "loading" ? "ri-loader-4-line animate-spin" : "ri-refresh-line"
          }`}
        />
      </button>

      {/* Inline error */}
      {action?.status === "error" && action.error ? (
        <span
          title={action.error}
          className="inline-flex max-w-[180px] items-center gap-1 px-1.5 h-6 rounded-md bg-red-50 text-red-600 text-[10px] truncate"
        >
          <i className="ri-error-warning-line text-xs flex-shrink-0" />
          {action.error.length > 36 ? action.error.slice(0, 36) + "…" : action.error}
        </span>
      ) : null}
      {!action && editor?.status === "failed" && editor.error ? (
        <span
          title={editor.error}
          className="inline-flex max-w-[180px] items-center gap-1 px-1.5 h-6 rounded-md bg-red-50 text-red-600 text-[10px] truncate"
        >
          <i className="ri-error-warning-line text-xs flex-shrink-0" />
          {editor.error.length > 36 ? editor.error.slice(0, 36) + "…" : editor.error}
        </span>
      ) : null}

      {briefPickerOpen ? (
        <ContentEditorBriefModePicker
          open
          variant="popover"
          keyword={row.primary_keyword?.trim() ?? ""}
          submitting={briefSubmitting}
          onClose={() => {
            if (!briefSubmitting) setBriefPickerOpen(false);
          }}
          onSelect={(mode) => void handleBriefModeSelect(mode)}
        />
      ) : null}
    </div>
  );
}
