import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import ImposterSyndromePage from '@/views/what-we-treat/imposter-syndrome/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Imposter Syndrome Treatment for Women | Inner Peak Colorado',
  description:
    'Inner Peak Colorado offers evidence-based imposter syndrome treatment for high-achieving women in Colorado. Build genuine confidence and identity through virtual outpatient care with licensed clinicians.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/what-we-treat/imposter-syndrome', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/what-we-treat/imposter-syndrome`,
      url: `${siteUrl}/what-we-treat/imposter-syndrome`,
      name: 'Imposter Syndrome Treatment for Women | Inner Peak Colorado',
      description:
        'Inner Peak Colorado offers evidence-based imposter syndrome treatment for high-achieving women in Colorado. Build genuine confidence and identity through virtual outpatient care with licensed clinicians.',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
          { '@type': 'ListItem', position: 3, name: 'Imposter Syndrome', item: `${siteUrl}/what-we-treat/imposter-syndrome` },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/what-we-treat/imposter-syndrome`,
      name: 'Imposter Syndrome Treatment at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalCondition', name: 'Imposter Syndrome' },
        { '@type': 'MedicalCondition', name: 'Imposter Phenomenon' },
        { '@type': 'MedicalCondition', name: 'Anxiety' },
        { '@type': 'MedicalCondition', name: 'Perfectionism' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ImposterSyndromePage />
    </>
  );
}
