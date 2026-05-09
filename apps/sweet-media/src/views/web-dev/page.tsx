import SiteHeader from "@/components/feature/SiteHeader";
import WebDevHero from "@/components/pages/web-dev/components/WebDevHero";
import WebCustomSection from "@/components/pages/web-dev/components/WebCustomSection";
import WebLandingSection from "@/components/pages/web-dev/components/WebLandingSection";
import WebCroSection from "@/components/pages/web-dev/components/WebCroSection";
import WebProcess from "@/components/pages/web-dev/components/WebProcess";
import WebCaseStudies from "@/components/pages/web-dev/components/WebCaseStudies";
import WebFaq from "@/components/pages/web-dev/components/WebFaq";
import WebContact from "@/components/pages/web-dev/components/WebContact";
import BlogLinksSection from "@/components/feature/BlogLinksSection";
import Footer from "@/components/pages/home/components/Footer";

export default function WebDevPage() {
  return (
    <div className="min-h-screen bg-white">
        <SiteHeader ctaLabel="Free Site Audit" ctaHref="#web-contact" heroTheme="dark" />
        <WebDevHero />
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><WebCustomSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><WebLandingSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}><WebCroSection /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><WebProcess /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}><WebCaseStudies /></div>
        <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}><WebFaq /></div>
        <BlogLinksSection
          title="Web Development Resources"
          subtitle="Guides to help you build high-converting, HIPAA-compliant websites that turn visitors into patient admissions."
          links={[
            { slug: "healthcare-website-design", title: "Healthcare Website Design: How to Build a Site That Converts Visitors Into Patients", category: "Web Design" },
            { slug: "addiction-treatment-website-design", title: "Addiction Treatment Website Design: How to Build Trust and Drive Qualified Admissions", category: "Treatment Centers" },
            { slug: "mental-health-website-design", title: "Mental Health Website Design: How to Build a Site That Feels Safe, Modern, and Trustworthy", category: "Mental Health" },
            { slug: "medical-website-development", title: "Medical Website Development: What Healthcare Providers Need From a Modern Website", category: "Development" },
            { slug: "hipaa-compliant-website", title: "HIPAA Compliant Website: What Healthcare Providers Should Know Before Rebuilding", category: "Compliance" },
            { slug: "healthcare-conversion-rate-optimization", title: "Healthcare Conversion Rate Optimization: How to Turn More Website Traffic Into Patient Leads", category: "CRO" },
          ]}
        />
        <WebContact />
      <Footer />
    </div>
  );
}
