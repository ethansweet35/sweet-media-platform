/**
 * Mountain View Treatment — Permanent redirects mirrored from the legacy
 * WordPress site. These were detected by probing the live site during
 * migration. URL preservation for migrated pages is handled automatically
 * via `trailingSlash: true` in next.config.ts.
 */

export type WpRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export const wpRedirects: WpRedirect[] = [
  { source: "/about", destination: "/about-us/", permanent: true },
  { source: "/team", destination: "/about-us/team/", permanent: true },
  { source: "/insurance", destination: "/admissions/insurance/", permanent: true },
  { source: "/blog-archive", destination: "/blog/", permanent: true },
  { source: "/blog-archive/:slug*", destination: "/:slug*", permanent: true },
  // Blog posts now live at /<slug>/ (matching WP structure) — redirect old /blog/<slug> URLs
  { source: "/blog/:slug", destination: "/:slug", permanent: true },
  { source: "/blog/:slug/", destination: "/:slug/", permanent: true },
  { source: "/php", destination: "/levels-of-care/partial-hospitalization-program/", permanent: true },
  { source: "/iop", destination: "/levels-of-care/intensive-outpatient-program/", permanent: true },
  { source: "/op", destination: "/what-we-treat/addiction/opioids/", permanent: true },
  // WP therapy pages used shorter slugs than the Next.js routes
  { source: "/therapies/holistic", destination: "/therapies/holistic-integration/", permanent: true },
  { source: "/therapies/holistic/", destination: "/therapies/holistic-integration/", permanent: true },
  { source: "/therapies/somatic", destination: "/therapies/somatic-experiencing/", permanent: true },
  { source: "/therapies/somatic/", destination: "/therapies/somatic-experiencing/", permanent: true },
  // WP had a short /levels-of-care/php/ landing page separate from the main PHP page
  { source: "/levels-of-care/php", destination: "/levels-of-care/partial-hospitalization-program/", permanent: true },
  { source: "/levels-of-care/php/", destination: "/levels-of-care/partial-hospitalization-program/", permanent: true },
  { source: "/seattle", destination: "/guide/seattle-sober-living-and-aftercare-guide/", permanent: true },
  { source: "/levels", destination: "/levels-of-care/", permanent: true },
  // WP blog posts lived at the root — posts now live at /<slug>/ so no redirect needed
  // Template stubs not present on live WP site
  { source: "/resources", destination: "/guide/", permanent: true },
  { source: "/services", destination: "/levels-of-care/", permanent: true },
];
