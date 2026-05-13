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
  "competitor_avg_score, target_score, blog_post_id, created_at, updated_at, completed_at, " +
  "content_editor_drafts(computed_content_score, is_current)";

export function useContentEditors(): UseContentEditorsState & {
  refresh: () => Promise<void>;
  createEditor: (input: { primaryKeyword: string; blogPostId?: string | null }) => Promise<ContentEditorListRow | null>;
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
    const rows: ContentEditorListRow[] = ((data as unknown[]) ?? []).map((raw) => {
      const r = raw as Record<string, unknown>;
      const drafts = Array.isArray(r.content_editor_drafts) ? r.content_editor_drafts : [];
      const currentDraft = drafts.find((d: Record<string, unknown>) => d.is_current);
      const current_content_score =
        (currentDraft as Record<string, unknown> | undefined)?.computed_content_score as number | null ?? null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content_editor_drafts: _drafts, ...rest } = r;
      return { ...rest, current_content_score } as ContentEditorListRow;
    });
    setState({ rows, loading: false, error: null });
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
    async (input: { primaryKeyword: string; blogPostId?: string | null }) => {
      const cleaned = input.primaryKeyword.trim();
      if (!cleaned) return null;
      const res = await fetch("/api/admin/content-editor/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryKeyword: cleaned,
          blogPostId: input.blogPostId ?? null,
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
  refresh: () => Promise<void>;
  rerun: () => Promise<void>;
} {
  const [data, setData] = useState<UseContentEditorState>({
    state: null,
    loading: !!id,
    error: null,
  });

  const refresh = useCallback(async () => {
    if (!id) return;
    setData((s) => ({ ...s, loading: true }));
    const res = await fetch(`/api/admin/content-editor/${id}`, { cache: "no-store" });
    const json = (await res.json().catch(() => ({}))) as
      | { ok: true; editor: ContentEditorState["editor"]; competitors: ContentEditorState["competitors"]; terms: ContentEditorState["terms"]; questions: ContentEditorState["questions"]; facts: ContentEditorState["facts"]; outline: ContentEditorState["outline"]; currentDraft: ContentEditorState["currentDraft"]; }
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
      void refresh();
    }, 4000);
    return () => clearInterval(t);
  }, [id, data.state?.editor.status, refresh]);

  const rerun = useCallback(async () => {
    if (!id) return;
    await fetch(`/api/admin/content-editor/${id}/run`, { method: "POST" });
    await refresh();
  }, [id, refresh]);

  return { ...data, refresh, rerun };
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
  const { editorId, debounceMs = 1200, includeFactCoverage = false, persist = false } = opts;
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
