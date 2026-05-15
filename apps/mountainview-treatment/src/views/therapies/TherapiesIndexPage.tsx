import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/Mountain-View-hero.png";

const THERAPIES = [
  {
    href: "/therapies/emdr/",
    title: "EMDR Therapy",
    subtitle: "Eye Movement Desensitization & Reprocessing",
    body: "Process traumatic memories and reduce PTSD symptoms using bilateral stimulation — one of the most well-researched trauma therapies available.",
    icon: "ri-eye-line",
  },
  {
    href: "/therapies/cognitive-dialectical/",
    title: "CBT & DBT",
    subtitle: "Cognitive & Dialectical Therapies",
    body: "Build practical skills to reshape unhelpful thought patterns, regulate emotions, and navigate life's challenges with greater confidence.",
    icon: "ri-mind-map",
  },
  {
    href: "/therapies/somatic-experiencing/",
    title: "Somatic Experiencing",
    subtitle: "Body-Based Trauma Therapy",
    body: "Release trauma stored in the nervous system through gentle, body-centered techniques developed by Dr. Peter Levine.",
    icon: "ri-body-scan-line",
  },
  {
    href: "/therapies/neurofeedback/",
    title: "Neurofeedback",
    subtitle: "Brain Training Therapy",
    body: "Retrain brainwave patterns using real-time EEG feedback — a drug-free, non-invasive path to improved focus, calm, and mental clarity.",
    icon: "ri-brain-line",
  },
  {
    href: "/therapies/holistic-integration/",
    title: "Holistic Integration",
    subtitle: "Whole-Person Healing",
    body: "Weave mindfulness, somatic work, nutrition, and movement into your recovery for healing that reaches beyond the symptom level.",
    icon: "ri-seedling-line",
  },
  {
    href: "/therapies/medication-assisted/",
    title: "Medication-Assisted Treatment",
    subtitle: "MAT — FDA-Approved Recovery Support",
    body: "Combine FDA-approved medication with counseling and behavioral therapy to reduce cravings, prevent relapse, and build a stable foundation.",
    icon: "ri-capsule-line",
  },
];

export default function TherapiesIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[60vh] flex-col justify-end overflow-hidden text-white lg:min-h-[560px]">
        <Image
          src={HERO_IMG}
          alt="Mountain View Treatment — Therapies"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[var(--mvt-forest-deep)] via-[var(--mvt-forest-deep)]/65 to-[var(--mvt-forest-deep)]/10"
        />
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-14 pt-24 lg:px-12 lg:pb-20">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
            Mountain View Treatment
          </p>
          <h1 className="mt-5 font-heading text-[52px] leading-[1.0] tracking-tight text-white sm:text-[64px] lg:text-[80px]">
            Our <span className="italic text-[var(--mvt-teal-light)]">Therapies</span>
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/75">
            Evidence-based modalities delivered by licensed specialists — each selected for its
            proven effectiveness in treating trauma, addiction, and co-occurring mental health
            conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill text-base" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 border border-white/35 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90 transition hover:border-white hover:text-white"
            >
              Verify Insurance
            </Link>
          </div>
        </div>
      </section>

      {/* Therapy grid */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <div className="flex flex-col items-center text-center">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
              Evidence-Based Modalities
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            </p>
            <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
              Tailored to Your <span className="italic">Recovery</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--mvt-text)]">
              No two paths to recovery are the same. Our clinical team draws from a comprehensive
              toolkit of evidence-based therapies, combining modalities to fit each client&rsquo;s
              unique history, needs, and goals.
            </p>
          </div>

          <div className="mt-14 grid gap-px border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-3">
            {THERAPIES.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col bg-white p-8 transition hover:bg-[var(--mvt-cream)]/60"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)] transition group-hover:bg-[var(--mvt-teal)]/20">
                  <i className={`${t.icon} text-xl`} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[18px] font-semibold text-[var(--mvt-ink)]">{t.title}</h3>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--mvt-muted)]">
                  {t.subtitle}
                </p>
                <p className="mt-3 text-[14px] leading-6 text-[var(--mvt-text)]">{t.body}</p>
                <span className="mt-auto pt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal)] transition group-hover:text-[var(--mvt-ink)]">
                  Learn More{" "}
                  <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </>
  );
}
