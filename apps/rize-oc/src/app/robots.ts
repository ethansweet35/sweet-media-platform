import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/api/"],
        allow: [
          "/",
          "/about",
          "/admissions",
          "/contact",
          "/resources",
          "/services",
          "/blog",
          "/levels-of-care",
          "/drug-alcohol-detox",
          "/partial-hospitalization-program-orange-county",
          "/iop-program-orange-county",
          "/outpatient-program",
          "/virtual-outpatient-program",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
