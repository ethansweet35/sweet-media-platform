'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  mainNavItems,
  aboutDropdownItems,
  servicesDropdownItems,
  eventsDropdownItems,
  contactDropdownItems,
  SOCIAL_LINKS as socialLinks,
  LOGO_SRC,
} from "@/lib/tfrf-nav";

type DropdownKey = "about" | "services" | "events" | "contact";

const DROPDOWN_ITEMS: Record<DropdownKey, readonly { label: string; href: string }[]> = {
  about: aboutDropdownItems,
  services: servicesDropdownItems,
  events: eventsDropdownItems,
  contact: contactDropdownItems,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<DropdownKey | null>(null);
  const dropdownRefs = useRef<Partial<Record<DropdownKey, HTMLDivElement | null>>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!openDropdown) return;
      const ref = dropdownRefs.current[openDropdown];
      if (ref && !ref.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openDropdown]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileOpenDropdown(null);
  }, []);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const openOnHover = (key: DropdownKey) => {
    setOpenDropdown(key);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-4 md:top-5 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 z-50 transition-all duration-300 rounded-full",
          scrolled
            ? "bg-pure-white/95 backdrop-blur-md shadow-lg shadow-black/5 border border-slate/10"
            : "bg-pure-white/95 backdrop-blur-md shadow-md shadow-black/8 border border-pure-white/40",
        )}
      >
        <div className="flex items-center justify-between h-16 md:h-[72px] lg:h-[84px] px-6 md:px-10 lg:px-12">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={LOGO_SRC}
              alt="The Family Recovery Foundation"
              className="h-11 md:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown && item.dropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleDropdown(item.dropdown as DropdownKey)}
                        onMouseEnter={() => openOnHover(item.dropdown as DropdownKey)}
                        className={cn(
                          "relative px-3 py-2 text-[15px] font-body font-medium transition-colors duration-200 whitespace-nowrap rounded-full hover:bg-mist/50 flex items-center gap-1 cursor-pointer",
                          openDropdown === item.dropdown
                            ? "text-tfrf-blue"
                            : "text-deep-navy hover:text-tfrf-blue",
                        )}
                      >
                        {item.label}
                        <i
                          className={cn(
                            "ri-arrow-down-s-line w-4 h-4 flex items-center justify-center text-base transition-transform duration-200",
                            openDropdown === item.dropdown && "rotate-180",
                          )}
                        />
                      </button>
                      <div
                        ref={(el) => {
                          dropdownRefs.current[item.dropdown as DropdownKey] = el;
                        }}
                        className={cn(
                          "absolute top-full left-0 mt-2 w-56 bg-pure-white rounded-xl border border-mist/60 shadow-lg shadow-black/5 overflow-hidden transition-all duration-200",
                          openDropdown === item.dropdown
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-1 pointer-events-none",
                        )}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {DROPDOWN_ITEMS[item.dropdown as DropdownKey].map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-3 text-[14px] font-body text-deep-navy hover:text-tfrf-blue hover:bg-powder-blue/30 transition-colors duration-150"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative px-3 py-2 text-[15px] font-body font-medium text-deep-navy hover:text-tfrf-blue transition-colors duration-200 whitespace-nowrap rounded-full hover:bg-mist/50"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate/20">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-full hover:bg-mist/50 transition-colors duration-200",
                    social.color,
                  )}
                >
                  <i className={`${social.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-deep-navy cursor-pointer"
            aria-label="Open menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className="block h-[2px] w-full bg-current" />
              <span className="block h-[2px] w-4 bg-current" />
              <span className="block h-[2px] w-full bg-current" />
            </div>
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-soft-white transition-transform duration-500 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="h-full flex flex-col px-8 py-6">
          <div className="flex items-center justify-between mb-16">
            <Link href="/" onClick={closeMobile} className="inline-block">
              <img
                src={LOGO_SRC}
                alt="The Family Recovery Foundation"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={closeMobile}
              className="p-2 text-deep-navy cursor-pointer"
              aria-label="Close menu"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center text-xl" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {mainNavItems.map((item) =>
              item.hasDropdown && item.dropdown ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileOpenDropdown((current) =>
                        current === item.dropdown ? null : (item.dropdown as DropdownKey),
                      )
                    }
                    className="w-full text-left text-display-s font-display text-deep-navy hover:text-tfrf-blue transition-colors duration-200 px-2 py-2 flex items-center justify-between cursor-pointer"
                  >
                    {item.label}
                    <i
                      className={cn(
                        "ri-arrow-down-s-line w-6 h-6 flex items-center justify-center text-xl transition-transform duration-200",
                        mobileOpenDropdown === item.dropdown && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      mobileOpenDropdown === item.dropdown ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    <div className="pl-4 flex flex-col gap-1 py-1">
                      {DROPDOWN_ITEMS[item.dropdown as DropdownKey].map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={closeMobile}
                          className="text-body-l font-body text-slate hover:text-tfrf-blue transition-colors duration-200 px-2 py-2"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobile}
                  className="text-display-s font-display text-deep-navy hover:text-tfrf-blue transition-colors duration-200 px-2 py-2"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>

          <div className="mt-auto pb-8">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full hover:bg-mist transition-colors duration-200",
                    social.color,
                  )}
                >
                  <i className={`${social.icon} w-6 h-6 flex items-center justify-center text-xl`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
