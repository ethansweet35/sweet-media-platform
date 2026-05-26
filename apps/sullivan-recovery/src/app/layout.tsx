import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper, PageEditorProvider } from "@sweetmedia/admin-core";

/** Platform standard: Remix Icon via CDN */
const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

/**
 * CallRail dynamic number swap (matches live sullivanrecovery.com head snippet).
 * Target source number on the site: 949-836-7180 — CallRail swaps per visitor.
 * Company id 669252576. Do not change without coordinating with Sullivan's CallRail account.
 */
const CALLRAIL_SWAP_SRC =
  "https://cdn.callrail.com/companies/669252576/4d4cdcce67676fa20960/12/swap.js";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Sullivan Recovery | Drug & Alcohol Detox in Orange County",
    template: "%s | Sullivan Recovery",
  },
  description:
    "Sullivan Recovery is a medical detox and residential treatment center in Mission Viejo, California. Compassionate, evidence-based care for drug and alcohol addiction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.callrail.com" crossOrigin="anonymous" />
        <link rel="preload" as="script" href={CALLRAIL_SWAP_SRC} fetchPriority="high" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preload" as="style" href={REMIXICON_CSS} crossOrigin="anonymous" />
        <Script id="load-remixicon-styles" strategy="afterInteractive">{`
          (function() {
            var cssHref = "${REMIXICON_CSS}";
            var inject = function () {
              if (document.querySelector('link[href="' + cssHref + '"][rel="stylesheet"]')) return;
              var link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = cssHref;
              link.crossOrigin = "anonymous";
              document.head.appendChild(link);
            };
            if (document.readyState === "complete") {
              if ("requestIdleCallback" in window) {
                window.requestIdleCallback(inject, { timeout: 1200 });
              } else {
                setTimeout(inject, 400);
              }
              return;
            }
            window.addEventListener("load", function onLoad() {
              window.removeEventListener("load", onLoad);
              if ("requestIdleCallback" in window) {
                window.requestIdleCallback(inject, { timeout: 1200 });
              } else {
                setTimeout(inject, 400);
              }
            });
          })();
        `}</Script>
        <noscript>
          <link rel="stylesheet" href={REMIXICON_CSS} crossOrigin="anonymous" />
        </noscript>
        <Script
          id="callrail-swap"
          src={CALLRAIL_SWAP_SRC}
          strategy="afterInteractive"
          async
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <PageEditorProvider>
          <Layout>{children}</Layout>
        </PageEditorProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
