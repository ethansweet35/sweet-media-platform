"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/feature/SiteHeader";
import Footer from "@/components/pages/home/components/Footer";

const heroStats = [
  { val: "30×", label: "Ad Spend Scaled", icon: "ri-rocket-line", color: "text-emerald-600", bg: "bg-emerald-50" },
  { val: "↓67%", label: "CPA Reduction", icon: "ri-arrow-down-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/6" },
  { val: "$115", label: "Avg CPA at Scale", icon: "ri-price-tag-3-line", color: "text-amber-600", bg: "bg-amber-50" },
  { val: "4 Mo.", label: "Time to Results", icon: "ri-calendar-check-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/6" },
];

const services = [
  "Google Ads Campaign Architecture",
  "Bing Ads Management",
  "Meta Ads Strategy",
  "Landing Page Strategy",
  "Geographic Targeting",
  "Keyword Match Type Testing",
  "Conversion Tracking & Attribution",
  "CPA & VOB Optimization",
];

const challenges = [
  {
    icon: "ri-funds-line",
    title: "High Cost Per Acquisition",
    desc: "At campaign start, Rize OC was averaging ~$350 CPA — leaving significant room to improve efficiency before scaling spend.",
  },
  {
    icon: "ri-layout-line",
    title: "Generic Campaign Structure",
    desc: "Campaigns were too broad, sending all traffic to general pages regardless of what the user was searching for, hurting relevance and conversion rates.",
  },
  {
    icon: "ri-map-pin-line",
    title: "No Geographic Segmentation",
    desc: "In-state and out-of-state traffic was mixed together, making it impossible to optimize budget allocation by market performance.",
  },
  {
    icon: "ri-global-line",
    title: "Single-Channel Dependency",
    desc: "The account relied solely on Google Ads with no Bing or Meta presence, limiting reach and leaving high-intent audiences untapped.",
  },
];

const strategyItems = [
  {
    icon: "ri-search-2-line",
    title: "Intent-Based Campaign Segmentation",
    body: "Instead of broad campaigns for generic terms, Sweet Media built highly specific campaigns around service line, substance type, diagnosis, and program level — benzo detox, fentanyl detox, alcohol detox, PHP, IOP, mental health, and dual diagnosis each got their own campaign structure.",
    tag: "Campaign Architecture",
  },
  {
    icon: "ri-key-line",
    title: "Match Type Testing by Campaign Category",
    body: "Exact and phrase match for high-intent detox campaigns where traffic quality was critical. Selective broad match for outpatient and mental health campaigns where conversion data supported it. Exact match test campaigns to measure true keyword-level quality scores.",
    tag: "Keyword Strategy",
  },
  {
    icon: "ri-map-2-line",
    title: "In-State vs. Out-of-State Campaign Separation",
    body: "Separate campaigns for California-based searches and out-of-state searches, with ZIP code targeting across the US to identify and scale into the highest-performing geographic markets for VOBs and admissions.",
    tag: "Geographic Targeting",
  },
  {
    icon: "ri-pages-line",
    title: "Dedicated Landing Pages for Every Campaign",
    body: "Every campaign received at least 5 dedicated landing pages built around message match. Benzo detox traffic went to a benzo detox page. Fentanyl detox traffic went to a fentanyl detox page. The more specific the search, the more specific the landing page.",
    tag: "Landing Pages",
  },
  {
    icon: "ri-megaphone-line",
    title: "Ad Headline Testing with Keyword & Location Modifiers",
    body: "Headline variations tested across treatment type, substance, program level, location, insurance language, and urgency. Aligning ad copy more closely with user search intent improved click-through rates and lead quality.",
    tag: "Ad Creative",
  },
  {
    icon: "ri-bar-chart-grouped-line",
    title: "Multi-Channel Expansion",
    body: "As Google Ads performance stabilized, Sweet Media expanded the acquisition system to Bing Ads and Meta Ads — creating a full multi-channel paid media engine that captured demand across all major platforms.",
    tag: "Multi-Channel",
  },
];

