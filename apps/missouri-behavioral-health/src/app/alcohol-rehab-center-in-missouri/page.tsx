import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Alcohol Rehab Center in Missouri | Missouri Behavioral Health",
  description:
    "Evidence-based alcohol addiction treatment in Springfield, MO. PHP, IOP, and outpatient programs with medically supervised detox and relapse prevention. Call 24/7.",
  alternates: { canonical: "/alcohol-rehab-center-in-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/alcohol-rehab-center-in-missouri", fallback);
}

const SIGNS = [
  "Inability to control how much or how often you drink",
  "Strong cravings or urges to drink throughout the day",
  "Withdrawal symptoms — shaking, sweating, nausea — when not drinking",
  "Drinking in secret or hiding the amount consumed",
  "Neglecting work, school, or family responsibilities due to alcohol",
  "Continuing to drink despite relationship, legal, or health consequences",
  "Increased tolerance — needing more to feel the same effect",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "5–7 days per week. Intensive structured treatment with medical oversight — the highest level of outpatient care, ideal for those stepping down from detox or needing close monitoring.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours per week. Group and individual therapy with flexible scheduling designed to work around work, school, and family.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Outpatient Program",
    desc: "Weekly sessions focused on relapse prevention, coping skills, and long-term sobriety maintenance for those with a stable home environment.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "The full outpatient experience online — ideal for clients across Missouri who cannot travel or prefer to receive care from home.",
  },
];

const APPROACH = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy (CBT)", desc: "Identifies and restructures the thought patterns and emotional triggers that drive alcohol use." },
  { icon: "ri-heart-line", label: "Dialectical Behavior Therapy (DBT)", desc: "Builds distress tolerance and emotional regulation skills that reduce reliance on alcohol as a coping tool." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Peer accountability and shared experience are among the most powerful forces in long-term sobriety." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Rebuilds communication, trust, and healthy dynamics within the family system that supports recovery." },
  { icon: "ri-mental-health-line", label: "Holistic & Mindfulness", desc: "Yoga, breathwork, and mindfulness practices address the stress and emotional dysregulation beneath alcohol use." },
  { icon: "ri-medicine-bottle-line", label: "Medication Management", desc: "FDA-approved medications can reduce cravings and prevent relapse when combined with behavioral therapy." },
];

const FAQS = [
  { q: "How long does alcohol rehab take?", a: "Duration varies based on the severity of addiction and individual progress. PHP programs typically run 4–6 weeks, IOP 8–12 weeks, and outpatient care can continue for several months. We tailor each timeline to your specific needs and goals." },
  { q: "Is medical detox necessary for alcohol addiction?", a: "Alcohol withdrawal can be medically serious — even life-threatening in severe cases. Medical supervision during detox is strongly recommended to manage symptoms safely and transition smoothly into active therapy." },
  { q: "Does insurance cover alcohol rehab?", a: "Most private insurance plans cover alcohol addiction treatment. We verify your benefits at no cost before you begin. We accept Aetna, Anthem, BCBS, Cigna, Beacon, Carelon, GEHA, and Cox Health." },
  { q: "Can I work or go to school during treatment?", a: "Yes — that is one of the key advantages of outpatient programs. IOP and standard outpatient schedules are designed to allow you to maintain work, school, or family responsibilities while receiving structured treatment." },
  { q: "What happens after treatment ends?", a: "We build an aftercare plan before discharge that includes ongoing support groups, relapse prevention check-ins, and referrals to community resources. Recovery is a long-term commitment and we remain a resource after your formal program ends." },
];

export default function AlcoholRehabPage() {
  return (
    <SubstancePageLayout
      substanceName="Alcohol Rehab"
      heroHeading="Alcohol Rehab Center in Missouri"
      heroSubcopy="Evidence-based alcohol addiction treatment with medically supervised detox, individualized therapy, and long-term relapse prevention — in Springfield, MO and statewide virtually."
      stats={[
        { value: "1 in 6", label: "Missouri adults report heavy alcohol use" },
        { value: "24/7", label: "Admissions team availability" },
        { value: "3 Levels", label: "PHP · IOP · Outpatient" },
      ]}
      currentPath="/alcohol-rehab-center-in-missouri"
    >

      {/* ── Section 1: Overview + photo ─────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Overview</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                What is alcohol addiction treatment?
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Alcohol use disorder (AUD) is one of the most common — and most treatable — substance use disorders. At Missouri Behavioral Health, our alcohol rehab programs combine medically supervised detox, evidence-based behavioral therapy, and long-term relapse prevention to help individuals achieve lasting sobriety.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Our clinical team understands that alcohol dependency is rarely isolated. Co-occurring conditions like anxiety, depression, and trauma are common — and must be treated simultaneously for recovery to hold. Every plan we build addresses the full picture.
              </p>
              <div className="mt-8 flex gap-3">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover">
                  <i className="ri-phone-fill" aria-hidden /> Call 24/7
                </a>
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white">
                  Verify insurance
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE_IMAGES.therapyGroup} alt="Alcohol addiction treatment group session" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.35) 0%, transparent 50%)" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">24/7</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Confidential Care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Signs — dark bg ────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Signs & Symptoms</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs someone may need alcohol rehab.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Recognizing alcohol use disorder early significantly improves outcomes. If you or someone you love shows these signs, professional help is the right next step.
              </p>
              <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                Talk to our team
              </a>
            </div>
            <ul className="space-y-3">
              {SIGNS.map((s) => (
                <li key={s} className="flex items-start gap-4 rounded-2xl border border-white/6 bg-white/4 px-5 py-4">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/20">
                    <i className="ri-check-line text-[10px] text-mbh-sage" aria-hidden />
                  </span>
                  <span className="font-body text-sm leading-relaxed text-white/75">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Section 3: Programs — cream bg ────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Treatment Options</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Alcohol rehab programs at MBH.
              </h2>
            </div>
            <p className="max-w-xs font-body text-sm leading-relaxed text-mbh-body sm:text-right">
              Multiple levels of care to match where you are in your recovery journey.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <div key={p.label} className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mbh-forest/8">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${p.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{p.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Approach — white bg ────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              How we treat alcohol addiction.
            </h2>
            <p className="mt-4 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Our alcohol treatment integrates medically supervised detox, behavioral therapy, group counseling, family therapy, and holistic modalities. Each plan is built with the patient and evolves as progress is made.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((a) => (
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

      {/* ── Section 5: Insurance — dark bg ────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Most insurance covers alcohol rehab.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Most private health insurance plans cover alcohol addiction treatment. We accept Aetna, Anthem Blue Cross, Blue Cross Blue Shield, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Our administrative team verifies your benefits before treatment begins — at no cost.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Private pay options are also available. We never want financial concerns to be a barrier to getting help.
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

      {/* ── Section 6: FAQ ────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Common questions about alcohol rehab.
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
                Have a question not answered here? Call us any time — our admissions team is available 24/7 and all calls are confidential.
              </p>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline">
                {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
              </a>
            </div>
            <SubstanceFaq items={FAQS} />
          </div>
        </div>
      </section>

    </SubstancePageLayout>
  );
}
