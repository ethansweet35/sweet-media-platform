import type { InsurancePageData } from "@/types/insurancePage";
import { carrierByHref, insImg, STANDARD_COVERED_ITEMS } from "./shared";

const carrier = carrierByHref("/insurance/aetna/");

export const aetnaInsurancePage: InsurancePageData = {
  canonical: "/insurance/aetna/",
  carrier,
  highlights: [
    {
      icon: "ri-building-2-line",
      title: "Employer & marketplace",
      description: "Group and individual Aetna plans with substance use benefits.",
    },
    {
      icon: "ri-nurse-line",
      title: "Medicare & Medicaid",
      description: "Many Advantage and Medicaid products cover medically necessary care.",
    },
    {
      icon: "ri-file-shield-2-line",
      title: "Pre-auth handled",
      description: "We coordinate authorization so admission is not delayed.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Detox → residential",
      description: "Continuum of care on one Mission Viejo campus.",
    },
  ],
  hero: {
    eyebrow: "In-network · Aetna",
    title: "Aetna rehab coverage at",
    titleAccent: "Sullivan Recovery",
    description:
      "We verify Aetna benefits for medical detox and residential treatment in Mission Viejo — employer, marketplace, Medicare, and Medicaid plans.",
    image: insImg("sr_facility_1.png"),
    imageAlt: "Sullivan Recovery courtyard and residential campus in Mission Viejo",
  },
  intro: {
    title: "Using Aetna for",
    titleAccent: "addiction treatment",
    paragraphs: [
      "Aetna plans often include substance use and mental health benefits for detox, residential care, therapy, and medications when medically necessary. Policy details vary by employer, individual plan, and state.",
      "Sullivan Recovery is in-network with Aetna. Our admissions team verifies your benefits, explains deductibles and copays, and handles pre-authorization when your plan requires it.",
      "Whether you are on an employer plan in Orange County or an individual policy, we map medical detox and residential benefits before you travel to our campus — so you know what is covered and what to budget.",
    ],
  },
  covered: {
    eyebrow: "What may be covered",
    title: "Aetna benefits we help you use",
    items: [...STANDARD_COVERED_ITEMS],
  },
  inNetwork: {
    title: "In-network with Sullivan Recovery",
    paragraphs: [
      "As an in-network Aetna provider, we bill your plan directly for covered services — reducing out-of-pocket costs compared with out-of-network care when your plan allows.",
      "We also support dual diagnosis treatment when your Aetna behavioral health benefits include mental health and substance use care together.",
    ],
  },
  faqs: [
    {
      question: "Does Aetna cover detox at Sullivan Recovery?",
      answer:
        "Many Aetna plans cover medically supervised detox when clinically necessary. We confirm your specific medical and behavioral health benefits before admission.",
    },
    {
      question: "Do I need pre-authorization for Aetna?",
      answer:
        "Some Aetna plans require pre-auth for residential treatment. We manage that process with your insurer so admission is not delayed unnecessarily.",
    },
    {
      question: "What Aetna plan types do you accept?",
      answer:
        "We work with employer-sponsored Aetna, individual and marketplace plans, and many Medicare Advantage and Medicaid products — verification confirms your exact coverage.",
    },
    {
      question: "How do I verify my Aetna benefits?",
      answer:
        "Use the verify form on our insurance page or call admissions with your member ID. We respond with a clear summary of coverage and estimated costs.",
    },
  ],
  cta: {
    title: "Verify your Aetna benefits",
    description:
      "Free, confidential verification — we will confirm detox and residential coverage at Sullivan Recovery.",
  },
};
