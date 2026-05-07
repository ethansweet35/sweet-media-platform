"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TEL_DISPLAY = "714-867-1331";
const TEL_HREF = "tel:+17148671331";

const companyChildren = [
  { label: "Our Company", path: "/our-company" },
  { label: "Our Team", path: "/our-team" },
];

/** Matches live Elementor menu (order + labels) — see cipherbilling.com */
const resourceChildren = [
  { label: "Behavioral Health Reimbursements By State", path: "/behavioral-health-reimbursement-rates-by-state" },
  { label: "Behavioral Health Billing Codes", path: "/behavioral-health-coding-guide" },
  { label: "Blogs", path: "/blog" },
  { label: "FAQ", path: "/faq" },
];

type MainNavItem =
  | { type: "link"; label: string; path: string }
  | {
      type: "dropdown";
      label: string;
      /** If set, top label navigates here (Our Company). Omit for WP-style anchor-only parents (Resources). */
      dropdownHref?: string;
      children: { label: string; path: string }[];
    };

const mainNav: MainNavItem[] = [
  {
    type: "dropdown",
    label: "Our Company",
    /** Top-level click goes here (matches WP); submenu still lists Company + Team */
    dropdownHref: "/our-company",
    children: companyChildren,
  },
  {
    type: "link",
    label: "Our Solution",
    path: "/our-solution",
  },
  {
    type: "link",
    label: "Our Process",
    path: "/our-process-2",
  },
  {
    type: "dropdown",
    label: "Resources",
    children: resourceChildren,
  },
  {
    type: "link",
    label: "Careers",
    path: "/careers",
  },
  {
    type: "link",
    label: "Contact Us",
    path: "/contact-us",
  },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function pathMatches(pathname: string, path: string) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname() ?? "";
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const linkClass =
    "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)] transition-colors hover:text-[var(--color-dark-blue)]";

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar — matches live: full caps address, underlined call */}
      <div className="bg-[var(--color-dark-blue)] px-4 py-2.5 text-[10px] font-medium tracking-[0.12em] text-white md:px-8">
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4">
          <span className="min-w-0 uppercase leading-snug text-white/95 md:text-[11px] md:tracking-[0.14em]">
            <span className="hidden md:inline">
              1665 Scenic Ave Suite 250, Costa Mesa, CA 92626
            </span>
            <span className="md:hidden">Behavioral Health Billing Experts</span>
          </span>
          <a
            href={TEL_HREF}
            className="shrink-0 whitespace-nowrap uppercase text-white underline decoration-white underline-offset-2 hover:text-white"
          >
            Call Now | {TEL_DISPLAY}
          </a>
        </div>
      </div>

      <nav className="border-b border-slate-200 bg-white px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="https://cipherbilling.com/wp-content/uploads/2026/04/HORIZONTAL-LOGO_CIPHER-BLACK_TRANSPARENT-BG-1024x262.png"
              alt="Cipher Billing"
              width={210}
              height={54}
              priority
              className="h-auto w-[140px] sm:w-[170px] lg:w-[190px]"
            />
          </Link>

          {/* Desktop nav — matches live order; dropdowns + chevrons */}
          <div className="hidden items-center gap-7 xl:flex">
            {mainNav.map((item) => {
              if (item.type === "link") {
                const active = pathMatches(pathname, item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`${linkClass} ${active ? "text-[var(--color-dark-blue)]" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              }

              const anyChildActive = item.children.some((c) => pathMatches(pathname, c.path));
              const dropdownHref = item.dropdownHref;

              return (
                <div key={item.label} className="group relative">
                  {dropdownHref ? (
                    <Link
                      href={dropdownHref}
                      className={`flex items-center gap-1 ${linkClass} ${anyChildActive ? "text-[var(--color-dark-blue)]" : ""}`}
                    >
                      {item.label}
                      <ChevronDown className="opacity-80" />
                    </Link>
                  ) : (
                    <span
                      className={`flex cursor-default items-center gap-1 ${linkClass} ${anyChildActive ? "text-[var(--color-dark-blue)]" : ""}`}
                    >
                      {item.label}
                      <ChevronDown className="opacity-80" />
                    </span>
                  )}
                  <div
                    className="invisible absolute left-1/2 top-full z-50 min-w-[220px] -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                    role="menu"
                  >
                    <div className="rounded-sm border border-slate-200 bg-white py-2 shadow-lg">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          role="menuitem"
                          className="block px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent)] hover:bg-slate-50 hover:text-[var(--color-dark-blue)]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-[var(--color-dark-blue)] xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <span className="text-lg leading-none">×</span>
            ) : (
              <span className="flex flex-col gap-1.5" aria-hidden>
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </span>
            )}
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen ? (
          <div
            id="mobile-nav"
            className="mt-4 border-t border-slate-100 pb-4 xl:hidden"
          >
            <div className="flex flex-col gap-1 pt-3">
              {mainNav.map((item) => {
                if (item.type === "link") {
                  const active = pathMatches(pathname, item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`rounded px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] ${
                        active
                          ? "bg-slate-100 text-[var(--color-dark-blue)]"
                          : "text-[var(--color-accent)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <div key={item.label} className="py-1">
                    <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className="block rounded px-3 py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
