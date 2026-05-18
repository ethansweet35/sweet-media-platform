"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** CallRail target number — see src/app/layout.tsx CALLRAIL_SWAP_SRC. */
const TEL_DISPLAY = "949-676-2252";
const TEL_HREF = "tel:949-676-2252";

const companyItems = [
  {
    label: "Our Company",
    path: "/our-company",
    icon: "ri-building-2-line",
    desc: "Our story, mission & values",
  },
  {
    label: "Our Team",
    path: "/our-team",
    icon: "ri-group-line",
    desc: "Meet the people behind Cipher",
  },
];

const solutionItems = [
  {
    label: "Verification of Benefits",
    path: "/behavioral-health-revenue-cycle-management",
    icon: "ri-shield-check-line",
    desc: "Accurate VOB & prior authorization support",
  },
  {
    label: "Claims Submission",
    path: "/behavioral-health-revenue-cycle-management",
    icon: "ri-file-upload-line",
    desc: "Clean claim filing with pre-billing audits",
  },
  {
    label: "Denial Management",
    path: "/behavioral-health-revenue-cycle-management",
    icon: "ri-error-warning-line",
    desc: "Aggressive appeals & follow-up on denials",
  },
  {
    label: "Compliance & Reporting",
    path: "/behavioral-health-revenue-cycle-management",
    icon: "ri-bar-chart-2-line",
    desc: "Audit-ready documentation & revenue reporting",
  },
];

const processItems = [
  {
    label: "Credentialing & Setup",
    path: "/our-process-2",
    icon: "ri-settings-3-line",
    desc: "Insurance credentialing and billing setup",
  },
  {
    label: "Utilization Review",
    path: "/our-process-2",
    icon: "ri-stethoscope-line",
    desc: "Clinical documentation & UR advocacy",
  },
  {
    label: "Claims & Follow-Up",
    path: "/our-process-2",
    icon: "ri-refresh-line",
    desc: "Clean claim filing with proactive follow-up",
  },
  {
    label: "Reconciliation & Reporting",
    path: "/our-process-2",
    icon: "ri-bar-chart-line",
    desc: "Monthly reconciliation & revenue reporting",
  },
];

const resourceItems = [
  {
    label: "Reimbursement Rates by State",
    path: "/behavioral-health-reimbursement-rates-by-state",
    icon: "ri-map-2-line",
    desc: "Current payer rates across all 50 states",
  },
  {
    label: "Billing Codes Guide",
    path: "/behavioral-health-coding-guide",
    icon: "ri-file-list-3-line",
    desc: "CPT & ICD codes for behavioral health",
  },
  {
    label: "Blog",
    path: "/blog",
    icon: "ri-article-line",
    desc: "Industry insights & RCM best practices",
  },
  {
    label: "FAQ",
    path: "/faq",
    icon: "ri-question-answer-line",
    desc: "Answers to your top billing questions",
  },
  // Draft — pending client approval; remove comment to re-enable in menu
  // { label: "Billing Cost Calculator", path: "/resources/in-house-vs-outsourced-calculator", icon: "ri-calculator-line", desc: "In-house vs. outsourced — true cost comparison" },
];

