import type { Metadata } from 'next';
import HomePage from '@/views/home/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mentalhealthforteens.com';

export const metadata: Metadata = {
  title: 'Mental Health For Teens | Virtual IOP & Outpatient Care in San Diego',
  description:
    'Mental Health For Teens offers virtual Intensive Outpatient and Outpatient programs for adolescents ages 12–17 throughout California. An effective alternative to traditional therapy for teens struggling with anxiety, depression, trauma, OCD, ADHD, and more.',
  openGraph: {
    title: 'Mental Health For Teens | Virtual IOP & Outpatient Care',
    description:
      'Virtual intensive outpatient care for adolescents — a clinically proven alternative to traditional therapy that provides real structure and real results.',
    url: siteUrl,
    siteName: 'Mental Health For Teens',
    images: [
      {
        url: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/mhft_home_hero01.jpg',
        width: 1200,
        height: 630,
        alt: 'Mental Health For Teens — Virtual IOP in San Diego',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mental Health For Teens',
      description: 'Virtual IOP & Outpatient care for adolescents in California',
    },
    {
      '@type': 'MedicalOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Mental Health For Teens',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description: 'Virtual Intensive Outpatient and Outpatient mental health programs for adolescents ages 12–17 throughout California.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Diego',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      areaServed: {
        '@type': 'State',
        name: 'California',
      },
      medicalSpecialty: 'Psychiatry',
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: 'Mental Health For Teens | Virtual IOP & Outpatient Care in San Diego',
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
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
      <HomePage />
    </>
  );
}
