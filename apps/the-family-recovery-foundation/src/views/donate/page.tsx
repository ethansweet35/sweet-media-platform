import DonateHeroSection from "./components/DonateHeroSection";
import DonateNewsletterSection from "./components/DonateNewsletterSection";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-soft-white">
      <main>
        <DonateHeroSection />
        <DonateNewsletterSection />
      </main>
      </div>
  );
}