import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ContinuumSection from "./ContinuumSection";
import ConditionsSection from "./ConditionsSection";
import PacificNorthwestSection from "./PacificNorthwestSection";
import MethodologiesSection from "./MethodologiesSection";
import JourneySection from "./JourneySection";
import FinancialConcierge from "@/components/feature/FinancialConcierge";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ContinuumSection />
      <ConditionsSection />
      <PacificNorthwestSection />
      <MethodologiesSection />
      <JourneySection />
      <FinancialConcierge />
    </>
  );
}
