'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';

const tracks = [
  {
    id: 'iop',
    abbr: 'IOP',
    color: '#C8795A',
    label: 'Intensive Outpatient',
    duration: '6–12 Weeks',
    frequency: '3 Days / Week · 3 Hours / Day',
    tag: 'Most Structured',
    ideal: 'Women who need meaningful, structured support while maintaining their daily responsibilities — work, family, and life.',
    intro: 'Our virtual IOP delivers the depth of clinical care you need without asking you to put your life on hold. Three days a week, you\'ll join a small cohort of women for live, therapist-led group sessions, individual therapy, and holistic programming — all from the privacy and comfort of your own home.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_iop01.jpg',
    quote: 'As a single mom, I couldn\'t disappear into treatment. Virtual IOP let me show up for my healing and my daughter at the same time.',
    quoteAuthor: 'Priya N., IOP Graduate',
    includes: [
      'Individual therapy 1× / week',
      'Group therapy 3× / week',
      'Psychiatric check-ins',
      'DBT skills groups',
      'Holistic wellness sessions',
      'Relapse prevention planning',
      'On-call support between sessions',
      'Alumni community access',
    ],
  },
  {
    id: 'op',
    abbr: 'OP',
    color: '#6B7D67',
    label: 'Standard Outpatient',
    duration: 'Ongoing',
    frequency: '1–2 Sessions / Week',
    tag: 'Flexible Support',
    ideal: 'Women in stable recovery who want continued therapeutic support, or those beginning their healing journey with lower-acuity needs.',
    intro: 'Continued therapeutic support as you build and sustain your life in recovery. Standard outpatient provides the ongoing clinical guidance, community connection, and accountability needed to maintain long-term wellness — on a schedule that works for you.',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_op01.jpg',
    quote: 'Virtual outpatient has been my anchor. Even two years into recovery, having that weekly session keeps me grounded and growing.',
    quoteAuthor: 'Cassandra W., Outpatient Client',
    includes: [
      'Weekly individual therapy',
      'Monthly group sessions',
      'Psychiatric medication management',
      'Wellness & lifestyle check-ins',
      'Community events & workshops',
      'Relapse prevention support',
      'Lifetime alumni network access',
      'Crisis support as needed',
    ],
  },
];

const faqs = [
  {
    q: 'Is virtual treatment as effective as in-person care?',
    a: 'Research consistently shows that virtual treatment produces outcomes equivalent to in-person care. For many women, the comfort and privacy of their own home actually enhances the therapeutic experience — reducing barriers to honest disclosure and making it easier to show up consistently.',
  },
  {
    q: 'What technology do I need to participate?',
    a: 'All you need is a smartphone, tablet, or computer with a camera and a reliable internet connection. We use a HIPAA-compliant video platform that\'s easy to use — no technical expertise required. Our team will walk you through setup before your first session.',
  },
  {
    q: 'Do I need to be in Colorado to participate?',
    a: 'We currently serve women residing in Colorado. During your free consultation, we\'ll confirm your eligibility and verify your insurance benefits. If you\'re outside Colorado, we\'re happy to help connect you with trusted providers in your area.',
  },
  {
    q: 'How do I know whether IOP or standard outpatient is right for me?',
    a: 'Our clinical team conducts a free, thorough assessment before you begin. We evaluate your history, current symptoms, support system, and goals — then recommend the track that best fits your unique situation. There\'s no pressure and no commitment required.',
  },
  {
    q: 'Does insurance cover virtual outpatient treatment?',
    a: 'Most major insurance plans cover virtual mental health and addiction treatment. Our admissions team will verify your benefits before you begin — completely free and with no obligation. Many women pay little to nothing out of pocket.',
  },
  {
    q: 'What if I need a higher level of care?',
    a: 'If our clinical assessment indicates you need more intensive support than virtual outpatient can provide, we\'ll connect you with trusted residential or PHP partners in our network. Your wellbeing always comes first — we\'ll never place you in a program that isn\'t the right fit.',
  },
];

