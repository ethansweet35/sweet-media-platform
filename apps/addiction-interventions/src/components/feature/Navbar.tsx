"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LOGO_HEIGHT, NAV_LOGO_URL, NAV_LOGO_WIDTH } from "@/data/site";

type NavItem = {
  label: string;
  path: string;
  children?: { label: string; path: string; group?: string }[];
};

const navItems: NavItem[] = [
  { label: "About", path: "/about-us" },
  {
    label: "Intervention Services",
    path: "/intervention-services",
    children: [
      // Substance Use — unified under /substance-abuse-interventions/*
      { label: "Substance Abuse Interventions", path: "/substance-abuse-interventions", group: "Substance Use" },
      { label: "Alcohol Interventions", path: "/substance-abuse-interventions/alcohol", group: "Substance Use" },
      { label: "Drug Abuse Interventions", path: "/substance-abuse-interventions/drug", group: "Substance Use" },
      { label: "Heroin Interventions", path: "/substance-abuse-interventions/heroin", group: "Substance Use" },
      { label: "Cocaine Interventions", path: "/substance-abuse-interventions/cocaine", group: "Substance Use" },
      { label: "Meth Interventions", path: "/substance-abuse-interventions/meth", group: "Substance Use" },
      { label: "Opioid Interventions", path: "/substance-abuse-interventions/opioid", group: "Substance Use" },
      { label: "Ketamine Interventions", path: "/substance-abuse-interventions/ketamine", group: "Substance Use" },
      // Mental Health
      { label: "Mental Health Interventions", path: "/mental-health-interventions", group: "Mental Health" },
      { label: "Anxiety Interventions", path: "/mental-health-interventions/anxiety", group: "Mental Health" },
      { label: "Depression Interventions", path: "/mental-health-interventions/depression", group: "Mental Health" },
      { label: "Bipolar Disorder Interventions", path: "/mental-health-interventions/bipolar", group: "Mental Health" },
      { label: "PTSD Interventions", path: "/mental-health-interventions/ptsd", group: "Mental Health" },
      { label: "OCD Interventions", path: "/mental-health-interventions/ocd", group: "Mental Health" },
      { label: "Self-Medicating Interventions", path: "/mental-health-interventions/self-medicating", group: "Mental Health" },
      // Specialty & Family
      { label: "Family Interventions", path: "/family-interventions", group: "Specialty & Family" },
      { label: "Teen Interventions", path: "/interventions-for-teens", group: "Specialty & Family" },
      { label: "Executive Interventions", path: "/interventions-for-executives", group: "Specialty & Family" },
      { label: "Crisis Interventions", path: "/crisis-interventions", group: "Specialty & Family" },
      { label: "Dual Diagnosis Interventions", path: "/dual-diagnosis-interventions", group: "Specialty & Family" },
      // Methods
      { label: "ARISE® Intervention", path: "/intervention-types/arise", group: "Intervention Models" },
      { label: "Johnson Model Intervention", path: "/intervention-types/johnson-model", group: "Intervention Models" },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    children: [
      // Assessments
      { label: "Intervention Quiz", path: "/intervention-quiz", group: "Assessments" },
      { label: "Codependency Assessment", path: "/codependency-assessment", group: "Assessments" },
      { label: "Is It Time For An Intervention?", path: "/is-it-time-for-an-intervention", group: "Assessments" },
      // Family Guides
      { label: "How To Plan an Intervention", path: "/how-to-plan-an-intervention-for-success", group: "Family Guides" },
      { label: "Find Your Missing Loved One", path: "/find-your-missing-loved-one", group: "Family Guides" },
      // Support & Reference
      { label: "FAQs", path: "/faqs", group: "Support & Reference" },
      { label: "Blog", path: "/blog", group: "Support & Reference" },
      { label: "Contact Us", path: "/contact", group: "Support & Reference" },
    ],
  },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const PHONE_DISPLAY = "949-776-7093";
const PHONE_HREF = "tel:9497767093";

export default function Navbar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSubmenu(label);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenSubmenu(null), 140);
  }

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top utility bar — visible on desktop only, matches original WP header */}
      <div className="hidden bg-[#8FAC87] px-6 py-2 text-xs lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 lg:px-10">
          <span className="flex items-center gap-1.5 text-white/90">
            <i className="ri-map-pin-line text-sm"></i>
            3822 Campus Dr #300-B, Newport Beach, CA 92660
          </span>
          <span className="font-semibold text-white">1500+ Families Helped</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-[#EFEFEF] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 lg:gap-8 lg:px-10 lg:py-3">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={NAV_LOGO_URL}
              alt="Addiction Interventions — Intervene Today. Change Tomorrow."
              width={NAV_LOGO_WIDTH}
              height={NAV_LOGO_HEIGHT}
              className="h-10 w-auto sm:h-11 lg:h-12"
              priority
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 280px, 320px"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.path || pathname?.startsWith(item.path + "/");
              const hasChildren = !!item.children?.length;

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => hasChildren && openMenu(item.label)}
                  onMouseLeave={() => hasChildren && scheduleClose()}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-[#6F8E68]"
                        : "text-[#1A1A17] hover:text-[#6F8E68]"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <i className="ri-arrow-down-s-line text-base opacity-60"></i>
                    )}
                  </Link>

                  {hasChildren && openSubmenu === item.label && (
                    <div
                      className="absolute left-1/2 top-full z-50 w-[min(100vw-3rem,1100px)] -translate-x-1/2 rounded-2xl border border-[#EFEFEF] bg-white p-8 shadow-2xl ring-1 ring-black/[0.03]"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      {item.label === "Intervention Services" ? (
                        // Mega menu for Intervention Services — guides users by category
                        <div>
                          <div className="mb-6 flex items-center justify-between border-b border-[#EFEFEF] pb-4">
                            <div>
                              <p className="font-heading text-2xl font-bold text-[#1A1A17]">Intervention Services</p>
                              <p className="text-sm text-[#4B4B4B]">Compassionate, structured support tailored to your situation</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Link href="/intervention-services" className="rounded-full border border-[#8FAC87] px-5 py-2 text-sm font-semibold text-[#507969] hover:bg-[#8FAC87] hover:text-white">
                                Browse all services
                              </Link>
                              <a href={PHONE_HREF} className="rounded-full bg-[#8FAC87] px-5 py-2 text-sm font-semibold text-white">
                                Call {PHONE_DISPLAY}
                              </a>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Substance Use Column */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-drop-line text-xl"></i>
                                </span>
                                <div>
                                  <Link href="/substance-abuse-interventions" className="font-heading text-lg font-bold text-[#1A1A17] hover:text-[#507969]">
                                    Substance Use
                                  </Link>
                                  <p className="text-xs text-[#4B4B4B]">Alcohol, opioids, stimulants &amp; more</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "Alcohol Interventions", path: "/substance-abuse-interventions/alcohol" },
                                  { label: "Drug Abuse Interventions", path: "/substance-abuse-interventions/drug" },
                                  { label: "Heroin Interventions", path: "/substance-abuse-interventions/heroin" },
                                  { label: "Cocaine Interventions", path: "/substance-abuse-interventions/cocaine" },
                                  { label: "Meth Interventions", path: "/substance-abuse-interventions/meth" },
                                  { label: "Opioid Interventions", path: "/substance-abuse-interventions/opioid" },
                                  { label: "Ketamine Interventions", path: "/substance-abuse-interventions/ketamine" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="block rounded-md px-2 py-1.5 text-[#4B4B4B] hover:bg-[#F5F3E7] hover:text-[#6F8E68]">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link href="/substance-abuse-interventions" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#507969] hover:gap-1.5">
                                View all substance interventions <i className="ri-arrow-right-line"></i>
                              </Link>
                            </div>

                            {/* Mental Health Column */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-mental-health-line text-xl"></i>
                                </span>
                                <div>
                                  <Link href="/mental-health-interventions" className="font-heading text-lg font-bold text-[#1A1A17] hover:text-[#507969]">
                                    Mental Health
                                  </Link>
                                  <p className="text-xs text-[#4B4B4B]">Depression, anxiety, bipolar, PTSD &amp; more</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "All Mental Health Interventions", path: "/mental-health-interventions" },
                                  { label: "Anxiety Interventions", path: "/mental-health-interventions/anxiety" },
                                  { label: "Depression Interventions", path: "/mental-health-interventions/depression" },
                                  { label: "Bipolar Disorder Interventions", path: "/mental-health-interventions/bipolar" },
                                  { label: "PTSD Interventions", path: "/mental-health-interventions/ptsd" },
                                  { label: "OCD Interventions", path: "/mental-health-interventions/ocd" },
                                  { label: "Self-Medicating Interventions", path: "/mental-health-interventions/self-medicating" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="block rounded-md px-2 py-1.5 text-[#4B4B4B] hover:bg-[#F5F3E7] hover:text-[#6F8E68]">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <Link href="/mental-health-interventions" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#507969] hover:gap-1.5">
                                View all mental health interventions <i className="ri-arrow-right-line"></i>
                              </Link>
                            </div>

                            {/* Specialty & Family Column */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-focus-3-line text-xl"></i>
                                </span>
                                <div>
                                  <Link href="/intervention-services" className="font-heading text-lg font-bold text-[#1A1A17] hover:text-[#507969]">
                                    Specialty Situations
                                  </Link>
                                  <p className="text-xs text-[#4B4B4B]">Teens, executives, crisis, family &amp; dual diagnosis</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "Family Interventions", path: "/family-interventions" },
                                  { label: "Interventions for Teens", path: "/interventions-for-teens" },
                                  { label: "Executive Interventions", path: "/interventions-for-executives" },
                                  { label: "Crisis Interventions", path: "/crisis-interventions" },
                                  { label: "Dual Diagnosis Interventions", path: "/dual-diagnosis-interventions" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="block rounded-md px-2 py-1.5 text-[#4B4B4B] hover:bg-[#F5F3E7] hover:text-[#6F8E68]">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Intervention Models Column */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-team-line text-xl"></i>
                                </span>
                                <div>
                                  <Link href="/intervention-services" className="font-heading text-lg font-bold text-[#1A1A17] hover:text-[#507969]">
                                    Our Methods
                                  </Link>
                                  <p className="text-xs text-[#4B4B4B]">Proven, evidence-based approaches</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "ARISE® Intervention", path: "/intervention-types/arise" },
                                  { label: "The Johnson Model", path: "/intervention-types/johnson-model" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="block rounded-md px-2 py-1.5 text-[#4B4B4B] hover:bg-[#F5F3E7] hover:text-[#6F8E68]">
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-4 rounded-lg bg-[#F5F3E7] p-3 text-xs text-[#4B4B4B]">
                                Not sure which model fits? <Link href="/intervention-services" className="font-semibold text-[#507969] underline">Start with our overview</Link> or call us.
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 border-t border-[#EFEFEF] pt-4 text-center text-xs text-[#4B4B4B]">
                            Still unsure? <a href={PHONE_HREF} className="font-semibold text-[#507969]">Speak with a certified interventionist now</a> — we’ll guide you to the right service in minutes.
                          </div>
                        </div>
                      ) : item.label === "Resources" ? (
                        // Mega menu for Resources
                        <div>
                          <div className="mb-6 flex items-center justify-between border-b border-[#EFEFEF] pb-4">
                            <div>
                              <p className="font-heading text-2xl font-bold text-[#1A1A17]">Family Resources</p>
                              <p className="text-sm text-[#4B4B4B]">Tools, guides, and answers for families in crisis</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Link href="/resources" className="rounded-full border border-[#8FAC87] px-5 py-2 text-sm font-semibold text-[#507969] hover:bg-[#8FAC87] hover:text-white">
                                Browse all resources
                              </Link>
                              <a href={PHONE_HREF} className="rounded-full bg-[#8FAC87] px-5 py-2 text-sm font-semibold text-white">
                                Call {PHONE_DISPLAY}
                              </a>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-8">
                            {/* Assessments */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-survey-line text-xl"></i>
                                </span>
                                <div>
                                  <p className="font-heading text-lg font-bold text-[#1A1A17]">Self-Assessments</p>
                                  <p className="text-xs text-[#4B4B4B]">Quick, anonymous, no email required</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "Intervention Quiz", path: "/intervention-quiz", icon: "ri-questionnaire-line", desc: "Is intervention needed?" },
                                  { label: "Codependency Assessment", path: "/codependency-assessment", icon: "ri-link-m", desc: "Are you enabling?" },
                                  { label: "Is It Time For An Intervention?", path: "/is-it-time-for-an-intervention", icon: "ri-time-line", desc: "Honest self-assessment" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="group flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-[#F5F3E7]">
                                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F3E7] text-[#507969] group-hover:bg-white">
                                        <i className={`${l.icon} text-sm`}></i>
                                      </span>
                                      <span>
                                        <span className="block text-sm font-medium text-[#1A1A17] group-hover:text-[#507969]">{l.label}</span>
                                        <span className="block text-xs text-[#4B4B4B]">{l.desc}</span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Family Guides */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-book-open-line text-xl"></i>
                                </span>
                                <div>
                                  <p className="font-heading text-lg font-bold text-[#1A1A17]">Family Guides</p>
                                  <p className="text-xs text-[#4B4B4B]">Step-by-step guidance from the front lines</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "How to Plan an Intervention", path: "/how-to-plan-an-intervention-for-success", icon: "ri-calendar-check-line", desc: "7-step planning guide" },
                                  { label: "Find Your Missing Loved One", path: "/find-your-missing-loved-one", icon: "ri-search-eye-line", desc: "Crisis action steps" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="group flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-[#F5F3E7]">
                                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F3E7] text-[#507969] group-hover:bg-white">
                                        <i className={`${l.icon} text-sm`}></i>
                                      </span>
                                      <span>
                                        <span className="block text-sm font-medium text-[#1A1A17] group-hover:text-[#507969]">{l.label}</span>
                                        <span className="block text-xs text-[#4B4B4B]">{l.desc}</span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Support & Reference */}
                            <div>
                              <div className="mb-3 flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                                  <i className="ri-customer-service-2-line text-xl"></i>
                                </span>
                                <div>
                                  <p className="font-heading text-lg font-bold text-[#1A1A17]">Support & Reference</p>
                                  <p className="text-xs text-[#4B4B4B]">Answers and direct access to our team</p>
                                </div>
                              </div>
                              <ul className="space-y-1 text-sm">
                                {[
                                  { label: "FAQs", path: "/faqs", icon: "ri-question-answer-line", desc: "Common intervention questions" },
                                  { label: "Blog", path: "/blog", icon: "ri-article-line", desc: "Expert articles & insights" },
                                  { label: "Contact Us", path: "/contact", icon: "ri-phone-line", desc: "Free confidential call" },
                                ].map((l) => (
                                  <li key={l.path}>
                                    <Link href={l.path} className="group flex items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-[#F5F3E7]">
                                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F3E7] text-[#507969] group-hover:bg-white">
                                        <i className={`${l.icon} text-sm`}></i>
                                      </span>
                                      <span>
                                        <span className="block text-sm font-medium text-[#1A1A17] group-hover:text-[#507969]">{l.label}</span>
                                        <span className="block text-xs text-[#4B4B4B]">{l.desc}</span>
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-5 rounded-xl bg-[#3E5B50] p-4 text-white">
                                <p className="text-sm font-semibold">Need help right now?</p>
                                <p className="mt-1 text-xs text-white/70">Our team answers 24 / 7 — no voicemail, no waiting.</p>
                                <a href={PHONE_HREF} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#8FAC87] hover:text-white">
                                  <i className="ri-phone-fill"></i> {PHONE_DISPLAY}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 border-t border-[#EFEFEF] pt-4 text-center text-xs text-[#4B4B4B]">
                            Not sure where to start? <Link href="/intervention-quiz" className="font-semibold text-[#507969]">Take the 2-minute quiz</Link> — no email required.
                          </div>
                        </div>
                      ) : (
                        // Default simple dropdown for any other items
                        <div className="min-w-[260px]">
                          {item.children!.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path}
                              className="block rounded-lg px-3 py-2 text-sm text-[#4B4B4B] transition hover:bg-[#F5F3E7] hover:text-[#6F8E68]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href={PHONE_HREF}
            className="hidden shrink-0 items-center gap-2 rounded-full bg-[#8FAC87] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68] lg:inline-flex"
          >
            <i className="ri-phone-fill"></i>
            Call Now
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#1A1A17] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="border-t border-[#EFEFEF] bg-white px-4 py-4 lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const hasChildren = !!item.children?.length;
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.path}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.path}
                        className="flex-1 rounded-md px-3 py-3 text-base font-medium text-[#1A1A17] transition hover:bg-[#F5F3E7] hover:text-[#6F8E68]"
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          className="px-3 py-3 text-[#4B4B4B]"
                          aria-label={expanded ? "Collapse" : "Expand"}
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                        >
                          <i
                            className={`text-xl ${
                              expanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                            }`}
                          ></i>
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <div className="ml-3 grid gap-0.5 border-l border-[#EFEFEF] pl-3 pb-2">
                        {item.children!.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="rounded-md px-3 py-2 text-sm text-[#4B4B4B] transition hover:bg-[#F5F3E7] hover:text-[#6F8E68]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <a
                href={PHONE_HREF}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-5 py-3 text-sm font-semibold text-white"
              >
                <i className="ri-phone-fill"></i>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
