'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";


const steps = [
  {
    num: '01',
    icon: 'ri-phone-line',
    color: '#C8795A',
    title: 'Free Consultation Call',
    duration: '20–30 min',
    desc: 'Call or submit the form below and one of our compassionate intake specialists will reach out within hours. This is a no-pressure, completely confidential conversation — just us listening to your story.',
    details: ['Available 24 hours a day, 7 days a week', 'No commitment or obligation required', 'Completely confidential & HIPAA-compliant', 'Speak with a real person, not a bot'],
  },
  {
    num: '02',
    icon: 'ri-stethoscope-line',
    color: '#6B7D67',
    title: 'Clinical Assessment',
    duration: '45–60 min',
    desc: 'A licensed clinician conducts a thorough, compassionate evaluation of your history, current symptoms, support system, and goals. This helps us understand exactly where you are and what level of care will serve you best.',
    details: ['Conducted by a licensed clinician', 'Covers mental health, trauma & substance history', 'Completely judgment-free environment', 'Leads directly to a personalized treatment plan'],
  },
  {
    num: '03',
    icon: 'ri-shield-check-line',
    color: '#DDA15E',
    title: 'Insurance Verification',
    duration: 'Same day',
    desc: 'Our admissions team handles all insurance verification on your behalf — completely free. We\'ll walk you through exactly what your plan covers before you make any decisions, so there are no surprises.',
    details: ['We verify benefits at no cost to you', 'Work with most major insurance plans', 'Transparent cost breakdown upfront', 'Financing options available if needed'],
  },
  {
    num: '04',
    icon: 'ri-computer-line',
    color: '#8FA489',
    title: 'Tech Setup & Onboarding',
    duration: '30 min',
    desc: 'We walk you through our secure, HIPAA-compliant video platform step by step. You\'ll meet your primary therapist, get introduced to your group, and have every question answered before your first session.',
    details: ['Works on any smartphone, tablet, or computer', 'HIPAA-compliant video platform', 'Meet your therapist before day one', 'Full orientation to your schedule & program'],
  },
  {
    num: '05',
    icon: 'ri-heart-line',
    color: '#C8795A',
    title: 'Begin Your First Session',
    duration: 'Within 24–72 hrs',
    desc: 'Log in from wherever you are in Colorado. Your healing begins now. Most women start their first session within 24–72 hours of their initial call — because when you\'re ready, we move with you.',
    details: ['Start within 24–72 hours of your call', 'Join from anywhere in Colorado', 'Warm, welcoming group of women', 'Your therapist is ready and waiting'],
  },
];

const faqs = [
  {
    q: 'How quickly can I start treatment?',
    a: 'Most women begin their first session within 24–72 hours of their initial consultation call. We move quickly because we know that when someone is ready to heal, timing matters deeply.',
  },
  {
    q: 'Do I need a referral from my doctor?',
    a: 'No referral is needed. You can contact us directly and our clinical team will conduct a thorough assessment to determine the right level of care for your situation.',
  },
  {
    q: 'What if I\'m not sure I need treatment?',
    a: 'Call us anyway. Our intake specialists are trained to help you assess where you are and what level of support might be helpful — with zero pressure and complete confidentiality. There is no obligation.',
  },
  {
    q: 'Does insurance cover virtual outpatient treatment?',
    a: 'Most major insurance plans cover virtual mental health and addiction treatment. Our admissions team will verify your benefits before you begin — completely free and with no obligation. Many women pay little to nothing out of pocket.',
  },
  {
    q: 'What if my insurance doesn\'t cover treatment?',
    a: 'We offer flexible private-pay options and can work with you to find a financial arrangement that makes treatment accessible. We believe cost should never be a barrier to healing.',
  },
  {
    q: 'Do I need to be in Colorado?',
    a: 'Yes — we are currently licensed to serve women residing in Colorado. If you\'re outside Colorado, we\'re happy to help connect you with trusted providers in your area.',
  },
];

