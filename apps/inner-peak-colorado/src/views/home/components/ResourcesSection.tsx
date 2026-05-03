'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from '@/hooks/useInView';

const articles = [
  {
    category: 'Mental Health',
    title: 'Understanding Complex PTSD: A Guide for Women',
    readTime: '8 min read',
    color: '#C8795A',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/reshome001.jpg',
  },
  {
    category: 'Addiction Recovery',
    title: 'The Unique Challenges Women Face in Addiction Recovery',
    readTime: '6 min read',
    color: '#6B7D67',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/reshome002.jpg',
  },
  {
    category: 'Holistic Wellness',
    title: 'How Nature Heals: The Science of Ecotherapy',
    readTime: '5 min read',
    color: '#DDA15E',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/reshome003.jpg',
  },
];

export default function ResourcesSection() {
  const [headerRef, headerVisible] = useInView<HTMLDivElement>();
  const [cardsRef, cardsVisible] = useInView<HTMLDivElement>();
  return (
    <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 anim-hidden anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Resources</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
              Knowledge is the<br />
              <em className="text-[#C8795A] not-italic">beginning of healing.</em>
            </h2>
          </div>
          <Link
            href="/resources"
            className="whitespace-nowrap cursor-pointer self-start md:self-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
          >
            All Articles
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        {/* Article Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-7">
          {articles.map((a, i) => (
            <Link
              key={i}
              href="/resources"
              className={`group bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-300 anim-hidden anim-fade-up anim-delay-${i + 1} ${cardsVisible ? 'anim-visible' : ''}`}
            >
              <div className="relative w-full overflow-hidden" style={{ height: '210px' }}>
                <Image
  src={a.image}
  alt={a.title}
  fill
  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
  loading="lazy"
/>
                <div className="absolute top-3 left-3">
                  <span
                    className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full text-[#FAF8F5]"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.category}
                  </span>
                </div>
              </div>
              <div className="p-7 flex flex-col gap-3 flex-1">
                <h3 className="font-serif text-[#2C3B2E] text-lg leading-snug">{a.title}</h3>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#2C3B2E]/8">
                  <span className="text-xs text-[#6B7D67] font-light uppercase tracking-wide">{a.readTime}</span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-[#6B7D67] group-hover:translate-x-1 transition-transform duration-300"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
