import { INSURANCE_VERIFICATION_PLANS } from "@/data/insurance";
import { createVerificationPage, insImg } from "./shared";

const plan = INSURANCE_VERIFICATION_PLANS.find((p) => p.slug === "tricare")!;

export const tricareInsurancePage = createVerificationPage(plan, {
  hero: {
    eyebrow: "Benefits verification · Tricare",
    title: "Tricare rehab coverage for",
    titleAccent: "military families",
    description:
      "Active duty, veterans, and family TRICARE plans — we verify substance use benefits for Sullivan Recovery in California.",
    image: insImg("sr_facility_6.png"),
    imageAlt: "Peaceful recovery environment at Sullivan Recovery — Tricare verification",
  },
  intro: {
    title: "Tricare benefits for",
    titleAccent: "substance use treatment",
    paragraphs: [
      "TRICARE offers several plan options (Prime, Select, For Life, etc.) with different rules for civilian substance use treatment. Authorization and referral requirements vary by plan and duty status.",
      "Sullivan Recovery helps military families understand covered levels of care — detox, residential, and aftercare — and any required referrals or prior authorization.",
      "We treat TRICARE members with the same confidentiality and urgency as all admissions, documenting medical necessity for authorization when required.",
    ],
  },
  inNetwork: {
    eyebrow: "Military benefits",
    title: "TRICARE verification support",
    paragraphs: [
      "We verify TRICARE eligibility, explain cost shares, and identify whether your plan requires a referral from a primary manager or MTF.",
      "California-based families and service members relocating for treatment receive a clear written summary before admission.",
    ],
  },
  faqs: [
    {
      question: "Does TRICARE cover civilian rehab?",
      answer:
        "Many TRICARE plans cover civilian detox and residential care when medically necessary and properly authorized. We confirm your plan’s rules.",
    },
    {
      question: "Do I need a referral?",
      answer:
        "TRICARE Prime often requires referrals; Select and other plans differ. Verification identifies your requirement.",
    },
    {
      question: "Are dependents covered?",
      answer:
        "Eligible family members may have substance use benefits. We verify using the dependent’s sponsor information and plan type.",
    },
    {
      question: "How do we start TRICARE verification?",
      answer:
        "Call admissions with sponsor ID and plan type, or submit the online verify form with TRICARE listed as your carrier.",
    },
  ],
  cta: {
    title: "Verify TRICARE coverage",
    description: "Support for service members and families — confidential benefits review.",
  },
});
