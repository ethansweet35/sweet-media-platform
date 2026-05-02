"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    icon: "ri-search-eye-line",
    title: "Free SEO Audit",
    accent: "Week 1",
    desc: "We start with a comprehensive technical and content audit of your current search presence. We identify ranking gaps, competitor advantages, and quick wins — then map a clear path to Page 1.",
    deliverable: "Full audit report delivered in 5 business days",
  },
  {
    num: "02",
    icon: "ri-draft-line",
    title: "Custom SEO Roadmap",
    accent: "Week 2–3",
    desc: "Every roadmap is built specifically for your facility, your market, and your census goals. No recycled templates — just a clear 90-day plan with prioritized actions and projected outcomes.",
    deliverable: "Roadmap + keyword strategy + content calendar",
  },
  {
    num: "03",
    icon: "ri-flashlight-line",
    title: "Rapid Execution",
    accent: "Day 30",
    desc: "Technical fixes go live, content ships, and Google Business Profiles are fully optimized in your first 30 days. We move fast because ranking velocity matters.",
    deliverable: "Technical SEO live + 4 content pieces published",
  },
  {
    num: "04",
    icon: "ri-line-chart-line",
    title: "Rankings & Traffic Growth",
    accent: "Day 60–90",
    desc: "Keywords begin climbing. Local map pack positions improve. AI tools start citing your facility. You see the numbers moving — every week, in your live reporting dashboard.",
    deliverable: "Weekly ranking reports + monthly review call",
  },
  {
    num: "05",
    icon: "ri-refresh-line",
    title: "Compound & Scale",
    accent: "Month 4+",
    desc: "Once the foundation is set, we scale. More content, more backlinks, more markets — building SEO authority that compounds and protects your lead position.",
    deliverable: "Ongoing optimization + expansion roadmap",
  },
];

export default function SeoProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setActive((s) => (s + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <section ref={sectionRef} className="w-full bg-white py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-4 text-center lg:text-left">How It Works</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              From Audit to
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Page 1 Rankings.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md text-center lg:text-right">
              Our proven 5-step process takes behavioral health facilities from invisible to dominant in their local and national search markets.
            </p>
          </div>
        </div>

        {/* Process layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-start transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Steps selector */}
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() => setActive(i)}
                className={`group w-full text-left rounded-2xl border transition-all duration-300 cursor-pointer px-5 py-4 flex items-center gap-4 ${active === i ? "bg-[#0A1F44] border-[#0A1F44]" : "bg-white border-gray-100 hover:border-black/20"}`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 transition-colors duration-300 ${active === i ? "bg-white/10" : "bg-black/5"}`}>
                  <i className={`${s.icon} text-base transition-colors duration-300 ${active === i ? "text-white" : "text-black/50"}`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold transition-colors duration-300 ${active === i ? "text-white" : "text-black"}`}>{s.title}</div>
                  <div className={`text-[10px] font-medium uppercase tracking-widest mt-0.5 transition-colors duration-300 ${active === i ? "text-white/40" : "text-gray-400"}`}>{s.accent}</div>
                </div>
                <span className={`text-2xl font-bold transition-colors duration-300 flex-shrink-0 ${active === i ? "text-white/15" : "text-black/8"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.num}
                </span>
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[380px] lg:sticky lg:top-28">
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-black/30 mb-4 block">{steps[active].accent}</span>
              <div className="text-[80px] font-bold text-black/5 leading-none select-none -mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {steps[active].num}
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {steps[active].title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{steps[active].desc}</p>
              <div className="flex items-center gap-3 bg-black/[0.03] rounded-xl px-4 py-3">
                <i className="ri-checkbox-circle-line text-black/40 text-base flex-shrink-0"></i>
                <span className="text-xs text-gray-500 font-medium">{steps[active].deliverable}</span>
              </div>
            </div>
            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-8">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`cursor-pointer transition-all duration-300 rounded-full ${active === i ? "w-6 h-2 bg-[#0A1F44]" : "w-2 h-2 bg-black/15 hover:bg-black/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
