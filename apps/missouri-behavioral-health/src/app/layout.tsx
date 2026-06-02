import type { Metadata } from "next";
import Script from "next/script";
import ConditionalMarketingChrome from "@/components/feature/ConditionalMarketingChrome";
import { DeferredAnalyticsWrapper } from "@sweetmedia/admin-core";
import "./globals.css";

/** Self-hosted Remix Icon subset (built in prebuild). */
const REMIXICON_CSS = "/styles/remixicon-subset.css";

const CALLRAIL_SWAP_SRC =
  "https://cdn.callrail.com/companies/638776964/9e1a91a0c509e24d145d/12/swap.js";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://missouribehavioralhealth.com"),
  manifest: "/site.webmanifest",
  title: {
    default: "Missouri Behavioral Health | Mental Health & Addiction Treatment",
    template: "%s | Missouri Behavioral Health",
  },
  description:
    "Missouri Behavioral Health provides mental health and addiction treatment across Missouri — IOP, PHP, outpatient, and virtual programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="load-remixicon-styles" strategy="lazyOnload">{`
          (function() {
            var cssHref = "${REMIXICON_CSS}";
            var inject = function () {
              if (document.querySelector('link[href="' + cssHref + '"][rel="stylesheet"]')) return;
              var link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = cssHref;
              document.head.appendChild(link);
            };
            var schedule = function () {
              if ("requestIdleCallback" in window) {
                window.requestIdleCallback(inject, { timeout: 4000 });
              } else {
                setTimeout(inject, 3000);
              }
            };
            if (document.readyState === "complete") schedule();
            else window.addEventListener("load", schedule, { once: true });
          })();
        `}</Script>
        <noscript>
          <link rel="stylesheet" href={REMIXICON_CSS} />
        </noscript>
        <Script id="callrail-swap" src={CALLRAIL_SWAP_SRC} strategy="lazyOnload" />
      </head>
      <body className="antialiased">
        <ConditionalMarketingChrome>{children}</ConditionalMarketingChrome>
        <DeferredAnalyticsWrapper />
      </body>
    </html>
  );
}
