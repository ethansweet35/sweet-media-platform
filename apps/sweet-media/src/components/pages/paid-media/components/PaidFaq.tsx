"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "How quickly can I expect to see results from paid advertising?",
    a: "Google Ads typically deliver leads within the first 1–2 weeks of launch once proper tracking is set up. Meta campaigns can take 2–4 weeks as the algorithm learns your audience. TV and streaming campaigns build reach quickly but are best for brand awareness and retargeting support, not direct response in the first 30 days.",
  },
  {
    q: "Do you only run paid media for behavioral health?",
    a: "Yes — 100% of our paid media accounts are behavioral health. We've managed Google, Meta, and TV campaigns exclusively for treatment centers, detox facilities, sober living homes, and mental health clinics. We know the compliance landscape, the LegitScript requirements, and the audience behavior inside and out.",
  },
  {
    q: "How do you handle LegitScript certification for Google Ads?",
    a: "LegitScript certification is required to run addiction treatment ads on Google. If your facility isn't yet certified, we walk you through the application process and help prepare the required documentation. If you're already certified, we ensure your campaigns comply with all Google Healthcare policies so your account stays active.",
  },
  {
    q: "What's included in the free account audit?",
    a: "We review your existing Google Ads and Meta accounts (if any), identify structural issues, wasted spend, missed keyword opportunities, bid errors, and tracking gaps. If you don't have existing accounts, we audit your competitors and build a launch plan. Everything is delivered as a written report within 5 business days.",
  },
  {
    q: "How do you report on paid media performance?",
    a: "Every client gets a live reporting dashboard updated in real time — showing spend, impressions, leads, cost-per-lead, and ROAS by channel. We hold monthly review calls with the actual account manager (not an account rep) to discuss results, optimizations, and the next 30-day plan.",
  },
  {
    q: "Do you produce creative in-house or do we need our own assets?",
    a: "We produce everything in-house — static display ads, social creative, video ad scripts, and TV/CTV spots. You don't need to bring assets. If you have existing brand materials or video footage, we'll incorporate them. If not, we build from scratch using our own production team.",
  },
  {
    q: "What's the minimum monthly ad budget you recommend?",
    a: "For Google Ads, we typically recommend a minimum of $5K/month in media spend to generate meaningful data and optimize efficiently. Meta can produce results starting around $3K/month. TV and streaming campaigns typically require $10K+ in media to reach meaningful impression volume. We'll give you an honest budget recommendation based on your market and competition during the free audit.",
  },
];

export default function PaidFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className={`lg:sticky lg:top-28 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-4 text-center lg:text-left">Common Questions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Paid Media Questions,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Answered.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              Everything you need to know about running Google, Meta, and TV ads for a behavioral health facility — compliance, budgets, timelines, and reporting.
            </p>
            <div className="flex justify-center lg:justify-start">
            <a
              href="#paid-contact"
              className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
            >
              Ask Us Anything
              <i className="ri-arrow-right-line text-sm"></i>
            </a>
            </div>
          </div>

          <div className={`flex flex-col gap-2 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-black/20 bg-white" : "border-black/8 bg-white hover:border-black/20"}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 cursor-pointer text-left"
                >
                  <span className={`text-sm font-semibold leading-snug transition-colors ${open === i ? "text-black" : "text-black/75"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border transition-all duration-200 ${open === i ? "bg-[#0A1F44] border-[#0A1F44]" : "border-black/15"}`}>
                    <i className={`text-xs transition-all duration-200 ${open === i ? "ri-subtract-line text-white" : "ri-add-line text-black/40"}`}></i>
                  </div>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
