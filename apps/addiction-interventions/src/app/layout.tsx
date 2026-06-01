import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { DeferredAnalyticsWrapper } from "@sweetmedia/admin-core";

/** Platform standard: Remix Icon via CDN (same as inner-peak-colorado / sweet-media marketing patterns). */
const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

const GA_MEASUREMENT_ID = "G-FZNMZLH54F";

/**
 * CallRail dynamic number swap (company id 798922664).
 * Target source number on the site: 949-776-7093 — CallRail swaps per visitor.
 */
const CALLRAIL_SWAP_SRC =
  "https://cdn.callrail.com/companies/798922664/0c762821e2ff487dac54/12/swap.js";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Tab / PWA icons: RealFaviconGenerator assets in `src/app/` + `public/site.webmanifest`. */

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  manifest: "/site.webmanifest",
  title: {
    default: "Addiction Interventions | Family & Crisis Intervention Experts",
    template: "%s | Addiction Interventions",
  },
  description:
    "Compassionate, family-centered addiction and mental health interventions. 1,500+ families helped nationwide. Speak with a certified interventionist 24/7.",
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window['ga-disable-${GA_MEASUREMENT_ID}'] = document.cookie.split(';').some(function(c){ return c.trim() === 'sm_internal=1'; });
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`}>
        <Layout>{children}</Layout>
        <DeferredAnalyticsWrapper />
      </body>
    </html>
  );
}
