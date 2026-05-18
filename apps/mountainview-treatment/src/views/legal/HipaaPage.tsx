import LegalPage from "./LegalPage";

export default function HipaaPage() {
  return (
    <LegalPage
      badge="COMPLIANCE"
      title="HIPAA Notice of Privacy Practices"
      subtitle="How Mountain View Treatment uses and discloses your protected health information, and your rights as a patient."
      lastUpdated="January 1, 2025"
      intro="THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY. Mountain View Treatment Center is required by law to maintain the privacy of your protected health information (PHI) and to provide you with this notice of our legal duties and privacy practices."
      sections={[
        {
          heading: "What Is Protected Health Information?",
          body: [
            "Protected Health Information (PHI) is individually identifiable health information that relates to your past, present, or future physical or mental health or condition, the provision of healthcare to you, or the past, present, or future payment for healthcare services. PHI includes information in written, oral, and electronic forms.",
            "Substance use disorder patient records maintained by Mountain View Treatment are subject to additional federal confidentiality protections under 42 CFR Part 2, which generally prohibits disclosure without your written consent except in very limited circumstances.",
          ],
        },
        {
          heading: "How We May Use and Disclose Your Health Information",
          body: [
            "We use and disclose your health information for the purposes described below. In most cases, we do not need your specific authorization for these uses, though we may ask for it in some situations.",
          ],
          list: [
            "Treatment: To provide, coordinate, and manage your care — sharing information with physicians, therapists, and other providers involved in your treatment",
            "Payment: To obtain payment for your treatment from your insurance carrier or other payer",
            "Healthcare Operations: For quality improvement, staff training, accreditation, audits, and administrative functions",
            "As Required by Law: To comply with legal obligations, court orders, or regulatory requirements",
            "Public Health Activities: To report communicable diseases or other reportable conditions as required by law",
            "Serious Threat to Health or Safety: To prevent or lessen a serious and imminent threat to you or others",
            "Military and Veterans: If you are a member of the armed forces, as required by military authorities",
            "Workers' Compensation: As authorized by workers' compensation laws",
          ],
        },
        {
          heading: "Special Protections for Substance Use Disorder Records",
          body: [
            "Federal law (42 CFR Part 2) provides special protections for records related to your participation in a substance use disorder treatment program. These records may not be disclosed to any person or entity — including other healthcare providers — without your specific written consent, except in the following limited circumstances:",
          ],
          list: [
            "A medical emergency that poses an immediate threat to your health",
            "Communication among Mountain View Treatment staff for purposes of treatment",
            "Activities and reporting to oversight agencies as required by law",
            "Pursuant to a valid court order authorizing disclosure",
            "Research, audit, or evaluations that meet specific federal requirements",
          ],
        },
        {
          heading: "Uses and Disclosures Requiring Your Authorization",
          body: [
            "Other than the uses described above, we will not use or disclose your health information without your written authorization. This includes, but is not limited to:",
          ],
          list: [
            "Most disclosures of psychotherapy notes",
            "Marketing communications",
            "Sale of your health information",
            "Disclosures to family members, friends, or employers (unless you authorize or are incapacitated)",
            "Any disclosure not otherwise permitted by law",
          ],
        },
        {
          heading: "Your Rights Regarding Your Health Information",
          body: [
            "You have the following rights with respect to your protected health information. To exercise any of these rights, submit a written request to our Privacy Officer at the address below.",
          ],
          list: [
            "Right to Access: Request and obtain a copy of your health records",
            "Right to Amend: Request correction of information you believe is inaccurate or incomplete",
            "Right to an Accounting of Disclosures: Request a list of certain disclosures we have made of your PHI",
            "Right to Restrict: Request restrictions on how we use or disclose your PHI for treatment, payment, or operations",
            "Right to Confidential Communications: Request that we communicate with you in a particular way or at a specific location",
            "Right to Notice: Receive a paper copy of this notice upon request",
            "Right to a Breach Notice: Be notified if your unsecured PHI is involved in a breach",
          ],
        },
        {
          heading: "Our Duties",
          body: [
            "Mountain View Treatment is required by law to maintain the privacy of your protected health information, provide you with this notice of our legal duties and privacy practices, and abide by the terms of the notice currently in effect.",
            "We reserve the right to change our privacy practices and the terms of this notice. If we make a material change, we will revise this notice and make the new notice available upon request. Changes apply to PHI we already hold as well as PHI we receive in the future.",
          ],
        },
        {
          heading: "How to File a Complaint",
          body: [
            "If you believe your privacy rights have been violated, you may file a complaint with Mountain View Treatment's Privacy Officer or with the Secretary of the U.S. Department of Health and Human Services. You will not be penalized or retaliated against for filing a complaint.",
            "To file a complaint with HHS, visit the Office for Civil Rights website at hhs.gov/ocr/privacy or call 1-800-368-1019.",
          ],
        },
        {
          heading: "Contact Our Privacy Officer",
          body: [
            "If you have questions about this notice or wish to exercise any of your rights, please contact our Privacy Officer:",
            "Mountain View Treatment Center | 13028 Interurban Ave S Suite 124, Seattle, WA 98168 | Phone: (253)-252-5564 | Email: tanner@mountainviewtx.com",
          ],
        },
      ]}
      contactNote="For questions about your health information privacy rights or to file a complaint, contact our Privacy Officer at tanner@mountainviewtx.com or (253)-252-5564."
    />
  );
}
