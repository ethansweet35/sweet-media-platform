"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-search-2-line", label: "Intent-Based Keyword Strategy", text: "We target only the highest-intent queries — people actively searching for treatment right now, not just browsing content." },
  { icon: "ri-money-dollar-circle-line", label: "Smart Bidding & Optimization", text: "Data-driven bidding strategies that maximize admissions volume while keeping your cost-per-lead as low as possible." },
  { icon: "ri-layout-grid-line", label: "HIPAA-Aware Landing Pages", text: "Dedicated conversion pages built to earn trust and drive calls — not generic homepages that leak ad spend." },
  { icon: "ri-eye-line", label: "Display & Performance Max", text: "Omnichannel Google campaigns across Search, Display, YouTube, and Discovery — all under one optimized strategy." },
];

/* ─── Animated: Live Bid Auction Visual ──────────────────────────── */
const KEYWORDS = [
  "drug rehab near me",
  "alcohol treatment center",
  "inpatient rehab programs",
  "detox center near me",
  "behavioral health treatment",
];

interface Bidder {
  name: string;
  cpc: number;
  score: number;
  rank: number;
}

function generateBidders(keywordIdx: number): Bidder[] {
  const bases = [
    [14.2, 4.8, 1], [16.8, 3.9, 2], [11.4, 5.2, 1], [13.6, 4.4, 2], [15.1, 5.0, 1],
  ];
  const [cpc, score, rank] = bases[keywordIdx];
  return [
    { name: "Your Campaign", cpc, score, rank },
    { name: "Competitor A", cpc: cpc + 3.2, score: score - 1.8, rank: 3 },
    { name: "Competitor B", cpc: cpc + 5.8, score: score - 2.6, rank: 4 },
    { name: "Competitor C", cpc: cpc + 2.1, score: score - 0.9, rank: 2 },
  ].sort((a, b) => a.rank - b.rank);
}

function GoogleBidAuction() {
  const [kwIdx, setKwIdx] = useState(0);
  const [auctionPhase, setAuctionPhase] = useState<"idle" | "bidding" | "result">("idle");
  const [revealedBidders, setRevealedBidders] = useState(0);
  const [typeLen, setTypeLen] = useState(0);
  const [cpcCount, setCpcCount] = useState(0);
  const [convCount, setConvCount] = useState(0);

  const bidders = generateBidders(kwIdx);
  const kw = KEYWORDS[kwIdx];

  useEffect(() => {
    const t = setTimeout(() => setAuctionPhase("bidding"), 300);
    return () => clearTimeout(t);
  }, []);

  // Type keyword
  useEffect(() => {
    if (auctionPhase === "idle") return;
    if (typeLen < kw.length) {
      const t = setTimeout(() => setTypeLen((l) => l + 1), 42);
      return () => clearTimeout(t);
    }
  }, [auctionPhase, typeLen, kw]);

  // Reveal bidders one by one
  useEffect(() => {
    if (auctionPhase !== "bidding") return;
    if (typeLen < kw.length) return;
    if (revealedBidders < bidders.length) {
      const t = setTimeout(() => setRevealedBidders((n) => n + 1), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setAuctionPhase("result"), 400);
    return () => clearTimeout(t);
  }, [auctionPhase, revealedBidders, bidders.length, typeLen, kw.length]);

  // Animate CPC and conv counters
  useEffect(() => {
    if (auctionPhase !== "result") return;
    const target = bidders[0].cpc * 100;
    const convTarget = 84;
    let frame = 0;
    const t = setInterval(() => {
      frame++;
      setCpcCount(Math.min(Math.round(target * (frame / 30)), target));
      setConvCount(Math.min(Math.round(convTarget * (frame / 30)), convTarget));
      if (frame >= 30) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [auctionPhase, bidders]);

  // Cycle to next keyword
  useEffect(() => {
    if (auctionPhase !== "result") return;
    const t = setTimeout(() => {
      setKwIdx((i) => (i + 1) % KEYWORDS.length);
      setAuctionPhase("idle");
      setRevealedBidders(0);
      setTypeLen(0);
      setCpcCount(0);
      setConvCount(0);
      setTimeout(() => setAuctionPhase("bidding"), 200);
    }, 2800);
    return () => clearTimeout(t);
  }, [auctionPhase]);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Search bar with typing */}
      <div className="bg-white rounded-2xl border border-black/8 px-4 py-3 flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-google-fill text-gray-500 text-sm"></i>
        </div>
        <span className="text-sm text-gray-700 flex-1 font-medium">
          {kw.slice(0, typeLen)}
          {typeLen < kw.length && <span className="inline-block w-0.5 h-4 bg-gray-700 ml-0.5 animate-pulse align-middle" />}
        </span>
        <span className="text-[10px] bg-black text-white px-2.5 py-1 rounded-full font-bold whitespace-nowrap">Search</span>
      </div>

      {/* Auction table */}
      <div className="bg-white rounded-2xl border border-black/8 p-4 flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-medium">Live Bid Auction</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-green-600 font-semibold">Running</span>
          </div>
        </div>

        <div className="space-y-2">
          {bidders.map((b, i) => (
            <div
              key={b.name}
              style={{ transitionDelay: `${i * 80}ms` }}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-500 ${
                revealedBidders > i
                  ? b.name === "Your Campaign"
                    ? "bg-black opacity-100"
                    : "bg-gray-50 border border-gray-100 opacity-100"
                  : "opacity-0 translate-y-1"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${b.name === "Your Campaign" ? "bg-white text-black" : "bg-gray-200 text-gray-500"}`}>
                {b.rank}
              </div>
              <span className={`text-xs font-semibold flex-1 ${b.name === "Your Campaign" ? "text-white" : "text-gray-700"}`}>{b.name}</span>
              <span className={`text-xs font-mono ${b.name === "Your Campaign" ? "text-white/60" : "text-gray-400"}`}>${b.cpc.toFixed(2)} CPC</span>
              <div className="flex items-center gap-1">
                {[...Array(Math.round(b.score))].map((_, j) => (
                  <div key={j} className={`w-1.5 h-4 rounded-full ${b.name === "Your Campaign" ? "bg-green-400" : j < Math.round(b.score) - 1 ? "bg-gray-300" : "bg-gray-200"}`} style={{ height: `${8 + j * 3}px` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result metrics */}
      <div className={`grid grid-cols-3 gap-2 transition-all duration-700 ${auctionPhase === "result" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            #{bidders[0].rank}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Ad Position</div>
        </div>
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            ${(cpcCount / 100).toFixed(2)}
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Actual CPC</div>
        </div>
        <div className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
          <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>
            {convCount}%
          </div>
          <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">Conv. Rate</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function PaidGoogleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="paid-google" className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Google Ads</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Capture Patients
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Searching Right Now.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              We run your Google Ads account end-to-end — keyword strategy, bid optimization, Quality Score management — to deliver the lowest cost-per-admission in your market, every month.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "4.8x", label: "ROAS" },
                { val: "$14.20", label: "Avg. CPC" },
                { val: "8.4%", label: "Conv. Rate" },
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
              {visible ? <GoogleBidAuction /> : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
