export const INSURANCE_LOGOS_BASE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/logos";

/** In-network carriers with logo assets + dedicated coverage pages */
export const INSURANCE_CARRIERS = [
  {
    name: "Aetna",
    shortName: "Aetna",
    file: "sr_ins_aetna.png",
    href: "/insurance/aetna/",
  },
  {
    name: "Anthem Blue Cross",
    shortName: "Anthem",
    file: "sr_ins_anthem.png",
    href: "/insurance/anthem/",
  },
  {
    name: "Cigna",
    shortName: "Cigna",
    file: "sr_ins_cigna.png",
    href: "/insurance/cigna/",
  },
  {
    name: "Beacon Health Options",
    shortName: "Beacon",
    file: "sr_ins_beacon.png",
    href: "/insurance/beacon/",
  },
] as const;

/** Major plans we verify — dedicated coverage pages (no logo asset) */
export const INSURANCE_VERIFICATION_PLANS = [
  {
    name: "UnitedHealthcare / Optum",
    shortName: "UnitedHealthcare",
    slug: "united-healthcare",
    href: "/insurance/united-healthcare/",
  },
  {
    name: "Humana",
    shortName: "Humana",
    slug: "humana",
    href: "/insurance/humana/",
  },
  {
    name: "Blue Cross Blue Shield",
    shortName: "BCBS",
    slug: "blue-cross-blue-shield",
    href: "/insurance/blue-cross-blue-shield/",
  },
  {
    name: "Tricare",
    shortName: "Tricare",
    slug: "tricare",
    href: "/insurance/tricare/",
  },
  {
    name: "Kaiser Permanente",
    shortName: "Kaiser",
    slug: "kaiser",
    href: "/insurance/kaiser/",
  },
  {
    name: "PPO & out-of-network plans",
    shortName: "PPO",
    slug: "ppo-out-of-network",
    href: "/insurance/ppo-out-of-network/",
  },
] as const;

/** Additional carriers & networks we routinely verify (hub list only — plans with pages are omitted) */
export const ADDITIONAL_ACCEPTED_PLANS = [
  "Health Net",
  "MHN (Managed Health Network)",
  "Kaiser Permanente",
  "Molina Healthcare",
  "Magellan Health",
  "ComPsych",
  "First Health / Coventry",
  "Multiplan / PHCS",
  "Oscar Health",
  "Western Health Advantage",
  "Brand New Day",
  "Meridian Health Plan",
  "Sharp Health Plan",
  "L.A. Care Health Plan",
  "Inland Empire Health Plan (IEHP)",
  "CalOptima",
  "HMC HealthWorks",
  "UMR",
  "GEHA",
  "Bind / Surest",
] as const;

export const INSURANCE_VERIFY_BULLETS = [
  { icon: "ri-shield-check-line", text: "In-network & PPO out-of-network accepted" },
  { icon: "ri-file-search-line", text: "Deductibles, copays, and coverage limits explained" },
  { icon: "ri-heart-pulse-line", text: "Detox & residential substance use benefits" },
  { icon: "ri-lock-2-line", text: "100% confidential — no obligation" },
] as const;

export const INSURANCE_PROCESS_STEPS = [
  {
    num: "01",
    phase: "Verification",
    title: "Confirm your benefits",
    description:
      "Submit the form or call admissions. We contact your insurer directly to map detox and residential coverage.",
    icon: "ri-shield-check-line",
  },
  {
    num: "02",
    phase: "Authorization",
    title: "Handle pre-auth",
    description:
      "When your plan requires it, we manage pre-authorization so clinical admission is not delayed.",
    icon: "ri-file-list-3-line",
  },
  {
    num: "03",
    phase: "Transparency",
    title: "Know your costs",
    description:
      "Copays, deductibles, and out-of-pocket maximums explained upfront — plus financing when appropriate.",
    icon: "ri-wallet-3-line",
  },
  {
    num: "04",
    phase: "Admission",
    title: "Start treatment",
    description:
      "With benefits confirmed, we coordinate same-day or scheduled intake at our Mission Viejo campus.",
    icon: "ri-door-open-line",
  },
] as const;

export const INSURANCE_WHY_US = [
  {
    title: "Experienced clinical team",
    description:
      "Physicians, nurses, and addiction specialists with deep Orange County detox and residential experience.",
    icon: "ri-team-line",
    featured: true,
  },
  {
    title: "Major plans accepted",
    description: "Aetna, Anthem, Cigna, Beacon, and dozens of PPO and out-of-network benefits.",
    icon: "ri-hospital-line",
    featured: false,
  },
  {
    title: "Whole-person care",
    description: "Medical detox, therapy, and holistic programming in one coordinated plan.",
    icon: "ri-heart-2-line",
    featured: false,
  },
  {
    title: "Personalized plans",
    description: "Treatment shaped by your clinical needs and insurance benefit structure.",
    icon: "ri-user-heart-line",
    featured: false,
  },
] as const;

export const INSURANCE_FAQS = [
  {
    question: "Will my insurance cover the entire cost of rehab?",
    answer:
      "Coverage varies by plan. Some policies cover most of treatment; others include copays, deductibles, or annual limits. Our admissions team explains your specific benefits before you commit to anything.",
  },
  {
    question: "How do I verify my insurance for Sullivan Recovery?",
    answer:
      "Complete the form on this page or call our admissions line. We work directly with your insurance company to confirm detox and residential coverage — usually within one business day.",
  },
  {
    question: "Does Sullivan Recovery accept my insurance provider?",
    answer:
      "We are in-network with several major carriers and accept many PPO out-of-network plans. Share your member ID and carrier name and we will confirm eligibility for our Mission Viejo programs.",
  },
  {
    question: "What if insurance does not cover the full cost?",
    answer:
      "We discuss out-of-pocket estimates upfront and can explore financing options when appropriate. The goal is clarity before admission — never surprise bills after the fact.",
  },
  {
    question: "What treatment programs are covered?",
    answer:
      "Many plans cover medically supervised detox and residential substance use treatment. Your personalized plan may include detox, therapy, and aftercare depending on clinical need and benefit limits.",
  },
] as const;

export type InsuranceCarrier = (typeof INSURANCE_CARRIERS)[number];
export type InsuranceVerificationPlan = (typeof INSURANCE_VERIFICATION_PLANS)[number];
