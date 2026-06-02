import { PHONE_HREF } from "@/data/site";

/** Mirrors live missouribehavioralhealth.com primary nav (menu-1-c3b31d5). */

export type NavLink = {
  label: string;
  path: string;
  desc?: string;
  external?: boolean;
};

export type MegaColumn = {
  heading: string;
  icon: string;
  links: NavLink[];
};

export type MegaFeature = {
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  href: string;
  icon: string;
};

export type NavItem =
  | { label: string; path: string; mega?: never }
  | {
      label: string;
      path?: string;
      mega: {
        columns: MegaColumn[];
        feature: MegaFeature;
      };
    };

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: "Addiction",
    path: "/missouri-addiction-treatment",
    mega: {
      columns: [
        {
          heading: "Substances",
          icon: "ri-capsule-line",
          links: [
            { label: "Alcohol", path: "/alcohol-rehab-center-in-missouri" },
            { label: "Benzodiazepine", path: "/benzodiazepine-detox-in-missouri" },
            { label: "Cocaine", path: "/cocaine-detox-in-missouri" },
            { label: "Fentanyl", path: "/fentanyl-rehab-springfield-mo" },
            { label: "Heroin", path: "/heroin-rehab-springfield-mo" },
            { label: "Meth", path: "/meth-rehab-springfield-mo" },
            { label: "Opiate", path: "/withdraw-from-opioid-help-jefferson-city" },
            { label: "Xanax", path: "/xanax-rehab-springfield-mo" },
          ],
        },
      ],
      feature: {
        eyebrow: "Start Recovery",
        heading: "Same-day admissions available.",
        body: "Our admissions team is available around the clock. Confidential, HIPAA-compliant, and judgment-free.",
        cta: "Call 24/7",
        href: PHONE_HREF,
        icon: "ri-phone-line",
      },
    },
  },
  {
    label: "Mental Health",
    path: "/mental-health-treatment-missouri",
    mega: {
      columns: [
        {
          heading: "Conditions We Treat",
          icon: "ri-mental-health-line",
          links: [
            { label: "ADD", path: "/add-therapist-springfield-mo" },
            { label: "ADHD", path: "/adhd-treatment-springfield-mo" },
            { label: "Anxiety", path: "/anxiety-therapist-springfield-mo-3" },
            { label: "Bipolar", path: "/bipolar-treatment-centers-in-missouri-2-2" },
            { label: "BPD", path: "/bpd-treatment-missouri" },
            { label: "Depression", path: "/depression-therapist-springfield-mo" },
            { label: "OCD", path: "/ocd-treatment-in-missouri" },
            { label: "PTSD", path: "/ptsd-counseling-springfield-mo" },
            { label: "Trauma", path: "/trauma-therapist-springfield-mo-2" },
          ],
        },
      ],
      feature: {
        eyebrow: "Get Help Today",
        heading: "You don't have to do this alone.",
        body: "Licensed counselors and psychiatric staff ready to build a plan around your unique needs.",
        cta: "Verify your insurance",
        href: "/verify-insurance",
        icon: "ri-shield-check-line",
      },
    },
  },
  {
    label: "Levels Of Care",
    path: "/levels-of-care-missouri",
    mega: {
      columns: [
        {
          heading: "Programs",
          icon: "ri-hospital-line",
          links: [
            { label: "IOP Program", path: "/iop-missouri" },
            { label: "Outpatient Program", path: "/outpatient-rehab-springfield-mo" },
            { label: "Partial Hospitalization Program", path: "/php-sober-living" },
            { label: "Sober Living", path: "/sober-living-springfield-mo" },
            {
              label: "Psych Services",
              path: "https://spgpsych.com",
              external: true,
            },
          ],
        },
      ],
      feature: {
        eyebrow: "Find Your Level of Care",
        heading: "The right intensity for your recovery.",
        body: "From PHP to outpatient and sober living — we help you step down safely with clinical support at every stage.",
        cta: "View levels of care",
        href: "/levels-of-care-missouri",
        icon: "ri-road-map-line",
      },
    },
  },
  {
    label: "Therapy Types",
    path: "/services",
    mega: {
      columns: [
        {
          heading: "Therapies",
          icon: "ri-heart-pulse-line",
          links: [
            { label: "Cognitive Behavioral Therapy", path: "/cognitive-behavioral-therapy-springfield-mo" },
            { label: "Dialectical Behavioral Therapy", path: "/dialectical-behavioral-therapy-springfield-mo" },
            { label: "EMDR Therapy", path: "/emdr-therapy-springfield-mo" },
            { label: "Family Therapy", path: "/family-therapy-springfield-mo" },
            { label: "Group Therapy", path: "/group-therapy-springfield-mo" },
            { label: "Holistic Therapy", path: "/holistic-therapy-springfield" },
            { label: "Music Therapy", path: "/music-therapy-springfield" },
            { label: "Therapists", path: "/therapist-springfield-mo" },
            { label: "Yoga Therapy", path: "/yoga-therapy-springfield" },
          ],
        },
      ],
      feature: {
        eyebrow: "Evidence-Based Care",
        heading: "Therapy built around you.",
        body: "Individual, group, and holistic modalities combined into a personalized treatment plan.",
        cta: "Explore services",
        href: "/services",
        icon: "ri-heart-pulse-line",
      },
    },
  },
  {
    label: "Guide",
    path: "/treatment-guide",
    mega: {
      columns: [
        {
          heading: "Insurance Coverage",
          icon: "ri-shield-check-line",
          links: [
            { label: "Aetna Outpatient Services", path: "/aetna-outpatient-services" },
            { label: "Anthem Blue Cross Coverage", path: "/anthem-blue-cross-coverage" },
            { label: "Beacon Health Insurance Rehab Coverage", path: "/beacon-health-insurance-rehab-coverage" },
            { label: "Blue Cross Blue Shield Coverage", path: "/blue-cross-blue-shield-coverage" },
            { label: "Carelon Behavioral Health Insurance", path: "/carelon-behavioral-health-insurance" },
            { label: "Cigna Outpatient Coverage", path: "/cigna-outpatient-coverage" },
            { label: "Cox Health Missouri", path: "/cox-health-missouri" },
            { label: "GEHA Insurance Coverage", path: "/geha-insurance-coverage" },
          ],
        },
      ],
      feature: {
        eyebrow: "Insurance Guide",
        heading: "Understand your benefits.",
        body: "We work with most major plans and help you verify coverage before admission.",
        cta: "Verify your insurance",
        href: "/verify-insurance",
        icon: "ri-file-list-3-line",
      },
    },
  },
  { label: "Blog", path: "/blog" },
  { label: "About Us", path: "/about" },
];
