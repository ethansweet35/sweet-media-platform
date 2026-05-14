import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import TeamPage from '@/views/team/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Our Team | Inner Peak Colorado',
  description:
    'Meet the compassionate, women-led clinical team behind Inner Peak Colorado — licensed counselors, co-founders, and care professionals dedicated to healing for women.',
  alternates: { canonical: '/team' },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/team', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/team`,
      url: `${siteUrl}/team`,
      name: 'Our Team | Inner Peak Colorado',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
          { '@type': 'ListItem', position: 3, name: 'Our Team', item: `${siteUrl}/team` },
        ],
      },
    },
    {
      '@type': 'MedicalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Inner Peak Colorado',
      url: siteUrl,
      employee: [
        { '@type': 'Person', name: 'Karynne Witkin', jobTitle: 'Chief Executive Officer' },
        { '@type': 'Person', name: 'Stephanie Behrens', jobTitle: 'Clinical Director / Co-Founder' },
        { '@type': 'Person', name: 'Kayli Sullivan-Valdez', jobTitle: 'Administration Officer / Co-Founder' },
        { '@type': 'Person', name: 'Jennifer Ramsden', jobTitle: 'Marketing Director / Co-Founder' },
      ],
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
      <TeamPage />
    </>
  );
}
