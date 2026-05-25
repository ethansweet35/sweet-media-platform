import { PROGRAMS_IMAGES_BASE } from "@/data/programs";
import {
  INSURANCE_CARRIERS,
  type InsuranceCarrier,
  type InsuranceVerificationPlan,
} from "@/data/insurance";
import type { InsurancePageData, InsurancePageHighlight } from "@/types/insurancePage";

export const insImg = (file: string) => `${PROGRAMS_IMAGES_BASE}/${file}`;

export function carrierByHref(href: string): InsuranceCarrier {
  const found = INSURANCE_CARRIERS.find((c) => c.href === href);
  if (!found) throw new Error(`Unknown carrier href: ${href}`);
  return found;
}

export const STANDARD_COVERED_ITEMS = [
  {
    title: "Medical detox",
    description:
      "Physician-led withdrawal management with 24/7 nursing when medically necessary.",
    icon: "ri-heart-pulse-line",
  },
  {
    title: "Residential treatment",
    description:
      "Inpatient substance use care with daily therapy on our Mission Viejo campus.",
    icon: "ri-home-heart-line",
  },
  {
    title: "Therapy & counseling",
    description: "Individual, group, and family therapy with licensed clinicians.",
    icon: "ri-mental-health-line",
  },
  {
    title: "Dual diagnosis",
    description:
      "Integrated care when substance use and mental health conditions overlap.",
    icon: "ri-brain-line",
  },
  {
    title: "Medication support",
    description:
      "MAT and psychiatric medications when clinically appropriate and plan-approved.",
    icon: "ri-capsule-line",
  },
  {
    title: "Aftercare planning",
    description:
      "Discharge coordination and outpatient referrals included in your treatment episode.",
    icon: "ri-route-line",
  },
] as const;

export const DEFAULT_PAGE_HIGHLIGHTS: InsurancePageHighlight[] = [
  {
    icon: "ri-shield-check-line",
    title: "Free verification",
    description: "Confidential benefits review — usually within one business day.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Pre-authorization",
    description: "We coordinate clinical documentation when your plan requires it.",
  },
  {
    icon: "ri-wallet-3-line",
    title: "Clear cost picture",
    description: "Deductibles, copays, and out-of-pocket explained before admission.",
  },
  {
    icon: "ri-door-open-line",
    title: "Same-campus care",
    description: "Detox and residential on one Mission Viejo campus when clinically appropriate.",
  },
];

type VerificationContent = Pick<
  InsurancePageData,
  "hero" | "intro" | "inNetwork" | "faqs" | "cta"
> & {
  highlights?: InsurancePageHighlight[];
  coveredTitle?: string;
};

export function createVerificationPage(
  plan: InsuranceVerificationPlan,
  content: VerificationContent
): InsurancePageData {
  return {
    canonical: plan.href,
    plan,
    hero: content.hero,
    highlights: content.highlights ?? DEFAULT_PAGE_HIGHLIGHTS,
    intro: content.intro,
    covered: {
      eyebrow: "What may be covered",
      title: content.coveredTitle ?? `${plan.shortName} benefits we help you use`,
      items: [...STANDARD_COVERED_ITEMS],
    },
    inNetwork: content.inNetwork,
    faqs: content.faqs,
    cta: content.cta,
  };
}
