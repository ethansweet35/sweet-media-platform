import SiteHeader from "@/components/feature/SiteHeader";
import ResultsHero from "@/components/pages/results/components/ResultsHero";
import ResultsTestimonials from "@/components/pages/results/components/ResultsTestimonials";
import ResultsContact from "@/components/pages/results/components/ResultsContact";
import Footer from "@/components/pages/home/components/Footer";
import ResultsStatsSection from "./ResultsStatsSection";
import ResultsCaseStudiesSection from "./ResultsCaseStudiesSection";

const ROUTE = "/results";

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Performance Audit" ctaHref="#results-contact" heroTheme="dark" />
      <ResultsHero
        eyebrow={
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium">Verified Client Results</span>
        }
        headlineItalic={
          <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-light italic text-white/70">Numbers That</span>
        }
        headlineBold={
          <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-bold text-white">Don't Lie.</span>
        }
        body={
          <p className="text-white/55 text-sm md:text-base leading-relaxed font-light">Real numbers from real behavioral health clients. No cherry-picked outliers — these are our averages across all active accounts, with full case studies and verified testimonials below.</p>
        }
      />
      <ResultsStatsSection />
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 1200px" }}>
        <ResultsCaseStudiesSection />
      </div>
      <div style={{ contentVisibility: "auto", containIntrinsicSize: "0 700px" }}>
        <ResultsTestimonials />
      </div>
      <ResultsContact />
      <Footer />
    </div>
  );
}
