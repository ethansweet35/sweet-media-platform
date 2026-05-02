import type { Metadata } from "next";
import Script from "next/script";
import dynamic from "next/dynamic";
import SiteHeader from "@/components/feature/SiteHeader";
import HeroSection from "@/components/pages/home/components/HeroSection";

const IndustriesSection = dynamic(
  () => import("@/components/pages/home/components/IndustriesSection"),
);

const SeoSection = dynamic(() => import("@/components/pages/home/components/SeoSection"));

const PaidMediaSection = dynamic(
  () => import("@/components/pages/home/components/PaidMediaSection"),
);

const WebDevSection = dynamic(() => import("@/components/pages/home/components/WebDevSection"));

const SocialMediaSection = dynamic(
  () => import("@/components/pages/home/components/SocialMediaSection"),
);

const DifferenceSection = dynamic(
  () => import("@/components/pages/home/components/DifferenceSection"),
);

const ResultsSection = dynamic(() => import("@/components/pages/home/components/ResultsSection"));

const HomeFaq = dynamic(() => import("@/components/pages/home/components/HomeFaq"));

const GettingStartedSection = dynamic(
  () => import("@/components/pages/home/components/GettingStartedSection"),
);

const BlogLinksSection = dynamic(() => import("@/components/feature/BlogLinksSection"));

const Footer = dynamic(() => import("@/components/pages/home/components/Footer"));

const SITE_URL = "https://sweetmediaservices.com";
const DEFAULT_OG_IMAGE =
  "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/og-default.jpg";

export const metadata: Metadata = {
  title: "Sweet Media | Behavioral Health Digital Marketing Agency",
  description:
    "Sweet Media is a boutique digital marketing agency exclusively serving behavioral health treatment centers. SEO, Google Ads, Meta Ads, and website development for detox, residential, and IOP programs.",
  keywords:
    "behavioral health marketing, treatment center marketing, addiction treatment SEO, rehab marketing, digital marketing for treatment centers",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Sweet Media | Behavioral Health Digital Marketing Agency",
    description:
      "Sweet Media is a boutique digital marketing agency exclusively serving behavioral health treatment centers. SEO, Google Ads, Meta Ads, and website development for detox, residential, and IOP programs.",
    url: "/",
    siteName: "Sweet Media",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweet Media | Behavioral Health Digital Marketing Agency",
    description:
      "Sweet Media is a boutique digital marketing agency exclusively serving behavioral health treatment centers. SEO, Google Ads, Meta Ads, and website development for detox, residential, and IOP programs.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const homeSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sweet Media",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Boutique digital marketing agency exclusively serving behavioral health treatment centers.",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sweet Media | Behavioral Health Digital Marketing Agency",
    description:
      "Boutique digital marketing for behavioral health treatment centers.",
    url: SITE_URL,
    dateModified: "2026-04-25",
    publisher: {
      "@type": "Organization",
      name: "Sweet Media",
      url: SITE_URL,
    },
  },
];

export default function Home() {
  return (
    <>
      {homeSchemas.map((schema, index) => (
        <Script
          key={`home-schema-${index}`}
          id={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main className="w-full min-h-screen bg-white">
        <SiteHeader ctaLabel="Get Started" ctaHref="/#getting-started" heroTheme="dark" />
        <section>
          <HeroSection />
        </section>
        <section>
          <IndustriesSection />
        </section>
        <section>
          <SeoSection />
        </section>
        <section>
          <PaidMediaSection />
        </section>
        <section>
          <WebDevSection />
        </section>
        <section>
          <SocialMediaSection />
        </section>
        <section>
          <DifferenceSection />
        </section>
        <section>
          <ResultsSection />
        </section>
        <section>
          <HomeFaq />
        </section>
        <section>
          <GettingStartedSection />
        </section>
        <section>
          <BlogLinksSection
            title="Latest Insights"
            subtitle="Deep dives into behavioral health marketing — SEO, paid media, web development, and everything that drives admissions."
            links={[
              { slug: "healthcare-seo", title: "Healthcare SEO: How to Rank Higher and Turn Organic Traffic Into Patient Leads", category: "SEO" },
              { slug: "google-ads-for-healthcare", title: "Google Ads for Healthcare: How to Generate Leads While Managing Compliance", category: "Paid Media" },
              { slug: "healthcare-website-design", title: "Healthcare Website Design: How to Build a Site That Converts Visitors Into Patients", category: "Web Development" },
              { slug: "healthcare-social-media-marketing", title: "Healthcare Social Media Marketing: How to Build Trust, Education, and Patient Demand", category: "Social Media" },
              { slug: "local-seo-for-rehab-centers", title: "Local SEO for Rehab Centers: How to Rank in Your Market and Expand Into New Locations", category: "SEO" },
              { slug: "drug-rehab-ppc", title: "Drug Rehab PPC: How to Scale Paid Search Without Wasting Budget", category: "Paid Media" },
            ]}
          />
        </section>
        <Footer />
      </main>
    </>
  );
}
