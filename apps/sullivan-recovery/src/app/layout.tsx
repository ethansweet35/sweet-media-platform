import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { DeferredAnalyticsWrapper } from "@sweetmedia/admin-core";
import { SR_SUPABASE_ORIGIN } from "@/lib/heroVideo";

/** Platform standard: self-hosted Remix Icon subset (built pre-build). */
const REMIXICON_CSS = "/styles/remixicon-subset.css";

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
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
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
        <link rel="preconnect" href={SR_SUPABASE_ORIGIN} crossOrigin="anonymous" />
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
        <Script
          id="callrail-swap"
          src={CALLRAIL_SWAP_SRC}
          strategy="lazyOnload"
        />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        <Layout>{children}</Layout>
        <DeferredAnalyticsWrapper />
      </body>
    </html>
  );
}
