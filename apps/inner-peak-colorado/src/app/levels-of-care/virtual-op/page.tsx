import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import VirtualOpPage from '@/views/levels-of-care/virtual-op/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Virtual Outpatient Therapy for Women | OP Program | Inner Peak Colorado',
  description:
    'Inner Peak Colorado offers virtual standard outpatient therapy for women in Colorado — flexible 1–2 sessions per week, fully virtual, with individual therapy, group access, and psychiatric support.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/levels-of-care/virtual-op', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/levels-of-care/virtual-op`,
      url: `${siteUrl}/levels-of-care/virtual-op`,
      name: 'Virtual Outpatient Therapy for Women | OP Program | Inner Peak Colorado',
      description:
        'Inner Peak Colorado offers virtual standard outpatient therapy for women in Colorado — flexible 1–2 sessions per week, fully virtual, with individual therapy, group access, and psychiatric support.',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Virtual Outpatient', item: `${siteUrl}/levels-of-care` },
          { '@type': 'ListItem', position: 3, name: 'Virtual OP', item: `${siteUrl}/levels-of-care/virtual-op` },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/levels-of-care/virtual-op`,
      name: 'Virtual Standard Outpatient Program at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalTherapy', name: 'Standard Outpatient Program (OP)' },
        { '@type': 'MedicalTherapy', name: 'Virtual Mental Health Treatment' },
        { '@type': 'MedicalTherapy', name: 'Individual Therapy' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VirtualOpPage />
    </>
  );
}
