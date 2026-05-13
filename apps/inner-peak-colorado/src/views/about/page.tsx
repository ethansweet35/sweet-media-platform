'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const team = [
  {
    name: 'Karynne Witkin, ALM',
    role: 'Chief Executive Officer',
    bio: 'Karynne Witkin is a behavioral healthcare executive with over a decade of experience in mental health and substance use. Holding a Master\'s in Industrial-Organizational Psychology, she is passionate about creating safe, healing spaces for women and building compassionate, highly-aligned teams to deliver quality care.',
    color: '#C8795A',
    // TODO: migrate to Supabase storage — see Batch 6 cleanup
    image: 'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/521f4f896d8c82d7867d9552f69c2acc.png',
  },
  {
    name: 'Stephanie Behrens, LPC, LMFT',
    role: 'Clinical Director / Co-Founder',
    bio: 'Stephanie Behrens is a multi-state Licensed Professional Counselor (LPC) and clinical leader specializing in substance use and mental health. Dedicated to evidence-based, trauma-informed care, she creates safe, transformative spaces for women to heal core wounds, move beyond survival, and build lives of resilience and lasting recovery.',
    color: '#6B7D67',
    // TODO: migrate to Supabase storage — see Batch 6 cleanup
    image: 'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/e4f83cf452dfd55d97475f6ed3b89052.png',
  },
  {
    name: 'Kayli Sullivan-Valdez',
    role: 'Administration Officer / Co-Founder',
    bio: 'With over 12 years in behavioral healthcare and a decade focused on compliance, Kayli builds strong, ethical foundations for quality care. At Inner Peak Wellness, she empowers women to confidently take ownership of their mental health, ensuring they feel supported, connected, and capable of meaningful change.',
    color: '#DDA15E',
    // TODO: migrate to Supabase storage — see Batch 6 cleanup
    image: 'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/a4ad1835b429fb132cf82e4a3ab87678.png',
  },
  {
    name: 'Jennifer Ramsden',
    role: 'Marketing Director / Co-Founder',
    bio: 'Drawing on 10+ years in behavioral health and her own transformative experience in women\'s aftercare, Jen Ramsden is a passionate advocate for gender-specific care. At Inner Peak Wellness, she works alongside a dedicated team to expand access to tailored resources, helping women find peace, healing, and community.',
    color: '#8FA489',
    // TODO: migrate to Supabase storage — see Batch 6 cleanup
    image: 'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/c76334302c7e5e86146b904d7e412cd6.png',
  },
];

const values = [
  { number: '01', title: 'Compassion First', desc: 'Every interaction begins with unconditional positive regard and deep human empathy — before any clinical protocol.', color: '#C8795A' },
  { number: '02', title: 'Whole-Person Healing', desc: 'We treat the mind, body, and spirit — because true recovery honors every dimension of who you are.', color: '#DDA15E' },
  { number: '03', title: 'Clinical Excellence', desc: 'Evidence-based methods, continuously refined by the latest research in women\'s mental health and addiction.', color: '#8FA489' },
  { number: '04', title: 'Community & Connection', desc: 'Healing happens in relationship. Our women-only community is a source of profound, lasting strength.', color: '#C8795A' },
];

const milestones = [
  { year: '2026', label: 'Founded in Colorado' },
  { year: '50+', label: 'Years of collective team experience' },
  { year: '1', label: 'Office location in Colorado' },
  { year: 'Virtual', label: 'Care available throughout all of Colorado' },
];

const healingItems = [
  'Reconnecting with your sense of self',
  'Building emotional resilience',
  'Developing healthy coping strategies',
  'Strengthening relationships and boundaries',
  'Rediscovering purpose and direction',
];

