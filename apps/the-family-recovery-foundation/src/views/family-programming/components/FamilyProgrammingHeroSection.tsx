'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import { programsList } from "@/mocks/family-programming";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";
import FlodeskFormEmbed from "@/components/marketing/FlodeskFormEmbed";

export default function FamilyProgrammingHeroSection() {
  const [openPrograms, setOpenPrograms] = useState<Set<string>>(new Set());

  const toggleProgram = (id: string) => {
    setOpenPrograms((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className={`bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-16 md:pb-24 overflow-hidden`}>
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Programs
          </p>
          <h1 className="text-display-l font-display text-deep-navy mb-5">
            Family Programming
          </h1>
          <p className="text-body-l font-body text-slate max-w-2xl mx-auto leading-relaxed">
            Our programs help families heal and navigate the challenges of addiction with
            understanding and compassion. Learn more about our programs below and fill out
            the form to register now.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-2">
              {programsList.map((program) => {
                const isOpen = openPrograms.has(program.id);
                return (
                  <div
                    key={program.id}
                    className="bg-soft-white rounded-xl border border-mist/50 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleProgram(program.id)}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left cursor-pointer group"
                    >
                      <i
                        className={cn(
                          "ri-arrow-down-s-line w-5 h-5 flex items-center justify-center text-lg text-tfrf-blue shrink-0 mt-0.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] md:text-[16px] font-body font-semibold text-deep-navy group-hover:text-tfrf-blue transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-[12px] md:text-[13px] font-body text-slate mt-0.5">
                          {program.schedule}
                        </p>
                      </div>
                    </button>
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="px-4 pb-3 pl-[48px] text-[13px] md:text-[14px] font-body text-slate leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:w-[380px] xl:w-[420px] shrink-0 self-start sticky top-28">
            <div id="family-programming-registration">
              <FlodeskFormEmbed instanceKey="family-programming" />
            </div>
            <p className="mt-4 text-center text-[12px] md:text-[13px] font-body text-slate leading-relaxed">
              Having trouble registering? Contact our support tech{" "}
              <a
                href="tel:8889648825"
                className="text-tfrf-blue hover:text-deep-navy transition-colors font-semibold"
              >
                888-964-8825
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
