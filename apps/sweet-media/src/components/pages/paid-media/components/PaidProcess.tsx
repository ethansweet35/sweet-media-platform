"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    icon: "ri-search-eye-line",
    title: "Free Account Audit",
    accent: "Week 1",
    desc: "We dig into your existing ad accounts — Google, Meta, TV — and map every dollar of wasted spend. We identify underperforming campaigns, missed keyword coverage, bid errors, and attribution gaps before touching anything.",
    deliverable: "Full account audit report with prioritized action items",
  },
  {
    num: "02",
    icon: "ri-draft-line",
    title: "Campaign Architecture",
    accent: "Week 2–3",
    desc: "We redesign your campaign structure from the ground up — proper keyword segmentation, audience definitions, budget allocation, and conversion tracking. Every campaign is built to scale without breaking.",
    deliverable: "New campaign structure + budget allocation plan",
  },
  {
    num: "03",
    icon: "ri-flashlight-line",
    title: "Launch & First Leads",
    accent: "Day 14–21",
    desc: "Campaigns go live with full conversion tracking in place. Within the first two weeks, you start seeing inbound calls and form fills attributed directly to your ad spend — no guessing where they came from.",
    deliverable: "Live campaigns + conversion tracking confirmed",
  },
  {
    num: "04",
    icon: "ri-line-chart-line",
    title: "Optimize to Lowest CPL",
    accent: "Month 2–3",
    desc: "We run aggressive A/B tests on creative, audiences, and bids. Winners get scaled, losers get killed. Cost-per-lead drops. ROAS climbs. You get a monthly performance review call with the actual account manager.",
    deliverable: "Monthly reports + optimization roadmap + review call",
  },
  {
    num: "05",
    icon: "ri-refresh-line",
    title: "Scale What Works",
    accent: "Month 4+",
    desc: "With a proven account structure and winning creative, we scale. More budget goes to what's working, new channels get tested, and your cost-per-admission keeps dropping as optimization compounds.",
    deliverable: "Scaling plan + new channel testing + ongoing optimization",
  },
];

export default function PaidProcess() {
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
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-4 text-center lg:text-left">How It Works</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              From Audit to
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>First Admissions.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md text-center lg:text-right mx-auto lg:mx-0">
              Our proven 5-step process takes behavioral health facilities from wasted ad spend to a lean, high-performing paid media machine in 90 days.
            </p>
          </div>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-start transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
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

          <div className="bg-white border border-gray-100 rounded-3xl p-10 flex flex-col justify-between min-h-[380px] sticky top-28">
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
