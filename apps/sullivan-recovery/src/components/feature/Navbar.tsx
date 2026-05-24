"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";

const LOGO_URL =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos/sr_logo.png";

type NavLink = { label: string; path: string };
type NavChild = NavLink & { children?: NavLink[] };
type NavItem = NavLink & { children?: NavChild[] };

/** Matches sullivanrecovery.com primary menu (menu-1-836932b). */
const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/our-approach/",
    children: [
      { label: "Our Team", path: "/our-approach/our-team/" },
      {
        label: "Service Areas",
        path: "/service-area/",
        children: [
          {
            label: "Detox Center Huntington Beach",
            path: "/service-area/detox-center-huntington-beach/",
          },
          {
            label: "Drug Detox Lake Forest",
            path: "/service-area/drug-detox-lake-forest/",
          },
          {
            label: "Laguna Beach Detox",
            path: "/service-area/laguna-beach-detox/",
          },
          {
            label: "Newport Beach Detox",
            path: "/service-area/newport-beach-detox/",
          },
          {
            label: "Orange County Medical Detox",
            path: "/service-area/orange-county-medical-detox/",
          },
        ],
      },
      { label: "Blogs", path: "/blogs/" },
    ],
  },
  {
    label: "Programs",
    path: "/programs/",
    children: [
      {
        label: "Wellbriety Program",
        path: "/addiction-aftercare-program/wellbriety-program/",
      },
      {
        label: "Opioid Treatment Orange County",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/",
      },
      {
        label: "Residential Treatment",
        path: "/addiction-aftercare-program/iop-treatment-mission-viejo/",
      },
      {
        label: "Addiction Aftercare Programs Near Me",
        path: "/addiction-aftercare-program/addiction-aftercare-programs-near-me/",
      },
      {
        label: "Aftercare Programs",
        path: "/addiction-aftercare-program/aftercare-programs/",
      },
      {
        label: "Addiction Therapies",
        path: "/addiction-aftercare-program/addiction-therapies/",
      },
      {
        label: "Personalized Care Drugs",
        path: "/addiction-aftercare-program/personalized-care-drugs/",
      },
    ],
  },
  {
    label: "Treatment",
    path: "/addiction-aftercare-program/",
    children: [
      {
        label: "Drug And Alcohol Detox Mission Viejo",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/drug-and-alcohol-detox-mission-viejo/",
      },
      {
        label: "Fentanyl Detox Near Me",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/fentanyl-detox-near-me/",
      },
      {
        label: "Cocaine Detox Center California",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/cocaine-detox-center-california/",
      },
      {
        label: "Opioid Detox Orange County",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/opioid-detox-orange-county/",
      },
      {
        label: "Detox Facility Orange County",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/detox-facility-orange-county/",
      },
      {
        label: "Meth Detox Mission Viejo",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/meth-detox-mission-viejo/",
      },
      {
        label: "Benzo Detox Orange County",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/benzo-detox-orange-county/",
      },
      {
        label: "Suboxone Detox Centers Near Me",
        path: "/addiction-aftercare-program/opioid-detox-orange-county/suboxone-detox-centers-near-me/",
      },
    ],
  },
  {
    label: "Admission",
    path: "#",
    children: [
      { label: "Admissions Process", path: "/admissions-process/" },
      { label: "Daily Schedule", path: "/daily-schedule/" },
      { label: "Insurance", path: "/insurance/" },
    ],
  },
  { label: "Contact Us", path: "/contact-us/" },
];

