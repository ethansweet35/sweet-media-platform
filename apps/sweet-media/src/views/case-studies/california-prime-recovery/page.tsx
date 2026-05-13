"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/feature/SiteHeader";
import Footer from "@/components/pages/home/components/Footer";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const results = [
  { val: "30%", label: "Reduction in Paid CPA", icon: "ri-arrow-down-line", color: "text-emerald-600", bg: "bg-emerald-50" },
  { val: "Passing", label: "Core Web Vitals", icon: "ri-speed-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/6" },
  { val: "AI-Powered", label: "Lead Capture System", icon: "ri-robot-2-line", color: "text-amber-600", bg: "bg-amber-50" },
  { val: "Scalable", label: "SEO Content System", icon: "ri-search-eye-line", color: "text-[#0A1F44]", bg: "bg-[#0A1F44]/6" },
];

const services = [
  "Paid Advertising Optimization",
  "Website Speed & Core Web Vitals",
  "AI Chatbot & Lead Automation",
  "SEO Content Strategy",
  "Conversion Rate Optimization",
  "Tracking & Attribution",
];

const challenges = [
  { icon: "ri-funds-line", title: "High Paid CPA", desc: "Paid advertising was generating leads, but cost per acquisition was higher than desired — leaving significant ROI on the table." },
  { icon: "ri-speed-line", title: "Failing Core Web Vitals", desc: "The website wasn't passing Google's performance benchmarks, creating friction for users and hurting search visibility." },
  { icon: "ri-timer-line", title: "Slow Lead Response", desc: "In behavioral health, speed-to-lead is critical. Delayed responses to inquiries meant lost admissions opportunities." },
  { icon: "ri-layout-line", title: "Weak Conversion Flow", desc: "Navigation was cluttered, CTAs were buried, and the homepage didn't guide visitors toward admissions actions effectively." },
];

const outcomes = [
  {
    icon: "ri-funds-line",
    headline: "30% Reduction in Paid CPA",
    body: "By refining campaign structure, improving keyword intent targeting, aligning ad messaging with core services, and optimizing landing page flow, Sweet Media drove a 30% reduction in cost per acquisition — generating more admissions opportunities from the same ad spend.",
    tag: "Paid Media",
  },
  {
    icon: "ri-robot-2-line",
    headline: "AI Chatbot & Automated Lead Workflows",
    body: "Sweet Media introduced AI chatbot functionality to support visitors in real time — capturing inquiries from users not ready to call. Automated email workflows ensured every lead was followed up quickly and consistently, creating a more reliable admissions pipeline.",
    tag: "Automation",
  },
  {
    icon: "ri-speed-line",
    headline: "Website Improved to Passing Core Web Vitals",
    body: "Through technical performance optimization — including speed improvements, structure refinements, and load experience enhancements — California Prime Recovery's website moved from failing to passing Core Web Vitals, creating a faster, more trustworthy experience for prospective clients.",
    tag: "Web Performance",
  },
  {
    icon: "ri-search-eye-line",
    headline: "Scalable SEO Content System",
    body: "Sweet Media introduced tools like Surfer SEO to improve content research, structure, and optimization. New and existing pages were aligned with search intent, keyword opportunities, and on-page best practices — building a content engine for long-term organic growth.",
    tag: "SEO",
  },
  {
    icon: "ri-layout-line",
    headline: "Stronger Website Conversion Flow",
    body: "Navigation was cleaned up, the homepage was reorganized for a clearer user journey, and calls to action were strengthened throughout. The result: a more intuitive experience that guided visitors from awareness to admissions inquiry with less friction.",
    tag: "CRO",
  },
];

