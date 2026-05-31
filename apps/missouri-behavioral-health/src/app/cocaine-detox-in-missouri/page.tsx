import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Cocaine Detox & Addiction Treatment in Missouri | Missouri Behavioral Health",
  description:
    "Cocaine addiction treatment in Springfield, MO. Evidence-based behavioral therapy, PHP, IOP, and outpatient programs. Call 24/7.",
  alternates: { canonical: "/cocaine-detox-in-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/cocaine-detox-in-missouri", fallback);
}

const SIGNS = [
  "Using cocaine in larger amounts or over a longer period than intended",
  "Persistent desire to cut down or stop with repeated unsuccessful attempts",
  "Spending significant time obtaining, using, or recovering from cocaine",
  "Strong cravings and compulsive urges to use",
  "Failing to meet obligations at work, school, or home due to cocaine use",
  "Continued use despite interpersonal or social problems caused by cocaine",
  "Withdrawal symptoms — fatigue, depression, increased appetite — when stopping",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "Intensive daily programming 5–7 days per week — provides structure for those with severe use patterns or a destabilizing home environment.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "9–15 hours of weekly therapy focused on craving management, behavioral patterns, and relapse prevention.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Outpatient Program",
    desc: "Flexible weekly sessions for clients with a strong support system who are ready for a lower-frequency structure.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Our full outpatient program delivered online — accessible across Missouri without the need to travel.",
  },
];

const APPROACH = [
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Breaks the automatic connection between cocaine triggers and use behavior, replacing compulsive patterns with healthier responses." },
  { icon: "ri-heart-line", label: "Contingency Management", desc: "Provides positive reinforcement for negative drug tests, helping to build the early momentum of sustained abstinence." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Shared experience in a structured therapeutic environment reduces isolation and builds accountability among peers in recovery." },
  { icon: "ri-mental-health-line", label: "Co-occurring Disorder Treatment", desc: "Depression and anxiety frequently co-occur with cocaine use disorder — our team treats both simultaneously." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Rebuilds the communication and trust that cocaine use disorder often damages within family systems." },
  { icon: "ri-run-line", label: "Holistic Recovery", desc: "Exercise, mindfulness, and nutrition support are integrated to address the physical depletion that cocaine use causes." },
];

const FAQS = [
  { q: "Is cocaine physically addictive?", a: "Cocaine produces strong psychological dependence. While the physical withdrawal syndrome is less severe than opioids or alcohol, the psychological symptoms — including intense cravings, depression, and dysphoria — are powerful and require structured treatment to manage." },
  { q: "What does cocaine detox look like?", a: "Cocaine detox primarily involves managing the 'crash' period after stopping — characterized by fatigue, depression, irritability, and strong cravings. This is managed through behavioral support, sleep regulation, nutritional support, and careful psychiatric monitoring." },
  { q: "How long does cocaine addiction treatment take?", a: "Treatment duration is highly individualized. Many clients progress through PHP (4–6 weeks) into IOP (8–12 weeks) and then outpatient. The severity of use, co-occurring conditions, and support system all influence the recommended duration." },
  { q: "Does insurance cover cocaine addiction treatment?", a: "Yes — most private insurance plans cover substance use disorder treatment. We verify your benefits before you begin and never want cost to be a barrier to receiving care." },
  { q: "Can someone relapse after treatment?", a: "Relapse is a common part of the recovery process and does not indicate failure. Our aftercare planning proactively addresses relapse risk and provides a clear protocol for what to do if use recurs after treatment." },
];

export default function CocainePage() {
  return (
    <SubstancePageLayout
      substanceName="Cocaine Detox"
      heroHeading="Cocaine Detox & Treatment in Missouri"
      heroSubcopy="Evidence-based cocaine addiction treatment in Springfield, MO — combining behavioral therapy, group counseling, and co-occurring disorder treatment for lasting recovery."
      stats={[
        { value: "4.8M", label: "Americans use cocaine annually" },
        { value: "PHP + IOP", label: "Multiple treatment levels available" },
        { value: "Dual", label: "Diagnosis treatment for co-occurring conditions" },
      ]}
      currentPath="/cocaine-detox-in-missouri"
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
                What is cocaine addiction treatment?
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Cocaine use disorder is characterized by compulsive cocaine use despite significant negative consequences. Unlike opioids or benzodiazepines, cocaine primarily produces psychological rather than physical dependence — but the behavioral and emotional grip it creates is extraordinarily powerful.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Treatment focuses on behavioral interventions, craving management, addressing underlying mood disorders, and building the skills and support systems that sustain long-term sobriety.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Cocaine addiction treatment group therapy" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Dual</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Diagnosis Care</p>
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
                Signs of cocaine use disorder.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Cocaine use disorder can escalate rapidly. Early recognition and intervention significantly improve treatment outcomes.
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

      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Treatment Options</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              Cocaine treatment programs at MBH.
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

      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Our Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
              How we treat cocaine addiction.
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

      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Insurance & Cost</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Coverage for cocaine treatment.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Substance use disorder treatment is a covered benefit under most private health insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before admission at no cost to you.
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

      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Common questions.
              </h2>
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