const whyVirtual = [
  {
    icon: 'ri-home-heart-line',
    title: 'Heal in Your Own Space',
    desc: 'Your home is your sanctuary. Virtual care lets you do the deep work in an environment where you already feel safe — no commute, no waiting rooms, no disruption.',
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Complete Privacy',
    desc: 'No one in your neighborhood, workplace, or social circle needs to know you\'re in treatment. Virtual care gives you the discretion to heal on your own terms.',
  },
  {
    icon: 'ri-calendar-check-line',
    title: 'Fits Your Real Life',
    desc: 'Work, kids, caregiving — virtual outpatient is designed to work around your responsibilities, not the other way around. You don\'t have to choose between healing and living.',
  },
  {
    icon: 'ri-map-pin-line',
    title: 'No Geographic Limits',
    desc: 'Access world-class women\'s mental health care from anywhere in the country. Whether you\'re in a rural area or a major city, exceptional care is now within reach.',
  },
  {
    icon: 'ri-group-line',
    title: 'Women-Only Community',
    desc: 'Every group session is women-only — creating the safety, honesty, and depth of connection that makes group therapy truly transformative.',
  },
  {
    icon: 'ri-heart-pulse-line',
    title: 'Clinically Equivalent Outcomes',
    desc: 'Peer-reviewed research consistently shows virtual treatment produces outcomes equivalent to in-person care — and for many women, even better.',
  },
];

