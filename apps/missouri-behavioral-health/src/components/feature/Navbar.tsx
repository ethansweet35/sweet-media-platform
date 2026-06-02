"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import {
  BRAND_NAME,
  NAV_LOGO_CLASS,
  NAV_LOGO_HEIGHT,
  NAV_LOGO_URL,
  NAV_LOGO_WIDTH,
} from "@/data/site";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";
import {
  MAIN_NAV_ITEMS,
  type NavItem,
  type NavLink,
} from "@/data/mainNavigation";

const HEADER_OFFSET_PX = 116;
/** Utility bar (1 row on mobile) + main nav */
const HEADER_OFFSET_MOBILE_PX = 116;

function NavAnchor({
  link,
  className,
  onClick,
  showArrow,
}: {
  link: NavLink;
  className?: string;
  onClick?: () => void;
  showArrow?: boolean;
}) {
  const content = (
    <>
      {showArrow ? (
        <i
          className="ri-arrow-right-s-line shrink-0 text-sm text-mbh-sage/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-mbh-sage"
          aria-hidden
        />
      ) : null}
      <span className="min-w-0 flex-1">{link.label}</span>
      {link.external ? (
        <i className="ri-external-link-line shrink-0 text-xs opacity-50" aria-hidden />
      ) : null}
    </>
  );

  if (link.external) {
    return (
      <a
        href={link.path}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={link.path} className={className} onClick={onClick}>
      {content}
    </Link>
  );
}

function MegaPanel({
  item,
  onClose,
  onEnter,
  onLeave,
}: {
  item: Extract<NavItem, { mega: object }>;
  onClose: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { mega } = item;
  const colCount = mega.columns.length;

  return (
    <div
      className="pointer-events-none fixed z-40 hidden px-4 lg:block lg:px-10"
      style={{ top: HEADER_OFFSET_PX, left: 0, right: 0 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="mx-auto flex max-w-7xl justify-end">
        <div
          className="pointer-events-auto relative w-full max-w-[min(920px,100%)] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.55)]"
          style={{
            background:
              "linear-gradient(145deg, rgba(18,46,24,0.98) 0%, rgba(30,80,39,0.94) 42%, rgba(18,46,24,0.98) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(122,170,110,0.35) 0%, transparent 55%)",
            }}
          />
          <div className="relative z-[1]">
            <div
              className={`grid ${
                colCount === 1 ? "lg:grid-cols-[1fr_300px]" : "lg:grid-cols-[1fr_1fr_300px]"
              }`}
            >
              {mega.columns.map((col) => (
                <div
                  key={col.heading}
                  className="border-b border-white/6 p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:border-white/6 lg:p-7"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-mbh-green/30 to-mbh-sage/10 ring-1 ring-mbh-sage/25">
                      <i className={`${col.icon} text-base text-mbh-sage`} aria-hidden />
                    </span>
                    <span className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage/80">
                      {col.heading}
                    </span>
                  </div>
                  <ul className="max-h-[min(50vh,400px)] space-y-1 overflow-y-auto pr-1">
                    {col.links.map((link) => (
                      <li key={`${link.path}-${link.label}`}>
                        <NavAnchor
                          link={link}
                          onClick={onClose}
                          showArrow
                          className="group flex items-center gap-2.5 rounded-xl border border-transparent px-3 py-2.5 font-body text-[13px] font-medium text-white/88 transition-all duration-200 hover:border-mbh-sage/20 hover:bg-white/[0.06] hover:text-white hover:shadow-[inset_3px_0_0_0_var(--color-mbh-sage)]"
                        />
                      </li>
                    ))}
                  </ul>
                  {item.path && mega.columns.indexOf(col) === 0 ? (
                    <Link
                      href={item.path}
                      onClick={onClose}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-mbh-sage/25 bg-mbh-sage/10 px-4 py-2 font-body text-[11px] font-semibold uppercase tracking-wider text-mbh-sage transition hover:border-mbh-sage/50 hover:bg-mbh-sage/20 hover:text-white"
                    >
                      View all {item.label}
                      <i className="ri-arrow-right-line" aria-hidden />
                    </Link>
                  ) : null}
                </div>
              ))}

              <div className="relative flex flex-col justify-between overflow-hidden bg-mbh-forest/40 p-6 lg:p-7">
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-mbh-green/20 blur-2xl"
                  aria-hidden
                />
                <div className="relative">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-mbh-green to-mbh-green-hover shadow-lg shadow-mbh-green/25">
                    <i className={`${mega.feature.icon} text-xl text-white`} aria-hidden />
                  </div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage">
                    {mega.feature.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-white">
                    {mega.feature.heading}
                  </h3>
                  <p className="mt-2.5 font-body text-[13px] leading-relaxed text-white/50">
                    {mega.feature.body}
                  </p>
                </div>
                {mega.feature.href.startsWith("http") || mega.feature.href.startsWith("tel:") ? (
                  <a
                    href={mega.feature.href}
                    onClick={onClose}
                    className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-mbh-green to-mbh-green-hover px-5 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-mbh-green/30 transition hover:brightness-110"
                  >
                    {mega.feature.cta}
                    <i className="ri-arrow-right-line" aria-hidden />
                  </a>
                ) : (
                  <Link
                    href={mega.feature.href}
                    onClick={onClose}
                    className="relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-mbh-green to-mbh-green-hover px-5 py-3 font-body text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-mbh-green/30 transition hover:brightness-110"
                  >
                    {mega.feature.cta}
                    <i className="ri-arrow-right-line" aria-hidden />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/8 bg-black/15 px-6 py-3 lg:justify-end lg:gap-x-8 lg:px-8">
              {[
                { icon: "ri-shield-check-line", label: "HIPAA-Compliant" },
                { icon: "ri-time-line", label: "24/7 Admissions" },
                { icon: "ri-award-line", label: "Insurance Accepted" },
                { icon: "ri-map-pin-2-line", label: "Statewide Virtual Care" },
              ].map((trust) => (
                <div key={trust.label} className="flex items-center gap-2">
                  <i className={`${trust.icon} text-sm text-mbh-sage/70`} aria-hidden />
                  <span className="font-body text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    {trust.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UtilityBar({ transparent }: { transparent: boolean }) {
  return (
    <div
      className={`relative overflow-hidden border-b font-body text-sm transition-colors ${
        transparent
          ? "border-white/10 bg-gradient-to-r from-mbh-forest-deep/95 via-mbh-forest/90 to-mbh-forest-deep/95 text-white backdrop-blur-md"
          : "border-mbh-forest/30 bg-gradient-to-r from-mbh-forest-deep via-mbh-forest to-mbh-forest-deep text-white"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(122,170,110,0.15) 50%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-2.5 px-4 py-2.5 max-lg:flex-nowrap lg:flex-wrap lg:gap-x-4 lg:gap-y-1.5 lg:py-2.5 lg:px-10">
        {/* Mobile: pill CTA — visual weight matches phone */}
        <Link
          href="/verify-insurance"
          className="inline-flex shrink-0 items-center rounded-full border border-mbh-sage/45 bg-white/10 px-3.5 py-2 font-body text-sm font-semibold leading-none text-white shadow-sm transition hover:border-mbh-sage hover:bg-white/15 lg:hidden"
        >
          Verify insurance
        </Link>

        {/* Desktop: full utility copy */}
        <p className="hidden items-center gap-2 font-body text-[13px] font-medium tracking-wide text-white/90 lg:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-mbh-sage shadow-[0_0_8px_rgba(122,170,110,0.8)]" />
          Start Your Recovery
          <span className="text-white/35" aria-hidden>
            |
          </span>
          <Link
            href="/verify-insurance"
            className="font-semibold text-mbh-sage underline-offset-4 transition hover:text-white hover:underline"
          >
            Verify Your Insurance
          </Link>
        </p>

        <CallRailPhoneLink className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 font-body text-xs font-semibold leading-none text-white transition hover:border-mbh-sage/40 hover:bg-white/10 max-lg:gap-2 sm:px-3 sm:py-1.5 sm:text-[12px] lg:px-3 lg:py-1.5 lg:text-[13px]">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mbh-green/90">
            <i className="ri-phone-fill text-xs text-white" aria-hidden />
          </span>
          <span className="hidden font-normal text-white/50 lg:inline">Call 24/7 —</span>
          <span className="whitespace-nowrap">{CALLRAIL_PHONE_DISPLAY}</span>
        </CallRailPhoneLink>
      </div>
    </div>
  );
}

function navTriggerClass(opts: { isActive: boolean; isOpen: boolean }) {
  const { isActive, isOpen } = opts;
  const base =
    "relative flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 xl:px-3.5 xl:text-[11px] xl:tracking-[0.14em]";

  if (isOpen) {
    return `${base} bg-mbh-green text-white shadow-md shadow-mbh-green/25`;
  }
  return `${base} ${
    isActive
      ? "bg-mbh-green/10 text-mbh-green ring-1 ring-mbh-green/20"
      : "text-mbh-forest/75 hover:bg-mbh-forest/[0.06] hover:text-mbh-forest"
  }`;
}

export default function Navbar() {
  const pathname = usePathname();
  return <NavbarInteractive key={pathname} pathname={pathname} />;
}

function NavbarInteractive({ pathname }: { pathname: string }) {
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 80);
  };

  // Authoritative close: whenever the pointer is over anything outside the
  // header (which contains the mega panel as a descendant), close instantly.
  // This covers exit paths where mouseleave doesn't fire reliably (sideways
  // off the logo, fast exits through the window edge, scroll areas, etc.).
  useEffect(() => {
    if (!openMenu) return;
    const onPointerOver = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && headerRef.current?.contains(target)) {
        cancelClose();
      } else {
        // Outside the header/panel — close immediately. Scheduling here would
        // reset on every mouseover as the pointer keeps moving over the page,
        // making the menu appear to linger until the cursor stops.
        cancelClose();
        setOpenMenu(null);
      }
    };
    document.addEventListener("mouseover", onPointerOver);
    return () => document.removeEventListener("mouseover", onPointerOver);
     
  }, [openMenu]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const transparent = isHome && !scrolled;


  return (
    <header
      ref={headerRef}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <UtilityBar transparent={transparent} />

      <div className="border-b border-mbh-forest/8 bg-white shadow-[0_4px_24px_-8px_rgba(18,46,24,0.10)]">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 max-lg:py-3.5 lg:gap-4 lg:px-10 lg:py-3.5">
          <Link
            href="/"
            className="relative z-10 flex min-w-0 flex-1 items-center max-lg:max-w-[calc(100%-3.5rem)]"
            onClick={() => setOpenMenu(null)}
          >
            {isHome ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={NAV_LOGO_URL}
                alt={BRAND_NAME}
                width={NAV_LOGO_WIDTH}
                height={NAV_LOGO_HEIGHT}
                className={NAV_LOGO_CLASS}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Image
                src={NAV_LOGO_URL}
                alt={BRAND_NAME}
                width={NAV_LOGO_WIDTH}
                height={NAV_LOGO_HEIGHT}
                className={NAV_LOGO_CLASS}
                priority
              />
            )}
          </Link>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <nav aria-label="Main navigation">
              <ul className="flex items-center justify-end gap-0.5">
                {MAIN_NAV_ITEMS.map((item) => {
                  const hasMega = "mega" in item && !!item.mega;
                  const isOpen = openMenu === item.label;
                  const isActive = item.path ? pathname.startsWith(item.path) : false;
                  const triggerClass = navTriggerClass({ isActive, isOpen });

                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => setOpenMenu(hasMega ? item.label : null)}
                    >
                      {hasMega ? (
                        <button type="button" className={triggerClass} aria-expanded={isOpen}>
                          {item.label}
                          <i
                            className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                      ) : (
                        <Link href={(item as { path: string }).path} className={triggerClass}>
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mbh-forest/10 bg-mbh-forest/[0.04] text-mbh-forest transition-all hover:bg-mbh-green/10 lg:hidden"
          >
            <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-3-line"}`} aria-hidden />
          </button>
        </div>
      </div>

      {openMenu
        ? (() => {
            const activeItem = MAIN_NAV_ITEMS.find(
              (i) => i.label === openMenu && "mega" in i && i.mega,
            );
            return activeItem ? (
              <MegaPanel
                item={activeItem as Extract<NavItem, { mega: object }>}
                onClose={() => setOpenMenu(null)}
                onEnter={cancelClose}
                onLeave={scheduleClose}
              />
            ) : null;
          })()
        : null}

      <div
        className={`fixed inset-0 z-40 flex flex-col transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{ top: HEADER_OFFSET_MOBILE_PX }}
      >
        <div
          className="border-b border-mbh-forest/10 bg-gradient-to-br from-mbh-forest-deep to-mbh-forest px-5 py-6 text-white"
        >
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.28em] text-mbh-sage">
            Navigation
          </p>
          <p className="mt-1 font-display text-xl font-semibold">How can we help?</p>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-mbh-mint/10 px-4 py-2">
          {MAIN_NAV_ITEMS.map((item) => {
            const hasMega = "mega" in item && !!item.mega;
            const isExpanded = mobileExpanded === item.label;

            return (
              <div key={item.label} className="border-b border-mbh-forest/5 last:border-0">
                <div className="flex items-center">
                  {item.path ? (
                    <Link
                      href={item.path}
                      className="flex-1 py-3.5 font-display text-[0.9375rem] font-semibold text-mbh-forest"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="flex-1 py-3.5 font-display text-[0.9375rem] font-semibold text-mbh-forest">
                      {item.label}
                    </span>
                  )}
                  {hasMega ? (
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-mbh-forest/10 bg-white transition hover:bg-mbh-mint/30"
                      aria-expanded={isExpanded}
                    >
                      <i
                        className={`ri-arrow-down-s-line text-lg text-mbh-forest/50 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        aria-hidden
                      />
                    </button>
                  ) : null}
                </div>

                {hasMega && isExpanded ? (
                  <div className="mb-3 rounded-2xl border border-mbh-forest/8 bg-white p-3 shadow-sm">
                    {(item as Extract<NavItem, { mega: object }>).mega.columns.map((col) => (
                      <div key={col.heading} className="mb-3 last:mb-0">
                        <p className="mb-2 flex items-center gap-2 px-2 font-body text-[9px] font-bold uppercase tracking-[0.28em] text-mbh-sage">
                          <i className={`${col.icon} text-sm`} aria-hidden />
                          {col.heading}
                        </p>
                        {col.links.map((link) => (
                          <NavAnchor
                            key={`${link.path}-${link.label}`}
                            link={link}
                            showArrow
                            className="group mb-0.5 flex items-center gap-2 rounded-xl px-3 py-2.5 font-body text-sm text-mbh-body transition hover:bg-mbh-mint/25 hover:text-mbh-forest"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="border-t border-mbh-forest/8 bg-white px-4 py-4 shadow-[0_-8px_32px_-8px_rgba(18,46,24,0.08)]">
          <CallRailPhoneLink className="flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-mbh-green to-mbh-green-hover py-4 font-body text-sm font-semibold text-white shadow-lg shadow-mbh-green/25">
            <i className="ri-phone-fill" aria-hidden />
            Call 24/7 — {CALLRAIL_PHONE_DISPLAY}
          </CallRailPhoneLink>
          <Link
            href="/verify-insurance"
            className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-full border border-mbh-forest/15 bg-mbh-forest/[0.03] py-3.5 font-body text-sm font-semibold text-mbh-forest"
          >
            <i className="ri-shield-check-line text-mbh-sage" aria-hidden />
            Verify your insurance
          </Link>
        </div>
      </div>
    </header>
  );
}
