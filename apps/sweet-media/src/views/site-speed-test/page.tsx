import SiteHeader from "@/components/feature/SiteHeader";
import SiteSpeedTestTool from "@/components/pages/site-speed-test/SiteSpeedTestTool";
import Footer from "@/components/pages/home/components/Footer";
import Link from "next/link";

export default function SiteSpeedTestPage() {
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
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/55">Tools</span>
            </div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#9BB8E8] font-medium mb-4">
              Free tool
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Test your site speed
            </h1>
            <p className="text-white/55 text-sm md:text-base leading-relaxed font-light">
              Run the same PageSpeed Insights engine Google uses. We detect WordPress, Wix,
              Squarespace, Elementor, and more — then explain the highest-impact fixes in plain
              English, no developer jargon required.
            </p>
          </div>

          <SiteSpeedTestTool />
        </div>
      </section>

      <Footer />
    </div>
  );
}
