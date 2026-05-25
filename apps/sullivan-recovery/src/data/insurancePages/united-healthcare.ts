import { INSURANCE_VERIFICATION_PLANS } from "@/data/insurance";
import { createVerificationPage, insImg } from "./shared";

const plan = INSURANCE_VERIFICATION_PLANS.find((p) => p.slug === "united-healthcare")!;

export const unitedHealthcareInsurancePage = createVerificationPage(plan, {
  hero: {
    eyebrow: "Benefits verification · UnitedHealthcare",
    title: "UnitedHealthcare rehab coverage at",
    titleAccent: "Sullivan Recovery",
    description:
      "We verify UnitedHealthcare and Optum plans for medical detox and residential treatment — employer, individual, and Medicare products.",
    image: insImg("sr_facility_3.png"),
    imageAlt: "Sullivan Recovery campus — UnitedHealthcare benefits verification",
  },
  intro: {
    title: "Using UnitedHealthcare for",
    titleAccent: "addiction treatment",
    paragraphs: [
      "UnitedHealthcare and Optum administer millions of employer, individual, and Medicare plans with behavioral health benefits. Coverage for detox and residential care depends on your specific policy, network tier, and medical necessity.",
      "Sullivan Recovery verifies UnitedHealthcare benefits directly with the plan — mapping detox days, residential authorization, copays, and out-of-pocket limits before you admit.",
      "Whether your card says UHC, Optum, or a regional affiliate, share your member ID and we will identify the correct benefits line and authorization path.",
    ],
  },
  inNetwork: {
    eyebrow: "Your coverage",
    title: "UnitedHealthcare verification at Sullivan Recovery",
    paragraphs: [
      "Many UnitedHealthcare products include substance use disorder benefits for medically supervised detox and inpatient rehab. We confirm in-network status, carve-outs, and any separate behavioral health administrator on your policy.",
      "Our admissions team documents clinical need for authorization and keeps you informed at each step — verification, pre-auth, and cost summary.",
    ],
  },
  faqs: [
    {
      question: "Does UnitedHealthcare cover detox?",
      answer:
        "Many UHC plans cover medical detox when clinically necessary. We verify your medical and behavioral health benefits and explain any prior authorization requirements.",
    },
    {
      question: "What is the difference between UHC and Optum?",
      answer:
        "Optum often manages behavioral health for UnitedHealthcare plans. We identify which number to call and which ID to use during verification.",
    },
    {
      question: "Can I use UnitedHealthcare if I live outside California?",
      answer:
        "We treat members traveling to Mission Viejo for care. Verification confirms whether your plan covers out-of-area residential treatment.",
    },
    {
      question: "How do I start verification?",
      answer:
        "Use the form on our insurance page or call admissions 24/7 with your member ID and date of birth.",
    },
  ],
  cta: {
    title: "Verify UnitedHealthcare benefits",
    description:
      "Free, confidential review of detox and residential coverage at Sullivan Recovery.",
  },
});
