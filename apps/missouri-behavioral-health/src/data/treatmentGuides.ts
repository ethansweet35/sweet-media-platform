/**
 * Insurance coverage guides — paths match mainNavigation "Guide" mega menu.
 * Child guide pages can be added at these routes over time.
 */

export type TreatmentGuide = {
  path: string;
  title: string;
  carrier: string;
  excerpt: string;
  icon: string;
  topics: string[];
};

export const INSURANCE_GUIDES: TreatmentGuide[] = [
  {
    path: "/aetna-outpatient-services",
    carrier: "Aetna",
    title: "Aetna Outpatient Services",
    excerpt:
      "How Aetna plans cover PHP, IOP, and outpatient addiction and mental health care at MBH — and what to expect during benefits verification.",
    icon: "ri-shield-check-line",
    topics: ["Outpatient", "PHP / IOP", "Prior auth"],
  },
  {
    path: "/anthem-blue-cross-coverage",
    carrier: "Anthem",
    title: "Anthem Blue Cross Coverage",
    excerpt:
      "Anthem and Blue Cross plans in Missouri: covered levels of care, in-network requirements, and how we confirm your benefits before admission.",
    icon: "ri-hospital-line",
    topics: ["In-network", "Dual diagnosis", "Telehealth"],
  },
  {
    path: "/beacon-health-insurance-rehab-coverage",
    carrier: "Beacon",
    title: "Beacon Health Insurance Rehab Coverage",
    excerpt:
      "Navigating Beacon Health Options for substance use and mental health treatment — authorization steps and covered clinical services.",
    icon: "ri-file-list-3-line",
    topics: ["Authorization", "SUD benefits", "MH benefits"],
  },
  {
    path: "/blue-cross-blue-shield-coverage",
    carrier: "BCBS",
    title: "Blue Cross Blue Shield Coverage",
    excerpt:
      "BCBS of Missouri and regional plans: what behavioral health benefits typically include and how MBH bills for addiction treatment.",
    icon: "ri-heart-pulse-line",
    topics: ["BCBS MO", "Out-of-pocket", "Family plans"],
  },
  {
    path: "/carelon-behavioral-health-insurance",
    carrier: "Carelon",
    title: "Carelon Behavioral Health Insurance",
    excerpt:
      "Carelon (formerly Beacon in many markets) behavioral health carve-outs — accessing PHP, IOP, and therapy through your plan.",
    icon: "ri-mental-health-line",
    topics: ["Carve-out", "IOP", "Care management"],
  },
  {
    path: "/cigna-outpatient-coverage",
    carrier: "Cigna",
    title: "Cigna Outpatient Coverage",
    excerpt:
      "Cigna commercial plans and outpatient addiction treatment: coverage tiers, medical necessity, and coordinating with your existing providers.",
    icon: "ri-user-heart-line",
    topics: ["Commercial", "Outpatient", "MAT"],
  },
  {
    path: "/cox-health-missouri",
    carrier: "Cox Health",
    title: "Cox Health Missouri",
    excerpt:
      "Using Cox Health plans for behavioral health and addiction treatment in the Springfield region and statewide telehealth options.",
    icon: "ri-map-pin-2-line",
    topics: ["Springfield", "Regional", "Telehealth"],
  },
  {
    path: "/geha-insurance-coverage",
    carrier: "GEHA",
    title: "GEHA Insurance Coverage",
    excerpt:
      "GEHA federal employee and family plans: mental health and substance use benefits, referrals, and verification for MBH programs.",
    icon: "ri-government-line",
    topics: ["Federal", "FEHB", "Family coverage"],
  },
];
