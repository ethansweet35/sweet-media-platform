import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. The SDK ships a sibling
  // index.js.LICENSE.txt artifact Turbopack can't parse and ships native
  // bindings (sqlite3, statsig) that should resolve at runtime. Only used
  // from server-side API routes via @sweetmedia/admin-core/server.
  serverExternalPackages: ["@cursor/sdk"],
  async redirects() {
    return [
      /** WP nav targets post-651 "Our Process"; post-168 lives at /our-process for deep links only */
      { source: "/our-process", destination: "/our-process-2", permanent: true },
      /** WP nav "Our Solution" points to the RCM page; preserve deep-link compatibility */
      {
        source: "/our-solution",
        destination: "/behavioral-health-revenue-cycle-management",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "papiwmobmdbtzeeebmpr.supabase.co" },
      { protocol: "https", hostname: "nstzjqmtsqgeihkyvkqq.supabase.co" },
      { protocol: "https", hostname: "cipherbilling.com" },
    ],
  },
};

export default nextConfig;
