import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const ADDICTION_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_addiction_hub_hero.jpg";
const MENTAL_HEALTH_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_hub.jpg";

const ADDICTION_CONDITIONS = [
  { name: "Alcohol", href: "/what-we-treat/addiction/alcohol/" },
  { name: "Opioids", href: "/what-we-treat/addiction/opioids/" },
  { name: "Marijuana", href: "/what-we-treat/addiction/marijuana/" },
  { name: "Prescription Drugs", href: "/what-we-treat/addiction/prescription/" },
  { name: "Stimulants", href: "/what-we-treat/addiction/stimulants/" },
];

const MENTAL_HEALTH_CONDITIONS = [
  { name: "Anxiety", href: "/what-we-treat/mental-health/anxiety/" },
  { name: "Depression", href: "/what-we-treat/mental-health/depression/" },
  { name: "Bipolar Disorder", href: "/what-we-treat/mental-health/bipolar/" },
  { name: "Trauma & PTSD", href: "/what-we-treat/mental-health/trauma/" },
  { name: "Personality Disorders", href: "/what-we-treat/mental-health/personality-disorders/" },
  { name: "Schizoaffective Disorder", href: "/what-we-treat/mental-health/schizoaffective/" },
];

const STATS = [
  { num: "9.5M+", label: "Adults in the U.S. live with co-occurring mental health and substance use disorders" },
  { num: "50%", label: "Of people with addiction also have a diagnosable mental health condition" },
  { num: "3×", label: "Better outcomes when both conditions are treated simultaneously" },
];

const PRINCIPLES = [
  { icon: "ri-link-m", title: "Integrated Dual Diagnosis Care", body: "Addiction and mental health rarely occur in isolation. Our clinical team treats both conditions concurrently in the same program — not on separate tracks." },
  { icon: "ri-user-heart-line", title: "Individualized Treatment Plans", body: "No two presentations are alike. Your assessment drives a personalized combination of evidence-based therapies, medication management, and support structures." },
  { icon: "ri-shield-check-line", title: "Evidence-Based Methods Only", body: "Every modality we use — CBT, EMDR, DBT, MAT, somatic work — is supported by rigorous clinical research and delivered by licensed specialists." },
  { icon: "ri-lock-2-line", title: "Complete Confidentiality", body: "HIPAA-protected care in a discreet, private environment. Your employer, family, and community receive no information without your explicit written consent." },
];

