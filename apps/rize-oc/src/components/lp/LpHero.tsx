"use client";

import Image from "next/image";
import InsuranceForm from "@/views/home/components/InsuranceForm";
import CinematicHeroSection from "@/components/ui/CinematicHeroSection";
import { PAGE_GRID } from "@/components/ui/PageHeroShell";

const PHONE_DISPLAY = "(949) 461-2620";
const PHONE_HREF    = "tel:9494612620";
const HERO_IMG      = "https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images/rize_home_hero01.jpg";

const TRUST_BADGES = [
  { icon: "ri-checkbox-circle-line", label: "Joint Commission Accredited" },
  { icon: "ri-checkbox-circle-line", label: "Insurance Accepted" },
  { icon: "ri-checkbox-circle-line", label: "24/7 Admissions" },
];

interface LpHeroProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
}

export default function LpHero({
  headline,
  subheadline = "Safe, medically-supervised care in a premium coastal sanctuary. We accept most major insurances. Call 24/7 for a confidential assessment.",
  eyebrow,
  stat,
  statLabel,
}: LpHeroProps) {
  return (
    <CinematicHeroSection
      minHeight="min-h-[min(720px,90dvh)]"
      contentClassName="justify-center"
      media={
        <>
          <Image
            src={HERO_IMG}
            alt="Rize OC treatment facility"
            fill
            className="object-cover object-center opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/30" />
        </>
      }
    >
      <div className={`${PAGE_GRID} py-20 lg:py-28 grid lg:grid-cols-[1fr_400px] items-center gap-10 lg:gap-14`}>

        {/* Left — content */}
        <div className="flex flex-col justify-center">

          {/* Eyebrow — only rendered when explicitly passed */}
          {eyebrow && (
            <div className="flex items-center gap-2 mb-5">
              <div className="border border-white/20 px-4 py-1.5 flex items-center gap-2.5 bg-white/5 backdrop-blur-sm">
                <i className="ri-star-fill text-accent text-xs" />
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white">
                  {eyebrow}
                </span>
              </div>
            </div>
          )}

          {/* Star strip */}
          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="ri-star-fill text-accent text-sm" />
            ))}
            <span className="ml-2 text-xs font-light text-white/55">5-Star Rated · 140+ Reviews</span>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-normal text-white max-w-[540px]"
            style={{ fontSize: "clamp(36px, 4.5vw, 62px)", lineHeight: 1.04 }}
          >
            {headline}
          </h1>

          <div className="mt-5 mb-6 w-12 h-[2px] bg-accent" />

          <p className="max-w-md text-[15px] font-light leading-relaxed text-white/70">
            {subheadline}
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <i className={`${badge.icon} text-accent text-sm`} />
                <span className="text-[13px] font-light text-white/80">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 bg-accent px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-fill text-xs" />
              Call Now — {PHONE_DISPLAY}
            </a>
            <a
              href="#verify"
              className="flex items-center gap-2 border border-white/30 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-white hover:text-ink transition-colors"
            >
              Verify Insurance
            </a>
          </div>

          {/* Optional stat */}
          {stat && (
            <div className="mt-8 inline-flex items-center gap-4 border-l-2 border-accent pl-5">
              <span
                className="font-[family-name:var(--font-display)] text-4xl font-normal text-white"
                style={{ lineHeight: 1 }}
              >
                {stat}
              </span>
              {statLabel && (
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/55">{statLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Right — compact form card */}
        <div id="verify" className="flex items-center justify-center">
          <div
            className="w-full bg-white"
            style={{ boxShadow: "0 32px 80px -12px rgba(0,0,0,0.55)" }}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 px-7 pt-7 pb-5 border-b border-warm/40">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-white">
                <i className="ri-shield-check-line text-sm" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                  Verify Your Coverage
                </p>
                <p className="text-xs font-light text-ink/50 mt-0.5">
                  100% confidential · no obligation
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="px-7 py-6">
              <InsuranceForm />
              <p className="mt-4 text-[11px] font-light text-ink/40 leading-relaxed">
                HIPAA compliant. We&apos;ll contact you within 24 hours.
              </p>
            </div>
          </div>
        </div>

      </div>
    </CinematicHeroSection>
  );
}
