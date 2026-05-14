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
  { source: "/blog-archive/:path*", destination: "/blog/:path*", permanent: true },
  { source: "/php", destination: "/levels-of-care/php-treatment-seattle-lp/", permanent: true },
  { source: "/iop", destination: "/levels-of-care/iop-treatment-seattle-lp/", permanent: true },
  { source: "/op", destination: "/what-we-treat/addiction/opioids/", permanent: true },
  { source: "/seattle", destination: "/guide/seattle-sober-living-and-aftercare-guide/", permanent: true },
  { source: "/levels", destination: "/levels-of-care/", permanent: true },
];
