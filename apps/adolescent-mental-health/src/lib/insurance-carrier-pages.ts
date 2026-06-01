import { INSURANCE_LOGOS, SITE } from "@/lib/site";

export type InsuranceCarrierSlug = "aetna" | "cigna" | "anthem" | "beacon" | "umr";

export type InsuranceLogoKey = keyof typeof INSURANCE_LOGOS;

export type InsuranceCarrierHighlight = {
  icon: string;
  title: string;
  body: string;
};

export type InsuranceCarrierPlanType = {
  label: string;
  body: string;
};

export type InsuranceCarrierFaq = {
  q: string;
  a: string;
};

export type InsuranceCarrierConfig = {
  slug: InsuranceCarrierSlug;
  logoKey: InsuranceLogoKey;
  path: `/insurance/${InsuranceCarrierSlug}`;
  name: string;
  logo: string;
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headlineAccent: string;
    body: string;
    imageAlt: string;
  };
  highlights: InsuranceCarrierHighlight[];
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  covered: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  verification: {
    eyebrow: string;
    title: string;
    steps: { num: string; icon: string; title: string; body: string }[];
  };
  planTypes: {
    eyebrow: string;
    title: string;
    description: string;
    items: InsuranceCarrierPlanType[];
  };
  telehealth: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    bullets: string[];
  };
  faqs: InsuranceCarrierFaq[];
  cta: {
    title: string;
    description: string;
  };
};

export const STANDARD_IOP_COVERED_ITEMS = [
  "Virtual Intensive Outpatient Program (IOP) for teens ages 12–17",
  "Individual, group, and family therapy sessions",
  "Clinical assessment and care coordination",
  "Telehealth services delivered from home",
  "Family coaching and parent education sessions",
] as const;

const STANDARD_PLAN_TYPES: InsuranceCarrierPlanType[] = [
  {
    label: "PPO (Preferred Provider Organization)",
    body: "Flexibility to see in-network or out-of-network providers — in-network care typically costs less.",
  },
  {
    label: "HMO (Health Maintenance Organization)",
    body: "Coverage focused on in-network providers; referrals may be required for specialist care.",
  },
  {
    label: "EPO (Exclusive Provider Organization)",
    body: "In-network providers only, often without referral requirements for behavioral health.",
  },
  {
    label: "HDHP (High-Deductible Health Plan)",
    body: "Lower premiums with higher deductibles — IOP costs may apply toward your deductible and out-of-pocket max.",
  },
];

const TELEHEALTH_BULLETS = [
  "Secure video sessions from home — no travel to a clinic",
  "Individual, group, and family therapy included in IOP",
  "Schedules built around school and extracurriculars",
  "Family coaching track for parents and caregivers",
] as const;

function verificationSteps(name: string) {
  return [
    {
      num: "01",
      icon: "ri-phone-line",
      title: "Free consultation",
      body: `Call or message admissions with your teen's symptoms, timeline, and ${name} member ID when available.`,
    },
    {
      num: "02",
      icon: "ri-file-search-line",
      title: "Benefits review",
      body: `We contact ${name} to confirm active coverage, in-network status, deductibles, copays, and authorization requirements.`,
    },
    {
      num: "03",
      icon: "ri-file-list-3-line",
      title: "Clear cost summary",
      body: "You receive a written summary of estimated out-of-pocket costs before your teen begins care — no surprise bills.",
    },
    {
      num: "04",
      icon: "ri-calendar-check-line",
      title: "Start care",
      body: "Once benefits are confirmed, we schedule clinical assessment and build a weekly IOP schedule around school.",
    },
  ];
}

