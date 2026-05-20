import PartnershipsHeroSection from "./components/PartnershipsHeroSection";
import PartnersGridSection from "./components/PartnersGridSection";
import ResourcesSection from "./components/ResourcesSection";
import PartnersCTASection from "./components/PartnersCTASection";

export default function Partnerships() {
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