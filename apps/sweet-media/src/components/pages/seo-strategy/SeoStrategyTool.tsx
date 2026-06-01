"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type {
  SeoStrategyResult,
  SeoStrategyReport,
  SeoStrategyInsightItem,
  SeoStrategyImpact,
  SeoStrategyEffort,
} from "@sweetmedia/admin-core";

const LOADING_STEPS = [
  "Pulling Semrush organic snapshot…",
  "Mapping competitors & keyword gaps…",
  "Crawling your site structure…",
  "Running PageSpeed technical check…",
  "AI strategist writing your report…",
];

type ReportTab =
  | "overview"
  | "cro"
  | "structure"
  | "keywords"
  | "technical"
  | "competitors"
  | "roadmap";

const TABS: { id: ReportTab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
  { id: "cro", label: "Conversion", icon: "ri-user-heart-line" },
  { id: "structure", label: "Structure", icon: "ri-node-tree" },
  { id: "keywords", label: "Keywords", icon: "ri-key-2-line" },
  { id: "technical", label: "Technical", icon: "ri-tools-line" },
  { id: "competitors", label: "Competitors", icon: "ri-group-line" },
  { id: "roadmap", label: "Roadmap", icon: "ri-route-line" },
];

const SCORECARD_META: Record<
  keyof SeoStrategyReport["scorecard"],
  { label: string; icon: string }
> = {
  organicVisibility: { label: "Organic visibility", icon: "ri-search-eye-line" },
  contentOpportunity: { label: "Content opportunity", icon: "ri-file-add-line" },
  technicalHealth: { label: "Technical health", icon: "ri-speed-line" },
  conversionReadiness: { label: "Conversion readiness", icon: "ri-phone-line" },
};

function impactStyles(impact: SeoStrategyImpact): {
  badge: string;
  dot: string;
  border: string;
} {
  switch (impact) {
    case "high":
      return {
        badge: "bg-rose-500/20 text-rose-200 ring-rose-400/40",
        dot: "bg-rose-400",
        border: "border-rose-500/25",
      };
    case "medium":
      return {
        badge: "bg-amber-500/20 text-amber-100 ring-amber-400/35",
        dot: "bg-amber-400",
        border: "border-amber-500/25",
      };
    default:
      return {
        badge: "bg-white/10 text-white/60 ring-white/20",
        dot: "bg-white/40",
        border: "border-white/15",
      };
  }
}

function effortLabel(effort: SeoStrategyEffort): string {
  switch (effort) {
    case "quick":
      return "Quick win";
    case "moderate":
      return "Half day";
    default:
      return "Project";
  }
}

/** Split long recommendation strings into scannable action lines. */
function toActionBullets(text: string): string[] {
  const parts = text
    .split(/[;•]|\n+/)
    .map((s) => s.replace(/^\s*[-–]\s*/, "").trim())
    .filter((s) => s.length > 8);
  if (parts.length > 1) return parts.slice(0, 4);
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);
  return sentences.length > 1 ? sentences.slice(0, 3) : [text];
}

function parseScoreGrade(text: string): { grade: string; detail: string; tone: "good" | "fair" | "weak" } {
  const dash = text.split(/\s*[—–-]\s+/);
  const grade = (dash[0] ?? text).trim().slice(0, 24);
  const detail = (dash.slice(1).join(" — ") || text).trim();
  const g = grade.toLowerCase();
  const tone =
    /strong|good|solid|great|healthy/i.test(g)
      ? "good"
      : /weak|poor|low|critical|bad/i.test(g)
        ? "weak"
        : "fair";
  return { grade, detail, tone };
}

function toneStyles(tone: "good" | "fair" | "weak"): string {
  switch (tone) {
    case "good":
      return "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30";
    case "weak":
      return "bg-rose-500/15 text-rose-300 ring-rose-500/30";
    default:
      return "bg-amber-500/15 text-amber-200 ring-amber-500/30";
  }
}

