"use client";

import { useEffect, useRef, useState } from "react";
import LazyImage from "@/components/base/LazyImage";

const team = [
  {
    name: "Ethan Sweet",
    role: "Founder",
    bio: "Ethan founded Sweet Media after spending years watching behavioral health facilities struggle with generic marketing agencies that didn't understand the industry. He built Sweet Media to be the agency he wished existed — one that speaks the language of treatment, understands compliance, and measures success in admissions, not impressions.",
    photo: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img2.png",
    tags: ["Strategy", "Business Dev", "Client Relations"],
    number: "01",
  },
  {
    name: "Jake Champion",
    role: "SEO Lead",
    bio: "Jake leads all organic search strategy at Sweet Media. With deep expertise in behavioral health SEO — from technical audits to AI-optimized content — he's responsible for the rankings that drive consistent, high-intent traffic to our clients' facilities.",
    photo: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img1.png",
    tags: ["Organic SEO", "Local SEO", "Technical SEO"],
    number: "02",
  },
  {
    name: "Nick Sperr",
    role: "Google Ads Lead",
    bio: "Nick owns all Google Ads strategy at Sweet Media. From LegitScript-compliant campaign builds to precision keyword targeting and bid optimization, he consistently delivers CPAs well below industry benchmarks for behavioral health programs across the country.",
    photo: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img6.png",
    tags: ["Google Ads", "PPC", "Search Strategy"],
    number: "03",
  },
  {
    name: "Casey Sullivan",
    role: "Meta Ads Lead",
    bio: "Casey leads all Meta advertising at Sweet Media, specializing in compliant creative strategy and audience targeting for behavioral health programs. She has a proven track record of building high-ROAS campaigns on Facebook and Instagram that reach families at the right moment with the right message.",
    photo: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img5.png",
    tags: ["Meta Ads", "Facebook", "Creative Strategy"],
    number: "04",
  },
  {
    name: "Emma Ford",
    role: "Business Development",
    bio: "Emma is the first person most clients talk to at Sweet Media. She leads new client relationships, ensures every onboarding is seamless, and serves as the bridge between client goals and our internal strategy team. Her background in behavioral health operations gives her a unique perspective on what facilities actually need.",
    photo: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img3.png",
    tags: ["Client Relations", "Onboarding", "Strategy"],
    number: "05",
  },
  {
    name: "Sean McPheeters",
    role: "Lead Developer",
    bio: "Sean builds and maintains the websites, landing pages, and conversion infrastructure that power our clients' digital presence. From high-converting admissions pages to full facility website builds, he ensures every pixel is optimized for both user experience and search performance.",
    photo: "https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/img4.png",
    tags: ["Web Dev", "CRO", "UX Design"],
    number: "06",
  },
];

export default function AboutTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tapped, setTapped] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const isExpanded = (i: number) => hovered === i || tapped === i;

  return (
    <section ref={sectionRef} id="about-team" className="w-full bg-[#f8f7f4] py-[60px] md:py-[100px] overflow-hidden">

      {/* Header */}
      <div className={`px-4 md:px-10 max-w-screen-xl mx-auto mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
          <div className="w-8 h-px bg-[#0A1F44]" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">The Team</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <h2
            className="text-4xl md:text-5xl font-bold text-black leading-tight text-center lg:text-left"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Six Specialists.
            <br />
            <em className="font-light italic" style={{ color: "#0A1F44" }}>One Focus.</em>
          </h2>
          <p className="text-black/50 text-sm leading-relaxed max-w-md text-center lg:text-left mx-auto lg:mx-0">
            Every person at Sweet Media was hired for one reason — deep expertise in behavioral health marketing. No generalists, no junior coordinators. Just specialists who know your world.
          </p>
        </div>
      </div>

      {/* Cards row */}
      <div
        className={`px-4 md:px-10 max-w-screen-xl mx-auto transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {team.map((member, i) => (
            <div
              key={member.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setTapped(tapped === i ? null : i)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Square image — no crop, full display */}
              <div className="relative w-full overflow-hidden rounded-xl bg-[#e8e6e1]" style={{ aspectRatio: "1 / 1" }}>
                <LazyImage
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />

                {/* Subtle hover tint */}
                <div
                  className="absolute inset-0 bg-[#0A1F44] rounded-xl transition-opacity duration-400"
                  style={{ opacity: isExpanded(i) ? 0.18 : 0 }}
                />

                {/* Number badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/40">
                    {member.number}
                  </span>
                </div>
              </div>

              {/* Info panel below image */}
              <div className="pt-3 pb-1 flex flex-col flex-1">
                {/* Role */}
                <span className="text-[8px] tracking-[0.28em] uppercase text-[#0A1F44]/60 font-semibold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {member.role}
                </span>

                {/* Name */}
                <h3
                  className="text-sm font-bold text-black leading-snug mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {member.name}
                </h3>

                {/* Bio — revealed on hover or tap */}
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: isExpanded(i) ? "160px" : "0px",
                    opacity: isExpanded(i) ? 1 : 0,
                  }}
                >
                  <p className="text-[10px] text-black/55 leading-relaxed mb-3">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[7px] tracking-widest uppercase text-[#0A1F44]/70 border border-[#0A1F44]/20 px-1.5 py-0.5 rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Thin underline accent */}
                <div
                  className="mt-3 h-px bg-[#0A1F44] transition-all duration-400 origin-left"
                  style={{ transform: isExpanded(i) ? "scaleX(1)" : "scaleX(0.25)", opacity: isExpanded(i) ? 0.5 : 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hint */}
      <div className={`px-4 md:px-10 max-w-screen-xl mx-auto mt-8 transition-all duration-700 delay-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[10px] text-black/30 tracking-widest uppercase hidden md:block">
          Hover any card to read their bio
        </p>
        <p className="text-[10px] text-black/30 tracking-widest uppercase md:hidden">
          Tap any card to read their bio
        </p>
      </div>

    </section>
  );
}