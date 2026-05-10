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

  const gridColsClass = showCta
    ? cols >= 3
      ? "lg:grid-cols-[1fr_1fr_1fr_240px]"
      : cols >= 2
        ? "lg:grid-cols-[1fr_1fr_240px]"
        : "lg:grid-cols-[1fr_240px]"
    : cols >= 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-1 max-w-sm";

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

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
          <div className={`grid grid-cols-1 gap-10 ${gridColsClass}`}>
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
  // Insurance column: compact pill grid (4 cols)
  const isInsurance = section.heading === "Verify Insurance";
  // Long lists get 2-col grid
  const twoCol = !isInsurance && section.links.length > 8;
  const sectionNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="relative flex flex-col">
      {/* ── Editorial section header ── */}
      <div className="relative mb-5">
        {/* Eyebrow row: roman section number + italic descriptor */}
        <div className="mb-3 flex items-center gap-3">
          <span className="font-heading text-base italic text-terracotta">
            {sectionNumber} <span className="text-espresso/30">/</span>
          </span>
          <span className="h-[1px] flex-1 bg-gradient-to-r from-terracotta/60 via-sand-dark to-transparent" />
          {section.icon && (
            <i className={`${section.icon} text-base leading-none text-navy/40`} />
          )}
        </div>

        {/* Heading */}
        {section.headingHref ? (
          <Link
            href={section.headingHref}
            onClick={onClose}
            className="group/heading inline-flex items-baseline gap-2 transition-colors"
          >
            <h4 className="font-heading text-xl font-bold leading-tight text-navy transition-colors group-hover/heading:text-terracotta lg:text-2xl">
              {section.heading}
            </h4>
            <i className="ri-arrow-right-up-line text-base text-navy/30 transition-all group-hover/heading:-translate-y-0.5 group-hover/heading:translate-x-0.5 group-hover/heading:text-terracotta" />
          </Link>
        ) : (
          <h4 className="font-heading text-xl font-bold leading-tight text-navy lg:text-2xl">
            {section.heading}
          </h4>
        )}

        {section.description && (
          <p className="mt-2 max-w-[28ch] text-[11px] leading-relaxed text-espresso/55">
            {section.description}
          </p>
        )}
      </div>

      {/* ── Links ── */}
      {isInsurance ? (
        /* Insurance: 2-col pill grid */
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
        <ul className={twoCol ? "grid grid-cols-2 gap-x-3 gap-y-0" : "space-y-0"}>
          {section.links.map((link, i) => (
            <li key={`${link.label}-${link.href}`}>
              <Link
                href={link.href}
                onClick={onClose}
                className="group/link relative flex items-center gap-3 border-l-2 border-transparent py-2 pl-3 pr-2 text-sm text-espresso/75 transition-all duration-200 hover:border-terracotta hover:bg-sand/60 hover:text-navy"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-sand-dark/50 bg-sand-light transition-all duration-200 group-hover/link:border-terracotta/40 group-hover/link:bg-white">
                  {link.icon ? (
                    <i
                      className={`${link.icon} text-sm leading-none text-navy/70 transition-colors group-hover/link:text-terracotta`}
                    />
                  ) : (
                    <span className="font-heading text-[10px] font-bold text-navy/40 transition-colors group-hover/link:text-terracotta">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </span>
                <span className="flex-1 font-medium leading-snug">{link.label}</span>
                <i className="ri-arrow-right-line shrink-0 text-xs text-sand-dark opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-terracotta group-hover/link:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
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
