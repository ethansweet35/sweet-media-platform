"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const SUPABASE_IMG =
  "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const SCHEDULE_CTA =
  "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";

const containerCx = "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12";

// ── Data ─────────────────────────────────────────────────────────────────────

const heroStats = [
  { icon: "ri-scales-3-line", value: "20.9%", label: "Average Weight Loss" },
  { icon: "ri-capsule-line", value: "$270/Mo", label: "Medication Starting" },
  { icon: "ri-stethoscope-line", value: "$200", label: "Initial Consultation" },
];

const consultationIncludes = [
  "Metabolic assessment",
  "GLP-1 or peptide evaluation",
  "Dosing strategy",
  "Prescription included",
];

type Medication = {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  delivery: string;
  price: string;
  avgLoss: string;
  features: string[];
  href: string;
};

const medications: Medication[] = [
  {
    id: "semaglutide",
    name: "Semaglutide",
    badge: "Most Prescribed",
    badgeColor: "bg-[#C67B5C]/12 text-[#9A5640]",
    delivery: "Injectable · Once weekly",
    price: "$270 / per month",
    avgLoss: "15%",
    features: [
      "Proven cardiovascular protection",
      "Dramatically reduces food cravings",
      "Targets visceral fat",
    ],
    href: "/semaglutide/",
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    badge: "Mid-Tier",
    badgeColor: "bg-[#2B81AA]/10 text-[#1A5A7A]",
    delivery: "Injectable · Once weekly",
    price: "$345 / per month",
    avgLoss: "20.9%",
    features: [
      "Dual receptor activation",
      "Superior weight loss results",
      "Reduces visceral fat",
    ],
    href: "/tirzepatide/",
  },
  {
    id: "retatrutide",
    name: "Retatrutide",
    badge: "Most Effective",
    badgeColor: "bg-[#6B7456]/10 text-[#4A5436]",
    delivery: "Injectable · Once weekly",
    price: "$300 / per month",
    avgLoss: "24.2%",
    features: [
      "Highest weight loss results",
      "Three receptor pathways",
      "Boosts resting energy expenditure",
    ],
    href: "/retatrutide/",
  },
];

type DeepDive = {
  id: string;
  name: string;
  efficacy: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  evidence: { label: string; detail: string }[];
  timeline: { phase: string; outcome: string }[];
};

