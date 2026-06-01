import SiteHeader from "@/components/feature/SiteHeader";
import SeoStrategyTool from "@/components/pages/seo-strategy/SeoStrategyTool";
import Footer from "@/components/pages/home/components/Footer";
import Link from "next/link";

export default function SeoStrategyPage() {
  return (
    <div className="min-h-screen bg-[#0A1F44]">
      <SiteHeader ctaLabel="Free Site Audit" ctaHref="/contact" heroTheme="dark" />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123,159,212,0.22) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Link
                href="/"
                className="text-[9px] tracking-[0.3em] uppercase text-white/35 hover:text-white/60 transition-colors"
              >
                Home
              </Link>
              <span className="text-white/20 text-[9px]">/</span>
              <Link
                href="/site-speed-test"
                className="text-[9px] tracking-[0.3em] uppercase text-white/35 hover:text-white/60 transition-colors"
              >
                AI Tools
              </Link>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9BB8E8] font-medium mb-4">
              Free AI tool
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              SEO strategy audit
            </h1>
            <p className="text-white/55 text-sm md:text-base leading-relaxed font-light">
              We pull a Semrush snapshot of your domain, crawl your site structure, check
              PageSpeed, and use AI to surface CRO fixes, hierarchy gaps, competitor keywords,
              and technical issues — in plain English.
            </p>
          </div>

          <SeoStrategyTool />
        </div>
      </section>

      <Footer />
    </div>
  );
}
