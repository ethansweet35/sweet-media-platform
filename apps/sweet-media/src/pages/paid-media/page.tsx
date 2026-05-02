import SiteHeader from "@/components/feature/SiteHeader";
import PaidMediaHero from "@/components/pages/paid-media/components/PaidMediaHero";
import PaidMediaServicesDivider from "@/components/pages/paid-media/components/PaidMediaServicesDivider";
import PaidGoogleSection from "@/components/pages/paid-media/components/PaidGoogleSection";
import PaidMetaSection from "@/components/pages/paid-media/components/PaidMetaSection";
import PaidTvSection from "@/components/pages/paid-media/components/PaidTvSection";
import PaidProcess from "@/components/pages/paid-media/components/PaidProcess";
import PaidCaseStudies from "@/components/pages/paid-media/components/PaidCaseStudies";
import PaidFaq from "@/components/pages/paid-media/components/PaidFaq";
import PaidContact from "@/components/pages/paid-media/components/PaidContact";
import BlogLinksSection from "@/components/feature/BlogLinksSection";
import Footer from "@/components/pages/home/components/Footer";

export default function PaidMediaPage() {
  return (
    <div className="min-h-screen bg-white">
        <SiteHeader ctaLabel="Free Media Audit" ctaHref="#paid-contact" heroTheme="dark" />
        <PaidMediaHero />
        <PaidMediaServicesDivider />
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><PaidGoogleSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><PaidMetaSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><PaidTvSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><PaidProcess /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}><PaidCaseStudies /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><PaidFaq /></div>
        <BlogLinksSection
          title="Paid Media Resources"
          subtitle="Guides to help you run compliant, high-performing ad campaigns for behavioral health — Google Ads, Meta, and beyond."
          links={[
            { slug: "google-ads-for-healthcare", title: "Google Ads for Healthcare: How to Generate Leads While Managing Compliance and Quality", category: "Google Ads" },
            { slug: "drug-rehab-ppc", title: "Drug Rehab PPC: How to Scale Paid Search Without Wasting Budget", category: "PPC Strategy" },
            { slug: "facebook-ads-for-healthcare", title: "Facebook Ads for Healthcare: How to Run Meta Campaigns With Trust and Compliance in Mind", category: "Meta Ads" },
            { slug: "healthcare-ppc-agency", title: "Healthcare PPC Agency: How to Build Paid Search Campaigns That Generate Better Patient Leads", category: "PPC Agency" },
            { slug: "google-ads-healthcare-and-medicines-policy", title: "Google Ads Healthcare and Medicines Policy: What Healthcare Advertisers Need to Know", category: "Compliance" },
            { slug: "how-much-ad-spend-does-a-rehab-center-need-to-see-results", title: "How Much Ad Spend Does a Rehab Center Need to See Results?", category: "Budgeting" },
          ]}
        />
        <PaidContact />
      <Footer />
    </div>
  );
}
