'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { partners, resources } from "@/mocks/partnerships";
import { SITE_IMAGES } from "@/lib/site-images";

const featuredPartners = [...partners]
  .sort((a, b) => {
    const order = { platinum: 0, silver: 1, community: 2 };
    return order[a.tier] - order[b.tier];
  })
  .slice(0, 9);

export default function HomeResourcesPartnersSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="resources-partners"
      className="relative bg-soft-white py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-0 h-80 w-80 rounded-full bg-powder-blue/40 blur-3xl" />
      </div>

      <div className="relative max-w-content mx-auto px-6 lg:px-16">
        <div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 mb-14 md:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="w-full lg:w-[42%] shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-deep-navy/5 ring-1 ring-mist/80">
              <img
                src={SITE_IMAGES.partnership}
                alt="Partners collaborating to support family recovery"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="w-full lg:w-[58%] flex flex-col justify-center">
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
              Working Together
            </p>
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-display text-deep-navy leading-[1.1] mb-4">
              Resources &amp; <em className="italic">Partners</em>
            </h2>
            <p className="text-body-m font-body text-slate leading-relaxed mb-6">
              Information, services, and partnerships for recovery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/partnerships"
                className="inline-flex items-center gap-2 rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white transition-colors hover:bg-deep-navy"
              >
                View Partners
                <i className="ri-arrow-right-line text-base" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-tfrf-blue/40 px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue transition-colors hover:border-tfrf-blue hover:bg-tfrf-blue/10"
              >
                All Resources
                <i className="ri-arrow-right-line text-base" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mb-12 md:mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-6 text-center">
            Trusted Partners
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {featuredPartners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center rounded-xl border border-mist bg-pure-white p-4 md:p-5 hover:border-tfrf-blue/40 hover:shadow-md transition-all duration-300"
                title={partner.name}
              >
                <div className="flex h-14 w-full items-center justify-center mb-3">
                  <img
                    src={partner.logo}
                    alt={partner.logoAlt}
                    className="max-h-12 w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] md:text-[12px] font-body font-semibold text-deep-navy text-center leading-tight line-clamp-2 group-hover:text-tfrf-blue transition-colors">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
          <p className="text-center mt-6">
            <Link
              href="/partnerships"
              className="text-[14px] font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors"
            >
              See all partners →
            </Link>
          </p>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-6 text-center">
            National Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-mist bg-pure-white p-5 hover:border-tfrf-blue hover:bg-tfrf-blue transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tfrf-blue/10 group-hover:bg-pure-white/20 transition-colors">
                    <i className="ri-global-line text-lg text-tfrf-blue group-hover:text-pure-white transition-colors" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-body font-semibold text-deep-navy group-hover:text-pure-white truncate transition-colors">
                      {resource.label}
                    </h3>
                    <p className="text-[13px] font-body text-slate group-hover:text-pure-white/85 leading-relaxed mt-1 line-clamp-2 transition-colors">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
