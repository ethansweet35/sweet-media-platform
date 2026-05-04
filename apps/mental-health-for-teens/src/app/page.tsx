import type { Metadata } from "next";
import HomepageView from "@/components/pages/home/HomepageView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mentalhealthforteens.com";

export const metadata: Metadata = {
  title: "Virtual Teen Mental Health Programs in California | Mental Health For Teens",
  description:
    "Mental Health For Teens offers virtual IOP and OP treatment for adolescents ages 12-17, with family-centered support from our San Diego-based clinical team.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mental Health For Teens | Virtual IOP and OP in California",
    description:
      "Warm, clinically grounded virtual teen mental health care for families across California.",
    url: "/",
    siteName: "Mental Health For Teens",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-home.svg",
        width: 1200,
        height: 630,
        alt: "Mental Health For Teens virtual care support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health For Teens | Virtual IOP and OP",
    description: "Compassionate virtual treatment for teens and families across California.",
    images: ["/og-home.svg"],
  },
};

export default function Page() {
  const medicalOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Mental Health For Teens",
    url: siteUrl,
    description:
      "Virtual adolescent mental health treatment serving families across California from San Diego.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: "California",
    medicalSpecialty: "Psychiatry",
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: "Virtual Intensive Outpatient Program (IOP)",
      },
      {
        "@type": "MedicalTherapy",
        name: "Virtual Outpatient Program (OP)",
      },
    ],
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mental Health For Teens",
    url: siteUrl,
    inLanguage: "en-US",
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Mental Health For Teens Homepage",
    url: siteUrl,
    description:
      "Learn how virtual IOP and OP support adolescents ages 12 to 17 and their families across California.",
    isPartOf: {
      "@type": "WebSite",
      url: siteUrl,
      name: "Mental Health For Teens",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who does Mental Health For Teens serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mental Health For Teens provides virtual mental health care for adolescents ages 12 to 17 and their families.",
        },
      },
      {
        "@type": "Question",
        name: "What levels of care are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer Virtual Intensive Outpatient (IOP) and Virtual Outpatient (OP), with recommendations based on each teen's clinical needs.",
        },
      },
      {
        "@type": "Question",
        name: "Where are services available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our San Diego-based team serves families across California through virtual treatment programs.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalOrganizationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomepageView />
    </>
  );
}
