"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-star-line", label: "Systemized Review Generation", text: "Automated, HIPAA-compliant review request workflows that turn satisfied patients and families into 5-star reviews across Google, Facebook, and industry directories." },
  { icon: "ri-reply-line", label: "Response Management", text: "Every review gets a thoughtful, brand-aligned response — positive or negative — within 24 hours. We protect your reputation while showing prospective families you care." },
  { icon: "ri-eye-line", label: "Real-Time Monitoring", text: "Continuous monitoring across all review platforms, social mentions, and industry forums. Alerts within minutes of new reviews or brand mentions." },
  { icon: "ri-shield-check-line", label: "Negative Review Protocol", text: "Structured response templates and escalation paths for negative reviews. We know when to respond publicly, when to take it offline, and when to involve your legal team." },
];

/* ─── Animated: Reputation Dashboard Visual ──────────────────────────── */
const REVIEWS = [
  { platform: "Google", rating: 4.9, count: 312, trend: "up" },
  { platform: "Facebook", rating: 4.8, count: 187, trend: "up" },
  { platform: "Healthgrades", rating: 4.7, count: 94, trend: "up" },
  { platform: "Yelp", rating: 4.6, count: 56, trend: "flat" },
];

function ReputationDashboardVisual({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    setRevealed(0);
    setTotalCount(0);
    REVIEWS.forEach((_, i) => {
      setTimeout(() => setRevealed((n) => n + 1), 200 + i * 180);
    });
    let count = 0;
    const target = 649;
    const interval = setInterval(() => {
      count += 14;
      if (count >= target) { setTotalCount(target); clearInterval(interval); }
      else setTotalCount(count);
    }, 30);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Reputation Overview</div>
          <div className="text-[9px] text-gray-400 mt-0.5">All Platforms — Live</div>
        </div>
        <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1.5">
          <i className="ri-star-fill text-yellow-500 text-xs"></i>
          <span className="text-[10px] font-bold text-yellow-700">4.8 Overall</span>
        </div>
      </div>

      {/* Platform ratings */}
      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {REVIEWS.map((r, i) => (
            <div
              key={r.platform}
              className={`flex items-center gap-3 px-4 py-3 transition-all duration-500 ${revealed > i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-black/5 flex items-center justify-center">
                <span className="text-[10px] font-bold text-black/60">{r.platform[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800">{r.platform}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <i key={s} className={`ri-star-fill text-[10px] ${s <= Math.round(r.rating) ? "text-yellow-400" : "text-gray-200"}`}></i>
                  ))}
                  <span className="text-[10px] text-gray-400 ml-1">{r.rating}</span>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-xs font-bold text-black">{r.count}</div>
                <div className="text-[9px] text-gray-400">reviews</div>
              </div>
              <div className="flex-shrink-0">
                <i className={`${r.trend === "up" ? "ri-arrow-up-line text-green-500" : "ri-arrow-right-line text-gray-400"} text-xs`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            {totalCount.toLocaleString()}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Total Reviews Managed</div>
        </div>
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            24 hr
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Avg. Response Time</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SocialReputationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="social-reputation" className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Reputation Management</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Protect What You&apos;ve Built,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Grow What Matters.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
              Your online reputation is often the first impression families have of your facility. We monitor, manage, and grow your reviews across every platform — turning your best outcomes into your strongest marketing asset.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "4.8★", label: "Avg. Rating" },
                { val: "649", label: "Reviews Managed" },
                { val: "24 hr", label: "Response Time" },
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

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-1 lg:order-2">
            <div className="bg-[#f7f6f4] rounded-3xl p-6 h-[480px] flex flex-col">
              <ReputationDashboardVisual active={visible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}