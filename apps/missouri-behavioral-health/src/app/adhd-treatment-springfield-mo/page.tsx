import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "ADHD Treatment in Springfield, MO | Missouri Behavioral Health",
  description:
    "Adult ADHD evaluation and treatment in Springfield, MO. Therapy, executive-function coaching, and psychiatric medication management. PHP, IOP, and outpatient care. Call 24/7.",
  alternates: { canonical: "/adhd-treatment-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/adhd-treatment-springfield-mo", fallback);
}

const SIGNS = [
  "Restlessness, fidgeting, or a constant feeling of being 'driven by a motor'",
  "Impulsive decisions, interrupting, or difficulty waiting your turn",
  "Trouble focusing on tasks — yet hyperfocus on things that interest you",
  "Chronic procrastination and difficulty starting tasks",
  "Disorganization, missed deadlines, and time-management struggles",
  "Emotional reactivity, irritability, or difficulty regulating mood",
  "Relationship or workplace strain related to follow-through and focus",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Intensive support when ADHD co-occurs with mood, anxiety, or substance use challenges." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "Structured therapy and skills training that fit around work and family responsibilities." },
  { icon: "ri-calendar-check-line", label: "Outpatient Therapy", desc: "Weekly therapy and psychiatric care for focus, organization, and emotional regulation." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Telehealth ADHD assessment and treatment available across Missouri." },
];

const APPROACH = [
  { icon: "ri-medicine-bottle-line", label: "Psychiatric Medication Management", desc: "When appropriate, our psychiatric team evaluates and manages stimulant or non-stimulant medication." },
  { icon: "ri-focus-3-line", label: "Executive-Function Coaching", desc: "Concrete systems for planning, prioritizing, and following through on what matters." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "ADHD-adapted CBT targets procrastination, negative self-talk, and emotional regulation." },
  { icon: "ri-mental-health-line", label: "Co-occurring Care", desc: "ADHD frequently overlaps with anxiety, depression, and substance use — we treat them together." },
  { icon: "ri-group-line", label: "Group Therapy", desc: "Skills-focused groups build accountability and reduce the isolation ADHD can cause." },
  { icon: "ri-leaf-line", label: "Lifestyle & Wellness", desc: "Sleep, exercise, and mindfulness strategies that measurably improve attention and regulation." },
];

const FAQS = [
  { q: "Can ADHD be diagnosed in adulthood?", a: "Yes. Many adults are diagnosed for the first time later in life, often after years of unexplained struggles with focus, organization, or impulsivity. A thorough evaluation clarifies the picture and guides effective treatment." },
  { q: "Is medication required for ADHD?", a: "No. Medication is highly effective for many people but is always optional. Therapy, coaching, and lifestyle changes can be powerful on their own or combined with medication. We tailor the plan to you." },
  { q: "What's the difference between ADD and ADHD?", a: "ADD is an older term, now classified as ADHD Predominantly Inattentive Presentation. ADHD also includes hyperactive-impulsive and combined presentations. Treatment is similar but emphasizes the symptoms most affecting you." },
  { q: "Does ADHD co-occur with other conditions?", a: "Frequently. Anxiety, depression, and substance use commonly accompany ADHD. Our integrated program treats co-occurring conditions simultaneously for the best outcomes." },
  { q: "Does insurance cover ADHD treatment?", a: "Yes — ADHD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health, and verify your benefits at no cost before your first session." },
];

export default function AdhdTreatmentPage() {
  return (
    <MentalHealthPageLayout
      conditionName="ADHD"
      heroHeading="ADHD Treatment in Missouri"
      heroSubcopy="Evidence-based ADHD care for adults in Springfield, MO — combining psychiatric evaluation, medication management, therapy, and executive-function coaching."
      stats={[
        { value: "Adults", label: "Specialized adult ADHD care" },
        { value: "Med + Therapy", label: "Comprehensive treatment options" },
        { value: "PHP + IOP", label: "Programs for co-occurring needs" },
      ]}
      currentPath="/adhd-treatment-springfield-mo"
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
                ADHD treatment at Missouri Behavioral Health.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                ADHD is a neurodevelopmental condition that affects attention, impulse control, and emotional regulation. In adults it often shows up as chronic disorganization, procrastination, and a sense of never quite keeping up — despite real effort and ability.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Effective treatment combines the right medication when appropriate, practical skills, and therapy. Our team helps you build a life that works with your brain&apos;s wiring.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="ADHD treatment session in Springfield, Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Adult</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">ADHD Care</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Signs of ADHD.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                ADHD looks different in everyone. The common thread is a persistent pattern of inattention and/or hyperactivity-impulsivity that interferes with daily life across multiple settings.
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">ADHD programs at MBH.</h2>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat ADHD.</h2>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">ADHD treatment is covered.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                ADHD is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before your first session at no cost.
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
