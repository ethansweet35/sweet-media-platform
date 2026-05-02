"use client";

import { useEffect, useRef, useState } from "react";
import LazyImage from "@/components/base/LazyImage";

const industries = [
  {
    num: "01",
    icon: "ri-home-heart-line",
    label: "Residential Treatment",
    shortDesc: "Full-service marketing for 30, 60 & 90-day programs. We fill your census with patients ready for long-term recovery.",
    challenges: [
      "Long sales cycle — families research for weeks before calling",
      "High cost-per-admission makes every lead precious",
      "Competition from national chains with bigger budgets",
      "Insurance verification adds friction to the intake process",
    ],
    solutions: [
      "SEO-first content strategy targeting 'best residential treatment' and location-specific terms",
      "Paid media campaigns optimized for qualified admissions, not just clicks",
      "Landing pages with insurance verification and family resources",
      "Retargeting sequences that nurture families through the decision window",
    ],
    stats: [
      { val: "+41%", label: "Census Growth" },
      { val: "$310", label: "Cost/Admission" },
      { val: "3.2×", label: "ROI" },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/ind01.jpg",
    bg: "bg-white",
    cardBg: "bg-[#f4f6f9]",
    imageRight: false,
  },
  {
    num: "02",
    icon: "ri-heart-pulse-line",
    label: "Detox & PHP Programs",
    shortDesc: "Urgency-optimized campaigns for detox and partial hospitalization. Meet patients at their moment of need.",
    challenges: [
      "Patients search in crisis — you have minutes, not days, to respond",
      "High call volume but low admission rate from unqualified leads",
      "Google restricts detox ads, requiring creative campaign structures",
      "Bed availability changes daily, making inventory management critical",
    ],
    solutions: [
      "24/7 call tracking and rapid-response landing pages for crisis searches",
      "Geo-fenced campaigns targeting emergency rooms and crisis centers",
      "Local SEO dominance for 'detox near me' and 'PHP program' searches",
      "Real-time bed availability integration with ad spend allocation",
    ],
    stats: [
      { val: "87", label: "Monthly Intakes" },
      { val: "$280", label: "Avg. CPA" },
      { val: "68%", label: "Answer Rate" },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/ind02.jpg",
    bg: "bg-[#f4f6f9]",
    cardBg: "bg-white",
    imageRight: true,
  },
  {
    num: "03",
    icon: "ri-map-pin-2-line",
    label: "Outpatient & IOP",
    shortDesc: "Local and regional marketing for intensive outpatient programs. Own your market and convert searchers to intakes.",
    challenges: [
      "Local competition is fierce — every IOP in your zip code is bidding on the same keywords",
      "Patients often choose based on proximity and convenience",
      "Lower revenue per patient means marketing must be highly efficient",
      "Insurance networks vary widely, complicating targeting",
    ],
    solutions: [
      "Hyper-local SEO with neighborhood-level landing pages and GBP optimization",
      "Program-specific campaigns for evening IOP, weekend IOP, and virtual options",
      "Insurance-focused ad copy and landing pages for in-network patients",
      "Review generation systems that build local authority and trust",
    ],
    stats: [
      { val: "+198%", label: "Organic Traffic" },
      { val: "Top 3", label: "Local Pack" },
      { val: "$180", label: "Avg. CPA" },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/ind03.jpg",
    bg: "bg-white",
    cardBg: "bg-[#f4f6f9]",
    imageRight: false,
  },
  {
    num: "04",
    icon: "ri-building-line",
    label: "Sober Living Homes",
    shortDesc: "Consistent occupancy through digital visibility. Connect transitional housing programs with the right clients.",
    challenges: [
      "Stigma around sober living makes families hesitant to search openly",
      "High turnover means you need a constant pipeline of new residents",
      "Competition from unregulated facilities damages category trust",
      "Most leads come from treatment center referrals, not direct search",
    ],
    solutions: [
      "SEO content that ranks for 'sober living near me' and 'transitional housing'",
      "Partnership funnels with residential treatment centers for warm handoffs",
      "Family-focused landing pages that address concerns about safety and structure",
      "Social proof campaigns featuring resident success stories (anonymized)",
    ],
    stats: [
      { val: "96%", label: "Avg. Occupancy" },
      { val: "+58%", label: "Inquiries YoY" },
      { val: "42", label: "Partner Referrals/Mo" },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/ind04.jpg",
    bg: "bg-[#f4f6f9]",
    cardBg: "bg-white",
    imageRight: true,
  },
  {
    num: "05",
    icon: "ri-brain-line",
    label: "Dual Diagnosis",
    shortDesc: "Nuanced, compliant campaigns for co-occurring disorders. Clinical credibility meets precision targeting.",
    challenges: [
      "Complex clinical messaging requires deep understanding of both addiction and mental health",
      "Families are overwhelmed and need education before they'll reach out",
      "Higher treatment costs mean longer decision cycles and more objections",
      "Regulatory scrutiny is highest for dual-diagnosis advertising",
    ],
    solutions: [
      "Educational content funnels that build trust before asking for contact info",
      "Clinical credibility signals — staff bios, accreditation badges, outcome data",
      "Segmented campaigns for anxiety + addiction, depression + addiction, PTSD + addiction",
      "Family-focused nurture sequences that address the 'is this the right place?' question",
    ],
    stats: [
      { val: "$280", label: "Avg. CPA" },
      { val: "+226%", label: "Lead Volume" },
      { val: "74%", label: "Family Conversion" },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/ind05.jpg",
    bg: "bg-white",
    cardBg: "bg-[#f4f6f9]",
    imageRight: false,
  },
  {
    num: "06",
    icon: "ri-mental-health-line",
    label: "Mental Health Practices",
    shortDesc: "Grow your patient pipeline with authority marketing. From group therapy practices to psychiatric clinics.",
    challenges: [
      "Patients search for specific conditions, not general 'mental health' terms",
      "Telehealth competition has exploded, expanding your competitive set nationally",
      "Insurance verification is the #1 friction point in the intake process",
      "Stigma still prevents many from seeking help — messaging must be empathetic",
    ],
    solutions: [
      "Condition-specific SEO — depression, anxiety, bipolar, OCD, trauma — each with dedicated content",
      "Telehealth-optimized campaigns that compete nationally while feeling local",
      "Insurance-first landing pages with real-time verification and accepted plans",
      "Empathetic ad copy and content that meets patients where they are emotionally",
    ],
    stats: [
      { val: "161", label: "New Patients/Mo" },
      { val: "+340%", label: "SEO Traffic" },
      { val: "89%", label: "Insurance Match" },
    ],
    image: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/ind06.jpg",
    bg: "bg-[#f4f6f9]",
    cardBg: "bg-white",
    imageRight: true,
  },
];

function IndustrySection({ ind, index }: { ind: typeof industries[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`w-full ${ind.bg} py-[90px] px-4 md:px-6`}>
      <div className="max-w-screen-xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center ${ind.imageRight ? "lg:grid-flow-dense" : ""}`}>

          {/* Image */}
          <div className={`relative overflow-hidden rounded-3xl transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${ind.imageRight ? "lg:col-start-2" : ""}`}>
            <div className="relative w-full h-[340px] md:h-[420px]">
              <LazyImage
                src={ind.image}
                alt={ind.label}
                className="w-full h-full object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-3xl" />
            {/* Number badge */}
            <div className="absolute top-6 left-6">
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-bold bg-white text-black px-3.5 py-1.5 rounded-full whitespace-nowrap"
              >
                {ind.num} / 06
              </span>
            </div>
            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-5">
              {ind.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/55 mt-0.5">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={`${ind.imageRight ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            {/* Label */}
            <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${ind.bg === "bg-white" ? "bg-[#0A1F44]/8" : "bg-[#0A1F44]/10"}`}>
                  <i className={`${ind.icon} text-[#0A1F44] text-base`}></i>
                </div>
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">{ind.label}</span>
              </div>
              <h2
                className="text-3xl md:text-4xl xl:text-5xl font-bold text-black leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {ind.label}
              </h2>
              <p className="text-black/60 text-sm leading-relaxed mb-8 max-w-lg">{ind.shortDesc}</p>
            </div>

            {/* Challenges + Solutions cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {/* Challenges */}
              <div className={`${ind.cardBg} rounded-2xl p-6`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-red-500/10 flex-shrink-0">
                    <i className="ri-error-warning-line text-red-500 text-xs"></i>
                  </div>
                  <h4 className="text-xs font-bold text-black uppercase tracking-widest">Challenges</h4>
                </div>
                <ul className="space-y-3">
                  {ind.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-black/60 leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solutions */}
              <div className={`${ind.cardBg} rounded-2xl p-6`}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500/10 flex-shrink-0">
                    <i className="ri-check-double-line text-emerald-600 text-xs"></i>
                  </div>
                  <h4 className="text-xs font-bold text-black uppercase tracking-widest">Our Solutions</h4>
                </div>
                <ul className="space-y-3">
                  {ind.solutions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-black/60 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA link */}
            <div className={`mt-7 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <a
                href="#industries-contact"
                className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
              >
                Get a Strategy for {ind.label}
                <i className="ri-arrow-right-line text-sm"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function IndustriesDetail() {
  return (
    <div id="industries-detail">
      {/* Intro header — sits above all industry sections */}
      <div className="w-full bg-white pt-[100px] pb-16 px-4 md:px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
            <div className="w-8 h-px bg-[#0A1F44]" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Deep Expertise</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Every Program Type Has
              <br />
              <em className="font-light italic" style={{ color: '#0A1F44' }}>Unique Challenges.</em>
            </h2>
            <p className="text-black/55 text-sm leading-relaxed max-w-md text-center lg:text-right mx-auto lg:mx-0">
              We go deep on six behavioral health specialties. Scroll through each one to see the specific marketing challenges we solve and the strategies that drive real admissions growth.
            </p>
          </div>
        </div>
      </div>

      {/* One full section per industry */}
      {industries.map((ind, i) => (
        <IndustrySection key={ind.label} ind={ind} index={i} />
      ))}

      {/* Bottom CTA strip */}
      <div className="w-full bg-white px-4 md:px-6 pb-[100px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-[#0A1F44] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-white font-semibold text-base mb-1">Don't see your specialty listed?</p>
              <p className="text-white/55 text-sm">We work with all behavioral health program types. Let's talk about your specific market.</p>
            </div>
            <a
              href="#industries-contact"
              className="inline-flex items-center gap-2.5 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-xl hover:bg-white/90 transition-colors duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
            >
              Book a Free Call
              <i className="ri-arrow-right-line text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}