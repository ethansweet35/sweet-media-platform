'use client';

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { boardMembers } from "@/mocks/team";

export default function BoardSection() {
  const [openBioId, setOpenBioId] = useState<string | null>(null);
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const toggleBio = (id: string) => {
    setOpenBioId((prev) => (prev === id ? null : id));
  };

  const firstRow = boardMembers.slice(0, 3);
  const secondRow = boardMembers.slice(3);

  return (
    <section
      ref={ref}
      id="board"
      className="bg-soft-white pt-10 md:pt-14 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div
          className="mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Leadership
          </p>
          <h2 className="text-[clamp(26px,3vw,40px)] font-display text-deep-navy leading-[1.15]">
            Board of Directors
          </h2>
        </div>

        {/* First row: 3 members */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-8 lg:mb-10 transition-all duration-700 delay-100"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {firstRow.map((member) => (
            <div
              key={member.id}
              className="bg-pure-white rounded-xl border border-mist p-5 md:p-6"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-deep-navy/5 mb-4">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-display text-deep-navy">
                {member.name}
              </h3>
              {member.title && (
                <p className="text-body-s font-body italic text-slate mt-1">
                  {member.title}
                </p>
              )}
              <div className="border-t border-mist my-4" />
              <button
                onClick={() => toggleBio(member.id)}
                className="flex items-center gap-2 text-body-s font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200 cursor-pointer"
                aria-expanded={openBioId === member.id}
              >
                <span>{openBioId === member.id ? "Close Bio" : "Read Bio"}</span>
                <i
                  className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform duration-200 ${
                    openBioId === member.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openBioId === member.id ? "400px" : "0px",
                  opacity: openBioId === member.id ? 1 : 0,
                }}
              >
                <div className="pt-4 space-y-3">
                  {member.bio.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-body-s font-body text-slate leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row: 2 members centered */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-2xl mx-auto transition-all duration-700 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {secondRow.map((member) => (
            <div
              key={member.id}
              className="bg-pure-white rounded-xl border border-mist p-5 md:p-6"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-deep-navy/5 mb-4">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-display text-deep-navy">
                {member.name}
              </h3>
              {member.title && (
                <p className="text-body-s font-body italic text-slate mt-1">
                  {member.title}
                </p>
              )}
              <div className="border-t border-mist my-4" />
              <button
                onClick={() => toggleBio(member.id)}
                className="flex items-center gap-2 text-body-s font-body font-semibold text-tfrf-blue hover:text-deep-navy transition-colors duration-200 cursor-pointer"
                aria-expanded={openBioId === member.id}
              >
                <span>{openBioId === member.id ? "Close Bio" : "Read Bio"}</span>
                <i
                  className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform duration-200 ${
                    openBioId === member.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: openBioId === member.id ? "400px" : "0px",
                  opacity: openBioId === member.id ? 1 : 0,
                }}
              >
                <div className="pt-4 space-y-3">
                  {member.bio.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-body-s font-body text-slate leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}