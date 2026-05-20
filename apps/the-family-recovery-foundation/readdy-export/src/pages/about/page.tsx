import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import AboutHeroSection from "./components/AboutHeroSection";
import MissionBannerSection from "./components/MissionBannerSection";
import MeetOurPeopleSection from "./components/MeetOurPeopleSection";
import BoardSection from "./components/BoardSection";
import StaffSection from "./components/StaffSection";
import PartnershipSection from "./components/PartnershipSection";
import NewsletterSection from "./components/NewsletterSection";

export default function About() {
  useEffect(() => {
    document.title = "About The Family Recovery Foundation | TFRF";
  }, []);

  return (
    <div className="min-h-screen bg-pure-white">
      <Navbar />
      <main>
        <AboutHeroSection />
        <MissionBannerSection />
        <MeetOurPeopleSection />
        <BoardSection />
        <StaffSection />
        <PartnershipSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}