function highlights(name: string, extra?: Partial<Record<number, InsuranceCarrierHighlight>>): InsuranceCarrierHighlight[] {
  const base: InsuranceCarrierHighlight[] = [
    {
      icon: "ri-video-chat-line",
      title: "Telehealth IOP",
      body: `Virtual intensive outpatient care from home — often covered under ${name} behavioral health benefits.`,
    },
    {
      icon: "ri-file-shield-2-line",
      title: "Pre-auth support",
      body: `When your plan requires authorization, we coordinate with ${name} so intake is not delayed unnecessarily.`,
    },
    {
      icon: "ri-building-2-line",
      title: "Employer & individual plans",
      body: "Group, marketplace, and regional products — verification confirms your exact plan and network status.",
    },
    {
      icon: "ri-scales-3-line",
      title: "Mental health parity",
      body: "Federal parity rules require behavioral health coverage comparable to medical benefits on most plans.",
    },
  ];

  if (!extra) return base;
  return base.map((item, index) => extra[index] ?? item);
}

function faqs(name: string): InsuranceCarrierFaq[] {
  return [
    {
      q: `Does ${name} cover Virtual IOP for my teenager?`,
      a: `Many ${name} plans cover intensive outpatient mental health care for adolescents when medically necessary. Plan details vary — our admissions team verifies your specific behavioral health benefits, including telehealth IOP, before enrollment.`,
    },
    {
      q: `Do I need pre-authorization from ${name}?`,
      a: `Some ${name} plans require pre-authorization for IOP-level care. When required, we submit clinical documentation and coordinate with ${name} so your teen can start care without unnecessary delays.`,
    },
    {
      q: `What information do I need to verify ${name} benefits?`,
      a: `Have your ${name} member ID, group number if applicable, and the policyholder's date of birth ready. You can start with a free consultation even if you don't have your card handy — we'll guide you through what's needed.`,
    },
    {
      q: `What if ${name} is out-of-network for your program?`,
      a: "Network status varies by plan and region. If your plan offers out-of-network benefits, we explain estimated costs and superbill options. If in-network care is required, we help you understand alternatives.",
    },
    {
      q: "Will using insurance for teen mental health treatment affect future coverage?",
      a: "Under the Affordable Care Act, insurers generally cannot deny coverage or raise premiums based on a history of mental health treatment.",
    },
  ];
}

type BuildCarrierOptions = {
  slug: InsuranceCarrierSlug;
  logoKey: InsuranceLogoKey;
  name: string;
  metadataTitle: string;
  metadataDescription: string;
  heroBody: string;
  heroImageAlt: string;
  introParagraphs: [string, string, string];
  planTypesDescription?: string;
  telehealthParagraphs: [string, string];
  highlightOverrides?: Partial<Record<number, InsuranceCarrierHighlight>>;
};

function buildCarrierPage(opts: BuildCarrierOptions): InsuranceCarrierConfig {
  const { name, slug, logoKey } = opts;

  return {
    slug,
    logoKey,
    path: `/insurance/${slug}`,
    name,
    logo: INSURANCE_LOGOS[logoKey],
    metadata: {
      title: opts.metadataTitle,
      description: opts.metadataDescription,
    },
    hero: {
      eyebrow: `Insurance · ${name}`,
      headlineAccent: `${name} coverage`,
      body: opts.heroBody,
      imageAlt: opts.heroImageAlt,
    },
    highlights: highlights(name, opts.highlightOverrides),
    intro: {
      eyebrow: `Using ${name}`,
      title: `${name} for adolescent mental health care`,
      paragraphs: opts.introParagraphs,
    },
    covered: {
      eyebrow: "What may be covered",
      title: `${name} benefits we help families use`,
      items: [...STANDARD_IOP_COVERED_ITEMS],
    },
    verification: {
      eyebrow: "Verification",
      title: `How ${name} benefits verification works`,
      steps: verificationSteps(name),
    },
    planTypes: {
      eyebrow: "Plan types",
      title: `Common ${name} plan structures`,
      description:
        opts.planTypesDescription ??
        `Benefit details differ by plan type. Admissions confirms how your specific ${name} policy covers adolescent IOP and telehealth.`,
      items: STANDARD_PLAN_TYPES,
    },
    telehealth: {
      eyebrow: "Telehealth coverage",
      title: `Does ${name} cover virtual IOP for teens?`,
      paragraphs: opts.telehealthParagraphs,
      bullets: [...TELEHEALTH_BULLETS],
    },
    faqs: faqs(name),
    cta: {
      title: `Verify your ${name} benefits`,
      description: `Free, confidential verification for teens ages ${SITE.ages}. Call admissions or request a consultation — we typically respond within one business day.`,
    },
  };
}

