import {
  cipherHomeEligibilityTurnaroundCopy,
  cipherHomeMetricTiles,
  cipherHomeTestimonials,
} from "@/lib/cipherHomeSocialProof";
import { LANDING_SECTION_PY, SERVICE_CONTAINER } from "@/views/services/components/servicePageConstants";

const testimonial = cipherHomeTestimonials[0]!;

export default function DetoxSocialProof() {
  return (
    <section className={`bg-[#101E3F] text-white ${LANDING_SECTION_PY}`}>
      <div className={SERVICE_CONTAINER}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#5eb5e0]">Social proof</p>
            <span className="h-px w-12 min-w-[48px] bg-[#166C96]" aria-hidden />
          </div>
          <h2 className="mt-4 font-[var(--font-heading)] text-[1.75rem] font-medium leading-tight md:text-[2.125rem]">
            Trusted for <span className="text-[#5eb5e0]">detox billing services</span>
          </h2>
          <p className="mt-4 text-[14px] leading-[1.65] text-white/70">
            Same benchmarks we publish on our homepage for addiction treatment centers—including a 9-minute average
            eligibility turnaround vs. an industry-standard 30 minutes.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <figure className="relative max-w-xl lg:max-w-none">
            <i className="ri-double-quotes-l text-4xl text-[#166C96]/60" aria-hidden />
            <blockquote className="mt-4 text-[17px] leading-[1.7] text-white/90 md:text-lg">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-l-2 border-[#166C96] pl-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5eb5e0]">
                {testimonial.attribution}
              </p>
            </figcaption>
          </figure>

          <div>
            <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50 lg:text-left">
              By the numbers
            </p>
            <div className="grid grid-cols-2 gap-4">
              {cipherHomeMetricTiles.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center border border-white/15 bg-white/5 px-4 py-8 text-center backdrop-blur-sm"
                >
                  <p className="font-[var(--font-heading)] text-3xl font-medium tracking-tight text-white md:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-3 max-w-[10rem] text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[12px] leading-[1.6] text-white/50 lg:text-left">
              {cipherHomeEligibilityTurnaroundCopy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
