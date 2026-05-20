import NashvilleHeroSection from "./components/NashvilleHeroSection";
import NashvilleDetailsSection from "./components/NashvilleDetailsSection";
import NashvilleSponsorshipsSection from "./components/NashvilleSponsorshipsSection";

export default function NashvilleGalaPage() {
  return (
    <div className="min-h-screen bg-soft-white">
      <main>
        <NashvilleHeroSection />
        <NashvilleDetailsSection />
        <NashvilleSponsorshipsSection />
      </main>
      </div>
  );
}