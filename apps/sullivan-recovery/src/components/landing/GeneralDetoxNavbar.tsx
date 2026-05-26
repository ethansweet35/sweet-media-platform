"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { GENERAL_DETOX_NAV } from "@/lib/generalDetoxLanding";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";

const LOGO_URL =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos/sr_logo.png";

const navLinkClass = (active: boolean) =>
  `text-[13px] font-light tracking-[0.05em] transition-colors ${
    active ? "text-white font-medium" : "text-white/70 hover:text-white"
  }`;

export default function GeneralDetoxNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = GENERAL_DETOX_NAV.map((item) => item.sectionId);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const isTransparent = !scrolled;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-[#3D3028] bg-[#1E1F1B] shadow-lg"
      }`}
    >
      <nav className="sr-container flex items-center gap-6 py-4">
        <a href="#top" className="shrink-0" aria-label="Back to top of page">
          <Image
            src={LOGO_URL}
            alt="Sullivan Recovery"
            width={180}
            height={56}
            className="h-10 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
            priority
          />
        </a>

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          {GENERAL_DETOX_NAV.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              className={navLinkClass(activeSection === item.sectionId)}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {item.label}
            </a>
          ))}
          <CallRailPhoneLink className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#D4C9B5] px-5 py-2.5 text-[13px] font-medium text-[#1E1F1B] transition hover:bg-white">
            <i className="ri-phone-fill text-sm" aria-hidden />
            {CALLRAIL_PHONE_DISPLAY}
          </CallRailPhoneLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto flex items-center justify-center p-2 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <i className={`text-xl ${menuOpen ? "ri-close-line" : "ri-menu-line"}`} />
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#1E1F1B] px-6 py-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {GENERAL_DETOX_NAV.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`#${item.sectionId}`}
                  className="block text-[15px] font-light text-white/85"
                  onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="border-t border-white/10 pt-4">
              <CallRailPhoneLink className="inline-flex items-center gap-2 text-[#D4C9B5]">
                <i className="ri-phone-fill" aria-hidden />
                {CALLRAIL_PHONE_DISPLAY}
              </CallRailPhoneLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
