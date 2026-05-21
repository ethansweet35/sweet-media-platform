"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import type {
  ContentEditorListRow,
  ContentEditorState,
  ContentEditorStatus,
  ScoreBreakdown,
} from "../types/content-editor";
import { STATUS_IS_PROCESSING } from "../types/content-editor";
import {
  blogSyncStatusForListRow,
  resolveContentEditorLink,
} from "../lib/contentEditorListLink";

// ────────────────────────────────────────────────────────────────────────
//  List hook
// ────────────────────────────────────────────────────────────────────────

interface UseContentEditorsState {
  rows: ContentEditorListRow[];
  loading: boolean;
  error: string | null;
}

const LIST_SELECT =
  "id, primary_keyword, status, status_message, error, total_cost_usd, " +
  "recommended_word_count_min, recommended_word_count_max, recommended_word_count_target, " +
  "competitor_avg_score, target_score, blog_post_id, linked_tracked_page_id, " +
  "created_at, updated_at, completed_at, " +
  "content_editor_drafts(computed_content_score, body_markdown, updated_at, is_current)";

export function useContentEditors(): UseContentEditorsState & {
  refresh: () => Promise<void>;
  createEditor: (input: {
    primaryKeyword: string;
    blogPostId?: string | null;
    analysisMode?: "lite" | "deep";
  }) => Promise<ContentEditorListRow | null>;
  removeEditor: (id: string) => Promise<boolean>;
} {
  const [state, setState] = useState<UseContentEditorsState>({
    rows: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    const { data, error } = await supabase
      .from("content_editors")
      .select(LIST_SELECT)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) {
      setState({ rows: [], loading: false, error: error.message });
      return;
    }
    // Flatten the joined draft array into a single current_content_score field.
    const rowsRaw = (data as unknown[]) ?? [];
    const pageModeIds: string[] = [];
    type RowBase = Record<string, unknown> & {
      id: string;
      blog_post_id: string | null;
      linked_tracked_page_id: string | null;
      draft_body_present: boolean;
      draft_updated_at: string | null;
    };

    const rowsBase: RowBase[] = rowsRaw.map((raw) => {
      const r = raw as Record<string, unknown>;
      const drafts = Array.isArray(r.content_editor_drafts) ? r.content_editor_drafts : [];
      const currentDraft = drafts.find((d: Record<string, unknown>) => d.is_current) as
        | Record<string, unknown>
        | undefined;
      const current_content_score =
        (currentDraft?.computed_content_score as number | null | undefined) ?? null;
      const draftBody = (currentDraft?.body_markdown as string | undefined)?.trim() ?? "";
      const draft_updated_at = (currentDraft?.updated_at as string | null | undefined) ?? null;
      const linkedTrackedPageId = (r.linked_tracked_page_id as string | null) ?? null;
      const editorId = r.id as string;
      if (linkedTrackedPageId) pageModeIds.push(editorId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content_editor_drafts: _drafts, ...rest } = r;
      return {
        ...rest,
        id: editorId,
        blog_post_id: (r.blog_post_id as string | null) ?? null,
        current_content_score,
        linked_tracked_page_id: linkedTrackedPageId,
        live_page_score: null as number | null,
        draft_body_present: draftBody.length > 0,
        draft_updated_at,
      } as RowBase;
    });

    const editorIds = rowsBase.map((r) => r.id);
    const blogPostIds = rowsBase.map((r) => r.blog_post_id).filter((id): id is string => !!id);
    const pageIds = rowsBase
      .map((r) => r.linked_tracked_page_id)
      .filter((id): id is string => !!id);

    const blogsByEditorId = new Map<
      string,
      {
        id: string;
        slug: string;
        title: string;
        content_editor_id: string | null;
        content_editor_synced_at: string | null;
      }
    >();
    const blogsByPostId = new Map<
      string,
      {
        id: string;
        slug: string;
        title: string;
        content_editor_id: string | null;
        content_editor_synced_at: string | null;
      }
    >();
    const pagesByEditorId = new Map<
      string,
      { id: string; route_path: string; page_title: string; content_editor_id: string | null }
    >();
    const pagesByPageId = new Map<
      string,
      { id: string; route_path: string; page_title: string; content_editor_id: string | null }
    >();

    if (editorIds.length > 0) {
      const [blogsByEditorRes, pagesByEditorRes] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("id, slug, title, content_editor_id, content_editor_synced_at")
          .in("content_editor_id", editorIds),
        supabase
          .from("tracked_pages")
          .select("id, route_path, page_title, content_editor_id")
          .in("content_editor_id", editorIds),
      ]);
      for (const b of blogsByEditorRes.data ?? []) {
        if (b.content_editor_id) blogsByEditorId.set(b.content_editor_id, b);
      }
      for (const p of pagesByEditorRes.data ?? []) {
        if (p.content_editor_id) pagesByEditorId.set(p.content_editor_id, p);
      }
    }

    if (blogPostIds.length > 0) {
      const { data: blogsById } = await supabase
        .from("blog_posts")
        .select("id, slug, title, content_editor_id, content_editor_synced_at")
        .in("id", blogPostIds);
      for (const b of blogsById ?? []) {
        blogsByPostId.set(b.id, b);
      }
    }

    if (pageIds.length > 0) {
      const { data: pagesById } = await supabase
        .from("tracked_pages")
        .select("id, route_path, page_title, content_editor_id")
        .in("id", pageIds);
      for (const p of pagesById ?? []) {
        pagesByPageId.set(p.id, p);
      }
    }

    const rowsTmp = rowsBase.map((row) => {
      const link = resolveContentEditorLink(
        {
          id: row.id,
          blog_post_id: row.blog_post_id,
          linked_tracked_page_id: row.linked_tracked_page_id,
        },
        blogsByEditorId,
        blogsByPostId,
        pagesByEditorId,
        pagesByPageId,
      );
      const blog =
        link.blog_post_id != null
          ? blogsByPostId.get(link.blog_post_id) ?? blogsByEditorId.get(row.id)
          : null;
      const blog_synced_at = blog?.content_editor_synced_at ?? null;
      const blog_sync_status = blogSyncStatusForListRow({
        link_kind: link.link_kind,
        draft_body_present: row.draft_body_present,
        draft_updated_at: row.draft_updated_at,
        blog_synced_at,
      });

      return {
        ...row,
        link_kind: link.link_kind,
        link_label: link.link_label,
        link_title: link.link_title,
        resolved_blog_post_id: link.blog_post_id,
        blog_synced_at,
        blog_sync_status,
      } as ContentEditorListRow;
    });

    // Page Mode editors: pull the latest live-page snapshot score for each.
    if (pageModeIds.length > 0) {
      const { data: snaps } = await supabase
        .from("tracked_page_live_snapshots")
        .select("scored_against_editor_id, computed_content_score, fetched_at")
        .in("scored_against_editor_id", pageModeIds)
        .order("fetched_at", { ascending: false });
      // Keep the most recent snapshot per editor.
      const byEditor = new Map<string, number | null>();
      for (const snap of (snaps as Array<{ scored_against_editor_id: string; computed_content_score: number | null }>) ?? []) {
        if (!byEditor.has(snap.scored_against_editor_id)) {
          byEditor.set(snap.scored_against_editor_id, snap.computed_content_score);
        }
      }
      for (const row of rowsTmp) {
        if (row.linked_tracked_page_id) {
          row.live_page_score = byEditor.get(row.id) ?? null;
        }
      }
    }

    setState({ rows: rowsTmp, loading: false, error: null });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  // Poll while any row is still processing.
  useEffect(() => {
    if (!state.rows.some((r) => STATUS_IS_PROCESSING[r.status])) return;
    const t = setInterval(() => {
      void refresh();
    }, 5000);
    return () => clearInterval(t);
  }, [state.rows, refresh]);

  const createEditor = useCallback(
    async (input: {
      primaryKeyword: string;
      blogPostId?: string | null;
      analysisMode?: "lite" | "deep";
    }) => {
      const cleaned = input.primaryKeyword.trim();
      if (!cleaned) return null;
      const res = await fetch("/api/admin/content-editor/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryKeyword: cleaned,
          blogPostId: input.blogPostId ?? null,
          analysisMode: input.analysisMode ?? "lite",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        editor?: ContentEditorListRow;
        error?: string;
      };
      if (!res.ok || !json.ok || !json.editor) {
        setState((s) => ({ ...s, error: json.error ?? "Failed to create editor." }));
        return null;
      }
      await refresh();
      return json.editor;
    },
    [refresh],
  );

  const removeEditor = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/admin/content-editor/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setState((s) => ({ ...s, error: json.error ?? "Failed to delete editor." }));
        return false;
      }
      await refresh();
      return true;
    },
    [refresh],
  );

  return { ...state, refresh, createEditor, removeEditor };
}

