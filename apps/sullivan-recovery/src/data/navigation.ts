/** Sullivan Recovery primary navigation + mega menu content */

export type MegaLink = {
  label: string;
  path: string;
};

export type MegaColumn = {
  heading: string;
  links: MegaLink[];
};

export type MegaFeatured = {
  label: string;
  path: string;
  description: string;
  icon: string;
};

export type NavMegaConfig = {
  eyebrow: string;
  title: string;
  description: string;
  viewAllPath: string;
  viewAllLabel: string;
  columns: MegaColumn[];
  featured?: MegaFeatured[];
  cta?: { label: string; path: string; secondaryLabel?: string; secondaryPath?: string };
};

export type NavItem = {
  label: string;
  path: string;
  mega?: NavMegaConfig;
};

/** Matches sullivanrecovery.com primary menu structure */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "About Us",
    path: "/our-approach/",
    mega: {
      eyebrow: "About Sullivan Recovery",
      title: "Who we are",
      description:
        "Family-founded detox in Mission Viejo — compassionate care rooted in lived experience.",
      viewAllPath: "/our-approach/",
      viewAllLabel: "Our approach",
      featured: [
        {
          label: "Our Team",
          path: "/our-approach/our-team/",
          description: "Meet the clinicians and leaders behind your care.",
          icon: "ri-team-line",
        },
        {
          label: "Blogs",
          path: "/blogs/",
          description: "Recovery insights, resources, and stories from our community.",
          icon: "ri-article-line",
        },
      ],
      columns: [
        {
          heading: "Service areas",
          links: [
            {
              label: "Detox Center Huntington Beach",
              path: "/service-area/detox-center-huntington-beach/",
            },
            {
              label: "Drug Detox Lake Forest",
              path: "/service-area/drug-detox-lake-forest/",
            },
            {
              label: "Laguna Beach Detox",
              path: "/service-area/laguna-beach-detox/",
            },
            {
              label: "Newport Beach Detox",
              path: "/service-area/newport-beach-detox/",
            },
            {
              label: "Orange County Medical Detox",
              path: "/service-area/orange-county-medical-detox/",
            },
          ],
        },
        {
          heading: "Explore",
          links: [
            { label: "All service areas", path: "/service-area/" },
            { label: "Contact us", path: "/contact-us/" },
            { label: "Resources", path: "/resources/" },
          ],
        },
      ],
      cta: {
        label: "Verify insurance",
        path: "/insurance/",
        secondaryLabel: "Call our team",
        secondaryPath: "/contact-us/",
      },
    },
  },
  {
    label: "Programs",
    path: "/programs/",
    mega: {
      eyebrow: "Levels of care",
      title: "Recovery programs",
      description:
        "Evidence-based pathways from medical detox through aftercare and holistic therapies.",
      viewAllPath: "/programs/",
      viewAllLabel: "All programs",
      featured: [
        {
          label: "Wellbriety Program",
          path: "/addiction-aftercare-program/wellbriety-program/",
          description: "Culturally grounded healing aligned with Wellbriety principles.",
          icon: "ri-leaf-line",
        },
        {
          label: "Opioid Treatment",
          path: "/addiction-aftercare-program/opioid-detox-orange-county/",
          description: "Specialized opioid detox and stabilization in Orange County.",
          icon: "ri-heart-pulse-line",
        },
      ],
      columns: [
        {
          heading: "Care pathways",
          links: [
            {
              label: "Residential Treatment",
              path: "/addiction-aftercare-program/iop-treatment-mission-viejo/",
            },
            {
              label: "Aftercare Programs",
              path: "/addiction-aftercare-program/aftercare-programs/",
            },
            {
              label: "Programs Near Me",
              path: "/addiction-aftercare-program/addiction-aftercare-programs-near-me/",
            },
            {
              label: "Addiction Therapies",
              path: "/addiction-aftercare-program/addiction-therapies/",
            },
            {
              label: "Personalized Care",
              path: "/addiction-aftercare-program/personalized-care-drugs/",
            },
          ],
        },
      ],
      cta: {
        label: "Start admissions",
        path: "/admissions-process/",
      },
    },
  },
  {
    label: "Treatment",
    path: "/addiction-aftercare-program/",
    mega: {
      eyebrow: "Medical detox",
      title: "Substance treatment",
      description:
        "Physician-led detox for alcohol, opioids, stimulants, and more — same-day intake available.",
      viewAllPath: "/addiction-aftercare-program/",
      viewAllLabel: "All treatment",
      columns: [
        {
          heading: "Opioids & alcohol",
          links: [
            {
              label: "Drug & Alcohol Detox Mission Viejo",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/drug-and-alcohol-detox-mission-viejo/",
            },
            {
              label: "Opioid Detox Orange County",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/opioid-detox-orange-county/",
            },
            {
              label: "Fentanyl Detox Near Me",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/fentanyl-detox-near-me/",
            },
            {
              label: "Suboxone Detox Centers",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/suboxone-detox-centers-near-me/",
            },
          ],
        },
        {
          heading: "Stimulants & sedatives",
          links: [
            {
              label: "Cocaine Detox California",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/cocaine-detox-center-california/",
            },
            {
              label: "Meth Detox Mission Viejo",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/meth-detox-mission-viejo/",
            },
            {
              label: "Benzo Detox Orange County",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/benzo-detox-orange-county/",
            },
            {
              label: "Detox Facility Orange County",
              path: "/addiction-aftercare-program/opioid-detox-orange-county/detox-facility-orange-county/",
            },
          ],
        },
      ],
      featured: [
        {
          label: "General detox",
          path: "/general-detox/",
          description: "Comprehensive medical detox tailored to your substance and history.",
          icon: "ri-hospital-line",
        },
        {
          label: "Detox in Orange County",
          path: "/detox-in-orange-county/",
          description: "Local, private detox with 24/7 nursing and clinical support.",
          icon: "ri-map-pin-2-line",
        },
      ],
      cta: {
        label: "Get help today",
        path: "/contact-us/",
      },
    },
  },
  {
    label: "Admission",
    path: "/admissions/",
    mega: {
      eyebrow: "Getting started",
      title: "Admissions & intake",
      description:
        "Same-day intake, insurance verification, and a clear daily schedule from day one.",
      viewAllPath: "/admissions-process/",
      viewAllLabel: "Admissions process",
      columns: [
        {
          heading: "Before you arrive",
          links: [
            { label: "Admissions process", path: "/admissions-process/" },
            { label: "Daily schedule", path: "/daily-schedule/" },
            { label: "Insurance coverage", path: "/insurance/" },
          ],
        },
      ],
      featured: [
        {
          label: "Verify insurance",
          path: "/insurance/",
          description: "We work with most major PPO plans — fast, confidential verification.",
          icon: "ri-shield-check-line",
        },
        {
          label: "Contact admissions",
          path: "/contact-us/",
          description: "Speak with our team 24/7 about intake and next steps.",
          icon: "ri-phone-line",
        },
      ],
      cta: {
        label: "Verify insurance",
        path: "/insurance/",
        secondaryLabel: "View daily schedule",
        secondaryPath: "/daily-schedule/",
      },
    },
  },
  { label: "Contact Us", path: "/contact-us/" },
];

