"use client";

import { useCallback, useState } from "react";
import { supabase } from "../lib/supabase";
import type { ContentEditorListRow } from "../types/content-editor";

/**
 * Row reference: which blog post / tracked page row are we acting on?
 */
export interface ContentEditorRowRef {
  kind: "blog" | "page";
  id: string;
}

type ActionState = {
  status: "idle" | "loading" | "ok" | "error";
  error?: string;
};

function rowKey(ref: ContentEditorRowRef): string {
  return `${ref.kind}:${ref.id}`;
}

function rowTable(kind: ContentEditorRowRef["kind"]): "blog_posts" | "tracked_pages" {
  return kind === "blog" ? "blog_posts" : "tracked_pages";
}

interface CreateResponse {
  ok?: boolean;
  editor?: ContentEditorListRow;
  error?: string;
  poll_url?: string;
}

async function postCreate(body: {
  primaryKeyword: string;
  blogPostId?: string | null;
}): Promise<ContentEditorListRow> {
  const res = await fetch("/api/admin/content-editor/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as CreateResponse;
  if (!res.ok || !json.ok || !json.editor) {
    throw new Error(json.error ?? `Content editor create failed (HTTP ${res.status}).`);
  }
  return json.editor;
}

/**
 * Centralized hook for triggering Content Editor row actions from the
 * blog posts + tracked pages admin tables.
 *
 * `createEditorForRow` creates a new content_editor seeded with the
 * row's primary keyword, then links it back via the row's
 * `content_editor_id` column. The pipeline runs asynchronously on the
 * server; the cell will poll for status updates.
 */
export function useContentEditorRowActions() {
  const [states, setStates] = useState<Record<string, ActionState>>({});

  const setRow = useCallback((ref: ContentEditorRowRef, next: ActionState) => {
    setStates((prev) => ({ ...prev, [rowKey(ref)]: next }));
  }, []);

  const clearRow = useCallback((ref: ContentEditorRowRef) => {
    setStates((prev) => {
      const next = { ...prev };
      delete next[rowKey(ref)];
      return next;
    });
  }, []);

  /**
   * Create a Content Editor for the given row's primary keyword and link
   * the editor back to the row via `content_editor_id`. Returns the new
   * editor id on success, or null on failure.
   */
  const createEditorForRow = useCallback(
    async (
      ref: ContentEditorRowRef,
      keyword: string,
    ): Promise<{ editorId: string } | null> => {
      const trimmed = keyword.trim();
      if (!trimmed) {
        setRow(ref, { status: "error", error: "No primary keyword set on this row." });
        return null;
      }
      setRow(ref, { status: "loading" });
      try {
        const editor = await postCreate({
          primaryKeyword: trimmed,
          blogPostId: ref.kind === "blog" ? ref.id : null,
        });
        // Link the new editor back to the row.
        const { error } = await supabase
          .from(rowTable(ref.kind))
          .update({ content_editor_id: editor.id, updated_at: new Date().toISOString() })
          .eq("id", ref.id);
        if (error) throw error;
        setRow(ref, { status: "ok" });
        return { editorId: editor.id };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setRow(ref, { status: "error", error: message });
        return null;
      }
    },
    [setRow],
  );

  /**
   * Manually re-trigger the pipeline for the row's existing editor.
   * No-op if the row has no content_editor_id.
   */
  const rerunEditorForRow = useCallback(
    async (ref: ContentEditorRowRef, editorId: string): Promise<boolean> => {
      if (!editorId) return false;
      setRow(ref, { status: "loading" });
      try {
        const res = await fetch(`/api/admin/content-editor/${editorId}/run`, {
          method: "POST",
        });
        if (!res.ok) {
          const json = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        setRow(ref, { status: "ok" });
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setRow(ref, { status: "error", error: message });
        return false;
      }
    },
    [setRow],
  );

  /**
   * Detach the editor from a row (sets content_editor_id = null).
   * Does NOT delete the editor itself — it remains accessible via
   * /admin/content-editor.
   */
  const unlinkEditor = useCallback(
    async (ref: ContentEditorRowRef): Promise<boolean> => {
      const { error } = await supabase
        .from(rowTable(ref.kind))
        .update({ content_editor_id: null, updated_at: new Date().toISOString() })
        .eq("id", ref.id);
      if (error) {
        setRow(ref, { status: "error", error: error.message });
        return false;
      }
      clearRow(ref);
      return true;
    },
    [clearRow, setRow],
  );

  return {
    states,
    createEditorForRow,
    rerunEditorForRow,
    unlinkEditor,
  };
}
