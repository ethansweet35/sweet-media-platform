'use client';

import { useEffect } from "react";
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
      <main>
        <GalaHeroSection />
        <GalaDetailsSection />
        <GalaScheduleSection />
        <SponsorshipsSection />
      </main>
      </div>
  );
}