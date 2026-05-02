"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-map-pin-line", label: "Google Business Profile Optimization", text: "Complete GBP management — photos, posts, Q&A, categories, and service descriptions optimized for local ranking signals that drive map pack placement." },
  { icon: "ri-store-2-line", label: "Multi-Location Management", text: "Coordinated local SEO across every facility location — each one optimized individually for its target market, not just copy-pasted settings." },
  { icon: "ri-star-line", label: "Review Generation & Management", text: "Systemized review campaigns that build your star rating and respond to feedback at scale — one of Google's strongest local ranking signals." },
  { icon: "ri-focus-3-line", label: "Citation Building & Cleanup", text: "Accurate NAP data across 80+ directories — the foundation of local search authority Google relies on to verify your locations." },
];

/* ─── Map Pack Live Visual ──────────────────────────────────────── */
const CITIES = ["Los Angeles", "San Diego", "Phoenix", "Las Vegas", "Denver"];

const GBP_REVIEWS = [
  { author: "Michael T.", stars: 5, text: "Changed my life. The staff here genuinely care.", time: "2h ago" },
  { author: "Sarah K.", stars: 5, text: "Best decision I ever made. Highly recommend.", time: "5h ago" },
  { author: "James R.", stars: 5, text: "World-class clinical team and incredible support.", time: "1d ago" },
];

function MapPackVisual({ active }: { active: boolean }) {
  const [callCount, setCallCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(284);
  const [cityIdx, setCityIdx] = useState(0);
  const [rating, setRating] = useState(4.6);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [pinPop, setPinPop] = useState([false, false, false]);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Pins pop in
    [0, 1, 2].forEach((i) => {
      setTimeout(() => setPinPop((p) => { const n = [...p]; n[i] = true; return n; }), 300 + i * 250);
    });

    // GBP card slides in
    setTimeout(() => setCardVisible(true), 1200);

    // Call counter
    let calls = 0;
    const callInterval = setInterval(() => {
      calls += 1;
      setCallCount(calls);
      if (calls >= 62) clearInterval(callInterval);
    }, 35);

    // Review count ticking up
    let rev = 284;
    const revInterval = setInterval(() => {
      rev += 1;
      setReviewCount(rev);
      if (rev >= 312) { clearInterval(revInterval); }
    }, 80);

    // Rating nudge
    setTimeout(() => setRating(4.9), 1800);

    // Rotate cities
    const cityInterval = setInterval(() => {
      setCityIdx((i) => (i + 1) % CITIES.length);
    }, 2200);

    // Rotate reviews
    const revDisplayInterval = setInterval(() => {
      setReviewIdx((i) => (i + 1) % GBP_REVIEWS.length);
    }, 3000);

    return () => {
      clearInterval(callInterval);
      clearInterval(revInterval);
      clearInterval(cityInterval);
      clearInterval(revDisplayInterval);
    };
  }, [active]);

  const review = GBP_REVIEWS[reviewIdx];

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Map with animated pins */}
      <div className="relative w-full h-44 rounded-2xl overflow-hidden flex-shrink-0">
        <Image
          src="https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/localmap.jpg"
          alt="Decorative stylized map background"
          fill
          loading="lazy"
          sizes="460px"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10" />

        {/* Animated pins */}
        {[
          { top: "28%", left: "22%" },
          { top: "55%", left: "48%" },
          { top: "35%", left: "70%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ top: pos.top, left: pos.left, transform: "translate(-50%,-100%)" }}
          >
            <div
              className={`transition-all duration-500 ${pinPop[i] ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${i === 0 ? "bg-black text-white" : "bg-white border border-black/15 text-black"}`}>
                <i className={`ri-map-pin-2-fill text-sm ${i === 0 ? "text-white" : "text-black"}`}></i>
                #{i + 1}
              </div>
              <div className={`w-px h-2 mx-auto ${i === 0 ? "bg-black" : "bg-gray-400"}`} />
            </div>
          </div>
        ))}

        {/* Search pill */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2">
          <i className="ri-search-line text-gray-500 text-xs"></i>
          <span className="text-xs font-semibold text-black">
            rehab near{" "}
            <span
              className="transition-all duration-300"
              key={cityIdx}
              style={{ display: "inline-block" }}
            >
              {CITIES[cityIdx]}
            </span>
          </span>
        </div>
      </div>

      {/* GBP Card */}
      <div
        className={`bg-white rounded-2xl border border-black/8 p-4 flex-1 flex flex-col gap-3 transition-all duration-500 ${cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Business header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
            <i className="ri-hospital-line text-white text-base"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-black">Sunrise Recovery Center</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <i key={s} className={`ri-star-fill text-[11px] transition-colors duration-500 ${s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}></i>
                ))}
              </div>
              <span className="text-xs font-bold text-black transition-all duration-500">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({reviewCount} reviews)</span>
            </div>
          </div>
          <div className="bg-black/5 rounded-full px-2.5 py-1 flex-shrink-0">
            <span className="text-[10px] font-bold text-black/50 uppercase tracking-wider">#1 Local</span>
          </div>
        </div>

        {/* Live metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black rounded-xl px-3 py-2.5 flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
              <i className="ri-phone-fill text-white text-sm"></i>
            </div>
            <div>
              <div className="text-lg font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {callCount}
              </div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest">Calls Today</div>
            </div>
          </div>
          <div className="bg-[#f7f6f4] rounded-xl px-3 py-2.5 flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white flex-shrink-0">
              <i className="ri-eye-line text-black text-sm"></i>
            </div>
            <div>
              <div className="text-lg font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>2,847</div>
              <div className="text-[9px] text-black/30 uppercase tracking-widest">Views/Week</div>
            </div>
          </div>
        </div>

        {/* Rotating review */}
        <div className="bg-[#f7f6f4] rounded-xl p-3 flex-1" key={reviewIdx}>
          <div className="flex items-center gap-1 mb-1.5">
            {[1,2,3,4,5].map((s) => (
              <i key={s} className="ri-star-fill text-[10px] text-yellow-400"></i>
            ))}
            <span className="text-[9px] text-gray-400 ml-1">{review.time}</span>
          </div>
          <p className="text-xs leading-relaxed italic" style={{color:'#0A1F44'}}>&quot;{review.text}&quot;</p>
          <div className="text-[10px] font-semibold text-black/50 mt-1.5">— {review.author}</div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { val: "30+", label: "Cities Ranked" },
          { val: "6.2x", label: "More Calls" },
          { val: "4.9★", label: "Avg. Rating" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
            <div className="text-sm font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
            <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SeoLocalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-1">
            <div className="bg-[#f7f6f4] rounded-3xl p-6 h-[560px] flex flex-col">
              <MapPackVisual active={visible} />
            </div>
          </div>

          {/* Right — content */}
          <div className="flex-1 min-w-0 order-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Map Pack Domination</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Own the Map Pack
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>in Every Market.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              When someone searches &quot;rehab near me&quot; we make sure your facility is in the top 3 — in every city you serve. More map pack presence means more calls, more admissions, more impact.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "Top 3", label: "Local Pack Rank" },
                { val: "6.2x", label: "More Calls" },
                { val: "30+", label: "Cities Ranked" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 group cursor-default">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/5 group-hover:bg-[#0A1F44] transition-colors duration-200 mt-0.5">
                    <i className={`${f.icon} text-sm text-black/50 group-hover:text-white transition-colors duration-200`}></i>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black mb-0.5 leading-snug">{f.label}</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
