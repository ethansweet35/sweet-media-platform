import type { Metadata } from 'next';
import WhatWeTreatPage from '@/views/what-we-treat/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

export const metadata: Metadata = {
  title: "What We Treat | Women's Mental Health & Addiction | Inner Peak Colorado",
  description:
    "Inner Peak Colorado treats depression, anxiety, trauma, PTSD, addiction, dual diagnosis, and more — exclusively for women through virtual outpatient care in Colorado.",
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: `${siteUrl}/what-we-treat`,
  name: "What We Treat | Women's Mental Health & Addiction | Inner Peak Colorado",
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WhatWeTreatPage />
    </>
  );
}
