"use client";

import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: "ri-focus-3-line",
    title: "Exclusive Focus",
    desc: "We only work with behavioral health. Every strategy, every keyword, every ad is informed by years of deep market expertise — not a generic playbook adapted from another industry.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Compliance First",
    desc: "HIPAA awareness isn't a checkbox for us — it's built into every campaign, landing page, and piece of content we produce. We protect your patients and your license.",
  },
  {
    icon: "ri-eye-2-line",
    title: "Full Transparency",
    desc: "Real-time dashboards, weekly calls, zero black boxes. Every dollar is tracked to a real admission outcome. You always know exactly what's working and why.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Mission-Driven",
    desc: "We believe effective marketing for behavioral health facilities saves lives. When your census is full, more people get the help they need. That's why we do this work.",
  },
];

const milestones = [
  { year: "2023", event: "Sweet Media founded in Costa Mesa, CA by Ethan Sweet" },
  { year: "2018", event: "First 10 behavioral health clients — exclusively residential treatment" },
  { year: "2019", event: "Expanded to paid media and local SEO for multi-location networks" },
  { year: "2021", event: "Launched web development practice for treatment center websites" },
  { year: "2022", event: "Grew to 30+ active clients across 15 states" },
  { year: "2024", event: "Pioneered AI SEO (GEO) for behavioral health — first in the industry" },
  { year: "2025", event: "40+ active clients, 92% retention rate, $420 avg. cost-per-admission" },
];

export default function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Mission / Story — grey bg */}
      <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">

          {/* Header */}
          <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Our Story</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Why We Only Do
                  <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Behavioral Health.</em>
                </h2>
                <p className="text-black/60 text-sm leading-relaxed mb-5">
                  Sweet Media was founded in 2023 by Ethan Sweet after watching behavioral health facilities repeatedly get burned by generalist agencies that didn't understand the industry — agencies that ran the same playbooks they used for e-commerce and real estate, with predictably poor results.
                </p>
                <p className="text-black/60 text-sm leading-relaxed mb-5">
                  The behavioral health marketing landscape is uniquely complex. Compliance requirements, patient privacy laws, platform advertising restrictions, and the emotional weight of the patient journey all demand a level of specialization that generalist agencies simply can't provide.
                </p>
                <p className="text-black/60 text-sm leading-relaxed">
                  So we built the agency we wished existed. One that speaks the language of treatment, understands the compliance landscape, and measures success in admissions and census — not impressions and click-through rates.
                </p>
              </div>

              {/* Quote block */}
              <div className="bg-[#0A1F44] rounded-3xl p-8 md:p-10">
                <div className="w-8 h-px bg-white/25 mb-6" />
                <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  &ldquo;We don&apos;t work with everyone. We work with behavioral health — exclusively. That focus means faster results, sharper strategy, and a team that already speaks your language.&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20">
                    <span className="text-xs font-bold text-white">ES</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Ethan Sweet</div>
                    <div className="text-xs text-white/45">Founder, Sweet Media</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-black/6 hover:border-black/15 transition-all duration-200">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 mb-4">
                  <i className={`${v.icon} text-[#0A1F44] text-base`}></i>
                </div>
                <h3 className="text-sm font-bold text-black mb-2">{v.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline — white bg */}
      <section className="w-full bg-white py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
        <div className="max-w-screen-xl mx-auto">

          <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Our Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Seven Years of
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Focused Growth.</em>
            </h2>
          </div>

          <div className={`relative transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-black/8 hidden md:block" />

            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex items-start gap-6 md:gap-10 group">
                  {/* Year */}
                  <div className="flex-shrink-0 w-[72px] text-right hidden md:block">
                    <span className="text-sm font-bold text-[#0A1F44] group-hover:text-black transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>{m.year}</span>
                  </div>

                  {/* Dot */}
                  <div className="relative flex-shrink-0 hidden md:flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full border-2 border-[#0A1F44]/30 bg-white group-hover:border-[#0A1F44] group-hover:bg-[#0A1F44] transition-all duration-200 mt-1" />
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pb-8 ${i < milestones.length - 1 ? "border-b border-black/5 md:border-0" : ""}`}>
                    <span className="text-[10px] font-bold text-[#0A1F44] tracking-widest uppercase md:hidden">{m.year}</span>
                    <p className="text-sm text-black/70 leading-relaxed mt-0.5 md:mt-1 group-hover:text-black transition-colors">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}