"use client";

import Link from "next/link";
import { useState } from "react";

const SCHEDULE_CTA = "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";
const cx = "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12";

// ── Data ─────────────────────────────────────────────────────────────────────

const heroStats = [
  { icon: "ri-capsule-line", label: "Peptide protocols", value: "35+" },
  { icon: "ri-heart-pulse-line", label: "Starting price", value: "$200/Mo" },
  { icon: "ri-stethoscope-line", label: "Initial consultation", value: "$200" },
];

const consultationIncludes = [
  "Metabolic assessment",
  "Peptide protocol evaluation",
  "Dosing strategy",
  "Prescription included",
];

type Category = "gh" | "recovery" | "metabolic" | "cognitive" | "hormonal" | "longevity";

type Peptide = {
  name: string;
  badge: string;
  badgeBg: string;
  description: string;
  price: string;
  delivery: string;
  href: string;
  category: Category;
};

// Rotating badge palette
const TONES = [
  "bg-[#C67B5C] text-white",
  "bg-[#3d4c36] text-white",
  "bg-[#2B81AA] text-white",
];
const tone = (i: number) => TONES[i % TONES.length];

const peptides: Peptide[] = [
  // ── Growth Hormone Support ──────────────────────────────────────────
  {
    name: "Sermorelin",
    badge: "GH Foundation",
    badgeBg: tone(0),
    description:
      "Stimulates your own natural growth hormone production — working with your biology rather than bypassing it.",
    price: "$350/Mo",
    delivery: "Nightly injection",
    href: "/sermorelin/",
    category: "gh",
  },
  {
    name: "CJC-1295 / Ipamorelin",
    badge: "Synergistic GH",
    badgeBg: tone(1),
    description:
      "Dual-pathway GH stack with extended release and minimal side effects — superior to single-agent therapy.",
    price: "$500/Mo",
    delivery: "3–5x per week injection",
    href: "/cjc-ipamorelin/",
    category: "gh",
  },
  {
    name: "Tesamorelin",
    badge: "Fat Specialist",
    badgeBg: tone(2),
    description:
      "FDA-approved for targeted visceral fat reduction — clinically proven to reduce dangerous belly fat.",
    price: "$400/Mo",
    delivery: "Daily injection",
    href: "/tesamorelin/",
    category: "gh",
  },
  {
    name: "GHRP-6",
    badge: "GH Secretagogue",
    badgeBg: tone(0),
    description:
      "Potent ghrelin mimetic that stimulates the pituitary to release growth hormone via the ghrelin receptor pathway.",
    price: "$310/Mo",
    delivery: "3x daily injection",
    href: "/ghrp-6/",
    category: "gh",
  },
  {
    name: "IGF-LR3",
    badge: "Anabolic GF",
    badgeBg: tone(1),
    description:
      "Modified IGF-1 with extended half-life — directly stimulates muscle cell growth, fat oxidation, and tissue repair.",
    price: "$300/Mo",
    delivery: "Daily injection",
    href: "/igf-lr3/",
    category: "gh",
  },

  // ── Recovery & Healing ──────────────────────────────────────────────
  {
    name: "BPC-157",
    badge: "Cellular Repair",
    badgeBg: tone(0),
    description:
      "Gastric pentadecapeptide with profound healing properties for tendons, ligaments, muscle, gut, and nerve tissue.",
    price: "$300/Mo",
    delivery: "Daily injection",
    href: "/bpc-157/",
    category: "recovery",
  },
  {
    name: "TB-500",
    badge: "Regenerative",
    badgeBg: tone(1),
    description:
      "Promotes cell migration to injury sites, angiogenesis, and rapid repair of muscle, tendon, and ligament tissue.",
    price: "$300/Mo",
    delivery: "Daily injection",
    href: "/tb-500/",
    category: "recovery",
  },
  {
    name: "Wolverine Stack",
    badge: "Recovery Stack",
    badgeBg: tone(2),
    description:
      "Gold-standard BPC-157 + TB-500 stack used by elite athletes — 2–3x faster healing of injuries.",
    price: "$400/Mo",
    delivery: "Daily injection",
    href: "/wolverine-stack/",
    category: "recovery",
  },
  {
    name: "KPV",
    badge: "Anti-Inflammatory",
    badgeBg: tone(0),
    description:
      "Tripeptide derived from alpha-MSH that inhibits inflammatory pathways in gut and skin — highly effective for IBD and colitis.",
    price: "$295/Mo",
    delivery: "Oral or injectable",
    href: "/kvp/",
    category: "recovery",
  },
  {
    name: "Glow Stack",
    badge: "Aesthetic Blend",
    badgeBg: tone(1),
    description:
      "Three-peptide aesthetic protocol for comprehensive skin, hair, and soft tissue improvement.",
    price: "$600/Mo",
    delivery: "Daily injection",
    href: "/glow-stack/",
    category: "recovery",
  },

  // ── Metabolic & Fat Loss ────────────────────────────────────────────
  {
    name: "NAD+",
    badge: "Cellular Energy",
    badgeBg: tone(0),
    description:
      "Restores the coenzyme that powers mitochondria, DNA repair, and longevity proteins. Levels drop 50% by age 50.",
    price: "$200/Mo",
    delivery: "Oral or IV infusion",
    href: "/nad/",
    category: "metabolic",
  },
  {
    name: "MOTS-c",
    badge: "Mitochondrial",
    badgeBg: tone(1),
    description:
      "Mitochondrial peptide that improves insulin sensitivity, fat metabolism, and exercise capacity.",
    price: "$450/Mo",
    delivery: "2–3x per week injection",
    href: "/mots-c/",
    category: "metabolic",
  },
  {
    name: "AOD-9604",
    badge: "Fat Loss",
    badgeBg: tone(2),
    description:
      "Synthetic GH fragment that mimics fat-burning effects without affecting blood sugar or IGF-1 levels.",
    price: "$280/Mo",
    delivery: "Daily injection",
    href: "/aod-9604/",
    category: "metabolic",
  },
  {
    name: "SS-31",
    badge: "Mitochondrial",
    badgeBg: tone(0),
    description:
      "Elamipretide — cell-permeable tetrapeptide that stabilizes cardiolipin and restores mitochondrial structure and function.",
    price: "$285/Mo",
    delivery: "3–5x weekly injection",
    href: "/ss-31/",
    category: "metabolic",
  },
  {
    name: "5-Amino-1MQ",
    badge: "Metabolic",
    badgeBg: tone(1),
    description:
      "NNMT inhibitor that raises NAD+ in adipose tissue, activates SIRT1 pathways, and reduces fat storage.",
    price: "$285/Mo",
    delivery: "Oral daily",
    href: "/5-amino-1mq/",
    category: "metabolic",
  },
  {
    name: "SLU-PP-332",
    badge: "Exercise Mimetic",
    badgeBg: tone(2),
    description:
      "ERRα agonist that mimics aerobic exercise — stimulates mitochondrial biogenesis and endurance at the genetic level.",
    price: "$400/Mo",
    delivery: "Oral or injectable",
    href: "/slu-pp-332/",
    category: "metabolic",
  },
  {
    name: "Adipotide",
    badge: "Fat Targeting",
    badgeBg: tone(0),
    description:
      "Proapoptotic peptide that targets blood vessels supplying white adipose tissue for direct fat-cell reduction.",
    price: "$305/Mo",
    delivery: "Subcutaneous injection",
    href: "/adipotide/",
    category: "metabolic",
  },

  // ── Cognitive & Neuro ───────────────────────────────────────────────
  {
    name: "Semax",
    badge: "Cognitive",
    badgeBg: tone(0),
    description:
      "Synthetic heptapeptide that elevates BDNF and dopaminergic signaling — reliable improvements in focus, memory, and executive function.",
    price: "$295/Mo",
    delivery: "Intranasal or injectable",
    href: "/semax/",
    category: "cognitive",
  },
  {
    name: "Selank",
    badge: "Anxiolytic",
    badgeBg: tone(1),
    description:
      "Anxiolytic neuropeptide that works through GABA-A modulation and BDNF elevation — calm focus without sedation.",
    price: "$295/Mo",
    delivery: "Intranasal or injectable",
    href: "/selank/",
    category: "cognitive",
  },
  {
    name: "DSIP",
    badge: "Sleep Peptide",
    badgeBg: tone(2),
    description:
      "Delta sleep-inducing peptide — promotes deep restorative slow-wave sleep critical for GH release and recovery.",
    price: "$280/Mo",
    delivery: "Injectable before sleep",
    href: "/dsip/",
    category: "cognitive",
  },
  {
    name: "Dihexa",
    badge: "Nootropic",
    badgeBg: tone(0),
    description:
      "HGF-derived small molecule that promotes synaptogenesis — up to 10 million times more potent than BDNF at forming new neural connections.",
    price: "$290/Mo",
    delivery: "Oral or subcutaneous",
    href: "/dihexa/",
    category: "cognitive",
  },
  {
    name: "PE-22-28",
    badge: "Antidepressant",
    badgeBg: tone(1),
    description:
      "Spadin analogue that inhibits TREK-1 channels — rapid antidepressant effects within days rather than weeks.",
    price: "$285/Mo",
    delivery: "Intranasal or injectable",
    href: "/pe-22-28/",
    category: "cognitive",
  },
  {
    name: "Pinealon",
    badge: "Neuroprotective",
    badgeBg: tone(2),
    description:
      "Pineal-derived tripeptide with neuroprotective, antioxidant, and circadian-modulating properties.",
    price: "$280/Mo",
    delivery: "Injectable or intranasal",
    href: "/pinealon/",
    category: "cognitive",
  },
  {
    name: "Ara-290",
    badge: "Neuroprotective",
    badgeBg: tone(0),
    description:
      "EPO-derived peptide with potent neuroprotective, anti-inflammatory, and metabolic benefits — clinical evidence for diabetic neuropathy.",
    price: "$285/Mo",
    delivery: "Subcutaneous injection",
    href: "/ara-290/",
    category: "cognitive",
  },

  // ── Sexual & Hormonal ───────────────────────────────────────────────
  {
    name: "PT-141",
    badge: "Sexual Health",
    badgeBg: tone(0),
    description:
      "FDA-approved melanocortin agonist that activates central nervous system arousal pathways in men and women.",
    price: "$295/Mo",
    delivery: "Injection or intranasal",
    href: "/pt-141/",
    category: "hormonal",
  },
  {
    name: "Oxytocin",
    badge: "Bonding",
    badgeBg: tone(1),
    description:
      "Natural bonding hormone — enhances emotional bonding, reduces social anxiety, and improves intimate experiences.",
    price: "$305/Mo",
    delivery: "Intranasal or subcutaneous",
    href: "/oxytocin/",
    category: "hormonal",
  },
  {
    name: "Kisspeptin-10",
    badge: "Hormonal Regulator",
    badgeBg: tone(2),
    description:
      "Most potent activator of the HPG axis — restores natural hormonal function and fertility in men and women.",
    price: "$295/Mo",
    delivery: "Subcutaneous injection",
    href: "/kisspeptin-10/",
    category: "hormonal",
  },
  {
    name: "Melanotan II",
    badge: "Melanocortin",
    badgeBg: tone(0),
    description:
      "α-MSH analogue that stimulates melanogenesis (tanning), enhances sexual function, and reduces appetite.",
    price: "$295/Mo",
    delivery: "Subcutaneous injection",
    href: "/melanotan-ii/",
    category: "hormonal",
  },

  // ── Longevity & Aesthetics ──────────────────────────────────────────
  {
    name: "Thymosin Alpha-1",
    badge: "Immune Modulator",
    badgeBg: tone(0),
    description:
      "Naturally occurring peptide that regulates and enhances immune function — used in oncology and longevity protocols.",
    price: "$295/Mo",
    delivery: "Subcutaneous injection",
    href: "/thymosin-alpha-1/",
    category: "longevity",
  },
  {
    name: "Epithalon",
    badge: "Longevity",
    badgeBg: tone(1),
    description:
      "Synthetic pineal peptide that activates telomerase — extends telomeres and regulates circadian and endocrine function.",
    price: "$285/Mo",
    delivery: "Injectable cycles",
    href: "/epithalon/",
    category: "longevity",
  },
  {
    name: "Thymalin",
    badge: "Thymic Restore",
    badgeBg: tone(2),
    description:
      "Polypeptide complex that restores thymic function and immune competence — strong evidence in aging populations.",
    price: "$280/Mo",
    delivery: "Subcutaneous cycles",
    href: "/thymalin/",
    category: "longevity",
  },
  {
    name: "GHK-Cu",
    badge: "Cellular Repair",
    badgeBg: tone(0),
    description:
      "Copper peptide that regulates 4,000+ genes to signal wound healing, collagen synthesis, and tissue repair.",
    price: "$285/Mo",
    delivery: "Injection or topical",
    href: "/ghk-cu/",
    category: "longevity",
  },
  {
    name: "KLOW",
    badge: "Aesthetic Stack",
    badgeBg: tone(1),
    description:
      "Physician-formulated aesthetic peptide stack for comprehensive skin quality and hair optimization.",
    price: "$450/Mo",
    delivery: "3–5x per week",
    href: "/klow/",
    category: "longevity",
  },
  {
    name: "Glutathione",
    badge: "Master Antioxidant",
    badgeBg: tone(2),
    description:
      "Body's primary intracellular antioxidant — neutralizes free radicals, supports detoxification, declines with age.",
    price: "$265/Mo",
    delivery: "IV or subcutaneous",
    href: "/glutathione/",
    category: "longevity",
  },
  {
    name: "LL-37",
    badge: "Antimicrobial",
    badgeBg: tone(0),
    description:
      "Human cathelicidin antimicrobial peptide with antibacterial, antiviral, and immune-modulatory properties.",
    price: "$295/Mo",
    delivery: "Injection or topical",
    href: "/ll-37/",
    category: "longevity",
  },
];

