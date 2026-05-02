"use client";

import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "How long does a website build take?",
    a: "A full custom website typically takes 3–4 weeks from kickoff to launch. Landing pages can be live in 48 hours. We work on staging servers so you can review progress in real time, and we never launch until every metric — speed, mobile, accessibility — is green.",
  },
  {
    q: "Do you use WordPress or page builders?",
    a: "No. Every site we build is hand-coded from scratch — no WordPress, no Wix, no Squarespace, no page builders. This gives us complete control over performance, security, and conversion optimization. The result is a site that loads in under a second and converts at 2–3x the rate of template-based sites.",
  },
  {
    q: "How do you handle HIPAA compliance for websites?",
    a: "HIPAA compliance is built into every layer — encrypted forms, secure hosting, no third-party data leaks, and regular security audits. We don't use plugins or services that share patient data with external platforms. Every form submission is encrypted end-to-end, and hosting is on HIPAA-aware infrastructure.",
  },
  {
    q: "What's included in the free site audit?",
    a: "We review your current site for speed (Core Web Vitals), mobile experience, conversion rate, security, HIPAA compliance, and SEO technical health. We also analyze your top 3 competitors' sites. Everything is delivered as a written report with prioritized recommendations within 5 business days.",
  },
  {
    q: "Do you build landing pages for paid campaigns?",
    a: "Yes — dedicated landing pages are one of our core services. Every paid campaign gets its own page with no navigation, no distractions, and a single focused CTA. We A/B test headlines, CTAs, form fields, and images weekly. Average conversion rate on our landing pages is 8.4%.",
  },
  {
    q: "What happens after the site launches?",
    a: "Launch is just the beginning. Every client gets a monthly care plan covering security updates, performance monitoring, content refreshes, and continuous CRO. We hold monthly review calls to discuss test results, optimization wins, and the next 30-day roadmap.",
  },
  {
    q: "Can you work with our existing brand and design?",
    a: "Absolutely. If you have existing brand guidelines, colors, fonts, and imagery, we'll build within that system. If you need a full rebrand, our in-house design team can create a complete visual identity — logo, color system, typography, and photography direction.",
  },
];

export default function WebFaq() {
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
              Web Development Questions,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Answered.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-sm text-center lg:text-left mx-auto lg:mx-0">
              Everything you need to know about our web development process — from timelines to technology to what makes our approach different.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a
                href="#web-contact"
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
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-black/20 bg-white" : "border-gray-100 bg-white hover:border-black/15"}`}
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