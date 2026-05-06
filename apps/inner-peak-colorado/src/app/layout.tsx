import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

/** Bump when replacing `public/favicon.png` so browsers fetch the new asset (tab icons cache aggressively). */
const FAVICON_URL = "/favicon.png?v=20260506";

export const metadata: Metadata = {
  title: "Inner Peak Colorado | Women's Virtual Mental Health & Addiction Treatment",
  description:
    "Inner Peak Colorado offers premium virtual mental health and addiction treatment exclusively for women. Evidence-based, trauma-informed care rooted in Colorado healing nature.",
  icons: {
    icon: FAVICON_URL,
    shortcut: FAVICON_URL,
    apple: FAVICON_URL,
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
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
          crossOrigin="anonymous"
        />
        <Script id="load-remixicon-styles" strategy="afterInteractive">{`
          (function() {
            var cssHref = "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";
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
            href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
            crossOrigin="anonymous"
          />
        </noscript>
      </head>
      <body className="min-h-full">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
