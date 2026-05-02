"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const metrics = [
  { label: "Avg. CPA Reduction", val: 74, suffix: "%", color: "#7B9FD4" },
  { label: "Avg. Organic Growth", val: 340, suffix: "%", color: "#a8c5e8" },
  { label: "Client Retention", val: 92, suffix: "%", color: "#7B9FD4" },
  { label: "Avg. Google ROAS", val: 78, suffix: "%", color: "#c4d8f0" },
];

const sparkData = [18, 22, 20, 30, 38, 46, 55, 64, 76, 88, 95, 100];

function AnimatedSparkline({ animate }: { animate: boolean }) {
  const w = 320, h = 100, pad = 8;
  const max = Math.max(...sparkData), min = Math.min(...sparkData), range = max - min;
  const coords = sparkData.map((v, i) => ({
    x: pad + (i / (sparkData.length - 1)) * (w - pad * 2),
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
        <linearGradient id="heroSparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B9FD4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7B9FD4" stopOpacity="0" />
        </linearGradient>
        <clipPath id="heroSparkClip">
          <rect x={pad} y={0} height={h} width={animate ? w - pad * 2 : 0}
            style={{ transition: "width 2s cubic-bezier(0.4,0,0.2,1)" }} />
        </clipPath>
      </defs>
      <path d={fillD} fill="url(#heroSparkGrad)" clipPath="url(#heroSparkClip)" />
      <path d={d} fill="none" stroke="#7B9FD4" strokeWidth="2.5" strokeLinecap="round" clipPath="url(#heroSparkClip)" />
      {animate && (
        <>
          <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="5" fill="#7B9FD4" opacity="0.4" />
          <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="3" fill="#7B9FD4" />
        </>
      )}
    </svg>
  );
}

function AnimatedBar({ pct, color, animate, delay }: { pct: number; color: string; animate: boolean; delay: number }) {
  return (
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all ease-out"
        style={{
          width: animate ? `${pct}%` : "0%",
          background: color,
          transitionDuration: "1.4s",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

export default function ResultsHero() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "100%";
    }, 600);
    const t3 = setTimeout(() => setAnimate(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Lightweight CSS custom property parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let rafId = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        hero.style.setProperty("--orb1-y", `${scrollY * 0.18}px`);
        hero.style.setProperty("--orb2-y", `${scrollY * 0.32}px`);
        hero.style.setProperty("--sweep-y", `${scrollY * 0.10}px`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-[85vh] flex items-center overflow-hidden" style={{ background: "#0A1F44" }}>

      {/* Animated gradient sweep */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(123,159,212,0.28) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(180,210,255,0.1) 0%, transparent 60%)",
        animation: "resSweep 12s ease-in-out infinite alternate",
        transform: "translateY(var(--sweep-y, 0px))",
      }} />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{
          width: "600px", height: "600px", top: "-180px", right: "-120px",
          background: "radial-gradient(circle, rgba(123,159,212,0.28) 0%, transparent 70%)",
          animation: "resOrb1 18s ease-in-out infinite alternate",
          transform: "translateY(var(--orb1-y, 0px))",
          willChange: "transform",
        }} />
        <div className="absolute rounded-full" style={{
          width: "420px", height: "420px", bottom: "-100px", left: "-80px",
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
          animation: "resOrb2 14s ease-in-out infinite alternate",
          transform: "translateY(var(--orb2-y, 0px))",
          willChange: "transform",
        }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="resDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#resDots)" />
        </svg>
      </div>

      {/* Light beam */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%)",
        animation: "resBeam 8s ease-in-out infinite alternate",
      }} />

      {/* Decorative vertical rule */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-14 bg-white/15" />
        <p className="text-[8px] tracking-[0.45em] uppercase text-white/25 font-light" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Results · Proof · Growth
        </p>
        <div className="w-px h-14 bg-white/15" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 md:px-6 pt-32 pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-10 justify-center lg:justify-start">
          <Link href="/" className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors cursor-pointer">Home</Link>
          <span className="text-white/20 text-[9px]">/</span>
          <span className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/60">Results</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">

          {/* LEFT — copy */}
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-3 mb-8 transition-all duration-700 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="w-6 h-px bg-white/40 flex-shrink-0" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium">Verified Client Results</span>
            </div>

            <h1 className={`leading-[1.0] mb-6 transition-all duration-700 delay-100 text-center lg:text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-light italic text-white/70">Numbers That</span>
              <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-bold text-white">Don&apos;t Lie.</span>
            </h1>

            <div ref={lineRef} className="h-px bg-white/20 mb-8 transition-all duration-1000 ease-out max-w-full" style={{ width: "0%" }} />

            <p className={`text-white/55 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light transition-all duration-700 delay-150 text-center lg:text-left mx-auto lg:mx-0 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Real numbers from real behavioral health clients. No cherry-picked outliers — these are our averages across all active accounts, with full case studies and verified testimonials below.
            </p>

            <div className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="#results-case-studies" className="inline-flex items-center gap-2.5 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap">
                See Case Studies
                <i className="ri-arrow-right-line text-sm"></i>
              </a>
              <a href="#results-contact" className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-white/40 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                Get Your Audit
                <i className="ri-arrow-down-line text-xs"></i>
              </a>
            </div>
          </div>

          {/* RIGHT — animated data graphic */}
          <div className={`hidden lg:flex w-[420px] xl:w-[480px] flex-shrink-0 flex-col gap-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

            {/* Sparkline card */}
            <div className="bg-white/[0.06] border border-white/12 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium">Avg. Organic Traffic Growth</span>
                <span className="text-[10px] font-bold text-[#7B9FD4]">+340%</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>12 Months</span>
                <span className="text-xs text-white/35 mb-1 font-light">across all SEO clients</span>
              </div>
              <AnimatedSparkline animate={animate} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[9px] text-white/30 uppercase tracking-widest">Month 1</span>
                <span className="text-[9px] text-white/30 uppercase tracking-widest">Month 12</span>
              </div>
            </div>

            {/* Metric bars card */}
            <div className="bg-white/[0.06] border border-white/12 rounded-2xl p-6 backdrop-blur-sm">
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium block mb-5">Key Performance Averages</span>
              <div className="flex flex-col gap-4">
                {metrics.map((m, i) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/60 font-medium">{m.label}</span>
                      <span className="text-xs font-bold text-white">{m.val}{m.suffix}</span>
                    </div>
                    <AnimatedBar pct={m.val > 100 ? 100 : m.val} color={m.color} animate={animate} delay={i * 150} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom mini stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: "40+", label: "BH Clients", icon: "ri-hospital-line" },
                { val: "90d", label: "Avg. to Results", icon: "ri-timer-line" },
                { val: "100%", label: "BH Exclusive", icon: "ri-focus-3-line" },
              ].map((s) => (
                <div key={s.label} className="bg-white/[0.06] border border-white/12 rounded-xl p-4 flex flex-col items-center text-center gap-2 backdrop-blur-sm">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10">
                    <i className={`${s.icon} text-white/60 text-sm`}></i>
                  </div>
                  <div className="text-lg font-bold text-white leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[9px] text-white/35 uppercase tracking-wider leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20">
        <div className="w-px h-8 bg-white/20" />
        <p className="text-[8px] tracking-[0.35em] uppercase text-white/30">Scroll</p>
      </div>
    </section>
  );
}