type FilterTab = "all" | Category;

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Peptides" },
  { id: "gh", label: "Growth Hormone" },
  { id: "recovery", label: "Recovery & Healing" },
  { id: "metabolic", label: "Metabolic & Fat Loss" },
  { id: "cognitive", label: "Cognitive & Neuro" },
  { id: "hormonal", label: "Sexual & Hormonal" },
  { id: "longevity", label: "Longevity & Aesthetics" },
];

const peptideGroups: { id: Category; label: string; subtitle: string }[] = [
  { id: "gh", label: "Growth Hormone Support", subtitle: "Peptides that stimulate natural GH production" },
  { id: "recovery", label: "Recovery & Healing", subtitle: "Tissue repair, healing, and anti-inflammatory protocols" },
  { id: "metabolic", label: "Metabolic & Fat Loss", subtitle: "Mitochondrial, energy, and body composition optimization" },
  { id: "cognitive", label: "Cognitive & Neuro", subtitle: "Focus, mood, sleep, and neuroprotection" },
  { id: "hormonal", label: "Sexual & Hormonal", subtitle: "Libido, intimacy, and HPG-axis restoration" },
  { id: "longevity", label: "Longevity & Aesthetics", subtitle: "Cellular aging, immune resilience, and skin quality" },
];

const processSteps = [
  { icon: "ri-questionnaire-line", title: "Answer Questions", duration: "2 minutes", description: "Quick intake, no guessing. Our secure medical questionnaire covers your history, symptoms, and goals." },
  { icon: "ri-calendar-check-line", title: "Book Your Time", duration: "24 hours", description: "Video visit on your schedule. Licensed physician reviews your case and schedules a personalized consultation." },
  { icon: "ri-truck-line", title: "Get Your Plan", duration: "2–3 Days", description: "Prescriptions shipped discreetly. Custom treatment plan with meds delivered to your door in discreet packaging." },
  { icon: "ri-line-chart-line", title: "Track Progress", duration: "Ongoing", description: "24/7 messaging with your care team and unlimited prescription adjustments." },
];

