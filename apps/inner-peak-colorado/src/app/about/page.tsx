import type { Metadata } from 'next';
import AboutPage from '@/views/about/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

export const metadata: Metadata = {
  title: 'About Inner Peak Colorado | Women-Owned Mental Health Treatment',
  description:
    'Learn about Inner Peak Colorado, a women-owned virtual behavioral health program in Colorado. Meet our clinical team and discover our mission to provide compassionate, evidence-based care for women.',
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/about`,
      url: `${siteUrl}/about`,
      name: 'About Inner Peak Colorado | Women-Owned Mental Health Treatment',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AboutPage />
    </>
  );
}
