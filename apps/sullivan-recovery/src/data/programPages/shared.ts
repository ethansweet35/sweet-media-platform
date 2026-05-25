import { PROGRAMS_IMAGES_BASE } from "@/data/programs";
import type {
  ProgramPageData,
  ProgramRelatedLink,
  ProgramTrustItem,
} from "@/types/programPage";

export const IMG = PROGRAMS_IMAGES_BASE;

export const programImage = (filename: string) => `${IMG}/${filename}`;

export const programsBreadcrumb = (current: string) => ({
  parent: { label: "Programs", href: "/programs/" },
  current,
});

export const detoxSubBreadcrumb = (current: string) => ({
  ancestors: [{ label: "Programs", href: "/programs/" }],
  parent: { label: "Medical detox", href: "/programs/detox/" },
  current,
});

export const DEFAULT_TRUST: ProgramTrustItem[] = [
  {
    icon: "ri-time-line",
    label: "Available 24/7",
    detail: "Admissions and clinical support around the clock",
  },
  {
    icon: "ri-smartphone-line",
    label: "Keep your phone",
    detail: "Stay connected to family and your support network",
  },
  {
    icon: "ri-hotel-bed-line",
    label: "Private rooms",
    detail: "Comfortable, home-like accommodations",
  },
  {
    icon: "ri-shield-check-line",
    label: "Insurance verified",
    detail: "Benefits confirmed before you arrive",
  },
  {
    icon: "ri-door-open-line",
    label: "Same-day admission",
    detail: "When clinically appropriate after assessment",
  },
  {
    icon: "ri-loop-left-line",
    label: "Continuum of care",
    detail: "Detox through aftercare on one campus",
  },
];

export function relatedProgramsExcept(
  excludeHref: string,
  title = "Explore more programs"
): ProgramPageData["relatedPrograms"] {
  const all: ProgramRelatedLink[] = [
    {
      title: "Medical detox",
      description: "Physician-led detox with 24/7 monitoring and MAT when appropriate.",
      href: "/programs/detox/",
    },
    {
      title: "Residential treatment",
      description: "Structured inpatient care with daily therapy on campus.",
      href: "/programs/residential-treatment/",
    },
    {
      title: "Aftercare programs",
      description: "Alumni support and resources after residential care.",
      href: "/programs/aftercare/",
    },
    {
      title: "Addiction therapies",
      description: "CBT, DBT, group, and family therapy with licensed clinicians.",
      href: "/programs/therapies/",
    },
    {
      title: "Personalized care",
      description: "Dual diagnosis and individualized treatment planning.",
      href: "/programs/personalized-care/",
    },
    {
      title: "Wellbriety program",
      description: "Culturally grounded recovery and community connection.",
      href: "/programs/wellbriety/",
    },
  ];
  const items = all.filter((p) => p.href !== excludeHref).slice(0, 4);
  return { eyebrow: "Continuum of care", title, items };
}

export const DEFAULT_STORY_LINK = {
  label: "Our approach & team",
  href: "/our-approach/",
};

export const OC_LOCATION_IMAGE = programImage("sr_detox_oc01.jpg");
