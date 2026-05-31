import Image from "next/image";
import { heroHomeSection } from "@/lib/heroSpacing";
import Link from "next/link";
import CtmLeadFormCard from "@/components/feature/CtmLeadFormCard";
import { HERO_BG } from "../assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

/**
 * Hero — full-bleed coastal highway image background.
 *
 * Layout:
 *   - Full-bleed photo (nbt_hero_bg01.jpg) sits behind everything.
 *   - Left half: navy gradient overlay so white text stays legible.
 *   - Right half: lighter navy-light overlay so the photo remains visible behind the form.
 *   - Form card: frosted dark panel so form fields stand out cleanly.
 */
export default function Hero() {
  return (
    <section className={heroHomeSection}>

      {/* ── Full-bleed background photo ───────────────────────────────── */}
      <Image
        src={HERO_BG}
        alt="California coastal highway heading north at golden hour"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* ── Mobile: full-bleed overlay so text stays legible at any width ─── */}
      <div className="absolute inset-0 bg-navy/85 lg:hidden" />
      {/* ── Desktop: dark navy anchored on the left, fades toward the right ─ */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-navy/95 from-0% via-navy/90 via-[38%] to-transparent to-[68%] lg:block" />

      {/* ── Bottom band — subtle left-anchored navy vignette ─ */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/50 via-navy/20 to-transparent" />

      {/* ── Terracotta warm glow — top-right, echoes the sunset sky ─────── */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-[480px] w-[480px] rounded-full bg-terracotta/25 blur-[140px]" />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-4 lg:px-12 lg:py-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left — editorial copy (white on dark) */}
          <div className="relative z-20 lg:col-span-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-[2px] w-12 bg-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Evidence-Based Care
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2">
              <div className="flex text-terracotta">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-base leading-none" />
                ))}
              </div>
              <span className="text-sm font-bold tracking-wide text-terracotta lg:hidden">
                224+ On Google
              </span>
              <span className="hidden text-sm font-bold tracking-wide text-terracotta lg:inline">
                4.6/5 on Google from 224+ reviews
              </span>
            </div>

            <h1 className="mb-6 font-serif text-4xl leading-[1.1] text-white lg:text-5xl xl:text-6xl">
              Addiction Treatment Center <br />
              <span className="font-light italic text-terracotta">
                in Orange County
              </span>
            </h1>

            <p className="mb-10 max-w-lg text-lg font-light leading-relaxed text-white/80">
              Transformational recovery is possible. Start on the path to
              feeling better today with Northbound Treatment Services&rsquo;
              safe &amp; supervised{" "}
              <span className="font-medium text-terracotta">
                drug &amp; alcohol addiction treatment programs
              </span>{" "}
              in Southern California.
            </p>

            <div className="mb-4 flex flex-wrap gap-3">
              <Link
                href="/programs/detox/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 underline-offset-4 hover:text-terracotta hover:underline"
              >
                Detox
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/programs/residential-treatment-center/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 underline-offset-4 hover:text-terracotta hover:underline"
              >
                Residential
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/programs/partial-hospitalization-program/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 underline-offset-4 hover:text-terracotta hover:underline"
              >
                PHP
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/telehealth-iop-services/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 underline-offset-4 hover:text-terracotta hover:underline"
              >
                Virtual IOP
              </Link>
              <span className="text-white/20">·</span>
              <Link
                href="/programs/aftercare/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 underline-offset-4 hover:text-terracotta hover:underline"
              >
                Aftercare
              </Link>
            </div>

            <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
              <a
                href="tel:8663110003"
                className="inline-block w-max flex-shrink-0 bg-terracotta px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-white shadow-xl shadow-terracotta/30 transition-all duration-300 hover:-translate-y-1 hover:bg-terracotta-light hover:shadow-2xl hover:shadow-terracotta/40"
              >
                Speak With Admissions
              </a>

              {/* Accreditation badges — official logos, original brand colors */}
              <div className="flex flex-wrap items-center gap-5">
                <Image
                  src="https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/logos/legitscript-certified.png"
                  alt="LegitScript Certified"
                  width={48}
                  height={52}
                  className="h-12 w-auto object-contain"
                />
                <Image
                  src="https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/logos/naatp-icon.png"
                  alt="NAATP Member"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
                <Image
                  src="https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/logos/joint-commission.png"
                  alt="The Joint Commission Accredited"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Point your compass callout — nods to the live site's brand line */}
            <div className="mt-10 hidden items-center gap-4 lg:flex">
              <div className="h-px w-8 bg-white/20" />
              <span className="font-serif text-xs italic tracking-widest text-white/40">
                Point your compass northbound.
              </span>
            </div>
          </div>

          {/* Right — CTM FormReactor (matches live northboundtreatment.com) */}
          <div className="relative z-30 mt-12 lg:col-span-6 lg:mt-0 lg:flex lg:items-start lg:justify-end">
            <CtmLeadFormCard
              eyebrow="Available 24/7"
              title="Start Your Recovery"
              subtitle="Fill out the form and we'll call you immediately."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
