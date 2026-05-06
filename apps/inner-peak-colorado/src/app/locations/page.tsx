import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import LocationsPage from '@/views/locations/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Locations | Inner Peak Colorado Mental Health Treatment Centers',
  description:
    "Find Inner Peak Colorado's treatment locations in Colorado Springs and Boulder. Virtual care available to all women across Colorado. Evidence-based mental health and addiction treatment.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/locations', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: `${siteUrl}/locations`,
  name: 'Locations | Inner Peak Colorado Mental Health Treatment Centers',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Locations', item: `${siteUrl}/locations` },
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
      <LocationsPage />
    </>
  );
}
