"use client";

import { useState } from "react";
import Image from "next/image";
import { heroContentPad } from "@/lib/heroSpacing";
import Link from "next/link";
import { GARDEN_GROVE_IMAGES } from "@/views/home/assets";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const MEDICATIONS = [
  {
    name: "Buprenorphine (Suboxone)",
    icon: "ri-capsule-line",
    tag: "Opioid Use Disorder",
    body: "Buprenorphine is a partial opioid agonist that reduces cravings and withdrawal symptoms without producing significant euphoria. Often combined with naloxone (as Suboxone), it is one of the most effective FDA-approved medications for opioid use disorder. It can be prescribed in office-based settings, making it highly accessible.",
    conditions: ["Heroin addiction", "Prescription opioid dependency", "Fentanyl use disorder", "Methadone transition"],
  },
  {
    name: "Naltrexone (Vivitrol)",
    icon: "ri-shield-check-line",
    tag: "Opioid & Alcohol Use Disorder",
    body: "Naltrexone is an opioid antagonist — it blocks opioid receptors, preventing opioids from producing any pleasurable effect. Available as a daily pill or monthly injection (Vivitrol), it is FDA-approved for both opioid and alcohol use disorder. Naltrexone is non-addictive and has no abuse potential, making it an excellent option for many clients.",
    conditions: ["Opioid use disorder", "Alcohol use disorder", "Post-detox relapse prevention"],
  },
  {
    name: "Methadone",
    icon: "ri-flask-line",
    tag: "Opioid Use Disorder",
    body: "Methadone is a long-acting opioid agonist that reduces cravings and withdrawal when taken in controlled doses. It has a decades-long evidence base for opioid use disorder treatment and is dispensed through federally licensed opioid treatment programs (OTPs). While highly effective, it requires more clinical oversight than buprenorphine due to its longer half-life.",
    conditions: ["Severe opioid use disorder", "Heroin addiction", "Fentanyl dependency"],
  },
  {
    name: "Acamprosate (Campral)",
    icon: "ri-drop-line",
    tag: "Alcohol Use Disorder",
    body: "Acamprosate helps restore the brain's neurochemical balance that alcohol disrupts, reducing post-acute withdrawal symptoms including anxiety, insomnia, and restlessness — the internal discomfort that often drives relapse in early alcohol recovery.",
    conditions: ["Alcohol use disorder", "Post-detox PAWS", "Anxiety-driven relapse risk"],
  },
  {
    name: "Disulfiram (Antabuse)",
    icon: "ri-forbid-line",
    tag: "Alcohol Use Disorder",
    body: "Disulfiram creates a severe adverse reaction when alcohol is consumed — nausea, flushing, and heart palpitations — providing a powerful deterrent to drinking. Most effective when clients are highly motivated and receiving concurrent behavioral therapy.",
    conditions: ["Alcohol use disorder", "Motivated, monitored clients"],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Comprehensive Medical Evaluation",
    body: "Every client receives a full biopsychosocial assessment — substance use history, medical history, co-occurring conditions, and goals — to determine which, if any, medication is clinically appropriate.",
  },
  {
    num: "02",
    title: "Informed Consent & Shared Decision-Making",
    body: "Northbound's physicians walk through every MAT option with clients and families — explaining the benefits, risks, and alternatives — so every treatment decision is made together.",
  },
  {
    num: "03",
    title: "Medical Induction & Monitoring",
    body: "Medications are introduced under physician supervision, with dosing titrated carefully for efficacy and tolerability. Regular monitoring adjusts the plan as recovery progresses.",
  },
  {
    num: "04",
    title: "Integrated Behavioral Therapy",
    body: "MAT is always delivered alongside individual therapy, group counseling, and evidence-based behavioral interventions. Medication reduces the physiological barrier — therapy rebuilds the life.",
  },
  {
    num: "05",
    title: "Tapering & Long-Term Planning",
    body: "Northbound's physicians work with each client on a long-term medication plan — whether that means a planned taper, indefinite maintenance, or transition to a different approach — based on clinical response and individual goals.",
  },
];

