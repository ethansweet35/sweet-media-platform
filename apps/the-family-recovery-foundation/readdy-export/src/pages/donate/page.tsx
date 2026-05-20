import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import DonateHeroSection from "./components/DonateHeroSection";
import DonateNewsletterSection from "./components/DonateNewsletterSection";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-soft-white">
      <Navbar />
      <main className="pt-20 md:pt-24 lg:pt-28">
        <DonateHeroSection />
        <DonateNewsletterSection />
      </main>
      <Footer />
    </div>
  );
}