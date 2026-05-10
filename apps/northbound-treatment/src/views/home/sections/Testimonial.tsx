import { AutoLinkedText } from "@sweetmedia/blog-core";
/**
 * Testimonial — espresso bg, full-bleed centered alumni quote with stars
 * and Google rating eyebrow. Per Figma Testimonial.tsx.
 */
export default function Testimonial() {
  return (
    <section className="relative overflow-hidden bg-navy py-32 text-white">
      <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-terracotta/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-terracotta/10 blur-[100px]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-12">
        <div className="mb-6 flex justify-center gap-2 text-terracotta">
          {Array.from({ length: 5 }).map((_, i) => (
            <i key={i} className="ri-star-fill text-2xl leading-none"></i>
          ))}
        </div>
        <p className="mb-10 text-xs font-bold uppercase tracking-[0.22em] text-white/40">
          <AutoLinkedText>{"4.6/5 on Google from 224+ Reviews"}</AutoLinkedText>
        </p>

        <blockquote className="mb-10 font-serif text-3xl leading-relaxed text-white lg:text-4xl">
          &ldquo;This place literally saved my life. Case workers, therapists,
          doctors, med staff and operations team are totally outcome driven and
          it works. I look forward to the alumni meetings every Friday.&rdquo;
        </blockquote>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-terracotta">
          <AutoLinkedText>{"&mdash; Joshua Gingold, Alumni"}</AutoLinkedText>
        </p>
      </div>
    </section>
  );
}
