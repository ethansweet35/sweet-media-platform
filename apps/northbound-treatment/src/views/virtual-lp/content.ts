const STORAGE_BASE =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

export const VIRTUAL_LP_HERO_IMAGE = `${STORAGE_BASE}/nbt_virtual_lp_hero01.jpg`;

export const ADMISSIONS_PHONE = "tel:8663110003";
export const ADMISSIONS_PHONE_DISPLAY = "(866) 311-0003";
export const VERIFY_INSURANCE_HREF = "#verify-insurance";

/** On-page section anchors for LP header sitelinks (scroll-mt matches fixed chrome). */
export const VIRTUAL_LP_SECTION_LINKS = [
  { id: "verify-insurance", label: "Verify Insurance" },
  { id: "network", label: "Network" },
  { id: "programs", label: "Programs" },
  { id: "benefits", label: "Benefits" },
  { id: "how-it-works", label: "How It Works" },
  { id: "faq", label: "FAQ" },
] as const;

export const VIRTUAL_LP_SCROLL_MARGIN = "scroll-mt-24";

export const HERO_TRUST_BULLETS = [
  "Virtual IOP and outpatient options",
  "Secure video-based treatment",
  "Individual and group therapy",
  "Insurance verification available",
  "Specialized programs through Northbound, Neurish Wellness, and Casa Capri Recovery",
];

export const NETWORK_BRANDS = [
  {
    name: "Northbound Treatment",
    focus: "Substance use and dual diagnosis virtual outpatient care",
    icon: "ri-capsule-line",
    accent: "border-navy bg-navy/5",
    iconBg: "bg-navy/10 text-navy",
  },
  {
    name: "Neurish Wellness",
    focus: "Virtual mental health outpatient care",
    icon: "ri-brain-line",
    accent: "border-agave bg-agave/5",
    iconBg: "bg-agave/15 text-agave",
  },
  {
    name: "Casa Capri Recovery",
    focus: "Women's-only virtual substance use treatment",
    icon: "ri-women-line",
    accent: "border-terracotta/40 bg-terracotta/5",
    iconBg: "bg-terracotta/15 text-terracotta",
  },
  {
    name: "Casa Capri Recovery",
    focus: "Women's-only virtual eating disorder treatment",
    icon: "ri-heart-pulse-line",
    accent: "border-terracotta/30 bg-sand",
    iconBg: "bg-terracotta/10 text-terracotta",
  },
];

export type PathwayCard = {
  programName: string;
  brand: string;
  brandTag: string;
  bestFor: string;
  features: string[];
  ctaLabel: string;
  icon: string;
  accentBar: string;
  cardBg: string;
};

export const PATHWAY_CARDS: PathwayCard[] = [
  {
    programName: "SUD Virtual Outpatient",
    brand: "Northbound Treatment",
    brandTag: "Northbound",
    bestFor:
      "Adults seeking virtual support for substance use, dual diagnosis, relapse prevention, or step-down care after residential or PHP treatment.",
    features: [
      "Virtual IOP, OP, and recovery support services",
      "Secure Zoom-based sessions",
      "Individual and group therapy",
      "Case management",
      "Psychiatry and medication management when clinically appropriate",
      "Dual-diagnosis care for co-occurring mental health concerns",
      "Aftercare and relapse prevention planning",
      "Available in California",
    ],
    ctaLabel: "Verify Insurance for This Program",
    icon: "ri-capsule-line",
    accentBar: "bg-navy",
    cardBg: "bg-white",
  },
  {
    programName: "Virtual Mental Health Outpatient",
    brand: "Neurish Wellness",
    brandTag: "Neurish",
    bestFor:
      "Clients seeking structured virtual mental health care for anxiety, depression, trauma, emotional distress, or other behavioral health concerns.",
    features: [
      "Virtual mental health IOP",
      "Secure video sessions with licensed professionals",
      "Individual, group, and family therapy when appropriate",
      "CBT and DBT-informed treatment",
      "Digital intake and symptom history forms",
      "Medication support and electronic prescribing when clinically appropriate",
      "Flexible scheduling from home",
    ],
    ctaLabel: "Verify Insurance for This Program",
    icon: "ri-brain-line",
    accentBar: "bg-agave",
    cardBg: "bg-sand/50",
  },
  {
    programName: "Women's Only Virtual SUD Outpatient",
    brand: "Casa Capri Recovery",
    brandTag: "Casa Capri",
    bestFor:
      "Women seeking addiction treatment in a supportive, female-only virtual setting.",
    features: [
      "Women's-only virtual IOP",
      "Substance use and alcohol addiction support",
      "Co-occurring mental health support",
      "Group, individual, and family therapy",
      "Educational workshops",
      "Structured aftercare and alumni support",
      "Safe, private, empowering female community",
    ],
    ctaLabel: "Verify Insurance for This Program",
    icon: "ri-women-line",
    accentBar: "bg-terracotta",
    cardBg: "bg-white",
  },
  {
    programName: "Women's Only Virtual Eating Disorder Outpatient",
    brand: "Casa Capri Recovery",
    brandTag: "Casa Capri",
    bestFor:
      "Women seeking virtual eating disorder support for anorexia, bulimia, binge eating, pica, body image concerns, or co-occurring mental health issues.",
    features: [
      "Virtual eating disorder IOP",
      "Women-focused treatment environment",
      "Individual and group therapy with other women",
      "CBT and DBT-informed care",
      "Support for depression, anxiety, and trauma",
      "Relapse prevention and long-term recovery support",
      "California-focused program with guidance for out-of-state clients",
    ],
    ctaLabel: "Verify Insurance for This Program",
    icon: "ri-heart-pulse-line",
    accentBar: "bg-terracotta-light",
    cardBg: "bg-sand/50",
  },
];

