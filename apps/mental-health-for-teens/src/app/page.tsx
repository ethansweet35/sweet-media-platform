import type { Metadata } from 'next';
import HeroSection from '@/views/home/components/HeroSection';
import AboutSection from '@/views/home/components/AboutSection';
import ServicesSection from '@/views/home/components/ServicesSection';
import WhatWeTreatSection from '@/views/home/components/WhatWeTreatSection';
import OutpatientVsTraditionalSection from '@/views/home/components/OutpatientVsTraditionalSection';
import ResourcesForParentsSection from '@/views/home/components/ResourcesForParentsSection';
import TestimonialsSection from '@/views/home/components/TestimonialsSection';
import InsuranceSection from '@/views/home/components/InsuranceSection';
import AdmissionsSection from '@/views/home/components/AdmissionsSection';

export const metadata: Metadata = {
  title: 'Mental Health For Teens | Teen Therapy & Outpatient Programs in Colorado',
  description:
    'Specialized mental health treatment for teenagers ages 12–18. Individual therapy, group therapy, IOP, and family therapy in Colorado. Free consultation available.',
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhatWeTreatSection />
      <OutpatientVsTraditionalSection />
      <ResourcesForParentsSection />
      <TestimonialsSection />
      <InsuranceSection />
      <AdmissionsSection />
    </main>
  );
}
