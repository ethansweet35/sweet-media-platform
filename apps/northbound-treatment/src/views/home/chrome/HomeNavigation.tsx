"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NB_LOGO } from "../assets";
import { PRIMARY_NAV, type MegaSection, type TopLevelItem } from "./menuData";

/**
 * Main fixed navigation. Hover any top-level item with `sections` to expand
 * a full-width mega-menu panel below the navbar (1–3 columns depending on
 * the item). Direct links navigate immediately.
 *
 * Menu structure mirrored from northboundtreatment.com (live WP site).
 */
export default function HomeNavigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [openMobileSubSection, setOpenMobileSubSection] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileSection(null);
    setOpenMobileSubSection(null);
  };

  return (
    <nav
      className="architectural-border-bottom fixed left-0 right-0 top-10 z-50 border-b border-sand-dark/40 bg-sand-light shadow-sm"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex flex-shrink-0 items-center transition-opacity hover:opacity-80"
          >
            <Image
              src={NB_LOGO}
              alt="Northbound Treatment Services"
              width={500}
              height={132}
              priority
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <div className="hidden items-center space-x-5 lg:flex xl:space-x-6">
            {PRIMARY_NAV.map((item) => (
              <DesktopMenuItem
                key={item.label}
                item={item}
                isActive={activeMenu === item.label}
                onActivate={() =>
                  setActiveMenu(item.sections ? item.label : null)
                }
              />
            ))}

            <a
              href="tel:8663110003"
              className="flex items-center gap-2 bg-navy px-5 py-3 text-xs uppercase tracking-[0.1em] text-sand-light transition-colors duration-300 hover:bg-terracotta xl:px-6"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-terracotta"></span>
              (866) 311-0003
            </a>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <a
              href="tel:8663110003"
              className="border-b border-terracotta text-xs font-bold uppercase tracking-[0.18em] text-terracotta"
            >
              Call Now
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="text-espresso transition-colors hover:text-navy focus:outline-none"
            >
              <i
                className={`${
                  mobileOpen ? "ri-close-line" : "ri-menu-line"
                } text-2xl leading-none`}
              ></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mega-menu — only mount the open panel (avoids hidden panels repainting under fixed header) */}
      {PRIMARY_NAV.map((item) =>
        item.sections && activeMenu === item.label ? (
          <MegaMenuPanel
            key={item.label}
            item={item}
            onClose={() => setActiveMenu(null)}
          />
        ) : null,
      )}

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="absolute left-0 right-0 top-full z-50 flex max-h-[calc(100svh-7.5rem)] flex-col bg-white shadow-2xl lg:hidden">
          {/* Accent bar */}
          <div className="h-[3px] w-full flex-shrink-0 bg-gradient-to-r from-terracotta via-navy to-espresso" />

          {/* Header strip */}
          <div className="flex flex-shrink-0 items-center justify-between border-b border-sand-dark/40 bg-navy px-5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                Navigate
              </span>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/25">
              <span>38+ Years</span>
              <span>·</span>
              <span>24 / 7 Care</span>
              <span>·</span>
              <span>DHCS Licensed</span>
            </div>
          </div>

          {/* Scrollable nav items */}
          <ul className="flex-1 divide-y divide-sand-dark/30 overflow-y-auto px-5">
            {PRIMARY_NAV.map((item) => (
              <MobileMenuRow
                key={item.label}
                item={item}
                isOpen={openMobileSection === item.label}
                onToggle={() => {
                  setOpenMobileSection((cur) =>
                    cur === item.label ? null : item.label,
                  );
                  setOpenMobileSubSection(null);
                }}
                onNavigate={closeMobile}
                openSubSection={openMobileSubSection}
                onSubToggle={(heading) =>
                  setOpenMobileSubSection((cur) =>
                    cur === heading ? null : heading,
                  )
                }
              />
            ))}
          </ul>

          {/* Sticky CTA footer */}
          <div className="flex-shrink-0 border-t border-sand-dark/40 bg-white p-4">
            <a
              href="tel:8663110003"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 bg-terracotta px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-fill text-sm" />
              (866) 311-0003
            </a>
            <p className="mt-2 text-center text-[9px] font-semibold uppercase tracking-widest text-espresso/30">
              Free &amp; Confidential · DHCS #300661CP
            </p>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

/* -----------------------------------------------------------------------
 * Desktop pieces
 * ---------------------------------------------------------------------- */

function DesktopMenuItem({
  item,
  isActive,
  onActivate,
}: {
  item: TopLevelItem;
  isActive: boolean;
  onActivate: () => void;
}) {
  const hasMenu = !!item.sections;

  if (!hasMenu) {
    return (
      <Link
        href={item.href}
        onMouseEnter={onActivate}
        className="text-xs uppercase tracking-[0.1em] text-espresso transition-colors duration-300 hover:text-navy"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`flex items-center gap-1 text-xs uppercase tracking-[0.1em] text-espresso transition-colors duration-300 hover:text-navy ${
        isActive ? "text-navy" : ""
      }`}
    >
      {item.label}
      <i
        className={`ri-arrow-down-s-line text-sm leading-none transition-transform duration-300 ${
          isActive ? "rotate-180" : ""
        }`}
      ></i>
    </button>
  );
}

