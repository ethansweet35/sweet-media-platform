"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { BlogQueueItem, BlogQueueItemInput } from "../types/blog-queue";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "";

export function useBlogQueue() {
  const [items, setItems] = useState<BlogQueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async (opts?: { showLoading?: boolean }) => {
    const showLoading = opts?.showLoading !== false;
    if (showLoading) {
      setLoading(true);
      setError(null);
    }
    try {
      const { data, error: supaError } = await supabase
        .from("blog_queue")
        .select("*")
        .order("created_at", { ascending: false });

      if (supaError) throw supaError;
      setItems((data as BlogQueueItem[] | null) ?? []);
    } catch (err) {
      if (showLoading) {
        setError(err instanceof Error ? err.message : "Failed to load blog queue");
      }
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchItems();
  }, [fetchItems]);

  const createItems = useCallback(
    async (
      rows: BlogQueueItemInput[],
      opts?: { batchModelId?: string | null },
    ): Promise<{ success: number; failed: number }> => {
      if (rows.length === 0) return { success: 0, failed: 0 };
      const mid =
        opts?.batchModelId && typeof opts.batchModelId === "string" && opts.batchModelId.trim()
          ? opts.batchModelId.trim()
          : null;
      try {
        const payload = rows.map((r) => ({
          primary_keyword: r.primary_keyword.trim(),
          blog_title: r.blog_title.trim(),
          url_slug: r.url_slug.trim(),
          writing_guidelines: r.writing_guidelines?.trim() ? r.writing_guidelines.trim() : null,
          scheduled_publish_at: r.scheduled_publish_at,
          model_id: mid,
          status: "pending" as const,
        }));

        const { error: insertErr } = await supabase.from("blog_queue").insert(payload);
        if (insertErr) throw insertErr;
        await fetchItems();
        return { success: rows.length, failed: 0 };
      } catch {
        return { success: 0, failed: rows.length };
      }
    },
    [fetchItems],
  );

  const deleteItem = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const { error: delErr } = await supabase.from("blog_queue").delete().eq("id", id);
        if (delErr) throw delErr;
        await fetchItems();
        return true;
      } catch {
        return false;
      }
    },
    [fetchItems],
  );

  const cancelItem = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const { error: updErr } = await supabase
          .from("blog_queue")
          .update({
            status: "failed",
            error_message: "Cancelled by user",
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)
          .eq("status", "pending");

        if (updErr) throw updErr;
        await fetchItems();
        return true;
      } catch {
        return false;
      }
    },
    [fetchItems],
  );

  const generateNow = useCallback(
    async (id: string): Promise<{ ok: boolean; error?: string }> => {
      setItems((prev) =>
        prev.map((row) => (row.id === id ? { ...row, status: "generating" } : row)),
      );

      let result: { ok: boolean; error?: string } = { ok: false, error: "Unknown error" };

      try {
        const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
        if (sessionErr) throw sessionErr;
        const token = sessionData.session?.access_token;
        if (!token) throw new Error("Not signed in");

        const qs = `?queueId=${encodeURIComponent(id)}`;
        const res = await fetch(`${supabaseUrl}/functions/v1/process-blog-queue${qs}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: anonKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        let body: {
          processed?: number;
          status?: string;
          error?: string;
          detail?: string;
          reason?: string;
        } = {};
        try {
          body = (await res.json()) as typeof body;
        } catch {
          body = {};
        }

        const success =
          res.ok && body.processed === 1 && body.status === "draft_ready";

        if (success) {
          result = { ok: true };
        } else {
          const errPieces = [
            typeof body.error === "string" ? body.error : null,
            typeof body.detail === "string" ? body.detail : null,
            typeof body.reason === "string" ? body.reason : null,
            !res.ok ? `HTTP ${res.status}` : null,
          ].filter(Boolean);
          const msg =
            errPieces.join(" · ").trim() ||
            (typeof body.reason === "string" ? body.reason : "Generation failed");

          result = { ok: false, error: msg };
        }
      } catch (e) {
        result = {
          ok: false,
          error: e instanceof Error ? e.message : "Request failed",
        };
      }

      await fetchItems({ showLoading: false });
      return result;
    },
    [anonKey, fetchItems, supabaseUrl],
  );

  return {
    items,
    loading,
    error,
    createItems,
    deleteItem,
    cancelItem,
    generateNow,
    refetch: fetchItems,
  };
}
