import SiteHeader from "@/components/feature/SiteHeader";
import Seo, { buildAboutPageSchema, buildWebPageSchema, buildBreadcrumbSchema, DEFAULT_OG_IMAGE } from "@/components/feature/Seo";
import AboutHero from "@/components/pages/about/components/AboutHero";
import AboutTeam from "@/components/pages/about/components/AboutTeam";
import AboutMission from "@/components/pages/about/components/AboutMission";
import AboutContact from "@/components/pages/about/components/AboutContact";
import Footer from "@/components/pages/home/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Sweet Media | Behavioral Health Marketing Experts | Costa Mesa, CA"
        description="Meet the team behind Sweet Media. We're the only digital marketing agency exclusively serving behavioral health treatment centers. Founded by Ethan Sweet in Costa Mesa, CA."
        keywords="Sweet Media team, behavioral health marketing agency, addiction treatment marketing experts, Sweet Media about"
        canonical="/about"
        ogType="website"
        ogImage={DEFAULT_OG_IMAGE}
        lastModified="2026-04-25"
        schema={[
          buildWebPageSchema("/about", "About Sweet Media", "Meet the team behind Sweet Media, the only digital marketing agency exclusively serving behavioral health treatment centers.", "2026-04-25"),
          buildAboutPageSchema("/about", "About Sweet Media", "Meet the team behind Sweet Media, the only digital marketing agency exclusively serving behavioral health treatment centers.", "2026-04-25"),
          buildBreadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "About Sweet Media", url: "/about" },
          ]),
        ]}
      />
      <div className="min-h-screen bg-white">
        <SiteHeader ctaLabel="Free Strategy Call" ctaHref="#about-contact" heroTheme="dark" />
        <AboutHero />
        <AboutTeam />
        <AboutMission />
        <AboutContact />
        <Footer />
      </div>
    </>
  );
}
