"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReportShareRow } from "../types/marketing";

export function useReportShares() {
  const [shares, setShares] = useState<ReportShareRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/report-shares", { credentials: "include" });
      const json = (await res.json()) as { shares?: ReportShareRow[]; error?: string };
      if (!res.ok) throw new Error(json.error ?? `Request failed (${res.status})`);
      setShares(json.shares ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load share links.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const createShare = useCallback(
    async (input: { label?: string; period_days?: number }) => {
      const res = await fetch("/api/admin/report-shares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      });
      const json = (await res.json()) as { share?: ReportShareRow; error?: string };
      if (!res.ok || !json.share) throw new Error(json.error ?? "Failed to create link");
      await refetch();
      return json.share;
    },
    [refetch],
  );

  const updateShare = useCallback(
    async (id: string, patch: { label?: string; period_days?: number; is_active?: boolean }) => {
      const res = await fetch(`/api/admin/report-shares/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(patch),
      });
      const json = (await res.json()) as { share?: ReportShareRow; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to update link");
      await refetch();
      return json.share;
    },
    [refetch],
  );

  const deleteShare = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/admin/report-shares/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? "Failed to delete link");
      }
      await refetch();
    },
    [refetch],
  );

  return { shares, loading, error, refetch, createShare, updateShare, deleteShare };
}
