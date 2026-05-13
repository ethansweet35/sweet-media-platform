import Link from 'next/link';
import { AutoLinkedText } from "@sweetmedia/blog-core";

const conditions = [
  { name: 'PTSD & Trauma', icon: 'ri-heart-line', color: '#C8795A' },
  { name: 'Postpartum Depression & Anxiety', icon: 'ri-heart-pulse-line', color: '#6B7D67' },
  { name: 'Imposter Syndrome', icon: 'ri-user-star-line', color: '#DDA15E' },
  { name: 'Eating Disorders', icon: 'ri-seedling-line', color: '#8FA489' },
  { name: 'Grief & Loss', icon: 'ri-hand-heart-line', color: '#C8795A' },
  { name: 'Bipolar Disorder', icon: 'ri-scales-3-line', color: '#6B7D67' },
  { name: 'Co-Occurring Disorders', icon: 'ri-links-line', color: '#DDA15E' },
];

export default function WhatWeTreatSection() {
  return (
    <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16 anim-fade-up anim-visible">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8795A] font-medium">What We Treat</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
              Whatever you're carrying,<br />
              you don't have to carry<br />
              <em className="text-[#6B7D67] not-italic">it alone.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.9]">
              <AutoLinkedText>{"We specialize in the full spectrum of women's mental health and addiction challenges — with clinical depth, genuine warmth, and a deep respect for each woman's unique story."}</AutoLinkedText>
            </p>
            <Link
              href="/what-we-treat"
              className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
            >
              View All Conditions
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>

        {/* Condition Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {conditions.map((c, i) => (
            <Link
              key={i}
              href="/what-we-treat"
              className={`group flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-[#F0ECE1] rounded-2xl px-4 py-4 sm:px-5 hover:bg-[#2C3B2E] transition-all duration-300 cursor-pointer overflow-hidden anim-scale anim-delay-${Math.min(i + 1, 6)} anim-visible`}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300 group-hover:bg-[#FAF8F5]/10"
                style={{ backgroundColor: `${c.color}18` }}
              >
                <i className={`${c.icon} text-sm transition-colors duration-300 group-hover:text-[#FAF8F5]`} style={{ color: c.color }}></i>
              </div>
              <span className="text-xs sm:text-sm font-light text-[#2C3B2E] group-hover:text-[#FAF8F5] transition-colors duration-300 leading-snug break-words min-w-0">
                {c.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