export const AETNA_INSURANCE_PAGE = buildCarrierPage({
  slug: "aetna",
  logoKey: "aetna",
  name: "Aetna",
  metadataTitle: "Aetna Insurance for Teen Virtual IOP",
  metadataDescription:
    "Verify Aetna coverage for adolescent Virtual IOP ages 12–17. Telehealth mental health benefits, pre-authorization support, and free benefits review from admissions.",
  heroBody:
    "Many Aetna plans cover telehealth intensive outpatient programs for teens. Our admissions team verifies your specific benefits, explains copays and authorizations, and confirms coverage before enrollment.",
  heroImageAlt: "Parent reviewing Aetna insurance benefits for teen virtual mental health treatment at home",
  introParagraphs: [
    "Aetna is one of the largest health insurers in the U.S., covering millions of families through employer-sponsored plans, individual marketplace policies, Medicare Advantage, and Medicaid products. Many Aetna plans include outpatient and intensive outpatient mental health benefits for adolescents when care is medically necessary.",
    "Adolescent Mental Health provides Virtual IOP for teens ages 12–17 — a structured program with 9–20 clinical hours per week delivered via secure telehealth. We verify Aetna benefits before enrollment so families understand deductibles, copays, and authorization requirements up front.",
    "Network status and benefit details vary by plan, employer, and state. The fastest way to know what your teen's Aetna plan covers is a free verification of benefits through our admissions team.",
  ],
  telehealthParagraphs: [
    "Many Aetna plans cover telehealth mental health services at parity with in-person care, including intensive outpatient programs when clinically appropriate. Coverage depends on medical necessity, plan design, and whether our program is in-network for your policy.",
    "Because adolescent Virtual IOP is a higher level of care than weekly therapy, some Aetna plans require pre-authorization. Our team handles that process and advocates for the appropriate level of care based on your teen's clinical needs.",
  ],
  highlightOverrides: {
    2: {
      icon: "ri-building-2-line",
      title: "Employer & individual plans",
      body: "Group, marketplace, Medicare Advantage, and Medicaid products — verification confirms your exact plan.",
    },
  },
});

export const CIGNA_INSURANCE_PAGE = buildCarrierPage({
  slug: "cigna",
  logoKey: "cigna",
  name: "Cigna",
  metadataTitle: "Cigna Insurance for Teen Virtual IOP",
  metadataDescription:
    "Verify Cigna coverage for adolescent Virtual IOP ages 12–17. Telehealth mental health benefits, pre-authorization support, and free benefits review from admissions.",
  heroBody:
    "Many Cigna plans cover telehealth intensive outpatient programs for teens. Our admissions team verifies your specific benefits, explains copays and authorizations, and confirms coverage before enrollment.",
  heroImageAlt: "Parent reviewing Cigna insurance benefits for teen virtual mental health treatment at home",
  introParagraphs: [
    "Cigna is a major national health insurer serving employer groups, individual plans, and international members. Many Cigna behavioral health benefits include outpatient and intensive outpatient mental health care for adolescents when treatment is medically necessary.",
    "Adolescent Mental Health offers Virtual IOP for teens ages 12–17 with 9–20 clinical hours per week via secure telehealth. We verify Cigna benefits before enrollment so families understand deductibles, copays, and authorization requirements up front.",
    "Cigna plan designs vary by employer, region, and product line. A free verification of benefits through our admissions team is the fastest way to confirm what your teen's plan covers.",
  ],
  telehealthParagraphs: [
    "Many Cigna plans cover telehealth mental health services, including intensive outpatient programs when clinically appropriate. Coverage depends on medical necessity, your plan's behavioral health carve-out, and in-network status.",
    "Virtual IOP is a higher level of care than weekly therapy. Some Cigna plans require pre-authorization — our team coordinates documentation and follow-up so your teen can start care without unnecessary delays.",
  ],
  highlightOverrides: {
    2: {
      icon: "ri-global-line",
      title: "National employer plans",
      body: "Cigna serves large employer groups nationwide — verification confirms your specific behavioral health benefits.",
    },
  },
});

