"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export const HOME_FAQS = [
  {
    q: "What makes Sweet Media different from a general digital marketing agency?",
    a: "We work exclusively with behavioral health treatment centers — residential programs, detox, PHP, IOP, sober living, and mental health clinics. Every strategy, every keyword, and every campaign is built around the specific compliance requirements, patient journey, and competitive dynamics of the behavioral health market. We don't apply a generic playbook to your facility.",
    category: "About Us",
  },
  {
    q: "How quickly can a treatment center expect to see results?",
    a: "Paid media (Google Ads, Meta) typically generates leads within the first 1–2 weeks of launch. SEO shows meaningful ranking movement within 60–90 days for local search and 90–120 days for competitive organic keywords. Most clients see measurable census improvement within the first 90 days across combined channels.",
    category: "Results",
  },
  {
    q: "Do you require long-term contracts?",
    a: "No. We operate on month-to-month agreements. We believe our results should be the reason you stay — not a contract. That said, most clients stay with us for years because the strategies compound over time and switching costs are high once a system is working.",
    category: "Pricing",
  },
  {
    q: "What does behavioral health digital marketing typically cost?",
    a: "Engagements typically range from $2,500/month for single-location outpatient programs to $20,000+/month for multi-location or highly competitive markets. Ad spend is separate from management fees. We provide transparent pricing and ROI projections during your free strategy call — no surprises.",
    category: "Pricing",
  },
  {
    q: "Do you handle LegitScript certification for Google Ads?",
    a: "Yes. LegitScript certification is required to run addiction treatment ads on Google. If your facility isn't yet certified, we guide you through the application and help prepare the required documentation. If you're already certified, we ensure all campaigns stay compliant with Google's Healthcare & Medicines policies.",
    category: "Paid Media",
  },
  {
    q: "Can you help a treatment center that has never done digital marketing before?",
    a: "Absolutely — in fact, starting from scratch is often an advantage. We build the right foundation from day one: proper tracking, compliant campaigns, and an SEO strategy that compounds. Many of our best-performing clients came to us with zero digital presence and are now ranking in the top 3 for their primary markets.",
    category: "Getting Started",
  },
  {
    q: "What services does Sweet Media offer?",
    a: "We offer SEO (organic, local, and AI/GEO), Google Ads, Meta Ads, connected TV advertising, website design and development, conversion rate optimization, and social media management — all exclusively for behavioral health organizations. Every service is designed to drive one outcome: more admissions at a lower cost.",
    category: "Services",
  },
  {
    q: "How do you measure success — impressions and clicks, or actual admissions?",
    a: "We measure success in census growth and cost-per-admission, not vanity metrics. Every client gets a live reporting dashboard tracking leads, cost-per-lead, and estimated admissions by channel. We hold monthly strategy calls to review real business outcomes and adjust accordingly.",
    category: "Reporting",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(HOME_FAQS.map((f) => f.category)))];

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === "All"
    ? HOME_FAQS
    : HOME_FAQS.filter((f) => f.category === activeCategory);

  // Reset open item when filter changes
  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setOpen(0);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full bg-white py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Header ── */}
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">
                  Common Questions
                </span>
              </div>
              <h2
                className="text-[36px] md:text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Everything You
                <br />
                <em className="font-light italic" style={{ color: "#0A1F44" }}>
                  Need to Know.
                </em>
              </h2>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-black/55 text-sm leading-relaxed max-w-md mx-auto lg:ml-auto lg:mr-0 mb-5">
                Answers to the most common questions about behavioral health digital marketing — pricing, timelines, compliance, and what working with Sweet Media actually looks like.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#0A1F44] hover:opacity-70 transition-opacity cursor-pointer whitespace-nowrap"
              >
                Ask a different question
                <i className="ri-arrow-right-line text-xs" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Category filter pills ── */}
        <div className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-[#0A1F44] text-white border-[#0A1F44]"
                  : "bg-white text-black/50 border-black/10 hover:border-black/25 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── FAQ accordion ── */}
        <div className={`transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filtered.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={`${activeCategory}-${i}`}
                  className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen
                      ? "border-[#0A1F44]/20 bg-[#0A1F44]/[0.03]"
                      : "border-black/8 bg-white hover:border-black/20"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-start justify-between gap-4 px-5 py-4 cursor-pointer text-left"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span
                        className={`mt-0.5 text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                          isOpen
                            ? "bg-[#0A1F44] text-white"
                            : "bg-black/5 text-black/35"
                        }`}
                      >
                        {faq.category}
                      </span>
                      <span
                        className={`text-sm font-semibold leading-snug transition-colors ${
                          isOpen ? "text-black" : "text-black/70"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border transition-all duration-200 mt-0.5 ${
                        isOpen
                          ? "bg-[#0A1F44] border-[#0A1F44]"
                          : "border-black/15"
                      }`}
                    >
                      <i
                        className={`text-[10px] transition-all duration-200 ${
                          isOpen
                            ? "ri-subtract-line text-white"
                            : "ri-add-line text-black/40"
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <div className="pl-[calc(theme(spacing.3)+theme(spacing.14))] -mt-1">
                        <p className="text-sm text-black/55 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className={`mt-12 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <p className="text-sm font-semibold text-black text-center sm:text-left">Still have questions?</p>
            <p className="text-xs text-black/45 mt-0.5 text-center sm:text-left">
              Our team responds within one business day.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-5 py-3 rounded-xl hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact Us
              <i className="ri-arrow-right-line text-xs" />
            </Link>
            <a
              href="#getting-started"
              className="inline-flex items-center gap-2 border border-black/12 text-black/60 text-[11px] tracking-[0.2em] uppercase font-bold px-5 py-3 rounded-xl hover:border-black/25 hover:text-black transition-colors cursor-pointer whitespace-nowrap"
            >
              Free Strategy Call
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
