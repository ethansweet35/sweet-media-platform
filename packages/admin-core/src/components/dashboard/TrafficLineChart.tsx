"use client";

import { useMemo, useState } from "react";
import { ADMIN_ACCENT, ADMIN_NAVY, ADMIN_TEXT_MUTED } from "../../lib/adminTheme";

export type TrafficDailyPoint = {
  date: string;
  clicks: number;
  impressions: number;
};

type MetricKey = "clicks" | "impressions";

const METRIC_LABEL: Record<MetricKey, string> = {
  clicks: "Clicks",
  impressions: "Impressions",
};

function fmtAxisDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
      new Date(iso + "T12:00:00"),
    );
  } catch {
    return iso;
  }
}

export default function TrafficLineChart({
  daily,
  periodLabel,
}: {
  daily: TrafficDailyPoint[];
  periodLabel: string;
}) {
  const [metric, setMetric] = useState<MetricKey>("clicks");

  const { pathD, areaD, points, maxVal, width, height, pad } = useMemo(() => {
    const w = 720;
    const h = 220;
    const p = { top: 16, right: 12, bottom: 28, left: 48 };
    const innerW = w - p.left - p.right;
    const innerH = h - p.top - p.bottom;

    if (daily.length < 2) {
      return {
        pathD: "",
        areaD: "",
        points: [] as { x: number; y: number; date: string; value: number }[],
        maxVal: 1,
        width: w,
        height: h,
        pad: p,
      };
    }

    const values = daily.map((d) => (metric === "clicks" ? d.clicks : d.impressions));
    const max = Math.max(...values, 1);
    const step = innerW / (daily.length - 1);

    const pts = daily.map((d, i) => {
      const value = metric === "clicks" ? d.clicks : d.impressions;
      const x = p.left + i * step;
      const y = p.top + innerH - (value / max) * (innerH - 8) - 4;
      return { x, y, date: d.date, value };
    });

    const line = pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ");
    const baseline = p.top + innerH;
    const area =
      `${line} L ${pts[pts.length - 1]?.x ?? p.left} ${baseline} L ${pts[0]?.x ?? p.left} ${baseline} Z`;

    return { pathD: line, areaD: area, points: pts, maxVal: max, width: w, height: h, pad: p };
  }, [daily, metric]);

  if (daily.length < 2) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#94A3B8]">
        Not enough daily data yet — check back after Search Console syncs.
      </div>
    );
  }

  const yTicks = [0, 0.5, 1].map((t) => Math.round(maxVal * t));

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94A3B8]">
            Organic traffic · {periodLabel}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: ADMIN_TEXT_MUTED }}>
            Google Search Console · final data (3-day lag)
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-[#E2E8F0] bg-white p-0.5">
          {(["clicks", "impressions"] as MetricKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMetric(key)}
              className={`rounded-md px-3 py-1.5 text-[11px] font-semibold transition ${
                metric === key ? "text-white shadow-sm" : "text-[#64748B] hover:bg-[#F1F5F9]"
              }`}
              style={metric === key ? { backgroundColor: ADMIN_NAVY } : undefined}
            >
              {METRIC_LABEL[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[320px] max-w-full"
          role="img"
          aria-label={`${METRIC_LABEL[metric]} over time`}
        >
          <defs>
            <linearGradient id="traffic-area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ADMIN_ACCENT} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ADMIN_ACCENT} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {yTicks.map((tick, i) => {
            const y =
              pad.top +
              (height - pad.top - pad.bottom) -
              (tick / maxVal) * (height - pad.top - pad.bottom - 8) -
              4;
            return (
              <g key={i}>
                <line
                  x1={pad.left}
                  x2={width - pad.right}
                  y1={y}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeDasharray={i === 0 ? undefined : "4 4"}
                />
                <text x={pad.left - 8} y={y + 4} textAnchor="end" className="fill-[#94A3B8] text-[9px]">
                  {tick >= 1000 ? `${(tick / 1000).toFixed(tick >= 10000 ? 0 : 1)}k` : tick}
                </text>
              </g>
            );
          })}

          <path d={areaD} fill="url(#traffic-area-fill)" />
          <path
            d={pathD}
            fill="none"
            stroke={ADMIN_ACCENT}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {points.map((pt, i) => {
            if (i % Math.ceil(points.length / 6) !== 0 && i !== points.length - 1) return null;
            return (
              <text
                key={pt.date}
                x={pt.x}
                y={height - 6}
                textAnchor="middle"
                className="fill-[#94A3B8] text-[9px]"
              >
                {fmtAxisDate(pt.date)}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
