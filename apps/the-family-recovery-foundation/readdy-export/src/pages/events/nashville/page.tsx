import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import NashvilleHeroSection from "./components/NashvilleHeroSection";
import NashvilleDetailsSection from "./components/NashvilleDetailsSection";
import NashvilleSponsorshipsSection from "./components/NashvilleSponsorshipsSection";

export default function NashvilleGalaPage() {
  useEffect(() => {
    document.title = "Nashville Gala | The Family Recovery Foundation";
  }, []);

  return (
    <div className="min-h-screen bg-soft-white">
      <Navbar />
      <main>
        <NashvilleHeroSection />
        <NashvilleDetailsSection />
        <NashvilleSponsorshipsSection />
      </main>
      <Footer />
    </div>
  );
}