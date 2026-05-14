/**
 * Mountain View Treatment — navigation source of truth.
 * Mirrors the live WP mega-menu structure exactly.
 *
 * Used by both Header (mega menu) and Footer (column links).
 */

export type NavLeaf = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  description?: string;
  children?: NavLeaf[];
};

export type NavItem = {
  label: string;
  href: string;
  /**
   * Optional grouped submenu (e.g. "What We Treat" → Addiction group → Mental Health group)
   * When present the header renders a 2-column mega panel.
   */
  groups?: NavGroup[];
  /**
   * Single-column dropdown (no nested grouping).
   */
  children?: NavLeaf[];
};

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "About Us",
    href: "/about-us/",
    children: [
      { label: "About Us", href: "/about-us/" },
      { label: "Our Team", href: "/about-us/team/" },
    ],
  },
  {
    label: "Levels of Care",
    href: "/levels-of-care/",
    children: [
      {
        label: "Partial Hospitalization (PHP)",
        href: "/levels-of-care/partial-hospitalization-program/",
        description: "Highest intensity outpatient care",
      },
      {
        label: "Intensive Outpatient (IOP)",
        href: "/levels-of-care/intensive-outpatient-program/",
        description: "Structured day-program flexibility",
      },
      {
        label: "Outpatient Program (OP)",
        href: "/levels-of-care/outpatient-program/",
        description: "Continued recovery support",
      },
    ],
  },
  {
    label: "What We Treat",
    href: "/what-we-treat/",
    groups: [
      {
        label: "Addiction",
        href: "/what-we-treat/addiction/",
        children: [
          { label: "Alcohol", href: "/what-we-treat/addiction/alcohol/" },
          { label: "Marijuana", href: "/what-we-treat/addiction/marijuana/" },
          { label: "Opioids", href: "/what-we-treat/addiction/opioids/" },
          { label: "Prescription", href: "/what-we-treat/addiction/prescription/" },
          { label: "Stimulants", href: "/what-we-treat/addiction/stimulants/" },
        ],
      },
      {
        label: "Mental Health",
        href: "/what-we-treat/mental-health/",
        children: [
          { label: "Anxiety", href: "/what-we-treat/mental-health/anxiety/" },
          { label: "Bipolar", href: "/what-we-treat/mental-health/bipolar/" },
          { label: "Depression", href: "/what-we-treat/mental-health/depression/" },
          {
            label: "Personality Disorders",
            href: "/what-we-treat/mental-health/personality-disorders/",
          },
          {
            label: "Schizoaffective",
            href: "/what-we-treat/mental-health/schizoaffective/",
          },
          { label: "Trauma", href: "/what-we-treat/mental-health/trauma/" },
        ],
      },
    ],
  },
  {
    label: "Therapies",
    href: "/therapies/",
    children: [
      { label: "EMDR", href: "/therapies/emdr/" },
      { label: "Cognitive & Dialectical", href: "/therapies/cognitive-dialectical/" },
      { label: "Medication-Assisted", href: "/therapies/medication-assisted/" },
      { label: "Somatic Experiencing", href: "/therapies/somatic-experiencing/" },
      { label: "Neurofeedback", href: "/therapies/neurofeedback/" },
      { label: "Holistic Integration", href: "/therapies/holistic-integration/" },
    ],
  },
  {
    label: "Guide",
    href: "/guide/",
    children: [
      { label: "All Guides", href: "/guide/" },
      { label: "Blog", href: "/blog/" },
      {
        label: "The Complete Guide to Drug & Alcohol Detox",
        href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
      },
      {
        label: "Understanding Dual Diagnosis",
        href: "/guide/understanding-dual-diagnosis-addiction-mental-health/",
      },
      {
        label: "Seattle Sober Living & Aftercare",
        href: "/guide/seattle-sober-living-and-aftercare-guide/",
      },
      {
        label: "Outpatient Treatment Guide",
        href: "/guide/the-seattle-professionals-guide-to-outpatient-addiction-treatment/",
      },
      {
        label: "Staging an Intervention",
        href: "/guide/how-to-stage-an-intervention-in-seattle/",
      },
      {
        label: "Paying for Rehab in WA",
        href: "/guide/how-to-pay-for-drug-rehab-in-washington-state/",
      },
      {
        label: "Resources for Families",
        href: "/guide/resources-for-families-of-addicts-in-king-county/",
      },
      {
        label: "WA PFML & FMLA for Rehab",
        href: "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/",
      },
      {
        label: "AA, NA & SMART Recovery Meetings",
        href: "/guide/a-guide-to-seattle-aa-na-and-smart-recovery-meetings/",
      },
      {
        label: "What to Expect & Pack",
        href: "/guide/what-to-expect-and-pack-for-treatment/",
      },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions/",
    children: [
      { label: "Admissions Process", href: "/admissions/" },
      { label: "Insurance Overview", href: "/admissions/insurance/" },
      { label: "Aetna", href: "/admissions/insurance/aetna/" },
      { label: "Anthem", href: "/admissions/insurance/anthem/" },
      { label: "Cigna", href: "/admissions/insurance/cigna/" },
      { label: "Tricare", href: "/admissions/insurance/tricare/" },
      { label: "UHC", href: "/admissions/insurance/uhc/" },
    ],
  },
];
