import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bxtwcdgjzzjxjvqdiuvn.supabase.co" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "addictioninterventions.com" },
    ],
  },
  async redirects() {
    return [
      // ── Renamed / removed pages ──────────────────────────────────────────
      { source: "/interventionist",          destination: "/david-gates",               permanent: true },
      { source: "/addiction-interventions-faq", destination: "/faqs",                  permanent: true },
      { source: "/drug-detox",               destination: "/drug-abuse-interventions",  permanent: true },
      { source: "/alcohol-detox",            destination: "/alcohol-abuse-interventions", permanent: true },

      // ── WP nested /intervention-services/[slug] → flat ──────────────────
      { source: "/intervention-services/alcohol-abuse-interventions",  destination: "/alcohol-abuse-interventions",  permanent: true },
      { source: "/intervention-services/drug-abuse-interventions",     destination: "/drug-abuse-interventions",     permanent: true },
      { source: "/intervention-services/dual-diagnosis-interventions", destination: "/dual-diagnosis-interventions", permanent: true },
      { source: "/intervention-services/mental-health-interventions",  destination: "/mental-health-interventions",  permanent: true },
      { source: "/intervention-services/arise-intervention",           destination: "/arise-intervention",           permanent: true },
      { source: "/intervention-services/crisis-interventions",         destination: "/crisis-interventions",         permanent: true },
      { source: "/intervention-services/family-interventions",         destination: "/family-interventions",         permanent: true },
      { source: "/intervention-services/interventions-for-teens",      destination: "/interventions-for-teens",      permanent: true },
      { source: "/intervention-services/interventions-for-executives", destination: "/interventions-for-executives", permanent: true },
      { source: "/intervention-services/the-johnson-model-intervention", destination: "/the-johnson-model-intervention", permanent: true },
      { source: "/intervention-services/opioid-intervention",          destination: "/opioid-intervention",          permanent: true },
      { source: "/intervention-services/heroin-intervention",          destination: "/heroin-intervention",          permanent: true },
      { source: "/intervention-services/meth-intervention",            destination: "/meth-intervention",            permanent: true },
      { source: "/intervention-services/cocaine-intervention",         destination: "/cocaine-intervention",         permanent: true },
      { source: "/intervention-services/ketamine-addiction",           destination: "/ketamine-addiction",           permanent: true },
      { source: "/intervention-services/ocd-interventions",            destination: "/ocd-interventions",            permanent: true },

      // ── WP nested /intervention-services/intervention-services-by-type/[slug] → flat ──
      { source: "/intervention-services/intervention-services-by-type",                                    destination: "/intervention-services",           permanent: true },
      { source: "/intervention-services/intervention-services-by-type/crisis-interventions",               destination: "/crisis-interventions",            permanent: true },
      { source: "/intervention-services/intervention-services-by-type/family-interventions",               destination: "/family-interventions",            permanent: true },
      { source: "/intervention-services/intervention-services-by-type/interventions-for-executives",       destination: "/interventions-for-executives",    permanent: true },
      { source: "/intervention-services/intervention-services-by-type/interventions-for-teens",            destination: "/interventions-for-teens",         permanent: true },
      { source: "/intervention-services/intervention-services-by-type/mental-health-interventions",        destination: "/mental-health-interventions",     permanent: true },
      { source: "/intervention-services/intervention-services-by-type/dual-diagnosis-interventions",       destination: "/dual-diagnosis-interventions",    permanent: true },
      { source: "/intervention-services-by-type",                                                          destination: "/intervention-services",           permanent: true },

      // ── WP nested /intervention-types/[slug] → flat ─────────────────────
      { source: "/intervention-types",                              destination: "/intervention-services",           permanent: true },
      { source: "/intervention-types/johnson-model",                destination: "/the-johnson-model-intervention", permanent: true },
      { source: "/intervention-types/arise",                        destination: "/arise-intervention",             permanent: true },
      { source: "/intervention-types/arise-intervention",           destination: "/arise-intervention",             permanent: true },
      { source: "/intervention-types/crisis-interventions",         destination: "/crisis-interventions",           permanent: true },
      { source: "/intervention-types/family-interventions",         destination: "/family-interventions",           permanent: true },
      { source: "/intervention-types/interventions-for-teens",      destination: "/interventions-for-teens",        permanent: true },
      { source: "/intervention-types/interventions-for-executives", destination: "/interventions-for-executives",   permanent: true },
      { source: "/intervention-types/mental-health-interventions",  destination: "/mental-health-interventions",    permanent: true },
      { source: "/intervention-types/dual-diagnosis-interventions", destination: "/dual-diagnosis-interventions",   permanent: true },
      { source: "/intervention-types/alcohol-abuse-interventions",  destination: "/alcohol-abuse-interventions",    permanent: true },
      { source: "/intervention-types/drug-abuse-interventions",     destination: "/drug-abuse-interventions",       permanent: true },

      // ── WP nested /resources/[slug] → flat ──────────────────────────────
      { source: "/resources/intervention-quiz",                        destination: "/intervention-quiz",            permanent: true },
      { source: "/resources/codependency-assessment",                  destination: "/codependency-assessment",      permanent: true },
      { source: "/resources/how-to-plan-an-intervention-for-success",  destination: "/how-to-plan-an-intervention-for-success", permanent: true },
      { source: "/resources/is-it-time-for-an-intervention",           destination: "/is-it-time-for-an-intervention", permanent: true },
      { source: "/resources/find-your-missing-loved-one",              destination: "/find-your-missing-loved-one",  permanent: true },
    ];
  },
};

export default nextConfig;
