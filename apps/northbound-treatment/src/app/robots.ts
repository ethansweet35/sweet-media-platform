import type { MetadataRoute } from "next";
import { mergeRobotsDisallow } from "@sweetmedia/admin-core";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: mergeRobotsDisallow([
          "/admin/",
          "/api/",
          "/programs/residential-treatment-center/mens-residential-treatment/",
          "/programs/residential-treatment-center/womens-residential-treatment/",
          "/veterans-track-program/",
          "/treatment/music-program/",
          "/programs/intensive-outpatient-treatment/",
          "/treatment/transitional-living-programs/",
        ]),
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
