import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. It ships a sibling
  // `index.js.LICENSE.txt` artifact that Turbopack can't parse and ships
  // native bindings (sqlite3, statsig) that should resolve at runtime.
  // The SDK is only imported from server-side API routes via the
  // @sweetmedia/admin-core/server export path.
  serverExternalPackages: ["@cursor/sdk"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hrjmsrkrfenkltjlldfo.supabase.co" },
    ],
  },
};

export default nextConfig;
