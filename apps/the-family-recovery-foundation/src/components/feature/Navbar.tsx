'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  mainNavItems,
  aboutDropdownItems,
  servicesDropdownItems,
  eventsDropdownItems,
  SOCIAL_LINKS as socialLinks,
  LOGO_SRC,
} from "@/lib/tfrf-nav";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (eventsRef.current && !eventsRef.current.contains(e.target as Node)) {
        setEventsOpen(false);
      }
    }
    if (aboutOpen || servicesOpen || eventsOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [aboutOpen, servicesOpen, eventsOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAboutOpen(false);
    setMobileServicesOpen(false);
    setMobileEventsOpen(false);
  }, []);

  return (
    <>
      {/* Floating pill — sits over the home hero; other pages use layout top padding */}
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

          {/* Desktop Nav + Social — right aligned */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Nav links */}
            <div className="flex items-center gap-1">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => {
                          if (item.label === "About") {
                            setAboutOpen((v) => !v);
                            setServicesOpen(false);
                            setEventsOpen(false);
                          } else if (item.label === "Our Services") {
                            setServicesOpen((v) => !v);
                            setAboutOpen(false);
                            setEventsOpen(false);
                          } else {
                            setEventsOpen((v) => !v);
                            setAboutOpen(false);
                            setServicesOpen(false);
                          }
                        }}
                        onMouseEnter={() => {
                          if (item.label === "About") {
                            setAboutOpen(true);
                            setServicesOpen(false);
                            setEventsOpen(false);
                          } else if (item.label === "Our Services") {
                            setServicesOpen(true);
                            setAboutOpen(false);
                            setEventsOpen(false);
                          } else {
                            setEventsOpen(true);
                            setAboutOpen(false);
                            setServicesOpen(false);
                          }
                        }}
                        className={cn(
                          "relative px-3 py-2 text-[15px] font-body font-medium transition-colors duration-200 whitespace-nowrap rounded-full hover:bg-mist/50 flex items-center gap-1 cursor-pointer",
                          (item.label === "About" && aboutOpen) ||
                            (item.label === "Our Services" && servicesOpen) ||
                            (item.label === "Events" && eventsOpen)
                            ? "text-tfrf-blue"
                            : "text-deep-navy hover:text-tfrf-blue",
                        )}
                      >
                        {item.label}
                        <i
                          className={cn(
                            "ri-arrow-down-s-line w-4 h-4 flex items-center justify-center text-base transition-transform duration-200",
                            ((item.label === "About" && aboutOpen) ||
                              (item.label === "Our Services" && servicesOpen) ||
                              (item.label === "Events" && eventsOpen)) &&
                              "rotate-180",
                          )}
                        />
                      </button>

                      {/* About Dropdown */}
                      {item.label === "About" && (
                        <div
                          ref={aboutRef}
                          className={cn(
                            "absolute top-full left-0 mt-2 w-56 bg-pure-white rounded-xl border border-mist/60 shadow-lg shadow-black/5 overflow-hidden transition-all duration-200",
                            aboutOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-1 pointer-events-none"
                          )}
                          onMouseLeave={() => setAboutOpen(false)}
                        >
                          {aboutDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setAboutOpen(false)}
                              className="block px-4 py-3 text-[14px] font-body text-deep-navy hover:text-tfrf-blue hover:bg-powder-blue/30 transition-colors duration-150"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Services Dropdown */}
                      {item.label === "Our Services" && (
                        <div
                          ref={servicesRef}
                          className={cn(
                            "absolute top-full left-0 mt-2 w-56 bg-pure-white rounded-xl border border-mist/60 shadow-lg shadow-black/5 overflow-hidden transition-all duration-200",
                            servicesOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-1 pointer-events-none"
                          )}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {servicesDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setServicesOpen(false)}
                              className="block px-4 py-3 text-[14px] font-body text-deep-navy hover:text-tfrf-blue hover:bg-powder-blue/30 transition-colors duration-150"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* Events Dropdown */}
                      {item.label === "Events" && (
                        <div
                          ref={eventsRef}
                          className={cn(
                            "absolute top-full left-0 mt-2 w-56 bg-pure-white rounded-xl border border-mist/60 shadow-lg shadow-black/5 overflow-hidden transition-all duration-200",
                            eventsOpen
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 -translate-y-1 pointer-events-none"
                          )}
                          onMouseLeave={() => setEventsOpen(false)}
                        >
                          {eventsDropdownItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setEventsOpen(false)}
                              className="block px-4 py-3 text-[14px] font-body text-deep-navy hover:text-tfrf-blue hover:bg-powder-blue/30 transition-colors duration-150"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
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

            {/* Social icons */}
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

          {/* Mobile hamburger */}
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

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-soft-white transition-transform duration-500 ease-in-out lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
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
            {/* About with mobile dropdown */}
            <div>
              <button
                onClick={() => setMobileAboutOpen((v) => !v)}
                className="w-full text-left text-display-s font-display text-deep-navy hover:text-tfrf-blue transition-colors duration-200 px-2 py-2 flex items-center justify-between cursor-pointer"
              >
                About
                <i className={cn(
                  "ri-arrow-down-s-line w-6 h-6 flex items-center justify-center text-xl transition-transform duration-200",
                  mobileAboutOpen && "rotate-180"
                )} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  mobileAboutOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="pl-4 flex flex-col gap-1 py-1">
                  {aboutDropdownItems.map((sub) => (
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

            {/* Services with mobile dropdown */}
            <div>
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="w-full text-left text-display-s font-display text-deep-navy hover:text-tfrf-blue transition-colors duration-200 px-2 py-2 flex items-center justify-between cursor-pointer"
              >
                Our Services
                <i className={cn(
                  "ri-arrow-down-s-line w-6 h-6 flex items-center justify-center text-xl transition-transform duration-200",
                  mobileServicesOpen && "rotate-180"
                )} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  mobileServicesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="pl-4 flex flex-col gap-1 py-1">
                  {servicesDropdownItems.map((sub) => (
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

            {/* Events with mobile dropdown */}
            <div>
              <button
                onClick={() => setMobileEventsOpen((v) => !v)}
                className="w-full text-left text-display-s font-display text-deep-navy hover:text-tfrf-blue transition-colors duration-200 px-2 py-2 flex items-center justify-between cursor-pointer"
              >
                Events
                <i className={cn(
                  "ri-arrow-down-s-line w-6 h-6 flex items-center justify-center text-xl transition-transform duration-200",
                  mobileEventsOpen && "rotate-180"
                )} />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  mobileEventsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="pl-4 flex flex-col gap-1 py-1">
                  {eventsDropdownItems.map((sub) => (
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

            {/* Other nav items */}
            {mainNavItems.filter((i) => !i.hasDropdown).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobile}
                className="text-display-s font-display text-deep-navy hover:text-tfrf-blue transition-colors duration-200 px-2 py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile social icons */}
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
                    social.color
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