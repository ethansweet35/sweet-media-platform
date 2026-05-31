import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@/styles/remixicon-subset.css";
import Layout from "@/components/feature/Layout";
import { DeferredAnalyticsWrapper, DeferredPageEditorProvider } from "@sweetmedia/admin-core";
import { CTM_FORMREACTOR_SRC, CTM_TRACKING_SRC } from "@/lib/ctm";
import CtmRouteReloader from "@/components/feature/CtmRouteReloader";
import DeferredAccessiBe from "@/components/feature/DeferredAccessiBe";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
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
        <link rel="preconnect" href="https://186366.tctm.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* ── Google Tag Manager ── */}
        <Script id="gtm-init" strategy="lazyOnload">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>

        {/* ── CTM call tracking (account 186366) — domain-locked, only load on production ── */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              id="ctm-tracking"
              src={CTM_TRACKING_SRC}
              strategy="afterInteractive"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...({ fetchpriority: "high" } as any)}
              data-cfasync="false"
            />
            <Script
              id="ctm-formreactor"
              src={CTM_FORMREACTOR_SRC}
              strategy="afterInteractive"
              defer
              async
            />
          </>
        )}

        {/* ── TalkFurther — domain-locked, production only (lazyOnload).
            AccessiBe loads via <DeferredAccessiBe /> after interaction. */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script id="talkfurther" strategy="lazyOnload">{`
              (function () {
                var a = document.createElement('script');
                var b = document.getElementsByTagName('script')[0];
                a.type = 'text/javascript';
                a.src = 'https://js.talkfurther.com/talkfurther_init.min.js';
                a.async = true;
                b.parentNode.insertBefore(a, b);
              })();
            `}</Script>
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
        <DeferredPageEditorProvider>
          <Layout>{children}</Layout>
        </DeferredPageEditorProvider>
        <DeferredAnalyticsWrapper />
        <DeferredAccessiBe />
        <CtmRouteReloader />
      </body>
    </html>
  );
}
