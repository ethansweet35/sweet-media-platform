"use client";

import Image from "next/image";
import { useState } from "react";
import { SITE } from "@/lib/site";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/intensive-outpatient-program-seattle.webp";

const TRUST_BADGES = [
  { icon: "ri-checkbox-circle-line", label: "Insurance Accepted" },
  { icon: "ri-checkbox-circle-line", label: "24/7 Admissions" },
  { icon: "ri-checkbox-circle-line", label: "Same-Day Intake Available" },
];

interface LpHeroProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function LpHero({
  headline,
  subheadline = "Evidence-based outpatient recovery in Seattle — designed around your schedule, your life, and your goals. We accept most major insurance.",
  eyebrow,
  stat,
  statLabel,
}: LpHeroProps) {
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  const inputCls =
    "block w-full border-0 border-b border-white/30 bg-transparent px-0 pb-2 pt-1 text-sm font-light text-white placeholder:text-white/55 focus:border-white focus:outline-none focus:ring-0";

  return (
    <section className="relative overflow-hidden bg-[var(--mvt-ink)]" style={{ minHeight: "min(700px, 88dvh)" }}>
      {/* Background image */}
      <Image
        src={HERO_IMG}
        alt="Mountain View Treatment Seattle facility"
        fill
        className="object-cover object-center opacity-25"
        priority
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--mvt-ink)]/95 via-[var(--mvt-ink)]/75 to-[var(--mvt-ink)]/30" />

      <div className="relative mx-auto max-w-[1280px] px-6 py-20 lg:py-28 grid lg:grid-cols-[1fr_400px] items-center gap-10 lg:gap-14">

        {/* Left — content */}
        <div className="flex flex-col justify-center">

          {eyebrow && (
            <div className="flex items-center gap-2 mb-5">
              <div className="border border-white/20 px-4 py-1.5 flex items-center bg-white/5 backdrop-blur-sm">
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white">
                  {eyebrow}
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <i key={i} className="ri-star-fill text-[var(--mvt-teal-light)] text-sm" aria-hidden="true" />
            ))}
            <span className="ml-2 text-xs font-light text-white/50">5-Star Rated · Seattle Recovery</span>
          </div>

          <h1
            className="font-heading font-light text-white"
            style={{ fontSize: "clamp(34px, 4vw, 58px)", lineHeight: 1.05 }}
          >
            {headline}
          </h1>

          <div className="mt-5 mb-6 w-12 h-[2px] bg-[var(--mvt-teal-light)]" />

          <p className="max-w-md text-[15px] font-light leading-relaxed text-white/65">
            {subheadline}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <i className={`${badge.icon} text-[var(--mvt-teal-light)] text-sm`} aria-hidden="true" />
                <span className="text-[13px] font-light text-white/75">{badge.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={SITE.phone.href}
              className="flex items-center gap-2 bg-[var(--mvt-forest)] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-fill text-xs" aria-hidden="true" />
              Call Now — {SITE.phone.display}
            </a>
            <a
              href="#verify"
              className="flex items-center gap-2 border border-white/30 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-white hover:text-[var(--mvt-ink)] transition-colors"
            >
              Verify Insurance
            </a>
          </div>

          {stat && (
            <div className="mt-8 inline-flex items-center gap-4 border-l-2 border-[var(--mvt-teal-light)] pl-5">
              <span
                className="font-heading text-4xl font-light text-white"
                style={{ lineHeight: 1 }}
              >
                {stat}
              </span>
              {statLabel && (
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">{statLabel}</span>
              )}
            </div>
          )}
        </div>

        {/* Right — insurance verification form */}
        <div id="verify" className="flex items-center justify-center">
          <div
            className="w-full bg-[var(--mvt-ink)]"
            style={{ boxShadow: "0 32px 80px -12px rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-3 px-7 pt-7 pb-5 border-b border-white/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[var(--mvt-forest)] text-white">
                <i className="ri-shield-check-line text-sm" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  Verify Your Coverage
                </p>
                <p className="text-xs font-light text-white/45 mt-0.5">
                  100% confidential · no obligation
                </p>
              </div>
            </div>

            <div className="px-7 py-6">
              {formState === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                    <i className="ri-check-line text-xl text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-xl font-light text-white">Message Received</p>
                    <p className="mt-1.5 text-sm text-white/60">
                      We&apos;ll be in touch shortly. For immediate help, call{" "}
                      <a href={SITE.phone.href} className="text-white underline-offset-2 hover:underline">
                        {SITE.phone.display}
                      </a>.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="name" placeholder="Full Name" required className={inputCls} />
                  <input type="tel" name="phone" placeholder="Phone Number" required className={inputCls} />
                  <input type="text" name="insurance" placeholder="Insurance Provider" className={inputCls} />
                  <input type="text" name="policy_id" placeholder="Policy / Member ID" className={inputCls} />

                  {formState === "error" && (
                    <p className="text-xs text-red-400">Something went wrong — please try again or call us.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="mt-2 w-full bg-white py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-cream)] disabled:opacity-60"
                  >
                    {formState === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="ri-loader-4-line animate-spin text-sm" aria-hidden="true" />
                        Sending…
                      </span>
                    ) : (
                      "Check My Coverage"
                    )}
                  </button>
                  <p className="text-[11px] font-light text-white/35 leading-relaxed">
                    HIPAA compliant. We&apos;ll contact you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
