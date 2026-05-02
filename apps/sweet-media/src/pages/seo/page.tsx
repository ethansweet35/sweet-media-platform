import SiteHeader from "@/components/feature/SiteHeader";
import SeoHero from "@/components/pages/seo/components/SeoHero";
import SeoAiSection from "@/components/pages/seo/components/SeoAiSection";
import SeoOrganicSection from "@/components/pages/seo/components/SeoOrganicSection";
import SeoLocalSection from "@/components/pages/seo/components/SeoLocalSection";
import SeoTechnicalSection from "@/components/pages/seo/components/SeoTechnicalSection";
import SeoProcess from "@/components/pages/seo/components/SeoProcess";
import SeoCaseStudies from "@/components/pages/seo/components/SeoCaseStudies";
import SeoFaq from "@/components/pages/seo/components/SeoFaq";
import SeoContact from "@/components/pages/seo/components/SeoContact";
import BlogLinksSection from "@/components/feature/BlogLinksSection";
import Footer from "@/components/pages/home/components/Footer";

export default function SeoPage() {
  return (
    <div className="min-h-screen bg-white">
        <SiteHeader ctaLabel="Free SEO Audit" ctaHref="#seo-contact" heroTheme="dark" />
        <SeoHero />
        <SeoAiSection />
        <div id="seo-organic" style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
          <SeoOrganicSection />
        </div>
        <div id="seo-local" style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
          <SeoLocalSection />
        </div>
        <div id="seo-technical" style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
          <SeoTechnicalSection />
        </div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><SeoProcess /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}><SeoCaseStudies /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><SeoFaq /></div>
        <BlogLinksSection
          title="SEO Resources"
          subtitle="In-depth guides to help your treatment center rank higher, attract more organic traffic, and convert visitors into admissions."
          links={[
            { slug: "healthcare-seo", title: "Healthcare SEO: How to Rank Higher and Turn Organic Traffic Into Patient Leads", category: "SEO Strategy" },
            { slug: "local-seo-for-rehab-centers", title: "Local SEO for Rehab Centers: How to Rank in Your Market and Expand Into New Locations", category: "Local SEO" },
            { slug: "drug-rehab-seo", title: "Drug Rehab SEO: How Addiction Treatment Centers Can Rank and Grow Admissions", category: "Rehab SEO" },
            { slug: "mental-health-seo", title: "Mental Health SEO: How Therapists, Clinics, and Treatment Centers Can Rank Online", category: "Mental Health" },
            { slug: "how-long-does-it-take-for-medical-seo-to-work", title: "How Long Does It Take for Medical SEO to Work? A Realistic Timeline for Healthcare Providers", category: "SEO Timeline" },
            { slug: "ai-for-healthcare-lead-generation-and-seo", title: "AI for Healthcare Lead Generation and SEO: How Providers Can Prepare for AI Search", category: "AI SEO" },
          ]}
        />
        <SeoContact />
      <Footer />
    </div>
  );
}
