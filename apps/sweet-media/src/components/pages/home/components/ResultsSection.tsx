"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─── Animated Counter ──────────────────────────────────────────── */
function Counter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  // Start at the real value so crawlers/SSR see the actual number.
  // On scroll-into-view, animate from 0 up to target.
  const [val, setVal] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          setVal(0);
          const dur = 2000;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(parseFloat((ease * target).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Mini Bar Chart ────────────────────────────────────────────── */
function MiniBarChart({
  bars,
  animate,
}: {
  bars: { label: string; val: number; highlight?: boolean }[];
  animate: boolean;
}) {
  const max = Math.max(...bars.map((b) => b.val));
  return (
    <div className="flex items-end gap-2 h-20 w-full">
      {bars.map((b) => (
        <div key={b.label} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full relative" style={{ height: "64px" }}>
            <div
              className={`absolute bottom-0 left-0 right-0 rounded-sm transition-all duration-1000 ${b.highlight ? "bg-white" : "bg-white/20"}`}
              style={{ height: animate ? `${(b.val / max) * 100}%` : "0%" }}
            />
          </div>
          <span className="text-[8px] text-white/50 tracking-widest uppercase whitespace-nowrap">
            {b.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Mini Sparkline ────────────────────────────────────────────── */
function MiniSparkline({ pts, animate, color = "white" }: { pts: number[]; animate: boolean; color?: string }) {
  const w = 280, h = 60;
  const pad = 6;
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const range = max - min || 1;
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

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <clipPath id="sparkClip">
          <rect
            x={pad}
            y={0}
            height={h}
            width={animate ? w - pad * 2 : 0}
            style={{ transition: "width 1.8s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </clipPath>
      </defs>
      <path d={fillD} fill="url(#sparkFill)" clipPath="url(#sparkClip)" />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" clipPath="url(#sparkClip)" />
      {animate && (
        <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="3.5" fill={color} />
      )}
    </svg>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────── */
const stats = [
  { num: 3.2, suffix: "×", prefix: "", label: "Avg. Google ROAS", sub: "Across all BH clients", decimals: 1 },
  { num: 47, suffix: "", prefix: "$", label: "Avg. Cost Per Lead", sub: "Industry avg. $180+", decimals: 0 },
  { num: 74, suffix: "%", prefix: "", label: "Avg. CPA Reduction", sub: "Within first 6 months", decimals: 0 },
  { num: 340, suffix: "%", prefix: "", label: "Avg. Organic Growth", sub: "SEO traffic increase", decimals: 0 },
  { num: 40, suffix: "+", prefix: "", label: "Clients Served", sub: "Behavioral health orgs", decimals: 0 },
  { num: 92, suffix: "%", prefix: "", label: "Client Retention", sub: "Year-over-year", decimals: 0 },
];

/* ─── Testimonials ───────────────────────────────────────────────── */
const testimonials = [
  {
    quote: "Sweet Media completely changed how we think about marketing. Our admissions team can barely keep up with the volume now. The cost-per-admission dropped significantly in just four months.",
    name: "Dr. Marcus Holloway",
    title: "CEO, California Prime Recovery",
    initials: "MH",
  },
  {
    quote: "We'd tried four different agencies before Sweet Media. Nobody else understood behavioral health the way they do — from the compliance nuances to the actual patient journey. The results speak for themselves.",
    name: "Jennifer Castillo",
    title: "Director of Admissions, Rize OC",
    initials: "JC",
  },
  {
    quote: "Our census went from 68% to 94% in six months. I was skeptical of the projections at first — but they hit every single number. Best investment we've made in five years.",
    name: "Thomas Reeves",
    title: "COO, California Prime Recovery",
    initials: "TR",
  },
];

/* ─── Case Studies ───────────────────────────────────────────────── */
interface CaseStudy {
  index: string;
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
  funnelSteps?: { label: string; val: string; pct: number }[];
  image: string;
  href?: string;
}

const caseStudies: CaseStudy[] = [
  {
    index: "01",
    client: "California Prime Recovery",
    location: "Orange County, CA",
    tag: "Full-Funnel",
    tagIcon: "ri-funds-line",
    headline: "30% Reduction in Paid CPA + Passing Core Web Vitals",
    detail:
      "Optimized paid campaigns, introduced AI chatbot lead capture, improved website to passing Core Web Vitals, and built a scalable SEO content system — creating a more efficient digital admissions engine.",
    metrics: [
      { val: "↓30%", label: "Paid CPA" },
      { val: "Passing", label: "Core Web Vitals" },
      { val: "AI-Powered", label: "Lead Capture" },
    ],
    chartType: "bars",
    bars: [
      { label: "Jan", val: 100 },
      { label: "Feb", val: 92 },
      { label: "Mar", val: 84 },
      { label: "Apr", val: 78 },
      { label: "May", val: 74 },
      { label: "Jun", val: 70, highlight: true },
    ],
    image:
      "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-cpr.jpg",
    href: "/case-studies/california-prime-recovery",
  },
  {
    index: "02",
    client: "Rize OC",
    location: "Orange County, CA",
    tag: "Paid Media",
    tagIcon: "ri-funds-box-line",
    headline: "$10K to $300K/Month in Ad Spend — CPA Dropped 67% in 4 Months",
    detail:
      "Built a full multi-channel paid acquisition system across Google, Bing, and Meta. Scaled from $10K to $300K/month while cutting CPA from $350 to $115 through intent-based campaign segmentation and dedicated landing pages.",
    metrics: [
      { val: "30×", label: "Spend Scaled" },
      { val: "↓67%", label: "CPA Reduction" },
      { val: "$115", label: "Avg CPA" },
    ],
    chartType: "spark",
    sparkPts: [10, 18, 30, 52, 80, 110, 148, 190, 230, 265, 290, 300],
    image:
      "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cs-rizeoc.jpg",
    href: "/case-studies/rize-oc",
  },
];

/* ─── Case Study Card ────────────────────────────────────────────── */
function CaseCard({ cs, animate, onNavigate }: { cs: CaseStudy; animate: boolean; onNavigate: (href: string) => void }) {
  return (
    <div className="bg-white/[0.04] border border-white/15 rounded-3xl overflow-hidden flex flex-col hover:border-white/30 transition-all duration-300">
      {/* Image strip */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={cs.image}
          alt={cs.client}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        {/* Tag */}
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-bold bg-white text-black px-3 py-1.5 rounded-full">
            <i className={`${cs.tagIcon} text-xs`}></i>
            {cs.tag}
          </span>
        </div>
        {/* Index */}
        <div className="absolute top-5 right-5">
          <span
            className="text-3xl font-bold text-white/10"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cs.index}
          </span>
        </div>
        {/* Location */}
        <div className="absolute bottom-5 left-5">
          <div className="flex items-center gap-2">
            <i className="ri-map-pin-2-line text-white/50 text-xs"></i>
            <span className="text-xs text-white/50">{cs.location}</span>
          </div>
          <div
            className="text-base font-semibold text-white mt-0.5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cs.client}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left — text */}
        <div className="flex-1 p-6 md:p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-white/15">
          <h3
            className="text-[18px] md:text-xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {cs.headline}
          </h3>
          <p className="text-[14px] md:text-sm text-white/60 leading-relaxed font-light flex-1">{cs.detail}</p>

          {/* Chart area */}
          <div className="mt-6 pt-5 border-t border-white/15">
            {cs.chartType === "bars" && cs.bars && (
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-white/45 mb-3">
                  CPA Trend (Monthly)
                </div>
                <MiniBarChart bars={cs.bars} animate={animate} />
              </div>
            )}
            {cs.chartType === "spark" && cs.sparkPts && (
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-white/45 mb-2">
                  Ad Spend Growth — 4 Months
                </div>
                <MiniSparkline pts={cs.sparkPts} animate={animate} />
              </div>
            )}
            {cs.chartType === "funnel" && cs.funnelSteps && (
              <div>
                <div className="text-[9px] tracking-[0.3em] uppercase text-white/45 mb-3">
                  Campaign Funnel
                </div>
                <div className="flex flex-col gap-1.5">
                  {cs.funnelSteps.map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <div className="w-14 text-[9px] text-white/50 text-right flex-shrink-0">{f.label}</div>
                      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white/50 rounded-full transition-all duration-1000"
                          style={{ width: animate ? `${f.pct}%` : "0%" }}
                        />
                      </div>
                      <div className="w-10 text-[9px] text-white/50 font-semibold flex-shrink-0">{f.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View case study button */}
          {cs.href && (
            <button
              onClick={() => onNavigate(cs.href!)}
              className="mt-5 flex items-center justify-center gap-2 text-[11px] tracking-[0.15em] uppercase font-bold text-white border border-white/15 hover:border-white/40 hover:bg-white/5 rounded-xl py-3 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              View Full Case Study
              <i className="ri-arrow-right-line text-xs"></i>
            </button>
          )}
        </div>

        {/* Right — metrics */}
        <div className="flex flex-row lg:flex-col lg:w-36 divide-x lg:divide-x-0 lg:divide-y divide-white/15">
          {cs.metrics.map((m) => (
            <div key={m.label} className="flex-1 flex flex-col items-center justify-center py-5 px-3 md:px-4 text-center">
              <div
                className="text-xl md:text-2xl font-bold text-white leading-none mb-2 md:mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {m.val}
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase text-white/50">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────── */
export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setAnimate(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Auto-cycle testimonials */
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((s) => (s + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} id="results" className="w-full bg-black overflow-hidden">

      {/* ── TOP — headline + stats ──────────────────────────────── */}
      <div className="relative px-4 md:px-6 pt-[50px] md:pt-[100px] pb-0">
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rg" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rg)" />
          </svg>
        </div>

        <div className="relative max-w-screen-xl mx-auto">

          {/* Header */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-6 h-px bg-white/25"></div>
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/40 font-medium">
                Verified Client Results
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-end">
              <div>
                <h2
                  className="text-[36px] md:text-5xl font-bold text-white leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Numbers That
                  <br />
                  <em className="font-light italic" style={{color:'#7B9FD4'}}>Don&apos;t Lie.</em>
                </h2>
                <p className="text-white/60 text-[14px] md:text-sm leading-relaxed max-w-md font-light">
                  Real numbers from real behavioral health clients. No cherry-picked outliers — these are our averages across all active accounts.
                </p>
                <Link href="/results" className="inline-flex items-center gap-2 mt-4 text-[12px] tracking-[0.2em] uppercase font-semibold text-white/60 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                  View Full Results
                  <i className="ri-arrow-right-line text-sm"></i>
                </Link>
              </div>
              {/* Sparkline inline visual */}
              <div className="relative">
                <MiniSparkline pts={[20, 24, 22, 30, 38, 44, 52, 62, 76, 88, 94, 100]} animate={animate} />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">Jan 2024</span>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">Dec 2026</span>
                </div>
                <div className="hidden md:block absolute -top-1 right-0 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5">
                  <span className="text-xs font-bold text-white">+312% avg. growth</span>
                </div>
                <div className="md:hidden mt-3 flex justify-end">
                  <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5">
                    <span className="text-xs font-bold text-white">+312% avg. growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/20 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 md:px-8 py-6 md:py-8 flex flex-col gap-2.5 md:gap-3 transition-colors duration-300 hover:bg-white/[0.04] ${
                  i < 4 ? "border-b border-white/20" : ""
                } ${
                  i % 2 !== 1 ? "border-r border-white/20" : "md:border-r border-white/20"
                } ${
                  i === 2 ? "md:border-r-0" : ""
                } ${
                  i >= 2 && i < 4 ? "md:border-b-0" : ""
                } ${
                  i >= 4 ? "border-b-0" : ""
                }`}
              >
                <div
                  className="text-[32px] md:text-5xl font-bold text-white leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <Counter
                    target={s.num}
                    suffix={s.suffix}
                    prefix={s.prefix}
                    decimals={s.decimals}
                  />
                </div>
                <div className="w-6 h-px bg-white/30 my-0.5 md:my-1"></div>
                <div className="text-[13px] md:text-sm font-semibold text-white/80">{s.label}</div>
                <div className="text-[11px] text-white/45 tracking-wide hidden sm:block">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── TESTIMONIAL BAND ───────────────────────────────────────── */}
      <div className="px-4 md:px-6 pt-[50px] md:pt-[100px] pb-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="border border-white/20 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/20">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setActiveTestimonial(i)}
                  className={`text-left px-6 md:px-8 py-7 md:py-8 flex flex-col gap-4 md:gap-5 transition-all duration-300 cursor-pointer ${
                    activeTestimonial === i ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className={`flex items-center gap-1.5 transition-all duration-300 ${activeTestimonial === i ? "opacity-100" : "opacity-0"}`}>
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <i key={s} className="ri-star-fill text-xs text-white/60"></i>
                      ))}
                    </div>
                    <span className="text-[11px] text-white/50 tracking-widest uppercase">Verified</span>
                  </div>
                  <p
                    className={`text-[14px] md:text-sm leading-relaxed font-light transition-colors duration-300 ${activeTestimonial === i ? "text-white/80" : "text-white/40"}`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                      <span className="text-[11px] font-bold text-white/60">{t.initials}</span>
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white/70">{t.name}</div>
                      <div className="text-[11px] text-white/45">{t.title}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CASE STUDIES GRID ──────────────────────────────────────── */}
      <div className="pt-[50px] md:pt-[100px] pb-10 px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto">
          {/* Header */}
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-white/25"></div>
                <span className="text-[10px] tracking-[0.45em] uppercase text-white/55 font-medium">
                  Case Studies
                </span>
              </div>
              <h3
                className="text-[30px] md:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Real Campaigns,
                <br />
                <em className="font-light italic" style={{color:'#7B9FD4'}}>Real Outcomes.</em>
              </h3>
            </div>
            <Link
              href="/results"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-white/40 hover:text-white transition-colors cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              View All
              <i className="ri-arrow-right-line text-xs"></i>
            </Link>
          </div>

          {/* 2-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {caseStudies.map((cs) => (
              <CaseCard key={cs.index} cs={cs} animate={animate} onNavigate={(href) => router.push(href)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE TICKER ─────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap" style={{ animation: "marqueeResults 28s linear infinite" }}>
          {[...Array(3)].map((_, ri) => (
            <div key={ri} className="flex items-center gap-0 flex-shrink-0">
              {[
                "Residential Treatment",
                "Detox Programs",
                "PHP Programs",
                "IOP Clinics",
                "Sober Living",
                "Dual Diagnosis",
                "Mental Health",
                "Behavioral Health",
              ].map((item) => (
                <span key={`${ri}-${item}`} className="flex items-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/18 font-light px-8">
                    {item}
                  </span>
                  <span className="text-white/10 text-xs">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeResults {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

    </section>
  );
}
