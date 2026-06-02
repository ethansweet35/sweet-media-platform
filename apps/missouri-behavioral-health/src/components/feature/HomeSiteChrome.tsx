import Link from "next/link";
import {
  BRAND_NAME,
  NAV_LOGO_CLASS,
  NAV_LOGO_HEIGHT,
  NAV_LOGO_URL,
  NAV_LOGO_WIDTH,
} from "@/data/site";
import { CALLRAIL_PHONE_DISPLAY, CALLRAIL_PHONE_HREF } from "@/lib/callrailPhone";

/**
 * Minimal server-rendered chrome for `/` — no client Navbar bundle on the LCP path.
 */
export default function HomeSiteChrome() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="border-b border-white/10 bg-gradient-to-r from-mbh-forest-deep/95 via-mbh-forest/90 to-mbh-forest-deep/95 font-[system-ui,sans-serif] text-sm text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 lg:px-10">
          <Link
            href="/verify-insurance"
            className="hidden rounded-full border border-mbh-sage/45 bg-white/10 px-3.5 py-2 text-[13px] font-semibold text-white lg:inline-flex"
          >
            Verify insurance
          </Link>
          <a
            href={CALLRAIL_PHONE_HREF}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white"
            suppressHydrationWarning
          >
            <span className="hidden text-white/50 lg:inline">Call 24/7 —</span>
            {CALLRAIL_PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div className="border-b border-mbh-forest/8 bg-white/95 shadow-[0_4px_24px_-8px_rgba(18,46,24,0.10)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-10">
          <Link href="/" className="flex min-w-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NAV_LOGO_URL}
              alt={BRAND_NAME}
              width={NAV_LOGO_WIDTH}
              height={NAV_LOGO_HEIGHT}
              className={NAV_LOGO_CLASS}
              decoding="async"
              fetchPriority="low"
            />
          </Link>
          <nav aria-label="Quick links" className="flex items-center gap-2">
            <Link
              href="/admissions"
              className="hidden rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-mbh-forest/80 hover:bg-mbh-forest/5 sm:inline-flex"
            >
              Admissions
            </Link>
            <Link
              href="/verify-insurance"
              className="rounded-full bg-mbh-green px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white hover:bg-mbh-green-hover"
            >
              Insurance
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
