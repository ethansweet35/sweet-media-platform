import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import Script from "next/script";
import SiteHeader from "@/components/feature/SiteHeader";
import AboutHero from "@/components/pages/about/components/AboutHero";
import AboutTeam from "@/components/pages/about/components/AboutTeam";
import AboutMission from "@/components/pages/about/components/AboutMission";
import AboutContact from "@/components/pages/about/components/AboutContact";
import Footer from "@/components/pages/home/components/Footer";

const SITE_URL = "https://sweetmediaservices.com";
const DEFAULT_OG_IMAGE =
  "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/og-default.jpg";

const fallbackMetadata: Metadata = {
  title: "About Sweet Media | Behavioral Health Marketing Experts | Costa Mesa, CA",
  description:
    "Meet the team behind Sweet Media. We're the only digital marketing agency exclusively serving behavioral health treatment centers. Founded by Ethan Sweet in Costa Mesa, CA.",
  keywords:
    "Sweet Media team, behavioral health marketing agency, addiction treatment marketing experts, Sweet Media about",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    title: "About Sweet Media | Behavioral Health Marketing Experts | Costa Mesa, CA",
    description:
      "Meet the team behind Sweet Media. We're the only digital marketing agency exclusively serving behavioral health treatment centers. Founded by Ethan Sweet in Costa Mesa, CA.",
    url: "/about",
    siteName: "Sweet Media",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about", fallbackMetadata);
}

const aboutSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Sweet Media",
    description:
      "Meet the team behind Sweet Media, the only digital marketing agency exclusively serving behavioral health treatment centers.",
    url: `${SITE_URL}/about`,
    dateModified: "2026-04-25",
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Sweet Media",
    description:
      "Meet the team behind Sweet Media, the only digital marketing agency exclusively serving behavioral health treatment centers.",
    url: `${SITE_URL}/about`,
    dateModified: "2026-04-25",
  },
];

export default function Page() {
  return (
    <>
      {aboutSchemas.map((schema, index) => (
        <Script
          key={`about-schema-${index}`}
          id={`about-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="min-h-screen bg-white">
        <SiteHeader ctaLabel="Free Strategy Call" ctaHref="#about-contact" heroTheme="dark" />
        <AboutHero />
        <AboutTeam />
        <AboutMission />
        <AboutContact />
        <Footer />
      </div>
    </>
  );
}
