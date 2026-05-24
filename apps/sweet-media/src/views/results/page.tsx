import { EditableText } from "@sweetmedia/admin-core";
import SiteHeader from "@/components/feature/SiteHeader";
import ResultsHero from "@/components/pages/results/components/ResultsHero";
import ResultsTestimonials from "@/components/pages/results/components/ResultsTestimonials";
import ResultsContact from "@/components/pages/results/components/ResultsContact";
import Footer from "@/components/pages/home/components/Footer";
import ResultsStatsSection from "./ResultsStatsSection";
import ResultsCaseStudiesSection from "./ResultsCaseStudiesSection";

const ROUTE = "/results";

export default async function ResultsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Performance Audit" ctaHref="#results-contact" heroTheme="dark" />
      <ResultsHero
        eyebrow={
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.eyebrow"
            defaultValue="Verified Client Results"
            className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium"
          />
        }
        headlineItalic={
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.headlineItalic"
            defaultValue="Numbers That"
            className="block text-[42px] sm:text-[54px] md:text-[68px] font-light italic text-white/70"
          />
        }
        headlineBold={
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.headlineBold"
            defaultValue="Don't Lie."
            className="block text-[42px] sm:text-[54px] md:text-[68px] font-bold text-white"
          />
        }
        body={
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.body"
            defaultValue="Real numbers from real behavioral health clients. No cherry-picked outliers — these are our averages across all active accounts, with full case studies and verified testimonials below."
            as="p"
            className="text-white/55 text-sm md:text-base leading-relaxed font-light"
          />
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