const FAQS = [
  {
    q: "Is medication-assisted treatment just replacing one drug with another?",
    a: "This is the most common misconception about MAT. Medications like buprenorphine and naltrexone work differently from addictive drugs — they stabilize brain chemistry rather than producing euphoria or impairment. MAT enables people to engage in therapy, rebuild their lives, and achieve sustained recovery. The research is unambiguous: MAT dramatically improves outcomes and saves lives.",
  },
  {
    q: "Who is a good candidate for MAT?",
    a: "MAT is evidence-based for opioid use disorder and alcohol use disorder. It is not required — many clients recover successfully without medication. Northbound's physicians evaluate each client individually, considering the severity of use, history of relapse, co-occurring conditions, and personal preferences to determine whether MAT is the right fit.",
  },
  {
    q: "How long does medication-assisted treatment last?",
    a: "Duration varies by medication, condition, and clinical response. Some clients use MAT for a defined period (e.g., 6–12 months) before tapering; others remain on maintenance for years. Indefinite buprenorphine or naltrexone maintenance is a clinically valid, evidence-based choice for many individuals with opioid use disorder.",
  },
  {
    q: "Does Northbound provide MAT within its residential and outpatient programs?",
    a: "Yes. MAT is integrated into Northbound's full continuum of care — medical detox, residential, PHP, and IOP. Clients who are on buprenorphine or naltrexone upon admission continue their medications within the program, with ongoing physician oversight and adjustment.",
  },
  {
    q: "Can MAT be used for stimulant addiction (cocaine, meth, amphetamines)?",
    a: "Currently, no FDA-approved medications specifically target stimulant use disorder. However, Northbound's physicians may prescribe medications for co-occurring conditions — depression, ADHD — that support stimulant addiction recovery indirectly.",
  },
  {
    q: "Is MAT covered by insurance?",
    a: "Yes — the Mental Health Parity and Addiction Equity Act (MHPAEA) requires most insurance plans to cover substance use disorder treatment, including MAT, at parity with other medical conditions. Northbound verifies your benefits at no cost before treatment begins. Call (866) 311-0003 for a free check.",
  },
];