function pathMatches(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MegaLinkCard({
  item,
  onClick,
}: {
  item: { label: string; path: string; icon: string; desc: string };
  onClick: () => void;
}) {
  return (
    <Link
      href={item.path}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 transition-all duration-150 hover:border-[#166C96]/50 hover:bg-[#166C96]/10"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/20 text-[#5BA3C9] transition-colors duration-150 group-hover:bg-[#166C96]/35">
        <i className={`${item.icon} text-sm`} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[10.5px] font-bold uppercase leading-snug tracking-[0.12em] text-white">
          {item.label}
        </span>
        <span className="text-[10.5px] leading-snug text-white/45">{item.desc}</span>
      </span>
    </Link>
  );
}

function MegaFeatureCard({
  icon,
  label,
  desc,
}: {
  icon: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] px-4 py-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#166C96]/20 text-[#5BA3C9]">
        <i className={`${icon} text-sm`} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[10.5px] font-bold uppercase leading-snug tracking-[0.12em] text-white">
          {label}
        </span>
        <span className="text-[10.5px] leading-snug text-white/45">{desc}</span>
      </span>
    </div>
  );
}

function MegaCta({
  eyebrow,
  heading,
  body,
  cta,
  ctaHref,
  onClick,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  ctaHref: string;
  onClick: () => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-white/[0.1] bg-gradient-to-br from-[#166C96]/25 to-transparent p-5">
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#5BA3C9]">
        {eyebrow}
      </p>
      <h3 className="mt-1.5 font-[var(--font-heading)] text-lg font-medium leading-snug text-white">
        {heading}
      </h3>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/55">{body}</p>
      <Link
        href={ctaHref}
        onClick={onClick}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-sm bg-[#166C96] px-4 py-2 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1a7eb0]"
      >
        {cta} <i className="ri-arrow-right-line text-sm" />
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkBase =
    "text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150";
  const linkIdle = "text-[var(--color-accent)] hover:text-[#101E3F]";
  const linkActive = "text-[#101E3F]";

  const toggle = (key: string) =>
    setOpenMenu((prev) => (prev === key ? null : key));

  return (
    <header className="sticky top-0 z-50 w-full min-w-0">
      {/* Top bar */}
      <div className="bg-[#101E3F] px-4 py-2.5 text-[10px] font-medium tracking-[0.12em] text-white md:px-8">
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4">
          <span className="min-w-0 uppercase leading-snug text-white/70 md:text-[11px] md:tracking-[0.14em]">
            <span className="hidden md:inline">
              1665 Scenic Ave Suite 250, Costa Mesa, CA 92626
            </span>
            <span className="md:hidden">Behavioral Health Billing Experts</span>
          </span>
          <a
            href={TEL_HREF} suppressHydrationWarning
            className="shrink-0 whitespace-nowrap font-semibold uppercase tracking-[0.14em] text-white underline decoration-white/40 underline-offset-2 transition hover:decoration-white"
          >
            Call Now | {TEL_DISPLAY}
          </a>
        </div>
      </div>

      {/* Main nav: full-width white (sticky-safe); inner row aligns with top bar */}
      <nav
        ref={navRef}
        className="relative w-full border-b border-slate-200 bg-white"
      >
        <div
          className="relative"
          onMouseLeave={() => setOpenMenu(null)}
        >
        <div className="px-4 md:px-8">
          <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onMouseEnter={() => setOpenMenu(null)}
          >
            <Image
              src="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/HORIZONTAL-LOGO_CIPHER-BLACK_TRANSPARENT-BG-1024x262.png"
              alt="Cipher Billing"
              width={210}
              height={54}
              priority
              className="h-auto w-[140px] sm:w-[170px] lg:w-[190px]"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 xl:flex">
            {/* Our Company trigger */}
            <button
              type="button"
              onMouseEnter={() => setOpenMenu("company")}
              onClick={() => toggle("company")}
              aria-expanded={openMenu === "company"}
              aria-haspopup="true"
              className={`flex items-center gap-1 ${linkBase} ${
                openMenu === "company" ||
                companyItems.some((c) => pathMatches(pathname, c.path))
                  ? linkActive
                  : linkIdle
              }`}
            >
              Our Company
              <ChevronIcon open={openMenu === "company"} />
            </button>

            <button
              type="button"
              onMouseEnter={() => setOpenMenu("solution")}
              onClick={() => toggle("solution")}
              aria-expanded={openMenu === "solution"}
              aria-haspopup="true"
              className={`flex items-center gap-1 ${linkBase} ${
                openMenu === "solution" || pathMatches(pathname, "/behavioral-health-revenue-cycle-management")
                  ? linkActive
                  : linkIdle
              }`}
            >
              Our Solution
              <ChevronIcon open={openMenu === "solution"} />
            </button>

            <button
              type="button"
              onMouseEnter={() => setOpenMenu("process")}
              onClick={() => toggle("process")}
              aria-expanded={openMenu === "process"}
              aria-haspopup="true"
              className={`flex items-center gap-1 ${linkBase} ${
                openMenu === "process" || pathMatches(pathname, "/our-process-2")
                  ? linkActive
                  : linkIdle
              }`}
            >
              Our Process
              <ChevronIcon open={openMenu === "process"} />
            </button>

            {/* Resources trigger */}
            <button
              type="button"
              onMouseEnter={() => setOpenMenu("resources")}
              onClick={() => toggle("resources")}
              aria-expanded={openMenu === "resources"}
              aria-haspopup="true"
              className={`flex items-center gap-1 ${linkBase} ${
                openMenu === "resources" ||
                resourceItems.some((c) => pathMatches(pathname, c.path))
                  ? linkActive
                  : linkIdle
              }`}
            >
              Resources
              <ChevronIcon open={openMenu === "resources"} />
            </button>

            <Link
              href="/careers"
              className={`${linkBase} ${pathMatches(pathname, "/careers") ? linkActive : linkIdle}`}
              onMouseEnter={() => setOpenMenu(null)}
            >
              Careers
            </Link>
          </div>

          {/* Mobile hamburger — animated X */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className="flex flex-col gap-[5px]" aria-hidden>
              <span
                className={`block h-[2px] w-6 origin-center bg-[#101E3F] transition-all duration-200 ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-[2px] w-6 bg-[#101E3F] transition-all duration-200 ${mobileOpen ? "scale-x-0 opacity-0" : ""}`}
              />
              <span
                className={`block h-[2px] w-6 origin-center bg-[#101E3F] transition-all duration-200 ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
          </div>
        </div>

        {/* ── Mega menu: Our Company ───────────────────────────────────── */}
        {openMenu === "company" && (
          <div className="absolute inset-x-0 top-full z-50 border-t-2 border-[#166C96] bg-[#0A1628] shadow-2xl">
            <div className="mx-auto max-w-[1140px] px-8 py-4">
              <div className="grid grid-cols-[1fr_1px_230px_1px_230px] gap-6 items-stretch">

                {/* Col 1 — Brand statement */}
                <div className="flex flex-col justify-center gap-4 pr-2">
                  <div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#5BA3C9]">
                      About Cipher Billing
                    </p>
                    <p className="mt-2 font-[var(--font-heading)] text-lg font-medium leading-snug text-white">
                      Behavioral health billing<br />specialists since day one.
                    </p>
                    <p className="mt-2 text-[11.5px] leading-relaxed text-white/50">
                      We work exclusively with behavioral health providers — RTC, PHP, IOP, and private practice — delivering airtight compliance and maximized revenue.
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="self-stretch bg-white/[0.07]" aria-hidden />

                {/* Col 2 — Nav links */}
                <div className="flex flex-col gap-2 justify-center">
                  {companyItems.map((item) => (
                    <MegaLinkCard
                      key={item.path}
                      item={item}
                      onClick={() => setOpenMenu(null)}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="self-stretch bg-white/[0.07]" aria-hidden />

                {/* Col 3 — CTA */}
                <MegaCta
                  eyebrow="Ready to grow?"
                  heading="Get a free practice audit"
                  body="See exactly where you're losing revenue — no strings attached."
                  cta="Request Audit"
                  ctaHref="/contact-us"
                  onClick={() => setOpenMenu(null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Mega menu: Resources ─────────────────────────────────────── */}
        {openMenu === "resources" && (
          <div className="absolute inset-x-0 top-full z-50 border-t-2 border-[#166C96] bg-[#0A1628] shadow-2xl">
            <div className="mx-auto max-w-[1140px] px-8 py-4">
              <div className="grid grid-cols-[220px_1px_1fr_1px_230px] gap-6 items-stretch">

                {/* Col 1 — Brand statement */}
                <div className="flex flex-col justify-center gap-4 pr-2">
                  <div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#5BA3C9]">
                      Billing Resources
                    </p>
                    <p className="mt-2 font-[var(--font-heading)] text-lg font-medium leading-snug text-white">
                      Free tools & references<br />for behavioral health providers.
                    </p>
                    <p className="mt-2 text-[11.5px] leading-relaxed text-white/50">
                      From state-by-state reimbursement data to complete CPT code libraries — everything you need to protect and maximize revenue.
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="self-stretch bg-white/[0.07]" aria-hidden />

                {/* Col 2 — Nav links 2×2 */}
                <div className="grid grid-cols-2 gap-2 content-center">
                  {resourceItems.map((item) => (
                    <MegaLinkCard
                      key={item.path}
                      item={item}
                      onClick={() => setOpenMenu(null)}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="self-stretch bg-white/[0.07]" aria-hidden />

                {/* Col 3 — CTA */}
                <MegaCta
                  eyebrow="Free resource"
                  heading="Rates & codes in one place"
                  body="Access our complete library of behavioral health billing references."
                  cta="View Rates"
                  ctaHref="/behavioral-health-reimbursement-rates-by-state"
                  onClick={() => setOpenMenu(null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Mega menu: Our Solution ──────────────────────────────────── */}
        {openMenu === "solution" && (
          <div className="absolute inset-x-0 top-full z-50 border-t-2 border-[#166C96] bg-[#0A1628] shadow-2xl">
            <div className="mx-auto max-w-[1140px] px-8 py-4">
              <div className="grid grid-cols-[220px_1px_1fr_1px_230px] gap-6 items-stretch">
                {/* Left — overview */}
                <div className="flex flex-col justify-center pr-2">
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#5BA3C9]">
                    Our Solution
                  </p>
                  <p className="mt-2 font-[var(--font-heading)] text-lg font-medium leading-snug text-white">
                    Full-cycle behavioral health revenue management.
                  </p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-white/50">
                    From VOB through final payment, we handle every step of the revenue cycle so your team can focus entirely on patient care.
                  </p>
                  <Link
                    href="/behavioral-health-revenue-cycle-management"
                    onClick={() => setOpenMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#5BA3C9] transition hover:text-white"
                  >
                    View full overview <i className="ri-arrow-right-line" />
                  </Link>
                </div>
                <div className="self-stretch bg-white/[0.07]" aria-hidden />
                {/* Middle — service highlights (informational, not sub-pages) */}
                <div className="grid grid-cols-2 gap-2 content-center">
                  {solutionItems.map((item) => (
                    <MegaFeatureCard
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      desc={item.desc}
                    />
                  ))}
                </div>
                <div className="self-stretch bg-white/[0.07]" aria-hidden />
                <MegaCta
                  eyebrow="Maximize revenue"
                  heading="Protect your organization's cash flow"
                  body="Get a complimentary billing audit and see where you're leaving money on the table."
                  cta="Get Free Audit"
                  ctaHref="/contact-us"
                  onClick={() => setOpenMenu(null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Mega menu: Our Process ───────────────────────────────────── */}
        {openMenu === "process" && (
          <div className="absolute inset-x-0 top-full z-50 border-t-2 border-[#166C96] bg-[#0A1628] shadow-2xl">
            <div className="mx-auto max-w-[1140px] px-8 py-4">
              <div className="grid grid-cols-[220px_1px_1fr_1px_230px] gap-6 items-stretch">
                {/* Left — overview */}
                <div className="flex flex-col justify-center pr-2">
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#5BA3C9]">
                    Our Process
                  </p>
                  <p className="mt-2 font-[var(--font-heading)] text-lg font-medium leading-snug text-white">
                    A transparent, step-by-step billing process.
                  </p>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-white/50">
                    Revenue cycle management shouldn't be a black box. Our proven process is purpose-built for behavioral health and addiction treatment.
                  </p>
                  <Link
                    href="/our-process-2"
                    onClick={() => setOpenMenu(null)}
                    className="mt-4 inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#5BA3C9] transition hover:text-white"
                  >
                    See the full process <i className="ri-arrow-right-line" />
                  </Link>
                </div>
                <div className="self-stretch bg-white/[0.07]" aria-hidden />
                {/* Middle — process step highlights (informational) */}
                <div className="grid grid-cols-2 gap-2 content-center">
                  {processItems.map((item) => (
                    <MegaFeatureCard
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      desc={item.desc}
                    />
                  ))}
                </div>
                <div className="self-stretch bg-white/[0.07]" aria-hidden />
                <MegaCta
                  eyebrow="No black boxes"
                  heading="See exactly how we work"
                  body="Our step-by-step process is designed for full transparency and measurable results."
                  cta="View Our Process"
                  ctaHref="/our-process-2"
                  onClick={() => setOpenMenu(null)}
                />
              </div>
            </div>
          </div>
        )}
        </div>
      </nav>

      {/* ── Mobile backdrop ──────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        aria-hidden={!mobileOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[360px] flex-col bg-[#0A1628] shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/HORIZONTAL-LOGO_CIPHER-BLACK_TRANSPARENT-BG-1024x262.png"
              alt="Cipher Billing"
              width={160}
              height={41}
              className="h-auto w-[120px] brightness-0 invert"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/60 transition hover:border-white/30 hover:text-white"
            aria-label="Close menu"
          >
            <i className="ri-close-line text-base" />
          </button>
        </div>

        {/* Drawer nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col gap-0.5">
            {/* Our Company accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileExpanded(
                    mobileExpanded === "company" ? null : "company",
                  )
                }
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                Our Company
                <i
                  className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileExpanded === "company" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "company" && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l-2 border-[#166C96]/40 pl-3">
                  {companyItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/[0.05]"
                    >
                      <i className={`${item.icon} text-[#5BA3C9] text-base`} />
                      <span className="text-[12px] font-semibold text-white/80">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Our Solution accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === "solution" ? null : "solution")}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                Our Solution
                <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileExpanded === "solution" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "solution" && (
                <div className="ml-3 mt-1 border-l-2 border-[#166C96]/40 pl-3">
                  <p className="px-3 py-2 text-[11px] leading-relaxed text-white/50">
                    Full-cycle RCM for behavioral health — VOB, claims, denials, and compliance handled end-to-end.
                  </p>
                  <Link
                    href="/behavioral-health-revenue-cycle-management"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5BA3C9] transition hover:bg-white/[0.05] hover:text-white"
                  >
                    View Our Solution <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              )}
            </div>

            {/* Our Process accordion */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === "process" ? null : "process")}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                Our Process
                <i className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileExpanded === "process" ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded === "process" && (
                <div className="ml-3 mt-1 border-l-2 border-[#166C96]/40 pl-3">
                  <p className="px-3 py-2 text-[11px] leading-relaxed text-white/50">
                    A proven, transparent step-by-step billing process purpose-built for behavioral health and addiction treatment.
                  </p>
                  <Link
                    href="/our-process-2"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5BA3C9] transition hover:bg-white/[0.05] hover:text-white"
                  >
                    View Our Process <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              )}
            </div>

            {/* Resources accordion */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileExpanded(
                    mobileExpanded === "resources" ? null : "resources",
                  )
                }
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
              >
                Resources
                <i
                  className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${mobileExpanded === "resources" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileExpanded === "resources" && (
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l-2 border-[#166C96]/40 pl-3">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/[0.05]"
                    >
                      <i className={`${item.icon} text-[#5BA3C9] text-base`} />
                      <span className="text-[12px] font-semibold text-white/80">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-lg px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
            >
              Careers
            </Link>
          </div>
        </div>

        {/* Drawer footer CTAs */}
        <div className="border-t border-white/10 px-5 py-5">
          <a
            href={TEL_HREF} suppressHydrationWarning
            className="flex items-center justify-center gap-2 rounded-lg bg-[#166C96] px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#1a7eb0]"
          >
            <i className="ri-phone-line text-sm" />
            Call Now | {TEL_DISPLAY}
          </a>
          <Link
            href="/contact-us"
            onClick={() => setMobileOpen(false)}
            className="mt-2.5 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/75 transition hover:border-white/40 hover:text-white"
          >
            Get a Free Audit
          </Link>
        </div>
      </div>
    </header>
  );
}
