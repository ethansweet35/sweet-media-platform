import type { Metadata } from 'next';
import ContactPage from '@/views/contact/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

export const metadata: Metadata = {
  title: 'Contact Inner Peak Colorado | Free Confidential Consultation',
  description:
    'Contact Inner Peak Colorado for a free, confidential consultation. Our compassionate intake team is available 24/7. Call 719-733-8556 or send a message today.',
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      url: `${siteUrl}/contact`,
      name: 'Contact Inner Peak Colorado',
      description: 'Reach out for a free, confidential consultation with our intake team, available 24/7.',
    },
    {
      '@type': 'LocalBusiness',
      name: 'Inner Peak Colorado',
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
      <ContactPage />
    </>
  );
}
