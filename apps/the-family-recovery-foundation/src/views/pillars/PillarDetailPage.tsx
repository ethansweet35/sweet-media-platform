'use client';

import Link from "next/link";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";
import { pillars } from "@/mocks/pillars";
import { pillarDetails } from "@/mocks/pillar-details";

const SLUG_MAP = {
  prevention: "prevention",
  education: "education",
  "financial-aid": "support",
} as const;

interface PillarDetailPageProps {
  slug: keyof typeof SLUG_MAP;
}

export default function PillarDetailPage({ slug }: PillarDetailPageProps) {
  const pillarId = SLUG_MAP[slug];
  const pillar = pillars.find((p) => p.id === pillarId);
  const detail = pillarDetails.find((d) => d.pillarId === pillarId);
  if (!pillar || !detail) return null;

  return (
    <main className="bg-soft-white">
      <section className={`bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24 lg:pb-28`}>
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <Link
            href="/3-pillars"
            className="inline-flex items-center gap-2 text-[14px] font-body font-medium text-tfrf-blue hover:text-deep-navy mb-8"
          >
            <i className="ri-arrow-left-line" />
            All three pillars
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
                Our Services
              </p>
              <h1 className="text-[clamp(32px,4vw,52px)] font-display text-deep-navy leading-[1.08] mb-6">
                {pillar.title}
              </h1>
              <p className="text-[17px] font-body text-slate leading-relaxed mb-4">{pillar.description}</p>
              <p className="text-[16px] font-body text-slate/90 leading-relaxed mb-8">{detail.intro}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/get-help"
                  className="inline-flex items-center gap-2 rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
                >
                  Get Help <i className="ri-arrow-right-line" />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-mist transition-colors"
                >
                  Donate
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <h2 className="text-[28px] md:text-[36px] font-display text-deep-navy mb-10 text-center">
            How we deliver {pillar.title.toLowerCase()}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {detail.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-pure-white p-8 shadow-sm ring-1 ring-mist/80"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-tfrf-blue/10 text-tfrf-blue">
                  <i className={`${pillar.icon} text-xl`} />
                </span>
                <h3 className="text-[18px] font-display font-semibold text-deep-navy mb-3">{item.title}</h3>
                <p className="text-[15px] font-body text-slate leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pure-white py-14 md:py-18 border-y border-mist/60">
        <div className="max-w-content mx-auto px-6 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-[26px] md:text-[32px] font-display text-deep-navy mb-3">{detail.ctaHeadline}</h2>
            <p className="text-[16px] font-body text-slate leading-relaxed">{detail.ctaBody}</p>
          </div>
          <ul className="flex flex-col gap-3 min-w-[220px]">
            {detail.programs.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 text-[15px] font-body font-semibold text-tfrf-blue hover:text-deep-navy"
                >
                  {p.label}
                  <i className="ri-arrow-right-line" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
