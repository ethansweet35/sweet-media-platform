"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const services = [
  {
    icon: "ri-calendar-schedule-line",
    title: "Content & Posting",
    desc: "Monthly content calendars, custom graphics, and multi-platform publishing — so your feed always looks as good as your outcomes.",
    stat: "8.7%",
    statLabel: "Avg. Engagement Rate",
  },
  {
    icon: "ri-chat-heart-line",
    title: "Community Management",
    desc: "Every DM, comment, and review handled with empathy and speed — 24/7. Families in crisis reach out through social before they call.",
    stat: "<2 hr",
    statLabel: "Avg. Response Time",
  },
  {
    icon: "ri-star-line",
    title: "Reputation & Reviews",
    desc: "Systemized review generation, cross-platform response management, and real-time monitoring to protect and grow your star rating.",
    stat: "4.9★",
    statLabel: "Avg. Rating Managed",
  },
];

const reviews = [
  { name: "Rachel M.", text: "California Prime Recovery saved my life. The staff treated me with dignity at my lowest point. 14 months sober and thriving.", rating: 5, tag: "Alumni" },
  { name: "David K.", text: "From intake to discharge, every team member was compassionate and genuinely invested in my recovery.", rating: 5, tag: "Alumni" },
  { name: "Sandra L.", text: "As a parent, I was terrified. Rize OC walked us through everything. My son just celebrated one year sober.", rating: 5, tag: "Family" },
  { name: "Kevin T.", text: "The clinical team here is second to none. I finally felt heard and understood. 8 months clean.", rating: 5, tag: "Alumni" },
];

export default function SocialMediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={sectionRef} id="social-media-services" className="w-full bg-[#f4f6f9] py-[50px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Social Media Management</span>
              </div>
              <h2 className="text-[36px] md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your Brand Should Look
                <br />
                <em className="font-light italic" style={{color:'#0A1F44'}}>as Good as Your Outcomes.</em>
              </h2>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-black/60 text-[14px] md:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                We manage your presence, community, and reputation across every platform — so your team stays focused on patient care while your social builds census.
              </p>
            </div>
          </div>
        </div>

        {/* Service cards + reputation panel */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl p-6 md:p-7 flex flex-col gap-4 hover:bg-white/80 border border-black/5 transition-colors duration-300 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A1F44]/8 group-hover:bg-[#0A1F44] transition-colors duration-300">
                <i className={`${s.icon} text-[#0A1F44] text-base group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-black mb-2">{s.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-black/8">
                <span className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.stat}</span>
                <span className="text-[10px] uppercase tracking-widest text-black/40 ml-2">{s.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reputation panel + CTA */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

          {/* Rotating reviews */}
          <div className="bg-white rounded-2xl overflow-hidden border border-black/5">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/6">
              <span className="text-sm font-semibold text-black">Reputation Monitor</span>
              <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1">
                <i className="ri-star-fill text-yellow-400 text-xs"></i>
                <span className="text-xs font-bold text-yellow-700">4.9 Overall</span>
              </div>
            </div>
            <div className="px-6 py-5 border-b border-black/6">
              <div className="flex items-end gap-4 mb-3">
                <div className="text-5xl font-bold text-black leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>4.9</div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map((s) => <i key={s} className="ri-star-fill text-yellow-400 text-base"></i>)}
                  </div>
                  <div className="text-xs text-black/45">Based on 847 reviews</div>
                </div>
              </div>
              {[
                { label: "5 stars", pct: 91 },
                { label: "4 stars", pct: 6 },
                { label: "3 stars", pct: 2 },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-black/40 w-10 flex-shrink-0">{r.label}</span>
                  <div className="flex-1 h-1.5 bg-black/8 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#0A1F44] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {reviews[current].name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-black">{reviews[current].name}</span>
                    <span className="text-[10px] bg-black/6 text-black/45 px-2 py-0.5 rounded-full">{reviews[current].tag}</span>
                  </div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map((s) => <i key={s} className="ri-star-fill text-yellow-400 text-xs"></i>)}
                  </div>
                  <p className="text-sm leading-relaxed italic" style={{color:'#0A1F44'}}>"{reviews[current].text}"</p>
                </div>
              </div>
              <div className="flex justify-center gap-1.5">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-4 h-1.5 bg-[#0A1F44]" : "w-1.5 h-1.5 bg-black/15"}`} />
                ))}
              </div>
            </div>
          </div>

          {/* CTA card */}
          <div className="bg-white rounded-2xl p-8 flex flex-col justify-between border border-black/8">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#0A1F44] font-semibold">Full Social Suite</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                Your social presence, fully managed — from content to crisis response.
              </h3>
              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  "Monthly content calendar & custom graphics",
                  "Instagram, Facebook, LinkedIn & YouTube",
                  "24/7 DM & comment response",
                  "Crisis escalation protocol",
                  "Review generation & monitoring",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#0A1F44] flex-shrink-0">
                      <i className="ri-check-line text-white text-[9px]"></i>
                    </div>
                    <span className="text-sm text-black/65">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/social-media"
                className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-xl hover:bg-[#0d2a5e] transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Learn More
                <i className="ri-arrow-right-line text-sm"></i>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
