import HeroSection from "./components/HeroSection";
import AccreditationsBar from "./components/AccreditationsBar";
import PhilosophySection from "./components/PhilosophySection";
import ConditionsSection from "./components/ConditionsSection";
import ContinuumSection from "./components/ContinuumSection";
import TherapiesSection from "./components/TherapiesSection";
import DaySection from "./components/DaySection";
import EnvironmentSection from "./components/EnvironmentSection";
import CoastSection from "./components/CoastSection";
import AdmissionsSection from "./components/AdmissionsSection";
import CtaBanner from "./components/CtaBanner";
import InsuranceSection from "./components/InsuranceSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AccreditationsBar />
      <PhilosophySection />
      <ConditionsSection />
      <ContinuumSection />
      <TherapiesSection />
      <DaySection />
      <EnvironmentSection />
      <CoastSection />
      <AdmissionsSection />
      <CtaBanner />
      <InsuranceSection />
    </main>
  );
}
