"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix = "", prefix = "", decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
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
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { num: 3.2, suffix: "×", prefix: "", label: "Avg. Google ROAS", sub: "Across all BH clients", decimals: 1 },
  { num: 47, suffix: "", prefix: "$", label: "Avg. Cost Per Lead", sub: "Industry avg. $180+", decimals: 0 },
  { num: 74, suffix: "%", prefix: "", label: "Avg. CPA Reduction", sub: "Within first 6 months", decimals: 0 },
  { num: 340, suffix: "%", prefix: "", label: "Avg. Organic Growth", sub: "SEO traffic increase", decimals: 0 },
  { num: 40, suffix: "+", prefix: "", label: "Clients Served", sub: "Behavioral health orgs", decimals: 0 },
  { num: 92, suffix: "%", prefix: "", label: "Client Retention", sub: "Year-over-year", decimals: 0 },
];

export default function ResultsStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden" style={{ background: "#0d1f3a" }}>
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="resGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#resGrid)" />
        </svg>
      </div>

      <div className="relative max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="w-6 h-px bg-white/25"></div>
            <span className="text-[9px] tracking-[0.45em] uppercase text-white/40 font-medium">Performance Metrics</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
                Averages Across
                <br /><em className="font-light italic" style={{color:'#7B9FD4'}}>All Active Accounts.</em>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-md font-light text-center lg:text-left mx-auto lg:mx-0">
                These aren't our best results — they're our typical results. Every number below is the median across our entire client base over the last 12 months.
              </p>
            </div>
            <div className="flex items-center gap-2 lg:justify-end">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-white/40 tracking-widest uppercase">Updated April 2026</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/20 rounded-2xl overflow-hidden transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 md:px-8 py-5 md:py-8 flex flex-col gap-3 transition-colors duration-300 hover:bg-white/[0.04] ${
                i < 4 ? "border-b border-white/20" : ""
              } ${
                i % 2 === 0 ? "border-r border-white/20" : ""
              } ${
                i % 3 === 2 ? "md:border-r-0" : "md:border-r border-white/20"
              } ${
                i >= 2 && i < 4 ? "md:border-b-0" : ""
              } ${
                i >= 4 ? "border-b-0" : ""
              }`}
            >
              <div className="text-3xl md:text-5xl font-bold text-white leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                <Counter target={s.num} suffix={s.suffix} prefix={s.prefix} decimals={s.decimals} />
              </div>
              <div className="w-6 h-px bg-white/30 my-1"></div>
              <div className="text-xs md:text-sm font-semibold text-white/80">{s.label}</div>
              <div className="text-[10px] text-white/45 tracking-wide hidden sm:block">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Bottom proof bar */}
        <div className={`mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {[
            { val: "40+", label: "BH Facilities Served" },
            { val: "3.2×", label: "Avg. Google ROAS" },
            { val: "90 Days", label: "Avg. Time to Results" },
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