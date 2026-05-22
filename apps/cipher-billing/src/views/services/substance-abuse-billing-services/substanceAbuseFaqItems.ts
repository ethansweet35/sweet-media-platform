import type { FaqItem } from "@sweetmedia/seo-schema";

/** Core substance abuse FAQs for accordion + FAQPage JSON-LD. */
export const SUBSTANCE_ABUSE_FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do substance abuse billing codes differ from standard medical billing?",
    answer:
      "Substance abuse billing uses behavioral health HCPCS codes—such as H0015 for IOP, H0018 for short-term residential, H0004 for counseling increments, and program per diem lines—rather than typical office visit E/M codes alone. Disorder billing must match ASAM level of care, place of service, and payer-specific abuse treatment rules. Cipher maintains crosswalks for detox, residential, PHP, and outpatient SUD treatment so claim submission paths stay accurate.",
  },
  {
    question: "What compliance requirements apply to SUD treatment center billing?",
    answer:
      "Treatment centers must meet HIPAA, payer documentation standards, and state-specific healthcare regulations for substance use disorder programs. Documentation should support medical necessity, assessment updates, and services rendered with provider credentials and session length. Cipher reviews records before insurance claims go out—helping avoid delays tied to documentation errors.",
  },
  {
    question: "How can billing services help reduce claim denials for addiction treatment?",
    answer:
      "Specialized abuse billing teams catch authorization gaps, wrong HCPCS selection, and dual-diagnosis bundling issues in pre-bill review. Cipher works claim denials through appeals with clinical documentation—improving financial performance without adding administrative tasks to your treatment providers.",
  },
  {
    question: "How do billing services handle prior authorization for substance abuse programs?",
    answer:
      "Cipher treats insurance verification and prior authorization as one workflow—verifying patient insurance benefits before admission, tracking concurrent review, and escalating before auth lapses on residential, detox, or outpatient programs.",
  },
  {
    question: "What insurance verification challenges are specific to substance abuse claims?",
    answer:
      "SUD benefits vary widely by plan—some carve out behavioral health, others cap residential days or require different billing providers for professional vs institutional components. Cipher verifies eligibility up front and documents routing so treatment facilities know coverage before patients admit.",
  },
  {
    question: "Why outsource substance abuse billing instead of relying on software alone?",
    answer:
      "Billing software automates tasks but does not replace certified coders who understand disorder sud rules, state regulations, and payer edits. Cipher’s substance abuse billing services handle verification, claim submission, denial management, and reporting—so your center can reduce full-time billing staff overhead while enhancing financial health through accurate billing.",
  },
];
