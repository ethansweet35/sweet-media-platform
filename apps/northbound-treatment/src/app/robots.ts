import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/what-we-treat",
          "/virtual-outpatient",
          "/therapy",
          "/admissions",
          "/contact",
          "/resources",
          "/locations",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
