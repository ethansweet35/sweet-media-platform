import HeroSection from './components/HeroSection';
import HeroContactForm from './components/HeroContactForm';
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

      {/* Mobile-only: contact form pulled out of hero so it doesn't stretch hero height */}
      <div className="md:hidden bg-[#2C3B2E] px-6 py-10">
        <HeroContactForm />
      </div>

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
