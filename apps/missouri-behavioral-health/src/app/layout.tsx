import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper, PageEditorProvider } from "@sweetmedia/admin-core";

const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://missouribehavioralhealth.com"),
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
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-body antialiased`}>
        <PageEditorProvider>
          <Layout>{children}</Layout>
        </PageEditorProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
