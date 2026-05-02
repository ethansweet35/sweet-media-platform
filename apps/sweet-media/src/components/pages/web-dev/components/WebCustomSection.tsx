"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-code-s-slash-line", label: "Custom Development", text: "No templates, no page builders. Every site is hand-coded for speed, security, and conversion — built specifically for behavioral health facilities." },
  { icon: "ri-speed-line", label: "Sub-Second Load Times", text: "We optimize every asset, every script, every render path. Core Web Vitals in the green on every page — because slow sites lose patients." },
  { icon: "ri-shield-check-line", label: "HIPAA-Aware Architecture", text: "Secure hosting, encrypted forms, no third-party data leaks. Every technical decision is made with patient privacy as the first priority." },
  { icon: "ri-smartphone-line", label: "Mobile-First Design", text: "60%+ of treatment searches happen on mobile. Every site we build looks and converts flawlessly on every device, every screen size." },
];

/* ─── Animated: PageSpeed Score Visual ──────────────────────────── */
function PageSpeedVisual({ active }: { active: boolean }) {
  const [score, setScore] = useState(0);
  const circumference = 2 * Math.PI * 54;

  useEffect(() => {
    if (!active) return;
    let s = 0;
    const interval = setInterval(() => {
      s += 2;
      if (s >= 98) { setScore(98); clearInterval(interval); }
      else setScore(s);
    }, 20);
    return () => clearInterval(interval);
  }, [active]);

  const metrics = [
    { label: "LCP", val: "1.2s", pct: 92 },
    { label: "FID", val: "8ms", pct: 98 },
    { label: "CLS", val: "0.02", pct: 96 },
    { label: "TTFB", val: "0.4s", pct: 94 },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Core Web Vitals</div>
          <div className="text-[9px] text-gray-400 mt-0.5">All Passing</div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
          <i className="ri-check-line text-green-500 text-xs"></i>
          <span className="text-[10px] font-bold text-green-700">Excellent</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden px-5 py-5 flex items-center gap-6">
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#f3f4f6" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none" stroke="#0A1F44"
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (score / 100) * circumference}
              style={{ transition: "stroke-dashoffset 0.05s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{score}</span>
            <span className="text-[8px] text-gray-400 uppercase tracking-wider">Score</span>
          </div>
        </div>
        <div className="flex-1 space-y-2.5">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 w-8 flex-shrink-0">{m.label}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#0A1F44] rounded-full transition-all duration-1000" style={{ width: active ? `${m.pct}%` : "0%" }} />
              </div>
              <span className="text-[10px] font-semibold text-black w-10 text-right flex-shrink-0">{m.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { val: "0.8s", label: "Load Time" },
          { val: "100%", label: "Mobile Score" },
          { val: "A+", label: "HIPAA Grade" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
            <div className="text-sm font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
            <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function WebCustomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="web-custom" className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Custom Websites</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fast, Secure, and
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Built to Convert.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Every site we build is hand-coded from scratch — no bloated templates, no page builders. Just clean, fast, conversion-focused code that loads in under a second and turns visitors into calls.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "98", label: "PageSpeed Score" },
                { val: "0.8s", label: "Avg. Load Time" },
                { val: "40+", label: "Sites Built" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 group cursor-default">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/5 group-hover:bg-[#0A1F44] transition-colors duration-200 mt-0.5">
                    <i className={`${f.icon} text-sm text-black/50 group-hover:text-white transition-colors duration-200`}></i>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black mb-0.5 leading-snug">{f.label}</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-1 lg:order-2">
            <div className="bg-[#f7f6f4] rounded-3xl p-6 h-[480px] flex flex-col">
              <PageSpeedVisual active={visible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}