function AnimatedBar({ pct, animate }: { pct: number; animate: boolean }) {
  return (
    <div className="h-2 bg-black/6 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#0A1F44] rounded-full transition-all duration-1000 ease-out"
        style={{ width: animate ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

export default function CaliforniaPrimeRecoveryPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [metricsAnimate, setMetricsAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setMetricsAnimate(true); },
      { threshold: 0.2 }
    );
    if (metricsRef.current) obs.observe(metricsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
        <SiteHeader heroTheme="dark" />

        {/* ── HERO ── */}
        <section className="relative w-full min-h-[70vh] flex items-end overflow-hidden" style={{ background: "#0A1F44" }}>
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cpr-hero-bg.jpg"
              alt="Orange County California skyline"
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover object-top opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-[#0A1F44]/70 to-[#0A1F44]/40" />
          </div>

          {/* Dot grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cprDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cprDots)" />
            </svg>
          </div>

          <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 pt-40 pb-16">
            {/* Breadcrumb */}
            <div className={`flex items-center gap-2 mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <button onClick={() => router.push("/results")} className="text-[10px] tracking-[0.25em] uppercase text-white/40 hover:text-white/70 transition-colors cursor-pointer whitespace-nowrap">Results</button>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 whitespace-nowrap">Case Study</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                {/* Tag */}
                <div className={`flex flex-wrap gap-2 mb-6 transition-all duration-700 delay-75 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  {["Paid Media", "Web Performance", "SEO", "CRO", "Automation"].map((t) => (
                    <span key={t} className="text-[9px] tracking-[0.2em] uppercase font-semibold text-white/50 border border-white/15 px-3 py-1 rounded-full whitespace-nowrap">{t}</span>
                  ))}
                </div>

                <h1
                  className={`text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6 transition-all duration-700 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  California Prime<br />
                  <em className="font-bold not-italic">Recovery.</em>
                </h1>

                <p className={`text-white/55 text-base leading-relaxed max-w-lg font-light transition-all duration-700 delay-150 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                  <AutoLinkedTextClient>{"How Sweet Media helped a Joint Commission-accredited Orange County treatment center reduce paid CPA by 30%, pass Core Web Vitals, and build a scalable digital admissions system."}</AutoLinkedTextClient>
                </p>
              </div>

              {/* Quick stats */}
              <div className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-200 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {results.map((r) => (
                  <div key={r.label} className="bg-white/[0.07] border border-white/12 rounded-2xl p-5 backdrop-blur-sm">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-xl mb-3 ${r.bg}`}>
                      <i className={`${r.icon} text-base ${r.color}`}></i>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{r.val}</div>
                    <div className="text-[10px] tracking-[0.15em] uppercase text-white/45 font-medium">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client meta bar */}
            <div className={`mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-6 md:gap-10 transition-all duration-700 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {[
                { label: "Client", val: "California Prime Recovery" },
                { label: "Location", val: "Orange County, CA" },
                { label: "Industry", val: "Behavioral Health" },
                { label: "Accreditation", val: "Joint Commission · DHCS" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium mb-1">{m.label}</div>
                  <div className="text-sm text-white/75 font-medium">{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OVERVIEW ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left — overview text */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#0A1F44]" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Overview</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  A competitive behavioral health provider needed a stronger digital marketing system.
                </h2>
                <div className="space-y-4 text-black/60 text-sm leading-relaxed font-light">
                  <p>
                    <AutoLinkedTextClient>{"California Prime Recovery is a Joint Commission-accredited and DHCS-certified addiction and mental health treatment provider located in Orange County, California. Since 2016, the organization has provided evidence-based care for individuals struggling with substance use, alcohol addiction, mental health conditions, and dual diagnosis concerns."}</AutoLinkedTextClient>
                  </p>
                  <p>
                    <AutoLinkedTextClient>{"As a competitive behavioral health provider in Southern California, California Prime Recovery needed a stronger digital marketing system — one that could generate more qualified admissions opportunities while lowering acquisition costs, improving website performance, and creating a smoother path from visitor to inquiry."}</AutoLinkedTextClient>
                  </p>
                  <p>
                    <AutoLinkedTextClient>{"Sweet Media partnered with California Prime Recovery to improve paid advertising efficiency, strengthen website conversion flow, modernize lead response systems, and support long-term organic growth through SEO-driven content improvements."}</AutoLinkedTextClient>
                  </p>
                </div>
              </div>

              {/* Right — services sidebar */}
              <div>
                <div className="bg-[#f4f6f9] rounded-2xl p-7">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 font-semibold mb-5">Services Provided</p>
                  <div className="flex flex-col gap-3">
                    {services.map((s) => (
                      <div key={s} className="flex items-center gap-3">
                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#0A1F44]/10 flex-shrink-0">
                          <i className="ri-check-line text-[#0A1F44] text-[10px]"></i>
                        </div>
                        <span className="text-sm text-black/70 font-medium">{s}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-black/8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/40 font-semibold mb-3">Industry</p>
                    <p className="text-sm text-black/70"><AutoLinkedTextClient>{"Behavioral Health · Addiction Treatment · Mental Health"}</AutoLinkedTextClient></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CHALLENGES ── */}
        <section className="w-full py-20 md:py-28" style={{ background: "#f4f6f9" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Challenge</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-4 leading-snug max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Multiple gaps across the digital admissions funnel.
            </h2>
            <p className="text-black/50 text-sm leading-relaxed mb-12 max-w-xl font-light">
              <AutoLinkedTextClient>{"Before working with Sweet Media, California Prime Recovery had several opportunities for improvement across its marketing funnel — from paid media efficiency to website performance and lead response speed."}</AutoLinkedTextClient>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {challenges.map((c) => (
                <div key={c.title} className="bg-white rounded-2xl p-7 border border-black/6">
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#0A1F44]/6 mb-5">
                    <i className={`${c.icon} text-[#0A1F44] text-lg`}></i>
                  </div>
                  <h3 className="text-base font-semibold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{c.title}</h3>
                  <p className="text-sm text-black/55 leading-relaxed font-light"><AutoLinkedTextClient>{c.desc}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STRATEGY ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#0A1F44]" />
                  <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Strategy</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-light text-black mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Improve the entire admissions funnel — not just one channel.
                </h2>
                <p className="text-black/55 text-sm leading-relaxed mb-8 font-light">
                  <AutoLinkedTextClient>{"Sweet Media's approach was built around five core priorities. By improving each stage of the funnel, California Prime Recovery could generate more value from the same marketing traffic while creating a better experience for prospective clients and families."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-col gap-4" ref={metricsRef}>
                  {[
                    { label: "Lower paid advertising CPA", pct: 95 },
                    { label: "Improve speed & quality of lead response", pct: 88 },
                    { label: "Pass Core Web Vitals benchmarks", pct: 100 },
                    { label: "Strengthen SEO content creation", pct: 82 },
                    { label: "Improve website conversion flow", pct: 90 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-black/70 font-medium">{item.label}</span>
                        <span className="text-[11px] text-black/35 font-semibold">{item.pct}%</span>
                      </div>
                      <AnimatedBar pct={item.pct} animate={metricsAnimate} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <Image
                    src="https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/cpr-strategy.jpg"
                    alt="California Prime Recovery facility"
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 border border-black/8" style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
                  <div className="text-3xl font-bold text-[#0A1F44] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>30%</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-semibold">CPA Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUTCOMES ── */}
        <section className="w-full py-20 md:py-28" style={{ background: "#f4f6f9" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Results</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-12 leading-snug max-w-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meaningful gains across every part of the digital marketing system.
            </h2>

            <div className="flex flex-col gap-5">
              {outcomes.map((o, i) => (
                <div key={o.headline} className="bg-white rounded-2xl p-7 md:p-9 border border-black/6 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0 flex items-center gap-4 md:flex-col md:items-center md:w-20">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#0A1F44]/6">
                      <i className={`${o.icon} text-[#0A1F44] text-xl`}></i>
                    </div>
                    <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#0A1F44] bg-[#0A1F44]/6 px-2.5 py-1 rounded-full whitespace-nowrap md:text-center">{o.tag}</span>
                    <span className="text-4xl font-bold text-black/5 md:hidden" style={{ fontFamily: "'Playfair Display', serif" }}>0{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-black mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>{o.headline}</h3>
                    <p className="text-sm text-black/55 leading-relaxed font-light"><AutoLinkedTextClient>{o.body}</AutoLinkedTextClient></p>
                  </div>
                  <span className="hidden md:block text-6xl font-bold text-black/4 flex-shrink-0 self-center" style={{ fontFamily: "'Playfair Display', serif" }}>0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY OUTCOMES SUMMARY ── */}
        <section className="w-full bg-[#0A1F44] py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-white/30" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-semibold">Key Outcomes</span>
                <div className="w-8 h-px bg-white/30" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-white leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                A faster, clearer, and more effective<br />
                <em className="font-bold not-italic">digital marketing ecosystem.</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "30% reduction in paid advertising CPA",
                "Improved admissions workflow through AI chatbot",
                "Automated email lead follow-up system",
                "Website improved to passing Core Web Vitals",
                "Stronger SEO content process with Surfer SEO",
                "Cleaner website navigation",
                "Improved homepage flow and structure",
                "Stronger calls to action throughout",
                "Better connection between traffic and admissions",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white/[0.06] border border-white/10 rounded-xl px-5 py-4">
                  <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500/20 flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-emerald-400 text-[10px]"></i>
                  </div>
                  <span className="text-sm text-white/70 font-light leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Pullquote */}
            <div className="mt-14 max-w-3xl mx-auto text-center">
              <div className="w-px h-10 bg-white/15 mx-auto mb-6" />
              <blockquote className="text-xl md:text-2xl font-light italic text-white/80 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                "This project succeeded because the strategy focused on the full admissions funnel. Lowering CPA wasn't just about changing ads — it required improving the campaign structure, website speed, landing page experience, lead capture process, follow-up workflow, and content strategy."
              </blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/35 font-medium">Ethan Sweet · Founder, Sweet Media</span>
                <div className="w-8 h-px bg-white/20" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full bg-white py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Ready to Grow?</span>
              <div className="w-8 h-px bg-[#0A1F44]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-black mb-5 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to improve your treatment center's<br />
              <em className="font-bold not-italic">digital marketing?</em>
            </h2>
            <p className="text-black/50 text-sm leading-relaxed mb-10 max-w-xl mx-auto font-light">
              <AutoLinkedTextClient>{"Sweet Media helps behavioral health and addiction treatment providers improve paid advertising, SEO, website performance, and admissions lead workflows. If your treatment center is struggling with high CPA, poor follow-up, or low conversion rates — we can help."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router.push("/contact")}
                className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-4 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
              >
                Schedule a Strategy Call
                <i className="ri-arrow-right-line text-sm"></i>
              </button>
              <button
                onClick={() => router.push("/results")}
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-black/40 hover:text-black transition-colors cursor-pointer whitespace-nowrap"
              >
                View All Case Studies
                <i className="ri-arrow-right-line text-xs"></i>
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
}
