"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/**
 * Hook for the admin Content Editor brief workspace to manage
 * `tracked_page_content_blocks` for a Page Mode editor.
 *
 * Mutating actions hit the per-app API routes under
 * `/api/admin/tracked-pages/[trackedPageId]/blocks/...` so the server can
 * call revalidatePath() after each change.
 */

export interface TrackedPageBlock {
  id: string;
  tracked_page_id: string;
  editor_id: string | null;
  position: number;
  block_type: string;
  heading: string | null;
  body_markdown: string | null;
  list_items: string[] | null;
  callout_variant: string | null;
  stats: Array<{ value: string; label: string }> | null;
  table_headers: string[] | null;
  table_rows: string[][] | null;
  status: "pending" | "active" | "archived" | "rejected";
  source: "manual" | "ai-generated" | "imported";
  ai_rationale: string | null;
  ai_target_heading: string | null;
  created_at: string;
  updated_at: string;
  applied_at: string | null;
}

interface ActionState {
  loading: boolean;
  error: string | null;
}

export function useTrackedPageBlocks(trackedPageId: string | null) {
  const [blocks, setBlocks] = useState<TrackedPageBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actions, setActions] = useState<Record<string, ActionState>>({});

  const setAction = useCallback((id: string, state: ActionState) => {
    setActions((prev) => ({ ...prev, [id]: state }));
  }, []);

  const fetchBlocks = useCallback(async () => {
    if (!trackedPageId) {
      setBlocks([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: supaError } = await supabase
        .from("tracked_page_content_blocks")
        .select("*")
        .eq("tracked_page_id", trackedPageId)
        .order("status", { ascending: true })
        .order("position", { ascending: true })
        .order("created_at", { ascending: true });
      if (supaError) throw supaError;
      setBlocks((data ?? []) as TrackedPageBlock[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blocks");
    } finally {
      setLoading(false);
    }
  }, [trackedPageId]);

  useEffect(() => {
    void fetchBlocks();
  }, [fetchBlocks]);

  const applyBlock = useCallback(
    async (blockId: string): Promise<boolean> => {
      if (!trackedPageId) return false;
      setAction(blockId, { loading: true, error: null });
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${trackedPageId}/blocks/${blockId}/apply`,
          { method: "POST" },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        setAction(blockId, { loading: false, error: null });
        await fetchBlocks();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setAction(blockId, { loading: false, error: message });
        return false;
      }
    },
    [trackedPageId, setAction, fetchBlocks],
  );

  const rejectBlock = useCallback(
    async (blockId: string): Promise<boolean> => {
      if (!trackedPageId) return false;
      setAction(blockId, { loading: true, error: null });
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${trackedPageId}/blocks/${blockId}/reject`,
          { method: "POST" },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        setAction(blockId, { loading: false, error: null });
        await fetchBlocks();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setAction(blockId, { loading: false, error: message });
        return false;
      }
    },
    [trackedPageId, setAction, fetchBlocks],
  );

  const archiveBlock = useCallback(
    async (blockId: string): Promise<boolean> => {
      if (!trackedPageId) return false;
      setAction(blockId, { loading: true, error: null });
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${trackedPageId}/blocks/${blockId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "archived" }),
          },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        setAction(blockId, { loading: false, error: null });
        await fetchBlocks();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setAction(blockId, { loading: false, error: message });
        return false;
      }
    },
    [trackedPageId, setAction, fetchBlocks],
  );

  const updateBlock = useCallback(
    async (
      blockId: string,
      patch: Partial<
        Pick<
          TrackedPageBlock,
          | "heading"
          | "body_markdown"
          | "list_items"
          | "callout_variant"
          | "block_type"
          | "position"
          | "status"
        >
      >,
    ): Promise<boolean> => {
      if (!trackedPageId) return false;
      setAction(blockId, { loading: true, error: null });
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${trackedPageId}/blocks/${blockId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch),
          },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        setAction(blockId, { loading: false, error: null });
        await fetchBlocks();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setAction(blockId, { loading: false, error: message });
        return false;
      }
    },
    [trackedPageId, setAction, fetchBlocks],
  );

  const deleteBlock = useCallback(
    async (blockId: string): Promise<boolean> => {
      if (!trackedPageId) return false;
      setAction(blockId, { loading: true, error: null });
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${trackedPageId}/blocks/${blockId}`,
          { method: "DELETE" },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        setAction(blockId, { loading: false, error: null });
        await fetchBlocks();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setAction(blockId, { loading: false, error: message });
        return false;
      }
    },
    [trackedPageId, setAction, fetchBlocks],
  );

  const applyAllPending = useCallback(
    async (editorId: string): Promise<number> => {
      if (!trackedPageId || !editorId) return 0;
      try {
        const res = await fetch(
          `/api/admin/tracked-pages/${trackedPageId}/blocks/apply-all`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ editorId }),
          },
        );
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          applied?: number;
          error?: string;
        };
        if (!res.ok || json.ok === false) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        await fetchBlocks();
        return json.applied ?? 0;
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        return 0;
      }
    },
    [trackedPageId, fetchBlocks],
  );

  const pendingBlocks = blocks.filter((b) => b.status === "pending");
  const activeBlocks = blocks.filter((b) => b.status === "active");
  const archivedBlocks = blocks.filter((b) => b.status === "archived");
  const rejectedBlocks = blocks.filter((b) => b.status === "rejected");

  return {
    blocks,
    pendingBlocks,
    activeBlocks,
    archivedBlocks,
    rejectedBlocks,
    loading,
    error,
    actions,
    refetch: fetchBlocks,
    applyBlock,
    rejectBlock,
    archiveBlock,
    updateBlock,
    deleteBlock,
    applyAllPending,
  };
}