/**
 * Whether this item gets the CTA sidebar card.
 * Only shown on tall menus where its full height fills naturally —
 * short menus (Locations, About) skip it to avoid empty space next to
 * the sections.
 */
function hasCta(label: string) {
  return label === "Treatment Services" || label === "Admissions";
}

function MegaMenuPanel({
  item,
  onClose,
}: {
  item: TopLevelItem;
  onClose: () => void;
}) {
  if (!item.sections) return null;
  const showCta = hasCta(item.label);

  // New layout: sections stack vertically as horizontal rows. Optional CTA
  // sidebar floats on the right at a fixed width. This kills the cramped
  // multi-column tile/list problem entirely.
  const layoutClass = showCta
    ? "lg:grid-cols-[minmax(0,1fr)_280px]"
    : "lg:grid-cols-1";

  return (
    <div className="absolute left-0 right-0 top-full hidden shadow-2xl lg:block">
      {/* Terracotta → navy gradient accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-terracotta via-navy to-espresso" />

      <div className="border-b border-sand-dark bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
          <div className={`grid grid-cols-1 gap-8 ${layoutClass}`}>
            {/* Main content area: sections as horizontal rows */}
            <div className="flex flex-col divide-y divide-sand-dark/60">
              {item.sections.map((section, idx) => (
                <MegaMenuRow
                  key={section.heading}
                  section={section}
                  index={idx}
                  onClose={onClose}
                />
              ))}
            </div>

            {showCta && <MegaMenuCta onClose={onClose} />}
          </div>
        </div>

        {/* Bottom availability bar */}
        <div className="border-t border-sand-dark/60 bg-sand px-6 py-3 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-espresso/50">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
                Admissions counselors available 24 / 7
              </div>
              <div className="hidden items-center gap-4 lg:flex">
                {["38+ Years", "10,000+ Served", ">97% Outcomes", "DHCS Licensed"].map((t) => (
                  <span key={t} className="text-[10px] font-semibold text-espresso/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="tel:8663110003"
              onClick={onClose}
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:text-terracotta"
            >
              (866) 311-0003
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * MegaMenuRow — a full-width horizontal section.
 * Layout: editorial header anchored on the left (~260px), pill cluster
 * flowing horizontally on the right with comfortable wrap.
 */
function MegaMenuRow({
  section,
  index,
  onClose,
}: {
  section: MegaSection;
  index: number;
  onClose: () => void;
}) {
  const isInsurance = section.heading === "Verify Insurance";
  const sectionNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 gap-6 py-7 first:pt-0 last:pb-0 lg:grid-cols-[260px_1fr] lg:gap-10">
      {/* ── Editorial header (left) ── */}
      <div className="relative flex flex-col">
        <div className="mb-3 flex items-center gap-3">
          <span className="font-heading text-2xl italic text-terracotta">
            {sectionNumber}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-terracotta/60 via-sand-dark to-transparent" />
        </div>

        {section.headingHref ? (
          <Link
            href={section.headingHref}
            onClick={onClose}
            className="group/heading inline-flex items-baseline gap-2 self-start"
          >
            <h4 className="font-heading text-2xl font-bold leading-[1.1] text-navy transition-colors group-hover/heading:text-terracotta">
              {section.heading}
            </h4>
            <i className="ri-arrow-right-up-line text-base text-navy/30 transition-all group-hover/heading:-translate-y-0.5 group-hover/heading:translate-x-0.5 group-hover/heading:text-terracotta" />
          </Link>
        ) : (
          <h4 className="font-heading text-2xl font-bold leading-[1.1] text-navy">
            {section.heading}
          </h4>
        )}

        {section.description && (
          <p className="mt-3 text-[12px] leading-relaxed text-espresso/55">
            {section.description}
          </p>
        )}

        {section.headingHref && (
          <Link
            href={section.headingHref}
            onClick={onClose}
            className="group/all mt-4 inline-flex items-center gap-2 self-start text-[10px] font-bold uppercase tracking-[0.18em] text-navy transition-colors hover:text-terracotta"
          >
            View all
            <i className="ri-arrow-right-line text-sm transition-transform duration-200 group-hover/all:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* ── Pill cluster (right) ── */}
      {isInsurance ? (
        <div className="flex flex-wrap content-start gap-2">
          {section.links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={onClose}
              className="group inline-flex items-center gap-1.5 border border-sand-dark/60 bg-white px-3 py-1.5 text-[11px] font-semibold text-espresso/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-terracotta hover:bg-navy hover:text-white hover:shadow-sm"
            >
              <i className="ri-shield-check-line text-[11px] text-terracotta transition-colors group-hover:text-terracotta-light" />
              {link.label}
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap content-start gap-2">
          {section.links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={onClose}
              className="group/pill inline-flex items-center gap-2 border border-sand-dark/60 bg-white px-3.5 py-2 text-[12px] font-semibold leading-none text-espresso/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-terracotta hover:text-navy hover:shadow-sm"
            >
              {link.icon && (
                <i
                  className={`${link.icon} text-sm leading-none text-navy/50 transition-colors duration-200 group-hover/pill:text-terracotta`}
                />
              )}
              <span className="whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** Dark CTA card — rightmost column on Treatment Services & Admissions menus. */
function MegaMenuCta({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative flex flex-col overflow-hidden bg-navy p-7">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-light/60" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-terracotta/15" />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-terracotta">Available 24 / 7</span>
        </div>

        <h3 className="font-heading text-lg font-bold text-white">Ready to start your recovery?</h3>
        <p className="mt-2 text-xs leading-relaxed text-white/55">
          One confidential call is all it takes. Our team is standing by.
        </p>

        {/* Trust metrics */}
        <div className="my-5 grid grid-cols-2 gap-2">
          {[
            { value: "38+", label: "Years" },
            { value: "10k+", label: "Served" },
            { value: ">97%", label: "Outcomes" },
            { value: "2:1", label: "Staff ratio" },
          ].map((s) => (
            <div key={s.label} className="border border-white/10 bg-white/5 px-3 py-2 text-center">
              <p className="font-heading text-base font-bold text-white">{s.value}</p>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-terracotta">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-2">
          <a
            href="tel:8663110003"
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-terracotta px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-terracotta-light"
          >
            <i className="ri-phone-line text-sm" />
            (866) 311-0003
          </a>
          <Link
            href="/admissions/"
            onClick={onClose}
            className="flex items-center justify-center gap-2 border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:border-white/50 hover:bg-white/5"
          >
            <i className="ri-file-list-line text-sm" />
            Start Intake Online
          </Link>
        </div>

        <p className="mt-4 text-center text-[9px] font-semibold uppercase tracking-widest text-white/25">
          DHCS #300661CP · NAATP Member
        </p>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
 * Mobile accordion — two levels: top-level item → section → links
 * ---------------------------------------------------------------------- */

function MobileMenuRow({
  item,
  isOpen,
  onToggle,
  onNavigate,
  openSubSection,
  onSubToggle,
}: {
  item: TopLevelItem;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  openSubSection: string | null;
  onSubToggle: (heading: string) => void;
}) {
  if (!item.sections) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.14em] text-espresso hover:text-navy"
        >
          {item.label}
          <i className="ri-arrow-right-line text-sm text-espresso/25" />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between py-4 text-left text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${
          isOpen ? "text-navy" : "text-espresso"
        }`}
      >
        {item.label}
        <i
          className={`ri-arrow-down-s-line text-xl leading-none transition-transform duration-200 ${
            isOpen ? "rotate-180 text-terracotta" : "text-espresso/30"
          }`}
        />
      </button>

      {isOpen ? (
        <div className="mb-4 space-y-1.5">
          {item.sections.map((section) => (
            <MobileSubSection
              key={section.heading}
              section={section}
              isOpen={openSubSection === section.heading}
              onToggle={() => onSubToggle(section.heading)}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </li>
  );
}

function MobileSubSection({
  section,
  isOpen,
  onToggle,
  onNavigate,
}: {
  section: MegaSection;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
          isOpen ? "bg-navy" : "bg-sand"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {section.icon ? (
            <i
              className={`${section.icon} text-sm ${
                isOpen ? "text-terracotta" : "text-navy/40"
              }`}
            />
          ) : null}
          <span
            className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
              isOpen ? "text-white" : "text-espresso"
            }`}
          >
            {section.heading}
          </span>
        </div>
        <i
          className={`ri-arrow-down-s-line text-base leading-none transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white/50" : "text-espresso/30"
          }`}
        />
      </button>

      {isOpen ? (
        <div className="border border-t-0 border-sand-dark/40 bg-white px-4 pb-3 pt-2">
          {section.headingHref ? (
            <Link
              href={section.headingHref}
              onClick={onNavigate}
              className="mb-2 flex items-center gap-1.5 border-b border-sand-dark/30 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-terracotta"
            >
              View all {section.heading}
              <i className="ri-arrow-right-line text-xs" />
            </Link>
          ) : null}
          <ul>
            {section.links.map((link) => (
              <li key={`${link.label}-${link.href}`}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 py-2 text-sm text-espresso/75 hover:text-navy"
                >
                  {link.icon ? (
                    <i className={`${link.icon} text-xs text-navy/25`} />
                  ) : null}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
