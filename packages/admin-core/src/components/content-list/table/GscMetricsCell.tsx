"use client";

import type { GscMetrics } from "../../../hooks/useSearchConsoleData";
import type { ContentEntityType } from "../../../lib/contentChangeLog";
import SeoImpactTimelinePopover from "../../SeoImpactTimelinePopover";

export type GscMetricsCellSeoImpact = {
  entityType: ContentEntityType;
  entityId: string;
  pageUrl: string;
};

export default function GscMetricsCell({
  metrics,
  loading,
  seoImpact,
}: {
  metrics?: GscMetrics;
  loading?: boolean;
  seoImpact?: GscMetricsCellSeoImpact;
}) {
  const metricsBody = loading ? (
    <span className="text-[11px] text-[#CBD5E1]">…</span>
  ) : !metrics ? (
    <span className="text-[11px] text-[#CBD5E1]">—</span>
  ) : (
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

  if (!seoImpact) return metricsBody;

  return (
    <div className="flex items-start gap-1.5">
      <SeoImpactTimelinePopover
        entityType={seoImpact.entityType}
        entityId={seoImpact.entityId}
        pageUrl={seoImpact.pageUrl}
      >
        <button
          type="button"
          title="SEO change timeline & traffic impact"
          className="mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded text-[#94A3B8] transition-all hover:bg-[#0A1F44]/10 hover:text-[#0A1F44]"
        >
          <i className="ri-pulse-line text-[12px]" />
        </button>
      </SeoImpactTimelinePopover>
      {metricsBody}
    </div>
  );
}
