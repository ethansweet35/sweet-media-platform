"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

interface BlogLink {
  slug: string;
  title: string;
  category: string;
}

interface BlogLinksSectionProps {
  title: string;
  subtitle: string;
  links: BlogLink[];
  bgColor?: string;
}

export default function BlogLinksSection({ title, subtitle, links, bgColor = "#f4f6f9" }: BlogLinksSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden" style={{ background: bgColor }}>
      <div className="max-w-screen-xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium mb-4">From the Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {links.map((link) => (
            <Link
              key={link.slug}
              href={`/blog/${link.slug}`}
              className="group flex flex-col gap-3 p-5 bg-white border border-black/8 rounded-2xl hover:border-black/20 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-black/35">{link.category}</span>
              <h3 className="text-sm font-semibold text-black/80 leading-snug group-hover:text-black transition-colors">
                {link.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-black/40 group-hover:text-black/60 transition-colors mt-auto">
                <span>Read article</span>
                <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5"></i>
              </div>
            </Link>
          ))}
        </div>

        <div className={`flex justify-center mt-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2.5 bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-6 py-3.5 rounded-full hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap"
          >
            View All Insights
            <i className="ri-arrow-right-line text-sm"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}