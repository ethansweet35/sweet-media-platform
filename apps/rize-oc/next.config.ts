import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. The SDK ships a sibling
  // index.js.LICENSE.txt artifact Turbopack can't parse and ships native
  // bindings (sqlite3, statsig) that should resolve at runtime. Only used
  // from server-side API routes via @sweetmedia/admin-core/server.
  serverExternalPackages: ["@cursor/sdk"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "uivbbrwuaffqujzkqjvr.supabase.co" },
      { protocol: "https", hostname: "nfjlvkxrbzytjefmcvhg.supabase.co" },
      { protocol: "https", hostname: "rizeoc.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "*.gravatar.com" },
    ],
  },
};

export default nextConfig;
