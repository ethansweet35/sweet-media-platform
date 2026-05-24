import type { Metadata } from "next";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper } from "@sweetmedia/admin-core", PageEditorProvider };

const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  applicationName: "Simple Health",
  title: {
    default: "Simple Health | Accessible and Affordable Telehealth",
    template: "%s | Simple Health",
  },
  description:
    "Simple Health offers accessible, affordable telehealth covering weight loss, peptides, hair restoration, mental health, and longevity care — delivered to your door.",
  appleWebApp: {
    capable: true,
    title: "Simple Health",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifText.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href={REMIXICON_CSS}
          crossOrigin="anonymous"
        />
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
          <link
            rel="stylesheet"
            href={REMIXICON_CSS}
            crossOrigin="anonymous"
          />
        </noscript>
      </head>
      <body className="min-h-full">
        <PageEditorProvider>
          <Layout>{children}</Layout>
        <AnalyticsWrapper />
        </PageEditorProvider>
      </body>
    </html>
  );
}
