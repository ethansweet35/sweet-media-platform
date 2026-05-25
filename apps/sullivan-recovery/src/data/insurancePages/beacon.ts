import type { InsurancePageData } from "@/types/insurancePage";
import { carrierByHref, insImg, STANDARD_COVERED_ITEMS } from "./shared";

const carrier = carrierByHref("/insurance/beacon/");

export const beaconInsurancePage: InsurancePageData = {
  canonical: "/insurance/beacon/",
  carrier,
  highlights: [
    {
      icon: "ri-mental-health-line",
      title: "Behavioral health admin",
      description: "Beacon / Carelon carve-outs separate from medical cards.",
    },
    {
      icon: "ri-file-search-line",
      title: "Right ID numbers",
      description: "We identify medical vs behavioral benefits lines to call.",
    },
    {
      icon: "ri-shield-check-line",
      title: "In-network billing",
      description: "Direct billing for authorized detox and residential days.",
    },
    {
      icon: "ri-user-heart-line",
      title: "Employer EAP paths",
      description: "Support for workplace plans tied to Beacon networks.",
    },
  ],
  hero: {
    eyebrow: "In-network · Beacon Health",
    title: "Beacon insurance for",
    titleAccent: "rehab in OC",
    description:
      "Beacon Health Options members can access in-network detox and residential treatment at Sullivan Recovery with guided benefits verification.",
    image: insImg("sr_facility_2.png"),
    imageAlt: "Sullivan Recovery residential living space — Beacon in-network",
  },
  intro: {
    title: "Beacon Health",
    titleAccent: "rehab coverage",
    paragraphs: [
      "Beacon Health Options (now part of Carelon Behavioral Health for many markets) administers behavioral health benefits for numerous employer and government plans.",
      "Sullivan Recovery accepts Beacon in-network benefits for substance use treatment and helps members navigate authorization requirements.",
      "Many families have a medical insurance card and a separate behavioral health administrator — we find the correct contact, benefits, and authorization path for both.",
    ],
  },
  covered: {
    eyebrow: "What may be covered",
    title: "Beacon-authorized services",
    items: [...STANDARD_COVERED_ITEMS],
  },
  inNetwork: {
    title: "In-network Beacon provider",
    paragraphs: [
      "We bill Beacon for covered detox and residential services when your plan lists Sullivan Recovery as in-network.",
      "Our admissions staff speaks the language of behavioral health carve-outs — deductibles, visit limits, and medical necessity documentation.",
    ],
  },
  faqs: [
    {
      question: "Is Beacon the same as my medical insurance card?",
      answer:
        "Often your medical card is one company and behavioral health is administered separately through Beacon or Carelon. We identify the right number to call during verification.",
    },
    {
      question: "Does Beacon require a referral?",
      answer:
        "Some Beacon plans require PCP referral or pre-authorization. We help complete clinical documentation for approval.",
    },
    {
      question: "What levels of care does Beacon cover?",
      answer:
        "Detox and residential are commonly covered when medically necessary. We confirm your specific benefit grid before admission.",
    },
    {
      question: "How do I verify Beacon benefits?",
      answer:
        "Call admissions or use our online verify form — include your medical and behavioral health ID numbers if you have both.",
    },
  ],
  cta: {
    title: "Verify Beacon coverage",
    description:
      "We will confirm in-network status and estimated costs for Sullivan Recovery programs.",
  },
};
