"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { BlogPlannerBulkJob } from "../types/blog-planner-bulk-job";

interface BlogPlannerBulkJobContextValue {
  activeJob: BlogPlannerBulkJob | null;
  recentlyFinished: BlogPlannerBulkJob | null;
  loading: boolean;
  startBulkJob: (itemIds: string[], hubTrackedPageId: string | null) => Promise<void>;
  cancelActiveJob: () => Promise<void>;
  dismissFinishedNotice: () => void;
  refresh: () => Promise<void>;
}

const BlogPlannerBulkJobContext = createContext<BlogPlannerBulkJobContextValue | null>(null);

const POLL_MS = 2500;

export function BlogPlannerBulkJobProvider({ children }: { children: ReactNode }) {
  const [activeJob, setActiveJob] = useState<BlogPlannerBulkJob | null>(null);
  const [recentlyFinished, setRecentlyFinished] = useState<BlogPlannerBulkJob | null>(null);
  const [loading, setLoading] = useState(false);
  const dismissedFinishedIds = useRef<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/blog-planner/bulk-jobs");
      const data = (await res.json()) as {
        ok: boolean;
        job?: BlogPlannerBulkJob | null;
        last_finished?: BlogPlannerBulkJob | null;
        error?: string;
      };
      if (!res.ok || !data.ok) return;

      const running = data.job?.status === "running" ? data.job : null;
      setActiveJob(running);

      const finished = data.last_finished ?? null;
      if (
        finished &&
        !running &&
        !dismissedFinishedIds.current.has(finished.id)
      ) {
        setRecentlyFinished(finished);
      }
      if (running) {
        setRecentlyFinished(null);
      }
    } catch {
      /* ignore poll errors */
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => void refresh(), POLL_MS);
    return () => window.clearInterval(id);
  }, [refresh]);

  const startBulkJob = useCallback(
    async (itemIds: string[], hubTrackedPageId: string | null) => {
      setLoading(true);
      setRecentlyFinished(null);
      try {
        const res = await fetch("/api/admin/blog-planner/bulk-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            item_ids: itemIds,
            hub_tracked_page_id: hubTrackedPageId,
          }),
        });
        const data = (await res.json()) as { ok?: boolean; job?: BlogPlannerBulkJob; error?: string };
        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? `Failed to start bulk job (${res.status})`);
        }
        await refresh();
      } finally {
        setLoading(false);
      }
    },
    [refresh],
  );

  const cancelActiveJob = useCallback(async () => {
    if (!activeJob) return;
    const res = await fetch(`/api/admin/blog-planner/bulk-jobs/${activeJob.id}/cancel`, {
      method: "POST",
    });
    const data = (await res.json()) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) {
      throw new Error(data.error ?? "Failed to cancel");
    }
    await refresh();
  }, [activeJob, refresh]);

  const dismissFinishedNotice = useCallback(() => {
    setRecentlyFinished((job) => {
      if (job) dismissedFinishedIds.current.add(job.id);
      return null;
    });
  }, []);

  const value = useMemo(
    () => ({
      activeJob,
      recentlyFinished,
      loading,
      startBulkJob,
      cancelActiveJob,
      dismissFinishedNotice,
      refresh,
    }),
    [
      activeJob,
      recentlyFinished,
      loading,
      startBulkJob,
      cancelActiveJob,
      dismissFinishedNotice,
      refresh,
    ],
  );

  return (
    <BlogPlannerBulkJobContext.Provider value={value}>{children}</BlogPlannerBulkJobContext.Provider>
  );
}

export function useBlogPlannerBulkJob() {
  const ctx = useContext(BlogPlannerBulkJobContext);
  if (!ctx) {
    throw new Error("useBlogPlannerBulkJob must be used within BlogPlannerBulkJobProvider");
  }
  return ctx;
}

/** Safe when provider is optional (non-admin routes). */
export function useBlogPlannerBulkJobOptional() {
  return useContext(BlogPlannerBulkJobContext);
}
