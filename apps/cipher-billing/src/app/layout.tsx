import type { Metadata } from "next";
import { Marcellus, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper } from "@sweetmedia/admin-core";

/** Same Remix Icon major version as `@sweetmedia/inner-peak-colorado` — platform standard (CDN, no npm dep). */
const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

/**
 * CallRail dynamic number swap script (matches live cipherbilling.com).
 * Target source number on the site: 949-676-2252 — CallRail swaps this with
 * per-visitor tracking numbers at runtime. Do not change the URL without
 * coordinating with Cipher's CallRail account (company id 748580956).
 */
const CALLRAIL_SWAP_SRC =
  "https://cdn.callrail.com/companies/748580956/05b5ff6b6ad49ee8f8ea/12/swap.js";

const GA_ID = "G-BB7CVDE86Q";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Cipher Billing | Behavioral Health Billing Services",
    template: "%s | Cipher Billing",
  },
  description:
    "Behavioral health billing services focused on airtight compliance, transparent service, and measurable revenue growth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        {/* Google Analytics */}
        <Script
          id="ga-load"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
          async
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </head>
      <body className={`${marcellus.variable} ${montserrat.variable} antialiased`}>
        <Layout>{children}</Layout>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
