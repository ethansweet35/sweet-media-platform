'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const therapyCategories = [
  {
    id: 'trauma',
    label: 'Trauma',
    icon: 'ri-shield-cross-line',
    color: '#C8795A',
    intro: 'Trauma is at the root of most addiction and mental health struggles in women. Our trauma-focused therapies are evidence-based, body-informed, and delivered by specialists who understand the unique ways trauma manifests in women\'s lives.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_trauma01.jpg',
    quote: '"For the first time in 20 years, I feel safe in my own body." — Sarah, Program Graduate',
    modalities: [
      {
        name: 'EMDR Therapy',
        icon: 'ri-eye-line',
        desc: 'Eye Movement Desensitization and Reprocessing uses bilateral stimulation to help the brain reprocess traumatic memories, reducing their emotional charge and allowing genuine healing to occur.',
        benefits: ['Reduces PTSD symptoms', 'Processes traumatic memories', 'Decreases anxiety', 'Improves self-esteem'],
        tag: 'Evidence-Based',
      },
      {
        name: 'Somatic Experiencing',
        icon: 'ri-body-scan-line',
        desc: 'Trauma lives in the body. Somatic Experiencing helps women tune into physical sensations, release stored trauma energy, and restore the nervous system\'s natural capacity for regulation.',
        benefits: ['Releases stored trauma', 'Regulates nervous system', 'Reduces physical symptoms', 'Restores body connection'],
        tag: 'Body-Based',
      },
      {
        name: 'Trauma-Focused CBT',
        icon: 'ri-brain-line',
        desc: 'A specialized adaptation of CBT designed specifically for trauma survivors, helping women identify and transform the thought patterns that keep them stuck in cycles of pain and avoidance.',
        benefits: ['Restructures trauma beliefs', 'Builds coping skills', 'Reduces avoidance', 'Prevents relapse'],
        tag: 'Cognitive',
      },
    ],
  },
  {
    id: 'evidence',
    label: 'Evidence-Based',
    icon: 'ri-microscope-line',
    color: '#6B7D67',
    intro: 'Our evidence-based therapies are the clinical backbone of treatment — rigorously researched, proven effective, and delivered by licensed specialists who bring both expertise and deep compassion to every session.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_evidence01.jpg',
    quote: '"The CBT skills I learned changed how I think about everything." — Maria, IOP Graduate',
    modalities: [
      {
        name: 'Cognitive Behavioral Therapy',
        icon: 'ri-brain-line',
        desc: 'The gold standard of evidence-based psychotherapy. We use CBT to help women identify and transform the thought patterns and behaviors that maintain depression, anxiety, and addiction.',
        benefits: ['Restructures negative thoughts', 'Builds coping skills', 'Reduces anxiety & depression', 'Prevents relapse'],
        tag: 'Gold Standard',
      },
      {
        name: 'Dialectical Behavior Therapy',
        icon: 'ri-scales-3-line',
        desc: 'DBT teaches four core skill sets — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness — transformative for women with intense emotions or trauma histories.',
        benefits: ['Emotional regulation', 'Distress tolerance', 'Mindfulness practices', 'Relationship skills'],
        tag: 'Skills-Based',
      },
      {
        name: 'Acceptance & Commitment Therapy',
        icon: 'ri-heart-line',
        desc: 'ACT helps women develop psychological flexibility — the ability to be present with difficult thoughts and feelings without being controlled by them, building rich and purposeful lives.',
        benefits: ['Psychological flexibility', 'Clarifies personal values', 'Reduces avoidance', 'Builds meaningful life'],
        tag: 'Mindfulness-Based',
      },
    ],
  },
  {
    id: 'holistic',
    label: 'Holistic',
    icon: 'ri-leaf-line',
    color: '#8FA489',
    intro: 'Healing is not only cognitive — it is physical, spiritual, and creative. Our holistic modalities complement clinical therapy by nourishing the whole person and helping women reconnect with their bodies, creativity, and sense of purpose.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_holistic01.jpg',
    quote: '"Yoga therapy gave me back my body. I didn\'t know that was possible." — Jenna, PHP Graduate',
    modalities: [
      {
        name: 'Yoga Therapy',
        icon: 'ri-mental-health-line',
        desc: 'Our 500-hour certified yoga therapists integrate breath work, gentle movement, and mindfulness into a therapeutic practice specifically designed for trauma survivors and women in recovery.',
        benefits: ['Nervous system regulation', 'Body-mind connection', 'Stress reduction', 'Trauma-sensitive movement'],
        tag: 'Body-Based',
      },
      {
        name: 'Art & Expressive Therapy',
        icon: 'ri-palette-line',
        desc: 'Creative expression bypasses the analytical mind and accesses emotions that words alone cannot reach. Our art therapists guide women through painting, collage, and other modalities as a path to insight and healing.',
        benefits: ['Non-verbal processing', 'Emotional expression', 'Builds self-awareness', 'Reduces shame'],
        tag: 'Creative',
      },
      {
        name: 'Mindfulness & Meditation',
        icon: 'ri-focus-3-line',
        desc: 'Daily mindfulness practices — from guided meditation to mindful movement — help women develop the capacity to be present, observe their inner experience without judgment, and respond rather than react.',
        benefits: ['Present-moment awareness', 'Reduces rumination', 'Improves emotional regulation', 'Builds inner peace'],
        tag: 'Mindfulness',
      },
    ],
  },
  {
    id: 'relational',
    label: 'Relational',
    icon: 'ri-group-line',
    color: '#DDA15E',
    intro: 'Women heal in relationship. Our relational therapies harness the power of community, family, and interpersonal connection to create the kind of deep, lasting change that individual work alone cannot achieve.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_relational01.jpg',
    quote: '"Being truly seen by other women was the most healing thing I\'ve ever experienced." — Rachel, Group Therapy',
    modalities: [
      {
        name: 'Group Therapy',
        icon: 'ri-group-line',
        desc: 'There is profound healing in being witnessed by other women who truly understand. Our women-only group therapy sessions create a container of safety, honesty, and mutual support unlike anything in individual therapy.',
        benefits: ['Reduces isolation', 'Builds community', 'Develops interpersonal skills', 'Provides peer support'],
        tag: 'Community',
      },
      {
        name: 'Family Therapy',
        icon: 'ri-home-heart-line',
        desc: 'Addiction and mental health challenges affect the whole family system. Our family therapy sessions help loved ones understand these conditions, heal relational wounds, and build supportive home environments.',
        benefits: ['Heals family relationships', 'Improves communication', 'Establishes boundaries', 'Builds support systems'],
        tag: 'Relational',
      },
      {
        name: 'Interpersonal Therapy',
        icon: 'ri-user-heart-line',
        desc: 'IPT focuses on improving the quality of relationships and social functioning as a direct path to reducing depression and anxiety. Women learn to navigate grief, role transitions, and interpersonal conflicts with skill and grace.',
        benefits: ['Improves relationships', 'Processes grief & loss', 'Navigates life transitions', 'Reduces depression'],
        tag: 'Relational',
      },
    ],
  },
];