/** Flat links for mobile accordion (preserves nested groups as headings) */
export type MobileNavGroup = {
  label: string;
  path: string;
  sections?: { heading: string; links: MegaLink[] }[];
};

export function getMobileNavGroups(item: NavItem): MobileNavGroup | null {
  if (!item.mega) return null;
  const sections: { heading: string; links: MegaLink[] }[] = [
    ...item.mega.columns.map((col) => ({ heading: col.heading, links: col.links })),
  ];
  if (item.mega.featured?.length) {
    sections.unshift({
      heading: "Featured",
      links: item.mega.featured.map((f) => ({ label: f.label, path: f.path })),
    });
  }
  return { label: item.label, path: item.path, sections };
}

export function navItemIsActive(
  pathname: string | null,
  item: NavItem,
): boolean {
  if (item.path === "#") return false;
  const norm = (p: string) =>
    p === "/" ? "/" : p.endsWith("/") ? p.slice(0, -1) : p;
  const current = pathname
    ? pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname
    : "/";
  const target = norm(item.path);
  if (target === "/") return current === "/" || current === "";
  if (current === target || current.startsWith(`${target}/`)) return true;
  const allLinks = [
    ...(item.mega?.columns.flatMap((c) => c.links) ?? []),
    ...(item.mega?.featured?.map((f) => ({ path: f.path })) ?? []),
    ...(item.mega?.viewAllPath ? [{ path: item.mega.viewAllPath }] : []),
    ...(item.mega?.cta ? [{ path: item.mega.cta.path }] : []),
  ];
  return allLinks.some((l) => {
    const t = norm(l.path);
    return current === t || current.startsWith(`${t}/`);
  });
}
