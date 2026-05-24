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
import type {
  ContentEditorBulkJob,
  ContentEditorBulkPublishTarget,
} from "../types/content-editor-bulk-job";

interface ContentEditorBulkJobContextValue {
  activeJob: ContentEditorBulkJob | null;
  recentlyFinished: ContentEditorBulkJob | null;
  loading: boolean;
  startBulkCreate: (input: {
    publishTarget: ContentEditorBulkPublishTarget;
    analysisMode: "lite" | "deep";
    lines: string;
  }) => Promise<void>;
  cancelActiveJob: () => Promise<void>;
  dismissFinishedNotice: () => void;
  refresh: () => Promise<void>;
}

const ContentEditorBulkJobContext = createContext<ContentEditorBulkJobContextValue | null>(
  null,
);

const POLL_MS = 2500;

export function ContentEditorBulkJobProvider({ children }: { children: ReactNode }) {
  const [activeJob, setActiveJob] = useState<ContentEditorBulkJob | null>(null);
  const [recentlyFinished, setRecentlyFinished] = useState<ContentEditorBulkJob | null>(null);
  const [loading, setLoading] = useState(false);
  const dismissedFinishedIds = useRef<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/content-editor/bulk-jobs");
      const data = (await res.json()) as {
        ok: boolean;
        job?: ContentEditorBulkJob | null;
        last_finished?: ContentEditorBulkJob | null;
        error?: string;
      };
      if (!res.ok || !data.ok) return;

      const running = data.job?.status === "running" ? data.job : null;
      setActiveJob(running);

      const finished = data.last_finished ?? null;
      if (finished && !running && !dismissedFinishedIds.current.has(finished.id)) {
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

  const startBulkCreate = useCallback(
    async (input: {
      publishTarget: ContentEditorBulkPublishTarget;
      analysisMode: "lite" | "deep";
      lines: string;
    }) => {
      setLoading(true);
      setRecentlyFinished(null);
      try {
        const res = await fetch("/api/admin/content-editor/bulk-jobs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publish_target: input.publishTarget,
            analysis_mode: input.analysisMode,
            lines: input.lines,
          }),
        });
        const data = (await res.json()) as {
          ok?: boolean;
          job?: ContentEditorBulkJob;
          error?: string;
        };
        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? `Failed to start bulk create (${res.status})`);
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
    const res = await fetch(`/api/admin/content-editor/bulk-jobs/${activeJob.id}/cancel`, {
      method: "POST",
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || data.ok === false) {
      throw new Error(data.error ?? "Failed to cancel job.");
    }
    await refresh();
  }, [activeJob, refresh]);

  const dismissFinishedNotice = useCallback(() => {
    if (recentlyFinished) {
      dismissedFinishedIds.current.add(recentlyFinished.id);
    }
    setRecentlyFinished(null);
  }, [recentlyFinished]);

  const value = useMemo(
    () => ({
      activeJob,
      recentlyFinished,
      loading,
      startBulkCreate,
      cancelActiveJob,
      dismissFinishedNotice,
      refresh,
    }),
    [
      activeJob,
      recentlyFinished,
      loading,
      startBulkCreate,
      cancelActiveJob,
      dismissFinishedNotice,
      refresh,
    ],
  );

  return (
    <ContentEditorBulkJobContext.Provider value={value}>
      {children}
    </ContentEditorBulkJobContext.Provider>
  );
}

export function useContentEditorBulkJob(): ContentEditorBulkJobContextValue {
  const ctx = useContext(ContentEditorBulkJobContext);
  if (!ctx) {
    throw new Error("useContentEditorBulkJob must be used within ContentEditorBulkJobProvider");
  }
  return ctx;
}

export function useContentEditorBulkJobOptional(): ContentEditorBulkJobContextValue | null {
  return useContext(ContentEditorBulkJobContext);
}