export default function MATPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="nb-hero-overlay relative overflow-hidden bg-[#3a6697]">
        <div className="absolute inset-0">
          <Image
            src={GARDEN_GROVE_IMAGES.bedroom}
            alt="Residential room at The Grove — medically supervised MAT at Northbound's Garden Grove campus"
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a6697]/95 via-[#3a6697]/85 to-[#3a6697]/50" />
        </div>
        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e97a52]">
              <AutoLinkedTextClient>{"Clinical Treatment — Northbound Treatment Services"}</AutoLinkedTextClient>
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Medication-<span className="italic text-[#e97a52]">Assisted</span> Treatment
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              <AutoLinkedTextClient>{"MAT combines FDA-approved medications with behavioral therapy and clinical support to treat opioid and alcohol use disorders. It is not a shortcut — it is evidence-based medicine that saves lives and dramatically improves recovery outcomes."}</AutoLinkedTextClient>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#f09068]"
              >
                <i className="ri-phone-fill text-base" />
                Call (866) 311-0003
              </Link>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
              >
                Verify Insurance — Free <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ───────────────────────────────────────────────── */}
      <div className="border-b border-[#3a6697]/20 bg-[#3a6697]/90 py-3.5">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 lg:px-10">
          {[
            { icon: "ri-award-line", text: "DHCS Licensed #300661CP" },
            { icon: "ri-capsule-line", text: "FDA-Approved Medications" },
            { icon: "ri-heart-pulse-line", text: "24/7 Medical Oversight" },
            { icon: "ri-shield-check-line", text: "Evidence-Based Protocols" },
            { icon: "ri-star-fill", text: "4.6 / 5 Google Rating" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5 text-xs font-semibold text-white/65">
              <i className={`${item.icon} text-[#e97a52]`} />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── WHAT IS MAT ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                What Is MAT?
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                Medicine That Makes <span className="italic text-[#e97a52]">Recovery Possible</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedTextClient>{"Medication-assisted treatment (MAT) is the use of FDA-approved medications — in combination with behavioral therapy and counseling — to treat substance use disorders. The Substance Abuse and Mental Health Services Administration (SAMHSA) recognizes MAT as the gold standard for opioid use disorder, and its evidence base for alcohol use disorder is equally strong."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedTextClient>{"MAT works by reducing the physical symptoms — cravings, withdrawal, the compulsive drive to use — that make early recovery so difficult. With those physiological barriers reduced, clients can fully engage in the behavioral therapy that produces lasting change. MAT is not a substitute for therapy; it is a tool that makes therapy possible."}</AutoLinkedTextClient>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedTextClient>{"Research is consistent: clients treated with MAT are significantly more likely to remain in treatment, less likely to relapse, less likely to overdose, and more likely to achieve sustained long-term recovery than those treated without medications. It is, simply, more effective medicine."}</AutoLinkedTextClient>
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={GARDEN_GROVE_IMAGES.bedroom}
                  alt="Residential room at The Grove — medically supervised MAT at Northbound's Garden Grove campus"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#e97a52] px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">3×</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80"><AutoLinkedTextClient>{"Better Outcomes with MAT"}</AutoLinkedTextClient></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEDICATIONS ───────────────────────────────────────────────── */}
      <section className="bg-[#eef2f7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]"><AutoLinkedTextClient>{"FDA-Approved Options"}</AutoLinkedTextClient></p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
              Medications Used in <span className="italic text-[#e97a52]">MAT</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[#64748b]">
              <AutoLinkedTextClient>{"Northbound's physicians evaluate every client individually to determine which medication — if any — is clinically appropriate. There is no one-size-fits-all approach to MAT."}</AutoLinkedTextClient>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MEDICATIONS.map((med) => (
              <div key={med.name} className="bg-white border border-[#cdd8e8] p-7">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#e97a52]/10">
                    <i className={`${med.icon} text-xl text-[#e97a52]`} />
                  </div>
                  <span className="rounded-full bg-[#3a6697]/8 px-3 py-1 text-xs font-semibold text-[#3a6697]">
                    {med.tag}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#3a6697]">{med.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748b]"><AutoLinkedTextClient>{med.body}</AutoLinkedTextClient></p>
                <ul className="mt-4 space-y-2">
                  {med.conditions.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-xs text-[#64748b]">
                      <i className="ri-check-line text-[#e97a52]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW NORTHBOUND INTEGRATES MAT ─────────────────────────────── */}
      <section className="bg-[#3a6697] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">Our Approach</p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-white md:text-5xl">
              How Northbound <span className="italic text-[#e97a52]">Delivers MAT</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {STEPS.map((step) => (
              <div key={step.num} className="border border-white/10 bg-white/5 p-6">
                <p className="font-heading text-4xl font-bold text-[#e97a52]/30"><AutoLinkedTextClient>{step.num}</AutoLinkedTextClient></p>
                <h3 className="font-heading mt-3 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55"><AutoLinkedTextClient>{step.body}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-white/10 pt-12 grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: "38+", label: "Years treating opioid & alcohol dependency" },
              { value: ">97%", label: "Drug abstinence rate (USC study)" },
              { value: "24/7", label: "Medical oversight throughout treatment" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-5xl font-bold text-[#e97a52]"><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/50"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-[#eef2f7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="lg:pt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">Common Questions</p>
              <h2 className="font-heading mt-2 text-4xl font-bold text-[#3a6697] md:text-5xl">
                About <span className="italic text-[#e97a52]">MAT</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#64748b]">
                <AutoLinkedTextClient>{"Have more questions? Our admissions team is available 24/7 with answers — and no obligation."}</AutoLinkedTextClient>
              </p>
              <Link
                href="tel:8663110003"
                className="mt-6 inline-flex items-center gap-2 bg-[#3a6697] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#2d3f5e]"
              >
                <i className="ri-phone-fill" /> (866) 311-0003
              </Link>
            </div>
            <div className="divide-y divide-[#cdd8e8] border border-[#cdd8e8] bg-white">
              {FAQS.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-[#eef2f7]/50"
                  >
                    <span className="font-heading text-sm font-bold text-[#3a6697]">{faq.q}</span>
                    <i className={`ri-arrow-down-s-line mt-0.5 shrink-0 text-xl text-[#e97a52] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-[#cdd8e8] bg-[#eef2f7]/30 px-6 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-[#64748b]"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#e97a52] py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Is MAT Right for You? Let&rsquo;s Find Out Together.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                <AutoLinkedTextClient>{"Northbound&rsquo;s physicians evaluate every client individually — no assumptions, no one-size-fits-all. Call us 24/7 for a free, confidential consultation."}</AutoLinkedTextClient>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-bold text-[#e97a52] shadow-sm transition hover:bg-white/90"
              >
                <i className="ri-phone-fill" /> (866) 311-0003
              </Link>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                Verify Insurance Free <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

