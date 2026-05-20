import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PillarsSection from "./components/PillarsSection";
import ServicesSection from "./components/ServicesSection";
import StoriesSection from "./components/StoriesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pure-white">
      <main>
        <HeroSection />
        <AboutSection />
        <PillarsSection />
        <ServicesSection />
        <StoriesSection />
      </main>
      </div>
  );
}