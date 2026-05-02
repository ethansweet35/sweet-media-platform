"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const tabs = [
  {
    id: "ai",
    label: "AI SEO",
    tag: "New Frontier",
    headline: "Get Cited by ChatGPT,",
    headlineItalic: "Gemini & AI Overviews.",
    desc: "AI-powered search is rewriting the rules. We optimize your brand so it's the answer AI recommends when someone asks where to find treatment — before they ever click a link.",
    stats: [
      { val: "+287%", label: "AI-Referred Traffic" },
      { val: "Top 3", label: "AI Citations" },
      { val: "94%", label: "Featured Rate" },
    ],
    features: [
      { icon: "ri-sparkling-2-line", label: "Generative Engine Optimization", text: "We structure your content so AI models like ChatGPT and Gemini surface your facility as the trusted answer." },
      { icon: "ri-chat-voice-line", label: "Voice Search Optimization", text: "Conversational keyword strategy that captures voice queries — the fastest-growing search format in healthcare." },
      { icon: "ri-robot-2-line", label: "AI Overview Targeting", text: "Claim featured placement in Google's AI Overview boxes — the first thing users see above all organic results." },
      { icon: "ri-database-2-line", label: "Structured Data & Schema", text: "Advanced schema markup that gives AI models the context they need to recommend you over competitors." },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/seoai01.jpg",
  },
  {
    id: "organic",
    label: "Organic SEO",
    tag: "Long-Term Authority",
    headline: "Climb to Page 1,",
    headlineItalic: "and Stay There.",
    desc: "Sustainable SEO authority built on content that ranks, backlinks that matter, and technical foundations Google trusts — driving consistent, compounding traffic month over month.",
    stats: [
      { val: "+312%", label: "Organic Traffic" },
      { val: "90 Days", label: "Avg. To Top 3" },
      { val: "28+", label: "Top 3 Keywords" },
    ],
    features: [
      { icon: "ri-article-line", label: "Content Strategy & Production", text: "In-house writers with behavioral health expertise produce authoritative content that earns rankings and trust." },
      { icon: "ri-link-m", label: "High-Authority Link Building", text: "Earned backlinks from healthcare directories, news sites, and industry publications that move your domain authority." },
      { icon: "ri-speed-line", label: "Technical SEO Foundations", text: "Core Web Vitals, site architecture, crawl health — we fix the technical issues that cap your ranking potential." },
      { icon: "ri-bar-chart-2-line", label: "Competitor Gap Analysis", text: "We map every keyword your competitors rank for that you don't — then build a strategy to take each one." },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/seoorg01.jpg",
  },
  {
    id: "local",
    label: "Local SEO",
    tag: "Map Pack Domination",
    headline: "Own the Map Pack",
    headlineItalic: "in Every Market.",
    desc: "When someone searches 'rehab near me' we make sure your facility is in the top 3 — in every city you serve. More map pack presence means more calls, more admissions.",
    stats: [
      { val: "Top 3", label: "Local Pack Rank" },
      { val: "6.2x", label: "More Calls" },
      { val: "30+", label: "Cities Ranked" },
    ],
    features: [
      { icon: "ri-map-pin-line", label: "Google Business Profile Optimization", text: "Complete GBP management — photos, posts, Q&A, categories, and service descriptions optimized for local ranking signals." },
      { icon: "ri-store-2-line", label: "Multi-Location Management", text: "Coordinated local SEO across every facility location — each one optimized individually for its target market." },
      { icon: "ri-star-line", label: "Review Generation & Management", text: "Systemized review campaigns that build your star rating and respond to feedback at scale." },
      { icon: "ri-focus-3-line", label: "Citation Building & Cleanup", text: "Accurate NAP data across 80+ directories — the foundation of local search authority Google relies on." },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/seolocal01.jpg",
  },
  {
    id: "technical",
    label: "Technical SEO",
    tag: "Site-Level Authority",
    headline: "Fix the Foundation,",
    headlineItalic: "Unlock the Ceiling.",
    desc: "Site speed, crawlability, Core Web Vitals, and structured data — technical SEO is the infrastructure that determines whether Google can find, trust, and rank your content.",
    stats: [
      { val: "3.2x", label: "Avg. Traffic Lift" },
      { val: "30 Days", label: "Audit to Live" },
      { val: "100+", label: "Technical Signals Fixed" },
    ],
    features: [
      { icon: "ri-speed-up-line", label: "Core Web Vitals Optimization", text: "LCP, FID, and CLS improvements that satisfy Google's page experience signal and lift rankings." },
      { icon: "ri-git-branch-line", label: "Site Architecture & Internal Linking", text: "Silo structures and link flows that concentrate authority on your highest-value pages." },
      { icon: "ri-code-s-slash-line", label: "Schema Markup Implementation", text: "Organization, LocalBusiness, MedicalOrganization, and FAQ schema that enables rich results." },
      { icon: "ri-bug-line", label: "Crawl Health & Indexation", text: "Robots.txt, canonical tags, redirect chains, and duplicate content resolved so Google indexes what matters." },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/seotech01.jpg",
  },
];

export default function SeoApproach() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const tab = tabs[active];

  return (
    <section ref={sectionRef} id="seo-approach" className="w-full bg-white py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-black/40 font-medium mb-4 text-center lg:text-left">Our SEO Services</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              A Full-Spectrum SEO
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Strategy Built for BH.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md lg:text-right text-center">
              We cover every dimension of search — AI, organic, local, and technical — so no opportunity is left on the table.
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className={`flex items-center overflow-x-auto gap-2 mb-10 pb-1 -mx-2 px-2 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`text-sm font-semibold px-6 py-2.5 rounded-full whitespace-nowrap cursor-pointer transition-all duration-200 flex-shrink-0 ${active === i ? "bg-[#0A1F44] text-white" : "bg-white text-black border border-black/15 hover:border-black/40"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Panel */}
        <div className={`border border-gray-100 rounded-3xl overflow-hidden transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex flex-col lg:flex-row">

            {/* Left — content */}
            <div className="lg:w-1/2 px-8 md:px-12 py-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
              <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-gray-400 mb-3">{tab.tag}</p>
              <h3 className="text-3xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {tab.headline}<br />
                <em className="font-light italic" style={{color:'#0A1F44'}}>{tab.headlineItalic}</em>
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-md">{tab.desc}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pb-6 border-b border-black/8 mb-6">
                {tab.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tab.features.map((f) => (
                  <div key={f.label} className="flex items-start gap-3 group cursor-default">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-black/5 group-hover:bg-[#0A1F44] transition-colors duration-200 mt-0.5">
                      <i className={`${f.icon} text-sm text-black/50 group-hover:text-white transition-colors duration-200`}></i>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-black mb-0.5 leading-snug">{f.label}</div>
                      <p className="text-xs text-gray-400 leading-relaxed">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-0 overflow-hidden">
              <Image
                src={tab.image}
                alt={tab.label}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
              {/* Floating stat badge */}
              <div className="absolute bottom-8 left-8 bg-[#0A1F44] text-white rounded-2xl px-5 py-4">
                <div className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{tab.stats[0].val}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/55 mt-0.5">{tab.stats[0].label}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
