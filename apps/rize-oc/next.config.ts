import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@sweetmedia/admin-core", "@sweetmedia/blog-core"],
  },
  // Keep @cursor/sdk out of the Turbopack bundle. The SDK ships a sibling
  // index.js.LICENSE.txt artifact Turbopack can't parse and ships native
  // bindings (sqlite3, statsig) that should resolve at runtime. Only used
  // from server-side API routes via @sweetmedia/admin-core/server.
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
      { protocol: "https", hostname: "nfjlvkxrbzytjefmcvhg.supabase.co" },
      { protocol: "https", hostname: "uivbbrwuaffqujzkqjvr.supabase.co" },
      { protocol: "https", hostname: "rizeoc.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "*.gravatar.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // ── Blog slug URL normalization ───────────────────────────────────
      // WP posts live at /{slug}. Any /blog/{slug} link 301s to /{slug}.
      { source: "/blog/:slug([^/]+)", destination: "/:slug", permanent: true },

      // ── Stub page redirects ───────────────────────────────────────────
      { source: "/contact",    destination: "/verify-insurance", permanent: true },
      { source: "/admissions", destination: "/verify-insurance", permanent: true },
      { source: "/services",   destination: "/levels-of-care",   permanent: true },
      { source: "/resources",  destination: "/blog",              permanent: true },

      // ── WordPress misc slugs ──────────────────────────────────────────
      { source: "/about-us",  destination: "/about",    permanent: true },
      { source: "/team",      destination: "/our-team", permanent: true },
      { source: "/home",      destination: "/",         permanent: true },
      { source: "/elementor-1050", destination: "/blog", permanent: true },
      { source: "/outpatient-program-orange-county", destination: "/outpatient-program", permanent: true },
      { source: "/employee-assistance-program-eaps-amp-substance-abuse-services", destination: "/employee-assistance-program", permanent: true },

      // ── Online treatment renamed slugs ────────────────────────────────
      { source: "/online-anxiety-treatment-2", destination: "/online-anxiety-treatment", permanent: true },
      { source: "/adhd-treatment-online",      destination: "/online-adhd-treatment",    permanent: true },

      // ── Specialty program renamed slugs ───────────────────────────────
      { source: "/adult-mental-health-treatment",      destination: "/adult-mental-health", permanent: true },
      { source: "/adult-intensive-outpatient-program", destination: "/adult-addiction",     permanent: true },

      // ── Service area renamed slugs ────────────────────────────────────
      { source: "/drug-rehab-huntington-beach", destination: "/service-areas/huntington-beach", permanent: true },
      { source: "/laguna-beach-rehab-rize-oc",  destination: "/service-areas/laguna-beach",     permanent: true },
      { source: "/santa-ana-rehab-rize-oc",     destination: "/service-areas/santa-ana",        permanent: true },

      // ── Mental health renamed slugs ───────────────────────────────────
      { source: "/borderline-personality-disorder-treatment",    destination: "/mental-health/borderline-personality-disorder", permanent: true },
      { source: "/ptsd-treatment-orange-county",                 destination: "/mental-health/ptsd",              permanent: true },
      { source: "/schizophrenia-treatment-in-orange-county",     destination: "/mental-health/schizophrenia",     permanent: true },
      { source: "/ocd-treatment-orange-county",                  destination: "/mental-health/ocd",               permanent: true },
      { source: "/insomnia-treatment-orange-county",             destination: "/mental-health/insomnia",          permanent: true },
      { source: "/bipolar-disorder-treatment-in-orange-county",  destination: "/mental-health/bipolar-disorder",  permanent: true },
      { source: "/adhd-treatment-in-orange-county",              destination: "/mental-health/adhd",              permanent: true },
      { source: "/orange-county-anxiety-treatment",              destination: "/mental-health/anxiety",           permanent: true },
      { source: "/orange-county-depression-treatment",           destination: "/mental-health/depression",        permanent: true },

      // ── Addiction renamed slugs ───────────────────────────────────────
      { source: "/opiate-detox-orange-county",      destination: "/addiction/opiate",        permanent: true },
      { source: "/hallucinogen-addiction-treatment", destination: "/addiction/hallucinogen",  permanent: true },
      { source: "/cocaine-detox-orange-county",     destination: "/addiction/cocaine",        permanent: true },
      { source: "/benzodiazepine-detox-orange-county", destination: "/addiction/benzodiazepine", permanent: true },
      { source: "/meth-addiction-treatment",        destination: "/addiction/meth",           permanent: true },
      { source: "/inhalant-addiction-treatment",    destination: "/addiction/inhalant",       permanent: true },
      { source: "/alcohol-rehab-orange-county",     destination: "/addiction/alcohol",        permanent: true },
      { source: "/xanax-addiction-treatment",       destination: "/addiction/xanax",          permanent: true },

      // ── Teen / adolescent pages → home ───────────────────────────────
      { source: "/adolescent-mental-health",               destination: "/", permanent: true },
      { source: "/adolescent-online-treatment",            destination: "/", permanent: true },
      { source: "/dual-diagnosis-adolescent-treatment-centers", destination: "/", permanent: true },
      { source: "/virtual-iop-for-teens",                  destination: "/", permanent: true },
      { source: "/navigating-college-rehab",               destination: "/", permanent: true },

      // ── WP landing page slugs → /lp/* routes ─────────────────────────
      { source: "/anthem-insurance-rehab-landing-page-oos",        destination: "/lp/insurance/anthem",             permanent: true },
      { source: "/cigna-insurance-rehab-oos-lp",                   destination: "/lp/insurance/cigna",              permanent: true },
      { source: "/aetna-insurance-rehab-landing-page-oos",         destination: "/lp/insurance/aetna",              permanent: true },
      { source: "/uhc-insurance-rehab-landing-page-oos",           destination: "/lp/insurance/uhc",                permanent: true },
      { source: "/benzos-detox-landing-page-us",                   destination: "/lp/detox/benzos",                 permanent: true },
      { source: "/fentanyl-detox-landing-page-us",                 destination: "/lp/detox/fentanyl",               permanent: true },
      { source: "/alcohol-detox-center-landing-page",              destination: "/lp/detox/alcohol",                permanent: true },
      { source: "/general-meta-landing-page",                      destination: "/lp/meta/general",                 permanent: true },
      { source: "/general-mental-health-landing-page-california",  destination: "/lp/mental-health/general-california", permanent: true },
      { source: "/general-mental-health-landing-page-us",          destination: "/lp/mental-health/general-us",     permanent: true },
      { source: "/drug-alcohol-detox-landing-page-us",             destination: "/lp/galp/us-detox-exact",          permanent: true },
      { source: "/drug-alcohol-detox-landing-page",                destination: "/lp/detox/general-california",     permanent: true },
      { source: "/rize-treatment-california-detox-broad-match-galp", destination: "/lp/galp/california-detox",      permanent: true },
      { source: "/rize-treatment-partial-hospitalization-galp",    destination: "/lp/galp/php",                     permanent: true },
      { source: "/rize-oc-detox-meta-lp",                          destination: "/lp/galp/detox-meta",              permanent: true },
      { source: "/rize-treatment-us-mental-health-galp",           destination: "/lp/galp/us-mental-health",        permanent: true },
      { source: "/rize-treatment-us-detox-exact-match-galp",       destination: "/lp/galp/us-detox-exact",          permanent: true },
      { source: "/mental-health-us-bm-lp",                         destination: "/lp/galp/california-mental-health", permanent: true },
      { source: "/general-detox-galp-1",                           destination: "/lp/galp/us-detox-broad",          permanent: true },
      { source: "/7-oh-kratom-detox-galp-1",                       destination: "/lp/galp/kratom",                  permanent: true },
    ];
  },
};

export default nextConfig;
