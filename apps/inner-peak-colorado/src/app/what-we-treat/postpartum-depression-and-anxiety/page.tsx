import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import PostpartumDepressionAndAnxietyPage from '@/views/what-we-treat/postpartum-depression-and-anxiety/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Postpartum Depression & Anxiety Treatment for Women | Inner Peak Colorado',
  description:
    'Inner Peak Colorado provides specialized postpartum depression and anxiety treatment for new mothers in Colorado. Evidence-based virtual IOP and outpatient care from perinatal-trained clinicians.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/what-we-treat/postpartum-depression-and-anxiety', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/what-we-treat/postpartum-depression-and-anxiety`,
      url: `${siteUrl}/what-we-treat/postpartum-depression-and-anxiety`,
      name: 'Postpartum Depression & Anxiety Treatment for Women | Inner Peak Colorado',
      description:
        'Inner Peak Colorado provides specialized postpartum depression and anxiety treatment for new mothers in Colorado. Evidence-based virtual IOP and outpatient care from perinatal-trained clinicians.',
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Postpartum Depression & Anxiety',
            item: `${siteUrl}/what-we-treat/postpartum-depression-and-anxiety`,
          },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/what-we-treat/postpartum-depression-and-anxiety`,
      name: 'Postpartum Depression and Anxiety Treatment at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalCondition', name: 'Postpartum Depression' },
        { '@type': 'MedicalCondition', name: 'Postpartum Anxiety' },
        { '@type': 'MedicalCondition', name: 'Perinatal OCD' },
        { '@type': 'MedicalCondition', name: 'Birth Trauma' },
        { '@type': 'MedicalCondition', name: 'Perinatal Mental Health' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PostpartumDepressionAndAnxietyPage />
    </>
  );
}
