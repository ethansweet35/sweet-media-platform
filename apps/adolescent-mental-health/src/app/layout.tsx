import type { Metadata } from "next";
import { Heebo, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper } from "@sweetmedia/admin-core";

const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Virtual IOP for Teens | Adolescent Mental Health",
    template: "%s | Adolescent Mental Health",
  },
  description:
    "Adolescent Mental Health provides Virtual Intensive Outpatient Programs (IOP) for teens ages 12–17 struggling with anxiety, depression, trauma, and more. Covered by insurance.",
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
      <body className={`${heebo.variable} ${montserrat.variable} antialiased`}>
        <Layout>{children}</Layout>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
