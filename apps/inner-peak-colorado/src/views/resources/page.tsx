'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';

const categories = ['All', 'Mental Health', 'Addiction Recovery', 'Holistic Wellness', 'Women\'s Health'];

const articles = [
  {
    category: 'Mental Health',
    title: 'Understanding Complex PTSD: A Guide for Women',
    excerpt: 'Complex PTSD differs from single-incident trauma in important ways. Learn how it develops, how it shows up in daily life, and what evidence-based treatments offer the most hope for healing.',
    readTime: '8 min read',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/res001.jpg',
    color: '#C8795A',
  },
  {
    category: 'Addiction Recovery',
    title: 'The Unique Challenges Women Face in Addiction Recovery',
    excerpt: 'Women\'s addiction journeys are shaped by distinct biological, psychological, and social factors. Understanding these differences is the first step toward finding care that truly works.',
    readTime: '6 min read',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/res002.jpg',
    color: '#6B7D67',
  },
  {
    category: 'Holistic Wellness',
    title: 'How Nature Heals: The Science of Ecotherapy',
    excerpt: 'Decades of research confirm what our ancestors knew intuitively — time in nature reduces cortisol, improves mood, and accelerates healing. Here\'s what the science says and how to bring it into your recovery.',
    readTime: '5 min read',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/res003.jpg',
    color: '#DDA15E',
  },
  {
    category: 'Women\'s Health',
    title: 'Hormones and Mental Health: What Every Woman Should Know',
    excerpt: 'The relationship between hormonal fluctuations and mental health is profound and often underappreciated. From PMS to perimenopause, understanding your hormones can transform your healing journey.',
    readTime: '7 min read',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/res004.jpg',
    color: '#8FA489',
  },
  {
    category: 'Mental Health',
    title: 'DBT Skills for Everyday Life: A Practical Guide',
    excerpt: 'Dialectical Behavior Therapy offers four powerful skill sets that can transform how you navigate emotions, relationships, and difficult moments. Here\'s how to start using them today.',
    readTime: '10 min read',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/res005.jpg',
    color: '#C8795A',
  },
  {
    category: 'Addiction Recovery',
    title: 'Building a Recovery Support Network That Actually Works',
    excerpt: 'Isolation is one of the greatest threats to long-term recovery. Learn how to intentionally build a network of support — from family and friends to peer communities and professional care.',
    readTime: '6 min read',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/res006.jpg',
    color: '#6B7D67',
  },
];

const crisisResources = [
  { name: 'National Crisis Hotline', number: '988', desc: 'Call or text 988 for immediate mental health support, 24/7.' },
  { name: 'SAMHSA Helpline', number: '1-800-662-4357', desc: 'Free, confidential treatment referrals for mental health and substance use disorders.' },
  { name: 'National DV Hotline', number: '1-800-799-7233', desc: 'Support for survivors of domestic violence, 24/7, confidential.' },
  { name: 'Inner Peak Crisis Line', number: '719-733-8556', desc: 'Our clinical team is available around the clock for current and prospective clients.' },
];

export default function ResourcesPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/resources`,
          url: `${siteUrl}/resources`,
          name: 'Mental Health & Recovery Resources for Women | Inner Peak Colorado',
          description: 'Curated articles, guides, and crisis resources on mental health, addiction recovery, trauma, and women\'s wellness from Inner Peak Colorado\'s clinical team.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Resources', item: `${siteUrl}/resources` },
            ],
          },
        },
        {
          '@type': 'ItemList',
          name: 'Mental Health & Recovery Articles',
          itemListElement: articles.map((a, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: a.title,
            description: a.excerpt,
          })),
        },
      ],
    };
    const el = document.getElementById('schema-resources');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-resources';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Mental Health & Recovery Resources for Women | Inner Peak Colorado';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Curated articles, guides, and crisis resources on mental health, addiction recovery, trauma, and women\'s wellness from Inner Peak Colorado\'s clinical team.');
    return () => { const el2 = document.getElementById('schema-resources'); if (el2) el2.remove(); };
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <main className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative w-full pt-32 pb-24 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/reshero001.jpg"
  alt="Resources"
  fill
  className="w-full h-full object-cover object-top"
  priority
/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/85 via-[#2C3B2E]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: 'Resources' }]} light />
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium block mb-6 mt-6">Resources</span>
            <h1 className="font-serif text-[#FAF8F5] leading-[1.15] mb-6" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
              Knowledge is the<br />
              beginning of<br />
              <em className="text-[#DDA15E]">healing.</em>
            </h1>
            <p className="text-[#F0ECE1]/80 font-light text-lg leading-relaxed max-w-xl">
              Thoughtfully curated articles, guides, and tools to support women at every stage of their healing journey.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Resources */}
      <section className="w-full bg-[#C8795A] py-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FAF8F5]/20 flex-shrink-0">
              <i className="ri-alarm-warning-line text-[#FAF8F5] text-lg"></i>
            </div>
            <h3 className="font-serif text-[#FAF8F5] text-xl">Crisis Resources — Available 24/7</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {crisisResources.map((r, i) => (
              <div key={i} className="bg-[#FAF8F5]/10 rounded-xl p-5 flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest text-[#FAF8F5]/70 font-medium">{r.name}</p>
                <p className="font-serif text-[#FAF8F5] text-xl">{r.number}</p>
                <p className="text-xs text-[#FAF8F5]/70 font-light leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Articles & Guides</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Healing Wisdom</h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap cursor-pointer px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#2C3B2E] text-[#FAF8F5]'
                    : 'bg-[#F0ECE1] text-[#3A4A3C] hover:bg-[#2C3B2E]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <article key={i} className="group bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-300">
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
  src={article.image}
  alt={article.title}
  fill
  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
/>
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full text-[#FAF8F5]"
                      style={{ backgroundColor: article.color }}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-7 flex flex-col gap-3 flex-1">
                  <h3 className="font-serif text-[#2C3B2E] text-lg leading-snug">{article.title}</h3>
                  <p className="text-sm text-[#3A4A3C]/60 font-light leading-relaxed flex-1">{article.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-[#2C3B2E]/10">
                    <span className="text-xs text-[#6B7D67] font-light uppercase tracking-wide">{article.readTime}</span>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <i className="ri-arrow-right-line text-[#6B7D67] group-hover:translate-x-1 transition-transform duration-300"></i>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#2C3B2E] py-20 px-8 md:px-16 text-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 items-center">
          <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            Ready to go beyond reading?
          </h2>
          <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
            Knowledge is powerful — but healing happens in relationship. Take the next step and connect with our clinical team today.
          </p>
          <Link
            href="/contact"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
          >
            Begin Your Journey
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>
    </main>
  );
}
