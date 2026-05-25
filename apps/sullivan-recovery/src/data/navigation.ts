/** Sullivan Recovery primary navigation + mega menu content */

export type MegaLink = {
  label: string;
  path: string;
};

export type MegaColumn = {
  heading: string;
  links: MegaLink[];
};

export type NavMegaConfig = {
  eyebrow: string;
  title: string;
  description: string;
  columns: MegaColumn[];
};

export type NavItem = {
  label: string;
  path: string;
  mega?: NavMegaConfig;
  /** Path prefixes that should not activate this item (e.g. Programs vs Detox) */
  excludeActivePrefixes?: string[];
};

/** Public routes — detox lives under /programs/detox/ but has its own nav item */
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
      columns: [
        {
          heading: "Overview",
          links: [
            { label: "Our approach", path: "/our-approach/" },
            { label: "Our team", path: "/our-approach/our-team/" },
            { label: "Insights", path: "/blog/" },
          ],
        },
        {
          heading: "Get help",
          links: [
            { label: "Verify insurance", path: "/insurance/" },
            { label: "All programs", path: "/programs/" },
          ],
        },
      ],
    },
  },
  {
    label: "Programs",
    path: "/programs/",
    excludeActivePrefixes: ["/programs/detox"],
    mega: {
      eyebrow: "Levels of care",
      title: "Treatment programs",
      description:
        "Residential treatment, aftercare, therapies, and holistic pathways beyond detox.",
      columns: [
        {
          heading: "Overview",
          links: [
            { label: "All programs", path: "/programs/" },
            { label: "Residential treatment", path: "/programs/residential-treatment/" },
            { label: "Aftercare programs", path: "/programs/aftercare/" },
          ],
        },
        {
          heading: "Specialized care",
          links: [
            { label: "Wellbriety program", path: "/programs/wellbriety/" },
            { label: "Addiction therapies", path: "/programs/therapies/" },
            { label: "Personalized care", path: "/programs/personalized-care/" },
          ],
        },
        {
          heading: "Get help",
          links: [
            { label: "Verify insurance", path: "/insurance/" },
            { label: "Medical detox", path: "/programs/detox/" },
          ],
        },
      ],
    },
  },
  {
    label: "Detox",
    path: "/programs/detox/",
    mega: {
      eyebrow: "Medical detox",
      title: "Detox programs",
      description:
        "Physician-led drug and alcohol detox in Mission Viejo with same-day intake available.",
      columns: [
        {
          heading: "Detox types",
          links: [
            { label: "Detox overview", path: "/programs/detox/" },
            { label: "Drug detox", path: "/programs/detox/drugs/" },
            { label: "Alcohol detox", path: "/programs/detox/alcohol/" },
            { label: "Orange County detox", path: "/programs/detox/orange-county/" },
          ],
        },
        {
          heading: "Substances we treat",
          links: [
            { label: "Opioid detox", path: "/programs/detox/opioids/" },
            { label: "Fentanyl detox", path: "/programs/detox/fentanyl/" },
            { label: "Meth detox", path: "/programs/detox/meth/" },
            { label: "Cocaine detox", path: "/programs/detox/cocaine/" },
          ],
        },
        {
          heading: "More substances",
          links: [
            { label: "Benzo detox", path: "/programs/detox/benzodiazepines/" },
            { label: "Suboxone detox", path: "/programs/detox/suboxone/" },
            { label: "Stimulant detox", path: "/programs/detox/stimulants/" },
          ],
        },
        {
          heading: "Get help",
          links: [
            { label: "Verify insurance", path: "/insurance/" },
            { label: "All programs", path: "/programs/" },
          ],
        },
      ],
    },
  },
  {
    label: "Admission",
    path: "/insurance/",
    mega: {
      eyebrow: "Getting started",
      title: "Insurance & intake",
      description:
        "Free benefits verification, same-day intake when appropriate, and clear next steps.",
      columns: [
        {
          heading: "Overview",
          links: [
            { label: "Verify insurance", path: "/insurance/" },
            { label: "Daily schedule", path: "/daily-schedule/" },
            { label: "All programs", path: "/programs/" },
          ],
        },
        {
          heading: "In-network carriers",
          links: [
            { label: "Aetna", path: "/insurance/aetna/" },
            { label: "Anthem Blue Cross", path: "/insurance/anthem/" },
            { label: "Cigna", path: "/insurance/cigna/" },
            { label: "Beacon Health", path: "/insurance/beacon/" },
          ],
        },
        {
          heading: "Verification guides",
          links: [
            { label: "UnitedHealthcare", path: "/insurance/united-healthcare/" },
            { label: "Humana", path: "/insurance/humana/" },
            { label: "Blue Cross Blue Shield", path: "/insurance/blue-cross-blue-shield/" },
            { label: "Tricare", path: "/insurance/tricare/" },
            { label: "Kaiser Permanente", path: "/insurance/kaiser/" },
            { label: "PPO out-of-network", path: "/insurance/ppo-out-of-network/" },
          ],
        },
      ],
    },
  },
];

export type MobileNavGroup = {
  label: string;
  path: string;
  sections?: { heading: string; links: MegaLink[] }[];
};

export function getMobileNavGroups(item: NavItem): MobileNavGroup | null {
  if (!item.mega) return null;
  return {
    label: item.label,
    path: item.path,
    sections: item.mega.columns.map((col) => ({
      heading: col.heading,
      links: col.links,
    })),
  };
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
  const onPrefix =
    current === target || (target !== "/" && current.startsWith(`${target}/`));
  if (onPrefix) {
    const excluded = item.excludeActivePrefixes?.some((ex) => {
      const x = norm(ex);
      return current === x || current.startsWith(`${x}/`);
    });
    if (!excluded) return true;
  }
  const allLinks = item.mega?.columns.flatMap((c) => c.links) ?? [];
  return allLinks.some((l) => {
    const t = norm(l.path);
    return current === t || current.startsWith(`${t}/`);
  });
}
