import Link from "next/link";

export default function PostCta() {
  return (
    <section className="w-full bg-[#101E3F] py-16 md:py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-white/20" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-semibold">
              Get Expert Help
            </span>
            <div className="w-8 h-px bg-white/20" />
          </div>

          <h2
            className="text-2xl md:text-3xl text-white mb-4 leading-snug"
            style={{ fontFamily: "'Marcellus', serif" }}
          >
            Stop Losing Revenue to Billing Errors
          </h2>

          <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-lg mx-auto" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Cipher Billing specializes in behavioral health revenue cycle management. Reach out for a
            free consultation and see how we can maximize your reimbursements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact-us"
              className="bg-[#166C96] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-3.5 hover:bg-[#166C96]/90 transition-all duration-200 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/blog"
              className="border border-white/20 text-white/70 text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-3.5 hover:border-white/40 hover:text-white transition-all duration-200 whitespace-nowrap"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
