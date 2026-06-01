import Image from "next/image";
import CtmLeadFormCard from "@/components/feature/CtmLeadFormCard";
import {
  ADMISSIONS_PHONE,
  ADMISSIONS_PHONE_DISPLAY,
  HERO_TRUST_BULLETS,
  VERIFY_INSURANCE_HREF,
  VIRTUAL_LP_HERO_IMAGE,
} from "./content";

/** Extra vertical room vs default `heroViewportSection` (LP has dense copy + form). */
const virtualLpHeroSection =
  "nb-hero-overlay relative flex min-h-[min(760px,calc(100dvh-4.75rem))] items-start overflow-hidden py-20 lg:max-h-[880px] lg:items-center lg:py-28";

export default function VirtualLpHero() {
  return (
    <section className={virtualLpHeroSection}>
      <Image
        src={VIRTUAL_LP_HERO_IMAGE}
        alt="Woman attending a secure virtual outpatient therapy session from home"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/88 to-navy/70" aria-hidden />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-terracotta/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-6 lg:px-12 lg:py-10">
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">Northbound Treatment Network</span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[3.25rem]">
              <span>Virtual Outpatient Treatment, </span>
              <span className="italic text-terracotta">
                <span>Matched to Your Needs</span>
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">Access substance use, mental health, women's-only recovery, and eating disorder outpatient care from home through the Northbound Treatment network.</p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">Whether you need addiction treatment, mental health support, a women's-only recovery environment, or specialized eating disorder care, our virtual programs may help you receive structured clinical support without leaving home.</p>

            <ul className="mt-8 flex flex-col gap-2.5">
              {HERO_TRUST_BULLETS.map((item, idx) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/75">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta/25">
                    <i className="ri-check-line text-xs text-terracotta" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={VERIFY_INSURANCE_HREF}
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-terracotta-light"
              >
                <i className="ri-shield-check-line" />
                <span>Verify Insurance</span>
              </a>
              <a
                href={ADMISSIONS_PHONE}
                className="inline-flex items-center gap-2 border border-white/35 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                <i className="ri-phone-line" />
                <span>Speak With Admissions</span>
              </a>
            </div>

            <p className="mt-6 text-xs text-white/40">{`Available 24/7 · ${ADMISSIONS_PHONE_DISPLAY} · Confidential admissions`}</p>
          </div>

          <div id="verify-insurance" className="relative scroll-mt-24 lg:flex lg:justify-end">
            <CtmLeadFormCard
              eyebrow="Free · Confidential"
              title="Verify Your Insurance"
              subtitle="Our admissions team can check your benefits and help match you with the right virtual program."
              height={320}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
