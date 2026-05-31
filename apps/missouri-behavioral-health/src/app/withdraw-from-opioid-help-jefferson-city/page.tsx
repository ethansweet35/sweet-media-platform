import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Opiate & Opioid Withdrawal Help in Missouri | Missouri Behavioral Health",
  description:
    "Opioid and opiate withdrawal support for Jefferson City and central Missouri. Medically informed detox guidance, MAT coordination, PHP, IOP, and outpatient care. Call 24/7.",
  alternates: { canonical: "/withdraw-from-opioid-help-jefferson-city" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/withdraw-from-opioid-help-jefferson-city", fallback);
}

const SIGNS = [
  "Muscle aches, restlessness, and joint pain within hours of the last dose",
  "Anxiety, agitation, and difficulty sleeping",
  "Runny nose, watery eyes, sweating, and frequent yawning",
  "Nausea, vomiting, abdominal cramping, and diarrhea",
  "Dilated pupils, goosebumps, and chills",
  "Intense cravings and preoccupation with the next dose",
  "Rapid heartbeat and elevated blood pressure",
];

const PROGRAMS = [
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", desc: "Daily structured programming with medical oversight during the most vulnerable early-recovery window." },
  { icon: "ri-community-line", label: "Intensive Outpatient (IOP)", desc: "9–15 hours weekly of therapy and relapse-prevention skills while you live at home." },
  { icon: "ri-calendar-check-line", label: "Outpatient Program", desc: "Flexible step-down care with continued counseling and MAT support." },
  { icon: "ri-computer-line", label: "Virtual Outpatient", desc: "Telehealth treatment for clients across central Missouri, including Jefferson City." },
];

const APPROACH = [
  { icon: "ri-medicine-bottle-line", label: "MAT Coordination", desc: "We coordinate medication-assisted treatment (buprenorphine, naltrexone) to ease withdrawal and reduce cravings safely." },
  { icon: "ri-brain-line", label: "Cognitive Behavioral Therapy", desc: "Identifies and restructures the thoughts and triggers that drive opioid use." },
  { icon: "ri-group-line", label: "Group Counseling", desc: "Peer support reduces isolation and builds accountability throughout recovery." },
  { icon: "ri-mental-health-line", label: "Co-occurring Care", desc: "We treat the depression, anxiety, and trauma that frequently underlie opioid use disorder." },
  { icon: "ri-home-heart-line", label: "Family Therapy", desc: "Rebuilds trust and equips loved ones to support lasting recovery." },
  { icon: "ri-shield-cross-line", label: "Relapse Prevention", desc: "Naloxone education and a concrete plan for high-risk moments protect your progress." },
];

const FAQS = [
  { q: "Is opioid withdrawal dangerous?", a: "Opioid withdrawal is rarely life-threatening on its own, but it is intensely uncomfortable and dehydration from vomiting and diarrhea can become serious. Medical supervision makes withdrawal safer and far more tolerable, and dramatically improves the odds of staying in treatment." },
  { q: "Do you serve Jefferson City?", a: "Yes. We treat clients from Jefferson City and across central Missouri — in person in Springfield and statewide through secure telehealth outpatient programming." },
  { q: "What is MAT and do you offer it?", a: "Medication-assisted treatment (MAT) combines FDA-approved medications like buprenorphine or naltrexone with counseling. We coordinate MAT as part of a comprehensive plan to reduce cravings and support recovery." },
  { q: "How long does opioid treatment take?", a: "It varies by individual. Many clients move through PHP or IOP over several weeks, then step down to outpatient and aftercare. Length of care depends on severity, co-occurring conditions, and your support system." },
  { q: "Does insurance cover opioid treatment?", a: "Yes — opioid use disorder treatment is covered by most private insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health, and verify your benefits before admission." },
];

export default function OpiateWithdrawalPage() {
  return (
    <SubstancePageLayout
      substanceName="Opioid Withdrawal"
      heroHeading="Opioid & Opiate Withdrawal Help"
      heroSubcopy="Compassionate, medically informed opioid withdrawal and recovery support for Jefferson City and central Missouri — combining MAT coordination, therapy, and relapse prevention."
      stats={[
        { value: "MAT", label: "Medication-assisted treatment coordinated" },
        { value: "PHP + IOP", label: "Multiple levels of care available" },
        { value: "Statewide", label: "Virtual care across Missouri" },
      ]}
      currentPath="/withdraw-from-opioid-help-jefferson-city"
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
                Getting through opioid withdrawal safely.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Opioid withdrawal — whether from heroin, fentanyl, or prescription painkillers — can feel overwhelming. The physical symptoms peak within a few days, but the fear of withdrawal keeps many people trapped in the cycle of use. You don&apos;t have to face it alone.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Our team coordinates medication-assisted treatment to ease symptoms and pairs it with the therapy, structure, and support that make lasting recovery possible.
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
              <Image src={SITE_IMAGES.therapyGroup} alt="Opioid recovery counseling in Missouri" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">MAT</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-white/50">Supported Detox</p>
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
                Signs of opioid withdrawal.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Symptoms usually begin 8–24 hours after the last dose and intensify over the following days. Knowing what to expect — and having support — makes all the difference.
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
              Opioid recovery programs at MBH.
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
              How we treat opioid use disorder.
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
                Coverage for opioid treatment.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/65">
                Opioid use disorder treatment is a covered benefit under most private health insurance plans. We accept Aetna, Anthem, BCBS, Cigna, Beacon Health, Carelon, GEHA, and Cox Health. Benefits verified before admission at no cost to you.
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
