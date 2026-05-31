import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { DeferredAnalyticsWrapper } from "@sweetmedia/admin-core/public-layout";
import { CTM_SCRIPTS_ENABLED, CTM_TRACKING_SRC } from "@/lib/ctm";
import CtmRouteReloader from "@/components/feature/CtmRouteReloader";
import DeferredAccessiBe from "@/components/feature/DeferredAccessiBe";
import DeferredTalkFurther from "@/components/feature/DeferredTalkFurther";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "optional",
  preload: false,
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.northboundtreatment.com";
const GTM_ID = "GTM-NMVS2FN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Northbound Treatment | Addiction Treatment Center in Orange County",
    template: "%s | Northbound Treatment",
  },
  description:
    "Northbound Treatment Services has provided lifesaving, evidence-based addiction and mental-health treatment for more than 30 years. Drug & alcohol detox, residential, PHP, IOP, and aftercare across Southern California and the Pacific Northwest.",
  openGraph: {
    type: "website",
    siteName: "Northbound Treatment Center",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  verification: {
    // Google Search Console — all three tokens from live northboundtreatment.com
    google: [
      "VAXEOgYyTfbdJw43HL8G9Np_nj-v9l08w9fvDVdULsA",
      "VvijEpwFBXh5WAz-vAyXRvqNA3WJSgyah4XkADa46v8",
      "ZUtfdfG649qVniC8DwGmN5P7M5l81XZkJ2bxVASkZ-o",
    ],
    // Bing Webmaster Tools
    other: { "msvalidate.01": "58858C2D3852FFB879A62174C45FFFF3" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://ahufsygjwpbymomfdazb.supabase.co" />
        <link rel="dns-prefetch" href="https://186366.tctm.co" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Icons: inject after first paint — remixicon.woff2 was on PSI critical path. */}
        <Script id="remixicon-css" strategy="lazyOnload">{`
          (function () {
            var l = document.createElement('link');
            l.rel = 'stylesheet';
            l.href = '/styles/remixicon-subset.css';
            document.head.appendChild(l);
          })();
        `}</Script>
        {/* ── Google Tag Manager ── */}
        <Script id="gtm-init" strategy="lazyOnload">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>

        {/* ── CTM call tracking (account 186366) — domain-locked, only load on production ── */}
        {CTM_SCRIPTS_ENABLED && (
          <>
            <Script
              id="ctm-tracking"
              src={CTM_TRACKING_SRC}
              strategy="lazyOnload"
              async
              data-cfasync="false"
            />
          </>
        )}
      </head>
      <body className="antialiased">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Layout>{children}</Layout>
        <DeferredAnalyticsWrapper />
        <DeferredAccessiBe />
        <DeferredTalkFurther />
        <CtmRouteReloader />
      </body>
    </html>
  );
}
