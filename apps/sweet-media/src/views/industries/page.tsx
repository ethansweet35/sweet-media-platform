import SiteHeader from "@/components/feature/SiteHeader";
import IndustriesHero from "@/components/pages/industries/components/IndustriesHero";
import IndustriesDetail from "@/components/pages/industries/components/IndustriesDetail";
import IndustriesFaq from "@/components/pages/industries/components/IndustriesFaq";
import IndustriesContact from "@/components/pages/industries/components/IndustriesContact";
import Footer from "@/components/pages/home/components/Footer";

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Strategy Call" ctaHref="#industries-contact" heroTheme="dark" />
      <IndustriesHero />
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 4000px" }}><IndustriesDetail /></div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}><IndustriesFaq /></div>
      <IndustriesContact />
      <Footer />
    </div>
  );
}