const deepDives: DeepDive[] = [
  {
    id: "retatrutide",
    name: "Retatrutide",
    efficacy: "Ultra Efficacy",
    subtitle: "The next frontier in metabolic medicine",
    summary:
      "The world's first triple incretin agonist — activating GLP-1, GIP, and glucagon receptors simultaneously. Early Phase 2 data produced weight loss results that rival bariatric surgery, opening a new chapter in pharmacological obesity treatment.",
    highlights: [
      "Activates GLP-1 + GIP + Glucagon receptors",
      "Strongest weight loss signal of any investigational drug",
      "Glucagon activation boosts resting energy expenditure",
      "Dramatically reduces liver fat (MASLD/NASH benefit)",
      "Superior visceral fat reduction vs. dual agonists",
    ],
    evidence: [
      {
        label: "Phase 2 Trial (NEJM, 2023)",
        detail:
          "Retatrutide 12mg produced 24.2% mean body weight reduction at 48 weeks — the highest ever reported for a pharmacological agent in a controlled trial.",
      },
      {
        label: "Body Composition Sub-study",
        detail:
          "~82% of total weight lost was fat mass, with lean body mass preservation comparable to tirzepatide. Visceral fat volume reduced by >40% from baseline.",
      },
      {
        label: "Liver Fat Sub-study",
        detail:
          "Significant reductions in liver fat content observed even at lower doses, supporting investigation for metabolic-associated steatotic liver disease (MASLD).",
      },
    ],
    timeline: [
      { phase: "Week 1–4", outcome: "Low starting dose; triple-receptor adaptation begins" },
      { phase: "Month 2–3", outcome: "Energy expenditure increase measurable; appetite reduced" },
      { phase: "Month 6", outcome: "15–20% weight loss range in Phase 2 high-dose cohort" },
      { phase: "Month 12+", outcome: "Near-surgical weight loss levels at maximum dose" },
    ],
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    efficacy: "High Efficacy",
    subtitle: "The dual-action standard",
    summary:
      "A first-in-class twincretin that activates both GLP-1 and GIP receptors — two hormone pathways that work together to reset your metabolism more powerfully than either alone.",
    highlights: [
      "Activates GLP-1 + GIP receptors simultaneously",
      "Reduces abdominal & visceral fat",
      "Improves cholesterol & blood pressure",
      "Preserves lean muscle mass",
      "Superior A1C reduction",
    ],
    evidence: [
      {
        label: "SURMOUNT-1 (2022)",
        detail:
          "20.9% mean body weight reduction at 72 weeks with 15mg dose — nearly double the efficacy of earlier GLP-1 monotherapy.",
      },
      {
        label: "SURMOUNT-2 (2023)",
        detail:
          "Participants with type 2 diabetes lost an average of 15.7% body weight, compared to 2.4% for placebo.",
      },
      {
        label: "SURPASS-CVOT",
        detail:
          "Ongoing cardiovascular outcomes trial demonstrating superior glycemic and weight results vs. semaglutide head-to-head.",
      },
    ],
    timeline: [
      { phase: "Weeks 1–4", outcome: "Appetite suppression begins; GI adjustment period" },
      { phase: "Month 3", outcome: "5–8% weight loss typically visible" },
      { phase: "Month 6", outcome: "10–15% weight loss for most patients" },
      { phase: "Month 12+", outcome: "Peak results; maintenance titration begins" },
    ],
  },
  {
    id: "semaglutide",
    name: "Semaglutide",
    efficacy: "Moderate Efficacy",
    subtitle: "The proven GLP-1",
    summary:
      "A once-weekly injectable that targets the brain's hunger centers to reduce cravings and 'food noise' — making it dramatically easier to maintain a calorie deficit without constant willpower.",
    highlights: [
      "Precision GLP-1 receptor agonist",
      "Dramatically reduces food cravings",
      "Targets dangerous visceral fat",
      "Proven cardiovascular protection",
      "Stabilizes blood sugar & energy",
    ],
    evidence: [
      {
        label: "STEP 1 Trial (2021)",
        detail:
          "2.4mg weekly dose produced 14.9% mean weight loss at 68 weeks — a landmark result that reshaped obesity medicine.",
      },
      {
        label: "SELECT Trial (2023)",
        detail:
          "20% reduction in major cardiovascular events (heart attack, stroke) in overweight adults without diabetes — FDA-approved for CV risk reduction.",
      },
      {
        label: "STEP 5 (Long-term)",
        detail:
          "Sustained 15.2% weight loss maintained at 104 weeks, confirming durable efficacy with continued use.",
      },
    ],
    timeline: [
      { phase: "Weeks 1–4", outcome: "Reduced hunger signals; dose titration begins" },
      { phase: "Month 3", outcome: "4–8% weight reduction typical" },
      { phase: "Month 6", outcome: "8–12% weight loss for most patients" },
      { phase: "Month 12+", outcome: "Full 15%+ results; cardiovascular benefits measurable" },
    ],
  },
];

const processSteps = [
  {
    title: "Answer Questions",
    duration: "2 minutes",
    description:
      "Quick intake, no guessing. Our secure medical questionnaire covers your history, symptoms, and goals.",
    icon: "ri-questionnaire-line",
  },
  {
    title: "Book Your Time",
    duration: "24 hours",
    description:
      "Video visit on your schedule. Licensed physician reviews your case and schedules a personalized consultation.",
    icon: "ri-calendar-check-line",
  },
  {
    title: "Get Your Plan",
    duration: "2–3 Days",
    description:
      "Prescriptions shipped discreetly. Custom treatment plan with meds delivered to your door in discreet packaging.",
    icon: "ri-truck-line",
  },
  {
    title: "Track Progress",
    duration: "Ongoing",
    description:
      "24/7 messaging with your care team and unlimited prescription adjustments.",
    icon: "ri-line-chart-line",
  },
];