export const PROGRAM_FINDER = [
  {
    scenario: "Addiction treatment for yourself or a loved one",
    recommend: "Northbound Treatment Virtual Outpatient",
    icon: "ri-capsule-line",
  },
  {
    scenario: "Your primary concern is mental health",
    recommend: "Neurish Wellness Virtual Mental Health Outpatient",
    icon: "ri-brain-line",
  },
  {
    scenario: "Women's-only substance use treatment",
    recommend: "Casa Capri Women's Virtual SUD Outpatient",
    icon: "ri-women-line",
  },
  {
    scenario: "Women's eating disorder treatment",
    recommend: "Casa Capri Women's Virtual Eating Disorder Outpatient",
    icon: "ri-heart-pulse-line",
  },
];

export const VIRTUAL_BENEFITS = [
  "Access care from home, work, school, or another private space",
  "Reduce travel time and scheduling barriers",
  "Maintain privacy and avoid stigma",
  "Stay connected to work, school, family, and daily life",
  "Receive real-time support from licensed professionals",
  "Participate in individual, group, and family therapy",
  "Build relapse prevention and aftercare plans",
  "Transition between virtual and in-person care when clinically appropriate",
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Confidential Call",
    body: "A member of the admissions team learns about your needs, symptoms, goals, and current situation.",
  },
  {
    number: "02",
    title: "Insurance Verification",
    body: "The team verifies your insurance benefits and explains possible coverage before you begin.",
  },
  {
    number: "03",
    title: "Clinical Assessment",
    body: "A clinical team member helps determine the appropriate program, level of care, and treatment track.",
  },
  {
    number: "04",
    title: "Virtual Setup",
    body: "You receive help setting up the secure video platform so you feel comfortable before your first session.",
  },
  {
    number: "05",
    title: "Begin Treatment",
    body: "You attend scheduled group therapy, individual therapy, psychoeducation, case management, and other services based on your care plan.",
  },
  {
    number: "06",
    title: "Ongoing Support",
    body: "Your team helps with aftercare planning, relapse prevention, step-down care, alumni resources, or referrals when needed.",
  },
];

export const CLINICAL_SERVICES = [
  "Virtual IOP",
  "Virtual outpatient treatment",
  "Individual therapy",
  "Group therapy",
  "Family therapy",
  "CBT",
  "DBT",
  "Trauma-informed care",
  "Dual-diagnosis support",
  "Psychiatry",
  "Medication management",
  "Case management",
  "Psychoeducation",
  "Relapse prevention",
  "Aftercare planning",
  "Alumni support",
  "Eating disorder support",
  "Women's-only clinical programming",
];

export const APPROPRIATE_FOR = [
  "Have a safe and stable home environment",
  "Need structured support but do not require 24/7 supervision",
  "Are stepping down from detox, residential, or PHP",
  "Are managing work, school, parenting, or caregiving responsibilities",
  "Live far from in-person treatment",
  "Prefer the privacy of receiving treatment from home",
  "Need support for substance use, mental health, or eating disorder concerns",
];

export const NOT_APPROPRIATE_FOR = [
  "Are in active medical or psychiatric crisis",
  "Need detox or 24/7 monitoring",
  "Do not have a safe or stable living environment",
  "Are at immediate risk of harming themselves or others",
];

export const VIRTUAL_LP_FAQS = [
  {
    q: "What is virtual outpatient treatment?",
    a: "Virtual outpatient treatment allows clients to receive structured therapy, support, and clinical care through secure online sessions. Depending on the program, care may include group therapy, individual therapy, family therapy, case management, psychiatry, medication management, and aftercare planning.",
  },
  {
    q: "What is virtual IOP?",
    a: "Virtual IOP, or virtual intensive outpatient programming, is a higher level of outpatient care delivered online. It usually includes multiple therapy sessions per week and provides more structure than standard outpatient therapy.",
  },
  {
    q: "Which virtual program should I choose?",
    a: "Northbound Treatment is best suited for substance use and dual-diagnosis virtual outpatient care. Neurish Wellness is focused on virtual mental health treatment. Casa Capri Recovery offers women's-only virtual substance use treatment and women's-only virtual eating disorder treatment.",
  },
  {
    q: "Is virtual treatment private?",
    a: "Yes. Sessions are delivered through secure video platforms, and clients are encouraged to attend from a private location where they feel safe speaking openly.",
  },
  {
    q: "Can I attend virtual treatment while working or going to school?",
    a: "Yes. Virtual outpatient care is designed to reduce disruption to daily life. Scheduling options vary by program, and the admissions team can help determine whether the program fits your availability.",
  },
  {
    q: "Does insurance cover virtual treatment?",
    a: "Many major insurance plans may cover virtual outpatient treatment. Coverage depends on your plan, location, diagnosis, and level of care. The admissions team can verify your benefits before admission.",
  },
  {
    q: "Is virtual treatment as effective as in-person treatment?",
    a: "Virtual treatment can be effective for many clients when delivered by qualified clinicians and when the client has a safe, stable environment. The right fit depends on clinical needs, risk level, support system, and treatment goals.",
  },
  {
    q: "Can I switch from virtual to in-person treatment?",
    a: "In many cases, yes. The Northbound network can help coordinate transitions between virtual and in-person care when clinically appropriate.",
  },
];