export default function VirtualOutpatientPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/virtual-outpatient`,
          url: `${siteUrl}/virtual-outpatient`,
          name: 'Virtual Outpatient Program | IOP & OP for Women | Inner Peak Colorado',
          description: 'Inner Peak Colorado offers virtual IOP and standard outpatient programs for women in Colorado. Evidence-based mental health and addiction treatment from the comfort of your home.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Virtual Outpatient', item: `${siteUrl}/virtual-outpatient` },
            ],
          },
        },
        {
          '@type': 'MedicalWebPage',
          url: `${siteUrl}/virtual-outpatient`,
          name: 'Virtual Outpatient Programs',
          about: [
            { '@type': 'MedicalTherapy', name: 'Intensive Outpatient Program (IOP)' },
            { '@type': 'MedicalTherapy', name: 'Standard Outpatient Program (OP)' },
          ],
          audience: { '@type': 'Patient', requiredGender: 'Female' },
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
    const el = document.getElementById('schema-virtual-outpatient');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-virtual-outpatient';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Virtual Outpatient Program | IOP & OP for Women | Inner Peak Colorado';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Inner Peak Colorado offers virtual IOP and standard outpatient programs for women in Colorado. Evidence-based mental health and addiction treatment from the comfort of your home.');
    return () => { const el2 = document.getElementById('schema-virtual-outpatient'); if (el2) el2.remove(); };
  }, []);

  const [activeTrack, setActiveTrack] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const track = tracks[activeTrack];

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── HERO ── */}
      <section className="relative w-full h-[620px] max-h-[calc(100vh-112px)] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_hero01.jpg?v=20260503f"
            alt="Virtual Outpatient Program"
            className="w-full h-full object-contain object-center bg-black"
          />
          <div className="absolute inset-0 bg-[#2C3B2E]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/80 via-[#2C3B2E]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 pb-20 pt-40">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[{ label: 'Virtual Outpatient' }]} light />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mt-8">
              <div className="flex flex-col gap-6">
                <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Our Program</span>
                <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 66px)' }}>
                  World-class care,<br />
                  from the comfort<br />
                  <em className="text-[#DDA15E]">of your own home.</em>
                </h1>
              </div>
              <div className="flex flex-col gap-6">
                <p className="text-[#F0ECE1]/75 font-light text-base leading-[1.95]">
                  Our virtual outpatient program delivers evidence-based, women-only mental health and addiction treatment — with the same clinical depth as in-person care, and none of the barriers. Heal on your schedule, in your space, without putting your life on hold.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
                  >
                    Get a Free Assessment
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                  <a
                    href="tel:+17197338556"
                    className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/40 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
                  >
                    <i className="ri-phone-line"></i>
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="w-full bg-[#2C3B2E] py-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '100%', label: 'Virtual & Secure', color: '#C8795A' },
            { value: 'CO', label: 'Colorado Only', color: '#DDA15E' },
            { value: '50+', label: 'Years Collective Experience', color: '#8FA489' },
            { value: '24/7', label: 'Crisis Support', color: '#6B7D67' },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <p className="font-serif font-bold leading-none" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', color: s.color }}>{s.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#F0ECE1]/45 font-light">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY VIRTUAL ── */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Why Virtual</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              The freedom to heal<br />
              <em className="text-[#C8795A]">on your own terms.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
              Virtual care isn't a compromise — it's a better fit for most women's lives.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyVirtual.map((item, i) => (
              <div key={i} className="bg-[#F0ECE1] rounded-2xl p-7 flex flex-col gap-4 hover:bg-[#EAE5D8] transition-colors duration-300">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2C3B2E]/8">
                  <i className={`${item.icon} text-lg text-[#2C3B2E]`}></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-base">{item.title}</h3>
                <p className="text-[#3A4A3C]/60 font-light text-sm leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK SELECTOR ── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Our Tracks</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Two tracks, one goal:<br />
              <em className="text-[#6B7D67]">your lasting recovery.</em>
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-base max-w-lg mx-auto leading-relaxed">
              Whether you need intensive daily structure or flexible weekly support, we have a track designed for exactly where you are.
            </p>
          </div>

          {/* Track Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-[#FAF8F5] rounded-full p-1 gap-1">
              {tracks.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTrack(i)}
                  className="whitespace-nowrap cursor-pointer flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all duration-300"
                  style={
                    activeTrack === i
                      ? { backgroundColor: t.color, color: '#FAF8F5' }
                      : { color: '#3A4A3C', opacity: 0.6 }
                  }
                >
                  <span className="font-serif font-bold">{t.abbr}</span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Track Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden min-h-[420px]">
              <Image
  src={track.image}
  alt={track.label}
  fill
  className="absolute inset-0 w-full h-full object-cover object-top"
/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/80 via-transparent to-transparent" />
              <div className="absolute top-5 left-5">
                <span
                  className="text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full text-[#FAF8F5]"
                  style={{ backgroundColor: track.color }}
                >
                  {track.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="font-serif text-[#FAF8F5] text-sm italic leading-relaxed mb-2">"{track.quote}"</p>
                <p className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">— {track.quoteAuthor}</p>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span
                  className="font-serif font-bold leading-none opacity-15"
                  style={{ fontSize: 'clamp(48px, 6vw, 80px)', color: track.color }}
                >
                  {track.abbr}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest font-medium" style={{ color: track.color }}>{track.tag}</span>
                  <h3 className="font-serif text-[#2C3B2E] leading-snug" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}>
                    Virtual {track.label}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-[#FAF8F5] rounded-full px-4 py-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-time-line text-xs" style={{ color: track.color }}></i>
                  </div>
                  <span className="text-xs text-[#2C3B2E] font-medium">{track.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#FAF8F5] rounded-full px-4 py-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-calendar-line text-xs" style={{ color: track.color }}></i>
                  </div>
                  <span className="text-xs text-[#2C3B2E] font-medium">{track.frequency}</span>
                </div>
              </div>

              <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.95]">{track.intro}</p>

              <div className="bg-[#FAF8F5] rounded-2xl p-5 flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium mb-1">Ideal For</p>
                <p className="text-sm text-[#3A4A3C]/70 font-light leading-relaxed">{track.ideal}</p>
              </div>

              {/* What's included */}
              <div className="bg-[#2C3B2E] rounded-2xl p-6">
                <p className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium mb-5">What's Included</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {track.includes.map((item, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-checkbox-circle-line text-xs" style={{ color: track.color }}></i>
                      </div>
                      <span className="text-xs text-[#F0ECE1]/70 font-light leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium text-[#FAF8F5] hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: track.color }}
              >
                Start This Track
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="w-full bg-[#2C3B2E] py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">How It Works</span>
            <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
              From first call to<br />
              <em className="text-[#DDA15E]">first session in 72 hours.</em>
            </h2>
            <p className="text-[#F0ECE1]/60 font-light text-base leading-[1.95] max-w-md">
              We've made starting treatment as simple and stress-free as possible. Most women are in their first session within 24–72 hours of their initial call.
            </p>
            <div className="flex flex-col divide-y divide-[#FAF8F5]/10">
              {[
                { step: '01', label: 'Free Consultation Call', desc: 'A compassionate intake specialist listens to your story — no pressure, no judgment, no commitment required.' },
                { step: '02', label: 'Clinical Assessment', desc: 'A licensed clinician evaluates your needs and recommends the right track for your unique situation.' },
                { step: '03', label: 'Insurance Verification', desc: 'We verify your benefits and walk you through your coverage — completely free, before you begin.' },
                { step: '04', label: 'Tech Setup & Onboarding', desc: 'We walk you through our secure platform and introduce you to your therapist and group before day one.' },
                { step: '05', label: 'Begin Your First Session', desc: 'Log in from wherever you are. Your healing starts now.' },
              ].map((s, i) => (
                <div key={i} className="group flex items-start gap-6 py-5 cursor-default">
                  <span className="font-serif font-bold text-2xl opacity-25 group-hover:opacity-100 transition-all duration-500 flex-shrink-0 text-[#DDA15E]">{s.step}</span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#FAF8F5] group-hover:text-[#DDA15E] transition-colors duration-300">{s.label}</p>
                    <p className="text-sm text-[#F0ECE1]/45 font-light leading-relaxed group-hover:text-[#F0ECE1]/70 transition-colors duration-300">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[1rem_3rem_1rem_3rem] overflow-hidden" style={{ height: '560px' }}>
            <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_howitworks01.jpg"
  alt="How virtual outpatient works"
  fill
  className="w-full h-full object-contain object-center bg-black"
/>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL STRIP ── */}
      <section className="w-full py-20 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Client Stories</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Healing from home — in their words.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'I was skeptical that virtual therapy could be as powerful as sitting in a room with someone. I was completely wrong. The connection I felt with my therapist and my group was unlike anything I\'d experienced before.',
                name: 'Megan R.',
                track: 'Virtual IOP Graduate',
                image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_test01.jpg',
              },
              {
                quote: 'Being able to do my sessions from home meant I never had to choose between my kids and my recovery. Virtual IOP gave me both. I\'m a better mother because of it.',
                name: 'Danielle K.',
                track: 'Virtual IOP Graduate',
                image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_test02.jpg',
              },
              {
                quote: 'I live in a rural area where there are no good treatment options. Virtual outpatient connected me to a level of care I never could have accessed otherwise. It changed my life.',
                name: 'Tamara S.',
                track: 'Standard Outpatient Client',
                image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_test03.jpg',
              },
            ].map((t, i) => (
              <div key={i} className="bg-[#F0ECE1] rounded-2xl p-8 flex flex-col gap-6">
                <i className="ri-double-quotes-l text-3xl text-[#C8795A]/30"></i>
                <p className="text-[#3A4A3C]/70 font-light text-sm leading-[1.9] italic flex-1">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                    <Image
  src={t.image}
  alt={t.name}
  fill
  className="w-full h-full object-cover object-top"
/>
                  </div>
                  <div>
                    <p className="text-[#2C3B2E] font-medium text-sm">{t.name}</p>
                    <p className="text-[#6B7D67] text-xs font-light">{t.track}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Common Questions</span>
            <h2 className="font-serif text-[#2C3B2E]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Everything you need to know
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'bg-[#2C3B2E]' : 'bg-[#FAF8F5]'}`}
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
                    <p className="text-[#F0ECE1]/70 font-light text-sm leading-[1.9]">{faq.a}</p>
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
          <div className="relative min-h-[380px]">
            <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/vop_cta01.jpg"
  alt="Begin virtual outpatient"
  fill
  className="w-full h-full object-cover object-top"
/>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C3B2E]/30" />
          </div>
          <div className="bg-[#2C3B2E] flex flex-col justify-center gap-7 px-12 py-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium">Start Today</span>
            <h2 className="font-serif text-[#FAF8F5]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              You don't have to<br />
              leave your life<br />
              <em className="text-[#DDA15E]">to change it.</em>
            </h2>
            <p className="text-[#F0ECE1]/70 font-light text-base leading-relaxed">
              A free, confidential consultation is the only first step. Our clinical team will listen, assess, and guide you to the right track — with no pressure and no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Free Consultation
                <i className="ri-arrow-right-line"></i>
              </Link>
              <a
                href="tel:+18005551234"
                className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] transition-all duration-300"
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
