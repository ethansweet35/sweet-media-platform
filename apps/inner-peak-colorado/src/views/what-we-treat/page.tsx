'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';

const categories = [
  {
    id: 'mental-health',
    label: 'Mental Health',
    color: '#6B7D67',
    icon: 'ri-mental-health-line',
    intro: 'Our mental health programs are built around the understanding that women\'s psychological experiences are shaped by unique biological, hormonal, and social factors. Every treatment plan is personalized, evidence-based, and delivered with deep compassion.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_mh001.jpg',
    items: [
      { name: 'Depression', icon: 'ri-cloud-line', desc: 'Major depressive disorder, persistent depressive disorder, postpartum depression, and treatment-resistant depression — addressed with compassion and clinical precision using CBT, medication management, and holistic support.' },
      { name: 'Anxiety Disorders', icon: 'ri-heart-pulse-line', desc: 'Generalized anxiety, panic disorder, social anxiety, and phobias — using evidence-based CBT, mindfulness, somatic approaches, and nervous system regulation techniques.' },
      { name: 'PTSD & Complex Trauma', icon: 'ri-shield-line', desc: 'Trauma-informed EMDR, somatic experiencing, and narrative therapy to help women process and integrate their most difficult experiences at a pace that feels safe.' },
      { name: 'Bipolar Disorder', icon: 'ri-scales-3-line', desc: 'Comprehensive mood stabilization, psychoeducation, and lifestyle support for women navigating the complexities of bipolar I and II — with a focus on long-term wellness.' },
      { name: 'OCD', icon: 'ri-loop-left-line', desc: 'Exposure and response prevention (ERP) therapy combined with ACT to help women reclaim their lives from obsessive-compulsive patterns with evidence-based, compassionate care.' },
      { name: 'Eating Disorders', icon: 'ri-seedling-line', desc: 'Anorexia, bulimia, binge eating disorder, and ARFID — treated with a weight-neutral, body-positive, trauma-informed approach that honors each woman\'s relationship with her body.' },
    ],
  },
  {
    id: 'addiction',
    label: 'Addiction & Substance Use',
    color: '#C8795A',
    icon: 'ri-drop-line',
    intro: 'Women\'s addiction journeys are shaped by distinct biological, psychological, and social factors. Our gender-responsive addiction treatment integrates medical care, trauma processing, and community support to address the whole person — not just the substance.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_add001.jpg',
    items: [
      { name: 'Alcohol Use Disorder', icon: 'ri-goblet-line', desc: 'Medical detox coordination, motivational interviewing, and long-term relapse prevention strategies tailored specifically for women — addressing the unique ways alcohol affects the female body and psyche.' },
      { name: 'Opioid Addiction', icon: 'ri-capsule-line', desc: 'MAT-supported recovery, trauma processing, and community connection for women healing from opioid dependence — with compassionate, non-judgmental clinical care at every step.' },
      { name: 'Stimulant Use Disorder', icon: 'ri-flashlight-line', desc: 'Cocaine, methamphetamine, and prescription stimulant addiction — addressed with behavioral therapies, holistic support, and a deep understanding of the trauma that often underlies stimulant use.' },
      { name: 'Benzodiazepine Dependence', icon: 'ri-medicine-bottle-line', desc: 'Safe, medically supervised tapering protocols combined with anxiety management, nervous system regulation, and trauma-informed therapy to support lasting recovery.' },
      { name: 'Cannabis Use Disorder', icon: 'ri-leaf-line', desc: 'Motivational enhancement therapy and CBT for women seeking to change their relationship with cannabis — without shame, without judgment, and with genuine clinical support.' },
      { name: 'Co-Occurring Disorders', icon: 'ri-links-line', desc: 'Integrated dual-diagnosis treatment for women navigating both mental health and substance use challenges simultaneously — because these conditions are deeply interconnected and must be treated together.' },
    ],
  },
  {
    id: 'life-transitions',
    label: 'Life Transitions & Trauma',
    color: '#DDA15E',
    icon: 'ri-compass-3-line',
    intro: 'Life\'s most profound transitions — loss, relationship trauma, motherhood, identity shifts — can shake a woman to her core. Our specialized programs provide the clinical depth and human warmth needed to navigate these passages with grace and resilience.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_lt001.jpg',
    items: [
      { name: 'Grief & Loss', icon: 'ri-heart-line', desc: 'Compassionate support for women navigating the loss of a loved one, a relationship, an identity, or a life chapter — honoring grief as a sacred process rather than a problem to be fixed.' },
      { name: 'Relationship Trauma', icon: 'ri-hand-heart-line', desc: 'Healing from domestic violence, emotional abuse, narcissistic relationships, and attachment wounds — with trauma-informed therapy that rebuilds safety, trust, and self-worth.' },
      { name: 'Perinatal Mental Health', icon: 'ri-parent-line', desc: 'Prenatal and postpartum depression, anxiety, and birth trauma — specialized care for mothers at every stage, honoring the profound identity transformation that motherhood brings.' },
      { name: 'Life Transitions', icon: 'ri-road-map-line', desc: 'Divorce, career change, empty nest, menopause, retirement — support for women navigating profound identity shifts and the grief and possibility that come with them.' },
    ],
  },
];

