import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import BipolarDisorderPage from '@/views/what-we-treat/bipolar-disorder/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Bipolar Disorder Treatment for Women | Inner Peak Colorado',
  description:
    'Inner Peak Colorado provides evidence-based bipolar disorder treatment for women in Colorado. Comprehensive mood stabilization, psychoeducation, and dual-diagnosis care through virtual IOP and outpatient programs.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/what-we-treat/bipolar-disorder', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/what-we-treat/bipolar-disorder`,
      url: `${siteUrl}/what-we-treat/bipolar-disorder`,
      name: 'Bipolar Disorder Treatment for Women | Inner Peak Colorado',
      description:
        'Inner Peak Colorado provides evidence-based bipolar disorder treatment for women in Colorado. Comprehensive mood stabilization, psychoeducation, and dual-diagnosis care through virtual IOP and outpatient programs.',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
          { '@type': 'ListItem', position: 3, name: 'Bipolar Disorder', item: `${siteUrl}/what-we-treat/bipolar-disorder` },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/what-we-treat/bipolar-disorder`,
      name: 'Bipolar Disorder Treatment at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalCondition', name: 'Bipolar I Disorder' },
        { '@type': 'MedicalCondition', name: 'Bipolar II Disorder' },
        { '@type': 'MedicalCondition', name: 'Cyclothymic Disorder' },
        { '@type': 'MedicalCondition', name: 'Bipolar Disorder' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BipolarDisorderPage />
    </>
  );
}
