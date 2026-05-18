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
  // WP blog posts lived at the root — redirect to /blog/[slug]/
  { source: "/adult-addiction-treatment-in-seattle-wa", destination: "/blog/adult-addiction-treatment-in-seattle-wa/", permanent: true },
  { source: "/does-outpatient-drug-rehab-work-effectiveness-limits-and-what-to-expect", destination: "/blog/does-outpatient-drug-rehab-work-effectiveness-limits-and-what-to-expect/", permanent: true },
  { source: "/how-does-drug-treatment-work", destination: "/blog/how-does-drug-treatment-work/", permanent: true },
  { source: "/mental-health-and-addiction-rehab-how-integrated-outpatient-care-supports-long-term-recovery-in-seattle", destination: "/blog/mental-health-and-addiction-rehab-how-integrated-outpatient-care-supports-long-term-recovery-in-seattle/", permanent: true },
  { source: "/outpatient-recovery-program-in-seattle-a-practical-guide", destination: "/blog/outpatient-recovery-program-in-seattle-a-practical-guide/", permanent: true },
  { source: "/what-are-rehab-centers-a-practical-guide-to-modern-addiction-mental-health-treatment", destination: "/blog/what-are-rehab-centers-a-practical-guide-to-modern-addiction-mental-health-treatment/", permanent: true },
  { source: "/what-is-a-substance-abuse-program", destination: "/blog/what-is-a-substance-abuse-program/", permanent: true },
  { source: "/what-is-drug-rehab-like-a-day-to-day-look-at-treatment-with-an-outpatient-focus-in-seattle", destination: "/blog/what-is-drug-rehab-like-a-day-to-day-look-at-treatment-with-an-outpatient-focus-in-seattle/", permanent: true },
  { source: "/what-is-outpatient-rehab-seattle-guide-by-mountain-view-health", destination: "/blog/what-is-outpatient-rehab-seattle-guide-by-mountain-view-health/", permanent: true },
  // Template stubs not present on live WP site
  { source: "/resources", destination: "/guide/", permanent: true },
  { source: "/services", destination: "/levels-of-care/", permanent: true },
];