export const ANTHEM_INSURANCE_PAGE = buildCarrierPage({
  slug: "anthem",
  logoKey: "anthem",
  name: "Anthem",
  metadataTitle: "Anthem Insurance for Teen Virtual IOP",
  metadataDescription:
    "Verify Anthem coverage for adolescent Virtual IOP ages 12–17. Telehealth mental health benefits, pre-authorization support, and free benefits review from admissions.",
  heroBody:
    "Many Anthem plans cover telehealth intensive outpatient programs for teens. Our admissions team verifies your specific benefits, explains copays and authorizations, and confirms coverage before enrollment.",
  heroImageAlt: "Parent and teen reviewing Anthem insurance benefits for virtual adolescent mental health care at home",
  introParagraphs: [
    "Anthem is one of the largest Blue Cross Blue Shield affiliates in the U.S., covering families through employer-sponsored plans, individual marketplace policies, and Medicaid products in many states. Many Anthem plans include behavioral health benefits for adolescent outpatient and intensive outpatient care.",
    "Adolescent Mental Health provides Virtual IOP for teens ages 12–17 — structured telehealth care with 9–20 clinical hours per week. We verify Anthem benefits before enrollment so families understand cost-sharing and authorization requirements.",
    "Anthem network and benefit details vary significantly by state and plan type. Our admissions team confirms your specific coverage through a free verification of benefits before your teen begins care.",
  ],
  telehealthParagraphs: [
    "Many Anthem plans cover telehealth mental health at parity with in-person services, including IOP when medically necessary. Coverage depends on your state, plan design, and whether our program is in-network.",
    "Some Anthem policies require pre-authorization for intensive outpatient care. We manage that process with your plan and provide a clear cost summary before enrollment.",
  ],
  highlightOverrides: {
    2: {
      icon: "ri-map-pin-2-line",
      title: "Regional BCBS plans",
      body: "Anthem Blue Cross plans vary by state — verification confirms your regional network and adolescent behavioral health benefits.",
    },
  },
});

export const BEACON_INSURANCE_PAGE = buildCarrierPage({
  slug: "beacon",
  logoKey: "becn",
  name: "Beacon",
  metadataTitle: "Beacon Insurance for Teen Virtual IOP",
  metadataDescription:
    "Verify Beacon coverage for adolescent Virtual IOP ages 12–17. Behavioral health benefits, pre-authorization support, and free benefits review from admissions.",
  heroBody:
    "Many Beacon behavioral health plans cover telehealth intensive outpatient programs for teens. Our admissions team verifies your specific benefits and confirms coverage before enrollment.",
  heroImageAlt: "Parent calling about Beacon behavioral health insurance coverage for teen virtual mental health treatment",
  introParagraphs: [
    "Beacon Health Options focuses on behavioral health benefits for employer plans, health systems, and public programs. Many Beacon-covered plans include outpatient and intensive outpatient mental health services for adolescents when care is medically necessary.",
    "Adolescent Mental Health provides Virtual IOP for teens ages 12–17 with 9–20 clinical hours per week delivered via secure telehealth. We verify Beacon benefits before enrollment so families understand copays, authorizations, and out-of-pocket costs.",
    "Beacon benefit administration varies by the underlying health plan. Our admissions team confirms your teen's specific behavioral health coverage through a free verification of benefits.",
  ],
  telehealthParagraphs: [
    "Many plans administered through Beacon include telehealth mental health benefits, including intensive outpatient care when clinically appropriate. Final coverage depends on the primary insurer, medical necessity, and network status.",
    "Beacon often manages behavioral health authorizations for the plans it administers. Our team coordinates clinical documentation so IOP-level care can begin without unnecessary delays.",
  ],
  highlightOverrides: {
    2: {
      icon: "ri-mental-health-line",
      title: "Behavioral health focus",
      body: "Beacon specializes in mental health and substance use benefits — verification confirms adolescent IOP coverage under your plan.",
    },
  },
});