export default function WhatWeTreatPage() {
  return (
    <div className="flex flex-col bg-white text-[var(--mvt-text)]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--mvt-ink)] pt-28 lg:pt-36">
        {/* Mountain contour texture */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04]"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <polyline points="0,600 200,320 340,430 520,210 700,380 860,160 1040,300 1200,120 1440,280 1440,600" fill="white" />
        </svg>
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--mvt-teal-light)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-[var(--mvt-forest)]/30 blur-2xl" />

        <div className="relative mx-auto max-w-[1280px] px-6 pb-20 lg:px-12 lg:pb-28">
          <p className="mvt-eyebrow-light mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mvt-teal-light)]">
            Our Clinical Specialties
          </p>
          <h1 className="font-heading max-w-3xl text-[40px] font-bold leading-[1.06] tracking-tight text-white sm:text-[52px] lg:text-[64px]">
            What We{" "}
            <span className="italic text-[var(--mvt-teal-light)]">Treat</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 lg:text-lg">
            Mountain View Treatment Center specializes in dual diagnosis outpatient care — treating addiction and mental health conditions together, as they so often co-occur, in Seattle, WA.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={SITE.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-teal-light)] px-7 py-3.5 text-sm font-semibold text-[var(--mvt-ink)] shadow-sm transition hover:opacity-90"
            >
              <i className="ri-phone-fill" /> {SITE.phone.display}
            </Link>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
            >
              Verify Insurance <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.num} className="bg-[var(--mvt-ink)]/60 px-8 py-6 backdrop-blur-sm">
                <p className="font-heading text-4xl font-bold text-[var(--mvt-teal-light)]">{s.num}</p>
                <p className="mt-1 text-sm leading-snug text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Angled bottom edge */}
        <div className="relative h-12 overflow-hidden bg-[var(--mvt-ink)]">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 h-full w-full">
            <polygon points="0,48 1440,0 1440,48" fill="white" />
          </svg>
        </div>
      </section>

      {/* Two pillars */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="mb-14 text-center">
            <p className="mvt-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mvt-forest)]">
              Our Two Core Specialties
            </p>
            <h2 className="font-heading text-[36px] font-bold text-[var(--mvt-ink)] lg:text-[48px]">
              Addiction &{" "}
              <span className="italic text-[var(--mvt-forest)]">Mental Health</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--mvt-muted)]">
              We treat the full spectrum of substance use disorders and psychiatric conditions — often simultaneously, because co-occurring presentations are the rule, not the exception.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Addiction card */}
            <div className="group overflow-hidden rounded-3xl border border-[var(--mvt-cream-2)] bg-white shadow-sm">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={ADDICTION_IMG}
                  alt="Addiction treatment at Mountain View Treatment Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--mvt-ink)]/80 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <span className="inline-block rounded-full bg-[var(--mvt-teal-light)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--mvt-teal-light)] ring-1 ring-[var(--mvt-teal-light)]/30">
                    Substance Use
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-[28px] font-bold text-[var(--mvt-ink)]">Addiction Treatment</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--mvt-muted)]">
                  Evidence-based outpatient care for alcohol, opioids, stimulants, and other substance use disorders — including medication-assisted treatment (MAT) and integrated behavioral therapy.
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {ADDICTION_CONDITIONS.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="flex items-center gap-2 text-sm font-medium text-[var(--mvt-forest)] underline-offset-4 hover:underline"
                      >
                        <i className="ri-arrow-right-s-line text-[var(--mvt-teal-light)]" />
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Link
                    href="/what-we-treat/addiction/"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-forest)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--mvt-ink)]"
                  >
                    Explore Addiction Care <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Mental Health card */}
            <div className="group overflow-hidden rounded-3xl border border-[var(--mvt-cream-2)] bg-white shadow-sm">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={MENTAL_HEALTH_IMG}
                  alt="Mental health treatment at Mountain View Treatment Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--mvt-ink)]/80 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <span className="inline-block rounded-full bg-[var(--mvt-teal-light)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--mvt-teal-light)] ring-1 ring-[var(--mvt-teal-light)]/30">
                    Mental Health
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-[28px] font-bold text-[var(--mvt-ink)]">Mental Health Treatment</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--mvt-muted)]">
                  Comprehensive outpatient psychiatric care for anxiety, depression, trauma, bipolar disorder, personality disorders, and co-occurring conditions — with specialized dual diagnosis programming.
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {MENTAL_HEALTH_CONDITIONS.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="flex items-center gap-2 text-sm font-medium text-[var(--mvt-forest)] underline-offset-4 hover:underline"
                      >
                        <i className="ri-arrow-right-s-line text-[var(--mvt-teal-light)]" />
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Link
                    href="/what-we-treat/mental-health/"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-forest)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--mvt-ink)]"
                  >
                    Explore Mental Health Care <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters — dual diagnosis */}
      <section className="bg-[var(--mvt-cream)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="mvt-eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mvt-forest)]">
                Dual Diagnosis
              </p>
              <h2 className="font-heading text-[34px] font-bold leading-tight text-[var(--mvt-ink)] lg:text-[44px]">
                Why We Treat{" "}
                <span className="italic text-[var(--mvt-forest)]">Both Together</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--mvt-muted)]">
                The vast majority of people seeking addiction treatment also have an underlying or co-occurring mental health condition — and vice versa. Treating one without the other dramatically increases the risk of relapse and incomplete recovery.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--mvt-muted)]">
                At Mountain View Treatment Center, our licensed clinicians are trained in integrated dual diagnosis care. You won't be referred out or placed on separate waitlists. Addiction and mental health treatment happen together, from day one, in the same program.
              </p>
              <div className="mt-8">
                <Link
            href={SITE.phone.href}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-forest)] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill" /> Speak With a Clinician
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <div key={p.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[var(--mvt-cream-2)]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--mvt-forest)]/10 text-[var(--mvt-forest)]">
                    <i className={`${p.icon} text-xl`} />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-[var(--mvt-ink)]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mvt-muted)]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Levels of care connector */}
      <section className="relative overflow-hidden bg-[var(--mvt-forest)] py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-32 -top-20 h-80 w-80 rounded-full bg-[var(--mvt-teal-light)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <p className="mvt-eyebrow-light mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--mvt-teal-light)]">
              How We Deliver Care
            </p>
            <h2 className="font-heading text-[32px] font-bold text-white lg:text-[44px]">
              Multiple <span className="italic text-[var(--mvt-teal-light)]">Levels of Care</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
              Mountain View offers Partial Hospitalization (PHP), Intensive Outpatient (IOP), and standard Outpatient (OP) programming — so your care intensity matches your clinical needs, and steps down as you stabilize.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/levels-of-care/partial-hospitalization-program/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                PHP <i className="ri-arrow-right-line" />
              </Link>
              <Link href="/levels-of-care/intensive-outpatient-program/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                IOP <i className="ri-arrow-right-line" />
              </Link>
              <Link href="/levels-of-care/outpatient-program/" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10">
                Outpatient <i className="ri-arrow-right-line" />
              </Link>
              <Link href="/levels-of-care/" className="inline-flex items-center gap-2 rounded-full bg-[var(--mvt-teal-light)] px-6 py-3 text-sm font-semibold text-[var(--mvt-ink)] transition hover:opacity-90">
                All Levels of Care <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </div>
  );
}
