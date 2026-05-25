import type { InsuranceCarrier, InsuranceVerificationPlan } from "@/data/insurance";

export type InsurancePageHighlight = {
  icon: string;
  title: string;
  description: string;
};

export type InsurancePageData = {
  canonical: string;
  carrier?: InsuranceCarrier;
  plan?: InsuranceVerificationPlan;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent?: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  highlights: InsurancePageHighlight[];
  intro: {
    title: string;
    titleAccent?: string;
    paragraphs: string[];
  };
  covered: {
    eyebrow?: string;
    title: string;
    items: { title: string; description: string; icon: string }[];
  };
  inNetwork: {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
  };
  faqs: { question: string; answer: string }[];
  cta: {
    title: string;
    description: string;
  };
};

/** @deprecated Use InsurancePageData */
export type InsuranceCarrierPageData = InsurancePageData;
