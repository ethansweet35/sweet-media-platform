import type { NextConfig } from "next";
import { wpRedirects } from "./src/lib/wp-redirects";

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
  trailingSlash: true,
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
    return wpRedirects;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gueqxorkktfcwiakepcp.supabase.co" },
      { protocol: "https", hostname: "mountainviewtreatment.com" },
      { protocol: "https", hostname: "www.mountainviewtreatment.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
