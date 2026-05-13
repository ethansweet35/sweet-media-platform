import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. The SDK ships a sibling
  // index.js.LICENSE.txt artifact Turbopack can't parse and ships native
  // bindings (sqlite3, statsig) that should resolve at runtime. Only used
  // from server-side API routes via @sweetmedia/admin-core/server.
  serverExternalPackages: ["@cursor/sdk"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [35, 50, 60, 75],
    remotePatterns: [
      { protocol: "https", hostname: "readdy.ai" },
      { protocol: "https", hostname: "static.readdy.ai" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "papiwmobmdbtzeeebmpr.supabase.co" },
    ],
  },
};

export default nextConfig;