const faqs = [
  {
    q: 'How do you decide which therapies are right for me?',
    a: 'During your comprehensive intake assessment, our clinical team evaluates your history, diagnosis, trauma background, and personal goals. We then build a personalized treatment plan that combines the modalities most likely to be effective for your specific situation. This plan is reviewed and adjusted weekly.',
  },
  {
    q: 'How many therapy sessions will I have per week?',
    a: 'It depends on your level of care. In Residential, you\'ll have individual therapy 3–5 times per week plus daily group therapy. In PHP, individual therapy 2–3 times per week plus daily groups. In IOP, individual therapy 1–2 times per week plus group sessions. All levels include holistic programming daily.',
  },
  {
    q: 'Do you offer medication management?',
    a: 'Yes. Our board-certified psychiatrist, Dr. Priya Nair, provides comprehensive psychiatric evaluations and medication management for women who may benefit from pharmacological support alongside therapy. We take a conservative, evidence-based approach to medication.',
  },
  {
    q: 'Can my family be involved in my therapy?',
    a: 'Absolutely — and we strongly encourage it. Family therapy sessions are available at all levels of care. We also offer a Family Education Program that helps loved ones understand addiction and mental health, learn how to support recovery, and heal their own wounds from the impact of these conditions.',
  },
  {
    q: 'Are your therapists specifically trained to work with women?',
    a: 'Yes. Every clinician on our team has specialized training in women\'s mental health, trauma, and gender-responsive care. We believe that women heal differently than men, and our entire clinical model is built around that understanding — from the therapies we use to the way we structure groups and community.',
  },
];

