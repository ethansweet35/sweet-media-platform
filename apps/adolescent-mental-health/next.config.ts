import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@cursor/sdk"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "almncgkbmooyuptdgkhe.supabase.co" },
    ],
  },
  async redirects() {
    return [
      { source: "/conditions", destination: "/treatment", permanent: true },
      { source: "/conditions/depression", destination: "/teen-depression-treatment", permanent: true },
      { source: "/conditions/trauma-ptsd", destination: "/ptsd-treatment-online", permanent: true },
      { source: "/conditions/anxiety", destination: "/online-anxiety-treatment", permanent: true },
      { source: "/conditions/adhd", destination: "/adhd-treatment-for-teens", permanent: true },
      { source: "/conditions/bipolar", destination: "/online-bipolar-treatment", permanent: true },
      { source: "/conditions/ocd", destination: "/online-ocd-treatment", permanent: true },
      { source: "/conditions/schizoaffective", destination: "/schizophrenia-in-adolescence", permanent: true },
      { source: "/conditions/gender-dysphoria", destination: "/virtual-iop-for-teens", permanent: true },
      { source: "/insurance-coverage", destination: "/verify-insurance", permanent: true },
      { source: "/insurance", destination: "/verify-insurance", permanent: true },
      { source: "/individual-therapy-for-teens", destination: "/therapy/individual-therapy-for-teens", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
