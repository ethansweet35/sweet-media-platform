"use client";

import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase";
import type { SeoBriefRow, SeoBriefRowRef } from "../types/seo-brief";

/**
 * Per-row Sweet SEO action state, keyed by `${kind}:${id}`.
 * Used by SweetSeoCell to render per-row spinners + errors.
 */
type ActionState = {
  status: "idle" | "loading" | "ok" | "error";
  error?: string;
  data?: unknown;
};

function rowKey(ref: SeoBriefRowRef): string {
  return `${ref.kind}:${ref.id}`;
}

function rowTable(kind: SeoBriefRowRef["kind"]): "blog_posts" | "tracked_pages" {
  return kind === "blog" ? "blog_posts" : "tracked_pages";
}

interface AnalyzeResponse {
  ok: boolean;
  brief?: SeoBriefRow;
  error?: string;
}

async function postAnalyze(body: { keyword: string; briefId?: string }): Promise<SeoBriefRow> {
  const res = await fetch("/api/admin/sweet-seo/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as AnalyzeResponse;
  if (!res.ok || !json.ok || !json.brief) {
    throw new Error(json.error ?? `Sweet SEO request failed (HTTP ${res.status}).`);
  }
  return json.brief;
}

async function fetchBrief(id: string): Promise<SeoBriefRow | null> {
  const { data, error } = await supabase
    .from("seo_briefs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as SeoBriefRow | null) ?? null;
}

/**
 * Centralized hook for triggering Sweet SEO row actions from admin tables.
 *
 * Each action returns the API/DB response and tracks per-row status so callers
 * can render spinners / errors without managing their own state.
 */
export function useSeoBriefRowActions() {
  const [states, setStates] = useState<Record<string, ActionState>>({});

  const setRow = useCallback((ref: SeoBriefRowRef, next: ActionState) => {
    setStates((prev) => ({ ...prev, [rowKey(ref)]: next }));
  }, []);

  const clearRow = useCallback((ref: SeoBriefRowRef) => {
    setStates((prev) => {
      const next = { ...prev };
      delete next[rowKey(ref)];
      return next;
    });
  }, []);

  /**
   * Create a new Sweet SEO brief from the row's primary keyword and link it.
   * Returns the brief id so the caller can navigate or show the score.
   */
  const createBriefForRow = useCallback(
    async (
      ref: SeoBriefRowRef,
      keyword: string,
    ): Promise<{ briefId: string } | null> => {
      const trimmed = keyword.trim();
      if (!trimmed) {
        setRow(ref, { status: "error", error: "No primary keyword set on this row." });
        return null;
      }
      setRow(ref, { status: "loading" });
      try {
        const brief = await postAnalyze({ keyword: trimmed });
        const { error } = await supabase
          .from(rowTable(ref.kind))
          .update({
            seo_brief_id: brief.id,
            updated_at: new Date().toISOString(),
          })
          .eq("id", ref.id);
        if (error) throw error;
        setRow(ref, { status: "ok", data: brief });
        return { briefId: brief.id };
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to create Sweet SEO brief.";
        setRow(ref, { status: "error", error: msg });
        return null;
      }
    },
    [setRow],
  );

  /**
   * Re-run analysis on the row's existing brief. Overwrites targets but
   * preserves the user's draft_content.
   */
  const rerunBrief = useCallback(
    async (ref: SeoBriefRowRef, briefId: string, keyword: string): Promise<boolean> => {
      const trimmed = keyword.trim();
      if (!trimmed) {
        setRow(ref, { status: "error", error: "No primary keyword set on this row." });
        return false;
      }
      setRow(ref, { status: "loading" });
      try {
        await postAnalyze({ keyword: trimmed, briefId });
        setRow(ref, { status: "ok" });
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to re-run Sweet SEO brief.";
        setRow(ref, { status: "error", error: msg });
        return false;
      }
    },
    [setRow],
  );

  /**
   * Refresh = re-fetch the brief from Supabase. Useful for picking up changes
   * to draft_content / targets made on the brief detail page.
   */
  const refreshBrief = useCallback(
    async (ref: SeoBriefRowRef, briefId: string): Promise<SeoBriefRow | null> => {
      setRow(ref, { status: "loading" });
      try {
        const brief = await fetchBrief(briefId);
        setRow(ref, { status: "ok", data: brief });
        return brief;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to refresh brief.";
        setRow(ref, { status: "error", error: msg });
        return null;
      }
    },
    [setRow],
  );

  /** Toggle the row's "applied" flag (writer marks the post has used the guidance). */
  const setGuidanceApplied = useCallback(
    async (ref: SeoBriefRowRef, applied: boolean): Promise<boolean> => {
      const { error } = await supabase
        .from(rowTable(ref.kind))
        .update({
          seo_guidance_applied: applied,
          updated_at: new Date().toISOString(),
        })
        .eq("id", ref.id);
      return !error;
    },
    [],
  );

  /** Detach a brief from a row without deleting the brief itself. */
  const unlinkBrief = useCallback(async (ref: SeoBriefRowRef): Promise<boolean> => {
    const { error } = await supabase
      .from(rowTable(ref.kind))
      .update({ seo_brief_id: null, seo_guidance_applied: false, updated_at: new Date().toISOString() })
      .eq("id", ref.id);
    return !error;
  }, []);

  return {
    states,
    clearRow,
    createBriefForRow,
    rerunBrief,
    refreshBrief,
    setGuidanceApplied,
    unlinkBrief,
  };
}
