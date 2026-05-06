import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import VirtualIopPage from '@/views/levels-of-care/virtual-iop/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Virtual IOP for Women | Intensive Outpatient Program | Inner Peak Colorado',
  description:
    'Inner Peak Colorado offers a virtual Intensive Outpatient Program (IOP) for women in Colorado — 3 days/week, evidence-based, women-only group and individual therapy from home.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/levels-of-care/virtual-iop', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/levels-of-care/virtual-iop`,
      url: `${siteUrl}/levels-of-care/virtual-iop`,
      name: 'Virtual IOP for Women | Intensive Outpatient Program | Inner Peak Colorado',
      description:
        'Inner Peak Colorado offers a virtual Intensive Outpatient Program (IOP) for women in Colorado — 3 days/week, evidence-based, women-only group and individual therapy from home.',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Virtual Outpatient', item: `${siteUrl}/levels-of-care` },
          { '@type': 'ListItem', position: 3, name: 'Virtual IOP', item: `${siteUrl}/levels-of-care/virtual-iop` },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/levels-of-care/virtual-iop`,
      name: 'Virtual Intensive Outpatient Program at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalTherapy', name: 'Intensive Outpatient Program (IOP)' },
        { '@type': 'MedicalTherapy', name: 'Virtual Mental Health Treatment' },
        { '@type': 'MedicalTherapy', name: 'Group Therapy' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <VirtualIopPage />
    </>
  );
}
