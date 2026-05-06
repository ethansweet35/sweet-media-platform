import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import IndividualTherapyPage from '@/views/therapy/individual/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Individual Therapy for Women | Virtual One-on-One Sessions | Inner Peak Colorado',
  description:
    'Private, licensed individual therapy for women in Colorado — fully virtual, clinically tailored, and rooted in evidence-based modalities including CBT, EMDR, DBT, and somatic work.',
  openGraph: {
    title: 'Individual Therapy for Women | Inner Peak Colorado',
    description:
      'One-on-one virtual therapy for women in Colorado. A private, protected space to do deep personal work with a licensed therapist who knows your full story.',
    url: `${siteUrl}/therapy/individual`,
    images: [
      {
        url: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_ind_hero01.jpg',
        width: 1200,
        height: 800,
        alt: 'Woman in a Colorado home on a virtual individual therapy session',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Individual Therapy for Women | Inner Peak Colorado',
    description:
      'Private, licensed individual therapy — fully virtual, exclusively for women in Colorado.',
    images: ['https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_ind_hero01.jpg'],
  },
  alternates: {
    canonical: `${siteUrl}/therapy/individual`,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/therapy/individual', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  url: `${siteUrl}/therapy/individual`,
  name: 'Individual Therapy for Women | Inner Peak Colorado',
  description:
    'Private, licensed virtual individual therapy for women in Colorado. CBT, EMDR, DBT, ACT, and somatic modalities available.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Therapy', item: `${siteUrl}/therapy` },
      { '@type': 'ListItem', position: 3, name: 'Individual Therapy', item: `${siteUrl}/therapy/individual` },
    ],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <IndividualTherapyPage />
    </>
  );
}
