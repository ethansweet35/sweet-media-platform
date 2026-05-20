import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/testimonials", destination: "/stories/", permanent: true },
      { source: "/impact-report", destination: "/2025-survey-results/", permanent: true },
      { source: "/events/nashville", destination: "/gala/nashville/", permanent: true },
      { source: "/events", destination: "/gala/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/events-1", destination: "/gala/", permanent: true },
      { source: "/contact-menu", destination: "/contact/", permanent: true },
      { source: "/about", destination: "/about-the-family-recovery-foundation/", permanent: true },
      { source: "/blogs", destination: "/blog/", permanent: true },
      { source: "/blogs/:slug", destination: "/blog/:slug/", permanent: true },
      { source: "/lrsf-blogs", destination: "/blog/", permanent: true },
      { source: "/lrsf-blogs/:slug", destination: "/blog/:slug/", permanent: true },
      {
        source: "/sign-up/family-programming",
        destination: "/family-programming/#family-programming-registration",
        permanent: true,
      },
      {
        source: "/registration/fix-your-family-1",
        destination: "/registration/fix-your-family/",
        permanent: true,
      },
    ];
  },
  // Keep @cursor/sdk out of the Turbopack bundle. It ships a sibling
  // `index.js.LICENSE.txt` artifact that Turbopack can't parse and ships
  // native bindings (sqlite3, statsig) that should resolve at runtime.
  // The SDK is only imported from server-side API routes via the
  // @sweetmedia/admin-core/server export path.
  serverExternalPackages: ["@cursor/sdk"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "jkiafgbizwufsycqlfyr.supabase.co" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "static1.squarespace.com" },
      { protocol: "https", hostname: "static.readdy.ai" },
      { protocol: "https", hostname: "readdy.ai" },
    ],
  },
};

export default nextConfig;
