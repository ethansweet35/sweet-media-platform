import type { FaqItem } from "@sweetmedia/seo-schema";

/** Core detox FAQs for accordion + FAQPage JSON-LD. */
export const DETOX_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is detox in medical billing?",
    answer:
      "Detox in medical billing is the revenue cycle for medically supervised withdrawal from alcohol, drugs, and other substances—typically billed with addiction-treatment H-codes (H0008–H0014), institutional revenue codes such as 0116 on inpatient UB-04 claims, and supporting ICD-10 diagnosis codes. Cipher maps hospital inpatient detox, residential detox, ambulatory detox, and outpatient detox paths so detoxification services align with the level of care documented in the chart.",
  },
  {
    question: "How do insurance pre-authorizations work for detox services?",
    answer:
      "Most commercial and many Medicaid plans require prior authorization for inpatient detox and some residential detox stays—often tied to ASAM criteria, bed-day limits, and concurrent review. Cipher runs insurance verification before admission, secures authorization numbers, and tracks extensions so detox services bill to active benefits with payer requirements documented on every claim.",
  },
  {
    question: "What documentation supports medical necessity for detox billing claims?",
    answer:
      "Payers expect admission assessments, withdrawal risk (especially alcohol and benzodiazepine), vitals and nursing notes, physician orders, and a plan that shows why 24/7 medical supervision is required. For dual diagnosis patients, documentation must support both substance disorder treatment and any concurrent mental health services without conflicting codes. Cipher reviews charts before claim submission to reduce medically necessary denials.",
  },
  {
    question: "What common detox billing errors cause claim denials?",
    answer:
      "Frequent issues include wrong H-code for acuity or setting (hospital vs residential vs ambulatory), missing revenue code 0116 on institutional claims, level-of-care mismatches, expired authorization, and weak discharge planning when patients leave against medical advice. Cipher applies accurate billing and coding compliance checks so claim denials and claim rejections are appealed with clinical context—not written off by default.",
  },
  {
    question: "How should detox billing codes change when patients step down to residential treatment?",
    answer:
      "When a patient transitions from inpatient detox to residential or PHP, billing codes must change on the admit/discharge date—H0008/H0009 lines close and H0010/H0011 or residential per diem codes (such as H0017/H0018) begin with new authorization. Cipher coordinates utilization management so services revenue does not gap between levels of care.",
  },
  {
    question: "How do Medicaid detox billing requirements differ from commercial insurance?",
    answer:
      "Medicaid detox billing often uses state-specific HCPCS edits, shorter authorization windows, and different medical necessity standards than Medicare Medicaid managed plans or commercial carriers. Cipher applies state rules at verification and claim submission so treatment facilities maintain financial health across payer mixes.",
  },
];
