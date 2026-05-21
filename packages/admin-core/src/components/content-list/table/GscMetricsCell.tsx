"use client";

import type { GscMetrics } from "../../../hooks/useSearchConsoleData";

export default function GscMetricsCell({
  metrics,
  loading,
}: {
  metrics?: GscMetrics;
  loading?: boolean;
}) {
  if (loading) return <span className="text-[11px] text-[#CBD5E1]">…</span>;
  if (!metrics) return <span className="text-[11px] text-[#CBD5E1]">—</span>;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] font-semibold text-[#0A1F44]" title="Clicks">
        {metrics.clicks.toLocaleString()}{" "}
        <span className="text-[10px] font-normal text-[#94A3B8]">clk</span>
      </span>
      <span className="text-[11px] text-[#64748B]" title="Impressions">
        {metrics.impressions.toLocaleString()}{" "}
        <span className="text-[10px] text-[#94A3B8]">imp</span>
      </span>
      <span className="text-[10px] text-[#94A3B8]" title={`Avg position: ${metrics.position.toFixed(1)}`}>
        pos {metrics.position.toFixed(1)}
      </span>
    </div>
  );
}
