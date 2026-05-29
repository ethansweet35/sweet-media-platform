"use client";

import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

/**
 * DESIGN CONCEPT — "Editorial Landscape Poster"
 *
 * Inspired by Exo Ape, BelArosa Chalet, Kobu:
 * The hero is NOT "text on a photo" — it is an architectural composition
 * where oversized typography and the landscape coexist as equals.
 *
 * Structure:
 *  Top band   → Thin horizontal rule + two flanking metadata labels
 *  Center     → Hero landscape filling the middle viewport band
 *  Over photo → Giant stacked headline — two lines, white, tight leading
 *               FIRST line sits ABOVE the photo edge (dark bg)
 *               SECOND line anchors at photo bottom edge (with overlay)
 *  Bottom     → Dark forest band with sub-copy, CTAs, trust strip
 *
 * Color on hero: forest-dark + white ONLY. No green accents.
 * The single accent color appears only in the CTA button.
 */

const VIDEO_URL =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/videos/mbh_hero_bg.mp4";

const LANDSCAPE_FALLBACK =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/mbh_hero_landscape.png";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-mbh-forest-deep">

      {/* ── Background video — fills the full hero ──────────────────────── */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        poster={LANDSCAPE_FALLBACK}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* ── Gradient system — dark at top + bottom, window of clarity center ── */}
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
      {/* Subtle left vignette — keeps left-anchored text legible in sky region */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(10,26,14,0.45) 0%, transparent 45%)",
        }}
      />

      {/* ── Content stack ─────────────────────────────────────────────────── */}
      <div className="relative z-20 flex flex-1 flex-col">

        {/* HERO COPY — pinned near bottom, editorial poster style */}
        <div className="flex flex-1 flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 lg:pb-14">

            {/* Eyebrow — just a thin rule + label, no dot */}
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-10 bg-white/40" aria-hidden />
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                Mental Health & Addiction Treatment
              </span>
            </div>

            {/* The headline — enormous, tight, pure white, no color accent */}
            <h1
              className="font-display font-semibold leading-[0.95] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(3.25rem, 9vw, 8.5rem)" }}
            >
              Missouri
              <br />
              <span className="opacity-90">Behavioral Health.</span>
            </h1>

            {/* Horizontal divider rule */}
            <div className="my-8 h-px w-full bg-white/15" aria-hidden />

            {/* Bottom row: sub-copy left, CTAs right */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-sm font-body text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                Comprehensive PHP, IOP, outpatient & virtual care
                <br className="hidden sm:block" /> across Missouri — same-day admissions available.
              </p>

              <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-mbh-green px-7 py-3.5 font-body text-[13px] font-semibold text-white shadow-xl shadow-black/30 transition-all hover:bg-mbh-green-hover active:scale-[0.98]"
                >
                  <i className="ri-phone-fill text-sm" aria-hidden />
                  Call 24/7 — {PHONE_DISPLAY}
                </a>
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

        {/* TRUST BAR — frosted strip at the very bottom */}
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
