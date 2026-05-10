import type { NextConfig } from "next";
import { wpRedirects } from "./src/lib/wp-redirects";

const nextConfig: NextConfig = {
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
