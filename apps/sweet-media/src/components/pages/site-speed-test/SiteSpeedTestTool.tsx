"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  SpeedTestResult,
  SpeedTestRecommendation,
  PsiStrategy,
  RecommendationImpact,
} from "@sweetmedia/admin-core";

const LOADING_STEPS = [
  "Connecting to Google PageSpeed…",
  "Running Lighthouse on your URL…",
  "Measuring Core Web Vitals…",
  "Building actionable fixes…",
];

function scoreColor(score: number | null): string {
  if (score == null) return "text-white/50";
  if (score >= 90) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-rose-400";
}

function scoreRingStroke(score: number | null): string {
  if (score == null) return "#64748b";
  if (score >= 90) return "#34d399";
  if (score >= 50) return "#fbbf24";
  return "#fb7185";
}

function formatMs(ms: number | null): string {
  if (ms == null) return "—";
  if (ms >= 1000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.round(ms)}ms`;
}

function formatCls(cls: number | null): string {
  if (cls == null) return "—";
  return cls.toFixed(3);
}

function impactBadge(impact: RecommendationImpact): string {
  switch (impact) {
    case "high":
      return "bg-rose-500/15 text-rose-300 ring-rose-500/30";
    case "medium":
      return "bg-amber-500/15 text-amber-200 ring-amber-500/30";
    default:
      return "bg-white/10 text-white/60 ring-white/15";
  }
}

function categoryIcon(category: SpeedTestRecommendation["category"]): string {
  const map: Record<SpeedTestRecommendation["category"], string> = {
    images: "ri-image-line",
    javascript: "ri-code-s-slash-line",
    fonts: "ri-font-size-2",
    css: "ri-layout-line",
    server: "ri-server-line",
    "third-party": "ri-links-line",
    layout: "ri-drag-move-line",
    caching: "ri-database-2-line",
    other: "ri-lightbulb-line",
  };
  return map[category] ?? "ri-lightbulb-line";
}

function effortLabel(effort: SpeedTestRecommendation["effort"]): string {
  switch (effort) {
    case "quick":
      return "Quick win";
    case "moderate":
      return "Half-day fix";
    default:
      return "Project";
  }
}

function ScoreRing({ score }: { score: number | null }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const pct = score != null ? score / 100 : 0;
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={scoreRingStroke(score)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold tabular-nums ${scoreColor(score)}`}>
          {score ?? "—"}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Performance</span>
      </div>
    </div>
  );
}

function RecommendationCard({ rec }: { rec: SpeedTestRecommendation }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
      <div className="mb-4 flex flex-wrap items-start gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg text-[#9BB8E8]`}
        >
          <i className={categoryIcon(rec.category)} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white">{rec.psiTitle}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/55">{rec.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1 ${impactBadge(rec.impact)}`}
          >
            {rec.impact} impact
          </span>
          <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-medium text-white/50 ring-1 ring-white/10">
            {effortLabel(rec.effort)}
          </span>
        </div>
      </div>
      {rec.savingsLabel && (
        <p className="mb-3 text-xs font-medium text-[#9BB8E8]">
          <i className="ri-timer-line mr-1" aria-hidden />
          PSI estimate: {rec.savingsLabel}
        </p>
      )}
      <ul className="grid gap-2.5">
        {rec.actions.map((action) => (
          <li key={action} className="flex items-start gap-2.5 text-sm text-white/70">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7B9FD4]/25 text-[#9BB8E8]">
              <i className="ri-check-line text-xs" aria-hidden />
            </span>
            {action}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function SiteSpeedTestTool() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<PsiStrategy>("mobile");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SpeedTestResult | null>(null);

  const runTest = async () => {
    setError(null);
    setResult(null);
    setLoading(true);
    setLoadingStep(0);

    const stepTimer = window.setInterval(() => {
      setLoadingStep((s) => Math.min(s + 1, LOADING_STEPS.length - 1));
    }, 8000);

    try {
      const res = await fetch("/api/site-speed-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, strategy }),
      });
      const data = (await res.json()) as { result?: SpeedTestResult; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Test failed. Please try again.");
      }
      if (data.result?.error && data.result.metrics.performance === null) {
        throw new Error(data.result.error);
      }
      setResult(data.result ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      window.clearInterval(stepTimer);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 md:p-8 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <label htmlFor="speed-url" className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 mb-3">
          Website URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="speed-url"
            type="url"
            inputMode="url"
            placeholder="https://yourtreatmentcenter.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#7B9FD4]/60 focus:ring-2 focus:ring-[#7B9FD4]/20 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={runTest}
            disabled={loading || !url.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1F44] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin text-lg" aria-hidden />
                Testing…
              </>
            ) : (
              <>
                <i className="ri-speed-line text-lg" aria-hidden />
                Run test
              </>
            )}
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 mr-1">Device</span>
          {(["mobile", "desktop"] as const).map((s) => (
            <button
              key={s}
              type="button"
              disabled={loading}
              onClick={() => setStrategy(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                strategy === s
                  ? "bg-[#7B9FD4]/30 text-white ring-1 ring-[#7B9FD4]/50"
                  : "bg-white/8 text-white/50 hover:text-white/80 ring-1 ring-white/10"
              }`}
            >
              {s === "mobile" ? "Mobile" : "Desktop"}
            </button>
          ))}
        </div>

        {loading && (
          <p className="mt-4 text-sm text-white/50 animate-pulse">{LOADING_STEPS[loadingStep]}</p>
        )}
        {error && (
          <p className="mt-4 rounded-lg bg-rose-500/15 border border-rose-500/25 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        )}
      </div>

      {result && (
        <div className="mt-10 space-y-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">Results for</p>
            <p className="text-sm text-white/70 break-all mb-6">{result.url}</p>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <ScoreRing score={result.metrics.performance} />
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {[
                  { label: "LCP", value: formatMs(result.metrics.lcp_ms), hint: "Largest paint" },
                  { label: "FCP", value: formatMs(result.metrics.fcp_ms), hint: "First paint" },
                  { label: "TBT", value: formatMs(result.metrics.tbt_ms), hint: "Main-thread block" },
                  { label: "CLS", value: formatCls(result.metrics.cls), hint: "Layout shift" },
                  { label: "Speed Index", value: formatMs(result.metrics.speed_index_ms), hint: "Visual progress" },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/8">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">{m.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white tabular-nums">{m.value}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{m.hint}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-white/35 leading-relaxed">
              Scores come from Google PageSpeed Insights (Lighthouse). Lab data can differ from real-user
              Chrome UX Report field data. Re-test after each fix.
            </p>
          </div>

          {result.recommendations.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Recommended fixes</h2>
              <p className="text-sm text-white/50 mb-6 max-w-2xl">
                Prioritized by impact. These are practical changes treatment-center and WordPress sites
                commonly ship in a day or less — not theoretical audits.
              </p>
              <div className="grid gap-4">
                {result.recommendations.map((rec) => (
                  <RecommendationCard key={rec.id} rec={rec} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-white/50">
              No major opportunities flagged — nice work. Consider testing the other device profile or
              a key landing page URL.
            </p>
          )}

          <div className="rounded-2xl border border-[#7B9FD4]/25 bg-[#7B9FD4]/10 p-6 md:p-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Want a 90+ PageSpeed site?</h3>
            <p className="text-sm text-white/55 mb-5 max-w-md mx-auto">
              We rebuild behavioral health websites on Next.js with AVIF images, edge hosting, and
              Core Web Vitals baked in from day one.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/web-dev"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#0A1F44] hover:bg-white/90 transition"
              >
                Web development
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                Free strategy call
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
