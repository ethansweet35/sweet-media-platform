import type { MetadataRoute } from "next";
import { mergeRobotsDisallow } from "@sweetmedia/admin-core";
import { getPublicSiteOrigin } from "@/lib/publicSiteUrl";

/** Platform-wide `/_next/` + WP legacy disallows come from mergeRobotsDisallow — do not duplicate here. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: mergeRobotsDisallow(["/admin/", "/api/"]),
      },
    ],
    sitemap: `${getPublicSiteOrigin()}/sitemap.xml`,
  };
}
