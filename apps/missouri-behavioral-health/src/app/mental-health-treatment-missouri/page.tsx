import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";

const HERO_BG =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/missouri-mental-health-hero-bg.jpg";

const fallback: Metadata = {
  title: "Mental Health Treatment in Missouri | Missouri Behavioral Health",
  description:
    "Evidence-based mental health treatment in Springfield, MO. Depression, anxiety, PTSD, bipolar disorder, OCD, and trauma. PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/mental-health-treatment-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-treatment-missouri", fallback);
}

const CONDITIONS = [
  { label: "Anxiety", href: "/anxiety-therapist-springfield-mo-3", icon: "ri-windy-line", desc: "Generalized anxiety, panic disorder, social anxiety, and phobias — evidence-based relief." },
  { label: "Bipolar Disorder", href: "/bipolar-treatment-centers-in-missouri-2-2", icon: "ri-contrast-2-line", desc: "Mood stabilization, medication management, and long-term wellness planning." },
  { label: "Depression", href: "/depression-therapist-springfield-mo", icon: "ri-cloudy-line", desc: "Regain purpose, energy, and connection through individualized depression treatment." },
  { label: "OCD", href: "/ocd-treatment-in-missouri", icon: "ri-loop-right-line", desc: "ERP therapy and co-occurring disorder care for obsessive-compulsive disorder." },
  { label: "PTSD", href: "/ptsd-counseling-springfield-mo", icon: "ri-shield-flash-line", desc: "EMDR, trauma-focused CBT, and somatic approaches for post-traumatic stress." },
  { label: "Trauma", href: "/trauma-therapist-springfield-mo-2", icon: "ri-heart-pulse-line", desc: "A safe, supportive space for processing and healing from complex trauma." },
];

const LEVELS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "5–7 days per week. Full-day programming for moderate to severe symptoms — the highest level of outpatient care with close clinical oversight." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours per week. Structured group and individual therapy designed around work, school, and family." },
  { icon: "ri-calendar-check-line", label: "Standard Outpatient", desc: "Weekly sessions for ongoing care, maintenance, and relapse prevention in individuals with a stable home environment." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Secure telehealth therapy, groups, and psychiatric support — accessible from anywhere in Missouri." },
];

const APPROACHES = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy (CBT)", desc: "Identify and restructure the thought patterns and behavioral cycles that sustain mental health conditions." },
  { icon: "ri-heart-pulse-line", label: "Dialectical Behavior Therapy (DBT)", desc: "Build emotional regulation, distress tolerance, and interpersonal effectiveness skills." },
  { icon: "ri-eye-line", label: "EMDR", desc: "Eye Movement Desensitization and Reprocessing for trauma, PTSD, and deeply rooted emotional distress." },
  { icon: "ri-group-line", label: "Group Therapy", desc: "Structured peer support that builds community, reduces shame, and accelerates healing through shared experience." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Heal relational dynamics and engage loved ones as active partners in the recovery process." },
  { icon: "ri-mental-health-line", label: "Holistic & Mindfulness", desc: "Yoga, breathwork, music therapy, and mindfulness practices complement clinical treatment to support the whole person." },
];

const FAQS = [
  { q: "What mental health conditions do you treat?", a: "We treat a wide range of mental health conditions including major depressive disorder, generalized anxiety disorder, panic disorder, PTSD, bipolar disorder, OCD, complex trauma, and co-occurring substance use disorders. Our team specializes in integrated treatment when multiple conditions are present." },
  { q: "What is a co-occurring disorder?", a: "A co-occurring disorder (also called a dual diagnosis) is when a person has both a mental health condition and a substance use disorder simultaneously. This is more common than many people realize — and treating both together produces significantly better outcomes than addressing each separately." },
  { q: "How do I know what level of care I need?", a: "A clinical assessment helps determine the appropriate level of care based on symptom severity, safety needs, support systems, and personal goals. Our admissions team will guide you through this process. You don't need a prior diagnosis to start — we assess and recommend next steps." },
  { q: "Can I work or attend school during treatment?", a: "Most clients in outpatient and IOP programs continue working or attending school. PHP is more intensive and may require temporary leave. Virtual outpatient adds flexibility for clients across Missouri. We can discuss scheduling and documentation needs for employers or schools." },
  { q: "Does insurance cover mental health treatment?", a: "Yes — most private insurance plans cover mental health treatment as an essential benefit under the ACA and the Mental Health Parity and Addiction Equity Act. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before admission at no cost." },
];

