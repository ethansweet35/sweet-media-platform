/** Section IDs for /general-detox/ — must match wrappers in the landing page view */
export const GENERAL_DETOX_SECTIONS = {
  top: "top",
  treatment: "treatment",
  about: "about",
  substances: "substances",
  programs: "programs",
  surfTherapy: "surf-therapy",
  musicTherapy: "music-therapy",
  activities: "activities",
  insurance: "insurance",
  whyUs: "why-us",
  facility: "facility",
  howItWorks: "how-it-works",
  location: "location",
} as const;

export const GENERAL_DETOX_NAV = [
  { label: "Get Help", sectionId: "get-help" },
  { label: "Treatment", sectionId: GENERAL_DETOX_SECTIONS.treatment },
  { label: "About", sectionId: GENERAL_DETOX_SECTIONS.about },
  { label: "Substances", sectionId: GENERAL_DETOX_SECTIONS.substances },
  { label: "Programs", sectionId: GENERAL_DETOX_SECTIONS.programs },
  { label: "Holistic Care", sectionId: GENERAL_DETOX_SECTIONS.surfTherapy },
  { label: "Insurance", sectionId: GENERAL_DETOX_SECTIONS.insurance },
  { label: "Why Us", sectionId: GENERAL_DETOX_SECTIONS.whyUs },
  { label: "Location", sectionId: GENERAL_DETOX_SECTIONS.location },
] as const;

/** Map internal routes to on-page anchors (null = non-navigable on landing) */
export function pathToLandingAnchor(path: string): string | null {
  if (
    !path ||
    path === "/" ||
    path.startsWith("/contact") ||
    path.startsWith("/insurance")
  ) {
    return "#get-help";
  }
  if (path.startsWith("/our-approach")) return `#${GENERAL_DETOX_SECTIONS.about}`;
  if (path.startsWith("/programs")) return `#${GENERAL_DETOX_SECTIONS.programs}`;
  return null;
}

export function isGeneralDetoxPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const norm = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return norm === "/general-detox";
}
