'use client';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/base/Breadcrumb';
import { useInView } from '@/hooks/useInView';
import { useParallax } from '@/hooks/useParallax';
import { AutoLinkedTextClient } from '@sweetmedia/blog-core';

type TeamMember = {
  name: string;
  role: string;
  color: string;
  image: string;
  objectPosition?: string;
  credentials: string[];
  bio: string;
  focus: string[];
};

const team: TeamMember[] = [
  {
    name: 'Karynne Witkin, ALM',
    role: 'Chief Executive Officer',
    color: '#C8795A',
    image:
      'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/521f4f896d8c82d7867d9552f69c2acc.png',
    credentials: ['Master\'s in Industrial-Organizational Psychology'],
    bio: 'Karynne Witkin is a behavioral healthcare executive with over a decade of experience in mental health and substance use. Holding a Master\'s in Industrial-Organizational Psychology, she is passionate about creating safe, healing spaces for women and building compassionate, highly-aligned teams to deliver quality care.',
    focus: ['Leadership & Operations', 'Team Culture', 'Program Development', 'Women\'s Behavioral Health'],
  },
  {
    name: 'Stephanie Behrens, LPC, LMFT',
    role: 'Clinical Director / Co-Founder',
    color: '#6B7D67',
    image:
      'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/e4f83cf452dfd55d97475f6ed3b89052.png',
    credentials: ['Licensed Professional Counselor (LPC)', 'Licensed Marriage & Family Therapist (LMFT)'],
    bio: 'Stephanie Behrens is a multi-state Licensed Professional Counselor (LPC) and clinical leader specializing in substance use and mental health. Dedicated to evidence-based, trauma-informed care, she creates safe, transformative spaces for women to heal core wounds, move beyond survival, and build lives of resilience and lasting recovery.',
    focus: ['Clinical Oversight', 'Trauma-Informed Care', 'Substance Use Treatment', 'Evidence-Based Practice'],
  },
  {
    name: 'Kayli Sullivan-Valdez',
    role: 'Administration Officer / Co-Founder',
    color: '#DDA15E',
    image:
      'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/a4ad1835b429fb132cf82e4a3ab87678.png',
    credentials: ['12+ Years in Behavioral Healthcare', 'Compliance Specialist'],
    bio: 'With over 12 years in behavioral healthcare and a decade focused on compliance, Kayli builds strong, ethical foundations for quality care. At Inner Peak Wellness, she empowers women to confidently take ownership of their mental health, ensuring they feel supported, connected, and capable of meaningful change.',
    focus: ['Compliance & Ethics', 'Operations Management', 'Quality Assurance', 'Patient Advocacy'],
  },
  {
    name: 'Jennifer Ramsden',
    role: 'Marketing Director / Co-Founder',
    color: '#8FA489',
    image:
      'https://static.readdy.ai/image/6b088a02f9104b1e1fbb75888c91e42d/c76334302c7e5e86146b904d7e412cd6.png',
    credentials: ['10+ Years in Behavioral Health', 'Women\'s Aftercare Advocate'],
    bio: 'Drawing on 10+ years in behavioral health and her own transformative experience in women\'s aftercare, Jen Ramsden is a passionate advocate for gender-specific care. At Inner Peak Wellness, she works alongside a dedicated team to expand access to tailored resources, helping women find peace, healing, and community.',
    focus: ['Community Outreach', 'Gender-Specific Care', 'Recovery Advocacy', 'Resource Access'],
  },
];

const pillars = [
  { icon: 'ri-heart-pulse-line', color: '#C8795A', label: 'Compassion-Led', desc: 'Every decision begins with the wellbeing of the women we serve.' },
  { icon: 'ri-award-line', color: '#6B7D67', label: 'Clinically Excellent', desc: 'Evidence-based methods refined by the latest research in women\'s mental health.' },
  { icon: 'ri-shield-check-line', color: '#DDA15E', label: 'Women-Owned', desc: 'Founded and operated by women who understand from the inside out.' },
];

