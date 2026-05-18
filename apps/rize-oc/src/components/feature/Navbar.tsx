"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

// ── Brand tokens ──────────────────────────────────────────────────────────────
const INK    = "#2C302E";
const ACCENT = "#D98A53";
const IMG    = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

// ── Types ─────────────────────────────────────────────────────────────────────
type SubItem = { icon: string; label: string; desc: string; path: string };
type SubGroup = { heading: string; viewAllPath: string; viewAllLabel: string; items: SubItem[] };
type Dropdown = {
  featured: { icon: string; heading: string; desc: string; ctaLabel: string };
  items?: SubItem[];
  groups?: SubGroup[];
};
type NavItem = { label: string; path: string; dropdown?: Dropdown };

// ── Nav data ──────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  {
    label: "Levels of Care",
    path: "/levels-of-care",
    dropdown: {
      featured: {
        icon: "ri-stack-line",
        heading: "Our Levels of Care",
        desc: "We match every client to the right level of intensity — from medically supervised detox through flexible outpatient programs.",
        ctaLabel: "View All Programs",
      },
      items: [
        { icon: "ri-test-tube-line",      label: "Drug & Alcohol Detox",   desc: "Safe, medically supervised withdrawal",     path: "/drug-alcohol-detox" },
        { icon: "ri-hospital-line",       label: "Partial Hospitalization", desc: "Full-day structured care, 5–7 days/week",   path: "/partial-hospitalization-program-orange-county" },
        { icon: "ri-calendar-check-line", label: "Intensive Outpatient",    desc: "Intensive sessions, 3–5 days per week",     path: "/iop-program-orange-county" },
        { icon: "ri-chat-3-line",         label: "Outpatient Program",      desc: "Flexible weekly therapy & support",         path: "/outpatient-program" },
        { icon: "ri-wifi-line",           label: "Virtual Outpatient",      desc: "California-wide telehealth programs",       path: "/virtual-outpatient-program" },
      ],
    },
  },
  {
    label: "What We Treat",
    path: "/what-we-treat",
    dropdown: {
      featured: {
        icon: "ri-mental-health-line",
        heading: "What We Treat",
        desc: "Comprehensive mental health and addiction treatment for adults across Orange County and California.",
        ctaLabel: "See All Conditions",
      },
      groups: [
        {
          heading: "Addiction",
          viewAllPath: "/addiction",
          viewAllLabel: "All addiction programs",
          items: [
            { icon: "ri-goblet-line",  label: "Alcohol",         desc: "Comprehensive alcohol detox & rehab",    path: "/addiction/alcohol" },
            { icon: "ri-drop-line",    label: "Opiates",         desc: "Opiate detox and recovery",              path: "/addiction/opiate" },
            { icon: "ri-fire-line",    label: "Meth",            desc: "Methamphetamine addiction treatment",    path: "/addiction/meth" },
            { icon: "ri-capsule-line", label: "Benzodiazepines", desc: "Benzo taper and detox support",          path: "/addiction/benzodiazepine" },
            { icon: "ri-pill-line",    label: "Xanax",           desc: "Xanax dependency and withdrawal",       path: "/addiction/xanax" },
          ],
        },
        {
          heading: "Mental Health",
          viewAllPath: "/mental-health",
          viewAllLabel: "All mental health programs",
          items: [
            { icon: "ri-mental-health-line", label: "Anxiety",    desc: "Anxiety and panic disorder care",       path: "/mental-health/anxiety" },
            { icon: "ri-cloudy-line",        label: "Depression",  desc: "Major depression treatment",            path: "/mental-health/depression" },
            { icon: "ri-shield-line",        label: "PTSD",        desc: "Trauma-informed care",                  path: "/mental-health/ptsd" },
            { icon: "ri-contrast-2-line",    label: "Bipolar",     desc: "Mood stabilization and wellness",       path: "/mental-health/bipolar-disorder" },
            { icon: "ri-focus-3-line",       label: "ADHD",        desc: "Attention and executive function",      path: "/mental-health/adhd" },
          ],
        },
      ],
    },
  },
  {
    label: "About Rize",
    path: "/about",
    dropdown: {
      featured: {
        icon: "ri-award-line",
        heading: "About Rize OC",
        desc: "Premium evidence-based care in the heart of Orange County — treating mind, body, and spirit with compassion.",
        ctaLabel: "Learn About Us",
      },
      items: [
        { icon: "ri-team-line",           label: "Our Team",         desc: "Meet our clinical staff and leadership",  path: "/our-team" },
        { icon: "ri-file-list-3-line",    label: "Admissions",       desc: "Start your intake process today",         path: "/verify-insurance" },
        { icon: "ri-shield-check-line",   label: "Verify Insurance", desc: "Check your coverage in minutes",          path: "/verify-insurance" },
      ],
    },
  },
  {
    label: "Resources",
    path: "/resources",
    dropdown: {
      featured: {
        icon: "ri-book-open-line",
        heading: "Resources & Programs",
        desc: "Educational content, online programs, and specialty care pathways — everything you need to take the first step.",
        ctaLabel: "Browse All Resources",
      },
      items: [
        { icon: "ri-article-line",      label: "Blog & Articles",       desc: "Clinical insights and recovery education",    path: "/blog" },
        { icon: "ri-shield-check-line", label: "Verify Insurance",      desc: "Check your mental health coverage",           path: "/verify-insurance" },
        { icon: "ri-map-2-line",        label: "Service Areas",         desc: "Locations across Orange County & CA",         path: "/service-areas" },
        { icon: "ri-briefcase-line",    label: "Working Professionals", desc: "Programs built around your schedule",         path: "/working-professionals" },
        { icon: "ri-video-chat-line",   label: "Virtual Mental Health", desc: "Online IOP from anywhere in California",      path: "/virtual-iop-mental-health" },
        { icon: "ri-heart-pulse-line",  label: "Dual Diagnosis",        desc: "Co-occurring mental health & addiction care", path: "/dual-diagnosis" },
      ],
    },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMenu, setActiveMenu]         = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [pathname]);

  const openMenu     = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveMenu(label); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setActiveMenu(null), 200); };
  const cancelClose  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  const activeItem = navItems.find((n) => n.label === activeMenu);

  const isActive = (item: NavItem) =>
    pathname === item.path || (pathname ?? "").startsWith(item.path + "/");

  return (
    <header className="sticky top-0 z-50">

      {/* ── Utility bar ──────────────────────────────────────────────────── */}
      <div className="hidden lg:block w-full" style={{ backgroundColor: INK }}>
        <div className="mx-auto max-w-[1300px] px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:9494612620" className="flex items-center gap-1.5 text-white/55 hover:text-white transition-colors duration-200">
              <i className="ri-phone-line text-xs" />
              <span className="text-[11px] font-light tracking-wide">(949) 461-2620</span>
            </a>
            <a href="mailto:admissions@rizeoc.com" className="flex items-center gap-1.5 text-white/55 hover:text-white transition-colors duration-200">
              <i className="ri-mail-line text-xs" />
              <span className="text-[11px] font-light tracking-wide">admissions@rizeoc.com</span>
            </a>
          </div>
          <p className="text-[11px] font-light text-white/35">
            <span className="font-medium" style={{ color: ACCENT }}>Same-day assessments</span>
            {" "}· Orange County, CA
          </p>
        </div>
      </div>

      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <div className="w-full bg-cream-nav border-b border-soft">
        <div className="mx-auto max-w-[1300px] px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={`${IMG}/rize-logo.png`}
              alt="Rize OC"
              width={200}
              height={70}
              className="h-14 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown ? openMenu(item.label) : undefined}
                onMouseLeave={item.dropdown ? scheduleClose : undefined}
              >
                <Link
                  href={item.path}
                  className={`flex items-center gap-1 px-3 py-2 text-[11px] uppercase tracking-[0.18em] font-medium whitespace-nowrap transition-colors duration-300 hover:text-accent ${
                    isActive(item) ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${activeMenu === item.label ? "rotate-180" : ""}`} />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="tel:9494612620"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-medium text-white transition-colors duration-300 hover:opacity-85"
            style={{ backgroundColor: INK }}
          >
            <i className="ri-phone-fill text-xs" style={{ color: ACCENT }} />
            Call Now
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center text-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-3-line"}`} />
          </button>
        </div>
      </div>

      {/* ── Full-width mega panel ─────────────────────────────────────────── */}
      {activeItem?.dropdown && (
        <div
          className="hidden lg:block absolute left-0 w-full"
          style={{ top: "100%", zIndex: 49 }}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {/* Thin accent rule */}
          <div className="h-px w-full" style={{ backgroundColor: ACCENT, opacity: 0.4 }} />

          {/* Dark panel */}
          <div className="w-full shadow-2xl" style={{ backgroundColor: INK, boxShadow: "0 24px 64px rgba(44,48,46,0.4)" }}>
            <div className="mx-auto max-w-[1300px] px-6 py-10">
              <div className="grid grid-cols-12 gap-10">

                {/* ── Featured card (left) ── */}
                <div className="col-span-3">
                  <div
                    className="h-full flex flex-col gap-5 p-6 relative overflow-hidden"
                    style={{ backgroundColor: `${ACCENT}10`, borderLeft: `2px solid ${ACCENT}55` }}
                  >
                    {/* Icon */}
                    <div className="w-11 h-11 flex items-center justify-center" style={{ backgroundColor: `${ACCENT}20` }}>
                      <i className={`${activeItem.dropdown.featured.icon} text-lg`} style={{ color: ACCENT }} />
                    </div>

                    {/* Copy */}
                    <div className="flex flex-col gap-2.5 flex-1">
                      <h3 className="font-[family-name:var(--font-display)] text-white text-xl leading-snug font-normal">
                        {activeItem.dropdown.featured.heading}
                      </h3>
                      <p className="text-white/45 font-light text-sm leading-relaxed">
                        {activeItem.dropdown.featured.desc}
                      </p>
                    </div>

                    {/* CTA */}
                    <Link
                      href={activeItem.path}
                      onClick={() => setActiveMenu(null)}
                      className="self-start inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-medium transition-opacity duration-300 hover:opacity-70 group"
                      style={{ color: ACCENT }}
                    >
                      {activeItem.dropdown.featured.ctaLabel}
                      <i className="ri-arrow-right-line text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    {/* Decorative dot grid */}
                    <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1.5 opacity-[0.08] pointer-events-none">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: ACCENT }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Sub-links: flat items[] ── */}
                {activeItem.dropdown.items && (
                  <div className="col-span-9 flex flex-col justify-between">
                    <div className={`grid gap-2 ${
                      activeItem.dropdown.items.length <= 4 ? "grid-cols-2"
                      : activeItem.dropdown.items.length <= 6 ? "grid-cols-2"
                      : "grid-cols-3"
                    }`}>
                      {activeItem.dropdown.items.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          onClick={() => setActiveMenu(null)}
                          className="group flex items-start gap-4 p-4 transition-all duration-300 hover:bg-white/5"
                        >
                          <div
                            className="w-9 h-9 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundColor: `${ACCENT}18` }}
                          >
                            <i className={`${sub.icon} text-sm`} style={{ color: ACCENT }} />
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                            <span className="text-white text-sm font-medium leading-snug group-hover:text-accent transition-colors duration-300">
                              {sub.label}
                            </span>
                            <span className="text-white/40 text-xs font-light leading-snug">{sub.desc}</span>
                          </div>
                          <i className="ri-arrow-right-line text-xs text-white/15 group-hover:text-accent transition-all duration-300 shrink-0 mt-0.5 group-hover:translate-x-0.5 transform" />
                        </Link>
                      ))}
                    </div>

                    {/* Bottom strip */}
                    <div className="mt-6 pt-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <p className="text-white/25 text-xs font-light">Evidence-based · Orange County · Same-day intake</p>
                      <Link
                        href="/verify-insurance"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-medium transition-opacity hover:opacity-70"
                        style={{ color: ACCENT }}
                      >
                        Verify Insurance <i className="ri-arrow-right-line text-xs" />
                      </Link>
                    </div>
                  </div>
                )}

                {/* ── Sub-links: grouped (What We Treat) ── */}
                {activeItem.dropdown.groups && (
                  <div className="col-span-9">
                    <div className="grid grid-cols-2 gap-8">
                      {activeItem.dropdown.groups.map((group) => (
                        <div key={group.heading}>
                          {/* Group header */}
                          <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                            <div className="w-0.5 h-3 shrink-0" style={{ backgroundColor: ACCENT }} />
                            <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/40">{group.heading}</p>
                          </div>

                          {/* Items */}
                          <div className="flex flex-col gap-1">
                            {group.items.map((sub) => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-start gap-3 p-3 transition-all duration-300 hover:bg-white/5"
                              >
                                <div
                                  className="w-7 h-7 flex items-center justify-center shrink-0 mt-0.5"
                                  style={{ backgroundColor: `${ACCENT}18` }}
                                >
                                  <i className={`${sub.icon} text-xs`} style={{ color: ACCENT }} />
                                </div>
                                <div className="flex flex-col gap-0.5 flex-1">
                                  <span className="text-white text-xs font-medium leading-snug group-hover:text-accent transition-colors duration-300">{sub.label}</span>
                                  <span className="text-white/35 text-[11px] font-light leading-snug">{sub.desc}</span>
                                </div>
                                <i className="ri-arrow-right-line text-[10px] text-white/15 group-hover:text-accent transition-all duration-300 shrink-0 mt-1 group-hover:translate-x-0.5 transform" />
                              </Link>
                            ))}
                            <Link
                              href={group.viewAllPath}
                              onClick={() => setActiveMenu(null)}
                              className="mt-1 ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] font-medium transition-opacity hover:opacity-70"
                              style={{ color: ACCENT }}
                            >
                              {group.viewAllLabel} <i className="ri-arrow-right-line text-[9px]" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom strip */}
                    <div className="mt-6 pt-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <p className="text-white/25 text-xs font-light">Evidence-based · Orange County · Same-day intake</p>
                      <Link
                        href="/verify-insurance"
                        onClick={() => setActiveMenu(null)}
                        className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-medium transition-opacity hover:opacity-70"
                        style={{ color: ACCENT }}
                      >
                        Verify Insurance <i className="ri-arrow-right-line text-xs" />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="lg:hidden bg-cream-nav border-t border-soft overflow-y-auto max-h-[85vh]">
          <div className="px-6 py-5 flex flex-col">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-soft last:border-b-0">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-4"
                    >
                      <span className={`text-[11px] uppercase tracking-[0.18em] font-medium ${isActive(item) ? "text-accent" : "text-ink"}`}>
                        {item.label}
                      </span>
                      <i className={`text-ink/40 text-sm transition-transform duration-300 ${mobileExpanded === item.label ? "ri-subtract-line" : "ri-add-line"}`} />
                    </button>

                    {mobileExpanded === item.label && (
                      <div className="pb-4 flex flex-col gap-0.5">
                        {/* Overview link */}
                        <Link
                          href={item.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-soft transition-colors duration-200"
                        >
                          <i className={`${item.dropdown.featured.icon} text-sm`} style={{ color: ACCENT }} />
                          <span className="text-xs font-medium text-ink">{item.dropdown.featured.ctaLabel}</span>
                        </Link>

                        {/* Flat items */}
                        {item.dropdown.items?.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 hover:bg-soft transition-colors duration-200"
                          >
                            <i className={`${sub.icon} text-sm`} style={{ color: ACCENT }} />
                            <span className="text-xs font-medium text-ink/75">{sub.label}</span>
                          </Link>
                        ))}

                        {/* Grouped items */}
                        {item.dropdown.groups?.map((group) => (
                          <div key={group.heading}>
                            <p className="px-3 pt-3 pb-1 text-[9px] font-semibold uppercase tracking-[0.35em] text-ink/40">{group.heading}</p>
                            {group.items.map((sub) => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 hover:bg-soft transition-colors duration-200"
                              >
                                <i className={`${sub.icon} text-sm`} style={{ color: ACCENT }} />
                                <span className="text-xs font-medium text-ink/75">{sub.label}</span>
                              </Link>
                            ))}
                            <Link
                              href={group.viewAllPath}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-70"
                              style={{ color: ACCENT }}
                            >
                              {group.viewAllLabel} →
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center py-4 text-[11px] uppercase tracking-[0.18em] font-medium ${isActive(item) ? "text-accent" : "text-ink"}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTAs */}
            <div className="pt-5 flex flex-col gap-3">
              <a
                href="tel:9494612620"
                className="block w-full text-center text-[11px] uppercase tracking-[0.15em] px-6 py-3.5 font-medium text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: INK }}
              >
                (949) 461-2620 — Call Now
              </a>
              <Link
                href="/verify-insurance"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 text-xs font-light tracking-wide transition-opacity hover:opacity-70"
                style={{ color: ACCENT }}
              >
                <i className="ri-shield-check-line text-xs" />
                Verify Your Insurance
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