export default function AdmissionsPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/admissions`,
          url: `${siteUrl}/admissions`,
          name: 'Admissions | Inner Peak Colorado Women\'s Treatment',
          description: 'Start treatment at Inner Peak Colorado in 5 simple steps. Free consultation, insurance verification, and first session within 72 hours. Women\'s virtual mental health and addiction care in Colorado.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Admissions', item: `${siteUrl}/admissions` },
            ],
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
        {
          '@type': 'HowTo',
          name: 'How to Start Treatment at Inner Peak Colorado',
          description: 'Our simple 5-step admissions process to begin virtual outpatient treatment for women in Colorado.',
          step: steps.map((s) => ({
            '@type': 'HowToStep',
            name: s.title,
            text: s.desc,
            position: parseInt(s.num),
          })),
        },
      ],
    };
    const el = document.getElementById('schema-admissions');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-admissions';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Admissions | Inner Peak Colorado Women\'s Mental Health Treatment';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Start treatment at Inner Peak Colorado in 5 simple steps. Free consultation, insurance verification, and first session within 72 hours. Women\'s virtual mental health and addiction care in Colorado.');
    return () => { const el2 = document.getElementById('schema-admissions'); if (el2) el2.remove(); };
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    insurance: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const heroParallax = useParallax<HTMLDivElement>({ speed: 0.25, maxOffset: 80 });

  // InView refs
  const [statsRef, statsVisible] = useInView<HTMLDivElement>();
  const [processHeaderRef, processHeaderVisible] = useInView<HTMLDivElement>();
  const [processTabsRef, processTabsVisible] = useInView<HTMLDivElement>();
  const [processDetailRef, processDetailVisible] = useInView<HTMLDivElement>();
  const [insuranceHeaderRef, insuranceHeaderVisible] = useInView<HTMLDivElement>();
  const [insuranceGridRef, insuranceGridVisible] = useInView<HTMLDivElement>();
  const [faqHeaderRef, faqHeaderVisible] = useInView<HTMLDivElement>();
  const [faqListRef, faqListVisible] = useInView<HTMLDivElement>();
  const [ctaImgRef, ctaImgVisible] = useInView<HTMLDivElement>();
  const [ctaTextRef, ctaTextVisible] = useInView<HTMLDivElement>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message') {
      if (value.length > 500) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[580px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <div ref={heroParallax} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/adm_hero01.jpg"
  alt="Admissions at Inner Peak"
  fill
  className="w-full h-full object-cover object-top"
  priority
/>
</div>
          <div className="absolute inset-0 bg-[#2C3B2E]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/85 via-[#2C3B2E]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/60 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 w-full px-8 md:px-16 pb-20 pt-40">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[{ label: 'Admissions' }]} light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Getting Started</span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 66px)' }}>
                  The first step is<br />
                  simpler than<br />
                  <em className="text-[#DDA15E]">you think.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/80 font-light text-base leading-[1.95]">
                  <AutoLinkedTextClient>{"We've designed our admissions process to be as gentle and straightforward as possible. One call is all it takes to get started — and our team handles everything else from there."}</AutoLinkedTextClient>
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#inquiry-form"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
                  >
                    Start Your Inquiry
                    <i className="ri-arrow-down-line"></i>
                  </a>
                  <a
                    href="tel:+17197338556"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
                  >
                    <i className="ri-phone-line"></i>
                    719-733-8556
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="w-full bg-[#2C3B2E] py-10 px-8 md:px-16">
        <div ref={statsRef} className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '24/7', label: 'Intake Available', color: '#C8795A' },
            { value: '72hrs', label: 'Avg. Time to First Session', color: '#DDA15E' },
            { value: 'Free', label: 'Insurance Verification', color: '#8FA489' },
            { value: 'CO', label: 'Colorado Residents', color: '#6B7D67' },
          ].map((s, i) => (
            <div key={i} className={`flex flex-col items-center text-center gap-1 anim-hidden anim-fade-up anim-delay-${i + 1} ${statsVisible ? 'anim-visible' : ''}`}>
              <p className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(26px, 3vw, 40px)', color: s.color }}><AutoLinkedTextClient>{s.value}</AutoLinkedTextClient></p>
              <p className="text-[10px] uppercase tracking-widest text-[#F0ECE1]/45 font-light"><AutoLinkedTextClient>{s.label}</AutoLinkedTextClient></p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div ref={processHeaderRef} className={`text-center mb-14 flex flex-col gap-3 anim-hidden anim-fade-up ${processHeaderVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">The Process</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Five steps to your<br />
              <em className="text-[#C8795A]">first session.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-lg mx-auto leading-relaxed">
              <AutoLinkedTextClient>{"We've made starting treatment as simple and stress-free as possible. Our team handles the heavy lifting so you can focus on one thing: showing up."}</AutoLinkedTextClient>
            </p>
          </div>

          {/* Step tabs */}
          <div ref={processTabsRef} className={`flex flex-wrap justify-center gap-2 mb-12 anim-hidden anim-fade-up anim-delay-2 ${processTabsVisible ? 'anim-visible' : ''}`}>
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="whitespace-nowrap cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300"
                style={
                  activeStep === i
                    ? { backgroundColor: s.color, color: '#FAF8F5' }
                    : { backgroundColor: '#F0ECE1', color: '#3A4A3C' }
                }
              >
                <span className="font-serif font-bold">{s.num}</span>
                {s.title}
              </button>
            ))}
          </div>

          {/* Active step detail */}
          <div ref={processDetailRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#F0ECE1] rounded-3xl p-10 md:p-14 anim-hidden anim-scale ${processDetailVisible ? 'anim-visible' : ''}`}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-2xl flex-shrink-0"
                  style={{ backgroundColor: `${steps[activeStep].color}20` }}
                >
                  <i className={`${steps[activeStep].icon} text-2xl`} style={{ color: steps[activeStep].color }}></i>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: steps[activeStep].color }}>
                    Step {steps[activeStep].num}
                  </span>
                  <h3 className="font-serif text-[#2C3B2E] text-2xl">{steps[activeStep].title}</h3>
                </div>
              </div>
              <div
                className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${steps[activeStep].color}15`, color: steps[activeStep].color }}
              >
                <i className="ri-time-line text-xs"></i>
                {steps[activeStep].duration}
              </div>
              <p className="text-[#3A4A3C]/70 font-light text-base leading-[1.9]">{steps[activeStep].desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps[activeStep].details.map((d, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="ri-checkbox-circle-line text-xs" style={{ color: steps[activeStep].color }}></i>
                    </div>
                    <span className="text-sm text-[#3A4A3C]/65 font-light leading-snug">{d}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#2C3B2E]/20 text-[#2C3B2E] text-xs font-medium hover:border-[#2C3B2E] transition-all duration-300"
                  >
                    <i className="ri-arrow-left-line"></i>
                    Previous
                  </button>
                )}
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#FAF8F5] text-xs font-medium transition-all duration-300"
                    style={{ backgroundColor: steps[activeStep].color }}
                  >
                    Next Step
                    <i className="ri-arrow-right-line"></i>
                  </button>
                )}
                {activeStep === steps.length - 1 && (
                  <a
                    href="#inquiry-form"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#FAF8F5] text-xs font-medium transition-all duration-300 bg-[#C8795A] hover:bg-[#DDA15E]"
                  >
                    Start Now
                    <i className="ri-arrow-right-line"></i>
                  </a>
                )}
              </div>
            </div>

            {/* Step progress visual */}
            <div className="flex flex-col gap-3">
              {steps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left ${
                    activeStep === i ? 'bg-[#2C3B2E]' : 'bg-[#FAF8F5] hover:bg-[#EAE5D8]'
                  }`}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: activeStep === i ? `${s.color}30` : `${s.color}15`,
                    }}
                  >
                    <i className={`${s.icon} text-sm`} style={{ color: s.color }}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium ${activeStep === i ? 'text-[#FAF8F5]' : 'text-[#2C3B2E]'}`}><AutoLinkedTextClient>{s.title}</AutoLinkedTextClient></p>
                    <p className={`text-[10px] font-light mt-0.5 ${activeStep === i ? 'text-[#F0ECE1]/50' : 'text-[#3A4A3C]/40'}`}><AutoLinkedTextClient>{s.duration}</AutoLinkedTextClient></p>
                  </div>
                  {activeStep === i && (
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-arrow-right-s-line text-[#DDA15E]"></i>
                    </div>
                  )}
                  {i < activeStep && (
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className="ri-checkbox-circle-fill text-sm" style={{ color: s.color }}></i>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSURANCE ── */}
      <section className="w-full py-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div ref={insuranceHeaderRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 anim-hidden anim-fade-up ${insuranceHeaderVisible ? 'anim-visible' : ''}`}>
            <div className="flex flex-col gap-5">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Insurance &amp; Payment</span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                Most women pay<br />
                <em className="text-[#C8795A]">little to nothing.</em>
              </h2>
              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.9]">
                <AutoLinkedTextClient>{"We work with most major insurance plans and verify your benefits before you begin — completely free, with no obligation. Our admissions team handles every detail so you can focus on what matters: getting the help you deserve."}</AutoLinkedTextClient>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: 'ri-shield-check-line', color: '#C8795A', title: 'Free Verification', desc: 'We check your benefits at no cost, before you commit to anything.' },
                { icon: 'ri-eye-line', color: '#6B7D67', title: 'Full Transparency', desc: 'You\'ll know your exact costs before your first session.' },
                { icon: 'ri-hand-heart-line', color: '#DDA15E', title: 'Private Pay Options', desc: 'Flexible financing available if you\'re uninsured or underinsured.' },
              ].map((item, i) => (
                <div key={i} className={`bg-[#F0ECE1] rounded-2xl p-5 flex flex-col gap-3 anim-hidden anim-fade-up anim-delay-${i + 1} ${insuranceHeaderVisible ? 'anim-visible' : ''}`}>
                  <div className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: `${item.color}18` }}>
                    <i className={`${item.icon} text-sm`} style={{ color: item.color }}></i>
                  </div>
                  <p className="font-serif text-[#2C3B2E] text-sm"><AutoLinkedTextClient>{item.title}</AutoLinkedTextClient></p>
                  <p className="text-xs text-[#3A4A3C]/55 font-light leading-relaxed"><AutoLinkedTextClient>{item.desc}</AutoLinkedTextClient></p>
                </div>
              ))}
            </div>
          </div>

          {/* Provider grid */}
          <div ref={insuranceGridRef} className={`bg-[#F0ECE1] rounded-3xl p-10 anim-hidden anim-scale ${insuranceGridVisible ? 'anim-visible' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium mb-1"><AutoLinkedTextClient>{"Accepted Insurance Providers"}</AutoLinkedTextClient></p>
                <p className="text-[#3A4A3C]/55 font-light text-sm"><AutoLinkedTextClient>{"We accept most major plans. Don't see yours? Call us — we likely accept it."}</AutoLinkedTextClient></p>
              </div>
              <a
                href="tel:+17197338556"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300 self-start sm:self-auto"
              >
                Verify My Insurance
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: 'Aetna', icon: 'ri-heart-pulse-line', color: '#C8795A' },
                { name: 'Cigna', icon: 'ri-shield-check-line', color: '#6B7D67' },
                { name: 'United Healthcare', icon: 'ri-hospital-line', color: '#DDA15E' },
                { name: 'Blue Cross Blue Shield', icon: 'ri-shield-cross-line', color: '#8FA489' },
                { name: 'Anthem', icon: 'ri-heart-line', color: '#C8795A' },
                { name: 'Humana', icon: 'ri-user-heart-line', color: '#6B7D67' },
                { name: 'Magellan Health', icon: 'ri-mental-health-line', color: '#DDA15E' },
                { name: 'Beacon Health Options', icon: 'ri-focus-3-line', color: '#8FA489' },
                { name: 'ComPsych', icon: 'ri-brain-line', color: '#C8795A' },
                { name: 'Optum', icon: 'ri-capsule-line', color: '#6B7D67' },
                { name: 'Kaiser Permanente', icon: 'ri-first-aid-kit-line', color: '#DDA15E' },
                { name: 'Tricare', icon: 'ri-medal-line', color: '#8FA489' },
              ].map((ins, i) => (
                <div key={i} className="bg-[#FAF8F5] rounded-xl px-4 py-4 flex items-center gap-3 hover:bg-white transition-colors duration-300">
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${ins.color}15` }}
                  >
                    <i className={`${ins.icon} text-sm`} style={{ color: ins.color }}></i>
                  </div>
                  <span className="text-sm text-[#2C3B2E] font-medium leading-snug">{ins.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#2C3B2E]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#3A4A3C]/45 font-light">
                <AutoLinkedTextClient>{"+ Many more plans accepted. Coverage varies by plan. Our team will confirm your specific benefits."}</AutoLinkedTextClient>
              </p>
              <a
                href="#inquiry-form"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 text-xs text-[#C8795A] font-medium hover:text-[#2C3B2E] transition-colors duration-300"
              >
                Submit an inquiry to check coverage
                <i className="ri-arrow-right-line text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section id="inquiry-form" className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: form */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Start Your Journey</span>
              <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
                Request a free<br />
                consultation.
              </h2>
              <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
                <AutoLinkedTextClient>{"Fill out the form and a member of our intake team will reach out within a few hours. All information is strictly confidential."}</AutoLinkedTextClient>
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#F0ECE1] rounded-2xl p-10 flex flex-col gap-4 items-center text-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#8FA489]/20">
                  <i className="ri-checkbox-circle-line text-3xl text-[#8FA489]"></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-2xl">We'll be in touch soon.</h3>
                <p className="text-[#3A4A3C]/65 font-light text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"A member of our intake team will contact you within a few hours. If you need immediate support, please call us at 719-733-8556."}</AutoLinkedTextClient>
                </p>
                <Link
                  href="/levels-of-care"
                  className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300 mt-2"
                >
                  Learn About Our Program
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            ) : (
              <form
                id="admissions-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(720) 000-0000"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Program of Interest</label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Select a track</option>
                      <option value="IOP">Virtual Intensive Outpatient (IOP)</option>
                      <option value="OP">Virtual Standard Outpatient (OP)</option>
                      <option value="Not Sure">Not Sure Yet</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Insurance Provider</label>
                  <input
                    type="text"
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleChange}
                    placeholder="e.g. Aetna, Cigna, Blue Cross..."
                    className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Tell Us About Yourself</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    placeholder="Share a little about what you're going through and how we can help..."
                    className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300 resize-none"
                  />
                  <p className="text-xs text-[#3A4A3C]/40 text-right font-light">{charCount}/500</p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300 disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Request Consultation'}
                  <i className="ri-arrow-right-line"></i>
                </button>
                <p className="text-xs text-[#3A4A3C]/40 font-light">
                  <AutoLinkedTextClient>{"All communications are strictly confidential and HIPAA-compliant. No commitment required."}</AutoLinkedTextClient>
                </p>
              </form>
            )}
          </div>

          {/* Right: contact info + image */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/adm_form01.jpg"
  alt="Begin your admissions"
  fill
  className="w-full h-full object-cover object-top"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-serif text-[#FAF8F5] italic text-sm leading-relaxed">
                  <AutoLinkedTextClient>{"\"Making that first call was the hardest part. Everything after that, the team made easy.\""}</AutoLinkedTextClient>
                </p>
                <p className="text-[#DDA15E] text-xs mt-2 font-medium uppercase tracking-widest">— Inner Peak Client</p>
              </div>
            </div>

            <div className="bg-[#2C3B2E] rounded-2xl p-7 flex flex-col gap-5">
              <p className="text-xs uppercase tracking-widest text-[#DDA15E] font-medium">Prefer to Call?</p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: 'ri-phone-line', label: 'Call or Text', value: '719-733-8556', color: '#C8795A' },
                  { icon: 'ri-mail-line', label: 'Email Us', value: 'admissions@innerpeakcolorado.com', color: '#8FA489' },
                  { icon: 'ri-time-line', label: 'Intake Hours', value: '24 Hours / 7 Days a Week', color: '#DDA15E' },
                  { icon: 'ri-map-pin-line', label: 'Address', value: '685 Citadel Drive East, Suite #598, Colorado Springs, CO 80909', color: '#6B7D67' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: `${item.color}20` }}>
                      <i className={`${item.icon} text-sm`} style={{ color: item.color }}></i>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/35 font-medium"><AutoLinkedTextClient>{item.label}</AutoLinkedTextClient></p>
                      <p className="text-sm text-[#FAF8F5] font-light"><AutoLinkedTextClient>{item.value}</AutoLinkedTextClient></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div ref={faqHeaderRef} className={`text-center mb-12 flex flex-col gap-3 anim-hidden anim-fade-up ${faqHeaderVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Common Questions</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Admissions FAQs
            </h2>
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
                  <span className={`font-serif text-base pr-4 ${openFaq === i ? 'text-[#FAF8F5]' : 'text-[#2C3B2E]'}`}>{faq.q}</span>
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <i className={`text-sm ${openFaq === i ? 'ri-subtract-line text-[#DDA15E]' : 'ri-add-line text-[#3A4A3C]/40'}`}></i>
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
      <section className="w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div ref={ctaImgRef} className={`relative min-h-[360px] anim-hidden anim-fade-right ${ctaImgVisible ? 'anim-visible' : ''}`}>
            <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/adm_cta01.jpg"
  alt="Begin your healing"
  fill
  className="w-full h-full object-cover object-top"
/>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div ref={ctaTextRef} className={`bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16 anim-hidden anim-fade-left ${ctaTextVisible ? 'anim-visible' : ''}`}>
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">You're Ready</span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              One call.<br />
              That's all it takes<br />
              <em className="text-[#DDA15E]">to begin.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              <AutoLinkedTextClient>{"Our intake team is available around the clock. No judgment, no pressure — just a compassionate conversation about where you are and how we can help."}</AutoLinkedTextClient>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#inquiry-form"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Start Your Inquiry
                <i className="ri-arrow-right-line"></i>
              </a>
              <a
                href="tel:+17197338556"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
              >
                <i className="ri-phone-line"></i>
                719-733-8556
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
