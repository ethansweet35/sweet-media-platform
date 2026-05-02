"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-article-line", label: "Content Strategy & Production", text: "In-house writers with behavioral health expertise produce authoritative content that earns rankings, builds trust, and drives admissions." },
  { icon: "ri-link-m", label: "High-Authority Link Building", text: "Earned backlinks from healthcare directories, news sites, and industry publications that move your domain authority in measurable increments." },
  { icon: "ri-speed-line", label: "Technical SEO Foundations", text: "Core Web Vitals, site architecture, crawl health — we fix the technical issues that cap your ranking potential before they can compound." },
  { icon: "ri-bar-chart-2-line", label: "Competitor Gap Analysis", text: "We map every keyword your competitors rank for that you don't — then build a strategy to take each one, one by one." },
];

/* ─── SERP Climb Visual ─────────────────────────────────────────── */
const KEYWORDS = [
  { kw: "drug rehab near me", startPos: 9, endPos: 1, vol: "8.1K/mo" },
  { kw: "alcohol treatment center", startPos: 11, endPos: 2, vol: "5.4K/mo" },
  { kw: "inpatient rehab [city]", startPos: 7, endPos: 1, vol: "3.9K/mo" },
  { kw: "addiction treatment programs", startPos: 14, endPos: 3, vol: "6.2K/mo" },
  { kw: "residential rehab facility", startPos: 8, endPos: 1, vol: "2.7K/mo" },
  { kw: "dual diagnosis treatment", startPos: 12, endPos: 2, vol: "4.1K/mo" },
];

const sparkData = [6, 9, 8, 13, 18, 16, 24, 30, 38, 52, 67, 80, 92, 100];

function SerpClimbVisual({ active }: { active: boolean }) {
  const [positions, setPositions] = useState(KEYWORDS.map((k) => k.startPos));
  const [animatedSpark, setAnimatedSpark] = useState(false);
  const [trafficCount, setTrafficCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    // Stagger keyword climb
    KEYWORDS.forEach((k, i) => {
      setTimeout(() => {
        setPositions((prev) => {
          const next = [...prev];
          next[i] = k.endPos;
          return next;
        });
      }, 300 + i * 200);
    });

    // Sparkline
    setTimeout(() => setAnimatedSpark(true), 600);

    // Traffic counter
    let count = 0;
    const target = 312;
    const interval = setInterval(() => {
      count += 7;
      if (count >= target) { setTrafficCount(target); clearInterval(interval); }
      else setTrafficCount(count);
    }, 30);
    return () => clearInterval(interval);
  }, [active]);

  // SVG sparkline
  const w = 280, h = 56;
  const pad = { t: 6, r: 6, b: 6, l: 6 };
  const gw = w - pad.l - pad.r;
  const gh = h - pad.t - pad.b;
  const max = Math.max(...sparkData);
  const pts = sparkData.map((v, i) => ({
    x: pad.l + (i / (sparkData.length - 1)) * gw,
    y: pad.t + gh - (v / max) * gh,
  }));
  const lineD = pts.reduce((a, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${a} C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");
  const areaD = `${lineD} L${pts[pts.length - 1].x},${pad.t + gh} L${pts[0].x},${pad.t + gh} Z`;

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-black">Keyword Rankings</div>
          <div className="text-[9px] text-gray-400 mt-0.5">Behavorial Health Portfolio</div>
        </div>
        <div className="flex items-center gap-1.5 bg-black text-white rounded-full px-3 py-1.5">
          <i className="ri-arrow-up-line text-xs text-green-400"></i>
          <span className="text-[10px] font-semibold">All Climbing</span>
        </div>
      </div>

      {/* Keywords list */}
      <div className="bg-white rounded-2xl border border-black/8 flex-1 overflow-hidden">
        <div className="divide-y divide-gray-50">
          {KEYWORDS.map((k, i) => {
            const pos = positions[i];
            const pct = pos === 1 ? 100 : pos === 2 ? 78 : pos === 3 ? 60 : 40;
            const isTop = pos === 1;
            return (
              <div key={k.kw} className="flex items-center gap-3 px-4 py-2.5">
                <div
                  className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-700 ${isTop ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {pos}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-800 truncate">{k.kw}</div>
                  <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${isTop ? "bg-black" : "bg-gray-400"}`}
                      style={{ width: active ? `${pct}%` : "5%", transitionDelay: `${400 + i * 200}ms` }}
                    />
                  </div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap transition-all duration-700 ${isTop ? "bg-black text-white" : "bg-gray-100 text-gray-500"}`}
                    style={{ transitionDelay: `${i * 150}ms` }}>
                    #{pos}
                  </div>
                  <div className="text-[9px] text-gray-400 mt-0.5">{k.vol}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sparkline */}
      <div className="bg-white rounded-2xl border border-black/8 px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] text-gray-400 uppercase tracking-widest">Organic Traffic Growth</span>
          <span className="text-sm font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            +{trafficCount}%
          </span>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
          <defs>
            <linearGradient id="orgSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
            <clipPath id="orgClip">
              <rect x={pad.l} y={pad.t} width={animatedSpark ? gw : 0} height={gh}
                style={{ transition: "width 1.6s cubic-bezier(0.4,0,0.2,1)" }} />
            </clipPath>
          </defs>
          <path d={areaD} fill="url(#orgSpark)" clipPath="url(#orgClip)" />
          <path d={lineD} fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" clipPath="url(#orgClip)" />
          {animatedSpark && <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill="#000" />}
        </svg>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SeoOrganicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6">
        <div className={`flex flex-col lg:flex-row-reverse gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-black/8 p-6 h-[520px] flex flex-col">
              <SerpClimbVisual active={visible} />
            </div>
          </div>

          {/* Left — content */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Long-Term Authority</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Climb to Page 1,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>and Stay There.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Sustainable SEO authority built on content that ranks, backlinks that matter, and technical foundations Google trusts — driving consistent, compounding traffic month over month.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "+312%", label: "Organic Traffic" },
                { val: "90 Days", label: "Avg. To Top 3" },
                { val: "28+", label: "Top 3 Keywords" },
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
