import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import PillarsSection from "./components/PillarsSection";
import ServicesSection from "./components/ServicesSection";
import StoriesSection from "./components/StoriesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-pure-white">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PillarsSection />
        <ServicesSection />
        <StoriesSection />
      </main>
      <Footer />
    </div>
  );
}