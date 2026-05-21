"use client";

import { useCallback, useEffect, useState } from "react";
import type { PerformanceOverviewPayload } from "../types/performance-overview";

export function usePerformanceOverview(days = 28) {
  const [data, setData] = useState<PerformanceOverviewPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/performance-overview?days=${days}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }
      const json = (await res.json()) as PerformanceOverviewPayload;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load performance data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void fetchOverview();
  }, [fetchOverview]);

  return { data, loading, error, refetch: fetchOverview };
}
