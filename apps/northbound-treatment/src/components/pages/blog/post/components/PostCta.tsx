import Link from "next/link";

export default function PostCta() {
  return (
    <section className="relative overflow-hidden bg-[#1b2a47] py-16 md:py-20">
      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l-2 border-t-2 border-white/10" />
      <div className="pointer-events-none absolute right-6 bottom-6 h-12 w-12 border-r-2 border-b-2 border-white/10" />
      {/* Terracotta glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e97a52]/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#e97a52]">
              Take the Next Step
            </p>
            <h2 className="font-heading text-3xl font-bold leading-snug text-white md:text-4xl">
              Recovery starts with a <span className="italic text-[#e97a52]">single call.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Our admissions team is available 24/7 — confidential, no-obligation, and judgment-free.
              Let us help you or your loved one find the right path forward.
            </p>

            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap gap-5">
              {["38+ Years of Experience", "10,000+ Lives Changed", "Evidence-Based Care"].map(
                (t) => (
                  <div key={t} className="flex items-center gap-2">
                    <i className="ri-shield-check-line text-[#e97a52]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/50">
                      {t}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Right — CTAs */}
          <div className="flex shrink-0 flex-col gap-3">
            <a
              href="tel:8888563990"
              className="flex items-center justify-center gap-2 bg-[#e97a52] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#1b2a47]"
            >
              <i className="ri-phone-line" />
              Call Us Now
            </a>
            <Link
              href="/contact-us"
              className="flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-all hover:border-white/50 hover:text-white"
            >
              <i className="ri-mail-line" />
              Send a Message
            </Link>
            <Link
              href="/blog"
              className="text-center text-[10px] uppercase tracking-[0.15em] text-white/30 transition-colors hover:text-white/60"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
