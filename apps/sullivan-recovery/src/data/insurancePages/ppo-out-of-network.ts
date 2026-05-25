import { INSURANCE_VERIFICATION_PLANS } from "@/data/insurance";
import { createVerificationPage, insImg } from "./shared";

const plan = INSURANCE_VERIFICATION_PLANS.find((p) => p.slug === "ppo-out-of-network")!;

export const ppoOutOfNetworkInsurancePage = createVerificationPage(plan, {
  hero: {
    eyebrow: "PPO & out-of-network",
    title: "Private PPO rehab",
    titleAccent: "benefits explained",
    description:
      "Out-of-network PPO plans often reimburse a portion of detox and residential care — we verify your policy and estimate reimbursement.",
    image: insImg("sr_facility_9.png"),
    imageAlt: "Sullivan Recovery — PPO and out-of-network insurance verification",
  },
  intro: {
    title: "PPO & out-of-network",
    titleAccent: "coverage",
    paragraphs: [
      "Private PPO plans frequently allow you to choose treatment providers. Even when Sullivan Recovery is out-of-network, your plan may reimburse a percentage of allowed charges after deductible.",
      "We verify out-of-network benefits, explain superbill or direct reimbursement processes, and give realistic out-of-pocket estimates before admission.",
      "Combining PPO reimbursement with transparent private-pay rates helps families plan without surprise bills after treatment.",
    ],
  },
  inNetwork: {
    eyebrow: "How it works",
    title: "Out-of-network PPO at Sullivan Recovery",
    paragraphs: [
      "Verification identifies your out-of-network deductible, coinsurance, and annual out-of-pocket maximum.",
      "We provide documentation many PPO plans require for substance use claims — clinical records, itemized statements, and CPT-aligned billing support.",
    ],
  },
  coveredTitle: "Services your PPO may reimburse",
  faqs: [
    {
      question: "Will my PPO pay for out-of-network rehab?",
      answer:
        "Many do, at a lower percentage than in-network care. Verification confirms your out-of-network substance use benefit.",
    },
    {
      question: "Do I pay upfront?",
      answer:
        "Often you pay Sullivan Recovery and submit claims to your PPO, or we discuss payment plans. We explain the flow during verification.",
    },
    {
      question: "What is a superbill?",
      answer:
        "An itemized statement you submit to insurance for reimbursement. We provide billing documentation aligned with your plan’s requirements.",
    },
    {
      question: "Can I still verify if I am not sure of my network?",
      answer:
        "Yes — share your card. We identify in-network vs out-of-network status and the best payment path.",
    },
  ],
  cta: {
    title: "Verify PPO benefits",
    description: "Understand reimbursement, deductibles, and estimated costs before admission.",
  },
});
