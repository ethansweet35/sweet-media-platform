import { EditableText } from "@sweetmedia/admin-core";
import SiteHeader from "@/components/feature/SiteHeader";
import ResultsCaseStudies from "@/components/pages/results/components/ResultsCaseStudies";
import Footer from "@/components/pages/home/components/Footer";

const ROUTE = "/case-studies";

export default function CaseStudiesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Strategy Call" ctaHref="/contact" heroTheme="light" />
      <section className="border-b border-black/5 bg-white px-4 pb-4 pt-16 md:px-6 md:pt-20">
        <div className="mx-auto max-w-screen-xl text-center lg:text-left">
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.eyebrow"
            defaultValue="Case Studies"
            as="p"
            className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#0A1F44]"
          />
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.title"
            defaultValue="Real Campaigns, Real Outcomes."
            as="h1"
            className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-black md:text-5xl lg:mx-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          />
          <EditableText
            routePath={ROUTE}
            fieldKey="hero.intro"
            defaultValue="Every case below is a real behavioral health client. Real numbers, real timelines, real admissions growth."
            as="p"
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-black/55 lg:mx-0"
          />
        </div>
      </section>
      <ResultsCaseStudies hideHeader />
      <Footer />
    </div>
  );
}
