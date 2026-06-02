import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import DeferredHeroVideo from "@/components/home/DeferredHeroVideo";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";
import {
  MBH_HERO_POSTER_DESKTOP_URL,
  MBH_HERO_POSTER_MOBILE_AVIF_URL,
  MBH_HERO_POSTER_MOBILE_URL,
  MBH_HERO_VIDEO_DESKTOP,
  MBH_HERO_VIDEO_MOBILE,
} from "@/lib/heroMedia";

const HERO_POSTER_ALT =
  "Missouri Behavioral Health campus and surrounding Missouri landscape at dusk";

const SYSTEM_FONT = 'system-ui, -apple-system, "Segoe UI", sans-serif';

/**
 * Server-rendered hero: same-origin AVIF poster is LCP; video desktop-only after idle.
 */
export default function HomeHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-mbh-forest-deep">
      <div className="absolute inset-0 z-0 bg-mbh-forest-deep">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={MBH_HERO_POSTER_MOBILE_AVIF_URL}
            type="image/avif"
          />
          <source
            media="(max-width: 767px)"
            srcSet={MBH_HERO_POSTER_MOBILE_URL}
            type="image/webp"
          />
          <source media="(min-width: 768px)" srcSet={MBH_HERO_POSTER_DESKTOP_URL} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            data-hero-poster
            src={MBH_HERO_POSTER_MOBILE_URL}
            alt={HERO_POSTER_ALT}
            fetchPriority="high"
            decoding="sync"
            loading="eager"
            width={480}
            height={270}
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </picture>
        <DeferredHeroVideo
          mobileSrc={MBH_HERO_VIDEO_MOBILE}
          desktopSrc={MBH_HERO_VIDEO_DESKTOP}
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,30,16,0.92) 0%, rgba(12,30,16,0.5) 18%, transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10,26,14,0.98) 0%, rgba(10,26,14,0.88) 22%, rgba(10,26,14,0.55) 42%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10,26,14,0.45) 0%, transparent 45%)",
        }}
      />

      <div className="relative z-20 flex min-h-svh w-full flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 lg:pb-14">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-10 bg-white/40" aria-hidden />
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60"
                style={{ fontFamily: SYSTEM_FONT }}
              >
                Mental Health & Addiction Treatment
              </span>
            </div>

            <h1
              className="font-semibold leading-[0.95] tracking-[-0.03em] text-white max-md:text-[2.75rem] md:text-[clamp(3.25rem,8vw,8.5rem)]"
              style={{ fontFamily: SYSTEM_FONT }}
            >
              Missouri
              <br />
              <span className="opacity-90">Behavioral Health.</span>
            </h1>

            <div className="my-8 h-px w-full bg-white/15" aria-hidden />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p
                className="max-w-sm text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]"
                style={{ fontFamily: SYSTEM_FONT }}
              >
                Comprehensive PHP, IOP, outpatient & virtual care
                <br className="hidden sm:block" /> across Missouri — same-day admissions available.
              </p>

              <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                <CallRailPhoneLink className="inline-flex items-center justify-center gap-2.5 rounded-full bg-mbh-green px-7 py-3.5 text-[13px] font-semibold text-white shadow-xl shadow-black/30 transition-all hover:bg-mbh-green-hover active:scale-[0.98]">
                  <i className="ri-phone-fill text-sm" aria-hidden />
                  Call 24/7 — {CALLRAIL_PHONE_DISPLAY}
                </CallRailPhoneLink>
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[13px] font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-white/55 hover:bg-white/8 active:scale-[0.98]"
                >
                  Verify insurance
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 bg-mbh-forest-deep/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-6 py-4 sm:flex-row sm:items-center sm:gap-0 lg:px-10">
            {[
              { icon: "ri-shield-check-line", label: "HIPAA-Compliant" },
              { icon: "ri-time-line", label: "Same-Day Admissions" },
              { icon: "ri-award-line", label: "Private Insurance Accepted" },
              { icon: "ri-map-pin-2-line", label: "Statewide Virtual Care" },
            ].map((item, i, arr) => (
              <div key={item.label} className="flex items-center">
                <div className="flex items-center gap-2 px-0 sm:px-5 lg:px-7">
                  <i className={`${item.icon} text-mbh-sage text-sm`} aria-hidden />
                  <span
                    className="text-[12px] font-medium text-white/75"
                    style={{ fontFamily: SYSTEM_FONT }}
                  >
                    {item.label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
