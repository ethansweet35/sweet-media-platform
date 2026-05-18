import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function PfmlGuidePage() {
  return (
    <GuideArticlePage
      title="Taking Leave for Rehab: Washington State PFML & FMLA Guide"
      intro="You have the legal right to take protected medical leave for addiction treatment. This guide explains Washington's Paid Family and Medical Leave program, federal FMLA, how to file without disclosing your diagnosis, and how to protect your job while you heal."
      readTime="10 min read"
      topics={["PFML", "FMLA", "Employment", "Legal Rights"]}
      heroImage={`${BASE}/mvt_guide_insurance.jpg`}
      heroAlt="A professional workspace with laptop and documents — understanding employment rights for medical leave"
      keyFacts={[
        { label: "WA PFML Max Leave", value: "12–16 wks" },
        { label: "Wage Replacement", value: "Up to 90%" },
        { label: "FMLA Protection", value: "Up to 12 wks" },
        { label: "Diagnosis Required", value: "Not Disclosed" },
      ]}
      sections={[
        {
          heading: "Your Legal Right to Leave for Addiction Treatment",
          body: [
            "Addiction treatment is a legitimate medical condition under both federal and Washington State law. You have protected rights to take leave from work to seek treatment — and your employer cannot legally terminate you, demote you, or otherwise retaliate against you for taking that leave.",
            "Two primary legal frameworks protect you: the federal Family and Medical Leave Act (FMLA) and Washington State's Paid Family and Medical Leave (PFML) program. These programs operate independently and can sometimes run concurrently, depending on your eligibility.",
            "Critically, neither FMLA nor PFML requires you to disclose the specific nature of your medical condition to your employer. You or your healthcare provider certifies that you have a \"serious health condition requiring treatment\" — the specific diagnosis is protected health information under HIPAA.",
          ],
          callout:
            "Washington is one of the few states with a paid leave program. Eligible workers can receive up to 90% of their weekly wages (for lower earners) through WA PFML while in treatment.",
        },
        {
          heading: "FMLA: Federal Family and Medical Leave",
          body: [
            "The Family and Medical Leave Act (FMLA) is a federal law that provides up to 12 weeks of unpaid, job-protected leave per 12-month period for qualifying employees with a serious health condition.",
            "Eligibility requirements: You must have worked for your employer for at least 12 months, worked at least 1,250 hours during the prior 12 months, and work at a location where the employer has 50 or more employees within 75 miles.",
            "FMLA leave can be taken continuously (e.g., 30 days of residential treatment) or intermittently (e.g., 3 hours per day for IOP, 3 days per week). Intermittent FMLA is particularly useful for professionals in outpatient programs.",
          ],
          list: [
            "Up to 12 weeks unpaid leave per year",
            "Job-protected: employer must return you to the same or equivalent position",
            "Employer must maintain your health insurance during leave",
            "Applies to addiction treatment as a 'serious health condition'",
            "Form WH-380-E completed by your healthcare provider (not you)",
            "Employee submits to HR; diagnosis details stay on the medical form",
          ],
          callout:
            "FMLA paperwork: your employer gives you Form WH-380-E. Your doctor, therapist, or treatment center completes the medical portion. You never need to disclose the specific nature of your treatment to HR.",
        },
        {
          heading: "Washington State PFML: Paid Family & Medical Leave",
          body: [
            "Washington's Paid Family and Medical Leave (PFML) program, administered by the Employment Security Department (ESD), provides paid wage replacement for eligible employees who need to take leave for their own serious health condition — including addiction treatment.",
            "Benefits: PFML replaces up to 90% of your weekly wages if you earn below the state's average weekly wage, scaling to a minimum of 50% of wages for higher earners. Maximum benefit is capped at 90% of the state's average weekly wage.",
            "Leave duration: Up to 12 weeks per year for your own serious health condition. Combined family and medical leave can reach up to 16–18 weeks depending on circumstances.",
            "Eligibility: You must have worked 820 or more hours in Washington in the prior qualifying year. This is equivalent to roughly 20 hours per week for 52 weeks, or 40 hours per week for 6 months.",
          ],
          list: [
            "Up to 12 weeks paid leave per year for own serious health condition",
            "Wage replacement: 50–90% of weekly wages",
            "Apply at paidleave.wa.gov or call ESD at 833-717-2273",
            "820+ hours worked in WA in the prior year for eligibility",
            "Apply within 8 weeks of your leave start date",
            "Employer must hold your position (companies with 50+ employees)",
          ],
        },
        {
          heading: "How to Apply Without Disclosing Your Diagnosis",
          body: [
            "The application process for both FMLA and PFML is designed to protect your medical privacy. Here is exactly how each works in terms of what you disclose and what remains private.",
            "For FMLA: Your employer provides you with Form WH-380-E (for your own condition). You give this form to your healthcare provider or treatment center. They complete the medical certification — describing the condition's functional limitations and need for treatment in clinical terms, without naming the specific diagnosis. You submit the completed form to HR. HR and your employer see only that you have a serious health condition requiring care.",
            "For WA PFML: You apply directly to the Washington Employment Security Department (ESD) at paidleave.wa.gov. ESD requests medical certification from your healthcare provider. Your employer receives notification that you have filed a claim but does not receive medical details.",
          ],
          callout:
            "Your HR department should not ask you what specific condition you have. If they do, you are not legally required to answer beyond confirming it is a serious health condition. Our admissions team can help you and your treatment provider complete certification forms.",
        },
        {
          heading: "Short-Term Disability Insurance",
          body: [
            "If your employer offers short-term disability insurance (STD) — either as a voluntary benefit or as part of your compensation package — this may provide an additional layer of income replacement during leave for addiction treatment.",
            "Short-term disability policies typically replace 50–70% of your base salary for the duration of the disability period (often 3 to 6 months after a brief waiting period). Policy terms vary significantly; review your Summary Plan Description (SPD) or contact your HR department or insurer directly.",
            "Some policies explicitly exclude conditions related to substance use, while others do not. Your treatment provider can help frame the disability certification in appropriate clinical language. Washington's PFML and employer short-term disability benefits can sometimes be stacked, though rules vary by employer plan.",
          ],
          list: [
            "Review your employer's STD policy in the Summary Plan Description (SPD)",
            "Contact your insurer before leave to confirm addiction treatment eligibility",
            "Certification is completed by your healthcare provider",
            "WA PFML and STD may coordinate — ESD has specific rules for this",
            "Private STD policies (through an insurance agent) may differ from employer-sponsored plans",
          ],
        },
        {
          heading: "Getting HR Support Without Jeopardizing Your Job",
          body: [
            "Many people delay or avoid seeking treatment out of fear that HR will be informed, that they will be penalized professionally, or that colleagues will find out. These fears are understandable — and largely unfounded, given the legal protections available.",
            "HR professionals at most large organizations are trained in FMLA administration and bound by confidentiality obligations. They handle medical leave requests regularly and are not entitled to — or typically interested in — the specific details of your condition.",
            "The practical steps: Notify HR that you will need medical leave and provide a rough start date and duration. Submit completed FMLA and/or PFML documentation. Arrange a work handoff with your manager — you can describe this as a medical procedure without specifics. Return to work on the agreed date. Federal and state law prohibit any retaliation.",
          ],
          list: [
            "Notify HR early — at least 30 days before planned leave if possible",
            "Use language like 'medical procedure' or 'planned medical treatment'",
            "Arrange handoff and delegate key responsibilities before departure",
            "Set an out-of-office auto-reply (generic — 'on medical leave through [date]')",
            "Keep a private log of any retaliation-suggestive behavior just in case",
            "Contact an employment attorney if retaliation occurs — WA law is clear",
          ],
          callout:
            "Mountain View Treatment's admissions team has helped hundreds of professionals navigate the leave process. We can advise on documentation, complete certification forms, and support you through the logistical aspects of admission.",
        },
      ]}
      relatedGuides={[
        {
          title: "The Seattle Professional's Guide to Outpatient Treatment",
          href: "/guide/the-seattle-professionals-guide-to-outpatient-addiction-treatment/",
          excerpt: "Confidential, schedule-flexible treatment options for working professionals who cannot step away.",
        },
        {
          title: "How to Pay for Drug Rehab in Washington State",
          href: "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
          excerpt: "Insurance, Medicaid, EAPs, and financing options for addiction treatment in Washington.",
        },
        {
          title: "What to Expect and Pack for Treatment",
          href: "/guide/what-to-expect-and-pack-for-treatment/",
          excerpt: "A practical guide to the admission process and your first days in treatment.",
        },
      ]}
    />
  );
}
