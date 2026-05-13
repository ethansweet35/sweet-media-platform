'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

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
              <AutoLinkedTextClient>{"Thoughtfully curated articles, guides, and tools to support women at every stage of their healing journey."}</AutoLinkedTextClient>
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
                <p className="text-xs uppercase tracking-widest text-[#FAF8F5]/70 font-medium"><AutoLinkedTextClient>{r.name}</AutoLinkedTextClient></p>
                <p className="font-serif text-[#FAF8F5] text-xl"><AutoLinkedTextClient>{r.number}</AutoLinkedTextClient></p>
                <p className="text-xs text-[#FAF8F5]/70 font-light leading-relaxed"><AutoLinkedTextClient>{r.desc}</AutoLinkedTextClient></p>
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

          <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-10 md:p-14 text-center">
            <p className="text-[#3A4A3C]/70 font-light text-base md:text-lg leading-relaxed">
              <AutoLinkedTextClient>{"New articles are coming soon. Check back shortly for fresh resources from our team."}</AutoLinkedTextClient>
            </p>
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
            <AutoLinkedTextClient>{"Knowledge is powerful — but healing happens in relationship. Take the next step and connect with our clinical team today."}</AutoLinkedTextClient>
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
