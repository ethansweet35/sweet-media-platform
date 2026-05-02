"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "How long does SEO take to show results for a behavioral health facility?",
    a: "Most clients see meaningful ranking movement within 60–90 days for local SEO and 90–120 days for competitive organic keywords. Technical fixes and Google Business Profile optimizations often show the fastest early gains. AI SEO citations can appear within 30 days once content is properly structured.",
  },
  {
    q: "Do you only do SEO for behavioral health, or other industries too?",
    a: "We work exclusively with behavioral health organizations — residential treatment, detox, PHP, IOP, sober living, dual diagnosis, and mental health. This specialization means every keyword strategy, every content piece, and every link we build is informed by deep knowledge of your market.",
  },
  {
    q: "What's included in your free SEO audit?",
    a: "Our free audit covers technical health (site speed, crawl errors, Core Web Vitals), on-page optimization gaps, keyword ranking snapshot, Google Business Profile assessment, competitor gap analysis, and a prioritized list of quick-win opportunities. Delivered within 5 business days, no commitment required.",
  },
  {
    q: "How do you handle SEO for multi-location treatment centers?",
    a: "We manage each location individually — unique landing pages, distinct Google Business Profiles, location-specific keyword strategies, and separate citation profiles. We've ranked 30+ cities simultaneously for single networks. The strategies don't just scale — they compound.",
  },
  {
    q: "What is AI SEO and do behavioral health facilities actually need it?",
    a: "AI SEO (also called Generative Engine Optimization or GEO) is the practice of optimizing your content and technical signals so that AI tools like ChatGPT, Google's AI Overview, and Gemini recommend your facility when users ask questions. As more people ask AI tools 'where's the best rehab near me,' showing up in those answers is now a meaningful admissions channel.",
  },
  {
    q: "Do you write the content yourselves or outsource it?",
    a: "All content is produced in-house by our team of behavioral health copywriters. We don't use generalist freelancers or AI-generated filler. Every article, service page, and location page is written by someone who understands the clinical nuances and compliance considerations of behavioral health marketing.",
  },
  {
    q: "How do you report on SEO performance?",
    a: "Every client gets a live reporting dashboard showing keyword rankings, organic traffic, lead volume, and map pack visibility — updated in real time. We hold monthly strategy calls to review progress, adjust priorities, and preview the next 30-day roadmap.",
  },
];

export default function SeoFaq() {
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
              SEO Questions,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Answered.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              Everything you need to know about SEO for behavioral health — from timelines to tactics to what makes our approach different.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a
                href="#seo-contact"
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
