import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "nad", efficacyTier: "Longevity Essential", name: "NAD+", headline: "Fuel every cell",
  startingPrice: "Starting at $200", delivery: "Oral daily or IV monthly", resultsIn: "Results in 1–2 weeks",
  description: "NAD+ (Nicotinamide Adenine Dinucleotide) is the coenzyme that powers hundreds of biological processes — from mitochondrial energy production to DNA repair and sirtuin activation. Levels decline by up to 50% by middle age, contributing to fatigue, cognitive decline, and metabolic dysfunction. Replenishment restores the cellular engine.",
  heroImage: `${IMG}/ChatGPT-Image-May-4-2026-01_03_02-PM.png`,
  mechanismTitle: "The cellular master coenzyme",
  mechanismSubtitle: "NAD+ levels drop by ~50% between ages 40–60. Aging increases NAD+ consumption (more DNA damage, more inflammation) while decreasing production. Replenishing NAD+ through precursors like NMN or NR restores these critical pathways.",
  mechanisms: [
    { name: "Mitochondrial Energy", badge: "ATP Production", description: "NAD+ is required for the electron transport chain — the process by which your mitochondria convert food and oxygen into ATP (cellular energy). Without NAD+, energy production collapses.", result: "Result: Increased ATP production, reduced fatigue, improved physical performance" },
    { name: "Sirtuin Activation", badge: "Longevity Proteins", description: "Sirtuins are longevity proteins that regulate cellular stress response, inflammation, and metabolic health. They absolutely require NAD+ to function — they literally cannot work without it.", result: "Result: Anti-aging gene expression, reduced inflammation, improved metabolic function" },
    { name: "DNA Repair", badge: "PARP Enzymes", description: "PARP enzymes repair DNA damage from UV exposure, toxins, and normal metabolism. PARPs consume massive amounts of NAD+ — when levels are low, DNA damage accumulates and accelerates aging.", result: "Result: Real-time DNA repair, reduced mutation accumulation, cellular longevity" },
  ],
  benefits: [
    { icon: "ri-flashlight-line", title: "Cellular Energy Production", description: "Restores mitochondrial ATP synthesis, reducing fatigue and improving physical performance at the cellular level." },
    { icon: "ri-brain-line", title: "Cognitive Clarity", description: "Reduces brain fog, improves memory, and supports neurological function through enhanced neuronal energy production." },
    { icon: "ri-shield-check-line", title: "Sirtuin Longevity Proteins", description: "Activates sirtuins (SIRT1–7) that protect against aging, inflammation, and metabolic dysfunction." },
    { icon: "ri-dna-line", title: "DNA Repair", description: "Fuels PARP enzymes for real-time DNA damage repair from UV, toxins, and oxidative stress." },
    { icon: "ri-heart-pulse-line", title: "Insulin Sensitivity", description: "Improves glucose metabolism and insulin sensitivity, reducing risk of metabolic syndrome." },
    { icon: "ri-mental-health-line", title: "Neuroprotection", description: "Protects brain cells from age-related decline and may reduce risk of neurodegenerative diseases." },
  ],
  timeline: [
    { phase: "Hours (IV) / Days 1–7 (Oral)", title: "Initial Energy & Clarity", description: "IV NAD+ produces immediate effects. Oral precursors typically show noticeable energy and mental clarity within the first week." },
    { phase: "Weeks 1–2", title: "Cognitive Performance", description: "Reduced brain fog, improved focus, and enhanced mental performance become apparent as neuronal NAD+ levels restore." },
    { phase: "Weeks 2–4", title: "Physical Energy & Recovery", description: "Improved exercise performance, faster recovery, and sustained energy throughout the day as mitochondrial function optimizes." },
    { phase: "Weeks 4–8", title: "Metabolic Improvements", description: "Insulin sensitivity, glucose metabolism, and metabolic markers improve on lab work." },
    { phase: "3–6 Months", title: "Long-Term Cellular Benefits", description: "Sustained sirtuin activation, DNA repair, and anti-aging benefits fully manifest at the cellular level." },
  ],
  faqs: [
    { q: "What is NAD+ and why does it decline with age?", a: "NAD+ is a coenzyme found in every cell essential for energy production, DNA repair, and activating longevity proteins called sirtuins. NAD+ levels decline by up to 50% between ages 40–60 due to increased consumption (DNA damage, inflammation) and decreased production. This decline contributes to age-related fatigue, cognitive decline, and metabolic dysfunction." },
    { q: "What's the difference between oral NAD+ precursors and IV infusions?", a: "Oral NAD+ precursors (NMN or NR) are taken daily and gradually raise NAD+ levels over time — ideal for sustained maintenance. IV infusions deliver NAD+ directly into the bloodstream for immediate, high-dose replenishment — ideal for acute energy crashes, recovery, or initial loading. Many patients start with IV infusions and transition to oral maintenance." },
    { q: "How quickly will I feel the effects?", a: "Oral NAD+ precursors typically produce noticeable energy and mental clarity improvements within 1–2 weeks. IV NAD+ infusions often produce immediate effects — many patients report feeling more energized and mentally clear within hours. The timeline depends on your baseline NAD+ levels and overall health." },
    { q: "Is NAD+ safe for long-term use?", a: "Yes. NAD+ precursors like NMN and NR have been extensively studied and are considered safe for long-term use. They're naturally occurring compounds that your body already produces — you're simply replenishing depleted levels. IV NAD+ has also been used safely in clinical settings for decades." },
  ],
};

export function NadPage() { return <PeptideLandingPage data={data} />; }
