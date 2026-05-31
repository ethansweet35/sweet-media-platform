'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { videoStories } from "@/mocks/testimonials";

export default function VideoStoriesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-soft-white pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div
          className="max-w-xl mb-12 md:mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Video Stories
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15]">
            Faces of <em className="italic">Recovery</em>
          </h2>
          <p className="text-body-m font-body text-slate leading-relaxed mt-4 max-w-lg">
            Hear directly from the families and individuals whose lives have been
            touched by The Family Recovery Foundation.
          </p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videoStories.map((story, i) => (
            <Link
              key={story.id}
              href={`/testimonials/${story.id}`}
              className="group block"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${i * 80}ms`,
              }}
            >
              {/* Thumbnail with play overlay */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-deep-navy/5 mb-4">
                <Image
                  src={story.thumbnail}
                  alt={story.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/20 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pure-white/90 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <i className="ri-play-fill w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-deep-navy text-xl md:text-2xl ml-1" />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <p className="text-xs font-body text-slate mb-1.5">{story.date}</p>
              <h3 className="text-lg md:text-xl font-display text-deep-navy leading-snug mb-1.5 group-hover:text-tfrf-blue transition-colors duration-200">
                {story.title}
              </h3>
              <p className="text-sm font-body text-slate leading-relaxed">
                {story.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}