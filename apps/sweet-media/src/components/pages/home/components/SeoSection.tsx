"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const pillars = [
  {
    icon: "ri-sparkling-2-line",
    title: "AI & Generative SEO",
    desc: "Get cited by ChatGPT, Gemini, and Google AI Overviews — before a patient ever clicks a link.",
    stat: "+287%",
    statLabel: "AI-Referred Traffic",
  },
  {
    icon: "ri-bar-chart-2-line",
    title: "Organic Rankings",
    desc: "Climb to Page 1 and stay there. Content, backlinks, and technical foundations that compound month over month.",
    stat: "90 Days",
    statLabel: "Avg. to Top 3",
  },
  {
    icon: "ri-map-pin-2-line",
    title: "Local Map Pack",
    desc: "Own the top 3 local results in every city you serve. More map pack presence means more calls, more admissions.",
    stat: "30+",
    statLabel: "Cities Ranked",
  },
];

const keywords = [
  { kw: "drug rehab near me", pos: 1, vol: "8.1K/mo" },
  { kw: "alcohol treatment center", pos: 2, vol: "5.4K/mo" },
  { kw: "inpatient rehab [city]", pos: 1, vol: "3.9K/mo" },
  { kw: "addiction treatment programs", pos: 3, vol: "6.2K/mo" },
  { kw: "residential rehab facility", pos: 1, vol: "2.7K/mo" },
];

export default function SeoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="seo-services" className="w-full bg-white py-[50px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Search Engine Optimization</span>
              </div>
              <h2 className="text-[36px] md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Own Every Corner
                <br />
                <em className="font-light italic" style={{color:'#0A1F44'}}>of Search.</em>
              </h2>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-black/60 text-[14px] md:text-sm leading-relaxed max-w-md">
                From AI-powered overviews to organic rankings to local map packs — we make sure your facility is the first name people see, click, and call.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-md">
                {[
                  { val: "+312%", label: "Avg. Traffic Lift" },
                  { val: "40+", label: "BH Clients" },
                  { val: "100%", label: "BH Focused" },
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

        {/* Main content — 3 pillars + keyword panel */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {pillars.map((p) => (
            <div key={p.title} className="bg-[#f4f6f9] rounded-2xl p-7 flex flex-col gap-4 hover:bg-[#eef1f8] border border-black/5 transition-colors duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 group-hover:bg-[#0A1F44] transition-colors duration-300">
                <i className={`${p.icon} text-[#0A1F44] text-base group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-black mb-2">{p.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-black/8">
                <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{p.stat}</span>
                <span className="text-[10px] uppercase tracking-widest text-black/40 ml-2">{p.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Keyword rankings strip + CTA */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Keyword panel */}
          <div className="bg-[#0A1F44] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-sm font-semibold text-white">Live Keyword Rankings</span>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                <i className="ri-arrow-up-line text-green-400 text-xs"></i>
                <span className="text-xs text-green-300 font-semibold">All Climbing</span>
              </div>
            </div>
            <div className="divide-y divide-white/8">
              {keywords.map((k) => (
                <div key={k.kw} className="flex items-center gap-3 px-6 py-3.5">
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold flex-shrink-0 ${k.pos === 1 ? "bg-white text-[#0A1F44]" : "bg-white/10 text-white/60"}`}>
                    {k.pos}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{k.kw}</div>
                    <div className="h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${k.pos === 1 ? "bg-white" : "bg-white/40"}`} style={{ width: k.pos === 1 ? "100%" : k.pos === 2 ? "70%" : "50%" }} />
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${k.pos === 1 ? "bg-white text-[#0A1F44]" : "bg-white/10 text-white/60"}`}>#{k.pos}</span>
                    <div className="text-[10px] text-white/40 mt-0.5">{k.vol}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-[#f4f6f9] rounded-2xl p-8 flex flex-col justify-between border border-black/5">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A1F44] font-semibold">Full SEO Service Suite</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                A complete SEO strategy built for behavioral health — not a generic playbook.
              </h3>
              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  "AI & Generative Engine Optimization",
                  "Technical SEO & Core Web Vitals",
                  "High-Authority Link Building",
                  "Multi-Location Local SEO",
                  "Content Strategy & Production",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#0A1F44] flex-shrink-0">
                      <i className="ri-check-line text-white text-[9px]"></i>
                    </div>
                    <span className="text-sm text-black/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href="/seo"
              className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-xl hover:bg-[#0d2a5e] transition-colors duration-200 cursor-pointer whitespace-nowrap self-start"
            >
              Explore Full SEO Services
              <i className="ri-arrow-right-line text-sm"></i>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