function normalizePath(path: string): string {
  if (path === "#" || path === "/") return path;
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function isPathActive(pathname: string | null, path: string): boolean {
  if (path === "#") return false;
  const target = normalizePath(path);
  const current = pathname
    ? pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname
    : "";
  if (target === "/") return current === "" || current === "/";
  return current === target || current.startsWith(`${target}/`);
}

function itemOrChildActive(pathname: string | null, item: NavItem): boolean {
  if (isPathActive(pathname, item.path)) return true;
  return (
    item.children?.some(
      (child) =>
        isPathActive(pathname, child.path) ||
        child.children?.some((grand) => isPathActive(pathname, grand.path)),
    ) ?? false
  );
}

const linkClass = (active: boolean) =>
  `text-[13px] font-light tracking-[0.05em] transition-colors ${
    active ? "text-white font-medium" : "text-white/70 hover:text-white"
  }`;

const dropdownLinkClass =
  "block whitespace-nowrap px-4 py-2.5 text-[13px] font-light tracking-[0.03em] text-white/80 transition hover:bg-white/10 hover:text-white";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openNested, setOpenNested] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileNested, setMobileNested] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileExpanded(null);
    setMobileNested(null);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSubmenu(label);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpenSubmenu(null);
      setOpenNested(null);
    }, 140);
  }

  function renderNavTrigger(item: NavItem, hasChildren: boolean) {
    const active = itemOrChildActive(pathname, item);
    const content = (
      <>
        {item.label}
        {hasChildren && (
          <i className="ri-arrow-down-s-line text-base opacity-60" aria-hidden />
        )}
      </>
    );

    if (item.path === "#") {
      return (
        <button
          type="button"
          className={`flex items-center gap-0.5 ${linkClass(active)}`}
          aria-expanded={openSubmenu === item.label}
          aria-haspopup="true"
        >
          {content}
        </button>
      );
    }

    return (
      <Link href={item.path} className={`flex items-center gap-0.5 ${linkClass(active)}`}>
        {content}
      </Link>
    );
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-[#3D3028] bg-[#1E1F1B] shadow-lg"
      }`}
    >
      <nav className="sr-container flex items-center gap-6 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src={LOGO_URL}
            alt="Sullivan Recovery"
            width={180}
            height={56}
            className="h-10 w-auto object-contain transition-all"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
        </Link>

        {/* Desktop: nav + CTA aligned right */}
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-5">
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const active = itemOrChildActive(pathname, item);

              if (!hasChildren) {
                return (
                  <Link key={item.label} href={item.path} className={linkClass(active)}>
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => openMenu(item.label)}
                  onMouseLeave={scheduleClose}
                >
                  {renderNavTrigger(item, true)}

                  {openSubmenu === item.label && (
                    <div
                      className="absolute right-0 top-full z-50 min-w-[240px] pt-2"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="border border-[#3D3028] bg-[#1E1F1B] py-1 shadow-xl">
                        {item.children!.map((child) => {
                          const nested = child.children;
                          if (nested?.length) {
                            return (
                              <div
                                key={child.path}
                                className="relative"
                                onMouseEnter={() => setOpenNested(child.label)}
                                onMouseLeave={() => setOpenNested(null)}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <Link
                                    href={child.path}
                                    className={`${dropdownLinkClass} flex-1`}
                                  >
                                    {child.label}
                                  </Link>
                                  <i
                                    className="ri-arrow-right-s-line shrink-0 pr-2 text-white/50"
                                    aria-hidden
                                  />
                                </div>
                                {openNested === child.label && (
                                  <div className="absolute left-full top-0 z-50 min-w-[280px] pl-1">
                                    <div className="border border-[#3D3028] bg-[#1E1F1B] py-1 shadow-xl">
                                      {nested.map((grand) => (
                                        <Link
                                          key={grand.path}
                                          href={grand.path}
                                          className={dropdownLinkClass}
                                        >
                                          {grand.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={child.path}
                              href={child.path}
                              className={dropdownLinkClass}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <CallRailPhoneLink
            className="inline-flex shrink-0 items-center gap-2 justify-center bg-[#D4C9B5] px-6 py-2.5 text-[13px] font-medium text-[#1E1F1B] transition hover:bg-white"
          >
            <i className="ri-phone-fill text-sm" aria-hidden />
            {CALLRAIL_PHONE_DISPLAY}
          </CallRailPhoneLink>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto flex items-center justify-center p-2 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <i className={`text-xl ${menuOpen ? "ri-close-line" : "ri-menu-line"}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#3D3028] bg-[#1E1F1B] lg:hidden">
          <div className="sr-container flex max-h-[min(80vh,640px)] flex-col gap-1 overflow-y-auto py-4">
            {navItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const expanded = mobileExpanded === item.label;

              if (!hasChildren) {
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-light tracking-[0.05em] text-white/80 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="border-b border-[#3D3028]/60 last:border-0">
                  <div className="flex items-center">
                    {item.path !== "#" ? (
                      <Link
                        href={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex-1 px-4 py-3 text-[13px] font-light tracking-[0.05em] text-white/90"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="flex-1 px-4 py-3 text-[13px] font-light tracking-[0.05em] text-white/90">
                        {item.label}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(expanded ? null : item.label)
                      }
                      className="px-4 py-3 text-white/60"
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                    >
                      <i
                        className={`text-lg ${
                          expanded ? "ri-subtract-line" : "ri-add-line"
                        }`}
                      />
                    </button>
                  </div>

                  {expanded && (
                    <div className="pb-2 pl-2">
                      {item.children!.map((child) => {
                        const nested = child.children;
                        if (nested?.length) {
                          const nestedOpen = mobileNested === child.label;
                          return (
                            <div key={child.path}>
                              <div className="flex items-center">
                                <Link
                                  href={child.path}
                                  onClick={() => setMenuOpen(false)}
                                  className="flex-1 py-2 pl-6 text-[12px] text-white/75"
                                >
                                  {child.label}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileNested(
                                      nestedOpen ? null : child.label,
                                    )
                                  }
                                  className="px-3 py-2 text-white/50"
                                  aria-label={`${nestedOpen ? "Collapse" : "Expand"} ${child.label}`}
                                >
                                  <i
                                    className={
                                      nestedOpen
                                        ? "ri-subtract-line"
                                        : "ri-add-line"
                                    }
                                  />
                                </button>
                              </div>
                              {nestedOpen && (
                                <div className="pb-1">
                                  {nested.map((grand) => (
                                    <Link
                                      key={grand.path}
                                      href={grand.path}
                                      onClick={() => setMenuOpen(false)}
                                      className="block py-2 pl-10 text-[12px] text-white/60 hover:text-white"
                                    >
                                      {grand.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 pl-6 text-[12px] text-white/70 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-3 border-t border-[#3D3028] px-4 pt-4">
              <CallRailPhoneLink
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 bg-[#D4C9B5] px-6 py-3 text-[13px] font-medium text-[#1E1F1B]"
              >
                <i className="ri-phone-fill text-sm" aria-hidden />
                {CALLRAIL_PHONE_DISPLAY}
              </CallRailPhoneLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
