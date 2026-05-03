"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const channels = [
  {
    icon: "ri-google-line",
    title: "Google Ads",
    tag: "Search & Display",
    desc: "Capture patients actively searching for treatment right now. Intent-based campaigns with full attribution back to admissions.",
    metrics: [
      { val: "3.7x", label: "ROAS" },
      { val: "8.4%", label: "Conv. Rate" },
    ],
    accent: "bg-[#0A1F44]",
  },
  {
    icon: "ri-instagram-line",
    title: "Meta Ads",
    tag: "Facebook & Instagram",
    desc: "Reach families and individuals before they start searching. Retargeting funnels that convert awareness into admissions.",
    metrics: [
      { val: "5.2x", label: "ROAS" },
      { val: "$21", label: "Cost/Lead" },
    ],
    accent: "bg-[#0A1F44]",
  },
  {
    icon: "ri-tv-2-line",
    title: "TV & Streaming",
    tag: "CTV · OTT · Linear",
    desc: "Run targeted 30-second spots on Hulu, Roku, and YouTube TV — with full attribution back to phone calls and admissions.",
    metrics: [
      { val: "2.1M", label: "Impressions" },
      { val: "91%", label: "View Rate" },
    ],
    accent: "bg-[#0A1F44]",
  },
];

const adMockRows = [
  { label: "Rize OC — Benzo Detox", status: "Active", cpa: "$115", roas: "3.7x", trend: "+12%" },
  { label: "Rize OC — Fentanyl Detox", status: "Active", cpa: "$195", roas: "11.2x", trend: "+28%" },
  { label: "Rize OC — Outpatient", status: "Active", cpa: "$320", roas: "6.8x", trend: "+9%" },
  { label: "Rize OC — Mental Health", status: "Active", cpa: "$295", roas: "7.4x", trend: "+18%" },
];

export default function PaidMediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[50px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Paid Advertising</span>
              </div>
              <h2 className="text-[36px] md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Every Dollar Spent,
                <br />
                <em className="font-light italic" style={{color:'#0A1F44'}}>Accountable.</em>
              </h2>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-black/60 text-[14px] md:text-sm leading-relaxed max-w-md">
                We run paid media across every major platform — with full transparency on where your budget goes, what it costs per admission, and what it returns.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-md">
                {[
                  { val: "3.7x", label: "Avg. ROAS" },
                  { val: "$67", label: "Avg. CPL" },
                  { val: "100%", label: "In-House" },
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

        {/* Channel cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {channels.map((ch) => (
            <div key={ch.title} className="bg-white rounded-2xl p-6 md:p-7 border border-gray-100 flex flex-col gap-4 hover:border-[#0A1F44]/20 transition-colors duration-300 group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 group-hover:bg-[#0A1F44] transition-colors duration-300">
                  <i className={`${ch.icon} text-[#0A1F44] text-base group-hover:text-white transition-colors duration-300`}></i>
                </div>
                <span className="text-[9px] tracking-[0.2em] uppercase text-black/35 font-medium border border-black/10 rounded-full px-2.5 py-1">{ch.tag}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-black mb-2">{ch.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{ch.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-black/6 flex gap-5">
                {ch.metrics.map((m) => (
                  <div key={m.label}>
                    <span className="text-xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{m.val}</span>
                    <div className="text-[10px] uppercase tracking-widest text-black/40 mt-2">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Live campaign dashboard strip + CTA */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Campaign dashboard */}
          <div className="bg-white rounded-2xl border border-black/8 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/6">
              <span className="text-sm font-semibold text-black">Active Campaigns</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse block"></span>
                <span className="text-xs text-black/45">Live · All Performing</span>
              </div>
            </div>
            <div className="divide-y divide-black/4">
              {adMockRows.map((row) => (
                <div key={row.label} className="flex items-center gap-3 px-6 py-3.5">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-black truncate">{row.label}</div>
                    <div className="text-[10px] text-black/40 mt-0.5">CPA: {row.cpa} · ROAS: {row.roas}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold text-green-600">{row.trend}</span>
                    <span className="text-[9px] bg-green-50 text-green-700 border border-green-200 font-bold px-2 py-0.5 rounded-full">{row.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-black/6 grid grid-cols-3 divide-x divide-black/6">
              {[
                { val: "$67", label: "Avg. CPL" },
                { val: "3.7x", label: "Avg. ROAS" },
                { val: "40+", label: "Accounts" },
              ].map((s) => (
                <div key={s.label} className="px-4 py-3 text-center">
                  <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] text-black/40 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-[#0A1F44] rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-semibold">Full Paid Media Suite</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                Every platform. Every format. All in-house — no outsourcing.
              </h3>
              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  "Google Search, Display & Performance Max",
                  "Meta (Facebook & Instagram) Ads",
                  "CTV / OTT Streaming Campaigns",
                  "HIPAA-Aware Landing Pages",
                  "Full Attribution & Reporting",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-white/15 flex-shrink-0">
                      <i className="ri-check-line text-white text-[9px]"></i>
                    </div>
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/paid-media"
              className="inline-flex items-center gap-2.5 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-5 py-3 rounded-xl hover:bg-white/90 transition-colors duration-200 cursor-pointer self-start"
            >
              Explore Paid Media
              <i className="ri-arrow-right-line text-sm"></i>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
