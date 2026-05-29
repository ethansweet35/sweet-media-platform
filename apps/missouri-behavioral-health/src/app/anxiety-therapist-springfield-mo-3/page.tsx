import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Anxiety Therapist in Springfield, MO | Missouri Behavioral Health",
  description:
    "Anxiety treatment in Springfield, MO. CBT, DBT, exposure therapy for generalized anxiety, panic disorder, social anxiety, and phobias. PHP, IOP, outpatient. Call 24/7.",
  alternates: { canonical: "/anxiety-therapist-springfield-mo-3" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/anxiety-therapist-springfield-mo-3", fallback);
}

const SIGNS = [
  "Excessive, uncontrollable worry about everyday situations for most days",
  "Physical symptoms — racing heart, shortness of breath, sweating, trembling",
  "Avoidance of situations that trigger anxiety, limiting daily life",
  "Panic attacks — sudden, intense fear with physical symptoms that peak within minutes",
  "Persistent fear of social situations and being judged or embarrassed",
  "Irritability, difficulty concentrating, and feeling constantly on edge",
  "Sleep disruption — difficulty falling or staying asleep due to worry",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "5–7 days/week of intensive structured programming for significant anxiety that is interfering with daily functioning." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours/week — structured group and individual therapy for anxiety alongside work or school." },
  { icon: "ri-calendar-check-line", label: "Standard Outpatient", desc: "Weekly individual therapy for ongoing anxiety management and skill reinforcement." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Complete anxiety treatment via secure telehealth — ideal for social anxiety or clients across Missouri." },
];

const APPROACH = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy (CBT)", desc: "The gold standard for anxiety — identifies distorted thought patterns, tests them against reality, and builds healthier responses to triggers." },
  { icon: "ri-shield-line", label: "Exposure & Response Prevention (ERP)", desc: "Gradual, guided exposure to anxiety-provoking situations that reduces avoidance and diminishes the anxiety response over time." },
  { icon: "ri-heart-line", label: "Dialectical Behavior Therapy (DBT)", desc: "Teaches distress tolerance and emotion regulation skills that reduce anxiety-driven reactivity and impulsive coping." },
  { icon: "ri-mental-health-line", label: "Mindfulness-Based Therapy", desc: "Evidence-based mindfulness practices interrupt the worry cycle and build present-moment awareness that reduces chronic anxiety." },
  { icon: "ri-group-line", label: "Group Therapy", desc: "Peer support in a structured group setting reduces the shame and isolation that often maintains social anxiety and phobias." },
  { icon: "ri-medicine-bottle-line", label: "Medication Management", desc: "SSRIs, SNRIs, and other medications can be highly effective for anxiety disorders. Our psychiatric team evaluates and manages when appropriate." },
];

const FAQS = [
  { q: "What types of anxiety does MBH treat?", a: "We treat generalized anxiety disorder (GAD), panic disorder, social anxiety disorder, specific phobias, agoraphobia, and anxiety that co-occurs with depression, PTSD, or substance use disorders." },
  { q: "What is CBT and why is it used for anxiety?", a: "Cognitive Behavioral Therapy is the most well-researched treatment for anxiety. It works by helping you identify the inaccurate or exaggerated thoughts that drive anxiety, evaluate their validity, and practice responding to triggers differently — gradually reducing the emotional intensity of anxious reactions." },
  { q: "Can anxiety be treated without medication?", a: "Yes — many people achieve significant improvement with therapy alone, particularly CBT and mindfulness-based approaches. Medication can accelerate improvement and is often recommended for moderate-severe anxiety, but it is always presented as an option to discuss rather than a requirement." },
  { q: "How long does anxiety treatment take?", a: "Many people notice meaningful improvement within 8–12 weeks of consistent CBT. More complex anxiety presentations — particularly with co-occurring depression, trauma, or substance use — may benefit from longer engagement. Duration is individualized." },
  { q: "Does insurance cover anxiety treatment?", a: "Yes — anxiety disorders are covered mental health conditions under the ACA and mental health parity laws. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first appointment." },
];

export default function AnxietyPage() {
  return (
    <MentalHealthPageLayout
      conditionName="Anxiety"
      heroHeading="Anxiety Therapist in Springfield, MO"
      heroSubcopy="Evidence-based anxiety treatment — CBT, exposure therapy, DBT, and mindfulness care for generalized anxiety, panic disorder, social anxiety, and phobias in Missouri."
      stats={[
        { value: "40M", label: "Americans affected by anxiety disorders" },
        { value: "CBT", label: "Gold-standard therapy for anxiety" },
        { value: "Virtual", label: "Telehealth available statewide" },
      ]}
      currentPath="/anxiety-therapist-springfield-mo-3"
    >
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Overview</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                What is anxiety disorder treatment?
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Anxiety disorders are the most common mental health conditions in the United States — and among the most treatable. Anxiety becomes a disorder when worry, fear, or physical symptoms are persistent, excessive, and begin to interfere with work, relationships, sleep, and daily functioning.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                At Missouri Behavioral Health, we treat anxiety with CBT, exposure therapy, DBT, and mindfulness-based approaches — tailoring the plan to your specific anxiety profile, history, and goals.
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
              <img src={SITE_IMAGES.therapyGroup} alt="Anxiety therapy session Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">CBT</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Gold Standard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Signs & Symptoms</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs of an anxiety disorder.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Anxiety is normal — anxiety disorders are not. These signs indicate that anxiety has become a clinical condition requiring professional support.
              </p>
              <a href={PHONE_HREF} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">Talk to our team</a>
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

      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Treatment Options</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">Anxiety programs at MBH.</h2>
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

      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat anxiety.</h2>
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

      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Coverage for anxiety treatment.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Anxiety disorders are a covered mental health benefit under most private insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. No-cost benefits verification before your first session.
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