export default function TherapyPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const allModalities = therapyCategories.flatMap((c) => c.modalities.map((m) => m.name));
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/therapy`,
          url: `${siteUrl}/therapy`,
          name: 'Therapy Modalities | EMDR, CBT, DBT & More | Inner Peak Colorado',
          description: 'Inner Peak Colorado offers EMDR, CBT, DBT, ACT, somatic experiencing, yoga therapy, group therapy, and more. Evidence-based, trauma-informed care for women in Colorado.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Therapy', item: `${siteUrl}/therapy` },
            ],
          },
        },
        {
          '@type': 'MedicalWebPage',
          url: `${siteUrl}/therapy`,
          name: 'Therapy Approaches at Inner Peak Colorado',
          about: allModalities.map((name) => ({ '@type': 'MedicalTherapy', name })),
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
    const el = document.getElementById('schema-therapy');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-therapy';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Therapy Modalities | EMDR, CBT, DBT & More | Inner Peak Colorado';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Inner Peak Colorado offers EMDR, CBT, DBT, ACT, somatic experiencing, yoga therapy, group therapy, and more. Evidence-based, trauma-informed care for women in Colorado.');
    return () => { const el2 = document.getElementById('schema-therapy'); if (el2) el2.remove(); };
  }, []);

  const [activeCategory, setActiveCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedModality, setExpandedModality] = useState<number | null>(null);

  const heroParallax = useParallax<HTMLDivElement>({ speed: 0.25, maxOffset: 80 });
  const philParallax = useParallax<HTMLDivElement>({ speed: 0.18, maxOffset: 55 });
  const dayParallax = useParallax<HTMLDivElement>({ speed: 0.15, maxOffset: 45 });
  const ctaParallax = useParallax<HTMLDivElement>({ speed: 0.15, maxOffset: 45 });

  // InView refs
  const [statsRef, statsVisible] = useInView<HTMLDivElement>();
  const [tabsHeaderRef, tabsHeaderVisible] = useInView<HTMLDivElement>();
  const [tabsBarRef, tabsBarVisible] = useInView<HTMLDivElement>();
  const [detailLeftRef, detailLeftVisible] = useInView<HTMLDivElement>();
  const [detailRightRef, detailRightVisible] = useInView<HTMLDivElement>();
  const [philLeftRef, philLeftVisible] = useInView<HTMLDivElement>();
  const [philRightRef, philRightVisible] = useInView<HTMLDivElement>();
  const [dayImgRef, dayImgVisible] = useInView<HTMLDivElement>();
  const [dayTextRef, dayTextVisible] = useInView<HTMLDivElement>();
  const [faqHeaderRef, faqHeaderVisible] = useInView<HTMLDivElement>();
  const [faqListRef, faqListVisible] = useInView<HTMLDivElement>();
  const [ctaImgRef, ctaImgVisible] = useInView<HTMLDivElement>();
  const [ctaTextRef, ctaTextVisible] = useInView<HTMLDivElement>();

  const cat = therapyCategories[activeCategory];

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── Hero ── */}
      <section className="relative w-full min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div ref={heroParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_hero01.jpg"
  alt="Therapy at Inner Peak"
  fill
  className="w-full h-full object-cover object-top"
  priority
/>
</div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/90 via-[#2C3B2E]/65 to-[#2C3B2E]/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/60 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 w-full px-8 md:px-16 pb-20 pt-40">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[{ label: 'Therapy' }]} light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Our Therapies</span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
                  Healing modalities<br />
                  chosen with intention,<br />
                  <em className="text-[#DDA15E]">delivered with soul.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/80 font-light text-lg leading-relaxed">
                  <AutoLinkedTextClient>{"Every therapy we offer has been carefully selected for its proven effectiveness with women — and woven into a holistic, integrated treatment experience that addresses mind, body, and spirit."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
                  >
                    Start Your Journey
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                  <Link
                    href="/virtual-outpatient"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
                  >
                    View Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="w-full bg-[#2C3B2E] py-10 px-8 md:px-16">
        <div ref={statsRef} className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { num: '12+', label: 'Therapeutic Modalities' },
            { num: '100%', label: 'Licensed Clinicians' },
            { num: '50+', label: 'Years Collective Experience' },
            { num: '24/7', label: 'Crisis Support Available' },
          ].map((s, i) => (
            <div key={i} className={`flex flex-col gap-1 text-center lg:text-left anim-hidden anim-fade-up anim-delay-${i + 1} ${statsVisible ? 'anim-visible' : ''}`}>
              <span className="font-serif text-[#DDA15E]" style={{ fontSize: 'clamp(28px, 3vw, 44px)' }}>{s.num}</span>
              <span className="text-[#F0ECE1]/60 text-xs uppercase tracking-widest font-light">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category Tabs + Detail ── */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div ref={tabsHeaderRef} className={`text-center mb-14 flex flex-col gap-3 anim-hidden anim-fade-up ${tabsHeaderVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Therapeutic Modalities</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Our Approaches to Healing</h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"We integrate four pillars of therapeutic care — each essential, each complementing the others."}</AutoLinkedTextClient>
            </p>
          </div>

          {/* Tab Bar */}
          <div ref={tabsBarRef} className={`flex flex-wrap gap-3 justify-center mb-14 anim-hidden anim-fade-up anim-delay-2 ${tabsBarVisible ? 'anim-visible' : ''}`}>
            {therapyCategories.map((cat, i) => (
              <button
                key={i}
                onClick={() => { setActiveCategory(i); setExpandedModality(null); }}
                className={`whitespace-nowrap cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === i
                    ? 'text-[#FAF8F5]'
                    : 'bg-[#F0ECE1] text-[#3A4A3C]/60 hover:text-[#2C3B2E]'
                }`}
                style={activeCategory === i ? { backgroundColor: cat.color } : {}}
              >
                <i className={`${cat.icon} text-base`}></i>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: image + quote */}
            <div ref={detailLeftRef} className={`relative rounded-2xl overflow-hidden anim-hidden anim-fade-right ${detailLeftVisible ? 'anim-visible' : ''}`} style={{ aspectRatio: '4/3' }}>
              <Image
  src={cat.image}
  alt={cat.label}
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#F0ECE1]/90 font-serif italic text-sm leading-relaxed"><AutoLinkedTextClient>{cat.quote}</AutoLinkedTextClient></p>
              </div>
              <div
                className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-medium uppercase tracking-widest"
                style={{ backgroundColor: cat.color }}
              >
                <i className={`${cat.icon}`}></i>
                {cat.label}
              </div>
            </div>

            {/* Right: intro + modality cards */}
            <div ref={detailRightRef} className={`flex flex-col gap-6 anim-hidden anim-fade-left ${detailRightVisible ? 'anim-visible' : ''}`}>
              <p className="text-[#3A4A3C]/70 font-light text-base leading-[1.9]"><AutoLinkedTextClient>{cat.intro}</AutoLinkedTextClient></p>
              <div className="flex flex-col gap-3">
                {cat.modalities.map((mod, i) => (
                  <div
                    key={i}
                    className={`rounded-xl overflow-hidden transition-all duration-300 ${
                      expandedModality === i ? 'bg-[#2C3B2E]' : 'bg-[#F0ECE1] hover:bg-[#EAE5D8]'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedModality(expandedModality === i ? null : i)}
                      className="w-full cursor-pointer flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ backgroundColor: `${cat.color}25` }}
                        >
                          <i className={`${mod.icon} text-sm`} style={{ color: cat.color }}></i>
                        </div>
                        <div>
                          <span className={`font-serif text-base ${expandedModality === i ? 'text-[#FAF8F5]' : 'text-[#2C3B2E]'}`}>{mod.name}</span>
                          <span
                            className="ml-3 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                          >
                            {mod.tag}
                          </span>
                        </div>
                      </div>
                      <i className={`ri-${expandedModality === i ? 'subtract' : 'add'}-line text-sm ${expandedModality === i ? 'text-[#FAF8F5]/60' : 'text-[#3A4A3C]/40'}`}></i>
                    </button>
                    {expandedModality === i && (
                      <div className="px-5 pb-5 flex flex-col gap-4">
                        <p className="text-[#F0ECE1]/70 font-light text-sm leading-[1.8]"><AutoLinkedTextClient>{mod.desc}</AutoLinkedTextClient></p>
                        <div className="grid grid-cols-2 gap-2">
                          {mod.benefits.map((b, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                                <i className="ri-checkbox-circle-line text-xs" style={{ color: cat.color }}></i>
                              </div>
                              <span className="text-xs text-[#F0ECE1]/60 font-light">{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Clinical Philosophy ── */}
      <section className="w-full bg-[#2C3B2E] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={philLeftRef} className={`flex flex-col gap-8 anim-hidden anim-fade-right ${philLeftVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Clinical Philosophy</span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Why women-only<br />
              <em className="text-[#DDA15E]">changes everything.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-[1.9]">
              <AutoLinkedTextClient>{"Research consistently shows that women heal more effectively in gender-responsive environments. When women don't have to manage the social dynamics of mixed-gender settings, they open up more fully, go deeper, and heal faster."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: 'ri-shield-check-line', title: 'Trauma-Informed at Every Level', desc: 'Every interaction — from intake to discharge — is guided by trauma-informed principles of safety, choice, collaboration, and empowerment.' },
                { icon: 'ri-user-heart-line', title: 'Relational, Not Transactional', desc: 'We believe the therapeutic relationship is itself the most powerful healing agent. Our therapists are warm, present, and deeply invested in each woman\'s journey.' },
                { icon: 'ri-flask-line', title: 'Evidence-Based, Whole-Person', desc: 'We combine the rigor of evidence-based practice with the wisdom of holistic healing — because women are not just brains, they are whole human beings.' },
                { icon: 'ri-refresh-line', title: 'Continuously Evolving', desc: 'Our clinical team meets weekly to review cases, update treatment plans, and ensure every woman is receiving the most effective care possible.' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-4 rounded-xl bg-[#FAF8F5]/5 hover:bg-[#FAF8F5]/10 transition-all duration-300 anim-hidden anim-fade-up anim-delay-${i + 1} ${philLeftVisible ? 'anim-visible' : ''}`}>
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#DDA15E]/20 flex-shrink-0 mt-0.5">
                    <i className={`${item.icon} text-sm text-[#DDA15E]`}></i>
                  </div>
                  <div>
                    <p className="text-[#FAF8F5] font-medium text-sm mb-1"><AutoLinkedTextClient>{item.title}</AutoLinkedTextClient></p>
                    <p className="text-[#F0ECE1]/55 font-light text-sm leading-relaxed"><AutoLinkedTextClient>{item.desc}</AutoLinkedTextClient></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div ref={philRightRef} className={`relative rounded-2xl overflow-hidden anim-hidden anim-fade-left ${philRightVisible ? 'anim-visible' : ''}`} style={{ aspectRatio: '3/4' }}>
            <div ref={philParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_philosophy01.jpg"
  alt="Clinical philosophy"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-[#FAF8F5]/10 backdrop-blur-sm rounded-xl p-5 border border-[#FAF8F5]/10">
              <p className="text-[#FAF8F5] font-serif italic text-sm leading-relaxed">
                <AutoLinkedTextClient>{"\"We don't just treat symptoms. We help women understand themselves — and build lives they actually want to live.\""}</AutoLinkedTextClient>
              </p>
              <p className="text-[#DDA15E] text-xs mt-2 font-medium"><AutoLinkedTextClient>{"— Dr. Amara Osei, Clinical Director"}</AutoLinkedTextClient></p>
            </div>
          </div>
        </div>
      </section>

      {/* ── A Day in Therapy ── */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={dayImgRef} className={`relative rounded-2xl overflow-hidden anim-hidden anim-fade-right ${dayImgVisible ? 'anim-visible' : ''}`} style={{ aspectRatio: '4/3' }}>
            <div ref={dayParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_day01.jpg"
  alt="A day in therapy"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
</div>
          </div>
          <div ref={dayTextRef} className={`flex flex-col gap-8 anim-hidden anim-fade-left ${dayTextVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">What to Expect</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
              A day in the life<br />
              <em className="text-[#C8795A]">of healing.</em>
            </h2>
            <p className="text-[#3A4A3C]/70 font-light text-base leading-[1.9]">
              <AutoLinkedTextClient>{"No two days are identical — but every day is intentionally structured to balance clinical depth with rest, community, and joy. Here's a glimpse of what a typical day in our Residential program looks like."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col gap-0">
              {[
                { time: '7:00 AM', activity: 'Morning Yoga & Mindfulness', type: 'Holistic' },
                { time: '8:30 AM', activity: 'Breakfast & Community Time', type: 'Community' },
                { time: '9:30 AM', activity: 'Individual Therapy Session', type: 'Clinical' },
                { time: '11:00 AM', activity: 'DBT Skills Group', type: 'Clinical' },
                { time: '12:30 PM', activity: 'Lunch & Rest', type: 'Wellness' },
                { time: '2:00 PM', activity: 'Trauma Processing Group', type: 'Clinical' },
                { time: '3:30 PM', activity: 'Art Therapy or Nature Walk', type: 'Holistic' },
                { time: '5:00 PM', activity: 'Dinner & Free Time', type: 'Community' },
                { time: '7:00 PM', activity: 'Evening Reflection & Journaling', type: 'Holistic' },
              ].map((item, i) => {
                const typeColors: Record<string, string> = {
                  Clinical: '#C8795A',
                  Holistic: '#8FA489',
                  Community: '#DDA15E',
                  Wellness: '#6B7D67',
                };
                return (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-[#2C3B2E]/8 last:border-0">
                    <span className="text-xs text-[#3A4A3C]/40 font-light w-16 flex-shrink-0">{item.time}</span>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: typeColors[item.type] }}></div>
                    <span className="text-sm text-[#2C3B2E] font-light flex-1">{item.activity}</span>
                    <span
                      className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                      style={{ backgroundColor: `${typeColors[item.type]}15`, color: typeColors[item.type] }}
                    >
                      {item.type}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div ref={faqHeaderRef} className={`text-center mb-14 flex flex-col gap-3 anim-hidden anim-fade-up ${faqHeaderVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Common Questions</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>Therapy FAQs</h2>
          </div>
          <div ref={faqListRef} className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 anim-hidden anim-fade-up anim-delay-${Math.min(i + 1, 6)} ${faqListVisible ? 'anim-visible' : ''} ${openFaq === i ? 'bg-[#2C3B2E]' : 'bg-[#FAF8F5]'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full cursor-pointer flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-serif text-base ${openFaq === i ? 'text-[#FAF8F5]' : 'text-[#2C3B2E]'}`}>{faq.q}</span>
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 ml-4">
                    <i className={`ri-${openFaq === i ? 'subtract' : 'add'}-line text-sm ${openFaq === i ? 'text-[#DDA15E]' : 'text-[#3A4A3C]/40'}`}></i>
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-[#F0ECE1]/70 font-light text-sm leading-[1.9]"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div ref={ctaImgRef} className={`relative min-h-[400px] anim-hidden anim-fade-right ${ctaImgVisible ? 'anim-visible' : ''}`}>
            <div ref={ctaParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/therapy_cta01.jpg"
  alt="Begin your healing"
  fill
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
</div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30"></div>
          </div>
          <div ref={ctaTextRef} className={`bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16 anim-hidden anim-fade-left ${ctaTextVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Begin Your Healing</span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              The right therapist,<br />
              the right modalities,<br />
              <em className="text-[#DDA15E]">chosen just for you.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"Our clinical team will match you with the therapies and therapists best suited to your unique history, diagnosis, and goals. The first step is a free, confidential consultation."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Free Consultation
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+17197338556"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
              >
                <i className="ri-phone-line"></i>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