const benefits = [
  {
    icon: "ri-body-scan-line",
    title: "Body composition, not just scale weight",
    description:
      "Clinical data shows weight loss is primarily driven by fat reduction — with lean muscle mass preserved.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Cardiovascular risk reduction",
    description:
      "Proven to lower blood pressure, improve cholesterol, and reduce the risk of major cardiovascular events.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Physician-guided titration",
    description:
      "Your dose is adjusted monthly based on your response — maximizing results while minimizing side effects.",
  },
];

const faqs = [
  {
    q: "Am I a candidate for GLP-1 medication?",
    a: "GLP-1 medications are typically appropriate for adults with a BMI of 30+ (or 27+ with a weight-related condition like high blood pressure or type 2 diabetes). Our medical intake will help determine if you qualify. Certain conditions — like a personal or family history of medullary thyroid cancer or MEN2 — may make these medications inappropriate.",
  },
  {
    q: "What's the difference between Tirzepatide and Semaglutide?",
    a: "Both are GLP-1 medications, but Tirzepatide (Mounjaro/Zepbound) also activates a second receptor (GIP), producing stronger average weight loss in clinical trials (~21% vs ~15%). Semaglutide has a longer safety track record and may be the right starting point for many patients. Your provider will recommend the best fit based on your health history.",
  },
  {
    q: "What are the common side effects?",
    a: "The most common side effects are gastrointestinal — nausea, constipation, or mild stomach discomfort — particularly when starting or increasing your dose. These typically subside within a few weeks. Our providers use a gradual titration schedule specifically to minimize side effects. Serious adverse events are rare but discussed in detail during your consultation.",
  },
  {
    q: "Is this compounded medication? Is it safe?",
    a: "During periods of FDA-designated shortage, we work with 503B-licensed compounding pharmacies that operate under strict federal oversight and quality standards. All compounds are tested for sterility and potency. Your provider will discuss the source and composition of your specific medication.",
  },
  {
    q: "What happens if I stop taking the medication?",
    a: "Research shows that weight regain is common after stopping GLP-1 medications without lifestyle modification in place. Our program pairs medication with nutritional coaching and sustainable habit guidance so that your results are durable — not just dependent on the drug.",
  },
  {
    q: "Does insurance cover this?",
    a: "Our program is self-pay and not billed to insurance. We believe transparent, predictable pricing is better than insurance complexity. Some patients use HSA/FSA funds. Your provider can supply documentation for insurance reimbursement attempts.",
  },
];

const pricingTiers = [
  {
    label: "Generic Consultation",
    subtitle: "Includes Any & All Services",
    firstVisit: "$400",
    followUp: "$150",
    includes: [
      "Complete health assessment",
      "All service areas covered",
      "Personalized treatment plan",
      "Prescription if appropriate",
    ],
  },
  {
    label: "Specialized Consultation",
    subtitle: "Skin, Hair, Wellness, Labs, Galleri",
    firstVisit: "$300",
    followUp: "$150",
    includes: [
      "Focused specialty review",
      "Lab analysis included",
      "Targeted treatment approach",
      "Follow-up protocol",
    ],
  },
  {
    label: "Peptide Consultation",
    subtitle: "Weight loss & metabolic therapies",
    firstVisit: "$200",
    followUp: "$100",
    includes: [
      "Metabolic assessment",
      "GLP-1 or peptide evaluation",
      "Dosing strategy",
      "Prescription included",
    ],
  },
];

