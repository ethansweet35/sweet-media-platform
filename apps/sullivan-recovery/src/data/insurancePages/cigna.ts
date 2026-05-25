import type { InsurancePageData } from "@/types/insurancePage";
import { carrierByHref, insImg, STANDARD_COVERED_ITEMS } from "./shared";

const carrier = carrierByHref("/insurance/cigna/");

export const cignaInsurancePage: InsurancePageData = {
  canonical: "/insurance/cigna/",
  carrier,
  highlights: [
    {
      icon: "ri-global-line",
      title: "National employer plans",
      description: "Cigna coverage for teams and families relocating to treatment.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Dual diagnosis",
      description: "Integrated mental health and substance use when authorized.",
    },
    {
      icon: "ri-wallet-3-line",
      title: "Cost transparency",
      description: "Copays, coinsurance, and out-of-pocket max explained clearly.",
    },
    {
      icon: "ri-home-heart-line",
      title: "Residential on campus",
      description: "Step down from detox without changing facilities.",
    },
  ],
  hero: {
    eyebrow: "In-network · Cigna",
    title: "Cigna rehab coverage for",
    titleAccent: "detox & residential",
    description:
      "Use Cigna health insurance for substance use treatment at Sullivan Recovery — verification, pre-auth, and transparent cost conversations.",
    image: insImg("sr_facility_9.png"),
    imageAlt: "Sullivan Recovery exterior — Cigna-covered detox and residential care",
  },
  intro: {
    title: "Cigna coverage for",
    titleAccent: "substance use treatment",
    paragraphs: [
      "Cigna policies often cover addiction treatment including detox, inpatient rehab, therapy, and medication management based on medical necessity and plan design.",
      "Our team helps Cigna members understand deductibles, copays, and session or day limits before starting care — so you can focus on recovery.",
      "If your Cigna plan is based outside California, we still verify whether benefits apply for treatment in Mission Viejo and document medical necessity for authorization.",
    ],
  },
  covered: {
    eyebrow: "What may be covered",
    title: "Services Cigna may authorize",
    items: [...STANDARD_COVERED_ITEMS],
  },
  inNetwork: {
    title: "In-network Cigna care",
    paragraphs: [
      "Sullivan Recovery is in-network with Cigna for qualifying substance use and mental health services in our Mission Viejo facility.",
      "We coordinate medical detox and residential treatment on one campus — simplifying authorization and continuity for Cigna members.",
    ],
  },
  faqs: [
    {
      question: "Does Cigna cover mental health and addiction together?",
      answer:
        "Many Cigna plans include both when dual diagnosis care is clinically indicated. We assess and document medical necessity for your authorization.",
    },
    {
      question: "Will Cigna pay for the full stay?",
      answer:
        "Coverage depends on your plan’s benefit limits, deductibles, and authorization. We provide a written summary of expected benefits and out-of-pocket costs.",
    },
    {
      question: "Can I use Cigna for out-of-state plans?",
      answer:
        "We verify all Cigna products — share your ID card and we confirm whether your plan covers treatment in California.",
    },
    {
      question: "Where do I start with Cigna verification?",
      answer:
        "Visit our insurance page verify form or call admissions 24/7 with your Cigna member ID.",
    },
  ],
  cta: {
    title: "Verify Cigna benefits today",
    description:
      "Confidential, no-obligation review of your Cigna plan for detox and residential care.",
  },
};
