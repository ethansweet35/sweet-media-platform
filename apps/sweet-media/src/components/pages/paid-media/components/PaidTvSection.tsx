"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-tv-2-line", label: "Streaming Platform Targeting", text: "Place ads on Hulu, Roku, Peacock, Tubi, and YouTube TV — across smart TVs, mobile, and tablets wherever your audience is watching." },
  { icon: "ri-map-pin-2-line", label: "Hyper-Local Geo-Targeting", text: "Target viewers by zip code, DMA, or driving distance from your facility — zero wasted spend on viewers outside your service area." },
  { icon: "ri-line-chart-line", label: "Full Attribution & Reporting", text: "Track from ad impression to website visit to phone call — full closed-loop reporting that proves your TV dollars are working." },
  { icon: "ri-film-line", label: "In-House Creative Production", text: "Professional :30s and :15s spots produced by our own team — no agency markup, no outside vendor delays or approval chains." },
];

/* ─── Animated: CTV Campaign Reach Tracker ───────────────────────── */
const PLATFORMS = [
  { name: "Hulu", icon: "ri-play-circle-line", impressions: 1400000, cpm: 18.4, viewRate: 94 },
  { name: "Roku", icon: "ri-tv-line", impressions: 1100000, cpm: 15.2, viewRate: 91 },
  { name: "YouTube TV", icon: "ri-youtube-line", impressions: 920000, cpm: 12.8, viewRate: 88 },
  { name: "Peacock", icon: "ri-broadcast-line", impressions: 690000, cpm: 14.1, viewRate: 85 },
  { name: "Tubi", icon: "ri-tv-2-line", impressions: 540000, cpm: 9.6, viewRate: 82 },
];

const DMA_MARKETS = [
  "Los Angeles, CA",
  "San Diego, CA",
  "Phoenix, AZ",
  "Las Vegas, NV",
  "Denver, CO",
];

function CtvReachTracker({ active }: { active: boolean }) {
  const [revealedPlatforms, setRevealedPlatforms] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [marketIdx, setMarketIdx] = useState(0);
  const [marketVisible, setMarketVisible] = useState(true);
  const [callsCount, setCallsCount] = useState(0);

  const totalMax = PLATFORMS.reduce((a, p) => a + p.impressions, 0);

  useEffect(() => {
    if (!active) return;
    setRevealedPlatforms(0); setTotalImpressions(0); setTotalSpend(0); setCallsCount(0);

    // Reveal platforms
    PLATFORMS.forEach((_, i) => {
      setTimeout(() => setRevealedPlatforms((n) => Math.max(n, i + 1)), 200 + i * 250);
    });

    // Count up numbers
    setTimeout(() => {
      let frame = 0;
      const t = setInterval(() => {
        frame++;
        const ratio = frame / 50;
        setTotalImpressions(Math.round(totalMax * ratio));
        setTotalSpend(Math.round(84600 * ratio));
        setCallsCount(Math.round(1240 * ratio));
        if (frame >= 50) clearInterval(t);
      }, 35);
      return () => clearInterval(t);
    }, 800);

    // Cycle DMA markets
    const mt = setInterval(() => {
      setMarketVisible(false);
      setTimeout(() => {
        setMarketIdx((i) => (i + 1) % DMA_MARKETS.length);
        setMarketVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(mt);
  }, [active, totalMax]);

  const formatNum = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Campaign header */}
      <div className="bg-white rounded-2xl border border-black/8 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
          <i className="ri-tv-2-line text-white text-sm"></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-black">CTV Campaign — Q2 Recovery Spots</div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-gray-400">Targeting:</span>
            <span
              className={`text-[10px] font-semibold text-black transition-all duration-300 ${marketVisible ? "opacity-100" : "opacity-0"}`}
            >
              {DMA_MARKETS[marketIdx]}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-black rounded-full px-2.5 py-1 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-[10px] text-white font-semibold">Active</span>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Impressions", val: formatNum(totalImpressions) },
          { label: "Total Spend", val: `$${formatNum(totalSpend)}` },
          { label: "Inbound Calls", val: formatNum(callsCount) },
        ].map((m) => (
          <div key={m.label} className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
            <div className="text-sm font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{m.val}</div>
            <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Platform breakdown */}
      <div className="bg-white rounded-2xl border border-black/8 p-4 flex-1">
        <div className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-medium mb-3">Platform Reach Breakdown</div>
        <div className="space-y-2.5">
          {PLATFORMS.map((p, i) => {
            const pct = Math.round((p.impressions / PLATFORMS[0].impressions) * 100);
            return (
              <div key={p.name} className={`transition-all duration-500 ${revealedPlatforms > i ? "opacity-100" : "opacity-0 translate-y-1"}`} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className={`${p.icon} text-gray-400 text-sm`}></i>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-24 flex-shrink-0">{p.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: revealedPlatforms > i ? `${pct}%` : "0%",
                        background: i === 0 ? "#111" : `rgba(0,0,0,${0.6 - i * 0.1})`,
                        transitionDelay: `${i * 80 + 200}ms`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-black w-12 text-right flex-shrink-0">{formatNum(p.impressions)}</span>
                </div>
                <div className="pl-7 flex gap-4 text-[10px] text-gray-400">
                  <span>CPM ${p.cpm}</span>
                  <span>View Rate {p.viewRate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attribution strip */}
      <div className="bg-black rounded-xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <i className="ri-git-branch-line text-white/50 text-sm"></i>
          <span className="text-[10px] text-white/50 font-medium">Attribution Path</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/70 font-semibold flex-wrap">
          <span>TV Ad</span>
          <i className="ri-arrow-right-line text-white/30 text-xs"></i>
          <span>Site Visit</span>
          <i className="ri-arrow-right-line text-white/30 text-xs"></i>
          <span>Call</span>
          <i className="ri-arrow-right-line text-white/30 text-xs"></i>
          <span className="text-green-400">Admission</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function PaidTvSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="paid-tv" className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">TV &amp; Streaming</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Run TV Commercials
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>with Measurable Results.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
              Run targeted 30-second spots on Hulu, Roku, YouTube TV, and more — reaching your exact audience by geography, demographics, and viewing behavior, with full attribution back to admissions.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "2.1M", label: "Impressions" },
                { val: "91%", label: "View-Through Rate" },
                { val: "$18.40", label: "CPM" },
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
            <div className="bg-[#f7f6f4] rounded-3xl p-6 h-[520px] flex flex-col">
              <CtvReachTracker active={visible} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
