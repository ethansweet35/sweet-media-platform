import { MedicationPage, type MedicationPageData } from "@/components/pages/medication/MedicationPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: MedicationPageData = {
  slug: "tirzepatide",
  efficacyTier: "High Efficiency",
  name: "Tirzepatide",
  headline: "Lose Weight With Medical Precision",
  startingPrice: "Starting at $340",
  description:
    "Tirzepatide simultaneously activates two distinct metabolic hormone receptors — GLP-1 and GIP — producing weight loss outcomes previously only achievable with bariatric surgery.",
  heroImage: `${IMG}/ChatGPT-Image-May-2-2026-02_38_47-PM.png`,

  features: [
    {
      icon: "ri-links-line",
      title: "Dual-receptor activation",
      subtitle: "GLP-1 + GIP simultaneously",
      description:
        "Most GLP-1 medications activate a single hormone pathway. Tirzepatide targets two — GLP-1 and GIP — creating a synergistic metabolic reset that produces significantly stronger results.",
    },
    {
      icon: "ri-arrow-up-line",
      title: "Unmatched efficacy",
      subtitle: "~21% average weight loss",
      description:
        "In SURMOUNT-1, tirzepatide produced more than double the average weight loss of lifestyle intervention alone, and meaningfully outperformed prior GLP-1 monotherapy in head-to-head comparisons.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Beyond the scale",
      subtitle: "Systemic metabolic benefits",
      description:
        "Beyond weight, clinical trials document significant improvements in A1C, LDL cholesterol, blood pressure, triglycerides, and markers of liver fat — addressing the full metabolic syndrome.",
    },
  ],

  howItWorks: {
    title: "Two receptors. One weekly injection.",
    description:
      "Traditional GLP-1 medications mimic a single gut hormone. Tirzepatide was engineered to simultaneously activate both the GLP-1 and GIP receptors — two distinct pathways that, when triggered together, produce a metabolic response far greater than either alone.",
    pathways: [
      {
        label: "GLP-1 Pathway",
        items: [
          "Slows gastric emptying — food moves through your stomach more slowly, extending fullness",
          "Signals the brain's satiety centers to reduce hunger and 'food noise'",
          "Stimulates insulin release in a glucose-dependent, safe manner",
          "Reduces glucagon, preventing inappropriate blood sugar spikes",
        ],
      },
      {
        label: "GIP Pathway",
        items: [
          "Enhances the GLP-1 signal — makes satiety signaling more powerful",
          "Improves fat cell metabolism and reduces fat storage efficiency",
          "May support bone density and reduce GI side effects at higher doses",
          "Plays a direct role in the superior body composition outcomes vs. GLP-1 alone",
        ],
      },
    ],
    table: [
      { metric: "Receptors Targeted", value: "GLP-1 + GIP" },
      { metric: "Avg. Weight Loss", value: "~21%" },
      { metric: "Achieved 20%+ Loss", value: "~57%" },
      { metric: "A1C Reduction", value: "~2.0%" },
      { metric: "Dosing Frequency", value: "Once weekly" },
      { metric: "vs. Semaglutide", value: "+6% more weight loss" },
    ],
  },

  trials: [
    {
      name: "SURMOUNT-1 (2022)",
      participants: "2,539 adults with obesity (no diabetes)",
      duration: "72 weeks",
      statValue: "20.9%",
      statLabel: "Mean body weight reduction at 15mg",
      description:
        "The landmark trial that established tirzepatide as the most effective approved obesity medication. At 15mg, 91% of participants achieved at least 5% weight loss, and 57% achieved at least 20% weight loss — a threshold previously only seen with bariatric surgery.",
    },
    {
      name: "SURMOUNT-2 (2023)",
      participants: "938 adults with type 2 diabetes and obesity",
      duration: "72 weeks",
      statValue: "15.7%",
      statLabel: "Body weight reduction in T2D patients",
      description:
        "Demonstrated that tirzepatide achieves profound weight loss even in patients with type 2 diabetes — a population that historically responds less robustly to weight-loss interventions. Also showed superior A1C reduction of 2.01% vs. placebo.",
    },
    {
      name: "SURMOUNT-3 (2023)",
      participants: "806 adults with obesity, pre-treated with lifestyle intervention",
      duration: "72 weeks",
      statValue: "18.4%",
      statLabel: "Additional body weight reduction",
      description:
        "Evaluated tirzepatide in patients who had already achieved weight loss through intensive lifestyle intervention. Results showed that adding tirzepatide produced substantial additional weight loss, demonstrating its efficacy as a complement to lifestyle modification.",
    },
    {
      name: "SURPASS-CVOT (Ongoing)",
      participants: "13,000+ adults with T2D and high CV risk",
      duration: "5-year follow-up",
      statValue: "TBD",
      statLabel: "Cardiovascular outcomes vs. semaglutide",
      description:
        "The largest head-to-head cardiovascular outcomes trial comparing tirzepatide directly to semaglutide. Interim data has already demonstrated non-inferiority; full results expected to show superiority in reducing MACE events.",
    },
  ],

  dosingNote:
    "Tirzepatide is started at a low dose and escalated every 4 weeks. This gradual ramp-up is specifically designed to minimize GI side effects while allowing your body to adapt. Your provider may slow this schedule if needed.",
  dosingSteps: [
    { weeks: "Weeks 1–4", dose: "2.5mg", note: "Starting dose — allows GI adaptation" },
    { weeks: "Weeks 5–8", dose: "5mg", note: "First escalation — appetite suppression begins strongly" },
    { weeks: "Weeks 9–12", dose: "7.5mg", note: "Mid-titration — most patients see significant appetite shift" },
    { weeks: "Weeks 13–16", dose: "10mg", note: "High dose — 5–10% weight loss typically visible" },
    { weeks: "Weeks 17–20", dose: "12.5mg", note: "Near-max — 10–15% weight loss expected range" },
    { weeks: "Week 21+", dose: "15mg", note: "Maximum dose — peak efficacy phase" },
  ],

  sideEffects: [
    {
      name: "Nausea",
      frequency: "Very Common",
      severity: "Mild–Moderate",
      description:
        "Typically resolves in 2–4 weeks. Eating smaller portions and avoiding high-fat meals helps significantly.",
    },
    {
      name: "Constipation",
      frequency: "Common",
      severity: "Mild",
      description:
        "GI motility changes are dose-dependent and usually normalize. Adequate hydration and fiber intake help.",
    },
    {
      name: "Vomiting",
      frequency: "Common",
      severity: "Mild–Moderate",
      description:
        "Most common at initiation and dose escalation. Providers can slow titration pace to minimize this.",
    },
    {
      name: "Decreased Appetite",
      frequency: "Very Common",
      severity: "Intended effect",
      description:
        "This is the primary mechanism. Providers monitor to ensure adequate nutrition is maintained.",
    },
    {
      name: "Fatigue",
      frequency: "Common",
      severity: "Mild",
      description:
        "Usually transient, often in the first weeks. Ensuring a sufficient caloric intake helps.",
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
      q: "Is tirzepatide the same as Mounjaro or Zepbound?",
      a: "Yes. Tirzepatide is the generic/scientific name. Mounjaro is the brand name for the type 2 diabetes indication, and Zepbound is the brand name for the chronic weight management indication — both are the same active compound manufactured by Eli Lilly. Our program may use compounded tirzepatide from a licensed 503B pharmacy during periods of brand-name shortage.",
    },
    {
      q: "How does tirzepatide compare to semaglutide?",
      a: "Tirzepatide activates both GLP-1 and GIP receptors, producing ~21% average weight loss vs. ~15% for semaglutide. In SURMOUNT-1, 57% of tirzepatide patients achieved 20%+ weight loss — a threshold previously associated with bariatric surgery. Semaglutide has a longer safety record; your provider will recommend the best fit based on your history.",
    },
    {
      q: "Who is a good candidate for tirzepatide?",
      a: "Adults with a BMI of 30+ (or 27+ with a weight-related condition) who want the strongest available efficacy. Tirzepatide is also FDA-approved for type 2 diabetes, making it an excellent option for patients managing both conditions simultaneously.",
    },
    {
      q: "Is tirzepatide safe long-term?",
      a: "Tirzepatide has been studied in trials up to 72+ weeks with a well-established safety profile. The most common adverse effects are GI-related and typically transient. Ongoing cardiovascular outcomes trials (SURPASS-CVOT) continue to monitor long-term safety.",
    },
    {
      q: "What happens if I stop taking tirzepatide?",
      a: "Research shows that weight regain is common after stopping GLP-1/GIP medications without lifestyle modification in place. Our program pairs medication with nutritional coaching and sustainable habit guidance so that your results are durable.",
    },
  ],
};

export function TirzepatidePage() {
  return <MedicationPage data={data} />;
}
