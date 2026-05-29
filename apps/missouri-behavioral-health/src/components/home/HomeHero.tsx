import Link from "next/link";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY } from "@/lib/callrailPhone";
import { MBH_HERO_POSTER_URL, MBH_HERO_VIDEO_URL } from "@/lib/heroMedia";

/**
 * DESIGN CONCEPT — "Editorial Landscape Poster"
 *
 * Server-rendered so the hero video and phone CTA are in the initial HTML
 * (no client hydration delay). CallRail swap.js updates numbers after load.
 */

export default function HomeHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-mbh-forest-deep">

      {/* Background video — poster preloaded in root layout */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={MBH_HERO_POSTER_URL}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={MBH_HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Top crush: makes nav + rule legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,30,16,0.92) 0%, rgba(12,30,16,0.5) 18%, transparent 40%)",
        }}
      />
      {/* Bottom crush: deep dark base for copy + CTAs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(10,26,14,0.98) 0%, rgba(10,26,14,0.88) 22%, rgba(10,26,14,0.55) 42%, transparent 60%)",
        }}
      />
      {/* Subtle left vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10,26,14,0.45) 0%, transparent 45%)",
        }}
      />

      <div className="relative z-20 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 lg:pb-14">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-10 bg-white/40" aria-hidden />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                Mental Health & Addiction Treatment
              </span>
            </div>

            <h1
              className="font-display font-semibold leading-[0.95] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(3.25rem, 9vw, 8.5rem)" }}
            >
              Missouri
              <br />
              <span className="opacity-90">Behavioral Health.</span>
            </h1>

            <div className="my-8 h-px w-full bg-white/15" aria-hidden />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm font-body text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                Comprehensive PHP, IOP, outpatient & virtual care
                <br className="hidden sm:block" /> across Missouri — same-day admissions available.
              </p>

              <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                <CallRailPhoneLink className="inline-flex items-center justify-center gap-2.5 rounded-full bg-mbh-green px-7 py-3.5 font-body text-[13px] font-semibold text-white shadow-xl shadow-black/30 transition-all hover:bg-mbh-green-hover active:scale-[0.98]">
                  <i className="ri-phone-fill text-sm" aria-hidden />
                  Call 24/7 — {CALLRAIL_PHONE_DISPLAY}
                </CallRailPhoneLink>
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 font-body text-[13px] font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-white/55 hover:bg-white/8 active:scale-[0.98]"
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
                  <span className="font-body text-[12px] font-medium text-white/75">
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
