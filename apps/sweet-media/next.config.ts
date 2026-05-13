import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. The SDK ships a sibling
  // index.js.LICENSE.txt artifact Turbopack can't parse and ships native
  // bindings (sqlite3, statsig) that should resolve at runtime. Only used
  // from server-side API routes via @sweetmedia/admin-core/server.
  serverExternalPackages: ["@cursor/sdk"],
  transpilePackages: ["@sweetmedia/admin-core", "@sweetmedia/blog-core"],
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
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ynmldknprfusujudvutq.supabase.co",
      },
      {
        protocol: "https",
        hostname: "grbxnkgzhquwdqxlscv.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
