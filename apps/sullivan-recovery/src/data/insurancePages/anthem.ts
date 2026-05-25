import type { InsurancePageData } from "@/types/insurancePage";
import { carrierByHref, insImg, STANDARD_COVERED_ITEMS } from "./shared";

const carrier = carrierByHref("/insurance/anthem/");

export const anthemInsurancePage: InsurancePageData = {
  canonical: "/insurance/anthem/",
  carrier,
  highlights: [
    {
      icon: "ri-map-pin-2-line",
      title: "California Blue Cross",
      description: "Anthem Blue Cross products common across Orange County.",
    },
    {
      icon: "ri-hospital-line",
      title: "In-network rehab",
      description: "Lower cost share versus out-of-network when your plan allows.",
    },
    {
      icon: "ri-file-list-3-line",
      title: "HMO & PPO clarity",
      description: "We explain network rules and referral requirements upfront.",
    },
    {
      icon: "ri-team-line",
      title: "Clinical admissions",
      description: "Physician-led detox with residential step-down on site.",
    },
  ],
  hero: {
    eyebrow: "In-network · Anthem Blue Cross",
    title: "Anthem rehab coverage in",
    titleAccent: "Orange County",
    description:
      "In-network Anthem Blue Cross benefits for drug and alcohol detox and residential treatment at our Mission Viejo campus.",
    image: insImg("sr_facility_7.png"),
    imageAlt: "Sullivan Recovery facility grounds — Anthem in-network rehab",
  },
  intro: {
    title: "Anthem Blue Cross",
    titleAccent: "rehab benefits",
    paragraphs: [
      "Anthem Blue Cross plans commonly include behavioral health and substance use treatment — including detox, residential programs, and outpatient follow-up when authorized.",
      "Sullivan Recovery verifies Anthem benefits upfront, walks you through network status and cost sharing, and coordinates clinical admission once coverage is clear.",
      "From Medi-Cal managed products to employer PPO plans, we confirm your Anthem card, behavioral health carve-out (if any), and authorization path before you admit.",
    ],
  },
  covered: {
    eyebrow: "What may be covered",
    title: "Anthem benefits at a glance",
    items: [...STANDARD_COVERED_ITEMS],
  },
  inNetwork: {
    title: "In-network provider",
    paragraphs: [
      "We participate in the Anthem Blue Cross network for substance use disorder treatment in Mission Viejo, which can lower your share of cost versus out-of-network options.",
      "California members across Orange County and surrounding areas often use PPO and HMO products — we confirm your plan type during verification.",
    ],
  },
  faqs: [
    {
      question: "Is Sullivan Recovery in-network with Anthem?",
      answer:
        "Yes. We are an in-network Anthem Blue Cross provider for appropriate levels of substance use treatment.",
    },
    {
      question: "Does Anthem cover residential rehab?",
      answer:
        "Many Anthem plans cover residential treatment after detox when medically necessary and authorized. We verify length-of-stay and benefit limits with your plan.",
    },
    {
      question: "What if I have an Anthem PPO?",
      answer:
        "PPO plans may offer out-of-network benefits at a different rate. We still verify and explain both in-network and out-of-network scenarios before you admit.",
    },
    {
      question: "How long does Anthem verification take?",
      answer:
        "Often within one business day when we have your member ID and date of birth. Urgent admissions can be expedited when clinically appropriate.",
    },
  ],
  cta: {
    title: "Check your Anthem coverage",
    description:
      "Submit your member information or call admissions — we handle the carrier conversation for you.",
  },
};
