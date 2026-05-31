import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import { AutoLinkPageShell } from '@sweetmedia/blog-core';
import AdmissionsPage from '@/views/admissions/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: "Admissions | Inner Peak Colorado Women's Mental Health Treatment",
  description:
    "Start treatment at Inner Peak Colorado in 5 simple steps. Free consultation, insurance verification, and first session within 72 hours. Women's virtual mental health and addiction care in Colorado.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/admissions', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/admissions`,
      url: `${siteUrl}/admissions`,
      name: "Admissions | Inner Peak Colorado Women's Treatment",
      isPartOf: { '@type': 'WebSite', url: siteUrl },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Admissions', item: `${siteUrl}/admissions` },
        ],
      },
    },
  ],
};

export default async function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AutoLinkPageShell routePath="/admissions">
        <AdmissionsPage />
      </AutoLinkPageShell>
    </>
  );
}
