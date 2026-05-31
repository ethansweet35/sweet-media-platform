import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@sweetmedia/admin-core", "@sweetmedia/blog-core"],
  },
  // Keep @cursor/sdk out of the Turbopack bundle. It ships a sibling
  // `index.js.LICENSE.txt` artifact that Turbopack can't parse and ships
  // native bindings (sqlite3, statsig) that should resolve at runtime.
  // The SDK is only imported from server-side API routes via the
  // @sweetmedia/admin-core/server export path.
  serverExternalPackages: ["@cursor/sdk"],
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bxtwcdgjzzjxjvqdiuvn.supabase.co" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "addictioninterventions.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // ── Renamed / removed pages ──────────────────────────────────────────
      { source: "/drug-intervention-wyoming", destination: "/service-areas/wyoming", permanent: true },
      { source: "/interventionist",          destination: "/david-gates",               permanent: true },
      { source: "/addiction-interventions-faq", destination: "/faqs",                  permanent: true },
      { source: "/drug-detox",               destination: "/drug-abuse-interventions",  permanent: true },
      { source: "/alcohol-detox",            destination: "/alcohol-abuse-interventions", permanent: true },

      // ── WP nested /intervention-services/[slug] → canonical ────────────
      { source: "/intervention-services/alcohol-abuse-interventions",    destination: "/substance-abuse-interventions/alcohol",   permanent: true },
      { source: "/intervention-services/drug-abuse-interventions",       destination: "/substance-abuse-interventions/drug",      permanent: true },
      { source: "/intervention-services/dual-diagnosis-interventions",   destination: "/dual-diagnosis-interventions",            permanent: true },
      { source: "/intervention-services/mental-health-interventions",    destination: "/mental-health-interventions",             permanent: true },
      { source: "/intervention-services/arise-intervention",             destination: "/intervention-types/arise",                permanent: true },
      { source: "/intervention-services/the-johnson-model-intervention", destination: "/intervention-types/johnson-model",        permanent: true },
      { source: "/intervention-services/crisis-interventions",           destination: "/crisis-interventions",                   permanent: true },
      { source: "/intervention-services/family-interventions",           destination: "/family-interventions",                   permanent: true },
      { source: "/intervention-services/interventions-for-teens",        destination: "/interventions-for-teens",                permanent: true },
      { source: "/intervention-services/interventions-for-executives",   destination: "/interventions-for-executives",           permanent: true },
      { source: "/intervention-services/opioid-intervention",            destination: "/substance-abuse-interventions/opioid",   permanent: true },
      { source: "/intervention-services/heroin-intervention",            destination: "/substance-abuse-interventions/heroin",   permanent: true },
      { source: "/intervention-services/meth-intervention",              destination: "/substance-abuse-interventions/meth",     permanent: true },
      { source: "/intervention-services/cocaine-intervention",           destination: "/substance-abuse-interventions/cocaine",  permanent: true },
      { source: "/intervention-services/ketamine-addiction",             destination: "/substance-abuse-interventions/ketamine", permanent: true },
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
      { source: "/opioid-intervention",      destination: "/substance-abuse-interventions/opioid",      permanent: true },
      { source: "/heroin-intervention",      destination: "/substance-abuse-interventions/heroin",      permanent: true },
      { source: "/meth-intervention",        destination: "/substance-abuse-interventions/meth",        permanent: true },
      { source: "/cocaine-intervention",     destination: "/substance-abuse-interventions/cocaine",     permanent: true },
      { source: "/ketamine-addiction",       destination: "/substance-abuse-interventions/ketamine",    permanent: true },
      { source: "/ocd-interventions",        destination: "/mental-health-interventions/ocd",           permanent: true },
      { source: "/anxiety",                  destination: "/mental-health-interventions/anxiety",       permanent: true },
      { source: "/depression",               destination: "/mental-health-interventions/depression",    permanent: true },
      { source: "/depression-interventions", destination: "/mental-health-interventions/depression",    permanent: true },
      { source: "/self-medicating",          destination: "/mental-health-interventions/self-medicating", permanent: true },

      // ── WP nested /resources/[slug] → flat ──────────────────────────────
      { source: "/resources/intervention-quiz",                        destination: "/intervention-quiz",            permanent: true },
      { source: "/resources/codependency-assessment",                  destination: "/codependency-assessment",      permanent: true },
      { source: "/resources/how-to-plan-an-intervention-for-success",  destination: "/how-to-plan-an-intervention-for-success", permanent: true },
      { source: "/resources/is-it-time-for-an-intervention",           destination: "/is-it-time-for-an-intervention", permanent: true },
      { source: "/resources/find-your-missing-loved-one",              destination: "/find-your-missing-loved-one",  permanent: true },

      // ── Missing flat MH/state/author URLs → canonical ──────────────────
      { source: "/anxiety-interventions",    destination: "/mental-health-interventions/anxiety",    permanent: true },
      { source: "/bipolar-interventions",    destination: "/mental-health-interventions/bipolar",    permanent: true },
      { source: "/ptsd-interventions",       destination: "/mental-health-interventions/ptsd",       permanent: true },
      { source: "/california-interventions", destination: "/service-areas/california",              permanent: true },
      { source: "/author/aaron",             destination: "/about-us",                               permanent: true },

      // ── Legacy family-interventions-{state} → /service-areas/<state> ───
      { source: "/family-interventions-missouri",  destination: "/service-areas/missouri",  permanent: true },
      { source: "/family-interventions-wyoming",    destination: "/service-areas/wyoming",    permanent: true },
      { source: "/family-interventions-colorado",  destination: "/service-areas/colorado",  permanent: true },
      { source: "/family-interventions-alabama",   destination: "/service-areas/alabama",   permanent: true },

      // ── New unified substance URL structure (old flat paths → /substance-abuse-interventions/*) ──
      { source: "/alcohol-abuse-interventions",          destination: "/substance-abuse-interventions/alcohol", permanent: true },
      { source: "/drug-abuse-interventions",             destination: "/substance-abuse-interventions/drug",    permanent: true },
      { source: "/drug-abuse-interventions/heroin",      destination: "/substance-abuse-interventions/heroin", permanent: true },
      { source: "/drug-abuse-interventions/cocaine",     destination: "/substance-abuse-interventions/cocaine", permanent: true },
      { source: "/drug-abuse-interventions/meth",        destination: "/substance-abuse-interventions/meth",   permanent: true },
      { source: "/drug-abuse-interventions/opioid",      destination: "/substance-abuse-interventions/opioid", permanent: true },
      { source: "/drug-abuse-interventions/ketamine",    destination: "/substance-abuse-interventions/ketamine", permanent: true },

      // ── Flat state/city pages → /service-areas/<slug> ─────────────────────
      { source: "/alabama",        destination: "/service-areas/alabama",        permanent: true },
      { source: "/alaska",         destination: "/service-areas/alaska",         permanent: true },
      { source: "/arizona",        destination: "/service-areas/arizona",        permanent: true },
      { source: "/arkansas",       destination: "/service-areas/arkansas",       permanent: true },
      { source: "/california",     destination: "/service-areas/california",     permanent: true },
      { source: "/colorado",       destination: "/service-areas/colorado",       permanent: true },
      { source: "/connecticut",    destination: "/service-areas/connecticut",    permanent: true },
      { source: "/delaware",       destination: "/service-areas/delaware",       permanent: true },
      { source: "/florida",        destination: "/service-areas/florida",        permanent: true },
      { source: "/georgia",        destination: "/service-areas/georgia",        permanent: true },
      { source: "/hawaii",         destination: "/service-areas/hawaii",         permanent: true },
      { source: "/idaho",          destination: "/service-areas/idaho",          permanent: true },
      { source: "/illinois",       destination: "/service-areas/illinois",       permanent: true },
      { source: "/indiana",        destination: "/service-areas/indiana",        permanent: true },
      { source: "/iowa",           destination: "/service-areas/iowa",           permanent: true },
      { source: "/kansas",         destination: "/service-areas/kansas",         permanent: true },
      { source: "/kentucky",       destination: "/service-areas/kentucky",       permanent: true },
      { source: "/louisiana",      destination: "/service-areas/louisiana",      permanent: true },
      { source: "/maryland",       destination: "/service-areas/maryland",       permanent: true },
      { source: "/minnesota",      destination: "/service-areas/minnesota",      permanent: true },
      { source: "/montana",        destination: "/service-areas/montana",        permanent: true },
      { source: "/nevada",         destination: "/service-areas/nevada",         permanent: true },
      { source: "/new-mexico",     destination: "/service-areas/new-mexico",     permanent: true },
      { source: "/new-york",       destination: "/service-areas/new-york",       permanent: true },
      { source: "/north-carolina", destination: "/service-areas/north-carolina", permanent: true },
      { source: "/north-dakota",   destination: "/service-areas/north-dakota",   permanent: true },
      { source: "/oklahoma",       destination: "/service-areas/oklahoma",       permanent: true },
      { source: "/oregon",         destination: "/service-areas/oregon",         permanent: true },
      { source: "/south-dakota",   destination: "/service-areas/south-dakota",   permanent: true },
      { source: "/texas",          destination: "/service-areas/texas",          permanent: true },
      { source: "/utah",           destination: "/service-areas/utah",           permanent: true },
      { source: "/washington",     destination: "/service-areas/washington",     permanent: true },
      { source: "/maine",          destination: "/service-areas/maine",          permanent: true },
      { source: "/massachusetts",  destination: "/service-areas/massachusetts",  permanent: true },
      { source: "/michigan",       destination: "/service-areas/michigan",       permanent: true },
      { source: "/mississippi",    destination: "/service-areas/mississippi",    permanent: true },
      { source: "/missouri",       destination: "/service-areas/missouri",       permanent: true },
      { source: "/nebraska",       destination: "/service-areas/nebraska",       permanent: true },
      { source: "/new-hampshire",  destination: "/service-areas/new-hampshire",  permanent: true },
      { source: "/new-jersey",     destination: "/service-areas/new-jersey",     permanent: true },
      { source: "/ohio",           destination: "/service-areas/ohio",           permanent: true },
      { source: "/pennsylvania",   destination: "/service-areas/pennsylvania",   permanent: true },
      { source: "/rhode-island",   destination: "/service-areas/rhode-island",   permanent: true },
      { source: "/south-carolina", destination: "/service-areas/south-carolina", permanent: true },
      { source: "/tennessee",      destination: "/service-areas/tennessee",      permanent: true },
      { source: "/vermont",        destination: "/service-areas/vermont",        permanent: true },
      { source: "/virginia",       destination: "/service-areas/virginia",       permanent: true },
      { source: "/west-virginia",  destination: "/service-areas/west-virginia",  permanent: true },
      { source: "/wisconsin",      destination: "/service-areas/wisconsin",      permanent: true },
      { source: "/wyoming",        destination: "/service-areas/wyoming",        permanent: true },
      { source: "/los-angeles",    destination: "/service-areas/los-angeles",    permanent: true },
      { source: "/san-diego",      destination: "/service-areas/san-diego",      permanent: true },
    ];
  },
};

export default nextConfig;
