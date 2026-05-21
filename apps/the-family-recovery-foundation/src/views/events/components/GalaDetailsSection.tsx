'use client';

import { useState } from "react";
import { OKLAHOMA_GALA_TICKETS_URL } from "@/lib/oklahoma-gala";
import { cn } from "@/lib/utils";

export default function GalaDetailsSection() {
  const [readMoreOpen, setReadMoreOpen] = useState(false);

  return (
    <section id="tickets" className="bg-pure-white py-16 md:py-20 lg:py-24">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-3">
            Event Details
          </p>
          <h2 className="font-display text-display-m text-deep-navy">
            Join Us for an Evening of Hope
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left column - Event details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Info cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-soft-white rounded-xl p-5 border border-mist/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-powder-blue/40 flex items-center justify-center">
                    <i className="ri-calendar-event-line w-5 h-5 flex items-center justify-center text-tfrf-blue" />
                  </div>
                  <span className="text-caption font-body font-semibold uppercase tracking-wider text-slate">Date</span>
                </div>
                <p className="text-body-m font-body font-medium text-deep-navy">Thursday, June 11, 2026</p>
              </div>

              <div className="bg-soft-white rounded-xl p-5 border border-mist/60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-powder-blue/40 flex items-center justify-center">
                    <i className="ri-time-line w-5 h-5 flex items-center justify-center text-tfrf-blue" />
                  </div>
                  <span className="text-caption font-body font-semibold uppercase tracking-wider text-slate">Time</span>
                </div>
                <p className="text-body-m font-body font-medium text-deep-navy">6:00pm Doors Open</p>
              </div>

              <div className="bg-soft-white rounded-xl p-5 border border-mist/60 sm:col-span-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-powder-blue/40 flex items-center justify-center">
                    <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center text-tfrf-blue" />
                  </div>
                  <span className="text-caption font-body font-semibold uppercase tracking-wider text-slate">Venue</span>
                </div>
                <p className="text-body-m font-body font-medium text-deep-navy">Newchurch</p>
                <p className="text-body-s font-body text-slate">9201 N Rockwell Ave, Oklahoma City, OK 73132</p>
              </div>
            </div>

            {/* Purpose section */}
            <div className="bg-soft-white rounded-2xl p-6 md:p-8 border border-mist/60">
              <h3 className="font-display text-display-s text-deep-navy mb-4">
                Purpose of the Gala
              </h3>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  readMoreOpen ? "max-h-[500px]" : "max-h-[110px]"
                )}
              >
                <p className="text-body-s font-body text-slate leading-relaxed">
                  The Family Recovery Foundation's Gala is one of the primary ways we
                  grow and sustain our mission. This gathering brings together community
                  leaders, advocates, and partners who believe that families impacted by
                  addiction and mental health challenges deserve access to support,
                  guidance, and hope, at no cost.
                </p>
                {readMoreOpen && (
                  <p className="text-body-s font-body text-slate leading-relaxed mt-4">
                    Every dollar raised at this event directly funds our family programming,
                    recovery support services, and educational resources that help families
                    navigate the challenges of addiction and mental health. Your attendance
                    and support make a tangible difference in the lives of those who need
                    it most. Together, we can build stronger families and healthier communities
                    across the nation.
                  </p>
                )}
              </div>
              <button
                onClick={() => setReadMoreOpen(!readMoreOpen)}
                className="inline-flex items-center gap-2 mt-4 text-body-s font-body font-medium text-tfrf-blue hover:text-deep-navy transition-colors duration-200 cursor-pointer"
              >
                <i
                  className={cn(
                    "ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform duration-200",
                    readMoreOpen && "rotate-180"
                  )}
                />
                {readMoreOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>

          {/* Right column - Ticket card */}
          <div className="lg:col-span-2">
            <div className="relative bg-deep-navy rounded-2xl p-6 md:p-8 text-pure-white overflow-hidden h-full">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-tfrf-blue/20" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-sky-blue/15" />

              <div className="relative flex flex-col h-full">
                <div>
                  <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-powder-blue mb-2">
                    Get Your Tickets
                  </p>
                  <h3 className="font-display text-display-s text-pure-white mb-6">
                    Annual Gala 2026
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-3 border-b border-pure-white/15">
                      <div>
                        <p className="text-body-m font-body font-medium text-pure-white">Individual Ticket</p>
                        <p className="text-caption font-body text-pure-white/60">General admission</p>
                      </div>
                      <p className="text-body-l font-display text-[#C9A44A] font-medium">$65</p>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-pure-white/15">
                      <div>
                        <p className="text-body-m font-body font-medium text-pure-white">Table of 8</p>
                        <p className="text-caption font-body text-pure-white/60">Reserved seating</p>
                      </div>
                      <p className="text-body-l font-display text-[#C9A44A] font-medium">$500</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-8">
                    <i className="ri-information-line w-5 h-5 flex items-center justify-center text-powder-blue mt-0.5 shrink-0" />
                    <p className="text-caption font-body text-pure-white/60 leading-relaxed">
                      Dinner served at 6:30pm. All proceeds support families affected by addiction and mental health challenges.
                    </p>
                  </div>
                </div>

                <a
                  href={OKLAHOMA_GALA_TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#C9A44A] hover:bg-[#b8943f] text-deep-navy font-body font-semibold text-[14px] uppercase tracking-[0.06em] rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer mt-auto"
                >
                  Purchase Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}