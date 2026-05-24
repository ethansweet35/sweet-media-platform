"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LazyImage from "@/components/base/LazyImage";

function MiniSparkline({ pts, animate }: { pts: number[]; animate: boolean }) {
  const w = 280, h = 48, pad = 5;
  const max = Math.max(...pts), min = Math.min(...pts), range = max - min || 1;
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
  // label indices: Mo1, Mo2, Mo3, Mo4
  const labelPairs = [[0, "Mo 1"], [3, "Mo 2"], [7, "Mo 3"], [11, "Mo 4"]] as [number, string][];

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 12}`} className="overflow-visible">
      <defs>
        <linearGradient id="resCaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1F44" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0A1F44" stopOpacity="0" />
        </linearGradient>
        <clipPath id="resCaseClip">
          <rect x={pad} y={0} height={h + 4} width={animate ? w - pad * 2 : 0} style={{ transition: "width 1.8s cubic-bezier(0.4,0,0.2,1)" }} />
        </clipPath>
      </defs>
      {/* subtle grid lines */}
      {[0, 0.5, 1].map((t) => (
        <line key={t} x1={pad} y1={pad + t * (h - pad * 2)} x2={w - pad} y2={pad + t * (h - pad * 2)}
          stroke="#0A1F44" strokeOpacity="0.06" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      <path d={fillD} fill="url(#resCaseGrad)" clipPath="url(#resCaseClip)" />
      <path d={d} fill="none" stroke="#0A1F44" strokeWidth="2" strokeLinecap="round" clipPath="url(#resCaseClip)" />
      {/* milestone dots */}
      {labelPairs.map(([idx]) => (
        <circle key={idx} cx={coords[idx].x} cy={coords[idx].y} r="2.5"
          fill="white" stroke="#0A1F44" strokeWidth="1.5"
          style={{ opacity: animate ? 1 : 0, transition: `opacity 0.3s ease ${0.8 + idx * 0.05}s` }} />
      ))}
      {/* end dot */}
      {animate && <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="3.5" fill="#0A1F44" />}
      {/* month labels */}
      {labelPairs.map(([idx, label]) => (
        <text key={idx} x={coords[idx].x} y={h + 11} textAnchor="middle"
          fontSize="7" fill="#0A1F44" fillOpacity="0.4" fontFamily="sans-serif"
          style={{ opacity: animate ? 1 : 0, transition: `opacity 0.4s ease ${0.6 + (idx as number) * 0.04}s` }}>
          {label}
        </text>
      ))}
    </svg>
  );
}

function MiniBarChart({ bars, animate }: { bars: { label: string; val: number; highlight?: boolean }[]; animate: boolean }) {
  const max = Math.max(...bars.map((b) => b.val));
  return (
    <div className="flex items-end gap-2 h-20 w-full">
      {bars.map((b) => (
        <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full relative" style={{ height: "64px" }}>
            <div className={`absolute bottom-0 left-0 right-0 rounded-sm transition-all duration-1000 ${b.highlight ? "bg-white" : "bg-white/20"}`} style={{ height: animate ? `${(b.val / max) * 100}%` : "0%" }} />
          </div>
          <span className="text-[8px] text-white/50 tracking-widest uppercase whitespace-nowrap">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

// Add optional caseStudyHref to remaining entries so TS is happy
type CaseStudy = {
  idx: string;
  client: string;
  location: string;
  tag: string;
  tagIcon: string;
  headline: string;
  detail: string;
  metrics: { val: string; label: string }[];
  chartType: "bars" | "spark" | "funnel";
  bars?: { label: string; val: number; highlight?: boolean }[];
  sparkPts?: number[];
  sparkLabel?: string;
  funnelSteps?: { label: string; val: string; pct: number }[];
  image: string;
  caseStudyHref?: string;
};

const caseStudies: CaseStudy[] = [
  {
    idx: "01",
    client: "California Prime Recovery",
    location: "Orange County, CA",
    tag: "Full-Funnel",
    tagIcon: "ri-funds-line",
    headline: "30% Reduction in Paid CPA + Passing Core Web Vitals",
    detail: "Optimized paid campaigns, introduced AI chatbot lead capture, improved website to passing Core Web Vitals, and built a scalable SEO content system — creating a more efficient digital admissions engine.",
    metrics: [{ val: "↓30%", label: "Paid CPA" }, { val: "Passing", label: "Core Web Vitals" }, { val: "AI-Powered", label: "Lead Capture" }],
    chartType: "bars" as const,
    bars: [{ label: "Jan", val: 100 }, { label: "Feb", val: 92 }, { label: "Mar", val: 84 }, { label: "Apr", val: 78 }, { label: "May", val: 74 }, { label: "Jun", val: 70, highlight: true }],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-cpr.jpg",
    caseStudyHref: "/case-studies/california-prime-recovery",
  },
  {
    idx: "02",
    client: "Rize OC",
    location: "Orange County, CA",
    tag: "Paid Media",
    tagIcon: "ri-funds-box-line",
    headline: "$10K to $300K/Month in Ad Spend — CPA Dropped 67% in 4 Months",
    detail: "Built a full multi-channel paid acquisition system across Google, Bing, and Meta. Scaled from $10K to $300K/month in ad spend while cutting CPA from $350 to $115 through intent-based campaign segmentation, dedicated landing pages, and geographic targeting.",
    metrics: [{ val: "30×", label: "Spend Scaled" }, { val: "↓67%", label: "CPA Reduction" }, { val: "$115", label: "Avg CPA" }],
    chartType: "spark" as const,
    sparkPts: [10, 18, 30, 52, 80, 110, 148, 190, 230, 265, 290, 300],
    sparkLabel: "Ad Spend Growth — 4 Months ($10K → $300K)",
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-rizeoc.jpg",
    caseStudyHref: "/case-studies/rize-oc",
  },
];

export default function ResultsCaseStudies({ hideHeader = false }: { hideHeader?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setAnimate(true); setVisible(true); } }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="results-case-studies" className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {!hideHeader ? (
          <div
            className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center justify-center gap-3 mb-5 lg:justify-start">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">
                Case Studies
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <h2
                className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real Campaigns,
                <br />
                <em className="font-light italic" style={{ color: "#0A1F44" }}>
                  Real Outcomes.
                </em>
              </h2>
              <p className="text-black/55 text-sm leading-relaxed max-w-md text-center lg:text-right mx-auto lg:mx-0">
                Every case below is a real behavioral health client. Real numbers, real timelines,
                real admissions growth. No cherry-picked outliers.
              </p>
            </div>
          </div>
        ) : null}

        {/* Case Study Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {caseStudies.map((cs) => (
            <div key={cs.idx} className="bg-white rounded-3xl overflow-hidden border border-black/6 hover:border-black/15 transition-all duration-300 flex flex-col">
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                <LazyImage src={cs.image} alt={cs.client} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-bold bg-white text-black px-3 py-1.5 rounded-full whitespace-nowrap">
                    <i className={`${cs.tagIcon} text-xs`}></i>
                    {cs.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-3xl font-bold text-white/10" style={{ fontFamily: "'Playfair Display', serif" }}>{cs.idx}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <i className="ri-map-pin-2-line text-white/50 text-xs"></i>
                    <span className="text-xs text-white/50">{cs.location}</span>
                  </div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{cs.client}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {cs.headline}
                </h3>
                <p className="text-sm text-black/55 leading-relaxed font-light flex-1">{cs.detail}</p>

                {/* Chart */}
                <div className="mt-5 pt-4 border-t border-black/6">
                  {cs.chartType === "bars" && cs.bars && (
                    <div>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 mb-2">{cs.tag === "Local SEO" ? "Visibility Score by City" : "Performance Trend"}</div>
                      <div className="flex items-end gap-2 h-16">
                        {cs.bars.map((b) => (
                          <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full relative" style={{ height: "48px" }}>
                              <div className={`absolute bottom-0 left-0 right-0 rounded-sm transition-all duration-1000 ${b.highlight ? "bg-[#0A1F44]" : "bg-[#0A1F44]/15"}`} style={{ height: animate ? `${(b.val / Math.max(...cs.bars!.map((x) => x.val))) * 100}%` : "0%" }} />
                            </div>
                            <span className="text-[8px] text-black/40 tracking-widest uppercase whitespace-nowrap">{b.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {cs.chartType === "spark" && cs.sparkPts && (
                    <div>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 mb-2">{cs.sparkLabel ?? "Growth Trajectory — 12 Weeks"}</div>
                      <MiniSparkline pts={cs.sparkPts} animate={animate} />
                    </div>
                  )}
                  {cs.chartType === "funnel" && cs.funnelSteps && (
                    <div>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-black/35 mb-3">Campaign Funnel</div>
                      <div className="flex flex-col gap-1.5">
                        {cs.funnelSteps.map((f) => (
                          <div key={f.label} className="flex items-center gap-3">
                            <div className="w-16 text-[9px] text-black/50 text-right flex-shrink-0">{f.label}</div>
                            <div className="flex-1 h-1.5 bg-black/6 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0A1F44]/40 rounded-full transition-all duration-1000" style={{ width: animate ? `${f.pct}%` : "0%" }} />
                            </div>
                            <div className="w-12 text-[9px] text-black/50 font-semibold flex-shrink-0 text-right">{f.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="mt-4 pt-4 border-t border-black/6 grid grid-cols-3 gap-2">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{m.val}</div>
                      <div className="text-[9px] uppercase tracking-widest text-black/40 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Case study link */}
                {cs.caseStudyHref && (
                  <button
                    onClick={() => router.push(cs.caseStudyHref!)}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-bold text-[#0A1F44] border border-[#0A1F44]/15 hover:border-[#0A1F44]/40 hover:bg-[#0A1F44]/3 rounded-xl py-3 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    View Full Case Study
                    <i className="ri-arrow-right-line text-xs"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}