import type { FaqItem } from "@sweetmedia/seo-schema";

/** Core PHP FAQs for accordion + FAQPage JSON-LD (essentials live in PhpBillingEssentials). */
export const PHP_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is PHP in medical billing?",
    answer:
      "PHP in billing refers to partial hospitalization program services—a structured behavioral health program typically requiring at least four hours of programming per day and twenty hours per week. Patients receive therapeutic services during the day while living at home. Billing uses institutional and professional codes (CPT and HCPCS), revenue code 0912 where required, physician certification, and recertification on day eighteen then at thirty-day intervals.",
  },
  {
    question: "Does Medicare cover PHP services?",
    answer:
      "Medicare covers partial hospitalization program services when medical necessity and documentation requirements are met. Many commercial plans and state Medicaid programs also cover PHP treatment; under the Affordable Care Act, policies in participating states must include mental health and substance use benefits that can include PHP. Cipher verifies insurance coverage and payer-specific PHP billing guidelines before claim submissions.",
  },
  {
    question: "Can PHP services be billed with individual therapy on the same day?",
    answer:
      "Often no—many payers allow only one PHP session per day, especially for patients with dual diagnosis of mental health and substance use disorders. Separate psychotherapy may bundle into the PHP per diem or deny if billed in conflict. Cipher confirms bundling rules so partial hospitalization and individual sessions do not trigger duplicate-day denials.",
  },
  {
    question: "How should PHP billing be handled when a patient steps down to IOP?",
    answer:
      "When stepping down from partial hospitalization to intensive outpatient, billing must switch to IOP hours, codes, and authorization—not PHP per diem. Cipher maintains separate crosswalks and pre-bill checks so PHP services end before IOP services begin on the same dates, protecting billing accuracy and cash flow.",
  },
  {
    question: "What are common PHP billing compliance issues?",
    answer:
      "Common issues include missing recertification, insufficient hours documented (minimum four hours per day and twenty hours per week on many plans), wrong revenue codes, billing more than one PHP session per day for dual-diagnosis patients, and weak medical necessity in notes. Cipher’s compliance reviews catch documentation gaps before claims go out.",
  },
  {
    question: "Why does PHP need specialized revenue cycle management?",
    answer:
      "Behavioral health PHP billing combines UB-04 institutional claims, per diem HCPCS, recurring billing cycles, and strict compliance—unique challenges general medical billers miss. Cipher’s PHP billing services let your facility focus on patient care while we manage claim submissions, denials, and timely reimbursement.",
  },
];
