import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubstancePageLayout from "@/components/addiction/SubstancePageLayout";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { CONTAINER, PHONE_HREF, PHONE_DISPLAY } from "@/data/site";

const BODY_IMAGE =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/mbh_facility_IMG_6414.jpg";

const fallback: Metadata = {
  title: "Drug Rehab St. Louis, MO | Missouri Behavioral Health",
  description:
    "Outpatient drug rehab for St. Louis and greater Missouri. Evidence-based addiction treatment, dual diagnosis care, PHP, IOP, and MAT coordination from our Springfield campus and virtual programs.",
  alternates: { canonical: "/drug-rehab-st-louis" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-rehab-st-louis", fallback);
}

const SIGNS = [
  "Increased stress, poor impulse control, or secretive substance use",
  "Using drugs or alcohol to cope with mood, pain, or trauma",
  "Physical symptoms such as withdrawal discomfort, fatigue, or chronic pain",
  "Drug or alcohol use interfering with work, relationships, or health",
  "Needing larger amounts to achieve the same effect (tolerance)",
  "Continued use despite legal, medical, or family consequences",
];

const PROGRAMS = [
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    desc: "Structured daytime programming with medical and clinical oversight during early recovery.",
  },
  {
    icon: "ri-community-line",
    label: "Intensive Outpatient (IOP)",
    desc: "Therapy and relapse-prevention skills while you continue work, school, or family responsibilities.",
  },
  {
    icon: "ri-calendar-check-line",
    label: "Outpatient Program",
    desc: "Flexible ongoing counseling and psychiatric support as you stabilize long-term recovery.",
  },
  {
    icon: "ri-computer-line",
    label: "Virtual Outpatient",
    desc: "Telehealth addiction treatment for clients in the St. Louis area and across Missouri.",
  },
];

const APPROACH = [
  {
    icon: "ri-brain-line",
    label: "Integrated Dual Diagnosis Care",
    desc: "We treat addiction alongside anxiety, depression, bipolar disorder, PTSD, and trauma — not as separate problems.",
  },
  {
    icon: "ri-medicine-bottle-line",
    label: "Medication Support",
    desc: "Evidence-based medications such as naltrexone may be used to manage cravings and support stability when clinically appropriate.",
  },
  {
    icon: "ri-group-line",
    label: "Group & Individual Therapy",
    desc: "Licensed counselors address behavioral patterns, triggers, and coping skills in one-on-one and group settings.",
  },
  {
    icon: "ri-home-heart-line",
    label: "Family Involvement",
    desc: "Family therapy rebuilds trust and equips loved ones to support recovery after treatment.",
  },
  {
    icon: "ri-shield-check-line",
    label: "Relapse Prevention",
    desc: "Personalized plans identify warning signs, high-risk situations, and practical next steps after program completion.",
  },
  {
    icon: "ri-map-pin-2-line",
    label: "Springfield Campus + Telehealth",
    desc: "In-person care at our Springfield facility with virtual options for St. Louis–area clients who need flexibility.",
  },
];

const FAQS = [
  {
    q: "Do you have a drug rehab center in St. Louis?",
    a: "Our primary outpatient campus is in Springfield, MO. We serve clients from the St. Louis metropolitan area through intensive outpatient, PHP, standard outpatient, and secure virtual programming across Missouri.",
  },
  {
    q: "What is outpatient drug rehab?",
    a: "Outpatient rehab allows you to receive structured therapy, medical support, and relapse-prevention care while living at home. It is ideal when you need professional treatment but do not require 24-hour residential supervision.",
  },
  {
    q: "Do you treat dual diagnosis?",
    a: "Yes. Many people entering drug rehab also struggle with mental health conditions such as anxiety, depression, or bipolar disorder. Integrated treatment improves stability and long-term outcomes.",
  },
  {
    q: "Does insurance cover drug rehab?",
    a: "Most private insurance plans cover substance use disorder treatment. We accept major carriers and verify benefits at no cost before admission. We do not accept Medicaid or Medicare.",
  },
];

export default function DrugRehabStLouisPage() {
  return (
    <SubstancePageLayout
      substanceName="Drug Rehab St. Louis"
      heroEyebrow="Service Area · St. Louis, MO"
      heroHeading="Drug Rehab St. Louis"
      heroSubcopy="Evidence-based outpatient drug and alcohol rehab for the St. Louis area — delivered from our Springfield campus and through statewide virtual care. PHP, IOP, dual diagnosis treatment, and same-day admissions."
      stats={[
        { value: "St. Louis+", label: "Clients served across Missouri" },
        { value: "PHP · IOP", label: "Outpatient levels of care" },
        { value: "24/7", label: "Admissions available" },
      ]}
      currentPath="/drug-rehab-st-louis"
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
                What drug rehab in St. Louis looks like at MBH.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Drug rehab is structured treatment that helps you stop using substances safely and build
                skills for long-term recovery. At Missouri Behavioral Health, we combine psychiatry,
                counseling, and evidence-based supports to address opioids, methamphetamine, alcohol, and
                other substances — including when mental health conditions are part of the picture.
              </p>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Missouri faces serious substance use challenges. St. Louis has among the state&apos;s
                highest rates of emergency visits related to drug and alcohol use. Outpatient rehab
                connects you to professional care without leaving your community — with in-person options
                in Springfield and telehealth for greater flexibility.
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
                alt="Outpatient drug rehab counseling environment at Missouri Behavioral Health"
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
                  Signs You May Need Help
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tight text-white">
                When to seek drug rehab.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Many people delay treatment because they underestimate how serious their use has become.
                If substances are affecting your health, relationships, or daily life, professional care
                can prevent overdose and long-term harm.
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
                How Outpatient Rehab Helps
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-mbh-forest">
              The treatment process at Missouri Behavioral Health.
            </h2>
            <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body">
              Care begins with a full evaluation of substance use history, mental health, and medical
              needs. Your plan may include PHP or IOP, individual and group therapy, family sessions,
              and medication support when appropriate — with step-down care as you progress.
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
                Our Approach
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight text-mbh-forest">
              Integrated care for lasting recovery.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH.map((a) => (
              <div
                key={a.label}
                className="flex items-start gap-4 rounded-2xl border border-mbh-forest/8 bg-cream p-5"
              >
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
