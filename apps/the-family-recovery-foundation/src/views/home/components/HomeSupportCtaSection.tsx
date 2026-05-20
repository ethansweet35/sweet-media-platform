import Link from "next/link";

export default function HomeSupportCtaSection() {
  return (
    <section className="bg-pure-white border-t border-mist/80 py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16 text-center">
        <h2 className="text-[clamp(24px,3vw,36px)] font-display text-deep-navy leading-[1.15] mb-5 md:mb-6 max-w-3xl mx-auto">
          For Recovery that Lasts a Lifetime, The Family Recovery Foundation is Here
        </h2>
        <p className="text-body-m font-body text-slate leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
          The Family Recovery Foundation is here for you, offering first-hand perspective from real life,
          with real people and real answers. You can count on us to provide the best qualified resources
          for families and friends impacted by addiction.
        </p>
        <Link
          href="/get-help"
          className="inline-flex items-center gap-3 bg-tfrf-blue text-pure-white px-8 py-3.5 md:px-9 md:py-4 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-deep-navy transition-colors duration-200 whitespace-nowrap group"
        >
          <span>Find Support</span>
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pure-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </span>
        </Link>
      </div>
    </section>
  );
}
