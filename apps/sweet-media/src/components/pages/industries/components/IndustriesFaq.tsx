"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "Do you only work with behavioral health facilities?",
    a: "Yes — exclusively. We don't take on clients in e-commerce, real estate, SaaS, or any other industry. Every strategist, copywriter, and media buyer on our team specializes in behavioral health. This focus means we understand the compliance landscape, the patient journey, and the competitive dynamics of your market in a way generalist agencies simply can't.",
  },
  {
    q: "What if my program type doesn't fit neatly into one category?",
    a: "Most of our clients offer multiple levels of care — residential plus IOP, detox plus PHP, etc. We build integrated strategies that market each service line individually while maintaining a unified brand presence. Our team will audit your full service portfolio and recommend the right channel mix for each program type.",
  },
  {
    q: "How do you handle HIPAA compliance in marketing?",
    a: "Every campaign, landing page, and piece of content is reviewed for HIPAA awareness. We never use patient-identifying information in marketing materials without explicit consent. Our forms use encrypted transmission, our analytics are configured to exclude PHI, and our ad targeting avoids sensitive health interest categories that could violate platform policies.",
  },
  {
    q: "Can you work with multi-location treatment networks?",
    a: "Absolutely. We've managed marketing for networks with 5 to 30+ locations. Our approach scales through a combination of centralized strategy (brand messaging, creative direction, reporting) and localized execution (city-specific SEO, GBP management, local paid media). Each location gets individual attention while the network benefits from shared learnings and economies of scale.",
  },
  {
    q: "What makes your approach different from a generalist marketing agency?",
    a: "Three things: depth, speed, and results. Depth — we know which keywords convert for detox vs. IOP vs. sober living. Speed — we don't spend your first month 'learning the industry.' Results — our average client sees measurable ranking or lead improvements within 60 days because we're not experimenting with tactics that might work.",
  },
  {
    q: "Do you work with startups or only established facilities?",
    a: "We work with both. For new facilities, we focus on launch strategy — building digital presence from zero, generating early reviews, and establishing local authority. For established centers, we typically find significant untapped opportunity in SEO gaps, underoptimized paid campaigns, or neglected local listings. Every facility has room to grow.",
  },
  {
    q: "How quickly can you start seeing results?",
    a: "Paid media campaigns can generate qualified leads within the first 2 weeks. Local SEO improvements (GBP optimization, citation fixes) typically show ranking movement in 30–45 days. Organic SEO is a longer game — meaningful ranking improvements for competitive terms usually appear in 90–120 days. We set clear expectations upfront and report on leading indicators weekly.",
  },
];

export default function IndustriesFaq() {
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

          {/* Left — sticky header */}
          <div className={`lg:sticky lg:top-28 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-4 text-center lg:text-left">Common Questions</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Industry Questions,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Answered.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              Everything you need to know about marketing for your specific behavioral health program type.
            </p>
            <div className="flex justify-center lg:justify-start">
            <a
              href="#industries-contact"
              className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
            >
              Ask Us Anything
              <i className="ri-arrow-right-line text-sm"></i>
            </a>
            </div>
          </div>

          {/* Right — FAQ accordion */}
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