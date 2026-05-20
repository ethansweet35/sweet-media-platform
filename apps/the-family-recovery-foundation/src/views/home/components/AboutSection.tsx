'use client';

import { useState } from "react";
import { HOME_ABOUT_VIDEO_POSTER, HOME_ABOUT_VIDEO_SRC } from "@/lib/home-media";
import { SOCIAL_LINKS } from "@/lib/tfrf-nav";

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="about" className="bg-pure-white pt-20 md:pt-24 lg:pt-28 pb-8 md:pb-10 lg:pb-12 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-6 md:mb-8">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            About The Family Recovery Foundation
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15]">
            Nationwide Recovery Support, Built Around <em className="italic">Families</em>
          </h2>
        </div>

        {/* 16:9 video — full content width */}
        <div className="relative mb-6 md:mb-8">
          <div className="absolute -inset-x-3 -inset-y-3 rounded-3xl bg-mist/60 -z-10 hidden md:block" />
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-deep-navy shadow-xl ring-1 ring-mist/80">
            {!isPlaying ? (
              <>
                <img
                  src={HOME_ABOUT_VIDEO_POSTER}
                  alt="The Family Recovery Foundation introduction video"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-deep-navy/50 flex items-center justify-center group-hover:bg-deep-navy/65 group-hover:scale-105 transition-all duration-300 backdrop-blur-sm ring-2 ring-pure-white/30">
                    <i className="ri-play-fill text-pure-white text-3xl md:text-4xl ml-1" />
                  </div>
                </button>
              </>
            ) : (
              <video
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster={HOME_ABOUT_VIDEO_POSTER}
              >
                <source src={HOME_ABOUT_VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        {/* Supporting content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 lg:items-stretch">
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
            <div className="space-y-4">
              <p className="text-body-m font-body text-slate leading-relaxed">
                At The Family Recovery Foundation, we have built a nationwide network of certified counselors,
                peer advocates, and community partners — all committed to delivering exceptional recovery
                support through an innovative, family-centered approach.
              </p>
              <p className="text-body-m font-body text-slate leading-relaxed">
                Our services foster prevention, education, and lasting support, with a strong focus on
                client needs. Every day, we cultivate a flexible and supportive environment that encourages
                healing, growth, and generational change for families in recovery.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 lg:pt-2 border-t border-mist lg:mt-auto">
              <div className="w-11 h-11 rounded-full bg-soft-white flex items-center justify-center shrink-0 ring-1 ring-mist">
                <i className="ri-quill-pen-line text-tfrf-blue text-xl" />
              </div>
              <div>
                <p className="text-body-s font-body font-semibold text-deep-navy">Ryan Soares</p>
                <p className="text-caption font-body text-slate">
                  CEO &amp; Founder of The Family Recovery Foundation
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-5 rounded-2xl border border-mist bg-soft-white p-5 md:p-6">
            <div>
              <p className="text-caption font-body font-semibold uppercase tracking-[0.12em] text-tfrf-blue mb-2">
                Reach our team
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-deep-navy">
                <a
                  href="tel:8889648825"
                  className="text-[20px] md:text-[22px] hover:text-tfrf-blue transition-colors duration-200"
                >
                  888-964-8825
                </a>
                <span className="text-stone-blue text-sm">or</span>
                <a
                  href="tel:9497010145"
                  className="text-[20px] md:text-[22px] hover:text-tfrf-blue transition-colors duration-200"
                >
                  949-701-0145
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-s font-body font-semibold text-deep-navy">Families Reached</span>
                <span className="text-body-s font-body font-semibold text-deep-navy">247+</span>
              </div>
              <div className="h-1.5 bg-mist rounded-full overflow-hidden">
                <div className="h-full bg-tfrf-blue rounded-full" style={{ width: "78%" }} />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1 lg:mt-auto">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full border border-mist bg-pure-white flex items-center justify-center transition-all duration-200 hover:bg-tfrf-blue hover:border-tfrf-blue hover:text-pure-white ${social.color}`}
                >
                  <i className={`${social.icon} text-lg`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
