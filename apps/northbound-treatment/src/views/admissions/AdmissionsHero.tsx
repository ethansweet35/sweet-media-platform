import Image from "next/image";
import { heroViewportSection } from "@/lib/heroSpacing";
import Link from "next/link";
import CtmLeadFormCard from "@/components/feature/CtmLeadFormCard";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const ADMISSIONS_HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_admissions_hero01.jpg";

export default function AdmissionsHero() {
  return (
    <section className={heroViewportSection}>
      {/* Background photo */}
      <Image
        src={ADMISSIONS_HERO}
        alt="Northbound admissions counselor meeting with a new client"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy/70 to-transparent" />

      {/* Terracotta glow */}
      <div className="pointer-events-none absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-terracotta/15 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: copy ───────────────────────────────────────────── */}
          <div>
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
              <Link href="/" className="transition hover:text-terracotta">Home</Link>
              <i className="ri-arrow-right-s-line" />
              <span className="text-white/70">Admissions</span>
            </nav>

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-10 bg-terracotta" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">
                Start Your Recovery Today
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Admissions:{" "}
              <span className="italic text-terracotta">What to Expect</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/75">
              <AutoLinkedText>{"Whether you're seeking help for yourself or for someone you love,\n              you are likely experiencing one of the most challenging times in\n              your life. Our admissions team will work through every step with\n              you — from your first call through long-term aftercare."}</AutoLinkedText>
            </p>

            {/* Quick trust points */}
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Free, confidential pre-admission assessment",
                "Insurance verified at no cost to you",
                "Travel coordination available nationwide",
                "24/7 admissions line — real people, not bots",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-terracotta/20">
                    <i className="ri-check-line text-xs text-terracotta" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Call CTA */}
            <div className="mt-10 flex items-center gap-4">
              <a
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-terracotta-light"
              >
                <i className="ri-phone-line" />
                (866) 311-0003
              </a>
              <span className="text-xs text-white/40">Available 24/7</span>
            </div>

            {/* DHCS badge */}
            <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30">
              <AutoLinkedText>{"DHCS Licensed #300661CP · NAATP Member · 38+ Years"}</AutoLinkedText>
            </p>
          </div>

          {/* ── Right: CTM FormReactor ─────────────────────────────────────── */}
          <div className="relative">
            <CtmLeadFormCard
              eyebrow="Available 24/7 — No Obligation"
              title="Request a Free Assessment"
              subtitle="Fill out the form and we'll call you immediately."
              height={460}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

