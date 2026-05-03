"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    icon: "ri-code-s-slash-line",
    title: "Custom Websites",
    desc: "Fast, HIPAA-conscious websites built from scratch — engineered to earn trust on the first scroll and turn visitors into phone calls.",
    stat: "0.8s",
    statLabel: "Avg. Load Time",
  },
  {
    icon: "ri-layout-line",
    title: "Landing Pages",
    desc: "Dedicated, A/B-tested landing pages for every campaign. No nav, no distractions — just one clear path to conversion.",
    stat: "8.4%",
    statLabel: "Peak Conv. Rate",
  },
  {
    icon: "ri-bar-chart-2-line",
    title: "Maintenance & CRO",
    desc: "Monthly care plans covering security, updates, heatmaps, and continuous A/B testing so your site compounds results over time.",
    stat: "+44%",
    statLabel: "Avg. Form Uplift",
  },
];

export default function WebDevSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const interval = setInterval(() => {
          s += 2;
          setScore(s);
          if (s >= 98) clearInterval(interval);
        }, 20);
      }
    }, { threshold: 0.3 });
    if (scoreRef.current) obs.observe(scoreRef.current);
    return () => obs.disconnect();
  }, [visible]);

  const circumference = 2 * Math.PI * 54;

  const funnelSteps = [
    { label: "Visitors", count: "12,400", pct: 100 },
    { label: "Engaged", count: "6,820", pct: 55 },
    { label: "Form Started", count: "2,108", pct: 17 },
    { label: "Submitted", count: "1,054", pct: 8.5 },
    { label: "Qualified Lead", count: "524", pct: 4.2 },
  ];

  return (
    <section ref={sectionRef} id="web-development" className="w-full bg-white py-[50px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Website Development</span>
              </div>
              <h2 className="text-[36px] md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Websites Built to
                <br />
                <em className="font-light italic" style={{color:'#0A1F44'}}>Fill Your Beds.</em>
              </h2>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-black/60 text-[14px] md:text-sm leading-relaxed max-w-md">
                From custom-built brand sites to high-converting ad landing pages — every property we create is engineered for one outcome: more admissions.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-md">
                {[
                  { val: "98", label: "PageSpeed Score" },
                  { val: "48 Hrs", label: "Page Launch" },
                  { val: "40+", label: "Sites Built" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</span>
                    <span className="text-[10px] uppercase tracking-widest text-black/40">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {services.map((s) => (
            <div key={s.title} className="bg-[#f4f6f9] rounded-2xl p-6 md:p-7 border border-black/5 flex flex-col gap-4 hover:bg-[#eef1f8] transition-colors duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 group-hover:bg-[#0A1F44] transition-colors duration-300">
                <i className={`${s.icon} text-[#0A1F44] text-base group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-black mb-2">{s.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-black/6">
                <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.stat}</span>
                <span className="text-[10px] uppercase tracking-widest text-black/40 ml-2">{s.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Link
            href="/web-dev"
            className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-xl hover:bg-[#0d2a5e] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Explore Web Services
            <i className="ri-arrow-right-line text-sm"></i>
          </Link>
        </div>

        {/* Performance score + funnel */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* PageSpeed ring */}
          <div ref={scoreRef} className="bg-[#f4f6f9] rounded-2xl border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/6">
              <span className="text-sm font-semibold text-black">Core Web Vitals</span>
              <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-semibold">All Passing</span>
            </div>
            <div className="px-6 py-6 flex items-center gap-8">
              <div className="relative w-28 h-28 flex-shrink-0">
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
                  <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{score}</span>
                  <span className="text-[9px] text-black/40 uppercase tracking-wider">Score</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {[
                  { label: "LCP", val: "1.2s" },
                  { label: "FID", val: "8ms" },
                  { label: "CLS", val: "0.02" },
                  { label: "TTFB", val: "0.4s" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <span className="text-xs text-black/40 w-10 flex-shrink-0">{m.label}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A1F44] rounded-full" style={{ width: "92%" }} />
                    </div>
                    <span className="text-xs font-semibold text-black w-10 text-right flex-shrink-0">{m.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-black/6 grid grid-cols-3 divide-x divide-black/6">
              {[
                { val: "0.8s", label: "Load Time" },
                { val: "100%", label: "Mobile Score" },
                { val: "A+", label: "HIPAA Grade" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3 text-center">
                  <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] text-black/40 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion funnel */}
          <div className="bg-[#f4f6f9] rounded-2xl border border-black/5 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/6">
              <span className="text-sm font-semibold text-black">Conversion Funnel</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-black/45">Live — Last 30 days</span>
              </div>
            </div>
            <div className="px-6 py-5">
              {funnelSteps.map((step, i) => (
                <div key={step.label} className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-black/65">{step.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-black/40">{step.count}</span>
                      <span className="text-xs font-bold text-black w-10 text-right">{step.pct}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: visible ? `${step.pct}%` : "0%",
                        transitionDelay: `${i * 120 + 300}ms`,
                        background: i === 0 ? "#0A1F44" : i === 1 ? "#1a3a6e" : i === 2 ? "#2a5298" : i === 3 ? "#4a72b8" : "#7a9fd8",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-black/6 px-6 py-3 flex items-center gap-2 bg-black/[0.02]">
              <i className="ri-arrow-up-circle-line text-green-500 text-sm flex-shrink-0"></i>
              <p className="text-xs text-black/50">
                Form submission rate improved <span className="font-bold text-black">+44%</span> after removing 3 required fields.
              </p>
            </div>
            <div className="border-t border-black/6 grid grid-cols-3 divide-x divide-black/6">
              {[
                { val: "4.2%", label: "Lead Conv. Rate" },
                { val: "+44%", label: "Form Uplift" },
                { val: "Monthly", label: "CRO Audits" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3 text-center">
                  <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] text-black/40 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
