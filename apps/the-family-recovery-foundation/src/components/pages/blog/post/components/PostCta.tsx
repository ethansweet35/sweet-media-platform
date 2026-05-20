import Link from "next/link";

export default function PostCta() {
  return (
    <section className="relative overflow-hidden bg-deep-navy py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-tfrf-blue/90 to-sky-blue/50" />
      <div className="pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full bg-sky-blue/20 blur-3xl" />

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-16 text-center">
        <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
          We&apos;re Here to Help
        </p>
        <h2 className="font-display text-[clamp(28px,3.5vw,40px)] text-pure-white mb-4 leading-[1.15]">
          Put these insights to work for your family
        </h2>
        <p className="mx-auto mb-8 max-w-xl font-body text-body-m text-pure-white/80 leading-relaxed">
          The Family Recovery Foundation offers free clinical and spiritual support for families
          navigating addiction. Reach out — you don&apos;t have to do it alone.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/get-help"
            className="inline-flex items-center gap-2 rounded-full bg-pure-white px-7 py-3.5 text-sm font-body font-semibold text-deep-navy transition-colors hover:bg-powder-blue"
          >
            Get Help
            <i className="ri-arrow-right-line" />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-pure-white/40 px-7 py-3.5 text-sm font-body font-semibold text-pure-white transition-colors hover:border-pure-white/70 hover:bg-pure-white/10"
          >
            More Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
