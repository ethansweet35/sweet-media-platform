/** Shared “How it works” / onboarding phases — Elementor copy used on Our Solution + Our Process. */

export const IMG_ONBOARD_PHASE_1 =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-08T230931.171.png";
export const IMG_ONBOARD_PHASE_2 =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-08T231247.007.png";
export const IMG_ONBOARD_PHASE_3 =
  "https://nstzjqmtsqgeihkyvkqq.supabase.co/storage/v1/object/public/site-assets/images/Untitled-design-2026-04-08T231506.070.png";

export type OnboardingPhase = {
  phase: string;
  title: string;
  tag: string;
  intro: string;
  image: string;
  alt: string;
  blocks: { title: string; body: string }[];
};

export const cipherOnboardingPhases: OnboardingPhase[] = [
  {
    phase: "Phase one",
    title: "Onboard & Train",
    tag: "Laying the foundation",
    intro:
      "We don\u2019t just manage your billing; we empower your organization. A successful revenue cycle starts with a proactive, audit-ready foundation.",
    image: IMG_ONBOARD_PHASE_1,
    alt: "Cipher Billing onboarding and training partnership",
    blocks: [
      {
        title: "Leadership Alignment",
        body: "We start by setting clear, measurable objectives with your leadership team to align our strategy with your financial goals.",
      },
      {
        title: "Comprehensive Staff Training",
        body: "We train your team on critical front-end processes, including compliance standards, medical necessity documentation, and Verification of Benefits (VOB).",
      },
      {
        title: "Facility & EMR Analysis",
        body: "We review your current systems and documentation to ensure your practice is protected and compliant from day one.",
      },
    ],
  },
  {
    phase: "Phase two",
    title: "Partnership & Execution",
    tag: "Active Revenue Management",
    intro:
      "You are never just an account number. We act as a seamless extension of your team, providing a high-touch partnership and full visibility into your data.",
    image: IMG_ONBOARD_PHASE_2,
    alt: "Cipher Billing partnership and execution",
    blocks: [
      {
        title: "Real-Time Data Insights",
        body: "We deliver up-to-date admissions and financial data to help your team make informed, confident operational decisions.",
      },
      {
        title: "Daily Utilization Review (UR) Collaboration",
        body: "Our UR specialists work with your clinical team daily to secure proper authorizations, extend patient stays when medically necessary, and prevent costly denials.",
      },
      {
        title: "Aggressive Claim Negotiation",
        body: "We conduct proprietary pre-payment and post-payment negotiations to ensure you aren\u2019t leaving money on the table.",
      },
    ],
  },
  {
    phase: "Phase three",
    title: "Measurable Results",
    tag: "Maximizing Your ROI",
    intro:
      "We pursue every dollar you\u2019re owed with relentless determination, escalating claims whenever necessary until they are successfully closed.",
    image: IMG_ONBOARD_PHASE_3,
    alt: "Cipher Billing measurable revenue results",
    blocks: [
      {
        title: "Accelerated Cash Flow",
        body: "Our streamlined processes dramatically reduce the waiting period, averaging just 30 days to your first payment.",
      },
      {
        title: "Stronger Returns",
        body: "We achieve an average of 30.36% Out-of-Network (OON) reimbursement, with partners seeing up to 70% increases through our advanced negotiation tactics.",
      },
      {
        title: "Total Peace of Mind",
        body: "With our compliance experts safeguarding your audits and our billing team securing your cash flow, you gain the stability needed to scale your practice.",
      },
    ],
  },
];
