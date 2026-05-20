import AboutHeroSection from "./components/AboutHeroSection";
import MissionBannerSection from "./components/MissionBannerSection";
import MeetOurPeopleSection from "./components/MeetOurPeopleSection";
import BoardSection from "./components/BoardSection";
import StaffSection from "./components/StaffSection";
import PartnershipSection from "./components/PartnershipSection";
import NewsletterSection from "./components/NewsletterSection";

export default function About() {
  return (
    <div className="min-h-screen bg-pure-white">
      <main>
        <AboutHeroSection />
        <MissionBannerSection />
        <MeetOurPeopleSection />
        <BoardSection />
        <StaffSection />
        <PartnershipSection />
        <NewsletterSection />
      </main>
      </div>
  );
}