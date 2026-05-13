"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook that powers the "AI Optimization PRs" panel on the Content Editor
 * brief workspace. Lists past + in-flight Cursor cloud-agent runs for the
 * editor, supports triggering new runs and cancelling running ones.
 *
 * Mutations hit per-app API routes under
 * `/api/admin/content-editor/[editorId]/optimize-pr/...` so the server can
 * dispatch the Cursor SDK with its own service-role key + CURSOR_API_KEY.
 */

export type AiOptimizeRunStatus =
  | "queued"
  | "running"
  | "pr_opened"
  | "merged"
  | "failed"
  | "cancelled";

export interface AiOptimizeRun {
  id: string;
  editor_id: string | null;
  tracked_page_id: string | null;
  cursor_agent_id: string | null;
  cursor_run_id: string | null;
  status: AiOptimizeRunStatus;
  status_message: string | null;
  pr_url: string | null;
  pr_number: number | null;
  branch_name: string | null;
  diff_summary: string | null;
  vercel_project_id: string | null;
  preview_url: string | null;
  preview_content_score: number | null;
  preview_word_count: number | null;
  preview_scored_at: string | null;
  preview_fetch_error: string | null;
  triggered_by_email: string | null;
  model_id: string | null;
  prompt: string | null;
  error: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

interface UseAiOptimizeRunsOptions {
  editorId: string | null;
  trackedPageId: string | null;
}

const ACTIVE_STATUSES: AiOptimizeRunStatus[] = ["queued", "running"];

export function useAiOptimizeRuns({
  editorId,
  trackedPageId,
}: UseAiOptimizeRunsOptions) {
  const [runs, setRuns] = useState<AiOptimizeRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [triggering, setTriggering] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchRuns = useCallback(async () => {
    if (!editorId) {
      setRuns([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from("ai_optimize_runs")
        .select("*")
        .eq("editor_id", editorId)
        .order("created_at", { ascending: false })
        .limit(20);
      if (supaError) throw supaError;
      setRuns((data ?? []) as AiOptimizeRun[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load runs");
    } finally {
      setLoading(false);
    }
  }, [editorId]);

  useEffect(() => {
    void fetchRuns();
  }, [fetchRuns]);

  // Poll every 8s while any run is active (queued/running). Stops as soon
  // as everything is in a terminal state. Each poll also refreshes the
  // server-side cursor status (the API GET handler pulls fresh agent
  // status from Cursor before returning).
  useEffect(() => {
    if (!editorId) return;
    const hasActive = runs.some((r) => ACTIVE_STATUSES.includes(r.status));
    if (!hasActive) return;
    const id = setInterval(() => {
      void fetch(`/api/admin/content-editor/${editorId}/optimize-pr`, {
        cache: "no-store",
      })
        .then(() => fetchRuns())
        .catch(() => {
          /* swallow; next tick retries */
        });
    }, 8000);
    return () => clearInterval(id);
  }, [editorId, runs, fetchRuns]);

  const triggerRun = useCallback(
    async (opts?: { model?: string; customInstructions?: string }): Promise<AiOptimizeRun | null> => {
      if (!editorId) return null;
      setTriggering(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/admin/content-editor/${editorId}/optimize-pr`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              trackedPageId,
              model: opts?.model,
              customInstructions: opts?.customInstructions,
            }),
          },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          run?: AiOptimizeRun;
          error?: string;
        };
        if (!res.ok || json.ok === false || !json.run) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        await fetchRuns();
        return json.run;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        return null;
      } finally {
        setTriggering(false);
      }
    },
    [editorId, trackedPageId, fetchRuns],
  );

  const cancelRun = useCallback(
    async (runId: string): Promise<boolean> => {
      if (!editorId) return false;
      setCancellingId(runId);
      try {
        const res = await fetch(
          `/api/admin/content-editor/${editorId}/optimize-pr/${runId}/cancel`,
          { method: "POST" },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        await fetchRuns();
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        return false;
      } finally {
        setCancellingId(null);
      }
    },
    [editorId, fetchRuns],
  );

  return {
    runs,
    loading,
    error,
    triggering,
    cancellingId,
    refetch: fetchRuns,
    triggerRun,
    cancelRun,
  };
}
