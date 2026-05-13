import Link from "next/link";

export default function PostCta() {
  return (
    <section className="w-full bg-[#1F2937] py-16 md:py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-white/20" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold">
              Ready to Grow?
            </span>
            <div className="w-8 h-px bg-white/20" />
          </div>

          <h2
            className="text-2xl md:text-3xl font-light text-white mb-4 leading-snug"
            style={{ fontFamily: "'Inter', serif" }}
          >
            Put These Insights to Work for Your Program
          </h2>

          <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-lg mx-auto">
            Simple Health offers client-centered services. Reach out for a confidential consultation
            and see exactly how we&apos;d apply these strategies to your facility.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="bg-white text-[#1F2937] text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-3.5 rounded-full hover:bg-white/90 transition-all duration-200 whitespace-nowrap"
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/blog"
              className="border border-white/20 text-white/70 text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-3.5 rounded-full hover:border-white/40 hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
