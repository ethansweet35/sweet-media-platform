"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";

/** Mobile sticky bar + desktop floating call — deferred until after scroll. */
export default function MarketingScrollCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 bg-mbh-forest px-4 py-3">
          <CallRailPhoneLink className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-mbh-green py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors active:bg-mbh-green-hover">
            <i className="ri-phone-line text-sm" aria-hidden />
            Call {CALLRAIL_PHONE_DISPLAY}
          </CallRailPhoneLink>
          <Link
            href="/verify-insurance"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors active:bg-white/10"
          >
            <i className="ri-shield-check-line text-sm" aria-hidden />
            Insurance
          </Link>
        </div>
      </div>

      <div
        className={`fixed bottom-8 right-8 z-50 hidden flex-col items-end gap-3 transition-all duration-500 md:flex ${
          visible ? "opacity-100 translate-y-0" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <CallRailPhoneLink
          className="group flex cursor-pointer items-center gap-3 rounded-full bg-mbh-green py-4 pl-5 pr-6 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-mbh-forest"
          style={{ boxShadow: "0 8px 32px rgba(30, 80, 39, 0.35)" }}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/10">
            <i className="ri-phone-line text-sm" aria-hidden />
          </div>
          Call {CALLRAIL_PHONE_DISPLAY}
        </CallRailPhoneLink>
      </div>
    </>
  );
}