function ScoreRing({
  value,
  label,
  max = 100,
}: {
  value: number;
  label: string;
  max?: number;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = value >= 90 ? "#34d399" : value >= 50 ? "#fbbf24" : "#fb7185";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[88px] w-[88px]">
        <svg width="88" height="88" className="-rotate-90">
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="44"
            cy="44"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-white">{value}</span>
          {max === 100 && <span className="text-[9px] text-white/40">/100</span>}
        </div>
      </div>
      <p className="text-[10px] uppercase tracking-widest text-white/45 text-center">{label}</p>
    </div>
  );
}

function MetricTiles({ result }: { result: SeoStrategyResult }) {
  const { snapshot } = result;
  const speed = snapshot.psi?.performance;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {snapshot.organicKeywordCount != null && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-center">
          <i className="ri-key-2-line text-2xl text-[#7B9FD4] mb-2" aria-hidden />
          <p className="text-2xl font-bold text-white tabular-nums">
            {snapshot.organicKeywordCount.toLocaleString()}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Organic keywords</p>
        </div>
      )}
      {snapshot.organicTrafficEstimate != null && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-center">
          <i className="ri-line-chart-line text-2xl text-[#7B9FD4] mb-2" aria-hidden />
          <p className="text-2xl font-bold text-white tabular-nums">
            {snapshot.organicTrafficEstimate.toLocaleString()}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Est. visits/mo</p>
        </div>
      )}
      {speed != null && (
        <div className="relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="relative">
            <ScoreRing value={speed} label="Mobile speed" />
          </div>
        </div>
      )}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-center">
        <i className="ri-pages-line text-2xl text-[#7B9FD4] mb-2" aria-hidden />
        <p className="text-2xl font-bold text-white tabular-nums">
          {snapshot.siteCrawl.internalPaths.length || snapshot.siteCrawl.sitemapPathCount || "—"}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Pages mapped</p>
      </div>
    </div>
  );
}

