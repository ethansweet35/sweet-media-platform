"use client";

import { useCallback, useEffect, useState } from "react";
import type { MarketingReportPayload } from "../types/marketing";

export function useMarketingOverview(days = 28) {
  const [data, setData] = useState<MarketingReportPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/marketing-overview?days=${days}`, {
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }
      const json = (await res.json()) as MarketingReportPayload;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load marketing data.");
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
