import { INSURANCE_VERIFICATION_PLANS } from "@/data/insurance";
import { createVerificationPage, insImg } from "./shared";

const plan = INSURANCE_VERIFICATION_PLANS.find((p) => p.slug === "blue-cross-blue-shield")!;

export const blueCrossInsurancePage = createVerificationPage(plan, {
  hero: {
    eyebrow: "Benefits verification · Blue Cross Blue Shield",
    title: "BCBS rehab benefits at",
    titleAccent: "Sullivan Recovery",
    description:
      "Blue Cross Blue Shield plans nationwide — we verify California treatment benefits for detox and residential programs.",
    image: insImg("sr_facility_5.png"),
    imageAlt: "Clinical care environment at Sullivan Recovery — BCBS verification",
  },
  intro: {
    title: "Blue Cross Blue Shield",
    titleAccent: "treatment coverage",
    paragraphs: [
      "BCBS is a federation of independent plans — your card may reference Anthem, Blue Shield of California, or another licensee. Benefits and networks differ by state and employer.",
      "Sullivan Recovery verifies your specific BCBS policy, clarifies in-network status, and explains how medical and behavioral health benefits apply to detox and residential care.",
      "We help families understand PPO out-of-network options when Sullivan Recovery is not in your local BCBS network but your plan still offers reimbursement.",
    ],
  },
  inNetwork: {
    eyebrow: "Your coverage",
    title: "BCBS verification process",
    paragraphs: [
      "Bring your member ID — we identify the correct BCBS plan administrator and benefits phone line.",
      "For California Blue Shield and related products, we map substance use benefits, authorization requirements, and estimated member costs before admission.",
    ],
  },
  faqs: [
    {
      question: "Is Sullivan Recovery in-network with my BCBS plan?",
      answer:
        "It depends on your licensee and product. Verification confirms network status — we also explain out-of-network PPO reimbursement when applicable.",
    },
    {
      question: "Does BCBS cover out-of-state treatment?",
      answer:
        "Many PPO plans offer benefits for care in California. We confirm travel and out-of-area rules on your policy.",
    },
    {
      question: "What if I have Blue Shield of California?",
      answer:
        "Blue Shield is a BCBS licensee. We verify those products regularly and coordinate authorization with your plan.",
    },
    {
      question: "How do I verify BCBS online?",
      answer:
        "Use our insurance verification form with your member ID, or call admissions for immediate assistance.",
    },
  ],
  cta: {
    title: "Verify BCBS benefits",
    description: "Confidential benefits review for detox and residential treatment in Mission Viejo.",
  },
});
