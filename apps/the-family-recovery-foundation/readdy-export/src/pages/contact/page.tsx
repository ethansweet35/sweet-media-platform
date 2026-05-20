import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import ContactHeroSection from "./components/ContactHeroSection";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="h-20 md:h-24 lg:h-28" />
        <ContactHeroSection />
      </main>
      <Footer />
    </>
  );
}