function ScorecardGrid({ report }: { report: SeoStrategyReport }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.entries(report.scorecard) as [keyof typeof report.scorecard, string][]).map(
        ([key, value]) => {
          const meta = SCORECARD_META[key];
          const parsed = parseScoreGrade(value);
          return (
            <div
              key={key}
              className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#7B9FD4]/15 text-[#9BB8E8]">
                <i className={`${meta.icon} text-lg`} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="text-xs font-semibold text-white">{meta.label}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${toneStyles(parsed.tone)}`}
                  >
                    {parsed.grade}
                  </span>
                </div>
                <p className="text-sm text-white/55 leading-snug">{parsed.detail}</p>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}

function InsightCard({ item, index }: { item: SeoStrategyInsightItem; index: number }) {
  const styles = impactStyles(item.impact);
  const actions = toActionBullets(item.recommendation);

  return (
    <li
      className={`rounded-xl border bg-white/[0.04] p-4 md:p-5 ${styles.border}`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#0A1F44] ${styles.dot}`}
        >
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${styles.badge}`}
            >
              {item.impact}
            </span>
            <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] text-white/45 ring-1 ring-white/10">
              {effortLabel(item.effort)}
            </span>
          </div>
          <p className="text-sm text-white/50 mb-3 flex gap-2">
            <i className="ri-information-line text-[#7B9FD4] shrink-0 mt-0.5" aria-hidden />
            <span>{item.finding}</span>
          </p>
          <div className="rounded-lg bg-[#0A1F44]/60 border border-[#7B9FD4]/20 px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9BB8E8] font-semibold mb-2">
              Actions
            </p>
            <ul className="space-y-1.5">
              {actions.map((action) => (
                <li key={action} className="flex gap-2 text-sm text-white/85 leading-snug">
                  <i className="ri-arrow-right-s-line text-emerald-400 shrink-0 mt-0.5" aria-hidden />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}

function SectionPanel({
  icon,
  title,
  summary,
  items,
  extra,
}: {
  icon: string;
  title: string;
  summary: string;
  items: SeoStrategyInsightItem[];
  extra?: React.ReactNode;
}) {
  const highCount = items.filter((i) => i.impact === "high").length;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7B9FD4]/15 text-[#9BB8E8]">
          <i className={`${icon} text-xl`} aria-hidden />
        </span>
        <div>
          <h3
            className="text-xl font-semibold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {title}
          </h3>
          {summary && <p className="mt-1 text-sm text-white/50 max-w-2xl">{summary}</p>}
          {highCount > 0 && (
            <p className="mt-2 text-xs text-rose-300/90">
              <i className="ri-error-warning-line mr-1" aria-hidden />
              {highCount} high-priority {highCount === 1 ? "item" : "items"} below
            </p>
          )}
        </div>
      </div>
      <ul className="space-y-3">{items.map((item, i) => (
        <InsightCard key={`${item.title}-${i}`} item={item} index={i} />
      ))}</ul>
      {extra}
    </div>
  );
}

function TopKeywordsTable({ result }: { result: SeoStrategyResult }) {
  const keywords = result.snapshot.topKeywords.slice(0, 8);
  if (!keywords.length) return null;
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold px-4 py-3 bg-white/5 border-b border-white/10">
        Top ranking keywords (Semrush)
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-widest text-white/35">
              <th className="px-4 py-2 font-semibold">Keyword</th>
              <th className="px-4 py-2 font-semibold">Pos</th>
              <th className="px-4 py-2 font-semibold">Volume</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((k) => (
              <tr key={k.phrase} className="border-t border-white/5 text-white/75">
                <td className="px-4 py-2.5 font-medium text-white">{k.phrase}</td>
                <td className="px-4 py-2.5 tabular-nums">#{k.position}</td>
                <td className="px-4 py-2.5 tabular-nums">{k.searchVolume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportResults({ result }: { result: SeoStrategyResult }) {
  const report = result.report!;
  const [tab, setTab] = useState<ReportTab>("overview");

  const priorityCount = useMemo(() => {
    const sections = [
      report.cro,
      report.siteStructure,
      report.keywordGaps,
      report.technical,
      report.competitorInsights,
    ];
    return sections.reduce((n, s) => n + s.items.filter((i) => i.impact === "high").length, 0);
  }, [report]);

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#9BB8E8] font-semibold">
            Your audit
          </p>
          <p className="text-sm text-white/50 truncate max-w-md">{result.snapshot.domain}</p>
        </div>
        {priorityCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1.5 text-xs font-semibold text-rose-200 ring-1 ring-rose-500/30">
            <i className="ri-flag-line" aria-hidden />
            {priorityCount} priorities to address
          </span>
        )}
      </div>

      <MetricTiles result={result} />

      <nav
        className="mt-8 flex gap-1 overflow-x-auto pb-1 scrollbar-none"
        aria-label="Report sections"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors cursor-pointer ${
              tab === t.id
                ? "bg-white text-[#0A1F44]"
                : "bg-white/8 text-white/55 hover:bg-white/12 hover:text-white"
            }`}
          >
            <i className={`${t.icon} text-sm`} aria-hidden />
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d2848]/90 p-5 md:p-8 min-h-[280px]">
        {tab === "overview" && (
          <div className="space-y-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#9BB8E8] font-semibold mb-3">
                The big picture
              </p>
              <p className="text-lg text-white leading-relaxed">{report.executiveSummary}</p>
            </div>
            <ScorecardGrid report={report} />
            {report.prioritizedRoadmap.thisWeek.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/90 font-semibold mb-3">
                  Start here this week
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {report.prioritizedRoadmap.thisWeek.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2.5 text-sm text-white/85"
                    >
                      <i className="ri-flashlight-line text-emerald-400 shrink-0 mt-0.5" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <TopKeywordsTable result={result} />
          </div>
        )}

        {tab === "cro" && (
          <SectionPanel
            icon="ri-user-heart-line"
            title={report.cro.title}
            summary={report.cro.summary}
            items={report.cro.items}
          />
        )}

        {tab === "structure" && (
          <SectionPanel
            icon="ri-node-tree"
            title={report.siteStructure.title}
            summary={report.siteStructure.summary}
            items={report.siteStructure.items}
            extra={
              report.siteStructure.suggestedHierarchy.length > 0 ? (
                <div className="rounded-xl border border-dashed border-[#7B9FD4]/30 bg-[#7B9FD4]/8 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold mb-3">
                    Suggested site map
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {report.siteStructure.suggestedHierarchy.map((h) => (
                      <li
                        key={h}
                        className="flex gap-2 text-sm text-white/80 rounded-lg bg-white/5 px-3 py-2"
                      >
                        <i className="ri-folder-line text-[#7B9FD4] shrink-0" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            }
          />
        )}

        {tab === "keywords" && (
          <SectionPanel
            icon="ri-key-2-line"
            title={report.keywordGaps.title}
            summary={report.keywordGaps.summary}
            items={report.keywordGaps.items}
            extra={
              report.keywordGaps.contentIdeas.length > 0 ? (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold mb-3">
                    Content to create
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {report.keywordGaps.contentIdeas.map((idea) => (
                      <span
                        key={idea}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/10"
                      >
                        <i className="ri-article-line text-[#7B9FD4]" aria-hidden />
                        {idea}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            }
          />
        )}

        {tab === "technical" && (
          <SectionPanel
            icon="ri-tools-line"
            title={report.technical.title}
            summary={report.technical.summary}
            items={report.technical.items}
            extra={
              result.snapshot.psi?.topIssues.length ? (
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-amber-200/90 font-semibold mb-2">
                    PageSpeed flagged
                  </p>
                  <ul className="space-y-1">
                    {result.snapshot.psi.topIssues.map((issue) => (
                      <li key={issue} className="text-sm text-white/70 flex gap-2">
                        <i className="ri-alert-line text-amber-400 shrink-0" aria-hidden />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            }
          />
        )}

        {tab === "competitors" && (
          <SectionPanel
            icon="ri-group-line"
            title={report.competitorInsights.title}
            summary={report.competitorInsights.summary}
            items={report.competitorInsights.items}
            extra={
              result.snapshot.competitors.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-3">
                  {result.snapshot.competitors.slice(0, 3).map((c) => (
                    <div
                      key={c.domain}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-center"
                    >
                      <p className="text-sm font-semibold text-white truncate">{c.domain}</p>
                      <p className="text-xs text-white/45 mt-1">
                        {c.commonKeywords.toLocaleString()} shared keywords
                      </p>
                    </div>
                  ))}
                </div>
              ) : null
            }
          />
        )}

        {tab === "roadmap" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-semibold mb-4 flex items-center gap-2">
                <i className="ri-calendar-check-line" aria-hidden />
                This week
              </p>
              <ul className="space-y-3">
                {report.prioritizedRoadmap.thisWeek.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-sm font-bold text-emerald-200">
                      {i + 1}
                    </span>
                    <span className="text-sm text-white/85 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#9BB8E8] font-semibold mb-4 flex items-center gap-2">
                <i className="ri-calendar-line" aria-hidden />
                This month
              </p>
              <ul className="space-y-3">
                {report.prioritizedRoadmap.thisMonth.map((item, i) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7B9FD4]/20 text-sm font-bold text-[#9BB8E8]">
                      {i + 1}
                    </span>
                    <span className="text-sm text-white/85 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {report.dataSourcesNote && (
        <p className="mt-4 text-xs text-white/30 text-center">{report.dataSourcesNote}</p>
      )}

      <div className="text-center pt-10">
        <p className="text-sm text-white/50 mb-4">Want help implementing this plan?</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white text-[#0A1F44] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] hover:bg-white/90 transition-colors"
        >
          Book a free strategy call
          <i className="ri-arrow-right-line" aria-hidden />
        </Link>
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
      const controller = new AbortController();
      const clientTimeout = window.setTimeout(() => controller.abort(), 280_000);
      const res = await fetch("/api/seo-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, competitors: competitorList }),
        signal: controller.signal,
      });
      clearTimeout(clientTimeout);
      const json = (await res.json()) as { error?: string; result?: SeoStrategyResult };
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      if (json.result) setResult(json.result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /aborted|timeout/i.test(msg)
          ? "The audit timed out before it could finish. Please try again in a moment."
          : "Network error. Check your connection and try again.",
      );
    } finally {
      clearInterval(stepTimer);
      setLoading(false);
    }
  }

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

      {result?.report && <ReportResults result={result} />}
    </div>
  );
}
