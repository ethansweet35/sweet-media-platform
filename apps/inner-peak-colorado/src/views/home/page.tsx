import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import PhilosophySection from './components/PhilosophySection';
import WhatWeTreatSection from './components/WhatWeTreatSection';
import PillarsSection from './components/PillarsSection';
import ProgramsSection from './components/ProgramsSection';
import TherapySection from './components/TherapySection';
import AdmissionsPreviewSection from './components/LocationsSection';
import ResourcesSection from './components/ResourcesSection';
import AdmissionsSection from './components/AdmissionsSection';
import InsuranceSection from './components/InsuranceSection';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <PhilosophySection />
      <WhatWeTreatSection />
      <PillarsSection />
      <ProgramsSection />
      <TherapySection />
      <AdmissionsPreviewSection />
      <ResourcesSection />
      <AdmissionsSection />
      <InsuranceSection />
      <ContactSection />
      <CTASection />
    </main>
  );
}
