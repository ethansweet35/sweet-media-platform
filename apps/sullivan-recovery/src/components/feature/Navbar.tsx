"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import NavMegaMenu from "@/components/feature/NavMegaMenu";
import {
  getMobileNavGroups,
  NAV_ITEMS,
  navItemIsActive,
  type NavItem,
} from "@/data/navigation";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";

const LOGO_URL =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos/sr_logo.png";

function navLinkClass(active: boolean, onHomeHero: boolean) {
  if (onHomeHero) {
    return `flex items-center gap-1 text-[13px] font-light tracking-[0.05em] transition-colors ${
      active ? "text-white font-medium" : "text-white/80 hover:text-white"
    }`;
  }
  return `flex items-center gap-1 text-[13px] font-light tracking-[0.05em] transition-colors ${
    active ? "text-white font-medium" : "text-white/70 hover:text-white"
  }`;
}

export default function Navbar() {
  const pathname = usePathname();
  return <NavbarInteractive key={pathname ?? ''} pathname={pathname ?? ''} />;
}

function NavbarInteractive({ pathname }: { pathname: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const onHomeHero = isHome && !scrolled;

  function renderDesktopItem(item: NavItem) {
    const hasMega = !!item.mega;
    const active = navItemIsActive(pathname, item);
    const isOpen = openMega === item.label;

    if (!hasMega) {
      return (
        <Link key={item.label} href={item.path} className={navLinkClass(active, onHomeHero)}>
          {item.label}
        </Link>
      );
    }

    return (
      <div
        key={item.label}
        className="relative"
        onMouseEnter={() => setOpenMega(item.label)}
      >
        <Link href={item.path} className={navLinkClass(active || isOpen, onHomeHero)}>
          {item.label}
          <i
            className={`ri-arrow-down-s-line text-base opacity-60 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </Link>
      </div>
    );
  }

  const activeMegaItem = NAV_ITEMS.find((i) => i.label === openMega && i.mega);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        onHomeHero
          ? "border-b border-white/10 bg-[#1E1F1B]/88 backdrop-blur-md"
          : "border-b border-[#3D3028] bg-[#1E1F1B] shadow-lg"
      }`}
      onMouseLeave={() => setOpenMega(null)}
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
            priority={!isHome}
          />
        </Link>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-5">{NAV_ITEMS.map(renderDesktopItem)}</div>

          <CallRailPhoneLink className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#D4C9B5] px-6 py-2.5 text-[13px] font-medium text-[#1E1F1B] transition hover:bg-white">
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

      {activeMegaItem?.mega ? (
        <div onMouseEnter={() => setOpenMega(activeMegaItem.label)}>
          <NavMegaMenu
            config={activeMegaItem.mega}
            onClose={() => setOpenMega(null)}
          />
        </div>
      ) : null}

      {menuOpen ? (
        <div className="max-h-[min(85vh,720px)] overflow-y-auto border-t border-[#3D3028] bg-[var(--sr-parchment)] lg:hidden">
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, var(--sr-moss) 0%, var(--sr-fern) 45%, var(--sr-sage) 100%)",
            }}
          />
          <div className="sr-container flex flex-col gap-0 py-4">
            {NAV_ITEMS.map((item) => {
              const mobileGroup = getMobileNavGroups(item);
              const expanded = mobileExpanded === item.label;
              const active = navItemIsActive(pathname, item);

              if (!mobileGroup) {
                return (
                  <Link
                    key={item.label}
                    href={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`border-b border-[var(--sr-sand)] px-2 py-4 text-[13px] font-light tracking-[0.05em] ${
                      active ? "text-[var(--sr-moss)]" : "text-[var(--sr-ink)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="border-b border-[var(--sr-sand)]">
                  <div className="flex items-center">
                    <Link
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex-1 px-2 py-4 text-[13px] font-light tracking-[0.05em] ${
                        active ? "font-medium text-[var(--sr-moss)]" : "text-[var(--sr-ink)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(expanded ? null : item.label)}
                      className="px-3 py-4 text-[var(--sr-muted)]"
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label}`}
                    >
                      <i
                        className={`text-lg ${
                          expanded ? "ri-subtract-line" : "ri-add-line"
                        }`}
                      />
                    </button>
                  </div>

                  {expanded && item.mega ? (
                    <div className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)]/60 px-3 pb-4">
                      <p
                        className="py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--sr-fern)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {item.mega.eyebrow}
                      </p>
                      {mobileGroup.sections?.map((section) => (
                        <div key={section.heading} className="mb-3">
                          <p
                            className="mb-2 px-1 text-[10px] uppercase tracking-[0.14em] text-[var(--sr-muted)]"
                            style={{ fontFamily: "var(--font-dm-sans)" }}
                          >
                            {section.heading}
                          </p>
                          {section.links.map((link) => (
                            <Link
                              key={link.path}
                              href={link.path}
                              onClick={() => setMenuOpen(false)}
                              className="mb-1.5 flex items-center justify-between gap-2 rounded-md border border-[var(--sr-sand)] bg-white px-3 py-2.5 text-[13px] text-[var(--sr-ink)] hover:border-[var(--sr-fern)]/50"
                              style={{ fontFamily: "var(--font-dm-sans)" }}
                            >
                              {link.label}
                              <i
                                className="ri-arrow-right-line text-sm text-[var(--sr-fern)]"
                                aria-hidden
                              />
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div className="mt-4 px-2 pt-2">
              <CallRailPhoneLink
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 bg-[var(--sr-moss)] px-6 py-3.5 text-[13px] font-medium text-[var(--sr-parchment)]"
              >
                <i className="ri-phone-fill text-sm" aria-hidden />
                {CALLRAIL_PHONE_DISPLAY}
              </CallRailPhoneLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
