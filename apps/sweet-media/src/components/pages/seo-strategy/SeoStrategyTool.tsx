"use client";

import { useState } from "react";
import Link from "next/link";
import type {
  SeoStrategyResult,
  SeoStrategyReport,
  SeoStrategyInsightItem,
  SeoStrategyImpact,
} from "@sweetmedia/admin-core";

const LOADING_STEPS = [
  "Pulling Semrush organic snapshot…",
  "Mapping competitors & keyword gaps…",
  "Crawling your site structure…",
  "Running PageSpeed technical check…",
  "AI strategist writing your report…",
];

function impactBadge(impact: SeoStrategyImpact): string {
  switch (impact) {
    case "high":
      return "bg-rose-500/15 text-rose-300 ring-rose-500/30";
    case "medium":
      return "bg-amber-500/15 text-amber-200 ring-amber-500/30";
    default:
      return "bg-white/10 text-white/60 ring-white/15";
  }
}

function InsightList({ items }: { items: SeoStrategyInsightItem[] }) {
  if (!items.length) return null;
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li
          key={`${item.title}-${i}`}
          className="rounded-xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${impactBadge(item.impact)}`}
            >
              {item.impact} impact
            </span>
          </div>
          <p className="text-sm text-white/55 leading-relaxed mb-2">{item.finding}</p>
          <p className="text-sm text-[#9BB8E8] leading-relaxed">
            <span className="font-semibold text-white/70">Do this: </span>
            {item.recommendation}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ReportSection({
  report,
  sectionKey,
}: {
  report: SeoStrategyReport;
  sectionKey: keyof Pick<
    SeoStrategyReport,
    "cro" | "siteStructure" | "keywordGaps" | "technical" | "competitorInsights"
  >;
}) {
  const section = report[sectionKey];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d2848]/80 p-6 md:p-8">
      <h3
        className="text-xl font-semibold text-white mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {section.title}
      </h3>
      {section.summary && (
        <p className="text-sm text-white/55 leading-relaxed mb-5">{section.summary}</p>
      )}
      <InsightList items={section.items} />
      {sectionKey === "siteStructure" && "suggestedHierarchy" in section && section.suggestedHierarchy.length > 0 && (
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold mb-3">
            Suggested hierarchy
          </p>
          <ul className="space-y-2">
            {section.suggestedHierarchy.map((h) => (
              <li key={h} className="text-sm text-white/70 flex gap-2">
                <i className="ri-node-tree text-[#7B9FD4] shrink-0 mt-0.5" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
      {sectionKey === "keywordGaps" && "contentIdeas" in section && section.contentIdeas.length > 0 && (
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold mb-3">
            Content ideas
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {section.contentIdeas.map((idea) => (
              <li
                key={idea}
                className="rounded-lg bg-white/5 px-4 py-3 text-sm text-white/75 ring-1 ring-white/10"
              >
                {idea}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function SnapshotStats({ result }: { result: SeoStrategyResult }) {
  const { snapshot } = result;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {snapshot.organicKeywordCount != null && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Organic keywords</p>
          <p className="text-2xl font-bold text-white">
            {snapshot.organicKeywordCount.toLocaleString()}
          </p>
        </div>
      )}
      {snapshot.organicTrafficEstimate != null && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Est. traffic/mo</p>
          <p className="text-2xl font-bold text-white">
            {snapshot.organicTrafficEstimate.toLocaleString()}
          </p>
        </div>
      )}
      {snapshot.psi?.performance != null && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Mobile speed</p>
          <p className="text-2xl font-bold text-white">{snapshot.psi.performance}/100</p>
        </div>
      )}
      <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Pages mapped</p>
        <p className="text-2xl font-bold text-white">
          {snapshot.siteCrawl.internalPaths.length || snapshot.siteCrawl.sitemapPathCount || "—"}
        </p>
      </div>
    </div>
  );
}

export default function SeoStrategyTool() {
  const [url, setUrl] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SeoStrategyResult | null>(null);

  async function runAnalysis() {
    setError(null);
    setResult(null);
    setLoading(true);
    setStepIndex(0);

    const stepTimer = window.setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, LOADING_STEPS.length - 1));
    }, 4500);

    const competitorList = competitors
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/seo-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, competitors: competitorList }),
      });
      const json = (await res.json()) as { error?: string; result?: SeoStrategyResult };
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (json.result) setResult(json.result);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      clearInterval(stepTimer);
      setLoading(false);
    }
  }

  const report = result?.report;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-2xl">
        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-2">
          Website URL
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://yourtreatmentcenter.com"
          className="w-full rounded-xl border border-white/15 bg-[#0A1F44] px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#7B9FD4]/50 mb-4"
          disabled={loading}
        />
        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-semibold mb-2">
          Competitors (optional, up to 2)
        </label>
        <input
          type="text"
          value={competitors}
          onChange={(e) => setCompetitors(e.target.value)}
          placeholder="competitor1.com, competitor2.com"
          className="w-full rounded-xl border border-white/15 bg-[#0A1F44] px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#7B9FD4]/50 mb-2"
          disabled={loading}
        />
        <p className="text-xs text-white/40 mb-6">
          Leave blank and we&apos;ll use Semrush organic competitors for your domain.
        </p>
        <button
          type="button"
          onClick={() => void runAnalysis()}
          disabled={loading || !url.trim()}
          className="w-full rounded-xl bg-white text-[#0A1F44] py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Building your strategy…" : "Run SEO strategy audit"}
        </button>
        {loading && (
          <p className="mt-4 text-center text-sm text-[#9BB8E8] animate-pulse">
            {LOADING_STEPS[stepIndex]}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm text-rose-300" role="alert">
            {error}
          </p>
        )}
      </div>

      {result && report && (
        <div className="mt-12 space-y-8">
          <SnapshotStats result={result} />

          <div className="rounded-2xl border border-[#7B9FD4]/35 bg-gradient-to-br from-[#7B9FD4]/15 to-transparent p-6 md:p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9BB8E8] font-semibold mb-3">
              Executive summary
            </p>
            <p className="text-lg text-white leading-relaxed">{report.executiveSummary}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {Object.entries(report.scorecard).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-sm text-white/75 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <ReportSection report={report} sectionKey="cro" />
          <ReportSection report={report} sectionKey="siteStructure" />
          <ReportSection report={report} sectionKey="keywordGaps" />
          <ReportSection report={report} sectionKey="technical" />
          <ReportSection report={report} sectionKey="competitorInsights" />

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h3
              className="text-xl font-semibold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prioritized roadmap
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/90 font-semibold mb-3">
                  This week
                </p>
                <ul className="space-y-2">
                  {report.prioritizedRoadmap.thisWeek.map((item) => (
                    <li key={item} className="text-sm text-white/70 flex gap-2">
                      <i className="ri-checkbox-circle-line text-emerald-400 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold mb-3">
                  This month
                </p>
                <ul className="space-y-2">
                  {report.prioritizedRoadmap.thisMonth.map((item) => (
                    <li key={item} className="text-sm text-white/70 flex gap-2">
                      <i className="ri-arrow-right-circle-line text-[#7B9FD4] shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {report.dataSourcesNote && (
            <p className="text-xs text-white/35 text-center leading-relaxed">
              {report.dataSourcesNote}
            </p>
          )}

          <div className="text-center pt-4">
            <p className="text-sm text-white/50 mb-4">
              Want a human strategist to implement this roadmap?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0A1F44] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] hover:bg-white/90 transition-colors"
            >
              Book a free strategy call
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
            <span className="mx-3 text-white/25">·</span>
            <Link
              href="/site-speed-test"
              className="text-sm text-[#9BB8E8] hover:text-white transition-colors"
            >
              Run site speed test
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
