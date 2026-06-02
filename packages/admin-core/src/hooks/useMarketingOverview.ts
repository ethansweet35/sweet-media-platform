"use client";

import { useCallback, useEffect, useState } from "react";
import type { MarketingPeriodId, MarketingReportPayload } from "../types/marketing";

export function useMarketingOverview(period: MarketingPeriodId = "last_7_days") {
  const [data, setData] = useState<MarketingReportPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverview = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/marketing-overview?period=${encodeURIComponent(period)}`, {
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
  }, [period]);

  useEffect(() => {
    void fetchOverview();
  }, [fetchOverview]);

  return { data, loading, error, refetch: fetchOverview };
}
