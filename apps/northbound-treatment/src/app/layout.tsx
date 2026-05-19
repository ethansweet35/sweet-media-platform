import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper } from "@sweetmedia/admin-core";
import { CTM_FORMREACTOR_SRC, CTM_TRACKING_SRC } from "@/lib/ctm";
import CtmRouteReloader from "@/components/feature/CtmRouteReloader";

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
          crossOrigin="anonymous"
        />

        {/* ── Google Tag Manager ── */}
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>

        {/* ── CTM call tracking (account 186366) ── */}
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

        {/* ── TalkFurther + ACSB — domain-locked, only load on production ── */}
        {process.env.NODE_ENV === "production" && (
          <>
            <Script id="talkfurther" strategy="afterInteractive">{`
              (function () {
                var a = document.createElement('script');
                var b = document.getElementsByTagName('script')[0];
                a.type = 'text/javascript';
                a.src = 'https://js.talkfurther.com/talkfurther_init.min.js';
                a.async = true;
                b.parentNode.insertBefore(a, b);
              })();
            `}</Script>
            <Script id="acsb-init" strategy="afterInteractive">{`
              (function () {
                var s = document.createElement('script');
                s.src = 'https://acsbapp.com/apps/app/dist/js/app.js';
                s.async = true;
                s.onload = function () {
                  acsbJS.init({
                    statementLink: '', footerHtml: '', hideMobile: false, hideTrigger: false,
                    disableBgProcess: false, language: 'en', position: 'right',
                    leadColor: '#146FF8', triggerColor: '#146FF8', triggerRadius: '50%',
                    triggerPositionX: 'right', triggerPositionY: 'bottom',
                    triggerIcon: 'people', triggerSize: 'bottom',
                    triggerOffsetX: 20, triggerOffsetY: 20,
                    mobile: { triggerSize: 'small', triggerPositionX: 'right', triggerPositionY: 'bottom',
                              triggerOffsetX: 10, triggerOffsetY: 10, triggerRadius: '50%' },
                  });
                };
                (document.querySelector('head') || document.body).appendChild(s);
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
        <Layout>{children}</Layout>
        <AnalyticsWrapper />
        <CtmRouteReloader />
      </body>
    </html>
  );
}
