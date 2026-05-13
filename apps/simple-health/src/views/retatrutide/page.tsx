import { MedicationPage, type MedicationPageData } from "@/components/pages/medication/MedicationPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: MedicationPageData = {
  slug: "retatrutide",
  efficacyTier: "Ultra Efficacy",
  name: "Retatrutide",
  headline: "Next-Generation Weight Loss",
  startingPrice: "Starting at $300",
  description:
    "The world's first triple incretin agonist — activating GLP-1, GIP, and glucagon receptors simultaneously. Phase 2 data produced weight loss results that rival bariatric surgery.",
  heroImage: `${IMG}/ChatGPT-Image-May-2-2026-02_25_30-PM.png`,

  features: [
    {
      icon: "ri-links-line",
      title: "Triple-receptor activation",
      subtitle: "GLP-1 + GIP + Glucagon",
      description:
        "Retatrutide is the first investigational drug to simultaneously activate three distinct metabolic hormone receptors — creating a synergistic metabolic response more powerful than any existing approved therapy.",
    },
    {
      icon: "ri-arrow-up-line",
      title: "Unprecedented efficacy",
      subtitle: "24.2% average weight loss",
      description:
        "Phase 2 data produced 24.2% mean body weight reduction at 48 weeks — the highest ever reported for a pharmacological agent in a controlled trial, approaching the outcomes of bariatric surgery.",
    },
    {
      icon: "ri-fire-line",
      title: "Metabolic rate boost",
      subtitle: "Glucagon activation advantage",
      description:
        "Uniquely, retatrutide activates the glucagon receptor — increasing resting energy expenditure and promoting fat oxidation. This 'energy out' mechanism is absent in GLP-1 and dual-agonist therapies.",
    },
  ],

  howItWorks: {
    title: "Three receptors. One weekly injection.",
    description:
      "Retatrutide activates GLP-1, GIP, and glucagon receptors simultaneously. Each pathway contributes a distinct mechanism of action — together producing a metabolic effect far beyond what single or dual-agonist therapies can achieve.",
    pathways: [
      {
        label: "GLP-1 Pathway",
        items: [
          "Slows gastric emptying — food moves through your stomach more slowly, extending fullness",
          "Signals the brain's satiety centers to reduce hunger and 'food noise'",
          "Glucose-dependent insulin release (safe blood sugar control)",
          "Reduces inappropriate glucagon secretion",
        ],
      },
      {
        label: "GIP Pathway",
        items: [
          "Enhances the GLP-1 signal — amplifies satiety signaling",
          "Improves fat cell metabolism and reduces fat storage efficiency",
          "Supports superior body composition outcomes vs. GLP-1 alone",
        ],
      },
      {
        label: "Glucagon Pathway",
        items: [
          "Increases resting metabolic rate and energy expenditure",
          "Promotes mobilization and oxidation of fat stores",
          "Improves body composition — preserves lean mass",
        ],
      },
    ],
    table: [
      { metric: "Receptors Targeted", value: "GLP-1 + GIP + Glucagon" },
      { metric: "Avg. Weight Loss", value: "~24%" },
      { metric: "Achieved 20%+ Loss", value: "~75%" },
      { metric: "vs. Semaglutide", value: "+9% more weight loss" },
      { metric: "vs. Tirzepatide", value: "+3–5% more weight loss" },
      { metric: "Dosing Frequency", value: "Once weekly" },
      { metric: "FDA Status", value: "Phase 3 (investigational)" },
    ],
  },

  trials: [
    {
      name: "Phase 2 Trial (NEJM, 2023)",
      participants: "338 adults with obesity (no diabetes)",
      duration: "48 weeks",
      statValue: "24.2%",
      statLabel: "Mean body weight reduction at 12mg",
      description:
        "The landmark Phase 2 trial that established retatrutide as potentially the most effective obesity medication ever tested. At 48 weeks, 100% of participants on the 12mg dose achieved at least 5% weight loss, and 75% achieved at least 20% weight loss — approaching bariatric surgery outcomes.",
    },
    {
      name: "Phase 3 TRIUMPH-1",
      participants: "~2,100 adults with obesity",
      duration: "104 weeks (2 years)",
      statValue: "TBD",
      statLabel: "Expected superiority vs. tirzepatide",
      description:
        "The first Phase 3 trial directly comparing retatrutide to tirzepatide in participants with obesity. This head-to-head trial will provide definitive evidence of comparative efficacy. Early data suggests retatrutide may produce 3–5% additional weight loss vs. tirzepatide.",
    },
    {
      name: "Phase 3 TRIUMPH-2",
      participants: "~1,900 adults with T2D and obesity",
      duration: "104 weeks",
      statValue: "TBD",
      statLabel: "Weight + glycemic control in diabetes",
      description:
        "Evaluating retatrutide specifically in patients with type 2 diabetes and obesity. Designed to demonstrate superiority over tirzepatide for both weight loss and A1C reduction in this high-need population.",
    },
    {
      name: "Dose-Escalation Study",
      participants: "72 adults with obesity",
      duration: "24 weeks",
      statValue: "Linear",
      statLabel: "Dose-response up to 12mg",
      description:
        "Demonstrated that higher doses of retatrutide continue to produce incremental weight loss without plateauing. The 12mg dose showed the strongest efficacy with manageable side effects. Informed the Phase 3 dosing strategy.",
    },
  ],

  dosingNote:
    "Retatrutide is started at a low dose and escalated every 4 weeks. This gradual ramp-up is specifically designed to minimize GI side effects while allowing your body to adapt. Your provider may slow this schedule if needed.",
  dosingSteps: [
    { weeks: "Weeks 1–4", dose: "2mg", note: "Starting dose — allows GI adaptation" },
    { weeks: "Weeks 5–8", dose: "4mg", note: "First escalation — appetite suppression begins strongly" },
    { weeks: "Weeks 9–12", dose: "6mg", note: "Mid-titration — triple-receptor adaptation continues" },
    { weeks: "Weeks 13–16", dose: "8mg", note: "High dose — 5–10% weight loss typically visible" },
    { weeks: "Weeks 17–20", dose: "10mg", note: "Near-max — 10–15% weight loss expected range" },
    { weeks: "Week 21+", dose: "12mg", note: "Maximum dose — peak efficacy phase" },
  ],

  sideEffects: [
    {
      name: "Nausea",
      frequency: "Very Common",
      severity: "Mild–Moderate",
      description:
        "Most intense during titration. Usually resolves within 2–3 weeks of each dose increase. Eating smaller, more frequent meals helps.",
    },
    {
      name: "Constipation",
      frequency: "Common",
      severity: "Mild",
      description:
        "GI motility slowing is part of mechanism. Adequate hydration, fiber, and physical activity help.",
    },
    {
      name: "Vomiting",
      frequency: "Common",
      severity: "Mild–Moderate",
      description:
        "More common at higher doses or fast titration. Slowing escalation pace reduces incidence significantly.",
    },
    {
      name: "Decreased Appetite",
      frequency: "Very Common",
      severity: "Intended effect",
      description:
        "Primary mechanism of action. Providers monitor to ensure adequate protein and nutrition intake.",
    },
    {
      name: "Fatigue",
      frequency: "Common",
      severity: "Mild",
      description:
        "Usually transient in first weeks after dose increase. Ensuring sufficient caloric intake helps.",
    },
    {
      name: "Diarrhea",
      frequency: "Common",
      severity: "Mild",
      description:
        "Often transient during dose escalation. Stay well-hydrated and consider fiber supplementation.",
    },
  ],

  faqs: [
    {
      q: "What makes retatrutide different from tirzepatide?",
      a: "Retatrutide adds a third receptor — glucagon — to the dual GLP-1/GIP activation of tirzepatide. The glucagon pathway increases resting energy expenditure, creating an 'energy out' effect that dual-agonists lack. Phase 2 data shows ~3–5% additional weight loss vs. tirzepatide.",
    },
    {
      q: "Is retatrutide FDA-approved?",
      a: "Not yet. Retatrutide is currently in Phase 3 clinical trials (TRIUMPH program). Our program offers access under appropriate clinical and compounding pathways. Your provider will discuss current regulatory status and what that means for your care.",
    },
    {
      q: "How does the efficacy compare to bariatric surgery?",
      a: "Phase 2 data showed 24.2% mean weight loss at 48 weeks — approaching the outcomes of laparoscopic sleeve gastrectomy (~25%). Phase 3 trials will determine long-term maintenance, but early data suggests retatrutide may be the first pharmacological therapy to rival surgical outcomes.",
    },
    {
      q: "Who is the best candidate for retatrutide?",
      a: "Patients with a BMI of 35+ who have not achieved adequate results with tirzepatide or semaglutide, or those who want the strongest available efficacy from their first GLP-1 therapy. Your provider will evaluate your health history and goals.",
    },
    {
      q: "What are the Phase 3 trials studying?",
      a: "The TRIUMPH program includes TRIUMPH-1 (obesity, head-to-head vs. tirzepatide), TRIUMPH-2 (type 2 diabetes + obesity), and a cardiovascular outcomes trial. Full results are expected in 2025–2026.",
    },
  ],
};

export function RetatrutidePage() {
  return <MedicationPage data={data} />;
}