// ────────────────────────────────────────────────────────────────────────
//  Single editor hook
// ────────────────────────────────────────────────────────────────────────

interface UseContentEditorState {
  state: ContentEditorState | null;
  loading: boolean;
  error: string | null;
}

export function useContentEditor(id: string | null): UseContentEditorState & {
  refresh: (opts?: { silent?: boolean }) => Promise<void>;
  rerun: () => Promise<void>;
  clearError: () => void;
} {
  const [data, setData] = useState<UseContentEditorState>({
    state: null,
    loading: !!id,
    error: null,
  });

  const refresh = useCallback(async (options?: { silent?: boolean }) => {
    if (!id) return;
    const silent = options?.silent === true;
    if (!silent) {
      setData((s) => ({ ...s, loading: true }));
    }
    const res = await fetch(`/api/admin/content-editor/${id}`, { cache: "no-store" });
    const json = (await res.json().catch(() => ({}))) as
      | {
          ok: true;
          editor: ContentEditorState["editor"];
          competitors: ContentEditorState["competitors"];
          terms: ContentEditorState["terms"];
          questions: ContentEditorState["questions"];
          facts: ContentEditorState["facts"];
          outline: ContentEditorState["outline"];
          currentDraft: ContentEditorState["currentDraft"];
          linkedPage?: ContentEditorState["linkedPage"];
        }
      | { ok: false; error: string };

    if (!res.ok || !("ok" in json) || !json.ok) {
      const err = !("ok" in json) ? "Unknown error" : (json as { error: string }).error;
      setData({ state: null, loading: false, error: err });
      return;
    }
    setData({
      state: {
        editor: json.editor,
        competitors: json.competitors,
        terms: json.terms,
        questions: json.questions,
        facts: json.facts,
        outline: json.outline,
        currentDraft: json.currentDraft,
        linkedPage: json.linkedPage ?? null,
      },
      loading: false,
      error: null,
    });
  }, [id]);

  useEffect(() => {
    if (!id) {
      setData({ state: null, loading: false, error: null });
      return;
    }
    void refresh();
  }, [id, refresh]);

  // Poll while the editor is still processing.
  useEffect(() => {
    if (!id) return;
    const status: ContentEditorStatus | undefined = data.state?.editor.status;
    if (!status || !STATUS_IS_PROCESSING[status]) return;
    const t = setInterval(() => {
      void refresh({ silent: true });
    }, 4000);
    return () => clearInterval(t);
  }, [id, data.state?.editor.status, refresh]);

  const rerun = useCallback(async () => {
    if (!id) return;
    const status = data.state?.editor.status;
    const forceRebuild = status === "ready";
    if (forceRebuild) {
      const ok = window.confirm(
        "Full re-analysis will delete the competitor brief stored for this editor and regenerate it from scratch (~$0.30, 90–180 seconds). Your draft text is preserved. Continue?",
      );
      if (!ok) return;
    }
    try {
      const res = await fetch(`/api/admin/content-editor/${id}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: forceRebuild }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || json.ok === false) {
        const msg =
          typeof json?.error === "string"
            ? json.error
            : res.status === 409
              ? "Pipeline busy — wait for the current run to finish."
              : `Re-run failed (HTTP ${res.status}).`;
        setData((s) => ({ ...s, error: msg }));
        return;
      }
      await refresh({ silent: true });
      // `after()` schedules the pipeline shortly after this response; poll a few times
      // so we leave `ready` → `pending`/processing without needing a full page reload.
      for (const ms of [400, 1200, 3000, 8000]) {
        setTimeout(() => {
          void refresh({ silent: true });
        }, ms);
      }
    } catch {
      setData((s) => ({ ...s, error: "Network error while triggering re-run." }));
    }
  }, [id, refresh, data.state?.editor.status]);

  const clearError = useCallback(() => {
    setData((s) => ({ ...s, error: null }));
  }, []);

  return { ...data, refresh, rerun, clearError };
}

// ────────────────────────────────────────────────────────────────────────
//  Live scoring hook (with debouncing + abort-on-keypress)
// ────────────────────────────────────────────────────────────────────────

export interface DraftInputs {
  titleTag: string;
  metaDescription: string;
  h1Text: string;
  bodyMarkdown: string;
}

interface UseLiveScoreOptions {
  editorId: string | null;
  /** Debounce delay in ms before triggering the score call. Defaults to 1200. */
  debounceMs?: number;
  /** Include fact-coverage embedding call. Slower + ~$0.001 per call. Defaults to false. */
  includeFactCoverage?: boolean;
  /** Persist the score to the current draft row. Defaults to false. */
  persist?: boolean;
}

interface UseLiveScoreState {
  score: ScoreBreakdown | null;
  scoring: boolean;
  error: string | null;
}

/**
 * Live scoring: call this with the current draft inputs and the editor id;
 * the hook debounces and POSTs to /api/admin/content-editor/[id]/score.
 *
 * Cancels in-flight requests when inputs change to avoid races. The latest
 * score wins.
 */
export function useLiveScore(
  drafts: DraftInputs,
  opts: UseLiveScoreOptions,
): UseLiveScoreState {
  const { editorId, debounceMs = 1200, includeFactCoverage = false, persist = true } = opts;
  const [score, setScore] = useState<ScoreBreakdown | null>(null);
  const [scoring, setScoring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract heading texts from markdown to feed the scorer's per-term flags.
  const allHeadings = useMemo(() => extractHeadingTexts(drafts.bodyMarkdown), [drafts.bodyMarkdown]);
  const earlyHeadings = useMemo(() => allHeadings.slice(0, 3), [allHeadings]);

  useEffect(() => {
    if (!editorId) return;
    // No-op if there's nothing to score yet.
    if (
      !drafts.bodyMarkdown.trim() &&
      !drafts.titleTag.trim() &&
      !drafts.h1Text.trim() &&
      !drafts.metaDescription.trim()
    ) {
      setScore(null);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Cancel any prior request.
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setScoring(true);
      setError(null);

      void fetch(`/api/admin/content-editor/${editorId}/score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleTag: drafts.titleTag,
          metaDescription: drafts.metaDescription,
          h1Text: drafts.h1Text,
          bodyPlaintext: stripMarkdown(drafts.bodyMarkdown),
          bodyMarkdown: drafts.bodyMarkdown,
          earlyHeadings,
          allHeadings,
          includeFactCoverage,
          persist,
        }),
        signal: ctrl.signal,
      })
        .then(async (res) => {
          const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string } & ScoreBreakdown;
          if (!res.ok || !json.ok) {
            setError(json.error ?? `Score failed (HTTP ${res.status})`);
            setScoring(false);
            return;
          }
          setScore(json);
          setScoring(false);
        })
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") return; // superseded
          setError(err instanceof Error ? err.message : "Score request failed.");
          setScoring(false);
        });
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    editorId,
    drafts.titleTag,
    drafts.metaDescription,
    drafts.h1Text,
    drafts.bodyMarkdown,
    allHeadings,
    earlyHeadings,
    debounceMs,
    includeFactCoverage,
    persist,
  ]);

  // Final unmount: cancel pending.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { score, scoring, error };
}

