import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import GalaHeroSection from "./components/GalaHeroSection";
import GalaDetailsSection from "./components/GalaDetailsSection";
import SponsorshipsSection from "./components/SponsorshipsSection";
import GalaScheduleSection from "./components/GalaScheduleSection";

export default function EventsPage() {
  useEffect(() => {
    document.title = "Events | The Family Recovery Foundation";
  }, []);

  return (
    <div className="min-h-screen bg-soft-white">
      <Navbar />
      <main>
        <GalaHeroSection />
        <GalaDetailsSection />
        <GalaScheduleSection />
        <SponsorshipsSection />
      </main>
      <Footer />
    </div>
  );
}