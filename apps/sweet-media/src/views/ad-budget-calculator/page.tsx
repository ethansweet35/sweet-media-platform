import SiteHeader from "@/components/feature/SiteHeader";
import BhBudgetCalculator from "@/components/pages/ad-budget-calculator/BhBudgetCalculator";
import Footer from "@/components/pages/home/components/Footer";
import Link from "next/link";

export default function AdBudgetCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#0A1F44]">
      <SiteHeader ctaLabel="Book a Strategy Call" ctaHref="/contact" heroTheme="dark" />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123,159,212,0.22) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 max-w-2xl mx-auto">
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
              Free tool
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            >
              Ad spend budget calculator
            </h1>
            <p className="text-white/55 text-sm md:text-base leading-relaxed font-light">
              For behavioral health operators: minimum Google Ads spend to be impactful, expected
              leads and verified (VOB) volume, and where extra budget stops paying off — modeled
              for your treatment type and market tier.
            </p>
          </div>

          <BhBudgetCalculator />
        </div>
      </section>

      <Footer />
    </div>
  );
}
