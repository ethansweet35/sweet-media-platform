import DonateHeroSection from "./components/DonateHeroSection";
import DonateNewsletterSection from "./components/DonateNewsletterSection";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-soft-white">
      <main className="pt-20 md:pt-24 lg:pt-28">
        <DonateHeroSection />
        <DonateNewsletterSection />
      </main>
      </div>
  );
}