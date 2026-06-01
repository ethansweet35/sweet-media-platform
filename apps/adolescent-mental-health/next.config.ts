import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@sweetmedia/admin-core", "@sweetmedia/blog-core"],
  },
  serverExternalPackages: ["@cursor/sdk"],
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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "almncgkbmooyuptdgkhe.supabase.co" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
      { source: "/conditions/gender-dysphoria", destination: "/lgbtq-teen-mental-health", permanent: true },
      { source: "/conditions/lgbtq", destination: "/lgbtq-teen-mental-health", permanent: true },
      { source: "/gender-affirming-care-for-teens", destination: "/lgbtq-teen-mental-health", permanent: true },
      { source: "/insurance-coverage", destination: "/verify-insurance", permanent: true },
      { source: "/insurance", destination: "/verify-insurance", permanent: true },
      { source: "/individual-therapy-for-teens", destination: "/therapy/individual-therapy-for-teens", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
