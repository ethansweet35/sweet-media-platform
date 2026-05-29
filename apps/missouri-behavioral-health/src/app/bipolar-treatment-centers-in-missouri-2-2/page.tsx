import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthPageLayout from "@/components/mental-health/MentalHealthPageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Bipolar Treatment Centers in Missouri | Missouri Behavioral Health",
  description:
    "Bipolar disorder treatment in Springfield, MO. Mood stabilization, medication management, CBT, DBT, PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/bipolar-treatment-centers-in-missouri-2-2" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/bipolar-treatment-centers-in-missouri-2-2", fallback);
}

const SIGNS = [
  "Periods of unusually elevated or expansive mood — feeling on top of the world, needing little sleep",
  "Grandiosity, inflated self-esteem, or impulsive high-risk decisions during elevated periods",
  "Racing thoughts, rapid speech, and jumping between ideas",
  "Depressive episodes — persistent sadness, fatigue, hopelessness, withdrawal",
  "Cycles between high-energy and low-energy states that disrupt work and relationships",
  "Irritability or agitation that feels disconnected from circumstances",
  "History of impulsive spending, sexual behavior, or risky decisions during elevated moods",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "5–7 days/week of intensive structured programming — critical for stabilizing acute mood episodes outside a hospital setting." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours/week of group and individual therapy for mood monitoring, coping skills, and relapse prevention." },
  { icon: "ri-calendar-check-line", label: "Standard Outpatient", desc: "Weekly therapy and psychiatric check-ins for long-term wellness maintenance and episode prevention." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Bipolar disorder management via secure telehealth — accessible across Missouri for flexible ongoing care." },
];

const APPROACH = [
  { icon: "ri-medicine-bottle-line", label: "Medication Management", desc: "Mood stabilizers, atypical antipsychotics, and other FDA-approved medications are central to bipolar treatment — managed by our psychiatric team." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Identifies thought patterns that trigger or worsen mood episodes and builds coping strategies for both poles." },
  { icon: "ri-heart-line", label: "Dialectical Behavior Therapy (DBT)", desc: "Builds emotional regulation, distress tolerance, and interpersonal skills that reduce episode severity and frequency." },
  { icon: "ri-sleep-line", label: "Sleep & Rhythm Regulation", desc: "Sleep disruption is a primary trigger for mood episodes. We address sleep hygiene and circadian rhythm stability as core clinical targets." },
  { icon: "ri-group-line", label: "Group Therapy", desc: "Psychoeducation and peer support specific to bipolar disorder — reducing shame and building illness management skills." },
  { icon: "ri-home-heart-line", label: "Family Education & Therapy", desc: "Family members learn to recognize warning signs, reduce high-expressed emotion, and support long-term mood stability." },
];

const FAQS = [
  { q: "What is bipolar disorder?", a: "Bipolar disorder is a chronic mood condition characterized by episodes of mania or hypomania (elevated, expansive, or irritable mood with increased energy) alternating with depressive episodes. It exists on a spectrum — Bipolar I involves full manic episodes, Bipolar II involves hypomanic episodes and significant depression, and cyclothymia involves milder mood fluctuations." },
  { q: "Is medication required for bipolar disorder?", a: "For most people with Bipolar I, medication is an essential component of treatment — particularly mood stabilizers and atypical antipsychotics. Bipolar disorder has a strong biological component that therapy alone cannot fully address. However, medication is always discussed collaboratively and adjusted based on individual response and preferences." },
  { q: "Can bipolar disorder be treated effectively?", a: "Yes — with proper treatment, most people with bipolar disorder can live stable, productive lives. The key is sustained engagement with both medication management and therapy, particularly around episode recognition, sleep regulation, and relapse prevention." },
  { q: "Can bipolar disorder co-occur with substance use?", a: "Very commonly. Rates of substance use disorder are significantly higher in people with bipolar disorder — often as a way of managing mood symptoms or the distress of the condition. Integrated treatment that addresses both simultaneously produces substantially better outcomes." },
  { q: "Does insurance cover bipolar disorder treatment?", a: "Yes — bipolar disorder is a covered mental health condition. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified at no cost before admission." },
];

export default function BipolarPage() {
  return (
    <MentalHealthPageLayout
      conditionName="Bipolar Disorder"
      heroHeading="Bipolar Treatment Centers in Missouri"
      heroSubcopy="Comprehensive bipolar disorder treatment — mood stabilization, medication management, CBT, and DBT for long-term mood stability in Springfield, Missouri."
      stats={[
        { value: "2.8%", label: "of US adults have bipolar disorder" },
        { value: "Mood", label: "Stabilization is our primary clinical goal" },
        { value: "Integrated", label: "Co-occurring substance use treatment" },
      ]}
      currentPath="/bipolar-treatment-centers-in-missouri-2-2"
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
                Bipolar disorder treatment in Missouri.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Bipolar disorder is a chronic, episodic condition that requires long-term, integrated care. At Missouri Behavioral Health, we provide a full continuum of outpatient bipolar treatment — from intensive PHP stabilization through ongoing outpatient wellness maintenance.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Our psychiatric-led team combines medication management, CBT, DBT, sleep regulation, and family education to help clients achieve mood stability, recognize early warning signs, and build a sustainable long-term wellness plan.
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
              <img src={SITE_IMAGES.therapyGroup} alt="Bipolar disorder treatment group session Missouri" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Stable</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Long-term wellness</p>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Signs of bipolar disorder.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Bipolar disorder is often misdiagnosed or undiagnosed for years. Recognizing the pattern of mood episodes is the first step toward effective treatment.
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">Bipolar programs at MBH.</h2>
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
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">How we treat bipolar disorder.</h2>
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
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">Bipolar treatment is covered.</h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Bipolar disorder is a covered mental health benefit. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. No-cost benefit verification before admission.
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
