"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-bar-chart-2-line", label: "Heatmap Analysis", text: "We track where visitors click, scroll, and drop off — then redesign based on real behavior, not assumptions." },
  { icon: "ri-flask-line", label: "Weekly A/B Tests", text: "Headlines, CTAs, form layouts, and images tested every week. Winners get scaled across all pages immediately." },
  { icon: "ri-speed-line", label: "Performance Monitoring", text: "Real-time alerts when page speed drops, forms break, or conversion rates shift. We catch issues before they cost you leads." },
  { icon: "ri-shield-check-line", label: "Security & Compliance", text: "Monthly security audits, SSL monitoring, and HIPAA compliance checks. Your site stays protected and compliant 24/7." },
];

/* ─── Animated: CRO Dashboard Visual ──────────────────────────── */
const tests = [
  { name: "Headline A vs B", variantA: "3.2%", variantB: "5.8%", winner: "B", uplift: "+81%" },
  { name: "CTA Color", variantA: "Navy", variantB: "Green", winner: "A", uplift: "+12%" },
  { name: "Form Fields", variantA: "7 fields", variantB: "4 fields", winner: "B", uplift: "+44%" },
  { name: "Hero Image", variantA: "Facility", variantB: "Team", winner: "A", uplift: "+23%" },
];

function CroDashboardVisual({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!active) return;
    setRevealed(0);
    tests.forEach((_, i) => {
      setTimeout(() => setRevealed((n) => n + 1), 200 + i * 180);
    });
  }, [active]);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Active A/B Tests</div>
          <div className="text-[9px] text-gray-400 mt-0.5">This Month — All Pages</div>
        </div>
        <div className="flex items-center gap-1.5 bg-black text-white rounded-full px-3 py-1.5">
          <i className="ri-flask-line text-xs"></i>
          <span className="text-[10px] font-semibold">4 Running</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {tests.map((t, i) => (
            <div
              key={t.name}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-500 ${revealed > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-7 h-7 flex-shrink-0 rounded-full bg-black/5 flex items-center justify-center text-xs font-bold text-black/60">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800">{t.name}</div>
                <div className="text-[9px] text-gray-400 mt-0.5">A: {t.variantA} · B: {t.variantB}</div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full font-bold">Winner: {t.winner}</span>
                <span className="text-[10px] font-bold text-green-600">{t.uplift}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>+44%</div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Avg. Form Uplift</div>
        </div>
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>Monthly</div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">CRO Audits</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function WebCroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="web-cro" className="w-full py-[60px] md:py-[100px] overflow-hidden" style={{ background: "#0A1F44" }}>
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-white/40 border border-white/15 rounded-full px-3 py-1">CRO &amp; Maintenance</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Optimize What Works,
              <br /><em className="font-light italic" style={{color:'#7B9FD4'}}>Fix What Doesn&apos;t.</em>
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Your website is never "done." We run continuous A/B tests, monitor performance, and optimize every element — so your conversion rate keeps climbing month after month.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-white/10 mb-8 justify-center lg:justify-start">
              {[
                { val: "+44%", label: "Avg. Form Uplift" },
                { val: "Monthly", label: "CRO Audits" },
                { val: "24/7", label: "Uptime Monitoring" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 group cursor-default">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-200 mt-0.5">
                    <i className={`${f.icon} text-sm text-white/60 group-hover:text-white transition-colors duration-200`}></i>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white mb-0.5 leading-snug">{f.label}</div>
                    <p className="text-xs text-white/45 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-1 lg:order-2">
            <div className="bg-white/[0.06] border border-white/10 rounded-3xl p-6 h-[480px] flex flex-col">
              <CroDashboardVisual active={visible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}