"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "Sweet Media completely changed how we think about marketing. Our admissions team can barely keep up with the volume now. The cost-per-admission dropped from $3,800 to $890 in four months.",
    name: "Dr. Marcus Holloway",
    title: "CEO, Sunrise Recovery Centers",
    initials: "MH",
    metric: "$3,800 → $890",
    metricLabel: "Cost Per Admission",
  },
  {
    quote: "We'd tried four different agencies before Sweet Media. Nobody else understood behavioral health the way they do — from the compliance nuances to the actual patient journey. The results speak for themselves.",
    name: "Jennifer Castillo",
    title: "Director of Admissions, Pacific Behavioral Health",
    initials: "JC",
    metric: "4 → 1",
    metricLabel: "Agencies Tried",
  },
  {
    quote: "Our census went from 68% to 94% in six months. I was skeptical of the projections at first — but they hit every single number. Best investment we've made in five years.",
    name: "Thomas Reeves",
    title: "COO, Clearwater Treatment Network",
    initials: "TR",
    metric: "68% → 94%",
    metricLabel: "Census Rate",
  },
  {
    quote: "The SEO work alone paid for itself in the first quarter. We're now ranking #1 for 'best rehab in Orange County' and the phone hasn't stopped ringing. I wish we'd found them sooner.",
    name: "Sarah Chen",
    title: "Marketing Director, Coastal Recovery",
    initials: "SC",
    metric: "#1 Ranking",
    metricLabel: "Target Keyword",
  },
  {
    quote: "What impressed me most was how quickly they understood our patient demographics. The Meta Ads campaign they built generated 80 qualified leads in the first month — at half our previous cost.",
    name: "David Park",
    title: "Founder, Elevate Mental Health",
    initials: "DP",
    metric: "80 Leads",
    metricLabel: "First Month",
  },
  {
    quote: "We run 12 locations across three states. Sweet Media manages each market individually while keeping our brand consistent. Our total marketing cost per admission dropped 61% network-wide.",
    name: "Amanda Torres",
    title: "VP of Marketing, Horizon Behavioral Health",
    initials: "AT",
    metric: "↓61%",
    metricLabel: "CPA Network-Wide",
  },
];

export default function ResultsTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActive((s) => (s + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[active];

  return (
    <section ref={sectionRef} className="w-full bg-white py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="w-8 h-px bg-[#0A1F44]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Client Testimonials</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Clients
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Actually Say.</em>
            </h2>
            <p className="text-black/55 text-sm leading-relaxed max-w-md text-center lg:text-right mx-auto lg:mx-0">
              Every quote below is from a real client. No stock photos, no fake names. These are the people we work with every day.
            </p>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0 border border-black/10 rounded-3xl overflow-hidden transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Left — quote */}
          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-between bg-[#f4f6f9]">
            <div>
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map((s) => (
                  <i key={s} className="ri-star-fill text-sm text-[#0A1F44]/40"></i>
                ))}
              </div>
              <p className="text-lg md:text-xl text-black/80 leading-relaxed font-light mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                &ldquo;{current.quote}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A1F44]">
                <span className="text-sm font-bold text-white">{current.initials}</span>
              </div>
              <div>
                <div className="text-sm font-bold text-black">{current.name}</div>
                <div className="text-xs text-black/45">{current.title}</div>
              </div>
            </div>
          </div>

          {/* Right — metric + selector */}
          <div className="p-8 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-black/10">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-black/35 mb-3">Key Result</div>
              <div className="text-4xl md:text-5xl font-bold text-black mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {current.metric}
              </div>
              <div className="text-sm text-black/50">{current.metricLabel}</div>
            </div>

            {/* Selector dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${active === i ? "w-8 bg-[#0A1F44]" : "w-1.5 bg-black/15 hover:bg-black/30"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mini testimonial cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {testimonials.filter((_, i) => i !== active).slice(0, 3).map((t) => (
            <button
              key={t.name}
              onClick={() => setActive(testimonials.indexOf(t))}
              className="text-left bg-white border border-black/8 rounded-2xl p-6 hover:border-black/20 transition-all duration-200 cursor-pointer"
            >
              <p className="text-sm text-black/60 leading-relaxed font-light mb-4 line-clamp-3">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0A1F44]/10 flex-shrink-0">
                  <span className="text-[10px] font-bold text-[#0A1F44]">{t.initials}</span>
                </div>
                <div>
                  <div className="text-xs font-semibold text-black">{t.name}</div>
                  <div className="text-[10px] text-black/40">{t.title}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}