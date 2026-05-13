import { MedicationPage, type MedicationPageData } from "@/components/pages/medication/MedicationPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: MedicationPageData = {
  slug: "semaglutide",
  efficacyTier: "High Efficiency",
  name: "Semaglutide",
  headline: "Proven Weight Loss",
  startingPrice: "Starting at $270",
  description:
    "Semaglutide is the most studied GLP-1 medication for weight loss — with proven cardiovascular benefits and the longest track record of safety and efficacy.",
  heroImage: `${IMG}/ChatGPT-Image-May-2-2026-02_39_28-PM.png`,

  features: [
    {
      icon: "ri-flashlight-line",
      title: "Proven mechanism",
      subtitle: "GLP-1 receptor agonist",
      description:
        "Semaglutide mimics the body's natural GLP-1 hormone — slowing gastric emptying, reducing hunger signals, and improving insulin secretion. It's the most thoroughly studied GLP-1 medication, with over a decade of clinical data and millions of patient-years of real-world use.",
    },
    {
      icon: "ri-arrow-up-line",
      title: "Clinically meaningful results",
      subtitle: "~15% average weight loss",
      description:
        "In the STEP trial program, semaglutide produced 14.9% average weight loss at 68 weeks — the first GLP-1 medication to demonstrate that degree of efficacy in patients without diabetes. Results are sustained over 2+ years with continued use.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Cardiovascular benefit",
      subtitle: "20% MACE reduction",
      description:
        "The SELECT trial showed semaglutide reduces major adverse cardiovascular events (heart attack, stroke, CV death) by 20% in patients with established heart disease. It's the first and only weight-loss medication with proven cardiovascular protection.",
    },
  ],

  howItWorks: {
    title: "One receptor. One weekly injection.",
    description:
      "Semaglutide is a GLP-1 receptor agonist — it mimics the natural gut hormone that regulates appetite and glucose metabolism. By activating this single pathway, it produces clinically meaningful weight loss with a well-understood safety profile.",
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
      { metric: "Receptors Targeted", value: "GLP-1 only" },
      { metric: "Avg. Weight Loss", value: "~15%" },
      { metric: "Achieved 5%+ Loss", value: "~86%" },
      { metric: "Achieved 20%+ Loss", value: "~32%" },
      { metric: "A1C Reduction", value: "~1.6%" },
      { metric: "Cardiovascular Benefit", value: "20% MACE ↓" },
      { metric: "Dosing Frequency", value: "Once weekly" },
      { metric: "Years of Data", value: "10+ years" },
    ],
  },

  trials: [
    {
      name: "STEP 1",
      participants: "1,961 adults with obesity (no diabetes)",
      duration: "68 weeks",
      statValue: "14.9%",
      statLabel: "Mean body weight reduction",
      description:
        "The pivotal trial that established semaglutide as the first GLP-1 medication to achieve clinically meaningful weight loss in patients without diabetes. At 2.4mg, 86% achieved at least 5% weight loss, and 32% achieved at least 20% weight loss — unprecedented results at the time.",
    },
    {
      name: "STEP 2",
      participants: "1,210 adults with type 2 diabetes and overweight/obesity",
      duration: "68 weeks",
      statValue: "9.6%",
      statLabel: "Weight reduction in T2D patients",
      description:
        "Demonstrated that semaglutide produces significant weight loss even in patients with type 2 diabetes, while simultaneously improving glycemic control with A1C reductions of 1.6%. The dual benefit of weight loss and diabetes management in a single therapy.",
    },
    {
      name: "STEP 5",
      participants: "304 adults with obesity",
      duration: "104 weeks (2 years)",
      statValue: "15.2%",
      statLabel: "Sustained weight loss at 2 years",
      description:
        "The longest-duration weight loss trial with semaglutide, demonstrating that weight loss is not only achieved but sustained over two full years of treatment. Confirms that semaglutide produces durable metabolic benefits with continued use.",
    },
    {
      name: "SELECT (CVOT)",
      participants: "17,604 adults with cardiovascular disease",
      duration: "5-year follow-up",
      statValue: "20%",
      statLabel: "Reduction in major cardiovascular events",
      description:
        "Landmark cardiovascular outcomes trial showing that semaglutide significantly reduces heart attack, stroke, and cardiovascular death in patients with established heart disease. The first weight-loss medication to demonstrate cardiovascular benefit — earning FDA cardiovascular indication.",
    },
  ],

  dosingNote:
    "Semaglutide is started at a low dose and escalated every 4 weeks. This gradual ramp-up minimizes GI side effects while allowing your body to adapt. Your provider may adjust this schedule based on your response and tolerability.",
  dosingSteps: [
    { weeks: "Weeks 1–4", dose: "0.25mg", note: "Starting dose — allows GI adaptation" },
    { weeks: "Weeks 5–8", dose: "0.5mg", note: "First escalation — appetite suppression begins" },
    { weeks: "Weeks 9–12", dose: "1mg", note: "Mid-titration — most patients see significant appetite shift" },
    { weeks: "Weeks 13–16", dose: "1.7mg", note: "High dose — 5–10% weight loss typically visible" },
    { weeks: "Week 17+", dose: "2.4mg", note: "Maximum dose — peak efficacy phase" },
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
      q: "Is semaglutide the same as Ozempic or Wegovy?",
      a: "Yes — Ozempic (diabetes), Wegovy (obesity), and Rybelsus (oral) all contain semaglutide as the active ingredient. Our program may use compounded semaglutide from a licensed 503B pharmacy during periods of brand-name shortage.",
    },
    {
      q: "How is semaglutide different from tirzepatide (Mounjaro/Zepbound)?",
      a: "Semaglutide activates only the GLP-1 receptor. Tirzepatide activates both GLP-1 and GIP receptors, producing stronger average weight loss (~21% vs ~15%). Semaglutide has a longer safety track record and may be the right starting point for many patients.",
    },
    {
      q: "Who is not a good candidate for semaglutide?",
      a: "Patients with a personal or family history of medullary thyroid cancer or MEN2, or those with active pancreatitis, should not use semaglutide. Our intake questionnaire screens for these conditions before any prescription.",
    },
    {
      q: "Does semaglutide protect against heart disease?",
      a: "Yes. The SELECT trial showed a 20% reduction in major cardiovascular events (heart attack, stroke, CV death) in patients with established heart disease — making semaglutide the first weight-loss medication with an FDA cardiovascular indication.",
    },
    {
      q: "How long will I need to take it?",
      a: "GLP-1 medications work while you take them. Most patients use them for 12–24+ months. Our program pairs medication with nutritional coaching to build habits that support long-term results.",
    },
    {
      q: "Can semaglutide be combined with other medications?",
      a: "Your provider reviews all current medications during your consultation. Semaglutide is generally well-tolerated alongside most common medications, but your full medication list must be disclosed.",
    },
  ],
};

export function SemaglutidePage() {
  return <MedicationPage data={data} />;
}
