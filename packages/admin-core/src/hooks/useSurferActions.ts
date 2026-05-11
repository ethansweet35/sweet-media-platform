"use client";

import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase";
import type {
  SurferAuditResponse,
  SurferContentEditorResponse,
  SurferRefreshStaleResponse,
  SurferRowRef,
} from "../types/surfer";

/**
 * Per-row Surfer action state, keyed by `${kind}:${id}`.
 */
type ActionState = {
  status: "idle" | "loading" | "ok" | "error";
  error?: string;
  /** Last successful response payload, if any. */
  data?: unknown;
};

function rowKey(ref: SurferRowRef): string {
  return `${ref.kind}:${ref.id}`;
}

interface JsonOptions {
  signal?: AbortSignal;
}

async function postJson<T>(path: string, body: unknown, opts: JsonOptions = {}): Promise<T> {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: opts.signal,
  });
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    /* non-json response */
  }
  if (!res.ok) {
    const msg =
      (json &&
        typeof json === "object" &&
        "error" in json &&
        typeof (json as { error: unknown }).error === "string"
        ? (json as { error: string }).error
        : null) ?? `Request failed (HTTP ${res.status}).`;
    throw new Error(msg);
  }
  return json as T;
}

/**
 * Centralised hook for triggering Surfer actions from admin views.
 *
 * Each action returns the API response and tracks per-row status so callers
 * can render spinners / errors without managing their own state.
 */
export function useSurferActions() {
  const [states, setStates] = useState<Record<string, ActionState>>({});
  const [bulkRefreshState, setBulkRefreshState] = useState<{
    status: "idle" | "loading" | "ok" | "error";
    summary?: SurferRefreshStaleResponse;
    error?: string;
  }>({ status: "idle" });

  const setRow = useCallback((ref: SurferRowRef, next: ActionState) => {
    setStates((prev) => ({ ...prev, [rowKey(ref)]: next }));
  }, []);

  const clearRow = useCallback((ref: SurferRowRef) => {
    setStates((prev) => {
      const next = { ...prev };
      delete next[rowKey(ref)];
      return next;
    });
  }, []);

  const kickAudit = useCallback(
    async (ref: SurferRowRef) => {
      setRow(ref, { status: "loading" });
      try {
        const data = await postJson<SurferAuditResponse>("/api/admin/surfer/audit", {
          kind: ref.kind,
          id: ref.id,
        });
        setRow(ref, { status: "ok", data });
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Audit failed.";
        setRow(ref, { status: "error", error: msg });
        return null;
      }
    },
    [setRow],
  );

  const pollAudit = useCallback(
    async (ref: SurferRowRef) => {
      try {
        const data = await postJson<SurferAuditResponse>("/api/admin/surfer/audit", {
          kind: ref.kind,
          id: ref.id,
          poll: true,
        });
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Poll failed.";
        setRow(ref, { status: "error", error: msg });
        return null;
      }
    },
    [setRow],
  );

  const createContentEditor = useCallback(
    async (ref: SurferRowRef, opts: { keyword?: string } = {}) => {
      setRow(ref, { status: "loading" });
      try {
        const data = await postJson<SurferContentEditorResponse>(
          "/api/admin/surfer/content-editor",
          { kind: ref.kind, id: ref.id, keyword: opts.keyword },
        );
        setRow(ref, { status: "ok", data });
        return data;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to create Content Editor.";
        setRow(ref, { status: "error", error: msg });
        return null;
      }
    },
    [setRow],
  );

  const refreshStale = useCallback(async (maxAgeMs?: number) => {
    setBulkRefreshState({ status: "loading" });
    try {
      const data = await postJson<SurferRefreshStaleResponse>(
        "/api/admin/surfer/refresh-stale",
        maxAgeMs ? { max_age_ms: maxAgeMs } : {},
      );
      setBulkRefreshState({ status: "ok", summary: data });
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bulk refresh failed.";
      setBulkRefreshState({ status: "error", error: msg });
      return null;
    }
  }, []);

  /** Toggle the writer's "applied Surfer guidance" flag for a row. */
  const setGuidanceApplied = useCallback(
    async (ref: SurferRowRef, applied: boolean): Promise<boolean> => {
      const table = ref.kind === "blog" ? "blog_posts" : "tracked_pages";
      const { error } = await supabase
        .from(table)
        .update({
          surfer_guidance_applied: applied,
          updated_at: new Date().toISOString(),
        })
        .eq("id", ref.id);
      return !error;
    },
    [],
  );

  return {
    states,
    bulkRefreshState,
    kickAudit,
    pollAudit,
    createContentEditor,
    refreshStale,
    setGuidanceApplied,
    clearRow,
  };
}
