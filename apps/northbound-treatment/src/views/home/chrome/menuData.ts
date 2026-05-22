/**
 * Northbound primary navigation
 */

export type MenuLink = {
  label: string;
  href: string;
  /** Remix Icon class (ri-*-line) — shown as a small badge beside the label */
  icon?: string;
};

export type MegaSection = {
  heading: string;
  headingHref?: string;
  /** Remix Icon class for the section heading badge */
  icon?: string;
  /** One-line description shown below the heading */
  description?: string;
  links: MenuLink[];
};

export type TopLevelItem = {
  label: string;
  href: string;
  sections?: MegaSection[];
};

export const PRIMARY_NAV: TopLevelItem[] = [
  /* ── Admissions ─────────────────────────────────────────── */
  {
    label: "Admissions",
    href: "/admissions/",
    sections: [
      {
        heading: "Admissions",
        headingHref: "/admissions/",
        icon: "ri-door-open-line",
        description: "Begin your recovery — our team guides every step",
        links: [
          { label: "Admissions Process", href: "/admissions/", icon: "ri-file-list-line" },
          { label: "Professional Referrals", href: "/referring-professionals/", icon: "ri-user-star-line" },
          { label: "Frequently Asked Questions", href: "/admissions/faqs/", icon: "ri-question-answer-line" },
          { label: "Alternative Sentencing", href: "/admissions/alternative-sentencing/", icon: "ri-scales-line" },
          { label: "Spouse of an Addict", href: "/admissions/spouse-of-an-addict/", icon: "ri-heart-line" },
          { label: "Financial Assistance", href: "/financial-assistance/", icon: "ri-bank-line" },
        ],
      },
      {
        heading: "Verify Insurance",
        headingHref: "/insurance/",
        icon: "ri-shield-check-line",
        description: "In-network with 15+ major plans — verify at no cost",
        links: [
          { label: "Aetna", href: "/insurance/aetna/", icon: "ri-shield-check-line" },
          { label: "Anthem", href: "/insurance/anthem-blue-cross/", icon: "ri-shield-check-line" },
          { label: "Beacon Health", href: "/insurance/beacon/", icon: "ri-shield-check-line" },
          { label: "BlueCross BlueShield", href: "/insurance/blue-cross-blue-shield/", icon: "ri-shield-check-line" },
          { label: "Cigna", href: "/insurance/cigna/", icon: "ri-shield-check-line" },
          { label: "Compsych", href: "/insurance/compsych/", icon: "ri-shield-check-line" },
          { label: "First Health Network", href: "/insurance/first-health/", icon: "ri-shield-check-line" },
          { label: "GEHA", href: "/insurance/geha-insurance/", icon: "ri-shield-check-line" },
          { label: "Health Net", href: "/insurance/health-net/", icon: "ri-shield-check-line" },
          { label: "ILWU", href: "/insurance/ilwu/", icon: "ri-shield-check-line" },
          { label: "Magellan", href: "/insurance/magellan/", icon: "ri-shield-check-line" },
          { label: "MHN Insurance", href: "/insurance/mhn/", icon: "ri-shield-check-line" },
          { label: "NYSHIP", href: "/insurance/nyship/", icon: "ri-shield-check-line" },
          { label: "Premera Blue Cross", href: "/insurance/premera-blue-cross/", icon: "ri-shield-check-line" },
          { label: "TriCare", href: "/insurance/tricare/", icon: "ri-shield-check-line" },
          { label: "USAMCO", href: "/insurance/usamco/", icon: "ri-shield-check-line" },
        ],
      },
    ],
  },

  /* ── Treatment Services ──────────────────────────────────── */
  {
    label: "Treatment Services",
    href: "/services/",
    sections: [
      {
        heading: "Levels of Care",
        icon: "ri-heart-pulse-line",
        description: "Evidence-based, full continuum of care",
        links: [
          { label: "Drug & Alcohol Detox", href: "/programs/detox/", icon: "ri-capsule-line" },
          { label: "Residential Treatment", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
          { label: "Partial Hospitalization (PHP)", href: "/programs/partial-hospitalization-program/", icon: "ri-hospital-line" },
          { label: "Virtual IOP (Online)", href: "/telehealth-iop-services/", icon: "ri-wifi-line" },
          { label: "Medication-Assisted Treatment", href: "/treatment/medication-assisted-treatment/", icon: "ri-capsule-line" },
          { label: "Aftercare & Alumni", href: "/programs/aftercare/", icon: "ri-refresh-line" },
        ],
      },
      {
        heading: "Signature Programs",
        headingHref: "/programs/#signature-services",
        icon: "ri-award-line",
        description: "Unique programs that set Northbound apart",
        links: [
          { label: "Adventure Therapy", href: "/adventure-therapy-program/", icon: "ri-compass-3-line" },
          { label: "Dual-Diagnosis", href: "/treatment/dual-diagnosis/", icon: "ri-brain-line" },
          { label: "Faith-Based Recovery", href: "/programs/residential-treatment-center/christ-centered-links-residential-program/", icon: "ri-heart-2-line" },
          { label: "Family Services", href: "/programs/family-therapy/", icon: "ri-team-line" },
          { label: "LGBTQIA+ Program", href: "/programs/lgbtq/", icon: "ri-rainbow-line" },
          { label: "Wolf Assisted Therapy", href: "/wolf-assisted-therapy/", icon: "ri-leaf-line" },
          { label: "Interventions", href: "/admissions/interventions/", icon: "ri-heart-line" },
        ],
      },
      {
        heading: "Therapeutic Modalities",
        icon: "ri-mental-health-line",
        description: "Proven clinical methods tailored to you",
        links: [
          { label: "Cognitive Behavioral Therapy (CBT)", href: "/blog/turning-to-mindfulness-meditation-and-cbt-for-pain-relief/", icon: "ri-mind-map" },
          { label: "Dialectical Behavioral Therapy (DBT)", href: "/blog/dialectical-behavior-therapy/", icon: "ri-scales-line" },
          { label: "EMDR Therapy", href: "/blog/what-is-emdr-therapy-how-does-it-work/", icon: "ri-eye-line" },
          { label: "Art Therapy", href: "/blog/a-guide-to-art-therapy-for-trauma/", icon: "ri-paint-brush-line" },
          { label: "Experiential Therapy", href: "/blog/what-is-experiential-therapy/", icon: "ri-run-line" },
          { label: "Trauma Therapy", href: "/treatment/mental-health-disorders/ptsd/", icon: "ri-heart-pulse-line" },
          { label: "Individual Therapy", href: "/treatment/mental-health-disorders/", icon: "ri-user-line" },
          { label: "Mindfulness & Meditation", href: "/blog/turning-to-mindfulness-meditation-and-cbt-for-pain-relief/", icon: "ri-leaf-line" },
        ],
      },
    ],
  },

  /* ── What We Treat ───────────────────────────────────────── */
  {
    label: "What We Treat",
    href: "/addiction-treatment-resources/",
    sections: [
      {
        heading: "Substance Abuse",
        headingHref: "/addiction-treatment-resources/",
        icon: "ri-drop-line",
        description: "Treatment for all forms of addiction",
        links: [
          { label: "Adderall Addiction", href: "/treatment/adderall/", icon: "ri-capsule-line" },
          { label: "Alcohol Addiction", href: "/treatment/alcoholism/", icon: "ri-cup-line" },
          { label: "Amphetamine Addiction", href: "/treatment/amphetamine/", icon: "ri-pulse-line" },
          { label: "Benzodiazepine Addiction", href: "/treatment/benzodiazepine-addiction/", icon: "ri-moon-line" },
          { label: "Cocaine Addiction", href: "/treatment/cocaine/", icon: "ri-drop-line" },
          { label: "Crack Cocaine Addiction", href: "/treatment/crack-cocaine/", icon: "ri-fire-line" },
          { label: "Fentanyl Addiction", href: "/treatment/fentanyl/", icon: "ri-alert-line" },
          { label: "Heroin Addiction", href: "/treatment/heroin/", icon: "ri-heart-pulse-line" },
          { label: "Hydrocodone (Vicodin)", href: "/treatment/hydrocodone-addiction/", icon: "ri-medicine-bottle-line" },
          { label: "Marijuana Addiction", href: "/treatment/marijuana/", icon: "ri-leaf-line" },
          { label: "Meth Addiction", href: "/treatment/meth/", icon: "ri-fire-line" },
          { label: "Methadone Addiction", href: "/treatment/methadone/", icon: "ri-flask-line" },
          { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-heart-pulse-line" },
          { label: "OxyContin Addiction", href: "/treatment/oxycontin/", icon: "ri-capsule-line" },
          { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-file-text-line" },
          { label: "Suboxone Addiction", href: "/treatment/suboxone/", icon: "ri-shield-line" },
        ],
      },
      {
        heading: "Mental Health & Dual Diagnosis",
        headingHref: "/treatment/mental-health-disorders/",
        icon: "ri-brain-line",
        description: "Co-occurring mental health & addiction care",
        links: [
          { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-pulse-line" },
          { label: "Bipolar Disorder", href: "/treatment/mental-health-disorders/bipolar-disorder/", icon: "ri-exchange-line" },
          { label: "Borderline Personality Disorder", href: "/treatment/mental-health-disorders/borderline-personality-disorder/", icon: "ri-mental-health-line" },
          { label: "Codependency", href: "/treatment/mental-health-disorders/codependency/", icon: "ri-links-line" },
          { label: "Depression", href: "/treatment/mental-health-disorders/depression/", icon: "ri-cloud-line" },
          { label: "Eating Disorders", href: "/treatment/mental-health-disorders/eating-disorders/", icon: "ri-restaurant-line" },
          { label: "OCD", href: "/treatment/dual-diagnosis/ocd-treatment-and-counseling/", icon: "ri-loop-right-line" },
          { label: "PTSD", href: "/treatment/mental-health-disorders/ptsd/", icon: "ri-shield-flash-line" },
          { label: "Trauma Therapy", href: "/treatment/mental-health-disorders/trauma-therapy/", icon: "ri-heart-pulse-line" },
        ],
      },
    ],
  },

  /* ── Locations ──────────────────────────────────────────── */
  {
    label: "Locations",
    href: "/locations/",
    sections: [
      {
        heading: "Our Locations",
        headingHref: "/locations/",
        icon: "ri-map-pin-2-line",
        description: "Southern California & Pacific Northwest",
        links: [
          { label: "Newport Beach, CA", href: "/locations/california/newport-beach/", icon: "ri-map-pin-2-line" },
          { label: "Garden Grove, CA", href: "/locations/california/garden-grove/", icon: "ri-map-pin-2-line" },
          { label: "San Diego, CA", href: "/locations/california/san-diego/", icon: "ri-map-pin-2-line" },
          { label: "Seattle, WA", href: "/locations/washington/seattle/", icon: "ri-map-pin-2-line" },
          { label: "Photo Gallery", href: "/locations/", icon: "ri-image-2-line" },
        ],
      },
      {
        heading: "Treatment Facilities",
        icon: "ri-building-2-line",
        description: "Explore Northbound's residential campuses",
        links: [
          { label: "Residential Treatment Center", href: "/programs/residential-treatment-center/", icon: "ri-home-heart-line" },
          { label: "Virtual IOP (Online)", href: "/telehealth-iop-services/", icon: "ri-wifi-line" },
        ],
      },
    ],
  },

  /* ── About ───────────────────────────────────────────────── */
  {
    label: "About",
    href: "/about/",
    sections: [
      {
        heading: "About Northbound",
        headingHref: "/about/",
        icon: "ri-information-2-line",
        description: "Our story, mission, and commitment to lasting recovery",
        links: [
          { label: "About Us", href: "/about/", icon: "ri-building-line" },
          { label: "Our Team", href: "/team/", icon: "ri-team-line" },
          { label: "Our History", href: "/about/our-history/", icon: "ri-history-line" },
          { label: "Reviews & Testimonials", href: "/impact-reach/reviews-testimonials/", icon: "ri-star-line" },
          { label: "Addiction Resources", href: "/addiction-treatment-resources/", icon: "ri-book-open-line" },
        ],
      },
      {
        heading: "Accreditation & Trust",
        icon: "ri-award-2-line",
        description: "38+ years of certified clinical excellence",
        links: [
          { label: "Accreditation & Recognition", href: "/about/accreditation-recognition/", icon: "ri-award-2-line" },
          { label: "Code of Ethics", href: "/about/code-of-ethics/", icon: "ri-shield-check-line" },
          { label: "Referring Professionals", href: "/referring-professionals/", icon: "ri-user-star-line" },
          { label: "Blog & Resources", href: "/blog/", icon: "ri-article-line" },
          { label: "Contact Us", href: "/contact-us/", icon: "ri-phone-line" },
        ],
      },
    ],
  },

  { label: "Contact", href: "/contact-us/" },
];
