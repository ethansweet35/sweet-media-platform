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

      // ── WP nested /intervention-services/[slug] → canonical ────────────
      { source: "/intervention-services/alcohol-abuse-interventions",    destination: "/alcohol-abuse-interventions",              permanent: true },
      { source: "/intervention-services/drug-abuse-interventions",       destination: "/drug-abuse-interventions",                 permanent: true },
      { source: "/intervention-services/dual-diagnosis-interventions",   destination: "/dual-diagnosis-interventions",             permanent: true },
      { source: "/intervention-services/mental-health-interventions",    destination: "/mental-health-interventions",              permanent: true },
      { source: "/intervention-services/arise-intervention",             destination: "/intervention-types/arise",                 permanent: true },
      { source: "/intervention-services/the-johnson-model-intervention", destination: "/intervention-types/johnson-model",         permanent: true },
      { source: "/intervention-services/crisis-interventions",           destination: "/crisis-interventions",                    permanent: true },
      { source: "/intervention-services/family-interventions",           destination: "/family-interventions",                    permanent: true },
      { source: "/intervention-services/interventions-for-teens",        destination: "/interventions-for-teens",                 permanent: true },
      { source: "/intervention-services/interventions-for-executives",   destination: "/interventions-for-executives",            permanent: true },
      { source: "/intervention-services/opioid-intervention",            destination: "/drug-abuse-interventions/opioid",         permanent: true },
      { source: "/intervention-services/heroin-intervention",            destination: "/drug-abuse-interventions/heroin",         permanent: true },
      { source: "/intervention-services/meth-intervention",              destination: "/drug-abuse-interventions/meth",           permanent: true },
      { source: "/intervention-services/cocaine-intervention",           destination: "/drug-abuse-interventions/cocaine",        permanent: true },
      { source: "/intervention-services/ketamine-addiction",             destination: "/drug-abuse-interventions/ketamine",       permanent: true },
      { source: "/intervention-services/ocd-interventions",              destination: "/mental-health-interventions/ocd",         permanent: true },

      // ── WP nested /intervention-services/intervention-services-by-type/[slug] → flat ──
      { source: "/intervention-services/intervention-services-by-type",                                    destination: "/intervention-services",           permanent: true },
      { source: "/intervention-services/intervention-services-by-type/crisis-interventions",               destination: "/crisis-interventions",            permanent: true },
      { source: "/intervention-services/intervention-services-by-type/family-interventions",               destination: "/family-interventions",            permanent: true },
      { source: "/intervention-services/intervention-services-by-type/interventions-for-executives",       destination: "/interventions-for-executives",    permanent: true },
      { source: "/intervention-services/intervention-services-by-type/interventions-for-teens",            destination: "/interventions-for-teens",         permanent: true },
      { source: "/intervention-services/intervention-services-by-type/mental-health-interventions",        destination: "/mental-health-interventions",     permanent: true },
      { source: "/intervention-services/intervention-services-by-type/dual-diagnosis-interventions",       destination: "/dual-diagnosis-interventions",    permanent: true },
      { source: "/intervention-services-by-type",                                                          destination: "/intervention-services",           permanent: true },

      // ── Old flat methodology URLs → canonical /intervention-types/ ─────────
      { source: "/arise-intervention",                    destination: "/intervention-types/arise",            permanent: true },
      { source: "/the-johnson-model-intervention",        destination: "/intervention-types/johnson-model",    permanent: true },
      { source: "/intervention-types/arise-intervention", destination: "/intervention-types/arise",            permanent: true },

      // ── Old flat substance/MH URLs → canonical nested URLs ───────────────
      { source: "/opioid-intervention",   destination: "/drug-abuse-interventions/opioid",           permanent: true },
      { source: "/heroin-intervention",   destination: "/drug-abuse-interventions/heroin",           permanent: true },
      { source: "/meth-intervention",     destination: "/drug-abuse-interventions/meth",             permanent: true },
      { source: "/cocaine-intervention",  destination: "/drug-abuse-interventions/cocaine",          permanent: true },
      { source: "/ketamine-addiction",    destination: "/drug-abuse-interventions/ketamine",         permanent: true },
      { source: "/ocd-interventions",     destination: "/mental-health-interventions/ocd",           permanent: true },
      { source: "/anxiety",               destination: "/mental-health-interventions/anxiety",       permanent: true },
      { source: "/depression",            destination: "/mental-health-interventions/depression",    permanent: true },
      { source: "/self-medicating",       destination: "/mental-health-interventions/self-medicating", permanent: true },

      // ── WP nested /resources/[slug] → flat ──────────────────────────────
      { source: "/resources/intervention-quiz",                        destination: "/intervention-quiz",            permanent: true },
      { source: "/resources/codependency-assessment",                  destination: "/codependency-assessment",      permanent: true },
      { source: "/resources/how-to-plan-an-intervention-for-success",  destination: "/how-to-plan-an-intervention-for-success", permanent: true },
      { source: "/resources/is-it-time-for-an-intervention",           destination: "/is-it-time-for-an-intervention", permanent: true },
      { source: "/resources/find-your-missing-loved-one",              destination: "/find-your-missing-loved-one",  permanent: true },

      // ── New unified substance URL structure (old flat paths → /substance-abuse-interventions/*) ──
      { source: "/alcohol-abuse-interventions",          destination: "/substance-abuse-interventions/alcohol", permanent: true },
      { source: "/drug-abuse-interventions",             destination: "/substance-abuse-interventions/drug",    permanent: true },
      { source: "/drug-abuse-interventions/heroin",      destination: "/substance-abuse-interventions/heroin", permanent: true },
      { source: "/drug-abuse-interventions/cocaine",     destination: "/substance-abuse-interventions/cocaine", permanent: true },
      { source: "/drug-abuse-interventions/meth",        destination: "/substance-abuse-interventions/meth",   permanent: true },
      { source: "/drug-abuse-interventions/opioid",      destination: "/substance-abuse-interventions/opioid", permanent: true },
      { source: "/drug-abuse-interventions/ketamine",    destination: "/substance-abuse-interventions/ketamine", permanent: true },
    ];
  },
};

export default nextConfig;
