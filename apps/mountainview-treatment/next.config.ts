import type { NextConfig } from "next";
import { wpRedirects } from "./src/lib/wp-redirects";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. It ships a sibling
  // `index.js.LICENSE.txt` artifact that Turbopack can't parse and ships
  // native bindings (sqlite3, statsig) that should resolve at runtime.
  // The SDK is only imported from server-side API routes via the
  // @sweetmedia/admin-core/server export path.
  serverExternalPackages: ["@cursor/sdk"],
  trailingSlash: true,
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
  },
};

export default nextConfig;