const outcomes = [
  {
    icon: "ri-rocket-line",
    headline: "$10K to $300K/Month in Ad Spend",
    body: "Within 4 months, Rize OC scaled from approximately $10,000/month to $300,000/month in total ad spend across Google, Bing, and Meta — a 30× increase in scale without sacrificing lead quality or efficiency.",
    tag: "Scale",
  },
  {
    icon: "ri-arrow-down-line",
    headline: "CPA Reduced from $350 to $115",
    body: "By restructuring campaigns around search intent, improving landing page relevance, and building a data-driven optimization system, average CPA dropped from ~$350 to ~$115 — a 67% reduction achieved while simultaneously scaling spend 30×.",
    tag: "Efficiency",
  },
  {
    icon: "ri-hospital-line",
    headline: "$1,500 Average Cost Per VOB",
    body: "Full-funnel tracking allowed Sweet Media to optimize not just for leads, but for verified insurance benefits — a critical downstream metric in behavioral health. The account now averages $1,500 per VOB at scale.",
    tag: "VOB Tracking",
  },
  {
    icon: "ri-user-heart-line",
    headline: "$8,000 Average Cost Per Admit",
    body: "With VOB and admission data feeding back into campaign optimization, the account achieved a predictable $8,000 average cost per admit — giving Rize OC a clear, scalable acquisition cost model for continued growth.",
    tag: "Admissions",
  },
  {
    icon: "ri-global-line",
    headline: "Full Multi-Channel Acquisition System",
    body: "Google Ads, Bing Ads, and Meta Ads now operate as a coordinated multi-channel system — each platform serving a distinct role in the acquisition funnel and contributing to a more resilient, diversified lead pipeline.",
    tag: "Multi-Channel",
  },
];

const metricsTable = [
  { metric: "Monthly Ad Spend", before: "$10,000", after: "$300,000" },
  { metric: "Average CPA", before: "$350", after: "$115" },
  { metric: "Cost Per VOB", before: "N/A", after: "$1,500" },
  { metric: "Cost Per Admit", before: "N/A", after: "$8,000" },
  { metric: "Active Channels", before: "Google Ads only", after: "Google, Bing, Meta" },
  { metric: "Timeline", before: "Month 1", after: "Month 4" },
];

