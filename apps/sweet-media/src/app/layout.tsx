import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Script from "next/script";
import { AnalyticsWrapper } from "@sweetmedia/admin-core", PageEditorProvider };
import "./globals.css";

const GA_MEASUREMENT_ID = "G-PRMFZ8JSHE";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

/** Tab / PWA icons: RealFaviconGenerator assets in `src/app/` (favicon.ico, icon.svg, icon.png, apple-icon.png) + `public/` for manifest. */

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Sweet Media | Behavioral Health Digital Marketing Agency",
    template: "%s | Sweet Media",
  },
  description:
    "Sweet Media is a boutique digital marketing agency exclusively serving behavioral health treatment centers. SEO, Google Ads, Meta Ads, and website development for detox, residential, and IOP programs.",
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
          rel="stylesheet"
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
      <body className="min-h-full flex flex-col">
        <PageEditorProvider>
          {children}
        <AnalyticsWrapper />
        </PageEditorProvider>
      </body>
    </html>
  );
}
