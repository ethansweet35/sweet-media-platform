"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!mobileOpen) setOpenMobileSection(null);
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenMobileSection(null);
  };

  return (
    <nav
      className="architectural-border-bottom fixed left-0 right-0 top-10 z-50 bg-sand-light/95 backdrop-blur-md transition-all duration-300"
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

      {/* Mega-menu panel — single absolutely-positioned container that swaps content based on activeMenu */}
      {PRIMARY_NAV.map((item) =>
        item.sections ? (
          <MegaMenuPanel
            key={item.label}
            item={item}
            visible={activeMenu === item.label}
            onClose={() => setActiveMenu(null)}
          />
        ) : null,
      )}

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div className="architectural-border-top max-h-[calc(100vh-7.5rem)] overflow-y-auto bg-sand-light px-6 pb-6 pt-2 lg:hidden">
          <ul className="divide-y divide-sand-dark/40">
            {PRIMARY_NAV.map((item) => (
              <MobileMenuRow
                key={item.label}
                item={item}
                isOpen={openMobileSection === item.label}
                onToggle={() =>
                  setOpenMobileSection((cur) =>
                    cur === item.label ? null : item.label,
                  )
                }
                onNavigate={closeMobile}
              />
            ))}
          </ul>

          <a
            href="tel:8663110003"
            onClick={closeMobile}
            className="mt-6 flex items-center justify-center gap-2 bg-navy px-6 py-3 text-xs uppercase tracking-[0.18em] text-sand-light hover:bg-terracotta"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-terracotta"></span>
            (866) 311-0003
          </a>
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

/** Whether this item gets the CTA sidebar card. */
function hasCta(label: string) {
  return (
    label === "Treatment Services" ||
    label === "Admissions" ||
    label === "Locations" ||
    label === "About"
  );
}

function MegaMenuPanel({
  item,
  visible,
  onClose,
}: {
  item: TopLevelItem;
  visible: boolean;
  onClose: () => void;
}) {
  if (!item.sections) return null;
  const cols = item.sections.length;
  const showCta = hasCta(item.label);

  // With the new tile-grid columns, give each section a generous min/fr so
  // 3-col tiles inside don't squeeze. The sidebar CTA stays a fixed 260px.
  const gridColsClass = showCta
    ? cols >= 3
      ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_260px]"
      : cols >= 2
        ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_260px]"
        : "lg:grid-cols-[minmax(0,1fr)_260px]"
    : cols >= 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1 max-w-md";

  return (
    <div
      aria-hidden={!visible}
      className={`absolute left-0 right-0 top-full hidden shadow-2xl transition-all duration-300 lg:block ${
        visible
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0"
      }`}
    >
      {/* Terracotta → navy gradient accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-terracotta via-navy to-espresso" />

      <div className="border-b border-sand-dark bg-white">
        {/* Corner brackets */}
        <div className="pointer-events-none absolute left-6 top-[3px] h-8 w-8 border-l border-t border-sand-dark/60" />
        <div className="pointer-events-none absolute right-6 top-[3px] h-8 w-8 border-r border-t border-sand-dark/60" />

        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
          <div className={`grid grid-cols-1 gap-6 ${gridColsClass}`}>
            {item.sections.map((section, idx) => (
              <MegaMenuColumn key={section.heading} section={section} index={idx} onClose={onClose} />
            ))}
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

function MegaMenuColumn({
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

  // Tile grid columns scale with item density: dense menus pack tighter,
  // sparse menus get bigger tiles so they don't leave whitespace.
  const tileCols =
    section.links.length >= 9
      ? "grid-cols-3"
      : section.links.length >= 5
        ? "grid-cols-3"
        : "grid-cols-2";

  return (
    <div className="relative flex flex-col">
      {/* ── Compact editorial header ── */}
      <div className="mb-4 flex items-baseline gap-3 border-b border-sand-dark/70 pb-3">
        <span className="font-heading text-sm italic text-terracotta">
          {sectionNumber}
        </span>
        {section.headingHref ? (
          <Link
            href={section.headingHref}
            onClick={onClose}
            className="group/heading inline-flex items-baseline gap-1.5 transition-colors"
          >
            <h4 className="font-heading text-lg font-bold leading-tight text-navy transition-colors group-hover/heading:text-terracotta">
              {section.heading}
            </h4>
            <i className="ri-arrow-right-up-line text-sm text-navy/30 transition-all group-hover/heading:-translate-y-0.5 group-hover/heading:translate-x-0.5 group-hover/heading:text-terracotta" />
          </Link>
        ) : (
          <h4 className="font-heading text-lg font-bold leading-tight text-navy">
            {section.heading}
          </h4>
        )}
        <span className="ml-auto h-px flex-1 bg-gradient-to-r from-sand-dark/0 via-sand-dark to-sand-dark/0" />
        {section.icon && (
          <i className={`${section.icon} text-sm leading-none text-navy/30`} />
        )}
      </div>

      {/* ── Tile grid ── */}
      {isInsurance ? (
        /* Insurance: dense 2-col pill grid */
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-dark bg-sand-dark">
          {section.links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={onClose}
              className="group flex items-center gap-2 bg-white px-3 py-2.5 text-[11px] font-semibold text-espresso/70 transition-colors hover:bg-navy hover:text-white"
            >
              <i className="ri-shield-check-line text-xs text-terracotta transition-colors group-hover:text-white" />
              {link.label}
            </Link>
          ))}
        </div>
      ) : (
        <div className={`grid ${tileCols} gap-2`}>
          {section.links.map((link, i) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              onClick={onClose}
              className="group/link relative flex flex-col gap-2 overflow-hidden border border-sand-dark/50 bg-white px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-terracotta hover:shadow-md"
            >
              {/* Terracotta accent strip slides in from bottom on hover */}
              <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-terracotta transition-all duration-300 group-hover/link:w-full" />

              {/* Icon + index row */}
              <div className="flex items-start justify-between">
                <span className="flex h-7 w-7 items-center justify-center bg-sand transition-colors duration-300 group-hover/link:bg-navy">
                  {link.icon ? (
                    <i
                      className={`${link.icon} text-sm leading-none text-navy transition-colors duration-300 group-hover/link:text-terracotta`}
                    />
                  ) : (
                    <span className="font-heading text-[10px] font-bold text-navy/60 transition-colors duration-300 group-hover/link:text-terracotta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </span>
                <i className="ri-arrow-right-up-line text-xs text-sand-dark/70 transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-terracotta" />
              </div>

              {/* Label */}
              <span className="text-[12px] font-semibold leading-tight text-espresso transition-colors duration-300 group-hover/link:text-navy">
                {link.label}
              </span>
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
            { value: "1:1", label: "Staff ratio" },
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
 * Mobile accordion row
 * ---------------------------------------------------------------------- */

function MobileMenuRow({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: TopLevelItem;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  if (!item.sections) {
    return (
      <li>
        <Link
          href={item.href}
          onClick={onNavigate}
          className="block py-4 text-xs uppercase tracking-[0.2em] text-espresso hover:text-terracotta"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-xs uppercase tracking-[0.2em] text-espresso hover:text-terracotta"
      >
        {item.label}
        <i
          className={`ri-arrow-down-s-line text-base leading-none transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen ? (
        <div className="space-y-5 border-l border-sand-dark/60 pb-5 pl-4">
          {item.sections.map((section) => (
            <div key={section.heading}>
              {section.headingHref ? (
                <Link
                  href={section.headingHref}
                  onClick={onNavigate}
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-navy hover:text-terracotta"
                >
                  {section.heading}
                </Link>
              ) : (
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-navy">
                  {section.heading}
                </p>
              )}
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="block py-1.5 text-sm font-light text-espresso/80 hover:text-terracotta"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </li>
  );
}
