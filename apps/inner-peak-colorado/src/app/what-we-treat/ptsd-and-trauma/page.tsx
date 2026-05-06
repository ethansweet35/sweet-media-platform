import type { Metadata } from 'next';
import PtsdAndTraumaPage from '@/views/what-we-treat/ptsd-and-trauma/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

export const metadata: Metadata = {
  title: 'PTSD & Trauma Treatment for Women | Inner Peak Colorado',
  description:
    'Inner Peak Colorado provides trauma-informed PTSD and complex trauma treatment for women in Colorado. Evidence-based virtual IOP and outpatient care with compassionate clinical support.',
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/what-we-treat/ptsd-and-trauma`,
      url: `${siteUrl}/what-we-treat/ptsd-and-trauma`,
      name: 'PTSD & Trauma Treatment for Women | Inner Peak Colorado',
      description:
        'Inner Peak Colorado provides trauma-informed PTSD and complex trauma treatment for women in Colorado. Evidence-based virtual IOP and outpatient care with compassionate clinical support.',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
          { '@type': 'ListItem', position: 3, name: 'PTSD & Trauma', item: `${siteUrl}/what-we-treat/ptsd-and-trauma` },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/what-we-treat/ptsd-and-trauma`,
      name: 'PTSD and Trauma Treatment at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalCondition', name: 'Post-Traumatic Stress Disorder' },
        { '@type': 'MedicalCondition', name: 'Complex Post-Traumatic Stress Disorder' },
        { '@type': 'MedicalCondition', name: 'Psychological Trauma' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PtsdAndTraumaPage />
    </>
  );
}
