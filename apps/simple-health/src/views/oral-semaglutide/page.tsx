import { MedicationPage, type MedicationPageData } from "@/components/pages/medication/MedicationPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: MedicationPageData = {
  slug: "oral-semaglutide",
  efficacyTier: "High Efficiency",
  name: "Oral Semaglutide",
  headline: "Efficient Weight Loss",
  startingPrice: "Coming Soon",
  description:
    "Oral semaglutide delivers the same proven GLP-1 molecule as Wegovy and Ozempic in a once-daily pill — FDA-approved for diabetes, used off-label for weight management.",
  heroImage: `${IMG}/ORAL-Sem-3.png`,

  features: [
    {
      icon: "ri-capsule-line",
      title: "Oral convenience",
      subtitle: "No needles. Daily dosing.",
      description:
        "Oral semaglutide (Rybelsus) is the same proven GLP-1 molecule as Ozempic and Wegovy, but delivered as a once-daily pill. It uses absorption-enhancing technology (SNAC) to enable oral bioavailability — eliminating the need for weekly injections.",
    },
    {
      icon: "ri-check-double-line",
      title: "FDA-approved for diabetes",
      subtitle: "Modest weight loss benefit",
      description:
        "Rybelsus is FDA-approved for type 2 diabetes at doses up to 14mg daily. In diabetes trials, patients lost an average of 3.8 kg (8.4 lbs). Some providers use higher doses off-label for weight loss (achieving 5–8%), but injectable semaglutide remains significantly more effective.",
    },
    {
      icon: "ri-flask-line",
      title: "Proven GLP-1 mechanism",
      subtitle: "Same pathway as injectables",
      description:
        "Oral semaglutide activates the same GLP-1 receptor as injectable formulations — slowing gastric emptying, reducing hunger, and improving glucose metabolism. The mechanism is identical; the difference lies in bioavailability and dosing frequency.",
    },
  ],

  howItWorks: {
    title: "Same molecule. Oral delivery.",
    description:
      "Oral semaglutide (Rybelsus) is chemically identical to injectable semaglutide (Ozempic/Wegovy). The difference is delivery: it's co-formulated with SNAC (sodium N-[8-(2-hydroxybenzoyl) amino] caprylate), an absorption enhancer that protects semaglutide from digestive breakdown and facilitates GI absorption.",
    pathways: [
      {
        label: "GLP-1 Pathway",
        items: [
          "Slows gastric emptying — food moves through your stomach more slowly, extending fullness",
          "Signals the brain's satiety centers to reduce hunger and 'food noise'",
          "Stimulates insulin release in a glucose-dependent, safe manner — no risk of hypoglycemia",
          "Reduces glucagon secretion, preventing inappropriate blood sugar spikes",
          "Improves endothelial function and reduces inflammation — direct cardiovascular benefits",
        ],
      },
    ],
    table: [
      { metric: "Administration", value: "Daily pill" },
      { metric: "Max Approved Dose", value: "14mg daily" },
      { metric: "Avg. Weight Loss", value: "~5–8% (off-label)" },
      { metric: "Bioavailability", value: "~1%" },
      { metric: "Fasting Required", value: "Yes (30 min)" },
      { metric: "FDA Approval", value: "Diabetes only" },
      { metric: "vs. Injectable Sem.", value: "~7% less weight loss" },
    ],
  },

  trials: [
    {
      name: "STEP 1",
      participants: "1,961 adults with obesity (no diabetes)",
      duration: "68 weeks",
      statValue: "14.9%",
      statLabel: "Mean weight loss (injectable 2.4mg)",
      description:
        "The pivotal trial that established semaglutide as the first GLP-1 medication to achieve clinically meaningful weight loss in patients without diabetes. This trial used the injectable form — results are reference for comparison with oral formulations.",
    },
    {
      name: "STEP 2",
      participants: "1,210 adults with type 2 diabetes and overweight/obesity",
      duration: "68 weeks",
      statValue: "9.6%",
      statLabel: "Weight reduction in T2D patients",
      description:
        "Demonstrated that semaglutide produces significant weight loss even in patients with type 2 diabetes, while simultaneously improving glycemic control with A1C reductions of 1.6%.",
    },
    {
      name: "STEP 5",
      participants: "304 adults with obesity",
      duration: "104 weeks (2 years)",
      statValue: "15.2%",
      statLabel: "Sustained weight loss at 2 years",
      description:
        "The longest-duration weight loss trial with semaglutide, demonstrating that weight loss is not only achieved but sustained over two full years of treatment with injectable formulation.",
    },
    {
      name: "SELECT (CVOT)",
      participants: "17,604 adults with cardiovascular disease",
      duration: "5-year follow-up",
      statValue: "20%",
      statLabel: "Reduction in major cardiovascular events",
      description:
        "Landmark cardiovascular outcomes trial showing that semaglutide significantly reduces heart attack, stroke, and cardiovascular death in patients with established heart disease.",
    },
  ],

  dosingNote:
    "Oral semaglutide is started at a low dose and escalated every 4 weeks. Critical: take on an empty stomach with no more than 4 oz of water, then wait 30 minutes before eating, drinking, or taking other medications.",
  dosingSteps: [
    { weeks: "Weeks 1–4", dose: "3mg", note: "Starting dose — allows GI adaptation" },
    { weeks: "Weeks 5–8", dose: "7mg", note: "First escalation — appetite suppression begins strongly" },
    { weeks: "Weeks 9–12", dose: "14mg", note: "Mid-titration — most patients see significant appetite shift" },
    { weeks: "Weeks 13–16", dose: "25mg", note: "High dose — 5–8% weight loss typically visible by now" },
    { weeks: "Week 17+", dose: "50mg", note: "Maximum dose — peak efficacy phase (off-label)" },
  ],

  sideEffects: [
    {
      name: "Nausea",
      frequency: "Very Common",
      severity: "Mild–Moderate",
      description:
        "Most common in first 4–8 weeks. Typically resolves as the body adapts. Eating smaller portions and avoiding high-fat foods helps significantly.",
    },
    {
      name: "Constipation",
      frequency: "Common",
      severity: "Mild",
      description:
        "Slowed GI transit is common with GLP-1 agonists. Increasing water, fiber, and activity level helps normalize bowel function.",
    },
    {
      name: "Vomiting",
      frequency: "Common",
      severity: "Mild–Moderate",
      description:
        "Most common at initiation and dose escalation. Providers can slow titration pace to minimize this effect.",
    },
    {
      name: "Decreased Appetite",
      frequency: "Very Common",
      severity: "Intended effect",
      description:
        "This is the primary therapeutic mechanism. Providers monitor to ensure adequate protein and nutrient intake is maintained.",
    },
    {
      name: "Fatigue",
      frequency: "Common",
      severity: "Mild",
      description:
        "Usually transient, often in the first weeks after dose increases. Ensuring sufficient caloric intake helps.",
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
      q: "How is oral semaglutide different from injectable semaglutide?",
      a: "The active molecule is identical, but oral delivery results in ~1% bioavailability vs. ~100% for the injectable. This means much higher doses are needed to achieve similar effects, and the weight loss outcomes (~5–8%) are meaningfully lower than injectable semaglutide (~15%). The primary advantage is needle-free convenience.",
    },
    {
      q: "Why is injectable semaglutide more effective?",
      a: "Oral semaglutide has very low bioavailability (~1%) due to the challenges of GI absorption for a peptide molecule. The SNAC absorption enhancer helps, but even at maximum doses, systemic exposure is significantly lower than with subcutaneous injection. For maximum weight loss efficacy, injectable formulations remain superior.",
    },
    {
      q: "Who is oral semaglutide best suited for?",
      a: "Patients who have needle phobia or strong preference for pill-based medication, those with mild obesity goals (5–8% weight loss target), and patients already using Rybelsus for diabetes management who want to optimize their dosing for weight loss benefit.",
    },
    {
      q: "What is the critical administration protocol?",
      a: "Oral semaglutide must be taken on a completely empty stomach first thing in the morning, with no more than 4 oz (half cup) of plain water. You must wait at least 30 minutes before eating, drinking anything else, or taking other medications. Taking with food can reduce efficacy by 50–90%.",
    },
    {
      q: "Is oral semaglutide FDA-approved for weight loss?",
      a: "No — oral semaglutide (Rybelsus) is FDA-approved only for type 2 diabetes at doses up to 14mg. Higher doses used for weight management are off-label. Injectable semaglutide (Wegovy) is the FDA-approved form for chronic weight management. Your provider will discuss the appropriate approach for your situation.",
    },
  ],
};

export function OralSemaglutidePage() {
  return <MedicationPage data={data} />;
}
