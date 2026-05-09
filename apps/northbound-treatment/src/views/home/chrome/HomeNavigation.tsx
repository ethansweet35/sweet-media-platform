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

/** Whether this item gets the full-width layout with a CTA sidebar card. */
function hasCta(label: string) {
  return label === "Treatment Services" || label === "Admissions";
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
      ? "lg:grid-cols-[1fr_1fr_1fr_260px]"
      : "lg:grid-cols-[1fr_1fr_260px]"
    : cols >= 3
      ? "lg:grid-cols-3"
      : cols === 2
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

      {/* Panel body */}
      <div className="border-b border-sand-dark bg-white">
        {/* Architectural corner brackets */}
        <div className="pointer-events-none absolute left-6 top-[3px] h-8 w-8 border-l border-t border-sand-dark/60" />
        <div className="pointer-events-none absolute right-6 top-[3px] h-8 w-8 border-r border-t border-sand-dark/60" />

        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
          <div className={`grid grid-cols-1 gap-10 ${gridColsClass}`}>
            {item.sections.map((section) => (
              <MegaMenuColumn
                key={section.heading}
                section={section}
                onClose={onClose}
              />
            ))}

            {showCta && <MegaMenuCta onClose={onClose} />}
          </div>
        </div>

        {/* Bottom strip: availability bar */}
        <div className="border-t border-sand-dark/60 bg-sand px-6 py-3 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-espresso/60">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta"></span>
              Admissions counselors available 24 / 7
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
  onClose,
}: {
  section: MegaSection;
  onClose: () => void;
}) {
  const twoCol = section.links.length > 8;

  return (
    <div>
      {/* Section heading — serif, with decorative line */}
      <div className="mb-5 flex items-center gap-3 border-b border-sand-dark pb-4">
        <div className="h-4 w-[2px] flex-shrink-0 bg-terracotta" />
        {section.headingHref ? (
          <Link
            href={section.headingHref}
            onClick={onClose}
            className="group flex items-center gap-1.5 font-serif text-base text-espresso transition-colors hover:text-terracotta"
          >
            {section.heading}
            <i className="ri-arrow-right-line text-xs leading-none opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </Link>
        ) : (
          <span className="font-serif text-base text-espresso">
            {section.heading}
          </span>
        )}
      </div>

      <ul
        className={
          twoCol ? "grid grid-cols-2 gap-x-6 gap-y-0.5" : "space-y-0.5"
        }
      >
        {section.links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link
              href={link.href}
              onClick={onClose}
              className="group/link flex items-center gap-2 py-1.5 text-sm font-light text-espresso/75 transition-all duration-200 hover:text-terracotta"
            >
              <i className="ri-arrow-right-s-line text-xs leading-none text-sand-dark transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:text-terracotta" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Espresso CTA card that appears as the rightmost column on big menus. */
function MegaMenuCta({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative overflow-hidden bg-espresso p-8">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy/30" />
      <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-terracotta/20" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-terracotta">
            Available 24 / 7
          </span>
        </div>

        <h3 className="mb-2 font-serif text-xl text-sand-light">
          Ready to start?
        </h3>
        <p className="mb-6 text-xs font-light leading-relaxed text-sand-dark">
          Speak with an admissions counselor today. Your call is completely
          confidential.
        </p>

        <a
          href="tel:8663110003"
          onClick={onClose}
          className="mb-3 flex items-center gap-2 bg-terracotta px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-terracotta-light"
        >
          <i className="ri-phone-line text-sm leading-none" />
          (866) 311-0003
        </a>

        <a
          href="/admissions"
          onClick={onClose}
          className="flex items-center gap-2 border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-sand-light transition-colors hover:border-white/50 hover:bg-white/5"
        >
          <i className="ri-file-list-line text-sm leading-none" />
          Start Online Intake
        </a>

        <div className="mt-6 border-t border-white/10 pt-4">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-sand-dark">
            DHCS License
          </p>
          <p className="text-[10px] font-light text-sand-dark/70">
            #300661CP — State Licensed Facility
          </p>
        </div>
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
