export type SiteRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Permanent 301s from legacy WordPress URLs to the Next.js route map. Paths use trailing slashes. */
export const siteRedirects: SiteRedirect[] = [
  // Blog: WP posts live at /{slug}/; normalize inbound /blog/{slug} links
  { source: "/blog/:slug", destination: "/:slug/", permanent: true },
  { source: "/blog/:slug/", destination: "/:slug/", permanent: true },

  // WP blog archive slug
  { source: "/blog-page", destination: "/blog/", permanent: true },
  { source: "/blog-page/", destination: "/blog/", permanent: true },

  // Core page renames
  { source: "/about-us", destination: "/about/", permanent: true },
  { source: "/about-us/", destination: "/about/", permanent: true },
  { source: "/contact-us-2", destination: "/contact/", permanent: true },
  { source: "/contact-us-2/", destination: "/contact/", permanent: true },
  {
    source: "/mental-health-facilities",
    destination: "/mental-health-treatment-missouri/",
    permanent: true,
  },
  {
    source: "/mental-health-facilities/",
    destination: "/mental-health-treatment-missouri/",
    permanent: true,
  },
  { source: "/terms-service", destination: "/terms/", permanent: true },
  { source: "/terms-service/", destination: "/terms/", permanent: true },
  { source: "/privacy-policy-2", destination: "/privacy-policy/", permanent: true },
  { source: "/privacy-policy-2/", destination: "/privacy-policy/", permanent: true },

  // Legacy SEO / modality pages → nearest native program page
  {
    source: "/art-therapy-springfield-mo",
    destination: "/music-therapy-springfield/",
    permanent: true,
  },
  {
    source: "/art-therapy-springfield-mo/",
    destination: "/music-therapy-springfield/",
    permanent: true,
  },
  {
    source: "/motivational-interviewing-near-me",
    destination: "/holistic-therapy-springfield/",
    permanent: true,
  },
  {
    source: "/motivational-interviewing-near-me/",
    destination: "/holistic-therapy-springfield/",
    permanent: true,
  },
  {
    source: "/person-centered-therapy-near-me",
    destination: "/therapist-springfield-mo/",
    permanent: true,
  },
  {
    source: "/person-centered-therapy-near-me/",
    destination: "/therapist-springfield-mo/",
    permanent: true,
  },
  {
    source: "/solution-focused-brief-therapy-near-me",
    destination: "/cognitive-behavioral-therapy-springfield-mo/",
    permanent: true,
  },
  {
    source: "/solution-focused-brief-therapy-near-me/",
    destination: "/cognitive-behavioral-therapy-springfield-mo/",
    permanent: true,
  },
  {
    source: "/wilderness-therapy-programs-near-me",
    destination: "/holistic-therapy-springfield/",
    permanent: true,
  },
  {
    source: "/wilderness-therapy-programs-near-me/",
    destination: "/holistic-therapy-springfield/",
    permanent: true,
  },
];
