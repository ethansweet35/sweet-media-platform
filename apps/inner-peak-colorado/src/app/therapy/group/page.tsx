import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import GroupTherapyPage from '@/views/therapy/group/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Group Therapy for Women | Virtual Women-Only Groups | Inner Peak Colorado',
  description:
    'Women-only virtual group therapy in Colorado — clinician-led process groups, DBT skills, and psychoeducation that turn shared experience into a source of profound healing.',
  openGraph: {
    title: 'Group Therapy for Women | Inner Peak Colorado',
    description:
      'Virtual women-only group therapy in Colorado. Process groups, DBT skills, and psychoeducation with 4–8 women per cohort — fully confidential, deeply connected.',
    url: `${siteUrl}/therapy/group`,
    images: [
      {
        url: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_grp_hero01.jpg',
        width: 1200,
        height: 800,
        alt: 'Woman attending a virtual women-only group therapy session with Colorado mountains visible',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Group Therapy for Women | Inner Peak Colorado',
    description:
      'Virtual women-only group therapy in Colorado — where shared experience becomes a source of strength.',
    images: ['https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/th_grp_hero01.jpg'],
  },
  alternates: {
    canonical: `${siteUrl}/therapy/group`,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/therapy/group', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  url: `${siteUrl}/therapy/group`,
  name: 'Group Therapy for Women | Inner Peak Colorado',
  description:
    'Virtual women-only group therapy in Colorado. Process groups, DBT skills groups, and psychoeducation with small, confidential cohorts.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Therapy', item: `${siteUrl}/therapy` },
      { '@type': 'ListItem', position: 3, name: 'Group Therapy', item: `${siteUrl}/therapy/group` },
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
      <GroupTherapyPage />
    </>
  );
}
