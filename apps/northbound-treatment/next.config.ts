import type { NextConfig } from "next";
import { wpRedirects } from "./src/lib/wp-redirects";

const nextConfig: NextConfig = {
  // Keep @cursor/sdk out of the Turbopack bundle. The SDK ships a sibling
  // index.js.LICENSE.txt artifact Turbopack can't parse and ships native
  // bindings (sqlite3, statsig) that should resolve at runtime. Only used
  // from server-side API routes via @sweetmedia/admin-core/server.
  serverExternalPackages: ["@cursor/sdk"],
  trailingSlash: true,
  async redirects() {
    return [
      // /locations/garden-grove/ was the original WP path; canonical is now /locations/california/garden-grove/
      { source: "/locations/garden-grove/", destination: "/locations/california/garden-grove/", permanent: true },
      // /contact/ was the scaffold default; live site uses /contact-us/
      { source: "/contact/", destination: "/contact-us/", permanent: true },
      // Leadership page aliases → /team/
      { source: "/about/leadership/", destination: "/team/", permanent: true },
      { source: "/staff/", destination: "/team/", permanent: true },
      { source: "/our-staff/", destination: "/team/", permanent: true },
      { source: "/wahler-scholarship/", destination: "/financial-assistance/", permanent: true },
      { source: "/treatment/transitional-living-programs/", destination: "/programs/aftercare/", permanent: true },
      { source: "/treatment/transitional-living-programs/sober-living/", destination: "/programs/aftercare/", permanent: true },
      ...wpRedirects,
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ahufsygjwpbymomfdazb.supabase.co" },
    ],
  },
};

export default nextConfig;