// ────────────────────────────────────────────────────────────────────────
//  Draft autosave hook (debounced longer than scoring)
// ────────────────────────────────────────────────────────────────────────

export function useDraftAutosave(
  drafts: DraftInputs,
  editorId: string | null,
  debounceMs = 4000,
): { saving: boolean; saved: boolean; error: string | null } {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>("");

  useEffect(() => {
    if (!editorId) return;
    const payload = JSON.stringify(drafts);
    if (payload === lastSavedRef.current) return;
    if (!drafts.bodyMarkdown.trim() && !drafts.titleTag.trim()) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSaving(true);
      setSaved(false);
      setError(null);
      void fetch(`/api/admin/content-editor/${editorId}/save-draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleTag: drafts.titleTag || null,
          metaDescription: drafts.metaDescription || null,
          h1Text: drafts.h1Text || null,
          bodyMarkdown: drafts.bodyMarkdown || null,
          bodyPlaintext: stripMarkdown(drafts.bodyMarkdown) || null,
        }),
      })
        .then(async (res) => {
          const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
          setSaving(false);
          if (!res.ok || !json.ok) {
            setError(json.error ?? `Save failed (HTTP ${res.status})`);
            return;
          }
          lastSavedRef.current = payload;
          setSaved(true);
        })
        .catch((err: unknown) => {
          setSaving(false);
          setError(err instanceof Error ? err.message : "Save request failed.");
        });
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [drafts, editorId, debounceMs]);

  return { saving, saved, error };
}

// ────────────────────────────────────────────────────────────────────────
//  Local helpers (markdown → plaintext, heading extraction)
// ────────────────────────────────────────────────────────────────────────

function stripMarkdown(md: string): string {
  if (!md) return "";
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_~`]+/g, " ")
    .replace(/\|/g, " ")
    .replace(/[-]{3,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadingTexts(md: string): string[] {
  if (!md) return [];
  const out: string[] = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^#{1,6}\s+(.+?)\s*$/);
    if (m) out.push(m[1].trim());
  }
  return out;
}
