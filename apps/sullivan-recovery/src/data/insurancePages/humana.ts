import { INSURANCE_VERIFICATION_PLANS } from "@/data/insurance";
import { createVerificationPage, insImg } from "./shared";

const plan = INSURANCE_VERIFICATION_PLANS.find((p) => p.slug === "humana")!;

export const humanaInsurancePage = createVerificationPage(plan, {
  hero: {
    eyebrow: "Benefits verification · Humana",
    title: "Humana insurance for",
    titleAccent: "detox & residential",
    description:
      "Humana Medicare Advantage, employer, and individual plans — we verify substance use benefits for Sullivan Recovery programs.",
    image: insImg("sr_facility_4.png"),
    imageAlt: "Residential treatment setting at Sullivan Recovery — Humana coverage",
  },
  intro: {
    title: "Humana coverage for",
    titleAccent: "rehab in Orange County",
    paragraphs: [
      "Humana offers employer, individual, and Medicare Advantage products with varying behavioral health benefits. Detox and residential coverage hinge on medical necessity, plan type, and authorization rules.",
      "We contact Humana on your behalf to confirm benefits, explain member responsibility, and outline the authorization timeline.",
      "Medicare Advantage members especially benefit from a written summary of covered days, copays, and any prior hospitalization requirements before traveling to treatment.",
    ],
  },
  inNetwork: {
    eyebrow: "Your coverage",
    title: "Humana benefits verification",
    paragraphs: [
      "Sullivan Recovery routinely verifies Humana policies for Orange County and out-of-state members seeking detox and residential care in California.",
      "If your plan uses a third-party behavioral health administrator, we identify that relationship during verification so the right benefits are applied.",
    ],
  },
  faqs: [
    {
      question: "Does Humana Medicare Advantage cover rehab?",
      answer:
        "Many Advantage plans include Part A–style inpatient benefits and supplemental behavioral health. We confirm your exact Humana product before admission.",
    },
    {
      question: "Is pre-authorization required?",
      answer:
        "Often yes for residential levels of care. We submit clinical documentation and track approval status with you.",
    },
    {
      question: "What copays should I expect?",
      answer:
        "Copays and coinsurance vary by plan. Verification includes an estimate of member responsibility for detox and residential episodes.",
    },
    {
      question: "How fast is Humana verification?",
      answer:
        "Typically within one business day with complete member information. Urgent clinical situations can be expedited.",
    },
  ],
  cta: {
    title: "Check Humana coverage",
    description: "Submit your member ID — we handle the carrier conversation confidentially.",
  },
});
