import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Depression Therapist in Springfield, MO | Missouri Behavioral Health",
  description:
    "Evidence-based depression treatment in Springfield, MO. CBT, DBT, medication management, PHP, IOP, and outpatient programs. Regain purpose and joy. Call 24/7.",
  alternates: { canonical: "/depression-therapist-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/depression-therapist-springfield-mo", fallback);
}

const SIGNS = [
  "Persistent sadness, emptiness, or hopelessness lasting most of the day, nearly every day",
  "Loss of interest or pleasure in activities that were once enjoyable",
  "Significant changes in appetite or weight — either increased or decreased",
  "Trouble sleeping or sleeping too much",
  "Physical fatigue and loss of energy, even without exertion",
  "Feelings of worthlessness or excessive, inappropriate guilt",
  "Difficulty concentrating, making decisions, or remembering things",
  "Thoughts of death, dying, or suicide",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "5–7 days per week of full-day, structured programming — the most intensive outpatient level, ideal for moderate to severe depression." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours per week of group and individual therapy, compatible with work and family life." },
  { icon: "ri-calendar-check-line", label: "Standard Outpatient", desc: "Weekly individual therapy sessions for ongoing depression management in a stable environment." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Complete outpatient depression care via secure telehealth — accessible anywhere in Missouri." },
];

const APPROACH = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy (CBT)", desc: "The most studied treatment for depression — breaks the cycle of negative thinking, behavioral withdrawal, and emotional spiraling." },
  { icon: "ri-heart-line", label: "Dialectical Behavior Therapy (DBT)", desc: "Builds emotional regulation and distress tolerance skills that reduce depressive symptoms and self-harming behaviors." },
  { icon: "ri-group-line", label: "Group Therapy", desc: "Shared experience with others in recovery from depression reduces isolation and builds accountability." },
  { icon: "ri-medicine-bottle-line", label: "Medication Management", desc: "Antidepressant medications can be highly effective for moderate-severe depression. Our psychiatric nurse practitioners provide evaluation and ongoing management." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Depression significantly impacts family relationships. We engage loved ones to rebuild communication and provide a stronger recovery support environment." },
  { icon: "ri-mental-health-line", label: "Holistic Support", desc: "Yoga, mindfulness, exercise, and sleep hygiene are integrated to address the physical dimensions of depression." },
];

const FAQS = [
  { q: "What is the difference between sadness and clinical depression?", a: "Sadness is a normal emotional response to difficult events. Clinical depression (major depressive disorder) is a persistent condition lasting at least two weeks that significantly impairs daily functioning — work, relationships, sleep, appetite, energy, and concentration. You don't need to 'earn' a diagnosis or wait until it's debilitating to seek help." },
  { q: "Does depression treatment really work?", a: "Yes — depression is one of the most treatable mental health conditions. Research consistently shows that CBT, medication, and combined approaches produce significant improvement for the majority of people. Early treatment produces better outcomes, and most people experience meaningful relief within 6–12 weeks of starting therapy." },
  { q: "What if I've tried therapy before and it didn't help?", a: "Different modalities work for different people — and the quality of the therapeutic relationship matters significantly. If a prior approach wasn't effective, we evaluate what has and hasn't worked and build a personalized plan that may combine different therapies, medication, or a different level of care." },
  { q: "Can depression co-occur with substance use?", a: "Very commonly. Many people with depression use alcohol or drugs to manage emotional pain — and substance use can worsen depression significantly. Treating both simultaneously in integrated care produces better outcomes than addressing each separately." },
  { q: "Is medication required for depression treatment?", a: "Not always. Mild to moderate depression often responds well to therapy alone. For moderate-severe depression, the combination of therapy and medication typically produces faster and more sustained outcomes. Our team discusses all options during assessment — medication is never required." },
];

export default function DepressionPage() {
  return (
    <MentalHealthPageLayout
      conditionName="Depression"
      heroHeading="Depression Therapist in Springfield, MO"
      heroSubcopy="Evidence-based depression treatment — CBT, DBT, medication management, and holistic care — helping adults across Missouri reclaim joy, purpose, and connection."
      stats={[
        { value: "1 in 5", label: "Adults experience depression each year" },
        { value: "80%", label: "of people improve with proper treatment" },
        { value: "Same Day", label: "Assessments available" },
      ]}
      currentPath="/depression-therapist-springfield-mo"
    >
      {/* Overview */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Overview</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Understanding depression and how we treat it.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Major depressive disorder is one of the most common and most treatable mental health conditions. It is not a character flaw or a sign of weakness — it is a medical condition involving the brain, nervous system, and the complex interplay between biology, psychology, and environment.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                At Missouri Behavioral Health, we treat depression with an individualized combination of evidence-based therapies, psychiatric support when appropriate, and holistic care that addresses the whole person — not just the symptoms.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Depression therapy group session Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">80%</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Improve with treatment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Signs & Symptoms</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs of clinical depression.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                If five or more of these symptoms have been present for two or more weeks and interfere with daily life, professional support is the right next step.
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

      {/* Programs */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Treatment Options</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Depression treatment programs at MBH.
            </h2>
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

      {/* Approach */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              How we treat depression.
            </h2>
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

      {/* Insurance */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Most insurance covers depression treatment.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Mental health parity laws require most insurance plans to cover depression treatment at the same level as physical health conditions. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first session — at no cost to you.
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
              {["Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield", "Cigna", "Beacon Health", "Carelon", "GEHA", "Cox Health"].map((c) => (
                <div key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                  <i className="ri-check-line text-mbh-sage text-sm" aria-hidden />
                  <span className="font-body text-sm text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">Common questions.</h2>
              <a href={PHONE_HREF} className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline">
                {PHONE_DISPLAY} <i className="ri-arrow-right-line" aria-hidden />
              </a>
            </div>
            <SubstanceFaq items={FAQS} />
          </div>
        </div>
      </section>
    </MentalHealthPageLayout>
  );
}
