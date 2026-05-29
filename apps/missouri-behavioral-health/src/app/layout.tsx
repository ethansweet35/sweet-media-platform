import type { Metadata } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/feature/Layout";
import { AnalyticsWrapper, PageEditorProvider } from "@sweetmedia/admin-core";
import {
  MBH_HERO_POSTER_URL,
  MBH_HERO_VIDEO_URL,
  MBH_SUPABASE_ORIGIN,
} from "@/lib/heroMedia";

const REMIXICON_CSS =
  "https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css";

/**
 * CallRail dynamic number swap (matches live missouribehavioralhealth.com).
 * Target source number: 417-771-5305. Company id 638776964.
 */
const CALLRAIL_SWAP_SRC =
  "https://cdn.callrail.com/companies/638776964/9e1a91a0c509e24d145d/12/swap.js";

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
        <link rel="preconnect" href="https://cdn.callrail.com" crossOrigin="anonymous" />
        <link rel="preload" as="script" href={CALLRAIL_SWAP_SRC} fetchPriority="high" />
        <link rel="preconnect" href={MBH_SUPABASE_ORIGIN} crossOrigin="anonymous" />
        <link rel="preload" as="image" href={MBH_HERO_POSTER_URL} fetchPriority="high" />
        <link rel="preload" as="video" href={MBH_HERO_VIDEO_URL} type="video/mp4" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href={REMIXICON_CSS} crossOrigin="anonymous" />
        <Script
          id="callrail-swap"
          src={CALLRAIL_SWAP_SRC}
          strategy="afterInteractive"
          async
        />
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