const benefits = [
  { icon: "ri-heart-pulse-line", title: "Stimulate, don't replace", description: "Sermorelin works with your own pituitary — preserving natural feedback loops that synthetic HGH bypasses." },
  { icon: "ri-flashlight-line", title: "Cellular energy restoration", description: "NAD+ replenishment restores the coenzyme that powers mitochondria, sirtuins, and DNA repair enzymes." },
  { icon: "ri-user-heart-line", title: "Physician-designed protocols", description: "Your protocol is built around your bloodwork, lifestyle, and goals — not a generic template." },
];

const faqs = [
  { q: "Are peptides the same as steroids or synthetic HGH?", a: "No. Peptides like Sermorelin are secretagogues — they stimulate your body's own gland to produce hormones naturally, rather than introducing synthetic hormones from outside. This preserves your body's natural feedback loops and is considered a safer, more physiological approach than direct HGH replacement." },
  { q: "Who is a good candidate for peptide therapy?", a: "Adults over 30 noticing declining energy, muscle recovery, sleep quality, or body composition changes are often good candidates. Our physician intake will assess your current health status and goals to determine the most appropriate protocol." },
  { q: "How long does it take to feel results?", a: "Timeline varies by peptide. Some benefits like improved sleep quality (Sermorelin) or energy (NAD+) can be noticed within 1–2 weeks. Body composition and aesthetic changes typically become visible after 2–3 months of consistent use." },
  { q: "Can I combine multiple peptides together?", a: "Yes. Many of our patients run combination protocols — such as a GH secretagogue with NAD+ for comprehensive metabolic and cellular optimization. Your provider will create an integrated protocol if appropriate for your goals." },
  { q: "What's the difference between the 'stacks' and individual peptides?", a: "Stacks like Glow and Wolverine are pre-formulated combinations designed for synergistic benefits — often more effective and convenient than taking individual peptides separately. Your physician will recommend individual vs. stack based on your specific goals." },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <i className="ri-check-line shrink-0 text-[#C67B5C]" aria-hidden />
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
        <i className={`ri-arrow-down-s-line shrink-0 text-xl text-[#C67B5C] transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && <p className="pb-5 text-sm leading-7 text-[#555]">{a}</p>}
    </div>
  );
}

function PeptideCard({ p }: { p: Peptide }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#E8E2D9]">
      <div className="flex items-start justify-between gap-3">
        <span className={`shrink-0 rounded-full px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${p.badgeBg}`}>
          {p.badge}
        </span>
        <Link
          href={p.href}
          className="flex shrink-0 items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[#C67B5C] hover:underline"
        >
          <i className="ri-arrow-right-line" aria-hidden />
          Learn More
        </Link>
      </div>
      <h3 className="mt-4 font-serif text-xl text-[#2A2A2A]">{p.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-[#555]">{p.description}</p>
      <div className="mt-5 flex items-end justify-between border-t border-[#E8E2D9] pt-4">
        <p className="font-serif text-xl font-semibold text-[#C67B5C]">{p.price}</p>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#888]">{p.delivery}</p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function PeptidesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const visibleGroups = peptideGroups.filter(
    (g) => activeFilter === "all" || activeFilter === g.id
  );

  return (
    <div className="bg-[#FAF7F4] text-[#3A3A3A]">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] pb-16 pt-12 md:pb-20 md:pt-16">
        <div className={cx}>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px] lg:gap-14">

            {/* Left */}
            <div className="pt-2">
              <nav className="mb-4 text-xs text-[#888]">
                <Link href="/" className="hover:text-[#C67B5C]">Home</Link>
                <span className="mx-2">-</span>
                <span>Peptides</span>
              </nav>
              <h1 className="font-serif text-4xl leading-[1.1] text-[#2A2A2A] md:text-5xl lg:text-[3.2rem]">
                Peptide{" "}
                <span className="text-[#C67B5C]">Protocols</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#555]">
                Browse 35+ physician-prescribed peptide protocols across six categories — growth
                hormone, recovery, metabolic, cognitive, hormonal, and longevity. Click any
                protocol for detailed information.
              </p>

              {/* Stats */}
              <div className="mt-8 space-y-4 border-t border-[#E8E2D9] pt-6">
                {heroStats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <i className={`${s.icon} text-base text-[#C67B5C]`} aria-hidden />
                      <span className="text-sm text-[#555]">{s.label}</span>
                    </div>
                    <p className="font-serif text-2xl font-semibold text-[#2A2A2A]">{s.value}</p>
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

            {/* Right — consultation card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#E8E2D9]">
              <div className="px-8 pt-7 pb-5 text-center">
                <p className="font-serif text-xl text-[#2A2A2A]">Peptide Consultation</p>
                <p className="mt-1 text-sm text-[#888]">Weight loss &amp; longevity support</p>
              </div>
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
              <div className="px-8 pt-5 pb-7">
                <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#888]">
                  What&apos;s Included:
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

      {/* ── Peptide Catalog ──────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                  activeFilter === tab.id
                    ? "bg-[#3d4c36] text-white shadow-sm"
                    : "bg-[#FAF7F4] text-[#555] ring-1 ring-[#D8D3CC] hover:bg-[#F0EBE4]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-10 border-t border-[#E8E2D9]" />

          {/* Grouped cards */}
          <div className="space-y-14 pt-12">
            {visibleGroups.map((group) => {
              const groupPeptides = peptides.filter((p) => p.category === group.id);
              return (
                <div key={group.id}>
                  <div className="mb-8 text-center">
                    <h2 className="font-serif text-2xl text-[#2A2A2A] md:text-[1.85rem]">
                      {group.label}
                    </h2>
                    <p className="mt-1 text-sm text-[#888]">{group.subtitle}</p>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {groupPeptides.map((p) => (
                      <PeptideCard key={p.name} p={p} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust strip ──────────────────────────────────────────────── */}
      <section className="bg-[#C67B5C] py-5">
        <div className={cx}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: "ri-user-heart-line", label: "Licensed Metabolic MDs" },
              { icon: "ri-time-line", label: "24h Clinical Review" },
              { icon: "ri-customer-service-line", label: "Ongoing Provider Support" },
              { icon: "ri-map-pin-2-line", label: "Ships to US" },
            ].map((b) => (
              <span key={b.label} className="flex items-center gap-2.5 text-sm font-semibold text-white">
                <i className={`${b.icon} text-base text-white/70`} aria-hidden />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simple Process ────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Simple Process
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              From click to care in days, not weeks.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              No waiting rooms. No insurance hassles. 94% of patients start treatment within 48 hours.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-[#E8E2D9]">
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
                <p className="mt-2 text-sm leading-6 text-[#666]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not anti-aging. Pro-longevity. ────────────────────────────── */}
      <section className="bg-white py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
              Not anti-aging.{" "}
              <span className="text-[#C67B5C]">Pro-longevity.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555]">
              GLP-1 and dual-agonist therapies don't just reduce the number on the scale. They
              improve the underlying metabolic conditions that make sustained weight management so
              difficult.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-3xl bg-[#FAF7F4] p-7 ring-1 ring-[#E8E2D9]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C67B5C]/12 text-[#C67B5C]">
                  <i className={`${b.icon} text-xl`} aria-hidden />
                </span>
                <h3 className="mt-4 font-serif text-lg text-[#2A2A2A]">{b.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555]">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-16 md:py-20">
        <div className={cx}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
                Common Questions
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#2A2A2A] md:text-[2.2rem]">
                Everything you need to know about peptide therapy
              </h2>
            </div>
            <div className="mt-10 rounded-3xl bg-white px-8 py-2 shadow-sm ring-1 ring-[#E8E2D9]">
              {faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
