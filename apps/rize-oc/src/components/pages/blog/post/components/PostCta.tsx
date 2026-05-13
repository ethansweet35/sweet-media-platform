import Link from "next/link";

export default function PostCta() {
  return (
    <section className="w-full bg-ink relative overflow-hidden py-[80px]">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/5" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/5" />

      <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-accent mb-6">
            Take the Next Step
          </p>

          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white leading-[0.95]"
            style={{ fontSize: "clamp(28px, 3.2vw, 48px)" }}
          >
            You deserve
            <br />
            <em className="italic text-white/55">compassionate care.</em>
          </h2>

          <p className="mt-5 text-[14px] font-light text-white/55 leading-relaxed max-w-md mx-auto">
            If you or a loved one is struggling with addiction or mental health, the Rize OC team is here to help — confidentially and with no obligation.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:9494612620"
              className="inline-flex items-center gap-2 bg-accent text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-7 py-3.5 hover:bg-accent/90 transition-colors whitespace-nowrap"
            >
              <i className="ri-phone-line text-xs" /> (949) 461-2620
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-white/20 text-white/65 text-[10px] tracking-[0.2em] uppercase font-semibold px-7 py-3.5 hover:border-white/40 hover:text-white transition-colors whitespace-nowrap"
            >
              <i className="ri-article-line text-xs" /> More Articles
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
