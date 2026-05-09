import SiteHeader from "@/components/feature/SiteHeader";
import SocialMediaHero from "@/components/pages/social-media/components/SocialMediaHero";
import SocialContentSection from "@/components/pages/social-media/components/SocialContentSection";
import SocialCommunitySection from "@/components/pages/social-media/components/SocialCommunitySection";
import SocialReputationSection from "@/components/pages/social-media/components/SocialReputationSection";
import SocialProcess from "@/components/pages/social-media/components/SocialProcess";
import SocialCaseStudies from "@/components/pages/social-media/components/SocialCaseStudies";
import SocialFaq from "@/components/pages/social-media/components/SocialFaq";
import SocialContact from "@/components/pages/social-media/components/SocialContact";
import BlogLinksSection from "@/components/feature/BlogLinksSection";
import Footer from "@/components/pages/home/components/Footer";

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-white">
        <SiteHeader ctaLabel="Free Social Audit" ctaHref="#social-contact" heroTheme="dark" />
        <SocialMediaHero />
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><SocialContentSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><SocialCommunitySection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><SocialReputationSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><SocialProcess /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}><SocialCaseStudies /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><SocialFaq /></div>
        <BlogLinksSection
          title="Social Media Resources"
          subtitle="Guides to help you build trust, engage families, and grow your behavioral health brand through social media."
          links={[
            { slug: "healthcare-social-media-marketing", title: "Healthcare Social Media Marketing: How to Build Trust, Education, and Patient Demand", category: "Social Strategy" },
            { slug: "social-media-marketing-for-addiction-treatment-centers", title: "Social Media Marketing for Addiction Treatment Centers: How to Educate Families and Build Trust", category: "Treatment Centers" },
            { slug: "social-media-marketing-behavioral-health-human-compliant-content", title: "Social Media Marketing for Behavioral Health: How to Create Content That Feels Human and Compliant", category: "Compliance" },
            { slug: "healthcare-reputation-management", title: "Healthcare Reputation Management: How Reviews Impact Patient Trust and Growth", category: "Reputation" },
            { slug: "why-review-strategy-matters-behavioral-health-marketing", title: "Why Review Strategy Matters for Behavioral Health Marketing", category: "Reviews" },
            { slug: "healthcare-content-marketing", title: "Healthcare Content Marketing: How to Build Patient Trust and Organic Demand", category: "Content" },
          ]}
        />
        <SocialContact />
      <Footer />
    </div>
  );
}
