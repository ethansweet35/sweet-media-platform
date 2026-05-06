import type { Metadata } from 'next';
import { resolveTrackedPageMetadata } from '@sweetmedia/admin-core';
import LevelsOfCarePage from '@/views/levels-of-care/page';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';

const fallbackMetadata: Metadata = {
  title: 'Virtual Outpatient Program | IOP & OP for Women | Inner Peak Colorado',
  description:
    'Inner Peak Colorado offers virtual IOP and standard outpatient programs for women in Colorado. Evidence-based mental health and addiction treatment from the comfort of your home.',
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata('/levels-of-care', fallbackMetadata);
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      url: `${siteUrl}/levels-of-care`,
      name: 'Virtual Outpatient Programs',
      about: [
        { '@type': 'MedicalTherapy', name: 'Intensive Outpatient Program (IOP)' },
        { '@type': 'MedicalTherapy', name: 'Standard Outpatient Program (OP)' },
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
      <LevelsOfCarePage />
    </>
  );
}
