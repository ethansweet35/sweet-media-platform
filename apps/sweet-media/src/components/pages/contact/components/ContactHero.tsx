"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ContactHero() {
  const [visible, setVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "100%";
    }, 600);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("scroll", onScroll); };
  }, []);

  const sweepY = scrollY * 0.10;
  const orb1Y = scrollY * 0.18;
  const orb2Y = scrollY * 0.28;

  return (
    <section className="relative w-full min-h-[60vh] flex items-center overflow-hidden" style={{ background: "#0A1F44" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(123,159,212,0.28) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(180,210,255,0.1) 0%, transparent 60%)",
        animation: "ctcSweep 12s ease-in-out infinite alternate",
        transform: `translateY(${sweepY}px)`,
      }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: "600px", height: "600px", top: "-180px", right: "-120px", background: "radial-gradient(circle, rgba(123,159,212,0.28) 0%, transparent 70%)", animation: "ctcOrb1 18s ease-in-out infinite alternate", transform: `translateY(${orb1Y}px)` }} />
        <div className="absolute rounded-full" style={{ width: "380px", height: "380px", bottom: "-80px", left: "-60px", background: "radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)", animation: "ctcOrb2 14s ease-in-out infinite alternate", transform: `translateY(${orb2Y}px)` }} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctcDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctcDots)" />
        </svg>
      </div>

      <style>{`
        @keyframes ctcOrb1 { 0% { transform: translate(0,0) scale(1); } 50% { transform: translate(-60px,40px) scale(1.1); } 100% { transform: translate(35px,-70px) scale(0.94); } }
        @keyframes ctcOrb2 { 0% { transform: translate(0,0) scale(1); } 50% { transform: translate(45px,-35px) scale(1.12); } 100% { transform: translate(-30px,50px) scale(0.92); } }
        @keyframes ctcSweep { 0% { opacity:0.7; transform:scale(1) translateX(0); } 100% { opacity:1; transform:scale(1.08) translateX(50px); } }
      `}</style>

      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-14 bg-white/15" />
        <p className="text-[8px] tracking-[0.45em] uppercase text-white/25 font-light" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Costa Mesa · California</p>
        <div className="w-px h-14 bg-white/15" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-36 pb-20">

        <div className="flex items-center gap-1.5 mb-10 justify-center lg:justify-start">
          <Link href="/" className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors cursor-pointer">Home</Link>
          <span className="text-white/20 text-[9px]">/</span>
          <span className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/60">Contact</span>
        </div>

        <div className="max-w-3xl">
          <div className={`flex items-center gap-3 mb-8 transition-all duration-700 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="w-6 h-px bg-white/40 flex-shrink-0" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium">Get in Touch</span>
          </div>

          <h1 className={`leading-[1.0] mb-6 transition-all duration-700 delay-100 text-center lg:text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-light italic text-white/70">Let's Talk About</span>
            <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-bold text-white">Your Program.</span>
          </h1>

          <div ref={lineRef} className="h-px bg-white/20 mb-8 transition-all duration-1000 ease-out max-w-full" style={{ width: "0%" }} />

          <p className={`text-white/55 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light transition-all duration-700 delay-150 text-center lg:text-left mx-auto lg:mx-0 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            We take on a limited number of new clients each quarter. Fill out the form below and we'll reach out within 24 hours to schedule a free 30-minute strategy call — no pitch, just honest advice.
          </p>

          <div className={`flex flex-wrap gap-6 transition-all duration-700 delay-200 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { icon: "ri-phone-line", val: "(714) 300-5115", sub: "Mon–Fri, 9am–6pm PT" },
              { icon: "ri-mail-line", val: "emma@sweetmediaservices.com", sub: "24-hour response" },
              { icon: "ri-map-pin-2-line", val: "Costa Mesa, CA 92627", sub: "Serving clients nationwide" },
            ].map((c) => (
              <div key={c.val} className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 flex-shrink-0">
                  <i className={`${c.icon} text-white/60 text-sm`}></i>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{c.val}</div>
                  <div className="text-[10px] text-white/35">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20">
        <div className="w-px h-8 bg-white/20" />
        <p className="text-[8px] tracking-[0.35em] uppercase text-white/30">Scroll</p>
      </div>
    </section>
  );
}