// Animated sparkline — spend growth trajectory
function SpendSparkline({ animate }: { animate: boolean }) {
  const pts = [10, 18, 30, 52, 80, 110, 148, 190, 230, 265, 290, 300];
  const labels = ["Mo 1", "Mo 2", "Mo 3", "Mo 4"];
  const w = 560;
  const h = 120;
  const pad = 10;
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const range = max - min;

  const coords = pts.map((v, i) => ({
    x: pad + (i / (pts.length - 1)) * (w - pad * 2),
    y: pad + (1 - (v - min) / range) * (h - pad * 2),
  }));

  const d = coords.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = coords[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${acc} C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const fillD = `${d} L${coords[coords.length - 1].x},${h} L${coords[0].x},${h} Z`;

  // Label x positions at months 1, 2, 3, 4 (indices 0, 3, 7, 11)
  const labelIndices = [0, 3, 7, 11];

  return (
    <div className="w-full">
      <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 mb-3">Ad Spend Growth Trajectory — 4 Months</div>
      <div className="relative w-full" style={{ paddingBottom: "28px" }}>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
          <defs>
            <linearGradient id="rizeSparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A1F44" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0A1F44" stopOpacity="0" />
            </linearGradient>
            <clipPath id="rizeSparkClip">
              <rect
                x={pad}
                y={0}
                height={h + 10}
                width={animate ? w - pad * 2 : 0}
                style={{ transition: "width 2s cubic-bezier(0.4,0,0.2,1)" }}
              />
            </clipPath>
          </defs>

          {/* Horizontal grid lines */}
          {[0, 0.33, 0.66, 1].map((t) => {
            const y = pad + t * (h - pad * 2);
            const val = Math.round(max - t * range);
            return (
              <g key={t}>
                <line x1={pad} y1={y} x2={w - pad} y2={y} stroke="#0A1F44" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="4 4" />
                <text x={pad - 4} y={y + 3.5} textAnchor="end" fontSize="8" fill="#0A1F44" fillOpacity="0.3" fontFamily="sans-serif">
                  ${val}K
                </text>
              </g>
            );
          })}

          {/* Fill area */}
          <path d={fillD} fill="url(#rizeSparkGrad)" clipPath="url(#rizeSparkClip)" />

          {/* Line */}
          <path d={d} fill="none" stroke="#0A1F44" strokeWidth="2.5" strokeLinecap="round" clipPath="url(#rizeSparkClip)" />

          {/* Dots at key milestones */}
          {labelIndices.map((idx) => (
            <circle
              key={idx}
              cx={coords[idx].x}
              cy={coords[idx].y}
              r="4"
              fill="white"
              stroke="#0A1F44"
              strokeWidth="2"
              style={{
                opacity: animate ? 1 : 0,
                transition: `opacity 0.3s ease ${0.8 + idx * 0.15}s`,
              }}
            />
          ))}

          {/* End dot */}
          {animate && (
            <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="5" fill="#0A1F44" />
          )}

          {/* Month labels */}
          {labelIndices.map((idx, li) => (
            <text
              key={idx}
              x={coords[idx].x}
              y={h + 18}
              textAnchor="middle"
              fontSize="8"
              fill="#0A1F44"
              fillOpacity="0.4"
              fontFamily="sans-serif"
              style={{
                opacity: animate ? 1 : 0,
                transition: `opacity 0.4s ease ${0.6 + li * 0.1}s`,
              }}
            >
              {labels[li]}
            </text>
          ))}
        </svg>
      </div>

      {/* Callout stats below chart */}
      <div className="grid grid-cols-4 gap-3 mt-2">
        {[
          { mo: "Month 1", spend: "$10K", cpa: "$350" },
          { mo: "Month 2", spend: "$52K", cpa: "$280" },
          { mo: "Month 3", spend: "$148K", cpa: "$190" },
          { mo: "Month 4", spend: "$300K", cpa: "$115" },
        ].map((m) => (
          <div key={m.mo} className="bg-[#f4f6f9] rounded-xl p-3 text-center">
            <div className="text-[8px] tracking-[0.2em] uppercase text-black/35 mb-1.5">{m.mo}</div>
            <div className="text-sm font-bold text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>{m.spend}</div>
            <div className="text-[9px] text-black/40 mt-0.5">CPA ~{m.cpa}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnimatedBar({ pct, animate }: { pct: number; animate: boolean }) {
  return (
    <div className="h-2 bg-black/6 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#0A1F44] rounded-full transition-all duration-1000 ease-out"
        style={{ width: animate ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

export default function RizeOcPage() {
  const router = useRouter();
  const metricsRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [metricsAnimate, setMetricsAnimate] = useState(false);
  const [sparkAnimate, setSparkAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setMetricsAnimate(true); },
      { threshold: 0.2 }
    );
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSparkAnimate(true); },
      { threshold: 0.15 }
    );
    if (sparkRef.current) obs.observe(sparkRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
        <SiteHeader heroTheme="dark" />

        {/* ── HERO ── */}
        <section className="relative w-full min-h-[70vh] flex items-end overflow-hidden" style={{ background: "#0A1F44" }}>
          <div className="absolute inset-0">
            <Image
              src="https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/rizeoc-hero-bg.jpg"
              alt="Orange County California skyline"
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover object-top opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-[#0A1F44]/70 to-[#0A1F44]/40" />
          </div>

          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="rizeocDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#rizeocDots)" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 pt-40 pb-16">
            {/* Breadcrumb */}
            <div className={`flex items-center gap-2 mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <button onClick={() => router.push("/results")} className="text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap">Results</button>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 whitespace-nowrap">Case Study</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 delay-75 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  {["Google Ads", "Bing Ads", "Meta Ads", "Landing Pages", "Geographic Targeting"].map((t) => (
                    <span key={t} className="text-[9px] tracking-[0.2em] uppercase font-semibold text-white/50 border border-white/15 px-3 py-1 rounded-full whitespace-nowrap">{t}</span>
                  ))}
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Rize OC.<br />
                  <em className="font-bold not-italic text-3xl md:text-4xl lg:text-5xl">$10K to $300K/Month.</em>
                </h1>

                <p className={`text-white/55 text-base leading-relaxed max-w-lg font-light transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  How Sweet Media helped Rize OC scale paid advertising from $10,000 to $300,000 per month in 4 months — while cutting cost per acquisition from $350 to $115.
                </p>
              </div>

              {/* Quick stats */}
              <div className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {heroStats.map((r) => (
                  <div key={r.label} className="bg-white/[0.07] border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl mb-3 ${r.bg}`}>
                      <i className={`${r.icon} text-base ${r.color}`}></i>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{r.val}</div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-white/45 font-medium">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client meta bar */}
            <div className={`mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 md:gap-10 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {[
                { label: "Client", val: "Rize OC" },
                { label: "Location", val: "Orange County, CA" },
                { label: "Industry", val: "Behavioral Health" },
                { label: "Services", val: "Addiction Treatment · Detox · Mental Health" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium mb-1">{m.label}</div>
                  <div className="text-sm text-white/75 font-medium">{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#0A1F44]" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Overview</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  A behavioral health provider needed to scale paid advertising without losing efficiency.
                </h2>
                <div className="space-y-4 text-black/60 text-sm leading-relaxed font-light">
                  <p>
                    Rize OC is a behavioral health treatment provider in Orange County, California, offering addiction treatment, detox, outpatient care, and mental health services. At the start of the engagement, Rize OC was spending approximately $10,000 per month on Google Ads with a cost per acquisition of around $350.
                  </p>
                  <p>
                    The goal was straightforward but demanding: scale spend aggressively while simultaneously improving efficiency. In behavioral health advertising — one of the most competitive and expensive verticals in paid search — that combination requires more than just increasing budgets. It requires a fundamentally different campaign architecture.
                  </p>
                  <p>
                    Sweet Media partnered with Rize OC to rebuild the paid media system from the ground up — creating intent-based campaign structures, dedicated landing pages for every campaign, geographic segmentation, and a multi-channel expansion strategy that ultimately scaled the account to $300,000/month in 4 months while reducing CPA by 67%.
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-[#f4f6f9] rounded-2xl p-7">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 font-semibold mb-5">Services Provided</p>
                  <div className="flex flex-col gap-3">
                    {services.map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#0A1F44]/10 flex-shrink-0">
                          <i className="ri-check-line text-[#0A1F44] text-[10px]"></i>
                        </div>
                        <span className="text-sm text-black/70 font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-black/8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 font-semibold mb-3">Industry</p>
                    <p className="text-sm text-black/70">Behavioral Health · Addiction Treatment · Detox · Mental Health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHALLENGES ── */}
        <section className="w-full py-20 md:py-28" style={{ background: "#f4f6f9" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Challenge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4 leading-snug max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Scaling spend in one of the most competitive verticals in paid search.
            </h2>
            <p className="text-black/50 text-sm leading-relaxed mb-12 max-w-xl font-light">
              Behavioral health keywords carry high CPCs, strict compliance requirements, and intense competition. Scaling without a disciplined structure means wasted spend, poor lead quality, and rising CPAs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {challenges.map((c) => (
                <div key={c.title} className="bg-white rounded-2xl p-7 border border-black/6">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#0A1F44]/6 mb-5">
                    <i className={`${c.icon} text-[#0A1F44] text-lg`}></i>
                  </div>
                  <h3 className="text-base font-semibold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{c.title}</h3>
                  <p className="text-sm text-black/55 leading-relaxed font-light">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STRATEGY ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4 leading-snug max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Build a scalable acquisition system — not just bigger campaigns.
            </h2>
            <p className="text-black/50 text-sm leading-relaxed mb-14 max-w-xl font-light">
              Sweet Media rebuilt the paid media architecture around six core pillars — each designed to improve efficiency at scale rather than just increase spend.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {strategyItems.map((s, i) => (
                <div key={s.title} className="bg-[#f4f6f9] rounded-2xl p-7 border border-black/6 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#0A1F44]/8">
                      <i className={`${s.icon} text-[#0A1F44] text-lg`}></i>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[8px] tracking-[0.2em] uppercase font-bold text-[#0A1F44] bg-[#0A1F44]/8 px-2 py-0.5 rounded-full whitespace-nowrap">{s.tag}</span>
                      <span className="text-[9px] text-black/25 font-semibold">0{i + 1}</span>
                    </div>
                    <h3 className="text-base font-semibold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h3>
                    <p className="text-sm text-black/55 leading-relaxed font-light">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategy priority bars */}
            <div className="mt-14 bg-[#f4f6f9] rounded-2xl p-8 md:p-10" ref={metricsRef}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Strategic Priority Weighting</span>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { label: "Intent-based campaign segmentation", pct: 98 },
                  { label: "Dedicated landing pages per campaign", pct: 95 },
                  { label: "Geographic in-state / out-of-state separation", pct: 88 },
                  { label: "Keyword match type testing", pct: 85 },
                  { label: "Ad headline & copy testing", pct: 80 },
                  { label: "Multi-channel expansion (Bing + Meta)", pct: 75 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-black/70 font-medium">{item.label}</span>
                      <span className="text-[11px] text-black/35 font-semibold">{item.pct}%</span>
                    </div>
                    <AnimatedBar pct={item.pct} animate={metricsAnimate} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section className="w-full py-20 md:py-28" style={{ background: "#f4f6f9" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Results</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12 leading-snug max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              30× scale. 67% lower CPA. In 4 months.
            </h2>

            <div className="flex flex-col gap-5">
              {outcomes.map((o, i) => (
                <div key={o.headline} className="bg-white rounded-2xl p-7 md:p-9 border border-black/6 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0 flex items-center gap-4 md:flex-col md:items-center md:w-20">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0A1F44]/6">
                      <i className={`${o.icon} text-[#0A1F44] text-xl`}></i>
                    </div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#0A1F44] bg-[#0A1F44]/6 px-2.5 py-1 rounded-full whitespace-nowrap md:text-center">{o.tag}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-black mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{o.headline}</h3>
                    <p className="text-sm text-black/55 leading-relaxed font-light">{o.body}</p>
                  </div>
                  <span className="hidden md:block text-6xl font-bold text-black/4 flex-shrink-0 self-center" style={{ fontFamily: "'Playfair Display', serif" }}>0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METRICS TABLE + SPARKLINE ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

              {/* Before / After table */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[#0A1F44]" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Before vs. After</span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-black/8">
                  <div className="grid grid-cols-3 bg-[#0A1F44] px-5 py-3">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-semibold">Metric</span>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-semibold text-center">Month 1</span>
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-semibold text-right">Month 4</span>
                  </div>
                  {metricsTable.map((row, i) => (
                    <div key={row.metric} className={`grid grid-cols-3 px-5 py-4 items-center ${i % 2 === 0 ? "bg-white" : "bg-[#f4f6f9]"} border-b border-black/5 last:border-0`}>
                      <span className="text-xs text-black/60 font-medium">{row.metric}</span>
                      <span className="text-xs text-black/40 text-center">{row.before}</span>
                      <span className="text-xs font-bold text-[#0A1F44] text-right">{row.after}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sparkline chart */}
              <div ref={sparkRef}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-[#0A1F44]" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Growth Trajectory</span>
                </div>
                <div className="bg-white rounded-2xl p-7 border border-black/8">
                  <SpendSparkline animate={sparkAnimate} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KEY OUTCOMES SUMMARY ── */}
        <section className="w-full bg-[#0A1F44] py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-white/30" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-semibold">Key Outcomes</span>
                <div className="w-8 h-px bg-white/30" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                A paid media system built to scale<br />
                <em className="font-bold not-italic">without losing efficiency.</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "$300K/month in total ad spend across 3 channels",
                "67% reduction in cost per acquisition",
                "$115 average CPA at full scale",
                "$1,500 average cost per VOB",
                "$8,000 average cost per admit",
                "Intent-based campaign segmentation by service line",
                "Dedicated landing pages for every campaign",
                "In-state and out-of-state campaign separation",
                "ZIP code targeting across the United States",
                "Exact match campaigns for keyword quality data",
                "Multi-channel expansion: Google, Bing, Meta",
                "Full-funnel tracking from click to admission",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white/[0.06] border border-white/10 rounded-xl px-5 py-4">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-emerald-400 text-[10px]"></i>
                  </div>
                  <span className="text-sm text-white/70 font-light leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Pullquote */}
            <div className="mt-14 max-w-3xl mx-auto text-center">
              <div className="w-px h-10 bg-white/15 mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl font-light italic text-white/80 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Scaling from $10K to $300K/month isn't just a budget decision — it's a systems decision. The campaign structure, landing pages, geographic segmentation, and full-funnel tracking all had to be in place before the spend could scale efficiently."
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-medium">Ethan Sweet · Founder, Sweet Media</span>
                <div className="w-8 h-px bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Ready to Scale?</span>
              <div className="w-8 h-px bg-[#0A1F44]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-5 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to scale your treatment center's<br />
              <em className="font-bold not-italic">paid advertising?</em>
            </h2>
            <p className="text-black/50 text-sm leading-relaxed mb-10 max-w-xl mx-auto font-light">
              Sweet Media builds paid media systems for behavioral health and addiction treatment providers that scale efficiently. If your treatment center is ready to grow ad spend without sacrificing CPA — we can help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/contact")}
                className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-4 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
              >
                Schedule a Strategy Call
                <i className="ri-arrow-right-line text-sm"></i>
              </button>
              <button
                onClick={() => router.push("/results")}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-black/40 hover:text-black transition-colors cursor-pointer whitespace-nowrap"
              >
                View All Case Studies
                <i className="ri-arrow-right-line text-xs"></i>
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
}
