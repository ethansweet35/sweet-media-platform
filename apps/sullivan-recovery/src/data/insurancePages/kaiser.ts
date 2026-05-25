import { INSURANCE_VERIFICATION_PLANS } from "@/data/insurance";
import { createVerificationPage, insImg } from "./shared";

const plan = INSURANCE_VERIFICATION_PLANS.find((p) => p.slug === "kaiser")!;

export const kaiserInsurancePage = createVerificationPage(plan, {
  hero: {
    eyebrow: "Benefits verification · Kaiser",
    title: "Kaiser members seeking",
    titleAccent: "outside care",
    description:
      "Kaiser Permanente plans often require coordination for non-Kaiser facilities — we verify options and out-of-network benefits when available.",
    image: insImg("sr_facility_8.png"),
    imageAlt: "Sullivan Recovery facility — Kaiser member benefits verification",
  },
  intro: {
    title: "Kaiser Permanente &",
    titleAccent: "rehab coverage",
    paragraphs: [
      "Kaiser Permanente is an integrated health system — most care happens within Kaiser facilities. Some members still have supplemental policies, out-of-network PPO benefits, or situations where Kaiser authorizes outside residential treatment.",
      "Sullivan Recovery provides honest verification: we confirm whether your Kaiser product offers any benefit for non-Kaiser detox or residential care, and we explain self-pay or supplemental coverage when it does not.",
      "If you are considering leaving the Kaiser system for specialized addiction treatment, call admissions first — we will map every viable payment path.",
    ],
  },
  inNetwork: {
    eyebrow: "Important note",
    title: "Kaiser verification expectations",
    paragraphs: [
      "Sullivan Recovery is not a Kaiser medical group facility. Many Kaiser HMO members will need Kaiser-internal referrals for covered care.",
      "We still verify supplemental plans, prior Kaiser coverage transitions, and PPO products that may reimburse a portion of private rehab — transparency before you admit is our priority.",
    ],
  },
  faqs: [
    {
      question: "Can I use Kaiser insurance at Sullivan Recovery?",
      answer:
        "Usually not as in-network Kaiser HMO care. We verify whether you have supplemental, out-of-network, or transitional benefits that apply.",
    },
    {
      question: "What if Kaiser denies outside care?",
      answer:
        "We discuss self-pay rates, financing when appropriate, and any appeal paths your plan offers — before you commit to admission.",
    },
    {
      question: "Do you bill Kaiser directly?",
      answer:
        "When verification confirms billable benefits, we bill accordingly. If not, we provide clear private-pay estimates.",
    },
    {
      question: "Should I get a Kaiser referral first?",
      answer:
        "For HMO products, often yes. Call admissions — we will advise based on your specific Kaiser plan type.",
    },
  ],
  cta: {
    title: "Discuss Kaiser options",
    description: "Honest verification of benefits, private pay, and supplemental coverage paths.",
  },
});
