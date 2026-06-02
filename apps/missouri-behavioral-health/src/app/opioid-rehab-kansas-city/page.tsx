import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY } from "@/data/site";

const BODY_IMAGE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/mbh_facility_IMG_6415.jpg";

const fallback: Metadata = {
  title: "Opioid Rehab Kansas City, MO | Missouri Behavioral Health",
  description:
    "Opioid rehab for Kansas City and greater Missouri. MAT coordination, PHP, IOP, outpatient and virtual care for heroin, fentanyl, and prescription opioid use disorder.",
  alternates: { canonical: "/opioid-rehab-kansas-city" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/opioid-rehab-kansas-city", fallback);
}

const SIGNS = [
  "Unable to stop using opioids despite harm to health, work, or relationships",
  "Mood swings, isolation, or secrecy around drug use",
  "Increasing tolerance — needing higher doses than prescribed",
  "Withdrawal symptoms when attempting to stop (aches, nausea, anxiety, cravings)",
  "Doctor shopping or obtaining pills outside medical guidance",
  "Continued use after overdose scares or hospitalizations",
];

const PROGRAMS = [
  {
    icon: "ri-medicine-bottle-line",
    label: "MAT Coordination",
    desc: "Buprenorphine or naltrexone may be coordinated with therapy to reduce cravings and support stability.",
  },
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "Structured daytime treatment with close clinical oversight during early opioid recovery.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "Regular therapy and peer support while maintaining work, family, and community ties.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Telehealth opioid treatment for Kansas City–area clients and families across Missouri.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Assessment & diagnosis",
    desc: "Medical and mental health evaluation identifies substance type, withdrawal risk, dual diagnosis needs, and the right level of care.",
  },
  {
    step: "02",
    title: "Stabilization & MAT",
    desc: "Clinical staff monitor symptoms and coordinate medication-assisted treatment when appropriate to improve comfort and safety.",
  },
  {
    step: "03",
    title: "Therapy & skill-building",
    desc: "Individual, group, and family therapy address triggers, trauma, and behaviors that sustain opioid use.",
  },
  {
    step: "04",
    title: "Relapse prevention",
    desc: "Personalized aftercare planning, naloxone education, and coping strategies protect progress beyond program completion.",
  },
];

const FAQS = [
  {
    q: "What is opioid rehab?",
    a: "Opioid rehab is structured treatment to help you safely stop using heroin, fentanyl, or prescription painkillers. It combines medical support, counseling, and often medication-assisted treatment (MAT) to manage withdrawal and reduce relapse risk.",
  },
  {
    q: "Do you serve the Kansas City area?",
    a: "Yes. We treat clients from Kansas City and across Missouri from our Springfield outpatient campus, with virtual programming available statewide for eligible clients.",
  },
  {
    q: "Is opioid withdrawal dangerous?",
    a: "Opioid withdrawal is rarely life-threatening on its own, but it is intensely uncomfortable and dehydration can become serious without support. Medical oversight and MAT make withdrawal safer and improve the odds of staying in treatment.",
  },
  {
    q: "Does insurance cover opioid treatment?",
    a: "Most private insurance plans cover opioid use disorder treatment. We verify benefits at no cost. We do not accept Medicaid or Medicare.",
  },
];

export default function OpioidRehabKansasCityPage() {
  return (
    <SubstancePageLayout
      substanceName="Opioid Rehab Kansas City"
      heroEyebrow="Service Area · Kansas City, MO"
      heroHeading="Opioid Rehab Kansas City"
      heroSubcopy="Evidence-based opioid addiction treatment for the Kansas City area — MAT coordination, PHP, IOP, and virtual outpatient care from Missouri Behavioral Health."
      stats={[
        { value: "MAT", label: "Medication support coordinated" },
        { value: "PHP · IOP", label: "Outpatient levels of care" },
        { value: "Statewide", label: "Virtual care in Missouri" },
      ]}
      currentPath="/opioid-rehab-kansas-city"
    >
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Overview
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-mbh-forest">
                Opioid rehab at Missouri Behavioral Health.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Opioid rehab helps you stop using prescription painkillers, heroin, or fentanyl with
                medical support, counseling, and medication-assisted treatment when clinically
                appropriate. Every patient receives an individualized plan from experienced nursing,
                medical, and mental health professionals focused on long-term recovery.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Missouri has seen rising opioid-related overdoses, including across the Kansas City
                metro. Accessible outpatient care — with PHP, IOP, and telehealth — helps reduce relapse
                and reconnect people to health, work, and family.
              </p>
              <div className="mt-8 flex gap-3">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-phone-fill" aria-hidden /> Call 24/7
                </a>
                <Link
                  href="/verify-insurance"
                  className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/15 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
                >
                  Verify insurance
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/10">
              <Image
                src={BODY_IMAGE}
                alt="Opioid recovery treatment space at Missouri Behavioral Health in Missouri"
                width={1200}
                height={900}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", objectPosition: "center" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  Signs & Symptoms
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                Signs someone may need opioid rehab.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Behavioral changes — lying, poor hygiene, or loss of motivation — often signal advanced
                opioid use. Professional evaluation can prevent overdose and connect you to care before
                a crisis.
              </p>
            </div>
            <ul className="space-y-3">
              {SIGNS.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-4 rounded-2xl border border-white/6 bg-white/4 px-5 py-4"
                >
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
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Treatment Options
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-mbh-forest">
              How outpatient opioid rehab helps.
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
              Outpatient care lets you receive structured therapy and medical support while maintaining
              daily responsibilities — integrating healthcare, mental health, and peer support for
              long-term recovery.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <div
                key={p.label}
                className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-mbh-forest/8"
              >
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
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Treatment Process
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-mbh-forest">
              The treatment process at Missouri Behavioral Health.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-mbh-forest/8 bg-cream p-7"
              >
                <span className="font-display text-3xl font-bold text-mbh-green/30">{item.step}</span>
                <h3 className="mt-3 font-display text-base font-semibold text-mbh-forest">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  FAQ
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-mbh-forest">
                Common questions.
              </h2>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline"
              >
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
