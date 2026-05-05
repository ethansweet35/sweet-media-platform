import type { Metadata } from 'next';
import EatingDisordersPage from '@/views/what-we-treat/eating-disorders/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

export const metadata: Metadata = {
  title: "Eating Disorder Treatment for Women | Inner Peak Colorado",
  description:
    "Inner Peak Colorado offers compassionate, weight-neutral eating disorder treatment for women in Colorado — including anorexia, bulimia, binge eating disorder, and ARFID. Virtual IOP and outpatient care.",
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/what-we-treat/eating-disorders`,
      url: `${siteUrl}/what-we-treat/eating-disorders`,
      name: "Eating Disorder Treatment for Women | Inner Peak Colorado",
      description:
        "Inner Peak Colorado offers compassionate, weight-neutral eating disorder treatment for women in Colorado — including anorexia, bulimia, binge eating disorder, and ARFID. Virtual IOP and outpatient care.",
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
          { '@type': 'ListItem', position: 3, name: 'Eating Disorders', item: `${siteUrl}/what-we-treat/eating-disorders` },
        ],
      },
    },
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/what-we-treat/eating-disorders`,
      name: 'Eating Disorder Treatment at Inner Peak Colorado',
      about: [
        { '@type': 'MedicalCondition', name: 'Anorexia Nervosa' },
        { '@type': 'MedicalCondition', name: 'Bulimia Nervosa' },
        { '@type': 'MedicalCondition', name: 'Binge Eating Disorder' },
        { '@type': 'MedicalCondition', name: 'ARFID' },
        { '@type': 'MedicalCondition', name: 'Eating Disorders' },
      ],
      audience: { '@type': 'Patient', requiredGender: 'Female' },
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
      <EatingDisordersPage />
    </>
  );
}