export default function AboutPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/about`,
          url: `${siteUrl}/about`,
          name: 'About Inner Peak Colorado | Women-Owned Mental Health Treatment',
          description: 'Learn about Inner Peak Colorado, a women-owned virtual behavioral health program in Colorado. Meet our clinical team and discover our mission to provide compassionate, evidence-based care for women.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'About', item: `${siteUrl}/about` },
            ],
          },
        },
        {
          '@type': 'MedicalOrganization',
          '@id': `${siteUrl}/#organization`,
          name: 'Inner Peak Colorado',
          url: siteUrl,
          foundingDate: '2026',
          description: 'A women-owned and operated virtual behavioral health program in Colorado, providing evidence-based mental health and addiction treatment exclusively for women.',
          employee: [
            { '@type': 'Person', name: 'Karynne Witkin', jobTitle: 'Chief Executive Officer' },
            { '@type': 'Person', name: 'Stephanie Behrens', jobTitle: 'Clinical Director / Co-Founder' },
            { '@type': 'Person', name: 'Kayli Sullivan-Valdez', jobTitle: 'Administration Officer / Co-Founder' },
            { '@type': 'Person', name: 'Jennifer Ramsden', jobTitle: 'Marketing Director / Co-Founder' },
          ],
          address: {
            '@type': 'PostalAddress',
            streetAddress: '685 Citadel Drive East, Suite #598',
            addressLocality: 'Colorado Springs',
            addressRegion: 'CO',
            postalCode: '80909',
            addressCountry: 'US',
          },
        },
      ],
    };
    const el = document.getElementById('schema-about');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-about';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'About Inner Peak Colorado | Women-Owned Mental Health Treatment';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Learn about Inner Peak Colorado, a women-owned virtual behavioral health program in Colorado. Meet our clinical team and discover our mission for compassionate, evidence-based care for women.');
    return () => { const el2 = document.getElementById('schema-about'); if (el2) el2.remove(); };
  }, []);

  const heroParallax = useParallax<HTMLDivElement>({ speed: 0.2, maxOffset: 60 });
  const womenParallax = useParallax<HTMLDivElement>({ speed: 0.18, maxOffset: 55 });
  const missionTopParallax = useParallax<HTMLDivElement>({ speed: 0.15, maxOffset: 45 });
  const ctaParallax = useParallax<HTMLDivElement>({ speed: 0.15, maxOffset: 45 });

  // InView refs
  const [missionTextRef, missionTextVisible] = useInView<HTMLDivElement>();
  const [missionImgRef, missionImgVisible] = useInView<HTMLDivElement>();
  const [womenImgRef, womenImgVisible] = useInView<HTMLDivElement>();
  const [womenTextRef, womenTextVisible] = useInView<HTMLDivElement>();
  const [supportBannerRef, supportBannerVisible] = useInView<HTMLDivElement>();
  const [valuesHeaderRef, valuesHeaderVisible] = useInView<HTMLDivElement>();
  const [valuesListRef, valuesListVisible] = useInView<HTMLDivElement>();
  const [teamHeaderRef, teamHeaderVisible] = useInView<HTMLDivElement>();
  const [teamGridRef, teamGridVisible] = useInView<HTMLDivElement>();
  const [ctaImgRef, ctaImgVisible] = useInView<HTMLDivElement>();
  const [ctaTextRef, ctaTextVisible] = useInView<HTMLDivElement>();

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── HERO — full-bleed split ── */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left — text panel */}
          <div className="relative bg-[#2C3B2E] flex flex-col justify-center px-10 md:px-16 lg:px-24 xl:px-32 pt-36 pb-20">
            <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }} />
            <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#3A4A3C] blur-[100px] opacity-60 pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-8 max-w-xl">
              <Breadcrumb items={[{ label: 'About' }]} light />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">About Inner Peak Colorado</span>
              <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(38px, 4.5vw, 66px)' }}>
                Built for women.<br />
                <em className="text-[#DDA15E] not-italic">Rooted in Colorado.</em>
              </h1>
              <p className="text-[#F0ECE1]/65 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"Inner Peak Colorado was founded with a singular vision: to create the most compassionate, effective, and beautifully human virtual treatment experience for women navigating mental health and addiction challenges."}</AutoLinkedTextClient>
              </p>
              <div className="flex flex-col gap-3 pt-2">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-5">
                    <span className="font-serif text-[#DDA15E] font-bold text-sm w-10 flex-shrink-0">{m.year}</span>
                    <div className="w-px h-4 bg-[#FAF8F5]/15 flex-shrink-0" />
                    <span className="text-sm text-[#F0ECE1]/55 font-light">{m.label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300 mt-2"
              >
                Begin Your Journey
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
          {/* Right — image panel */}
          <div className="relative w-full h-72 lg:h-auto">
            <div ref={heroParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/abouthero001.jpg"
  alt="Colorado mountain sanctuary"
  fill
  className="w-full h-full object-cover object-center"
  priority
/>
</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/30 via-transparent to-transparent hidden lg:block" />
            <div className="absolute bottom-8 right-8 bg-[#FAF8F5]/95 rounded-2xl px-6 py-5 hidden lg:flex flex-col gap-1">
              <p className="font-serif text-[#2C3B2E] font-bold text-4xl leading-none">2026</p>
              <p className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">Founded in Colorado</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY / MISSION ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={missionTextRef} className={`flex flex-col gap-7 anim-hidden anim-fade-right ${missionTextVisible ? 'anim-visible' : ''}`}>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Our Mission</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.2]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              A place created<br />
              for women.
            </h2>
            <p className="text-[#3A4A3C]/70 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"Our mission at Inner Peak is to create a safe, supportive space where women can heal, rediscover their strengths, and step into the lives they deserve. We recognize that mental health and substance use disorders impact women in unique ways — often shaped by trauma, relationships, societal expectations, and lived experiences that are not always fully understood in traditional treatment settings."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/55 font-light text-base leading-[1.95]">
              <AutoLinkedTextClient>{"As a women-owned and operated program, we are committed to building an environment rooted in compassion, respect, and clinical excellence. Our program was built intentionally for women who are navigating mental health challenges, substance use, or both."}</AutoLinkedTextClient>
            </p>
            <p className="text-[#3A4A3C]/55 font-light text-base leading-[1.95]">
              We understand that many women carry complex stories — of trauma, caregiving, relationships, identity, and pressure. True healing requires connection, trust, and a sense of belonging. <strong className="text-[#2C3B2E]/80 font-medium">This is that place.</strong>
            </p>
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
            >
              Start Your Journey
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
          <div ref={missionImgRef} className={`grid grid-cols-2 gap-4 anim-hidden anim-fade-left ${missionImgVisible ? 'anim-visible' : ''}`}>
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden col-span-2" style={{ height: '280px' }}>
              <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/about001.jpg"
  alt="Women in healing conversation"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
            </div>
            <div className="relative rounded-[0.75rem_2rem_0.75rem_2rem] overflow-hidden" style={{ height: '200px' }}>
              <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/about002.jpg"
  alt="Woman journaling"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
            </div>
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '200px' }}>
              <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/about003.jpg"
  alt="Healing hands with tea"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY WOMEN-ONLY CARE ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#F0ECE1]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={womenImgRef} className={`relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden order-2 lg:order-1 anim-hidden anim-fade-right ${womenImgVisible ? 'anim-visible' : ''}`} style={{ height: '520px' }}>
            <div ref={womenParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/about_women001.jpg"
  alt="Women in supportive healing environment"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
</div>
            <div className="absolute bottom-8 left-8 bg-[#2C3B2E]/90 backdrop-blur-sm rounded-2xl px-6 py-5 max-w-[240px]">
              <p className="font-serif text-[#DDA15E] font-bold text-2xl leading-none mb-1">Women-Owned</p>
              <p className="text-[11px] uppercase tracking-widest text-[#FAF8F5]/70 font-medium"><AutoLinkedTextClient>{"&amp; Operated Program"}</AutoLinkedTextClient></p>
            </div>
          </div>
          <div ref={womenTextRef} className={`flex flex-col gap-8 order-1 lg:order-2 anim-hidden anim-fade-left ${womenTextVisible ? 'anim-visible' : ''}`}>
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Why Women-Only Care Matters</span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.2]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
                A space to speak openly,<br />
                process deeply,<br />
                and <em className="text-[#C8795A] not-italic">rebuild.</em>
              </h2>
              <p className="text-[#3A4A3C]/70 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"Women experience mental health and substance use disorders differently. These experiences are often intertwined with trauma, family dynamics, societal expectations, and roles that can make it difficult to prioritize personal healing."}</AutoLinkedTextClient>
              </p>
              <p className="text-[#3A4A3C]/55 font-light text-base leading-[1.95]">
                <AutoLinkedTextClient>{"We create a space where women can speak openly, process deeply, and rebuild — surrounded by others who understand."}</AutoLinkedTextClient>
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <h3 className="font-serif text-[#2C3B2E] text-xl">Our Approach to Healing</h3>
              <p className="text-[#3A4A3C]/65 font-light text-sm leading-[1.9]">
                <AutoLinkedTextClient>{"We believe in treating the whole person. Our clinical approach is grounded in evidence-based care, trauma-informed practices, and individualized treatment planning. Here, healing includes:"}</AutoLinkedTextClient>
              </p>
              <ul className="flex flex-col gap-3">
                {healingItems.map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 anim-hidden anim-fade-up anim-delay-${i + 1} ${womenTextVisible ? 'anim-visible' : ''}`}>
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-checkbox-circle-line text-[#C8795A] text-base"></i>
                    </div>
                    <span className="text-sm text-[#3A4A3C]/75 font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#3A4A3C]/55 font-light text-sm leading-[1.9] italic mt-1">
                <AutoLinkedTextClient>{"We meet you where you are and walk alongside you as you move forward."}</AutoLinkedTextClient>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WOMEN SUPPORTING WOMEN ── */}
      <section className="w-full bg-[#2C3B2E] relative overflow-hidden py-20 px-8 md:px-16">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        <div ref={supportBannerRef} className={`relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8 anim-hidden anim-fade-up ${supportBannerVisible ? 'anim-visible' : ''}`}>
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Women Supporting Women</span>
          <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(30px, 3.8vw, 52px)' }}>
            This work is personal to us.
          </h2>
          <p className="text-[#F0ECE1]/65 font-light text-base leading-[1.95] max-w-2xl">
            <AutoLinkedTextClient>{"As a women-owned and operated program, we understand. We are committed to creating a space where you feel safe enough to be honest, supported enough to grow, and empowered enough to transform."}</AutoLinkedTextClient>
          </p>
          <div className="w-16 h-px bg-[#DDA15E]/50 my-2"></div>
          <Link
            href="/contact"
            className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
          >
            Begin Your Healing Journey
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="w-full bg-[#2C3B2E] relative overflow-hidden py-24 px-8 md:px-16">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div ref={valuesHeaderRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 anim-hidden anim-fade-up ${valuesHeaderVisible ? 'anim-visible' : ''}`}>
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Our Core Values</span>
              <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
                What we stand for,<br />
                <em className="text-[#DDA15E] not-italic">every single day.</em>
              </h2>
            </div>
            <p className="text-[#F0ECE1]/50 font-light text-base leading-[1.9] lg:max-w-md">
              <AutoLinkedTextClient>{"These aren't aspirational statements — they're the lived commitments that shape every clinical decision, every interaction, and every program we offer."}</AutoLinkedTextClient>
            </p>
          </div>
          <div ref={valuesListRef} className="flex flex-col divide-y divide-[#FAF8F5]/10">
            {values.map((v, i) => (
              <div key={i} className={`group grid grid-cols-[80px_1fr_1.4fr] items-center gap-8 md:gap-16 py-8 cursor-default anim-hidden anim-fade-up anim-delay-${Math.min(i + 1, 6)} ${valuesListVisible ? 'anim-visible' : ''}`}>
                <span className="font-serif font-bold leading-none opacity-25 group-hover:opacity-100 transition-all duration-500" style={{ fontSize: 'clamp(32px, 4vw, 56px)', color: v.color }}>
                  {v.number}
                </span>
                <h3 className="font-serif text-[#FAF8F5] group-hover:text-[#DDA15E] transition-colors duration-300" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
                  {v.title}
                </h3>
                <p className="text-sm text-[#F0ECE1]/45 font-light leading-[1.85] group-hover:text-[#F0ECE1]/80 transition-colors duration-300 hidden sm:block"><AutoLinkedTextClient>{v.desc}</AutoLinkedTextClient></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div ref={teamHeaderRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16 anim-hidden anim-fade-up ${teamHeaderVisible ? 'anim-visible' : ''}`}>
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Our Clinical Team</span>
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 50px)' }}>
                The healers behind<br />
                <em className="text-[#C8795A] not-italic">your journey.</em>
              </h2>
            </div>
            <p className="text-[#3A4A3C]/60 font-light text-base leading-[1.9] lg:max-w-md">
              <AutoLinkedTextClient>{"Every member of our clinical team was chosen not just for their credentials, but for their humanity — their ability to hold space for women in their most vulnerable moments."}</AutoLinkedTextClient>
            </p>
          </div>
          <div ref={teamGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className={`group flex flex-col gap-0 overflow-hidden rounded-[2rem_0.75rem_2rem_0.75rem] bg-[#F0ECE1] anim-hidden anim-fade-up anim-delay-${i + 1} ${teamGridVisible ? 'anim-visible' : ''}`}>
                <div className="relative overflow-hidden" style={{ height: '280px' }}>
                  <Image
  src={member.image}
  alt={member.name}
  fill
  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
  loading="lazy"
/>
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <div className="w-8 h-0.5 rounded-full mb-1" style={{ backgroundColor: member.color }} />
                  <h3 className="font-serif text-[#2C3B2E] text-base leading-snug">{member.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: member.color }}><AutoLinkedTextClient>{member.role}</AutoLinkedTextClient></p>
                  <p className="text-sm text-[#3A4A3C]/55 font-light leading-relaxed mt-1"><AutoLinkedTextClient>{member.bio}</AutoLinkedTextClient></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#F0ECE1] py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          <div ref={ctaImgRef} className={`relative h-64 lg:h-auto overflow-hidden anim-hidden anim-fade-right ${ctaImgVisible ? 'anim-visible' : ''}`}>
            <div ref={ctaParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/aboutcta001.jpg"
  alt="Woman at mountain peak"
  fill
  className="w-full h-full object-cover object-center"
  loading="lazy"
/>
</div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F0ECE1]/40 hidden lg:block" />
          </div>
          <div ref={ctaTextRef} className={`flex flex-col justify-center gap-7 px-10 md:px-16 py-16 anim-hidden anim-fade-left ${ctaTextVisible ? 'anim-visible' : ''}`}>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Ready to meet<br />your team?
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.9] max-w-sm">
              <AutoLinkedTextClient>{"Schedule a free, confidential consultation with one of our intake specialists. No commitment required — just a conversation."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300"
              >
                Schedule a Free Call
                <i className="ri-phone-line"></i>
              </Link>
              <Link
                href="/what-we-treat"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
              >
                What We Treat
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
