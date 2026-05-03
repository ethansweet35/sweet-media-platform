'use client';
import type React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';

const beliefs = [
  { icon: 'ri-women-line', text: 'Women-owned and operated — this work is personal to us.' },
  { icon: 'ri-heart-line', text: 'Gender-responsive, trauma-informed care produces measurably better outcomes.' },
  { icon: 'ri-seedling-line', text: 'Healing honors the whole woman — mind, body, and spirit.' },
];

export default function PhilosophySection() {
  const [imgRef, imgVisible] = useInView<HTMLDivElement>();
  const [textRef, textVisible] = useInView<HTMLDivElement>();
  const imgParallax = useParallax<HTMLDivElement>({ speed: 0.15, maxOffset: 50 });
  return (
    <section className="w-full bg-[#2C3B2E] relative overflow-hidden">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">

        {/* Left — full-bleed image panel */}
        <div ref={imgRef} className={`relative w-full h-72 lg:h-auto overflow-hidden anim-hidden anim-fade-right ${imgVisible ? 'anim-visible' : ''}`}>
          <div ref={imgParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/phil003.jpg"
  alt="Woman in quiet contemplation by a Colorado mountain lake"
  fill
  className="w-full h-full object-cover object-center"
  loading="lazy"
/>
</div>
          {/* Subtle right-side fade into the dark bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2C3B2E]/60 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/50 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right — text content */}
        <div ref={textRef} className={`flex flex-col justify-center gap-10 px-10 md:px-16 py-20 anim-hidden anim-fade-left ${textVisible ? 'anim-visible' : ''}`}>

          {/* Section label — plain text, no badge */}
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">
            Our Philosophy
          </span>

          <h2
            className="font-serif text-[#FAF8F5] leading-[1.15]"
            style={{ fontSize: 'clamp(34px, 3.8vw, 58px)' }}
          >
            Healing is not linear.<br />
            It is rooted, seasonal,<br />
            and deeply{' '}
            <em className="text-[#DDA15E] not-italic">yours.</em>
          </h2>

          <p className="text-[#F0ECE1]/65 font-light text-base leading-[1.95] max-w-md">
            Our mission at Inner Peak is to create a safe, supportive space where women can heal, rediscover their strengths, and step into the lives they deserve. As a women-owned and operated program, we are committed to compassion, respect, and clinical excellence.
          </p>

          {/* Core beliefs — clean list, no floating cards */}
          <ul className="flex flex-col gap-5">
            {beliefs.map((b, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FAF8F5]/8 flex-shrink-0 mt-0.5">
                  <i className={`${b.icon} text-[#8FA489] text-sm`} />
                </div>
                <p className="text-sm text-[#F0ECE1]/70 font-light leading-relaxed">{b.text}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/about"
            className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF8F5] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] hover:text-[#FAF8F5] transition-all duration-300"
          >
            Our Story
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
