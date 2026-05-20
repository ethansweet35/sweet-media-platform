'use client';

import { useEffect, useState, useRef } from "react";

const headlineWords = [
  { text: "Committed", italic: false },
  { text: "to", italic: false },
  { text: "Healing", italic: true },
  { text: "Families", italic: false },
  { text: "&", italic: false },
  { text: "Preventing", italic: false },
  { text: "Substance", italic: false },
  { text: "Use", italic: false },
];

const recoveryTags = [
  "Prevention",
  "Education",
  "Support",
  "Family Care",
  "Community",
];

const avatarGradients = [
  "from-tfrf-blue to-sky-blue",
  "from-sky-blue to-powder-blue",
  "from-deep-navy to-tfrf-blue",
  "from-tfrf-blue to-deep-navy",
  "from-sky-blue to-tfrf-blue",
  "from-powder-blue to-sky-blue",
];

export default function HeroSection() {
  const [revealed, setRevealed] = useState(false);
  const [subheadVisible, setSubheadVisible] = useState(false);
  const [ctasVisible, setCtasVisible] = useState(false);
  const [bottomCardsVisible, setBottomCardsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 300);
    const t2 = setTimeout(() => setSubheadVisible(true), 900);
    const t3 = setTimeout(() => setCtasVisible(true), 1200);
    const t4 = setTimeout(() => setBottomCardsVisible(true), 1600);
    return () => {
      clearTimeout(timer);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_hero002.jpg"
          alt="A hopeful couple looking up at a bright blue sky, symbolizing optimism and recovery"
          className="w-full h-full object-cover object-top"
        />
        {/* Blue-tinted gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-tfrf-blue/80 via-tfrf-blue/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-tfrf-blue/35 via-transparent to-tfrf-blue/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center px-6 md:px-10 lg:px-16 pt-[5.5rem] md:pt-[6.5rem] lg:pt-[7.5rem] pb-4 md:pb-6 lg:pb-8 max-w-content mx-auto">
        {/* Top text area */}
        <div className="max-w-lg lg:max-w-xl mb-6 md:mb-8">
          {/* Headline — slightly bigger */}
          <h1 className="text-[clamp(32px,4vw,52px)] lg:text-[48px] font-display text-pure-white leading-[1.1] mb-4">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="inline-block mr-[0.25em] transition-all duration-700"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                {word.italic ? (
                  <em className="font-display italic">{word.text}</em>
                ) : (
                  word.text
                )}
              </span>
            ))}
          </h1>

          {/* Subhead */}
          <p
            className="text-[15px] md:text-[17px] font-body text-pure-white/80 max-w-md mb-4 md:mb-5 transition-all duration-700 leading-relaxed"
            style={{
              opacity: subheadVisible ? 1 : 0,
              transform: subheadVisible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            The Family Recovery Foundation stands with families impacted by addiction.
            Real people. Real answers. Real hope.
          </p>

          {/* CTA Buttons — two pills side by side */}
          <div
            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 transition-all duration-700"
            style={{
              opacity: ctasVisible ? 1 : 0,
              transform: ctasVisible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {/* Primary CTA */}
            <a
              href="/family-programming"
              className="inline-flex items-center gap-3 bg-pure-white text-deep-navy px-6 py-3 md:px-7 md:py-3.5 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-mist transition-colors duration-200 whitespace-nowrap cursor-pointer group shadow-lg shadow-black/10"
            >
              <span>Register Here</span>
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-deep-navy text-pure-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="/gala"
              className="inline-flex items-center gap-3 bg-tfrf-blue text-pure-white px-6 py-3 md:px-7 md:py-3.5 rounded-full text-[14px] md:text-[15px] font-body font-semibold tracking-tight hover:bg-deep-navy transition-colors duration-200 whitespace-nowrap cursor-pointer group border border-pure-white/30"
            >
              <span>View Upcoming Events</span>
              <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-pure-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center text-pure-white" />
              </span>
            </a>
          </div>
        </div>

        {/* Bottom row: stats card left, tags + text right */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 lg:gap-6 transition-all duration-700"
          style={{
            opacity: bottomCardsVisible ? 1 : 0,
            transform: bottomCardsVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Stats Card — Frosted Glass */}
          <div className="backdrop-blur-xl bg-pure-white/10 border border-pure-white/20 rounded-2xl p-3 md:p-4 max-w-[240px]">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[26px] md:text-[28px] font-display text-pure-white leading-none">247+</span>
              <div className="flex flex-col">
                <span className="text-[12px] md:text-[13px] font-body font-medium text-pure-white/90 leading-tight">families supported</span>
                <span className="text-[11px] md:text-[12px] font-body text-pure-white/60">globally</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {avatarGradients.map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-pure-white/30 flex items-center justify-center`}
                  >
                    <span className="text-[9px] md:text-[10px] font-body font-bold text-pure-white/80">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="ml-2 text-[11px] md:text-[12px] font-body text-pure-white/60">+12 more</span>
            </div>
          </div>

          {/* Right side: floating tags + description */}
          <div className="flex flex-col items-start lg:items-end gap-3 max-w-sm">
            {/* Floating tags */}
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {recoveryTags.map((tag) => (
                <span
                  key={tag}
                  className="backdrop-blur-xl bg-pure-white/10 border border-pure-white/20 rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[12px] md:text-[13px] font-body font-medium text-pure-white/90 whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description block */}
            <div className="text-left lg:text-right">
              <h3 className="text-[14px] md:text-[15px] font-body font-semibold text-pure-white mb-1">
                Expert-led support for all families
              </h3>
              <p className="text-[13px] md:text-[14px] font-body text-pure-white/70 leading-relaxed max-w-xs lg:max-w-sm">
                Our certified counselors and peer advocates provide personalized recovery guidance,
                helping individuals and families find balance, healing, and lasting change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}