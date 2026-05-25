export type SiteRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/** Permanent 301s from legacy URLs to /programs/detox/* structure */
export const siteRedirects: SiteRedirect[] = [
  // Blog & contact (existing behavior)
  { source: "/blogs/", destination: "/blog/", permanent: true },
  { source: "/blogs/:path*/", destination: "/blog/:path*/", permanent: true },
  { source: "/contact/", destination: "/insurance/", permanent: true },
  { source: "/admissions/", destination: "/insurance/", permanent: true },

  // Orphan stubs
  { source: "/about/", destination: "/our-approach/", permanent: true },
  { source: "/services/", destination: "/programs/", permanent: true },
  { source: "/resources/", destination: "/blog/", permanent: true },

  // Standalone detox pages → programs/detox
  { source: "/general-detox/", destination: "/programs/detox/drugs/", permanent: true },
  { source: "/detox-alcohol-near-me/", destination: "/programs/detox/alcohol/", permanent: true },
  { source: "/detox-in-orange-county/", destination: "/programs/detox/orange-county/", permanent: true },

  // Legacy detox hub
  {
    source: "/addiction-aftercare-program/",
    destination: "/programs/detox/",
    permanent: true,
  },

  // Money pages (nested legacy)
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/drug-and-alcohol-detox-mission-viejo/",
    destination: "/programs/detox/drugs/",
    permanent: true,
  },

  // Substance pages under opioid-detox-orange-county
  {
    source: "/addiction-aftercare-program/opioid-detox-orange-county/",
    destination: "/programs/detox/opioids/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/opioid-detox-orange-county/",
    destination: "/programs/detox/opioids/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/fentanyl-detox-near-me/",
    destination: "/programs/detox/fentanyl/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/meth-detox-mission-viejo/",
    destination: "/programs/detox/meth/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/cocaine-detox-center-california/",
    destination: "/programs/detox/cocaine/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/benzo-detox-orange-county/",
    destination: "/programs/detox/benzodiazepines/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/suboxone-detox-centers-near-me/",
    destination: "/programs/detox/suboxone/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/stimulants-detox/",
    destination: "/programs/detox/stimulants/",
    permanent: true,
  },
  {
    source:
      "/addiction-aftercare-program/opioid-detox-orange-county/detox-facility-orange-county/",
    destination: "/programs/detox/orange-county/",
    permanent: true,
  },

  // Other programs
  {
    source: "/addiction-aftercare-program/iop-treatment-mission-viejo/",
    destination: "/programs/residential-treatment/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/aftercare-programs/",
    destination: "/programs/aftercare/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/wellbriety-program/",
    destination: "/programs/wellbriety/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/addiction-therapies/",
    destination: "/programs/therapies/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/personalized-care-drugs/",
    destination: "/programs/personalized-care/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/addiction-aftercare-programs-near-me/",
    destination: "/programs/",
    permanent: true,
  },

  // Insurance (moved out of addiction-aftercare-program)
  {
    source: "/addiction-aftercare-program/aetna-insurance-coverage-for-rehab/",
    destination: "/insurance/aetna/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/anthem-blue-cross-rehab-insurance/",
    destination: "/insurance/anthem/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/cigna-rehab-coverage/",
    destination: "/insurance/cigna/",
    permanent: true,
  },
  {
    source: "/addiction-aftercare-program/beacon-health-insurance-rehab-coverage/",
    destination: "/insurance/beacon/",
    permanent: true,
  },

  // Service areas (draft) → regional detox page
  { source: "/service-area/", destination: "/programs/detox/orange-county/", permanent: true },
  {
    source: "/service-area/detox-center-huntington-beach/",
    destination: "/programs/detox/orange-county/",
    permanent: true,
  },
  {
    source: "/service-area/drug-detox-lake-forest/",
    destination: "/programs/detox/orange-county/",
    permanent: true,
  },
  {
    source: "/service-area/laguna-beach-detox/",
    destination: "/programs/detox/orange-county/",
    permanent: true,
  },
  {
    source: "/service-area/newport-beach-detox/",
    destination: "/programs/detox/orange-county/",
    permanent: true,
  },
  {
    source: "/service-area/orange-county-medical-detox/",
    destination: "/programs/detox/orange-county/",
    permanent: true,
  },
];
