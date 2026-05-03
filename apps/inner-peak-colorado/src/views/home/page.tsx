'use client';
import { lazy, Suspense, useEffect } from 'react';
import HeroSection from './components/HeroSection';

const StatsSection = lazy(() => import('./components/StatsSection'));
const PhilosophySection = lazy(() => import('./components/PhilosophySection'));
const WhatWeTreatSection = lazy(() => import('./components/WhatWeTreatSection'));
const PillarsSection = lazy(() => import('./components/PillarsSection'));
const ProgramsSection = lazy(() => import('./components/ProgramsSection'));
const TherapySection = lazy(() => import('./components/TherapySection'));
const AdmissionsPreviewSection = lazy(() => import('./components/LocationsSection'));
const ResourcesSection = lazy(() => import('./components/ResourcesSection'));
const AdmissionsSection = lazy(() => import('./components/AdmissionsSection'));
const InsuranceSection = lazy(() => import('./components/InsuranceSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const CTASection = lazy(() => import('./components/CTASection'));

function SectionFallback() {
  return <div className="w-full py-20" aria-hidden="true" />;
}

export default function HomePage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'MedicalOrganization',
          '@id': `${siteUrl}/#organization`,
          name: 'Inner Peak Colorado',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description: 'Inner Peak Colorado offers premium virtual mental health and addiction treatment exclusively for women. Evidence-based, trauma-informed care rooted in Colorado healing nature.',
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
          sameAs: [],
        },
        {
          '@type': 'WebSite',
          '@id': `${siteUrl}/#website`,
          url: siteUrl,
          name: 'Inner Peak Colorado',
          publisher: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/`,
          url: `${siteUrl}/`,
          name: 'Inner Peak Colorado | Women\'s Virtual Mental Health & Addiction Treatment',
          description: 'Inner Peak Colorado offers premium virtual mental health and addiction treatment exclusively for women. Evidence-based, trauma-informed care. PHP, IOP, and outpatient programs in Colorado.',
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` }],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What programs does Inner Peak Colorado offer?',
              acceptedAnswer: { '@type': 'Answer', text: 'Inner Peak Colorado offers Virtual Intensive Outpatient (IOP) and Standard Outpatient (OP) programs exclusively for women in Colorado, focusing on mental health and addiction treatment.' },
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
    const el = document.getElementById('schema-home');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-home';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Inner Peak Colorado | Women\'s Virtual Mental Health & Addiction Treatment';
    return () => { const el2 = document.getElementById('schema-home'); if (el2) el2.remove(); };
  }, []);

  return (
    <main>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <StatsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PhilosophySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhatWeTreatSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PillarsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProgramsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TherapySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AdmissionsPreviewSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ResourcesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AdmissionsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <InsuranceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CTASection />
      </Suspense>
    </main>
  );
}
