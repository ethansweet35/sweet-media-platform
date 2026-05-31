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
  async redirects() {
    return [
      /** WP nav "Our Solution" points to the RCM page; preserve deep-link compatibility */
      {
        source: "/our-solution",
        destination: "/behavioral-health-revenue-cycle-management",
        permanent: true,
      },
      /** /our-process-2 was the old duplicate URL — redirect to canonical */
      { source: "/our-process-2", destination: "/our-process", permanent: true },
      /** Blog posts moved from /blog/:slug to /:slug — catch any inbound /blog/* links */
      { source: "/blog/:slug", destination: "/:slug", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "papiwmobmdbtzeeebmpr.supabase.co" },
      { protocol: "https", hostname: "nstzjqmtsqgeihkyvkqq.supabase.co" },
      { protocol: "https", hostname: "cipherbilling.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