const stats = [
  { value: '16+', label: 'Conditions Treated', color: '#C8795A' },
  { value: '50+', label: 'Years Collective Experience', color: '#6B7D67' },
  { value: '12+', label: 'Therapeutic Modalities', color: '#DDA15E' },
  { value: '100%', label: 'Licensed Clinicians', color: '#8FA489' },
];

const faqs = [
  { q: 'Do I need a diagnosis to start treatment?', a: 'No. Many women come to us without a formal diagnosis. Our clinical team will conduct a thorough assessment and help clarify what you\'re experiencing — and what care would be most helpful.' },
  { q: 'What if I have more than one condition?', a: 'Co-occurring conditions are extremely common, and we specialize in integrated dual-diagnosis treatment. We treat the whole person, not individual diagnoses in isolation.' },
  { q: 'Is virtual treatment as effective for these conditions?', a: 'Research consistently shows that virtual treatment produces outcomes equivalent to in-person care for the conditions we treat. For many women, the comfort and privacy of home actually enhances the therapeutic experience.' },
  { q: 'How do I know which program is right for me?', a: 'Our intake team will conduct a free, confidential clinical assessment and recommend the level of care that best fits your unique situation, history, and goals.' },
];

export default function WhatWeTreatPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const allConditions = categories.flatMap((c) => c.items.map((item) => item.name));
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/what-we-treat`,
          url: `${siteUrl}/what-we-treat`,
          name: 'What We Treat | Women\'s Mental Health & Addiction | Inner Peak Colorado',
          description: 'Inner Peak Colorado treats depression, anxiety, PTSD, trauma, addiction, eating disorders, bipolar disorder, and more. Gender-specific, evidence-based care for women in Colorado.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'What We Treat', item: `${siteUrl}/what-we-treat` },
            ],
          },
        },
        {
          '@type': 'MedicalWebPage',
          url: `${siteUrl}/what-we-treat`,
          name: 'Conditions Treated at Inner Peak Colorado',
          about: allConditions.map((name) => ({ '@type': 'MedicalCondition', name })),
          audience: { '@type': 'Patient', requiredGender: 'Female' },
          medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    };
    const el = document.getElementById('schema-what-we-treat');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-what-we-treat';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'What We Treat | Women\'s Mental Health & Addiction | Inner Peak Colorado';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Inner Peak Colorado treats depression, anxiety, PTSD, trauma, addiction, eating disorders, bipolar disorder, and more. Gender-specific, evidence-based care for women in Colorado.');
    return () => { const el2 = document.getElementById('schema-what-we-treat'); if (el2) el2.remove(); };
  }, []);

  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const cat = categories[activeCategory];

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_hero001.jpg"
  alt="What we treat at Inner Peak Colorado"
  fill
  className="w-full h-full object-cover object-center"
  priority
/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E] via-[#2C3B2E]/60 to-[#2C3B2E]/20" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pb-16 pt-36">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <Breadcrumb items={[{ label: 'What We Treat' }]} light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
              <div className="flex flex-col gap-5">
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(38px, 5vw, 68px)' }}>
                  Whatever you're carrying,<br />
                  you don't have to carry<br />
                  <em className="text-[#DDA15E] not-italic">it alone.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  We specialize in the full spectrum of women's mental health and addiction challenges — with clinical depth, genuine warmth, and a deep respect for each woman's unique story and lived experience.
                </p>
                <Link
                  href="/contact"
                  className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
                >
                  Talk to Someone Now
                  <i className="ri-phone-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="w-full bg-[#2C3B2E] py-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <p className="font-serif text-[#FAF8F5] font-bold leading-none" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: s.color }}>{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#F0ECE1]/45 font-light">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORY TABS + CONTENT ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">

          {/* Tab bar */}
          <div className="flex flex-wrap gap-3 mb-14 border-b border-[#F0ECE1] pb-6">
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`whitespace-nowrap cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                  activeCategory === i ? 'text-[#FAF8F5]' : 'bg-[#F0ECE1] text-[#3A4A3C] hover:bg-[#2C3B2E]/8'
                }`}
                style={activeCategory === i ? { backgroundColor: c.color } : {}}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className={`${c.icon} text-xs`}></i>
                </div>
                {c.label}
              </button>
            ))}
          </div>

          {/* Category intro — image + text split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
                {cat.label}
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">{cat.intro}</p>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-8 h-px" style={{ backgroundColor: cat.color }}></div>
                <span className="text-[11px] uppercase tracking-widest font-medium" style={{ color: cat.color }}>
                  {cat.items.length} conditions treated
                </span>
              </div>
            </div>
            <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '300px' }}>
              <Image
  src={cat.image}
  alt={cat.label}
  fill
  className="w-full h-full object-cover object-center"
/>
            </div>
          </div>

          {/* Condition cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cat.items.map((item, i) => (
              <div
                key={`${activeCategory}-${i}`}
                className="group bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-4 hover:bg-[#2C3B2E] transition-all duration-500 cursor-default"
              >
                <div
                  className="w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 group-hover:bg-[#FAF8F5]/10"
                  style={{ backgroundColor: `${cat.color}18` }}
                >
                  <i className={`${item.icon} text-lg transition-colors duration-500 group-hover:text-[#FAF8F5]`} style={{ color: cat.color }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-xl group-hover:text-[#FAF8F5] transition-colors duration-500">{item.name}</h3>
                <p className="text-sm text-[#3A4A3C]/65 font-light leading-[1.85] group-hover:text-[#F0ECE1]/65 transition-colors duration-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH — dark split ── */}
      <section className="w-full bg-[#2C3B2E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
          {/* Image */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_approach001.jpg"
  alt="Our clinical approach"
  fill
  className="w-full h-full object-cover object-center"
/>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/50 hidden lg:block" />
          </div>
          {/* Text */}
          <div className="flex flex-col justify-center gap-8 px-10 md:px-16 py-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Our Clinical Approach</span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Evidence-based care,<br />
              <em className="text-[#DDA15E] not-italic">delivered with soul.</em>
            </h2>
            <p className="text-[#F0ECE1]/60 font-light text-base leading-[1.95] max-w-md">
              Our clinical team uses the most rigorously tested therapeutic modalities — CBT, DBT, EMDR, ACT, and motivational interviewing — adapted specifically for women's unique neurological, hormonal, and relational needs.
            </p>
            <div className="flex flex-col gap-3">
              {['Trauma-informed at every level of care', 'Gender-responsive treatment design', 'Integrated dual-diagnosis capability', 'Holistic wellness woven throughout'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-checkbox-circle-line text-sm text-[#8FA489]"></i>
                  </div>
                  <span className="text-sm text-[#F0ECE1]/65 font-light">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/therapy"
              className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF8F5] hover:text-[#2C3B2E] transition-all duration-300"
            >
              Explore Our Therapies
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY WOMEN-ONLY ── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center flex flex-col gap-4 mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Why Women-Only Care</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Gender-responsive treatment<br />
              <em className="text-[#C8795A] not-italic">changes outcomes.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-brain-line', color: '#C8795A', title: 'Different Biology', desc: 'Women metabolize substances differently, experience hormonal influences on mood, and respond to trauma in neurologically distinct ways. Our treatment accounts for all of this.' },
              { icon: 'ri-group-line', color: '#6B7D67', title: 'Safer Disclosure', desc: 'Research shows women are more likely to disclose trauma, abuse, and shame in women-only settings — and that deeper disclosure leads to deeper healing.' },
              { icon: 'ri-heart-line', color: '#DDA15E', title: 'Shared Experience', desc: 'The bonds formed between women in treatment are themselves therapeutic. Peer connection, mutual recognition, and community are core parts of our clinical model.' },
              { icon: 'ri-shield-check-line', color: '#8FA489', title: 'Reduced Re-traumatization', desc: 'For women with histories of trauma involving men, a women-only environment removes a significant barrier to engagement and authentic participation in treatment.' },
              { icon: 'ri-seedling-line', color: '#C8795A', title: 'Identity-Affirming', desc: 'Our programs honor the full complexity of women\'s identities — including race, culture, sexuality, and life stage — in ways that mixed-gender programs often cannot.' },
              { icon: 'ri-compass-3-line', color: '#6B7D67', title: 'Better Outcomes', desc: 'Studies consistently show that women in gender-specific treatment programs have higher completion rates, lower relapse rates, and stronger long-term recovery outcomes.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#FAF8F5] rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-7 flex flex-col gap-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-full" style={{ backgroundColor: `${item.color}15` }}>
                  <i className={`${item.icon} text-lg`} style={{ color: item.color }}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-lg">{item.title}</h3>
                <p className="text-sm text-[#3A4A3C]/60 font-light leading-[1.85]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#FAF8F5] py-24 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center flex flex-col gap-4 mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C8795A] font-medium">Common Questions</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Questions about what we treat
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#F0ECE1] rounded-2xl overflow-hidden bg-[#FAF8F5]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left cursor-pointer hover:bg-[#F0ECE1] transition-colors duration-300"
                >
                  <span className="font-serif text-[#2C3B2E] text-base pr-6">{faq.q}</span>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className={`text-[#6B7D67] text-lg transition-transform duration-300 ${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'}`}></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6">
                    <p className="text-sm text-[#3A4A3C]/65 font-light leading-[1.9]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#3A4A3C] py-20 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Not sure if we treat<br />what you're experiencing?
            </h2>
            <p className="text-[#F0ECE1]/60 font-light text-base leading-[1.9] max-w-md">
              Call us. Our intake specialists will listen without judgment and help you find the right path forward — whether that's with us or another provider.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Talk to Someone Now
                <i className="ri-phone-line"></i>
              </Link>
              <Link
                href="/virtual-outpatient"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#FAF8F5]/10 transition-all duration-300"
              >
                View Programs
              </Link>
            </div>
          </div>
          <div className="relative rounded-[2rem_0.75rem_2rem_0.75rem] overflow-hidden" style={{ height: '280px' }}>
            <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/wt_cta001.jpg"
  alt="Reach out for support"
  fill
  className="w-full h-full object-cover object-center"
/>
          </div>
        </div>
      </section>

    </main>
  );
}
