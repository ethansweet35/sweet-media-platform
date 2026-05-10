import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_eating_hero01.jpg`,
  heroImageAlt: "Person finding peace with food and recovery from eating disorder at Northbound Treatment",
  substanceName: "Eating Disorders",
  heroHeadline: "Eating Disorder & Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Eating disorders and substance use disorders co-occur at rates far higher than most people realize — sharing underlying patterns of shame, control, and emotional dysregulation. Northbound's integrated dual diagnosis program addresses both with the clinical depth and compassion that full recovery demands.",

  whatItIsHeadline: "What Is the Connection Between Eating Disorders and Addiction?",
  whatItIsBody: [
    "Eating disorders — including anorexia nervosa, bulimia nervosa, binge eating disorder, and ARFID — are serious, potentially life-threatening mental health conditions characterized by a persistent disturbance in eating behaviors and intense preoccupation with body image, weight, and food. They are not lifestyle choices; they are recognized medical illnesses with strong neurobiological and psychological components.",
    "The co-occurrence of eating disorders and substance use disorders is striking: research suggests 25–35% of individuals with alcohol or substance use disorders also have an eating disorder — and the reverse is also true. Common underlying factors include difficulty regulating emotions, perfectionism and control, trauma history, low self-worth, and an all-or-nothing cognitive style. Substances often function to suppress appetite, manage eating disorder guilt or shame, or numb the emotional pain the eating disorder creates.",
    "Effective treatment must address both conditions simultaneously. Treating addiction while leaving an active eating disorder unaddressed — or vice versa — reliably produces incomplete recovery and high relapse rates in both areas. Northbound's dual diagnosis clinical team has the expertise to hold both conditions at once.",
  ],
  whatItIsImage: `${BASE}/nbt_eating_hero01.jpg`,
  whatItIsImageAlt: "Recovery from eating disorder and substance use disorder through integrated treatment at Northbound",
  quickStats: [
    { value: "30M+", label: "Americans affected by eating disorders" },
    { value: "25–35%", label: "Of those in SUD treatment also have an eating disorder" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Eating disorders often coexist silently with addiction. These are the warning signs that both conditions may be present and interacting.",
  warningSigns: [
    "Restrictive eating, fasting, or extreme dieting alongside substance use",
    "Using stimulants (cocaine, Adderall, meth) to suppress appetite or control weight",
    "Using alcohol or substances to manage guilt, shame, or anxiety after eating",
    "Binge eating followed by purging (vomiting, excessive exercise, laxatives)",
    "Extreme preoccupation with food, weight, or body image",
    "Denial of hunger or claiming to have eaten when you haven't",
    "Physical signs: frequent bloating, dental erosion, hair loss, cold intolerance",
    "Intense shame and secrecy around both eating behaviors and substance use",
    "Using food restriction or bingeing as emotional regulation alongside substance use",
    "History of trauma that predates both the eating disorder and the substance use",
  ],

  recoveryHeadline: "What Eating Disorder & Addiction Recovery Looks Like at Northbound",
  recoveryIntro:
    "Integrated treatment for eating disorders and addiction requires specialized expertise in both conditions — addressing the emotional, behavioral, and neurological patterns that drive each. Northbound's dual diagnosis model delivers exactly this.",
  careSteps: [
    {
      phase: "Week 1",
      title: "Comprehensive Dual Diagnosis Assessment",
      icon: "ri-mental-health-line",
      body: "Every client receives a thorough biopsychosocial evaluation that explicitly screens for eating disorder patterns alongside substance use history. Our psychiatrists and clinical team develop an individualized treatment plan that holds both conditions from day one.",
    },
    {
      phase: "Week 1–2",
      title: "Medical Stabilization",
      icon: "ri-heart-pulse-line",
      body: "Both eating disorders and substance use can cause serious medical complications — electrolyte imbalances, cardiac arrhythmias, and nutritional deficiencies. Northbound's medical team ensures physical stability before deeper therapeutic work begins.",
    },
    {
      phase: "Weeks 2–12+",
      title: "Residential Integrated Treatment",
      icon: "ri-home-heart-line",
      body: "Residential programming integrates evidence-based eating disorder interventions — CBT for eating disorders, DBT, nutritional counseling — with addiction recovery. Individual therapy, group sessions, and family work address both conditions within the same structured environment.",
    },
    {
      phase: "Month 2–4",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of intensive programming that continues to address both eating behaviors and addiction recovery simultaneously. Real-world meal practices and trigger management are built into this phase of care.",
    },
    {
      phase: "Ongoing",
      title: "Aftercare & Nutritional Recovery",
      icon: "ri-refresh-line",
      body: "Eating disorder recovery is often a long-term process that continues well beyond residential care. Northbound's aftercare plan includes referrals to specialized eating disorder providers, continued psychiatric monitoring, and alumni community support.",
    },
  ],

  differentiators: [
    {
      icon: "ri-brain-line",
      title: "Dual Diagnosis Expertise",
      body: "Northbound's clinical team treats co-occurring eating disorders and addiction within a single, integrated program — not sequentially, and not as separate treatment tracks.",
    },
    {
      icon: "ri-restaurant-line",
      title: "Nutritional Support Integration",
      body: "Recovery from an eating disorder requires rebuilding a healthy relationship with food. Northbound integrates nutritional support and counseling into the treatment program alongside addiction and mental health care.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Trauma-Informed Care",
      body: "Trauma — particularly childhood abuse, sexual assault, and emotional neglect — is extremely common in both eating disorders and addiction. Northbound's trauma-informed approach addresses these roots.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Medical Monitoring",
      body: "Both eating disorders and substance use can cause serious physical complications. Northbound's on-site medical team provides continuous monitoring throughout treatment — particularly for clients recovering from restrictive eating or purging behaviors.",
    },
    {
      icon: "ri-group-line",
      title: "Gender-Responsive Care",
      body: "Eating disorders disproportionately — but not exclusively — affect women. Northbound's residential program offers gender-specific clinical tracks that create the psychological safety needed for authentic healing.",
    },
    {
      icon: "ri-family-line",
      title: "Family Therapy",
      body: "Family dynamics often play a significant role in both eating disorders and addiction. Northbound's family therapy program addresses relational patterns, enabling behaviors, and communication skills essential to lasting recovery.",
    },
  ],

  closingImage: `${BASE}/nbt_eating_hero01.jpg`,
  closingImageAlt: "Person experiencing healing from eating disorder and addiction at Northbound Treatment",
  closingHeadline: "Both Conditions Deserve Treatment — Together.",
  closingBody: [
    "An eating disorder and an addiction can feel like two separate battles — but they are almost always fighting the same underlying war. Treating them together isn't just more efficient; it's the only approach that produces complete, sustainable recovery.",
    "Northbound's admissions team is available 24 hours a day, 7 days a week — at no cost and no obligation. If you or someone you love is struggling with an eating disorder alongside substance use, we are ready to help navigate what integrated treatment looks like.",
  ],
  closingQuote: "Recovery from both isn't just possible — it's what we're built for. One integrated treatment plan. One team. One path to healing.",

  faqs: [
    {
      question: "Can Northbound treat an eating disorder and addiction at the same time?",
      answer:
        "Yes — Northbound's dual diagnosis program is specifically designed to address co-occurring conditions simultaneously. Our clinical team has experience treating the intersection of eating disorders and substance use disorders within a single integrated treatment plan.",
    },
    {
      question: "Which eating disorders commonly co-occur with addiction?",
      answer:
        "All major eating disorders — anorexia nervosa, bulimia nervosa, binge eating disorder, and ARFID — can co-occur with addiction. Bulimia and binge eating disorder have particularly high co-occurrence rates with alcohol and substance use. Stimulant use (cocaine, Adderall, meth) is especially common in individuals with anorexia or restrictive eating patterns.",
    },
    {
      question: "Why do eating disorders and addiction often occur together?",
      answer:
        "Both conditions share underlying risk factors: trauma history, difficulty regulating emotions, perfectionism, shame and low self-worth, and all-or-nothing thinking. Substances are often used to manage the emotional pain, anxiety, or shame that eating disorders generate — or to suppress appetite and reinforce restriction.",
    },
    {
      question: "Does Northbound provide nutritional counseling as part of treatment?",
      answer:
        "Yes. Recovery from an eating disorder requires rebuilding a healthy, sustainable relationship with food — and that involves nutritional support and counseling alongside psychological therapy. Northbound integrates nutritional guidance into the treatment program as appropriate for each client.",
    },
    {
      question: "Is Northbound equipped to handle the medical complications of eating disorders?",
      answer:
        "Yes. Northbound's on-site medical team monitors for and manages the physical complications that eating disorders can cause — electrolyte imbalances, cardiac irregularities, and nutritional deficiencies — in coordination with the rest of the clinical team.",
    },
    {
      question: "Will insurance cover eating disorder and addiction treatment?",
      answer:
        "Most major insurance plans cover dual diagnosis treatment under mental health and substance use disorder benefits. Northbound works with Aetna, Anthem, Cigna, Tricare, and others. Call (866) 311-0003 for a free, confidential benefits verification.",
    },
  ],

  substanceNameShort: "Eating Disorders",
  relatedSubstances: [
    { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-heart-line" },
    { label: "Anxiety", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-mental-health-line" },
    { label: "Trauma", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-pulse-line" },
    { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis/", icon: "ri-brain-line" },
    { label: "Adderall", href: "/treatment/adderall/", icon: "ri-capsule-line" },
    { label: "Alcohol", href: "/treatment/alcoholism/", icon: "ri-drop-line" },
  ],
};

export default function EatingDisordersPage() {
  return <SubstancePageTemplate data={data} />;
}
