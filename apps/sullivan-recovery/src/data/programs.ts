export const PROGRAMS_IMAGES_BASE =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images";

export type ProgramEntry = {
  num: string;
  title: string;
  description: string;
  href: string;
  image: string;
  /** Full-width hero card on programs index */
  featured?: boolean;
  category: "detox" | "residential" | "clinical" | "holistic";
};

export const PROGRAM_CATALOG: ProgramEntry[] = [
  {
    num: "01",
    title: "Medical Detox",
    description:
      "Physician-led detox with 24/7 monitoring, medication support, and a safe transition into residential care.",
    href: "/programs/detox/",
    image: `${PROGRAMS_IMAGES_BASE}/sr_detox_hero01.jpg`,
    featured: true,
    category: "detox",
  },
  {
    num: "02",
    title: "Residential Treatment",
    description:
      "Structured, home-like residential care with round-the-clock clinical and therapeutic support.",
    href: "/programs/residential-treatment/",
    image: `${PROGRAMS_IMAGES_BASE}/sr_prog_residential.jpg`,
    category: "residential",
  },
  {
    num: "03",
    title: "Aftercare Programs",
    description:
      "Discharge planning, alumni support, and continued resources so progress lasts after you leave.",
    href: "/programs/aftercare/",
    image: `${PROGRAMS_IMAGES_BASE}/sr_prog_aftercare.jpg`,
    category: "residential",
  },
  {
    num: "04",
    title: "Addiction Therapies",
    description:
      "CBT, DBT, motivational interviewing, and group therapy led by licensed addiction clinicians.",
    href: "/programs/therapies/",
    image: `${PROGRAMS_IMAGES_BASE}/sr_prog_therapy.jpg`,
    category: "clinical",
  },
  {
    num: "05",
    title: "Personalized Care",
    description:
      "Dual diagnosis and individualized plans when substance use and mental health intersect.",
    href: "/programs/personalized-care/",
    image: `${PROGRAMS_IMAGES_BASE}/sr_prog_dual.jpg`,
    category: "clinical",
  },
  {
    num: "06",
    title: "Wellbriety Program",
    description:
      "Culturally grounded recovery pathways integrating Wellbriety principles and community connection.",
    href: "/programs/wellbriety/",
    image: `${PROGRAMS_IMAGES_BASE}/sr_facility_5.png`,
    category: "holistic",
  },
];

export const PROGRAM_PILLARS = [
  {
    title: "Comprehensive care",
    description:
      "Counseling, therapy, and medical support that address physical, emotional, and psychological recovery.",
    icon: "ri-heart-pulse-line",
  },
  {
    title: "Expert team",
    description:
      "Physicians, nurses, and addiction specialists dedicated to safe detox and lasting sobriety.",
    icon: "ri-team-line",
  },
  {
    title: "Holistic healing",
    description:
      "Therapeutic modalities and experiential programming that support whole-person wellness.",
    icon: "ri-leaf-line",
  },
  {
    title: "Family support",
    description:
      "Education and guidance for loved ones navigating addiction alongside your recovery.",
    icon: "ri-group-line",
  },
] as const;
