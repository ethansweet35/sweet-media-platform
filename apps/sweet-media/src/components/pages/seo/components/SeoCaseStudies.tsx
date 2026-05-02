"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LazyImage from "@/components/base/LazyImage";

type Case = {
  idx: string;
  client: string;
  location: string;
  service: string;
  headline: string;
  detail: string;
  metrics: { val: string; label: string }[];
  chartType: "bars" | "spark";
  bars?: { label: string; val: number; highlight?: boolean }[];
  sparkPts?: number[];
  image: string;
  href?: string;
};

const cases: Case[] = [
  {
    idx: "01",
    client: "California Prime Recovery",
    location: "Orange County, CA",
    service: "SEO + CRO",
    headline: "30% Reduction in Paid CPA + Passing Core Web Vitals",
    detail: "Built a scalable SEO content system with Surfer SEO, improved website to passing Core Web Vitals, and optimized the full admissions funnel — creating a more efficient digital marketing engine.",
    metrics: [{ val: "↓30%", label: "Paid CPA" }, { val: "Passing", label: "Core Web Vitals" }, { val: "Scalable", label: "SEO System" }],
    chartType: "bars",
    bars: [{ label: "Jan", val: 100 }, { label: "Feb", val: 92 }, { label: "Mar", val: 84 }, { label: "Apr", val: 78 }, { label: "May", val: 74 }, { label: "Jun", val: 70, highlight: true }],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-cpr.jpg",
    href: "/case-studies/california-prime-recovery",
  },
  {
    idx: "02",
    client: "Rize OC",
    location: "Orange County, CA",
    service: "Paid Media",
    headline: "$10K to $300K/Month in Ad Spend — CPA Dropped 67% in 4 Months",
    detail: "Built a full multi-channel paid acquisition system across Google, Bing, and Meta. Scaled from $10K to $300K/month while cutting CPA from $350 to $115 through intent-based campaign segmentation and dedicated landing pages.",
    metrics: [{ val: "30×", label: "Spend Scaled" }, { val: "↓67%", label: "CPA Reduction" }, { val: "$115", label: "Avg CPA" }],
    chartType: "spark",
    sparkPts: [10, 18, 30, 52, 80, 110, 148, 190, 230, 265, 290, 300],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-rizeoc.jpg",
    href: "/case-studies/rize-oc",
  },
];

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
  const labelPairs: [number, string][] = [[0, "Mo 1"], [3, "Mo 2"], [7, "Mo 3"], [11, "Mo 4"]];

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h + 12}`} className="overflow-visible">
      <defs>
        <linearGradient id="seoSparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.18" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="seoSparkClip">
          <rect x={pad} y={0} height={h + 4} width={animate ? w - pad * 2 : 0} style={{ transition: "width 1.8s cubic-bezier(0.4,0,0.2,1)" }} />
        </clipPath>
      </defs>
      {[0, 0.5, 1].map((t) => (
        <line key={t} x1={pad} y1={pad + t * (h - pad * 2)} x2={w - pad} y2={pad + t * (h - pad * 2)}
          stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="3 3" />
      ))}
      <path d={fillD} fill="url(#seoSparkGrad)" clipPath="url(#seoSparkClip)" />
      <path d={d} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" clipPath="url(#seoSparkClip)" />
      {labelPairs.map(([idx]) => (
        <circle key={idx} cx={coords[idx].x} cy={coords[idx].y} r="2.5"
          fill="black" stroke="white" strokeWidth="1.5"
          style={{ opacity: animate ? 1 : 0, transition: `opacity 0.3s ease ${0.8 + idx * 0.05}s` }} />
      ))}
      {animate && <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="3.5" fill="white" />}
      {labelPairs.map(([idx, label]) => (
        <text key={idx} x={coords[idx].x} y={h + 11} textAnchor="middle"
          fontSize="7" fill="white" fillOpacity="0.35" fontFamily="sans-serif"
          style={{ opacity: animate ? 1 : 0, transition: `opacity 0.4s ease ${0.6 + idx * 0.04}s` }}>
          {label}
        </text>
      ))}
    </svg>
  );
}

export default function SeoCaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="w-6 h-px bg-white/25" />
            <span className="text-[9px] tracking-[0.45em] uppercase text-white/40 font-medium">SEO Case Studies</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Real Campaigns,
              <br /><em className="font-light italic" style={{ color: "#7B9FD4" }}>Real Outcomes.</em>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-md font-light text-center lg:text-right">
              Every case below is a real behavioral health client. Real numbers, real timelines, real admissions growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {cases.map((cs) => (
            <div key={cs.idx} className="bg-white/[0.04] border border-white/15 rounded-3xl overflow-hidden flex flex-col hover:border-white/30 transition-all duration-300">
              <div className="relative h-52 w-full overflow-hidden flex-shrink-0">
                <LazyImage src={cs.image} alt={cs.client} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold bg-white text-black px-3 py-1.5 rounded-full whitespace-nowrap">{cs.service}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-1.5 mb-1">
                    <i className="ri-map-pin-2-line text-white/50 text-xs" />
                    <span className="text-xs text-white/50">{cs.location}</span>
                  </div>
                  <div className="text-sm font-semibold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{cs.client}</div>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-white leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{cs.headline}</h3>
                <p className="text-sm text-white/55 leading-relaxed font-light flex-1">{cs.detail}</p>

                <div className="mt-5 pt-4 border-t border-white/10">
                  {cs.chartType === "bars" && cs.bars && (
                    <>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-white/35 mb-2">CPA Performance Trend</div>
                      <div className="flex items-end gap-2 h-14">
                        {cs.bars.map((b) => (
                          <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
                            <div className="w-full relative" style={{ height: "44px" }}>
                              <div className={`absolute bottom-0 left-0 right-0 rounded-sm transition-all duration-1000 ${b.highlight ? "bg-white" : "bg-white/20"}`}
                                style={{ height: animate ? `${(b.val / Math.max(...cs.bars!.map(x => x.val))) * 100}%` : "0%" }} />
                            </div>
                            <span className="text-[8px] text-white/40 tracking-widest uppercase whitespace-nowrap">{b.label}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {cs.chartType === "spark" && cs.sparkPts && (
                    <>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-white/35 mb-2">Ad Spend Growth — 4 Months</div>
                      <MiniSparkline pts={cs.sparkPts} animate={animate} />
                    </>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{m.val}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/40 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {cs.href && (
                  <button
                    onClick={() => router.push(cs.href!)}
                    className="mt-4 w-full flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-bold text-white border border-white/15 hover:border-white/40 hover:bg-white/5 rounded-xl py-3 transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    View Full Case Study
                    <i className="ri-arrow-right-line text-xs" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-14 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "↓30%", label: "Paid CPA Reduction" },
            { val: "30×", label: "Max Spend Scaled" },
            { val: "Passing", label: "Core Web Vitals" },
            { val: "100%", label: "Behavioral Health Only" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/35 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