export const UMR_INSURANCE_PAGE = buildCarrierPage({
  slug: "umr",
  logoKey: "umr",
  name: "UMR",
  metadataTitle: "UMR Insurance for Teen Virtual IOP",
  metadataDescription:
    "Verify UMR coverage for adolescent Virtual IOP ages 12–17. Employer plan benefits, pre-authorization support, and free benefits review from admissions.",
  heroBody:
    "Many UMR-administered employer plans cover telehealth intensive outpatient programs for teens. Our admissions team verifies your specific benefits and confirms coverage before enrollment.",
  heroImageAlt: "Working parent verifying UMR employer health plan benefits for teen virtual mental health care",
  introParagraphs: [
    "UMR is a UnitedHealthcare company that administers self-funded and employer-sponsored health plans for organizations nationwide. Many UMR plans include behavioral health benefits covering adolescent outpatient and intensive outpatient mental health care.",
    "Adolescent Mental Health offers Virtual IOP for teens ages 12–17 — 9–20 clinical hours per week via secure telehealth with family coaching included. We verify UMR plan benefits before enrollment so families understand deductibles, copays, and authorization steps.",
    "Because UMR administers plans on behalf of employers, benefit details vary by company and plan document. A free verification of benefits through admissions confirms what your teen's specific plan covers.",
  ],
  telehealthParagraphs: [
    "Many UMR-administered plans cover telehealth mental health services, including intensive outpatient programs when medically necessary. Coverage is defined by your employer's plan design and network agreements.",
    "Employer plans through UMR may require pre-authorization for IOP-level care. Our team handles documentation and follow-up with UMR so families have a clear cost picture before starting treatment.",
  ],
  highlightOverrides: {
    2: {
      icon: "ri-briefcase-line",
      title: "Employer-sponsored plans",
      body: "UMR administers self-funded employer health plans — verification confirms your company's behavioral health benefits.",
    },
  },
});

export const INSURANCE_CARRIER_PAGES: Record<InsuranceCarrierSlug, InsuranceCarrierConfig> = {
  aetna: AETNA_INSURANCE_PAGE,
  cigna: CIGNA_INSURANCE_PAGE,
  anthem: ANTHEM_INSURANCE_PAGE,
  beacon: BEACON_INSURANCE_PAGE,
  umr: UMR_INSURANCE_PAGE,
};

export const INSURANCE_CARRIER_SLUGS = Object.keys(INSURANCE_CARRIER_PAGES) as InsuranceCarrierSlug[];

export function getInsuranceCarrierPage(slug: string): InsuranceCarrierConfig | undefined {
  return INSURANCE_CARRIER_PAGES[slug as InsuranceCarrierSlug];
}

/** Logo keys from `INSURANCE_LOGOS` mapped to carrier page paths */
export const INSURANCE_CARRIER_PATHS: Record<InsuranceLogoKey, `/insurance/${InsuranceCarrierSlug}`> = {
  aetna: "/insurance/aetna",
  cigna: "/insurance/cigna",
  anthem: "/insurance/anthem",
  becn: "/insurance/beacon",
  umr: "/insurance/umr",
};
