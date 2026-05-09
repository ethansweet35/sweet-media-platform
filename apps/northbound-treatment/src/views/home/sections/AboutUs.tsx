/**
 * About — sand-bg two-column layout: editorial copy with a navy
 * left-border pull-quote on the left, YouTube embed in an architectural
 * frame on the right. Per Figma AboutUs.tsx.
 */
export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand py-32">
      <div className="pointer-events-none absolute right-0 top-20 h-96 w-96 rounded-full bg-navy/5 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-20 left-0 h-72 w-72 rounded-full bg-terracotta/10 blur-3xl"></div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy/[0.03]"
        style={{ filter: "blur(100px)" }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-navy"></div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-navy">
                Our Story
              </p>
            </div>
            <h2 className="font-serif text-5xl leading-tight text-espresso lg:text-6xl">
              About Northbound
            </h2>
            <div className="space-y-6">
              <div className="relative border-l-4 border-navy pl-8">
                <p className="text-lg font-light leading-relaxed text-espresso/80">
                  For more than 30 years, Northbound Treatment Services has
                  been at the forefront of providing lifesaving, compassionate
                  care, and specialized services to help people from all walks
                  of life feel better, discover themselves, and live free from
                  addiction.
                </p>
              </div>
              <p className="font-light leading-relaxed text-espresso/70">
                Our evidence-based approach combines medical expertise with
                holistic healing, creating individualized treatment plans that
                address the whole person&mdash;mind, body, and spirit.
              </p>
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-navy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-terracotta"
            >
              Learn More
              <i className="ri-arrow-right-line text-sm leading-none" />
            </a>
          </div>

          <div>
            <div className="architectural-border relative aspect-video overflow-hidden bg-espresso/5 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/C7v5X5WD8qg"
                title="Northbound Treatment Services"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
