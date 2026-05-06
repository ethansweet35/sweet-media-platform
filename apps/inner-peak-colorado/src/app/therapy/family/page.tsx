import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import FamilyTherapyPage from '@/views/therapy/family/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Family Therapy | Healing Relationships Through Treatment | Inner Peak Colorado',
  description:
    'Virtual family therapy for women in Colorado-based treatment — guided sessions to repair relationships, improve communication, and help loved ones become genuine allies in recovery.',
  openGraph: {
    title: 'Family Therapy | Inner Peak Colorado',
    description:
      'Family therapy at Inner Peak Colorado helps repair relationships, improve communication, and turn loved ones into allies in recovery. Fully virtual, coordinated with your individual care.',
    url: `${siteUrl}/therapy/family`,
    images: [
      {
        url: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_fam_hero01.jpg',
        width: 1200,
        height: 800,
        alt: 'Mother and adult daughter in a warm Colorado home setting, representing family healing through therapy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Therapy | Inner Peak Colorado',
    description:
      'Fully virtual family therapy for women in Colorado — repairing relationships and helping loved ones support recovery.',
    images: ['https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_fam_hero01.jpg'],
  },
  alternates: {
    canonical: `${siteUrl}/therapy/family`,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/therapy/family', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  url: `${siteUrl}/therapy/family`,
  name: 'Family Therapy | Inner Peak Colorado',
  description:
    'Virtual family therapy in Colorado. Repair relationships, improve communication, and help loved ones support recovery — coordinated with individual treatment.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Therapy', item: `${siteUrl}/therapy` },
      { '@type': 'ListItem', position: 3, name: 'Family Therapy', item: `${siteUrl}/therapy/family` },
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
      <FamilyTherapyPage />
    </>
  );
}
