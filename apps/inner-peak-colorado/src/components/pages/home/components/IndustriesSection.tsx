"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const industries = [
  {
    num: "01",
    icon: "ri-mental-health-line",
    label: "Mental Health",
    desc: "Authority marketing for psychiatric clinics, group therapy practices, and individual practitioners. Build trust and fill your appointment calendar.",
    stats: [{ val: "30+", label: "New Patients/Mo" }, { val: "+340%", label: "SEO Traffic" }],
  },
  {
    num: "02",
    icon: "ri-heart-pulse-line",
    label: "Addiction Treatment",
    desc: "Full-funnel marketing for residential, detox, PHP, IOP, and sober living programs. Meet patients and families at their moment of need.",
    stats: [{ val: "+41%", label: "Census Growth" }, { val: "$6,000", label: "Avg. cost per admit" }],
  },
  {
    num: "03",
    icon: "ri-brain-line",
    label: "Dual Diagnosis",
    desc: "Nuanced, compliant campaigns for co-occurring mental health and substance use disorders. Clinical credibility meets precision targeting.",
    stats: [{ val: "+226%", label: "Lead Volume" }, { val: "$3500", label: "Avg. cost per admit" }],
  },
  {
    num: "04",
    icon: "ri-parent-line",
    label: "Teen Programs",
    desc: "Family-focused marketing for adolescent residential, PHP, and IOP programs. Reach parents searching for help for their child.",
    stats: [{ val: "+67%", label: "Inquiry Growth" }, { val: "Top 3", label: "Local Pack" }],
  },
  {
    num: "05",
    icon: "ri-file-list-3-line",
    label: "Medical Billing",
    desc: "Targeted B2B digital marketing for medical billing companies serving behavioral health. Generate qualified leads from treatment centers seeking billing partners.",
    stats: [{ val: "+73%", label: "Lead Growth" }, { val: "$190", label: "Cost/Lead" }],
  },
  {
    num: "06",
    icon: "ri-test-tube-line",
    label: "Toxicology Labs",
    desc: "Specialized marketing for toxicology labs building referral pipelines with treatment facilities. Grow your book of business in a compliant, competitive space.",
    stats: [{ val: "+88%", label: "Referral Growth" }, { val: "Top 5", label: "Search Ranking" }],
  },
];

export default function IndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="w-full bg-[#f4f6f9] py-[50px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Who We Work With</span>
              </div>
              <div>
              <h2 className="text-[36px] md:text-5xl font-bold text-black leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Built Exclusively for
                <br />
                <em className="font-light italic" style={{color:'#0A1F44'}}>Behavioral Health.</em>
              </h2>
              <Link href="/industries" className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-[0.2em] uppercase font-semibold text-[#0A1F44] hover:text-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap">
                View All Industries
                <i className="ri-arrow-right-line text-sm"></i>
              </Link>
            </div>
            </div>
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-black/60 text-[14px] md:text-sm leading-relaxed max-w-md">
                We don't serve every industry — we go deep on one. Every strategy is built on real behavioral health market knowledge, compliance expertise, and verified results.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-6 w-full max-w-md">
                {[
                  { val: "6", label: "Specialties" },
                  { val: "40+", label: "Active Clients" },
                  { val: "100%", label: "BH Focused" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center lg:items-start gap-1">
                    <span className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</span>
                    <span className="text-[10px] uppercase tracking-widest text-black/40">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Industry grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {industries.map((ind, i) => (
            <div
              key={ind.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative bg-white rounded-2xl p-6 md:p-7 border transition-all duration-300 cursor-default overflow-hidden ${hovered === i ? "border-[#0A1F44]/25 bg-[#eef1f8]" : "border-black/6"}`}
            >
              {/* Number watermark */}
              <span
                className="absolute top-4 right-5 text-5xl font-bold leading-none select-none transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif", color: hovered === i ? "rgba(10,31,68,0.14)" : "rgba(0,0,0,0.10)" }}
              >
                {ind.num}
              </span>

              <div className={`w-10 h-10 flex items-center justify-center rounded-xl mb-4 transition-colors duration-300 ${hovered === i ? "bg-[#0A1F44]" : "bg-[#0A1F44]/15"}`}>
                <i className={`${ind.icon} text-base transition-colors duration-300 ${hovered === i ? "text-white" : "text-[#0A1F44]"}`}></i>
              </div>

              <h3 className="text-[15px] md:text-base font-bold text-black mb-2">{ind.label}</h3>
              <p className="text-[14px] md:text-sm text-black/55 leading-relaxed mb-5">{ind.desc}</p>

              <div className="flex gap-5 pt-4 border-t border-black/6">
                {ind.stats.map((s) => (
                  <div key={s.label}>
                    <span className="text-lg font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</span>
                    <div className="text-[10px] uppercase tracking-widest text-black/40 mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className={`mt-10 bg-[#0A1F44] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <p className="text-white font-semibold text-base mb-1">Don't see your specialty listed?</p>
            <p className="text-white/55 text-sm">We work with all behavioral health program types. Let's talk about your specific market.</p>
          </div>
          <a
            href="#getting-started"
            onClick={(e) => { e.preventDefault(); document.querySelector("#getting-started")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2.5 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-xl hover:bg-white/90 transition-colors duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            Book a Free Call
            <i className="ri-arrow-right-line text-sm"></i>
          </a>
        </div>

      </div>
    </section>
  );
}
