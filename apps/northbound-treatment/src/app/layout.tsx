import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper } from "@sweetmedia/admin-core";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Northbound Treatment | Addiction Treatment Center in Orange County",
    template: "%s | Northbound Treatment",
  },
  description:
    "Northbound Treatment Services has provided lifesaving, evidence-based addiction and mental-health treatment for more than 30 years. Drug & alcohol detox, residential, PHP, IOP, and aftercare across Southern California and the Pacific Northwest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${dmSans.variable} ${playfair.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <Layout>{children}</Layout>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
