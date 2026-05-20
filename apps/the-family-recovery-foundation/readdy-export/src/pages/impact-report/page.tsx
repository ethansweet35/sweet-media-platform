import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ImpactHeroSection from "./components/ImpactHeroSection";
import ImpactHeadlineSection from "./components/ImpactHeadlineSection";
import ImpactStatsSection from "./components/ImpactStatsSection";
import ImpactGallerySection from "./components/ImpactGallerySection";
import AdditionalInsightsSection from "./components/AdditionalInsightsSection";

export default function ImpactReport() {
  useEffect(() => {
    document.title = "2025 Impact Report | The Family Recovery Foundation";
  }, []);

  return (
    <div className="min-h-screen bg-pure-white">
      <Navbar />
      <main>
        <ImpactHeroSection />
        <ImpactHeadlineSection />
        <ImpactStatsSection />
        <ImpactGallerySection />
        <AdditionalInsightsSection />
      </main>
      <Footer />
    </div>
  );
}