import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import TherapyPage from '@/views/therapy/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Therapy Modalities | EMDR, CBT, DBT & More | Inner Peak Colorado',
  description:
    "Explore the evidence-based therapy modalities offered at Inner Peak Colorado — EMDR, CBT, DBT, trauma-informed care, and more, exclusively for women.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/therapy', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: `${siteUrl}/therapy`,
  name: 'Therapy Modalities | Inner Peak Colorado',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Therapy', item: `${siteUrl}/therapy` },
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
      <TherapyPage />
    </>
  );
}