export default function MentalHealthHubPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[88vh] flex-col overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,20,35,0.72) 0%, rgba(10,20,35,0.25) 28%, rgba(10,20,35,0.12) 50%, rgba(10,20,35,0.65) 70%, rgba(10,20,35,0.97) 100%)" }} />

        <div className="relative z-10 flex flex-1 flex-col justify-end">
          <div className={CONTAINER}>
            <nav className="mb-8 flex items-center gap-2 font-body text-[11px] text-white/35" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-white/65">Home</Link>
              <i className="ri-arrow-right-s-line" aria-hidden />
              <span className="text-white/55">Mental Health Treatment</span>
            </nav>

            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-sage" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
                Mental Health · Springfield, MO
              </span>
            </div>

            <h1
              className="font-display font-semibold leading-[1.04] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
            >
              Mental Health Treatment in Missouri
            </h1>
            <p className="mt-5 max-w-2xl font-body text-[1.0625rem] leading-relaxed text-white/65">
              Evidence-based outpatient mental health care in Springfield, MO — treating depression, anxiety, PTSD, bipolar disorder, OCD, trauma, and co-occurring substance use disorders.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PHONE_HREF} className="inline-flex items-center gap-2.5 rounded-full bg-mbh-green px-8 py-4 font-body text-sm font-semibold text-white shadow-xl shadow-black/30 transition hover:bg-mbh-green-hover">
                <i className="ri-phone-fill" aria-hidden /> Call 24/7 — {PHONE_DISPLAY}
              </a>
              <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-body text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/45 hover:bg-white/8">
                <i className="ri-shield-check-line" aria-hidden /> Verify insurance
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pb-14 pt-8">
              {[
                { value: "6+", label: "Mental health conditions treated" },
                { value: "PHP · IOP", label: "Outpatient levels of care" },
                { value: "Same Day", label: "Assessments available" },
              ].map((s) => (
                <div key={s.label} className="px-4 first:pl-0 last:pr-0 sm:px-10">
                  <p className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-semibold text-white">{s.value}</p>
                  <p className="mt-1 font-body text-[11px] leading-snug text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS GRID ──────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Conditions We Treat</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Specialized care for every condition.
            </h2>
            <p className="mt-4 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Our licensed clinicians treat the full spectrum of adult mental health conditions — individually and when they co-occur with substance use disorders.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col gap-4 rounded-2xl border border-mbh-forest/8 bg-cream p-6 transition hover:border-mbh-green hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mbh-green/10 transition group-hover:bg-mbh-green/20">
                  <i className={`${c.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="font-display text-[1rem] font-semibold text-mbh-forest">{c.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{c.desc}</p>
                </div>
                <span className="flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-green">
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / PHOTO ────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">About Our Program</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Compassionate, evidence-based mental health care in Springfield.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Missouri Behavioral Health opened in July 2025 at 2942 E Battlefield Rd, Springfield — providing the Ozarks region with a full continuum of outpatient mental health treatment. We specialize in co-occurring disorders, treating mental illness and substance use together rather than in isolation.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Our team of licensed clinicians, psychiatric nurse practitioners, and recovery specialists uses CBT, DBT, EMDR, group therapy, family therapy, yoga, and mindfulness alongside evidence-based psychiatric support — tailored to each individual's needs.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint">
                  <i className="ri-phone-fill" aria-hidden /> Call 24/7
                </a>
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                  Verify insurance
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-black/30">
              <Image src={SITE_IMAGES.therapyGroup} alt="Mental health treatment group session at Missouri Behavioral Health" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,20,35,0.4) 0%, transparent 50%)" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">July 2025</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Opened in Springfield</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEVELS OF CARE ───────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Levels of Care</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                The right level of support for where you are.
              </h2>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LEVELS.map((l) => (
              <div key={l.label} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mbh-forest/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${l.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{l.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLINICAL APPROACHES ──────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Evidence-based therapies that work.
            </h2>
            <p className="mt-4 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              We combine the most effective clinical modalities available, tailored to each person's diagnosis, history, and goals.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACHES.map((a) => (
              <div key={a.label} className="flex items-start gap-4 rounded-2xl border border-mbh-forest/8 bg-cream p-5">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${a.icon} text-lg text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-mbh-forest">{a.label}</p>
                  <p className="mt-1.5 font-body text-sm leading-relaxed text-mbh-body">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE ────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Most insurance covers mental health treatment.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Mental health treatment is a covered essential benefit under the ACA and the Mental Health Parity and Addiction Equity Act. We accept Aetna, Anthem Blue Cross, Blue Cross Blue Shield, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified at no cost before your first appointment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint">
                  <i className="ri-shield-check-line" aria-hidden /> Check my coverage
                </Link>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield", "Cigna", "Beacon Health", "Carelon", "GEHA", "Cox Health"].map((carrier) => (
                <div key={carrier} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                  <i className="ri-check-line text-mbh-sage text-sm" aria-hidden />
                  <span className="font-body text-sm text-white/80">{carrier}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Common questions about mental health care.
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
                Our admissions team is available around the clock — all calls are confidential.
              </p>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline">
                {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
              </a>
            </div>
            <SubstanceFaq items={FAQS} />
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-mbh-forest-deep py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-15" style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,20,35,0.98) 40%, rgba(10,20,35,0.85) 100%)" }} />
        <div className={`${CONTAINER} relative z-10`}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Get Help Today</p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-tight text-white">
                Our clinical team is ready 24/7.
              </h2>
              <p className="mt-3 font-body text-base text-white/50">
                Same-day assessments · Insurance verified before admission · HIPAA-compliant
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-9 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint">
                <i className="ri-phone-fill" aria-hidden /> Call Now — {PHONE_DISPLAY}
              </a>
              <Link href="/verify-insurance" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-9 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                Verify insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
