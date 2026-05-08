import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bxtwcdgjzzjxjvqdiuvn.supabase.co" },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "addictioninterventions.com" },
    ],
  },
  async redirects() {
    return [
      // WP-nested URL — same content as /intervention-services
      {
        source: "/intervention-services-by-type",
        destination: "/intervention-services",
        permanent: true,
      },
      // Removed pages — point users to closest equivalent
      {
        source: "/addiction-interventions-faq",
        destination: "/faqs",
        permanent: true,
      },
      {
        source: "/drug-detox",
        destination: "/drug-abuse-interventions",
        permanent: true,
      },
      {
        source: "/alcohol-detox",
        destination: "/alcohol-abuse-interventions",
        permanent: true,
      },
      {
        source: "/interventionist",
        destination: "/david-gates",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
