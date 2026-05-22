import type { FaqItem } from "@sweetmedia/seo-schema";

/** Plain-text IOP FAQs — shared by accordion UI and FAQPage JSON-LD. */
export const IOP_FAQ_ITEMS: FaqItem[] = [
  {
    question: "What are IOP services in behavioral health billing?",
    answer:
      "IOP services are intensive outpatient program services—structured mental health or substance use treatment typically furnished nine to nineteen hours per week, more than routine outpatient services but less than PHP. In medical billing, IOP services may be reported as outpatient psychiatric program services (for example S9480 per diem), substance use HCPCS codes such as H0015, or psychotherapy CPT codes when payers allow separate payment. Cipher helps IOP providers align clinical documentation, authorization, and billing codes to the outpatient program actually delivered.",
  },
  {
    question: "What codes are used for IOP billing?",
    answer:
      "IOP billing typically combines institutional and professional billing codes depending on payer and outpatient program design. Common HCPCS codes include S9480 (intensive outpatient psychiatric services, per diem), H0015 (alcohol and/or drug services — IOP), H2036 (behavioral health program services), and H0004 (behavioral health counseling in 15-minute increments). Mental health and substance use programs may use revenue code 0905 on UB-04 claims, Medicare condition code 92 where Medicare coverage applies, and CPT codes such as 90853 (group therapy) and 90837 (individual psychotherapy, often a session 45 minutes or more) when billed outside a bundled per diem. Cipher maps whether you need HCPCS or CPT—or both—before intensive outpatient claims go out.",
  },
  {
    question: "How do Medicare and commercial IOP billing requirements differ?",
    answer:
      "Medicare IOP billing follows national coverage, OPPS payment rules, condition code 92, and Medicare claims processing manual guidance for hospital outpatient departments and other eligible sites. Commercial and Medicaid plans set their own billing requirements for IOP services—authorization rules, covered program services, and whether HCPCS or CPT paths apply. Cipher maintains payer-specific crosswalks so Medicare and Medicaid claims and commercial outpatient services on the same intensive outpatient program do not share one generic template.",
  },
  {
    question: "How does Cipher handle IOP authorization denials?",
    answer:
      "We treat authorization and IOP services billing as one workflow. Cipher tracks prior auth, concurrent review, and weekly re-authorization against the program days you bill, escalates before auth lapses, and works denials with clinical documentation and payer-specific appeal paths. When an IOP claim is denied for authorization, medical necessity, or coding edits, we appeal with root-cause fixes so the same issue does not repeat on the next census week for your intensive outpatient program.",
  },
  {
    question: "How is IOP billing different from PHP billing?",
    answer:
      "IOP and PHP are different levels of care with different hour requirements, documentation expectations, and payer billing requirements. PHP generally requires twenty or more hours per week; IOP services often fall between nine and nineteen. Billing must reflect the correct program intensity—service units, revenue codes, and HCPCS codes should match the level billed, not a generic outpatient template. Cipher maintains separate crosswalks and UR cadences for intensive outpatient and PHP so overlap within seven days, downcoding, and duplicate-day denials are caught in pre-bill review.",
  },
  {
    question: "Does Cipher bill IOP on UB-04 or CMS-1500?",
    answer:
      "Both, depending on how your payer and contract define the IOP benefit for mental health and substance use program services. Institutional intensive outpatient is often billed on UB-04 with revenue code 0905 and appropriate HCPCS lines for hospital outpatient departments; professional components may route on CMS-1500 when the plan allows separate psychotherapy or assessment payment. Cipher determines claim type per payer and documents the routing in your onboarding crosswalk so admissions and clinical staff know which IOP billing path applies before health services render.",
  },
  {
    question: "What are common IOP billing compliance errors that trigger audits?",
    answer:
      "Frequent audit triggers include insufficient documentation of medical necessity and weekly hours, incorrect level of care, IOP/PHP overlap on the same dates, wrong revenue codes or service units, billing group and individual sessions against payer bundling rules, and missing modifiers for off-campus provider-based outpatient departments. Cipher reviews documentation and coding against IOP billing requirements before submission and monitors denial trends so outpatient program teams fix root causes—not just resubmit claims.",
  },
  {
    question: "How long until my IOP program receives the first payment after switching to Cipher?",
    answer:
      "Most clients receive their first payment within 30 days of onboarding—the same benchmark we publish on our homepage. IOP billing services onboarding includes an audit of your HCPCS and CPT setup, authorization workflow, and claim history so your first institutional and professional IOP services claims are submission-ready instead of triggering preventable edits on week one.",
  },
  {
    question: "What documentation is required for IOP concurrent review and re-authorization?",
    answer:
      "Payers typically require a current treatment plan, progress notes tied to program hours, attendance or census records, measurable treatment goals, and UR summaries that justify continued intensive outpatient level of care. Cipher aligns documentation templates to your billed dates and behavioral health IOP billing requirements, and flags gaps before the concurrent review window closes—so authorization stays active while patients remain in your outpatient program.",
  },
  {
    question: "Can Cipher bill virtual IOP or telehealth intensive outpatient programs?",
    answer:
      "Yes. Telehealth and hybrid IOP services add payer-specific place-of-service, modifier, and Medicare coverage rules on top of standard intensive outpatient billing. Cipher verifies benefits and authorization requirements for virtual mental health and substance use IOP programs up front, applies the correct HCPCS and CPT standards for remote delivery, and monitors policy changes so telehealth IOP billing stays compliant as payers update outpatient services rules.",
  },
];
