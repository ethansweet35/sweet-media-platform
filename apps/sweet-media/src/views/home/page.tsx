import SiteHeader from "@/components/feature/SiteHeader";
import HomeFaq, { HOME_FAQS } from "@/components/pages/home/components/HomeFaq";
import HeroSection from "@/components/pages/home/components/HeroSection";
import IndustriesSection from "@/components/pages/home/components/IndustriesSection";
import SeoSection from "@/components/pages/home/components/SeoSection";
import PaidMediaSection from "@/components/pages/home/components/PaidMediaSection";
import WebDevSection from "@/components/pages/home/components/WebDevSection";
import SocialMediaSection from "@/components/pages/home/components/SocialMediaSection";
import DifferenceSection from "@/components/pages/home/components/DifferenceSection";
import ResultsSection from "@/components/pages/home/components/ResultsSection";
import GettingStartedSection from "@/components/pages/home/components/GettingStartedSection";
import BlogLinksSection from "@/components/feature/BlogLinksSection";
import Footer from "@/components/pages/home/components/Footer";

export default function Home() {
  return (
    <>
      <main className="w-full min-h-screen bg-white">
        <SiteHeader ctaLabel="Get Started" ctaHref="/#getting-started" heroTheme="dark" />
        <section>
          <HeroSection />
        </section>
        <section>
          <IndustriesSection />
        </section>
        <section>
          <SeoSection />
        </section>
        <section>
          <PaidMediaSection />
        </section>
        <section>
          <WebDevSection />
        </section>
        <section>
          <SocialMediaSection />
        </section>
        <section>
          <DifferenceSection />
        </section>
        <section>
          <ResultsSection />
        </section>
        <section>
          <HomeFaq />
        </section>
        <section>
          <GettingStartedSection />
        </section>
        <section>
          <BlogLinksSection
            title="Latest Insights"
            subtitle="Deep dives into behavioral health marketing — SEO, paid media, web development, and everything that drives admissions."
            links={[
              { slug: "healthcare-seo", title: "Healthcare SEO: How to Rank Higher and Turn Organic Traffic Into Patient Leads", category: "SEO" },
              { slug: "google-ads-for-healthcare", title: "Google Ads for Healthcare: How to Generate Leads While Managing Compliance", category: "Paid Media" },
              { slug: "healthcare-website-design", title: "Healthcare Website Design: How to Build a Site That Converts Visitors Into Patients", category: "Web Development" },
              { slug: "healthcare-social-media-marketing", title: "Healthcare Social Media Marketing: How to Build Trust, Education, and Patient Demand", category: "Social Media" },
              { slug: "local-seo-for-rehab-centers", title: "Local SEO for Rehab Centers: How to Rank in Your Market and Expand Into New Locations", category: "SEO" },
              { slug: "drug-rehab-ppc", title: "Drug Rehab PPC: How to Scale Paid Search Without Wasting Budget", category: "Paid Media" },
            ]}
          />
        </section>
        <Footer />
      </main>
    </>
  );
}