export default function TeamPage() {
  const heroParallax = useParallax<HTMLDivElement>({ speed: 0.18, maxOffset: 55 });
  const [headerRef, headerVisible] = useInView<HTMLDivElement>();
  const [pillarsRef, pillarsVisible] = useInView<HTMLDivElement>();
  const [ctaRef, ctaVisible] = useInView<HTMLDivElement>();

  // Per-member inView refs (4 members)
  const [m0Ref, m0Visible] = useInView<HTMLDivElement>();
  const [m1Ref, m1Visible] = useInView<HTMLDivElement>();
  const [m2Ref, m2Visible] = useInView<HTMLDivElement>();
  const [m3Ref, m3Visible] = useInView<HTMLDivElement>();
  const memberRefs = [
    { ref: m0Ref, visible: m0Visible },
    { ref: m1Ref, visible: m1Visible },
    { ref: m2Ref, visible: m2Visible },
    { ref: m3Ref, visible: m3Visible },
  ];

  return (
    <main className="bg-[#FAF8F5]">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[520px] overflow-hidden flex items-end">
        {/* Background image with parallax */}
        <div ref={heroParallax} className="absolute inset-0">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/about_women001.jpg"
            alt="Women in supportive healing environment"
            fill
            priority
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Gradient overlay — darker at bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/90 via-[#2C3B2E]/55 to-[#2C3B2E]/30" />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 pt-36 pb-20">
          <Breadcrumb items={[{ label: 'About', path: '/about' }, { label: 'Our Team' }]} light />
          <div className="mt-8 flex flex-col gap-6 max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">
              Our Clinical Team
            </span>
            <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(38px, 5vw, 68px)' }}>
              The healers behind<br />
              <em className="text-[#DDA15E] not-italic">your journey.</em>
            </h1>
            <p className="text-[#F0ECE1]/65 font-light text-base leading-[1.95] max-w-xl">
              <AutoLinkedTextClient>
                {'Every member of our clinical team was chosen not just for their credentials, but for their humanity — their ability to hold space for women in their most vulnerable moments.'}
              </AutoLinkedTextClient>
            </p>
          </div>
        </div>
      </section>

      {/* ── PILLARS STRIP ── */}
      <section className="w-full bg-[#F0ECE1] py-12 px-8 md:px-16">
        <div
          ref={pillarsRef}
          className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 anim-hidden anim-fade-up ${pillarsVisible ? 'anim-visible' : ''}`}
        >
          {pillars.map((p, i) => (
            <div key={i} className="flex items-start gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${p.color}20` }}
              >
                <i className={`${p.icon} text-base`} style={{ color: p.color }} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#2C3B2E]">{p.label}</p>
                <p className="mt-0.5 text-sm font-light text-[#3A4A3C]/60 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION HEADER ── */}
      <section className="w-full pt-20 pb-4 px-8 md:px-16 bg-[#FAF8F5]">
        <div
          ref={headerRef}
          className={`max-w-7xl mx-auto flex flex-col gap-4 anim-hidden anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Meet the Team</span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}>
              Women dedicated to<br />
              <em className="text-[#C8795A] not-italic">women's healing.</em>
            </h2>
            <p className="text-[#3A4A3C]/55 font-light text-sm leading-[1.9] max-w-sm">
              Our founders and clinical leads bring decades of combined experience in behavioral health, all united by a shared belief that women deserve care designed specifically for them.
            </p>
          </div>
          <div className="mt-4 w-full h-px bg-[#2C3B2E]/8" />
        </div>
      </section>

      {/* ── TEAM MEMBERS ── */}
      <section className="w-full pb-24 px-8 md:px-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
          {team.map((member, i) => {
            const { ref, visible } = memberRefs[i];
            return (
              <div
                key={i}
                ref={ref}
                className={`group flex flex-col overflow-hidden rounded-3xl bg-[#F0ECE1] anim-hidden anim-fade-up ${visible ? 'anim-visible' : ''}`}
              >
                {/* Photo — contained, no cropping */}
                <div
                  className="relative w-full bg-[#E8E4DA] overflow-hidden"
                  style={{ aspectRatio: '4/3' }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain group-hover:scale-[1.03] transition-transform duration-700"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                  {/* Color accent bar at bottom */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-1"
                    style={{ backgroundColor: member.color }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 p-7 md:p-8">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-7 h-0.5 rounded-full mb-1" style={{ backgroundColor: member.color }} />
                    <h3 className="font-serif text-[#2C3B2E] text-xl md:text-2xl leading-snug">
                      {member.name}
                    </h3>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                      style={{ color: member.color }}
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* Credentials */}
                  <div className="flex flex-wrap gap-2">
                    {member.credentials.map((c, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em]"
                        style={{ backgroundColor: `${member.color}18`, color: member.color }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-[#3A4A3C]/70 font-light text-sm leading-[1.95]">
                    <AutoLinkedTextClient>{member.bio}</AutoLinkedTextClient>
                  </p>

                  {/* Areas of focus */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2C3B2E]/40 mb-3">
                      Areas of Focus
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {member.focus.map((f, j) => (
                        <span
                          key={j}
                          className="inline-flex items-center gap-1.5 text-[11px] font-light text-[#3A4A3C]/65"
                        >
                          <span
                            className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: member.color }}
                          />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#2C3B2E] relative overflow-hidden py-20 px-8 md:px-16">
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-[#DDA15E]/8 blur-[100px] pointer-events-none" />
        <div
          ref={ctaRef}
          className={`relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8 anim-hidden anim-fade-up ${ctaVisible ? 'anim-visible' : ''}`}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#DDA15E] font-medium">
            Ready to Connect?
          </span>
          <h2 className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)' }}>
            Schedule a free, confidential<br />
            consultation with our team.
          </h2>
          <p className="text-[#F0ECE1]/55 font-light text-base leading-[1.95] max-w-lg">
            No commitment required — just a conversation with someone who genuinely cares. We are here when you are ready.
          </p>
          <div className="w-12 h-px bg-[#DDA15E]/40" />
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="whitespace-nowrap inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
            >
              Begin Your Journey
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              href="/about"
              className="whitespace-nowrap inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#FAF8F5]/25 text-[#FAF8F5]/75 text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5]/50 hover:text-[#FAF8F5] transition-all duration-300"
            >
              About Inner Peak
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
