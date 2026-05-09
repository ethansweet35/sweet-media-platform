import SiteHeader from "@/components/feature/SiteHeader";
import ResultsHero from "@/components/pages/results/components/ResultsHero";
import ResultsStats from "@/components/pages/results/components/ResultsStats";
import ResultsCaseStudies from "@/components/pages/results/components/ResultsCaseStudies";
import ResultsTestimonials from "@/components/pages/results/components/ResultsTestimonials";
import ResultsContact from "@/components/pages/results/components/ResultsContact";
import Footer from "@/components/pages/home/components/Footer";

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Performance Audit" ctaHref="#results-contact" heroTheme="dark" />
      <ResultsHero />
      <ResultsStats />
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 1200px" }}><ResultsCaseStudies /></div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}><ResultsTestimonials /></div>
      <ResultsContact />
      <Footer />
    </div>
  );
}
