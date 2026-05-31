"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-user-search-line", label: "Custom & Lookalike Audiences", text: "Build audiences from your existing patients and past inquiries, then clone them to find thousands more like them across Facebook and Instagram." },
  { icon: "ri-repeat-2-line", label: "Multi-Touch Retargeting", text: "Re-engage website visitors across Facebook, Instagram, and Messenger with sequenced creative that tells your story over time." },
  { icon: "ri-video-line", label: "Video & Creative Production", text: "Scroll-stopping ad creative — static, video, and carousel formats — produced in-house by our creative team, no outside markup." },
  { icon: "ri-bar-chart-grouped-line", label: "Continuous A/B Testing", text: "Ongoing creative and audience testing that finds what converts best — then doubles down before competitors even know what hit them." },
];

/* ─── Animated: Meta Ad Campaign Live Feed ───────────────────────── */
interface AdVariant {
  headline: string;
  cpl: string;
  roas: string;
  ctr: string;
  status: "winning" | "learning" | "paused";
}

const AD_VARIANTS: AdVariant[] = [
  { headline: "Start Your Recovery — Beds Available Now", cpl: "$8.40", roas: "5.8x", ctr: "4.2%", status: "winning" },
  { headline: "Free Confidential Assessment — Same Day", cpl: "$11.20", roas: "4.1x", ctr: "3.1%", status: "learning" },
  { headline: "Most Insurance Accepted — Call 24/7", cpl: "$9.60", roas: "4.9x", ctr: "3.8%", status: "learning" },
  { headline: "Evidence-Based Care. Real Results.", cpl: "$14.80", roas: "3.2x", ctr: "2.4%", status: "paused" },
];

const AUDIENCES = [
  { name: "Past Site Visitors", size: "42K", match: 94 },
  { name: "Lookalike — Admissions", size: "1.8M", match: 87 },
  { name: "Family Members (BH)", size: "860K", match: 79 },
  { name: "Insurance Seekers", size: "2.1M", match: 71 },
];

function MetaCampaignFeed() {
  const [revealedVariants, setRevealedVariants] = useState(0);
  const [revealedAudiences, setRevealedAudiences] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [spend, setSpend] = useState(0);

  useEffect(() => {
    // Stagger variant reveals
    AD_VARIANTS.forEach((_, i) => {
      const t = setTimeout(() => setRevealedVariants((n) => Math.max(n, i + 1)), 300 + i * 220);
      return () => clearTimeout(t);
    });

    // Stagger audience reveals
    AUDIENCES.forEach((_, i) => {
      const t = setTimeout(() => setRevealedAudiences((n) => Math.max(n, i + 1)), 1200 + i * 180);
      return () => clearTimeout(t);
    });

    // Count up metrics
    const startAt = 1000;
    const t = setTimeout(() => {
      let frame = 0;
      const ticker = setInterval(() => {
        frame++;
        setImpressions(Math.round(284000 * (frame / 40)));
        setSpend(Math.round(4820 * (frame / 40)));
        if (frame >= 40) clearInterval(ticker);
      }, 35);
      return () => clearInterval(ticker);
    }, startAt);
    return () => clearTimeout(t);
  }, []);

  const statusColor = (s: AdVariant["status"]) =>
    s === "winning" ? "bg-green-100 text-green-700 border-green-200" :
    s === "learning" ? "bg-amber-50 text-amber-600 border-amber-200" :
    "bg-gray-100 text-gray-400 border-gray-200";

  return (
    <div className="w-full h-full flex flex-col gap-3 overflow-hidden">
      {/* Campaign header */}
      <div className="bg-white rounded-2xl border border-black/8 px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center flex-shrink-0">
          <i className="ri-meta-fill text-white text-xs"></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-bold text-black truncate">Sunrise Recovery — Admissions Drive Q2</div>
          <div className="text-[10px] text-gray-400">Facebook &amp; Instagram · Active</div>
        </div>
        <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2.5 py-1 flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] text-green-700 font-semibold">Live</span>
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-xl border border-black/8 px-4 py-3 flex flex-col gap-0.5">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider">Impressions Today</div>
          <div className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            {impressions >= 1000 ? `${(impressions / 1000).toFixed(0)}K` : impressions}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-black/8 px-4 py-3 flex flex-col gap-0.5">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider">Spend Today</div>
          <div className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            ${spend >= 1000 ? `${(spend / 1000).toFixed(1)}K` : spend}
          </div>
        </div>
      </div>

      {/* Ad variants */}
      <div className="bg-white rounded-2xl border border-black/8 p-3 flex-1 overflow-hidden">
        <div className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-medium mb-2.5 px-1">Ad Creative A/B Test</div>
        <div className="space-y-2">
          {AD_VARIANTS.map((v, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-all duration-500 ${
                revealedVariants > i
                  ? v.status === "winning" ? "bg-black opacity-100" : "bg-gray-50 border border-gray-100 opacity-100"
                  : "opacity-0 translate-x-2"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold truncate ${v.status === "winning" ? "text-white" : "text-gray-700"}`}>
                  {v.headline}
                </div>
                <div className={`flex gap-3 mt-0.5 text-[10px] ${v.status === "winning" ? "text-white/50" : "text-gray-400"}`}>
                  <span>CPL {v.cpl}</span>
                  <span>ROAS {v.roas}</span>
                  <span>CTR {v.ctr}</span>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                v.status === "winning" ? "bg-green-400/20 text-green-300 border-green-400/30" : statusColor(v.status)
              }`}>
                {v.status === "winning" ? "Winning" : v.status === "learning" ? "Testing" : "Paused"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Audience segments */}
      <div className="bg-white rounded-2xl border border-black/8 p-3">
        <div className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-medium mb-2.5 px-1">Active Audience Segments</div>
        <div className="space-y-1.5">
          {AUDIENCES.map((a, i) => (
            <div key={i} className={`flex items-center gap-2.5 transition-all duration-500 ${revealedAudiences > i ? "opacity-100" : "opacity-0"}`}>
              <span className="text-[10px] text-gray-600 w-36 flex-shrink-0">{a.name}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full transition-all duration-700 ease-out"
                  style={{ width: revealedAudiences > i ? `${a.match}%` : "0%", transitionDelay: `${i * 80}ms` }}
                />
              </div>
              <span className="text-[10px] text-black/50 font-semibold w-10 text-right flex-shrink-0">{a.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function PaidMetaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="paid-meta" className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-black/8 p-6 h-[520px] flex flex-col">
              {visible ? <MetaCampaignFeed /> : null}
            </div>
          </div>

          {/* Right — content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Meta Ads</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Reach People Before
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>They Start Searching.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg text-center lg:text-left mx-auto lg:mx-0">
              Meta campaigns let you build awareness, retarget past visitors, and find lookalike audiences at scale — reaching your ideal patients before they ever type a search query.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "5.2x", label: "ROAS" },
                { val: "$9.80", label: "Cost Per Lead" },
                { val: "4.2M", label: "Audience Reach" },
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
