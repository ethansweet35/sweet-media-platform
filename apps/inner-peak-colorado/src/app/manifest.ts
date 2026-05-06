import type { MetadataRoute } from "next";

/** Web app manifest — `/manifest.webmanifest`. Icons match RealFaviconGenerator output + Next `src/app` metadata files. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inner Peak Colorado",
    short_name: "Inner Peak",
    description:
      "Premium virtual mental health and addiction treatment for women in Colorado.",
    start_url: "/",
    display: "browser",
    background_color: "#FAF8F5",
    theme_color: "#2C3B2E",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