// ── Shared sub-components ─────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <i className="ri-check-line mt-0.5 shrink-0 text-[#C67B5C]" aria-hidden />
      <span className="text-sm text-[#3A3A3A]">{text}</span>
    </li>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E8E2D9] last:border-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-serif text-[1.05rem] text-[#2A2A2A]">{q}</span>
        <i
          className={`ri-arrow-down-s-line shrink-0 text-xl text-[#C67B5C] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && <p className="pb-5 text-sm leading-7 text-[#555]"><AutoLinkedTextClient>{a}</AutoLinkedTextClient></p>}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function WeightLossPage() {
  const [activeTab, setActiveTab] = useState("retatrutide");
  const active = deepDives.find((d) => d.id === activeTab)!;

  return (
    <div className="bg-[#FAF7F4] text-[#3A3A3A]">

      {/* ── Hero: left copy + right consultation card ─────────────────── */}
      <section className="bg-[#FAF7F4] pb-16 pt-12 md:pb-20 md:pt-16">
        <div className={containerCx}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">

            {/* Left — headline + stats + CTA */}
            <div className="pt-2">
              <nav className="mb-4 text-xs text-[#888]">
                <Link href="/" className="hover:text-[#C67B5C]">Home</Link>
                <span className="mx-2">-</span>
                <span>Weight Loss</span>
              </nav>
              <h1 className="font-serif text-4xl leading-[1.1] text-[#2A2A2A] md:text-5xl lg:text-[3.2rem]">
                GLP-1<br />
                <span className="text-[#C67B5C]">Weight Loss Support</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">
                <AutoLinkedTextClient>{"GLP-1 and dual-agonist medications—Tirzepatide and Semaglutide—prescribed\n                by metabolic physicians and delivered to your door. No gimmicks. No guesswork."}</AutoLinkedTextClient>
              </p>

              {/* Stats — icon + label LEFT, value RIGHT (space-between) */}
              <div className="mt-8 space-y-4 border-t border-[#E8E2D9] pt-6">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <i className={`${s.icon} text-base text-[#C67B5C]`} aria-hidden />
                      <span className="text-sm text-[#555]">{s.label}</span>
                    </div>
                    <p className="font-serif text-2xl font-semibold text-[#2A2A2A]"><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
                  </div>
                ))}
              </div>

              <a
                href={SCHEDULE_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#B86B4E]"
              >
                Start Evaluation
              </a>
            </div>

            {/* Right — consultation pricing card (plain white, no colored header) */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#E8E2D9]">
              {/* Title block */}
              <div className="px-8 pt-7 pb-5 text-center">
                <p className="font-serif text-xl text-[#2A2A2A]"><AutoLinkedTextClient>{"Weight Loss Consultation"}</AutoLinkedTextClient></p>
                <p className="mt-1 text-sm text-[#888]"><AutoLinkedTextClient>{"Weight loss &amp; metabolic therapies"}</AutoLinkedTextClient></p>
              </div>

              {/* Price row with vertical divider */}
              <div className="mx-6 grid grid-cols-2 divide-x divide-[#E8E2D9] rounded-xl bg-[#FAF7F4] py-5 ring-1 ring-[#E8E2D9]">
                <div className="px-6 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#888]">First Visit</p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-[#C67B5C]">$200</p>
                </div>
                <div className="px-6 text-center">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#888]">Follow-Up</p>
                  <p className="mt-2 font-serif text-3xl font-semibold text-[#C67B5C]">$100</p>
                </div>
              </div>

              {/* What's included */}
              <div className="px-8 pt-5 pb-7">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  <AutoLinkedTextClient>{"What&apos;s Included:"}</AutoLinkedTextClient>
                </p>
                <ul className="space-y-2.5">
                  {consultationIncludes.map((item) => (
                    <CheckItem key={item} text={item} />
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Three Treatment Paths ─────────────────────────────────────── */}
      <section id="treatment-options" className="bg-white py-16 md:py-20">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Treatment Options
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              Three Treatment Paths
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              <AutoLinkedTextClient>{"Evidence-based medications from proven standards to cutting-edge innovations."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {medications.map((med) => (
              <div
                key={med.id}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#E8E2D9]"
              >
                {/* Header: icon + name + badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C67B5C]/12 text-[#C67B5C]">
                      <i className="ri-syringe-line text-base" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-[#2A2A2A]">{med.name}</h3>
                      <p className="text-[0.7rem] text-[#888]"><AutoLinkedTextClient>{med.delivery}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                  <span className={`shrink-0 self-start rounded-full px-3 py-1 text-[0.62rem] font-semibold ${med.badgeColor}`}>
                    {med.badge}
                  </span>
                </div>

                {/* Price LEFT, avg% RIGHT */}
                <div className="mt-5 flex items-end justify-between border-b border-[#E8E2D9] pb-5">
                  <div>
                    <p className="font-serif text-xl font-semibold text-[#2A2A2A]"><AutoLinkedTextClient>{med.price}</AutoLinkedTextClient></p>
                    <p className="mt-0.5 text-[0.65rem] italic text-[#aaa]">*Based On Dosing*</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-3xl font-semibold text-[#C67B5C]"><AutoLinkedTextClient>{med.avgLoss}</AutoLinkedTextClient></p>
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#888]">Avg. Loss</p>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {med.features.map((f) => <CheckItem key={f} text={f} />)}
                </ul>

                <Link
                  href={med.href}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FAF7F4] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A5640] ring-1 ring-[#E8E2D9] transition hover:bg-[#F0EBE4]"
                >
                  <i className="ri-arrow-right-line" aria-hidden />
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep Dive Tabs ────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={containerCx}>
          {/* Tab buttons — active is dark sage, matches WP */}
          <div className="flex flex-wrap justify-center gap-3">
            {deepDives.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveTab(d.id)}
                className={`rounded-full px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                  activeTab === d.id
                    ? "bg-[#3d4c36] text-white shadow-sm"
                    : "bg-white text-[#555] ring-1 ring-[#D8D3CC] hover:bg-[#F5F0EB]"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
            {/* Left panel */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#E8E2D9]">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#C67B5C]/15 px-3 py-1 text-[0.65rem] font-semibold text-[#9A5640]">
                  {active.efficacy}
                </span>
                <span className="text-[0.72rem] text-[#888]">Once-weekly injection</span>
              </div>
              <h3 className="mt-4 font-serif text-2xl text-[#2A2A2A] md:text-[1.85rem]">
                {active.name}
              </h3>
              <p className="mt-1 text-sm italic text-[#888]"><AutoLinkedTextClient>{active.subtitle}</AutoLinkedTextClient></p>
              <p className="mt-4 text-sm leading-7 text-[#555]"><AutoLinkedTextClient>{active.summary}</AutoLinkedTextClient></p>

              {/* First highlight as a pill chip */}
              <div className="mt-5 flex items-center gap-2.5 rounded-lg bg-[#C67B5C]/10 px-4 py-2.5">
                <i className="ri-flashlight-line text-sm text-[#C67B5C]" aria-hidden />
                <span className="text-xs font-semibold text-[#9A5640]">{active.highlights[0]}</span>
              </div>

              {/* Remaining highlights as small caps list */}
              <ul className="mt-4 space-y-2">
                {active.highlights.slice(1).map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <i className="ri-check-line mt-0.5 shrink-0 text-sm text-[#C67B5C]" aria-hidden />
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.05em] text-[#555]">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right panel — clinical evidence with orange dot bullets */}
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-[#E8E2D9]">
              <p className="mb-5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#888]">
                Clinical Evidence
              </p>
              <div className="divide-y divide-[#F0EBE4]">
                {active.evidence.map((e) => (
                  <div key={e.label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C67B5C]" aria-hidden />
                    <div>
                      <p className="font-semibold text-[#2A2A2A]"><AutoLinkedTextClient>{e.label}</AutoLinkedTextClient></p>
                      <p className="mt-1 text-sm leading-6 text-[#555]"><AutoLinkedTextClient>{e.detail}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mb-4 mt-7 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#888]">
                What to Expect
              </p>
              <div className="space-y-3">
                {active.timeline.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C67B5C]/12 text-[0.62rem] font-bold text-[#C67B5C]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#C67B5C]"><AutoLinkedTextClient>{t.phase}</AutoLinkedTextClient></p>
                      <p className="text-sm text-[#555]"><AutoLinkedTextClient>{t.outcome}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[#999]">
            <AutoLinkedTextClient>{"Results are based on clinical trial data (SURMOUNT-1, STEP 1, PIONEER programs).\n            Individual results vary. Medication prescribed only where clinically appropriate."}</AutoLinkedTextClient>
          </p>
        </div>
      </section>

      {/* ── Simple Process ────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Simple Process
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              From click to care in days, not weeks.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              <AutoLinkedTextClient>{"No waiting rooms. No insurance hassles. 94% of patients start treatment within 48 hours."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="rounded-3xl bg-[#FAF7F4] p-7 ring-1 ring-[#E8E2D9]">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C67B5C]/12 text-[#C67B5C]">
                    <i className={`${step.icon} text-lg`} aria-hidden />
                  </span>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#C67B5C]">
                    {step.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg text-[#2A2A2A]">
                  <span className="mr-1.5 text-sm font-bold text-[#DDD]">0{i + 1}</span>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#666]"><AutoLinkedTextClient>{step.description}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metabolic Transformation ──────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={containerCx}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — image */}
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src={`${SUPABASE_IMG}/women-using-GLP-1-weight-loss-products-1.png`}
                alt="Woman showing results of GLP-1 weight loss treatment"
                width={680}
                height={560}
                className="h-[440px] w-full object-cover"
              />
            </div>

            {/* Right — copy + benefits */}
            <div>
              <h2 className="font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
                Not just weight loss.{" "}
                <span className="text-[#C67B5C]">Metabolic transformation.</span>
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#555]">
                <AutoLinkedTextClient>{"GLP-1 and dual-agonist therapies don't just reduce the number on the scale.\n                They improve the underlying metabolic conditions that make sustained weight\n                management so difficult."}</AutoLinkedTextClient>
              </p>
              <ul className="mt-8 space-y-6">
                {benefits.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C67B5C]/12 text-[#C67B5C]">
                      <i className={`${b.icon} text-xl`} aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-[#2A2A2A]"><AutoLinkedTextClient>{b.title}</AutoLinkedTextClient></p>
                      <p className="mt-1 text-sm leading-6 text-[#555]"><AutoLinkedTextClient>{b.description}</AutoLinkedTextClient></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
                Common Questions
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
                Everything you need to know about medical weight loss
              </h2>
            </div>
            <div className="mt-10 rounded-3xl bg-[#FAF7F4] px-8 py-2 ring-1 ring-[#E8E2D9]">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Consultation Fees (Transparent Pricing) ───────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Transparent Pricing
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              Consultation Fees
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              <AutoLinkedTextClient>{"Physician-guided care with complete pricing clarity."}</AutoLinkedTextClient>
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div key={tier.label} className="flex flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#E8E2D9]">
                <h3 className="font-serif text-xl text-[#2A2A2A]">{tier.label}</h3>
                <p className="mt-1 text-xs text-[#888]"><AutoLinkedTextClient>{tier.subtitle}</AutoLinkedTextClient></p>

                <div className="mt-6 grid grid-cols-2 divide-x divide-[#E8E2D9] rounded-2xl bg-[#FAF7F4] py-4 ring-1 ring-[#E8E2D9]">
                  <div className="px-5 text-center">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#888]">First Visit</p>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-[#C67B5C]"><AutoLinkedTextClient>{tier.firstVisit}</AutoLinkedTextClient></p>
                  </div>
                  <div className="px-5 text-center">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-[#888]">Follow-Up</p>
                    <p className="mt-1.5 font-serif text-2xl font-semibold text-[#C67B5C]"><AutoLinkedTextClient>{tier.followUp}</AutoLinkedTextClient></p>
                  </div>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.includes.map((item) => <CheckItem key={item} text={item} />)}
                </ul>

                <a
                  href={SCHEDULE_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#C67B5C]/35 px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#9A5640] transition hover:bg-[#C67B5C]/6"
                >
                  Get Started
                  <i className="ri-arrow-right-line" aria-hidden />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
