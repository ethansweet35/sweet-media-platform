"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SiteHeaderProps {
  ctaLabel?: string;
  ctaHref?: string;
  /** 'dark' = hero is navy/dark (invert nav to white). 'light' = hero is white (use dark text). Default: 'light' */
  heroTheme?: "dark" | "light";
}

const services = [
  {
    label: "AI & Organic SEO",
    href: "/seo",
    icon: "ri-search-eye-line",
    desc: "Rank higher, get found faster with AI-powered search strategies.",
    tag: "Most Popular",
  },
  {
    label: "Paid Media",
    href: "/paid-media",
    icon: "ri-funds-line",
    desc: "Google, Meta & TV ads engineered for cost-per-admission.",
    tag: null,
  },
  {
    label: "Social Media",
    href: "/social-media",
    icon: "ri-instagram-line",
    desc: "Content, community & reputation management for BH brands.",
    tag: null,
  },
  {
    label: "Web Development",
    href: "/web-dev",
    icon: "ri-code-s-slash-line",
    desc: "High-converting websites built exclusively for treatment centers.",
    tag: null,
  },
];

const aiTools = [
  {
    label: "Site Speed Checker",
    href: "/site-speed-test",
    icon: "ri-speed-line",
    desc: "Google PageSpeed scores, Core Web Vitals, and platform-specific fixes.",
    tag: null as string | null,
  },
  {
    label: "SEO Strategy",
    href: "/seo-strategy",
    icon: "ri-search-eye-line",
    desc: "Semrush snapshot + AI audit for CRO, keywords, structure, and technical SEO.",
    tag: "New",
  },
];

const navLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Results", href: "/results" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function SiteHeader({
  ctaLabel = "Get Started",
  ctaHref = "/contact",
  heroTheme = "light",
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAiToolsOpen, setMobileAiToolsOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const aiToolsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (megaRef.current && !megaRef.current.contains(target)) {
        setServicesOpen(false);
      }
      if (aiToolsRef.current && !aiToolsRef.current.contains(target)) {
        setAiToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    setAiToolsOpen(false);
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        const el = document.querySelector(href.replace("/", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/");
        setTimeout(() => {
          const el = document.querySelector(href.replace("/", ""));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    } else if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  // When scrolled: frosted glass white regardless of hero theme
  // When at top: transparent, text color depends on heroTheme
  const isInverted = !scrolled && heroTheme === "dark";

  const headerClass = scrolled
    ? "bg-white/80 backdrop-blur-xl border-b border-black/8 shadow-[0_1px_24px_rgba(0,0,0,0.06)]"
    : heroTheme === "dark"
    ? "bg-transparent border-b border-white/10"
    : "bg-transparent border-b border-black/6";

  const navTextClass = isInverted
    ? "text-white/60 hover:text-white"
    : "text-neutral-400 hover:text-black";

  const phoneClass = isInverted
    ? "text-white/50 hover:text-white"
    : "text-neutral-400 hover:text-black";

  const hamburgerClass = isInverted ? "text-white" : "text-black";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Logo — use white at top on dark hero, dark when sticky/scrolled */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={
                isInverted
                  ? "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/sweet%20media%20logo%20white.png"
                  : "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/sweet%20media%20logo.png"
              }
              alt="Sweet Media Logo"
              width={160}
              height={40}
              priority
              fetchPriority="high"
              className="h-10 w-auto object-contain transition-none"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">

            {/* Services mega trigger */}
            <div className="relative" ref={megaRef}>
              <button
                onClick={() => {
                  setServicesOpen((v) => !v);
                  setAiToolsOpen(false);
                }}
                className={`flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${servicesOpen ? (isInverted ? "text-white" : "text-black") : navTextClass}`}
              >
                Services
                <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}></i>
              </button>

              {/* Mega Menu Panel */}
              {servicesOpen && (
                <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-[720px] bg-white border border-black/8 rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#0A1F44] via-[#7B9FD4] to-[#0A1F44]" />

                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-black/35 mb-0.5">What We Do</p>
                        <h3 className="text-base font-semibold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                          Behavioral Health Marketing Services
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#0A1F44]/6 rounded-full px-3 py-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-semibold text-[#0A1F44] tracking-wide">BH-Exclusive Agency</span>
                      </div>
                    </div>

                    {/* Service cards grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {services.map((s) => (
                        <button
                          key={s.label}
                          onClick={() => handleNav(s.href)}
                          className="group relative text-left p-4 rounded-xl border border-black/6 hover:border-[#0A1F44]/20 hover:bg-[#0A1F44]/3 transition-all duration-200 cursor-pointer"
                        >
                          {s.tag && (
                            <span className="absolute top-3 right-3 text-[9px] tracking-[0.15em] uppercase font-bold text-[#0A1F44] bg-[#0A1F44]/8 px-2 py-0.5 rounded-full">
                              {s.tag}
                            </span>
                          )}
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A1F44]/6 group-hover:bg-[#0A1F44]/12 transition-colors flex-shrink-0">
                              <i className={`${s.icon} text-[#0A1F44] text-base`}></i>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[12px] font-semibold text-black leading-tight">{s.label}</span>
                                <i className="ri-arrow-right-line text-[10px] text-black/30 group-hover:text-[#0A1F44] group-hover:translate-x-0.5 transition-all duration-200"></i>
                              </div>
                              <p className="text-[11px] text-black/45 leading-relaxed">{s.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Bottom CTA strip */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/6">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <i className="ri-shield-check-line text-emerald-500 text-sm"></i>
                          <span className="text-[10px] text-black/40 font-medium">HIPAA Compliant</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <i className="ri-award-line text-amber-500 text-sm"></i>
                          <span className="text-[10px] text-black/40 font-medium">40+ Active BH Clients</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNav("/contact")}
                        className="inline-flex items-center gap-2 bg-[#0A1F44] text-white text-[10px] tracking-[0.18em] uppercase font-bold px-4 py-2 rounded-lg hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Free Strategy Call
                        <i className="ri-arrow-right-line text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AI Tools mega trigger */}
            <div className="relative" ref={aiToolsRef}>
              <button
                onClick={() => {
                  setAiToolsOpen((v) => !v);
                  setServicesOpen(false);
                }}
                className={`flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${aiToolsOpen ? (isInverted ? "text-white" : "text-black") : navTextClass}`}
              >
                AI Tools
                <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${aiToolsOpen ? "rotate-180" : ""}`}></i>
              </button>

              {aiToolsOpen && (
                <div
                  className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-[520px] bg-white border border-black/8 rounded-2xl overflow-hidden"
                  style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
                >
                  <div className="h-1 w-full bg-gradient-to-r from-[#7B9FD4] via-[#0A1F44] to-[#7B9FD4]" />
                  <div className="p-6">
                    <div className="mb-5">
                      <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-black/35 mb-0.5">
                        Free tools
                      </p>
                      <h3
                        className="text-base font-semibold text-black"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        AI-Powered Site Audits
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      {aiTools.map((tool) => (
                        <button
                          key={tool.label}
                          onClick={() => handleNav(tool.href)}
                          className="group relative text-left p-4 rounded-xl border border-black/6 hover:border-[#0A1F44]/20 hover:bg-[#0A1F44]/3 transition-all duration-200 cursor-pointer"
                        >
                          {tool.tag && (
                            <span className="absolute top-3 right-3 text-[9px] tracking-[0.15em] uppercase font-bold text-[#0A1F44] bg-[#0A1F44]/8 px-2 py-0.5 rounded-full">
                              {tool.tag}
                            </span>
                          )}
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0A1F44]/6 group-hover:bg-[#0A1F44]/12 transition-colors flex-shrink-0">
                              <i className={`${tool.icon} text-[#0A1F44] text-base`}></i>
                            </div>
                            <div className="min-w-0 pr-12">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[12px] font-semibold text-black leading-tight">
                                  {tool.label}
                                </span>
                                <i className="ri-arrow-right-line text-[10px] text-black/30 group-hover:text-[#0A1F44] group-hover:translate-x-0.5 transition-all duration-200"></i>
                              </div>
                              <p className="text-[11px] text-black/45 leading-relaxed">{tool.desc}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other nav links */}
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap ${navTextClass}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + phone */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+17143005115"
              className={`text-[11px] tracking-widest font-mono transition-colors whitespace-nowrap ${phoneClass}`}
            >
              (714) 300-5115
            </a>
            <button
              onClick={() => handleNav(ctaHref)}
              className={`text-[11px] tracking-[0.18em] uppercase font-bold px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap ${
                isInverted
                  ? "bg-white text-[#0A1F44] hover:bg-white/90"
                  : "bg-[#0A1F44] text-white hover:bg-[#0d2a5e]"
              }`}
            >
              {ctaLabel}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden w-11 h-11 flex items-center justify-center cursor-pointer`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-2xl ${hamburgerClass} ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/8 px-5 py-5 flex flex-col gap-0.5" role="navigation" aria-label="Mobile navigation">

            {/* Services accordion */}
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between w-full py-4 text-[13px] tracking-[0.15em] uppercase font-semibold text-neutral-500 hover:text-black cursor-pointer"
            >
              Services
              <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}></i>
            </button>
            {mobileServicesOpen && (
              <div className="flex flex-col gap-0.5 pl-4 pb-3 border-l-2 border-neutral-100 ml-1 mb-1">
                {services.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleNav(s.href)}
                    className="flex items-center gap-3 py-3 text-[13px] text-neutral-500 hover:text-black transition-colors text-left cursor-pointer"
                  >
                    <i className={`${s.icon} text-base text-neutral-300`}></i>
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setMobileAiToolsOpen((v) => !v)}
              className="flex items-center justify-between w-full py-4 text-[13px] tracking-[0.15em] uppercase font-semibold text-neutral-500 hover:text-black cursor-pointer"
            >
              AI Tools
              <i className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${mobileAiToolsOpen ? "rotate-180" : ""}`}></i>
            </button>
            {mobileAiToolsOpen && (
              <div className="flex flex-col gap-0.5 pl-4 pb-3 border-l-2 border-neutral-100 ml-1 mb-1">
                {aiTools.map((tool) => (
                  <button
                    key={tool.label}
                    onClick={() => handleNav(tool.href)}
                    className="flex items-center gap-3 py-3 text-[13px] text-neutral-500 hover:text-black transition-colors text-left cursor-pointer"
                  >
                    <i className={`${tool.icon} text-base text-neutral-300`}></i>
                    {tool.label}
                  </button>
                ))}
              </div>
            )}

            {/* Other links */}
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="py-4 text-[13px] tracking-[0.15em] uppercase font-semibold text-neutral-500 hover:text-black text-left cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-5 mt-3 border-t border-neutral-100 flex flex-col gap-3">
              <a href="tel:+17143005115" className="text-[14px] text-neutral-500 font-mono py-1">(714) 300-5115</a>
              <button
                onClick={() => handleNav(ctaHref)}
                className="bg-[#0A1F44] text-white text-[13px] tracking-[0.15em] uppercase font-bold px-5 py-4 rounded-full text-center cursor-pointer whitespace-nowrap"
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
