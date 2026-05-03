import type { Metadata } from 'next';
import HomePage from '@/views/home/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

export const metadata: Metadata = {
  title: "Inner Peak Colorado | Women's Virtual Mental Health & Addiction Treatment",
  description:
    "Inner Peak Colorado offers premium virtual mental health and addiction treatment exclusively for women. Evidence-based, trauma-informed care. PHP, IOP, and outpatient programs in Colorado.",
  openGraph: {
    url: siteUrl,
    title: "Inner Peak Colorado | Women's Virtual Mental Health & Addiction Treatment",
  },
};

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Inner Peak Colorado',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      description: "Inner Peak Colorado offers premium virtual mental health and addiction treatment exclusively for women.",
      telephone: '+17197338556',
      email: 'admissions@innerpeakcolorado.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '685 Citadel Drive East, Suite #598',
        addressLocality: 'Colorado Springs',
        addressRegion: 'CO',
        postalCode: '80909',
        addressCountry: 'US',
      },
      areaServed: { '@type': 'State', name: 'Colorado' },
      medicalSpecialty: ['MentalHealth', 'Psychiatry'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Inner Peak Colorado',
      publisher: { '@id': `${siteUrl}/#organization` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What programs does Inner Peak Colorado offer?',
          acceptedAnswer: { '@type': 'Answer', text: 'Inner Peak Colorado offers Virtual Intensive Outpatient (IOP) and Standard Outpatient (OP) programs exclusively for women in Colorado.' },
        },
        {
          '@type': 'Question',
          name: 'Is Inner Peak Colorado covered by insurance?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. We work with most major insurance providers. Our admissions team verifies benefits before you begin — completely free.' },
        },
        {
          '@type': 'Question',
          name: 'How quickly can I start treatment?',
          acceptedAnswer: { '@type': 'Answer', text: 'Most women begin their first session within 24-72 hours of their initial consultation call.' },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <HomePage />
    </>
  );
}
