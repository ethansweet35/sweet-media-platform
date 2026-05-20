'use client';

import { useEffect } from "react";
import PartnershipsHeroSection from "./components/PartnershipsHeroSection";
import PartnersGridSection from "./components/PartnersGridSection";
import ResourcesSection from "./components/ResourcesSection";
import PartnersCTASection from "./components/PartnersCTASection";

export default function Partnerships() {
  useEffect(() => {
    document.title = "Partnerships & Resources | The Family Recovery Foundation";
  }, []);

  return (
    <div className="min-h-screen bg-pure-white">
      <main>
        <PartnershipsHeroSection />
        <PartnersGridSection />
        <ResourcesSection />
        <PartnersCTASection />
      </main>
      </div>
  );
}