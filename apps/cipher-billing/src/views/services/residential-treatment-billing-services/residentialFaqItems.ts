import type { FaqItem } from "@sweetmedia/seo-schema";

/** Core residential FAQs for accordion + FAQPage JSON-LD. */
export const RESIDENTIAL_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is the billing code for residential treatment?",
    answer:
      "Common residential treatment billing codes include HCPCS H0017 (behavioral health residential services, per diem per day), H0018 (short-term residential, non-hospital, typically 1–30 days), and H0019 (long-term residential, non-hospital, typically more than 30 days). Room and board are not included under H0018 and H0019—program services bill through the Healthcare Common Procedure Coding System while lodging costs stay separate.",
  },
  {
    question: "Does insurance cover residential mental health and addiction treatment?",
    answer:
      "Many insurance companies cover residential treatment for substance use disorder and mental health when medical necessity, ASAM level-of-care, and authorization requirements are met. Medicaid, Medicare, and commercial plans each set their own coverage rules for treatment centers. Cipher verifies benefits and pre-authorization before patients admit so treatment facilities receive timely reimbursement.",
  },
  {
    question: "What documentation is required for residential treatment billing compliance?",
    answer:
      "Payers require date of service, provider credentials, length of service, clinical notes, ASAM assessment documentation when applicable, and an active treatment plan. Place of service code 55 applies to residential substance use treatment facilities; mental health residential sites follow payer-specific rules. Cipher reviews documentation against regulations before insurance claims go out—staying compliant without burying clinical staff.",
  },
  {
    question: "How do residential treatment facilities bill for medication management?",
    answer:
      "Medication management may bill as separate CPT services when not bundled into the residential per diem—depending on payer and program design. Cipher maps whether psychiatric medication services are included in H0017 or require distinct codes, so patients receive covered care without duplicate-day denials.",
  },
  {
    question: "What are common residential treatment billing denials?",
    answer:
      "Frequent claim denials include missing or expired authorization, insufficient ASAM or medical necessity documentation, billing room and board under program HCPCS codes, concurrent individual and group therapy conflicts, and level-of-care transitions without new auth numbers. Cipher pre-bill checks catch these patterns before they hit accounts receivable.",
  },
  {
    question: "Why outsource residential treatment billing to a specialist?",
    answer:
      "Navigating complexities of behavioral health inpatient billing—per diem HCPCS, modifiers, payer-specific reimbursement rates, and utilization review—pulls clinical staff away from patient care. Cipher’s residential treatment billing services act as your billing partner so treatment providers focus on clients while we handle the billing process end to end.",
  },
];
