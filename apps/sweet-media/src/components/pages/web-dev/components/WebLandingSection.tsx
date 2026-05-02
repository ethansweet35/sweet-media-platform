"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-layout-line", label: "Campaign-Specific Pages", text: "Every paid campaign gets its own dedicated landing page — no nav, no distractions, just one clear path from click to conversion." },
  { icon: "ri-flask-line", label: "Continuous A/B Testing", text: "We test headlines, CTAs, form fields, and layouts weekly. Winners get scaled, losers get killed. Conversion rate compounds over time." },
  { icon: "ri-phone-line", label: "Click-to-Call Optimization", text: "Prominent phone numbers, sticky call buttons, and tap-to-call on mobile. Because for behavioral health, a phone call is worth more than a form fill." },
  { icon: "ri-file-list-3-line", label: "Form Optimization", text: "We remove friction at every step — fewer required fields, smart defaults, and progress indicators. Every field earns its place." },
];

/* ─── Animated: Conversion Funnel Visual ──────────────────────────── */
const funnelSteps = [
  { label: "Visitors", count: "12,400", pct: 100 },
  { label: "Engaged", count: "6,820", pct: 55 },
  { label: "Form Started", count: "2,108", pct: 17 },
  { label: "Submitted", count: "1,054", pct: 8.5 },
  { label: "Qualified Lead", count: "524", pct: 4.2 },
];

function FunnelVisual({ active }: { active: boolean }) {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Conversion Funnel</div>
          <div className="text-[9px] text-gray-400 mt-0.5">Last 30 Days — Landing Pages</div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
          <i className="ri-arrow-up-line text-xs text-green-500"></i>
          <span className="text-[10px] font-bold text-green-700">+44% Uplift</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden px-5 py-5">
        {funnelSteps.map((step, i) => (
          <div key={step.label} className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">{step.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">{step.count}</span>
                <span className="text-xs font-bold text-black w-8 text-right">{step.pct}%</span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: active ? `${step.pct}%` : "0%",
                  transitionDelay: `${i * 120 + 200}ms`,
                  background: i === 0 ? "#0A1F44" : i === 1 ? "#1a3a6e" : i === 2 ? "#2a5298" : i === 3 ? "#4a72b8" : "#7a9fd8",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-black/8 px-4 py-3 flex items-center gap-2">
        <i className="ri-lightbulb-line text-yellow-500 text-sm flex-shrink-0"></i>
        <p className="text-[11px] text-gray-500">
          Removing 3 required fields increased form submissions by <span className="font-bold text-black">+44%</span>
        </p>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function WebLandingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="web-landing" className="w-full bg-[#f9f9f8] py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className={`flex flex-col lg:flex-row-reverse gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-black/8 p-6 h-[520px] flex flex-col">
              <FunnelVisual active={visible} />
            </div>
          </div>

          {/* Left — content */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Landing Pages</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              One Page.
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>One Clear Path.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Dedicated landing pages for every campaign — no navigation, no distractions, just a single focused journey from click to call. A/B tested weekly and optimized for the highest conversion rate in your market.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "8.4%", label: "Peak Conv. Rate" },
                { val: "+44%", label: "Form Uplift" },
                { val: "48 hr", label: "Page Launch" },
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

        </div>
      </div>
    </section>
  );
}