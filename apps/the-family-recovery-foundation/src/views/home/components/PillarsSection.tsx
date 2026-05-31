import Image from "next/image";
import Link from "next/link";
import { pillars } from "@/mocks/pillars";

export default function PillarsSection() {
  return (
    <section
      id="pillars"
      className="relative bg-soft-white border-t border-mist/80 pt-16 md:pt-20 lg:pt-24 pb-20 md:pb-28 lg:pb-32 overflow-hidden"
    >
      {/* Ambient shapes */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-powder-blue/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-16 h-64 w-64 rounded-full bg-sky-blue/25 blur-3xl" />

      <div className="relative max-w-content mx-auto px-6 lg:px-16">
        <div className="mx-auto max-w-2xl mb-10 md:mb-12 lg:mb-14 text-center">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Three Pillars
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15] mb-4 md:mb-5">
            The Foundation of <em className="italic">Everything</em> We Do
          </h2>
          <p className="text-body-m font-body text-slate leading-relaxed">
            Prevention, education, and direct support work together so families have the knowledge,
            skills, and resources to create lasting generational change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.id}
              className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-mist/90 bg-pure-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Colored top accent */}
              <div className={`h-1 w-full ${pillar.accentBar}`} />

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <div className="mb-5 flex items-start justify-between gap-4">
                  {/* Icon medallion */}
                  <div className="relative shrink-0">
                    <div
                      className={`absolute -right-1 -top-1 h-14 w-14 rounded-2xl ${pillar.accent} transition-transform duration-500 group-hover:rotate-6`}
                    />
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-pure-white shadow-md ring-1 ${pillar.iconRing}`}
                    >
                      <i className={`${pillar.icon} text-2xl text-tfrf-blue`} />
                    </div>
                  </div>

                  <span className="font-display text-[42px] leading-none text-mist/90 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-[24px] md:text-[26px] font-display text-deep-navy leading-[1.15] mb-3">
                  {pillar.title}
                </h3>

                <p className="text-body-m font-body text-slate leading-relaxed mb-5 flex-1">
                  {pillar.description}
                </p>

                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-2 text-body-s font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200"
                >
                  Learn more
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-tfrf-blue/10 transition-colors duration-200 group-hover:bg-tfrf-blue group-hover:text-pure-white">
                    <i className="ri-arrow-right-line text-sm transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>

              {/* Compact image strip with icon watermark */}
              <div className="relative mx-6 mb-6 mt-1">
                <div className="relative h-28 md:h-32 overflow-hidden rounded-xl bg-mist ring-1 ring-mist/80">
                  <Image
                    src={pillar.image}
                    alt=""
                    fill
                    className="object-cover object-center opacity-85 transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-deep-navy/35 via-transparent to-tfrf-blue/10 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-pure-white/90 backdrop-blur-sm shadow-sm">
                    <i className={`${pillar.icon} text-lg text-tfrf-blue`} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
