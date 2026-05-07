import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import CbtPage from '@/views/therapy/cbt/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Cognitive Behavioral Therapy (CBT) for Women | Inner Peak Colorado',
  description:
    'Inner Peak Colorado offers evidence-based CBT for women in Colorado — fully virtual, clinically tailored, and proven effective for anxiety, depression, trauma, and eating disorders.',
  openGraph: {
    title: 'Cognitive Behavioral Therapy (CBT) for Women | Inner Peak Colorado',
    description:
      'Virtual CBT for women in Colorado. Structured, skills-based therapy that targets the thought and behavior patterns keeping you stuck — with a licensed therapist who knows your full picture.',
    url: `${siteUrl}/therapy/cbt`,
    images: [
      {
        url: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_cbt_hero01.jpg',
        width: 1200,
        height: 800,
        alt: 'Woman in a Colorado home having a virtual CBT therapy session',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognitive Behavioral Therapy for Women | Inner Peak Colorado',
    description:
      'Evidence-based CBT — fully virtual, women-only, and clinically grounded in Colorado.',
    images: ['https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_cbt_hero01.jpg'],
  },
  alternates: {
    canonical: `${siteUrl}/therapy/cbt`,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/therapy/cbt', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  url: `${siteUrl}/therapy/cbt`,
  name: 'Cognitive Behavioral Therapy (CBT) for Women | Inner Peak Colorado',
  description:
    'Evidence-based virtual CBT for women in Colorado. Treating anxiety, depression, trauma, and eating disorders with structured cognitive and behavioral techniques.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Therapy', item: `${siteUrl}/therapy` },
      { '@type': 'ListItem', position: 3, name: 'Cognitive Behavioral Therapy', item: `${siteUrl}/therapy/cbt` },
    ],
  },
  about: [
    { '@type': 'MedicalTherapy', name: 'Cognitive Behavioral Therapy' },
    { '@type': 'MedicalTherapy', name: 'Trauma-Focused Cognitive Behavioral Therapy' },
  ],
  audience: { '@type': 'Patient', requiredGender: 'Female' },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CbtPage />
    </>
  );
}
