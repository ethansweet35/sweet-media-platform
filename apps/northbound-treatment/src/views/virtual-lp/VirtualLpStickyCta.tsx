"use client";

import { useEffect, useState } from "react";
import { ADMISSIONS_PHONE, VERIFY_INSURANCE_HREF } from "./content";

export default function VirtualLpStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-navy/95 backdrop-blur-md transition-transform duration-500 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <div className="flex items-stretch gap-2 px-3 py-3">
          <a
            href={VERIFY_INSURANCE_HREF}
            className="flex flex-1 items-center justify-center gap-2 bg-terracotta py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition active:bg-terracotta-light"
          >
            <i className="ri-shield-check-line text-sm" />
            Verify Insurance
          </a>
          <a
            href={ADMISSIONS_PHONE}
            className="flex flex-1 items-center justify-center gap-2 border border-white/30 py-3.5 text-xs font-semibold uppercase tracking-wide text-white transition active:bg-white/10"
          >
            <i className="ri-phone-line text-sm" />
            Admissions
          </a>
        </div>
      </div>

      <div
        className={`fixed bottom-8 left-1/2 z-[60] hidden -translate-x-1/2 transition-all duration-500 md:flex ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-hidden={!visible}
      >
        <div className="flex items-center gap-1 border border-white/15 bg-navy/95 p-1.5 shadow-2xl backdrop-blur-md">
          <a
            href={VERIFY_INSURANCE_HREF}
            className="inline-flex items-center gap-2 bg-terracotta px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
          >
            <i className="ri-shield-check-line" />
            Verify Insurance
          </a>
          <a
            href={ADMISSIONS_PHONE}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <i className="ri-phone-line" />
            Speak With Admissions
          </a>
        </div>
      </div>
    </>
  );
}
