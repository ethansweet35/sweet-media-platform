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

/** Simple white dropdown card used for Our Company and Resources. */
function SimpleDropdown({
  items,
  onClose,
}: {
  items: { label: string; path: string }[];
  onClose: () => void;
}) {
  const pathname = usePathname() ?? "";
  return (
    <div className="w-56 overflow-hidden rounded-lg border border-slate-100 bg-white py-1.5 shadow-xl">
      {items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={onClose}
          className={`block px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:bg-[#F5F7FA] ${
            pathMatches(pathname, item.path)
              ? "text-[#101E3F]"
              : "text-[#166C96] hover:text-[#101E3F]"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "";
  return <NavbarInteractive key={pathname} pathname={pathname} />;
}

function NavbarInteractive({ pathname }: { pathname: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

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
        <div className="relative">
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
            {/* Our Company — dropdown */}
            <div className="relative">
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
              {openMenu === "company" && (
                <div className="absolute left-0 top-full pt-2">
                  <SimpleDropdown items={companyItems} onClose={() => setOpenMenu(null)} />
                </div>
              )}
            </div>

            {/* Our Solution — direct link */}
            <Link
              href="/behavioral-health-revenue-cycle-management"
              className={`${linkBase} ${pathMatches(pathname, "/behavioral-health-revenue-cycle-management") ? linkActive : linkIdle}`}
              onMouseEnter={() => setOpenMenu(null)}
            >
              Our Solution
            </Link>

            {/* Our Process — direct link */}
            <Link
              href="/our-process"
              className={`${linkBase} ${pathMatches(pathname, "/our-process") ? linkActive : linkIdle}`}
              onMouseEnter={() => setOpenMenu(null)}
            >
              Our Process
            </Link>

            {/* Resources — dropdown */}
            <div className="relative">
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
              {openMenu === "resources" && (
                <div className="absolute right-0 top-full pt-2">
                  <SimpleDropdown items={resourceItems} onClose={() => setOpenMenu(null)} />
                </div>
              )}
            </div>

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

            {/* Our Solution — direct link */}
            <Link
              href="/behavioral-health-revenue-cycle-management"
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-lg px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
            >
              Our Solution
            </Link>

            {/* Our Process — direct link */}
            <Link
              href="/our-process"
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-lg px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.05] hover:text-white"
            >
              Our Process
            </Link>

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
