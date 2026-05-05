import Image from 'next/image';
import Link from 'next/link';

const SERVICES_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-services.png';

const services = [
  {
    color: 'bg-petal-pink',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: 'Intensive Outpatient (IOP)',
    description: 'Structured group and individual therapy sessions, 3–5 days per week. Ideal for teens who need more support than weekly therapy.',
    href: '/services#iop',
  },
  {
    color: 'bg-mint-green',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ),
    title: 'Individual Therapy',
    description: 'One-on-one sessions with a licensed teen therapist. Confidential, personalized, and focused on your teen\'s unique challenges.',
    href: '/services#individual',
  },
  {
    color: 'bg-canary-yellow',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    title: 'Group Therapy',
    description: 'Facilitated peer groups where teens connect, share, and build coping skills alongside others who truly understand.',
    href: '/services#group',
  },
  {
    color: 'bg-subtle-lavender',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    ),
    title: 'Family Therapy',
    description: 'Healing is a family affair. We involve parents and caregivers to strengthen communication and build a supportive home environment.',
    href: '/services#family',
  },
  {
    color: 'bg-petal-pink',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: 'Crisis Support',
    description: 'When things escalate, we\'re here. Our team provides immediate crisis assessment and stabilization services.',
    href: '/services#crisis',
  },
  {
    color: 'bg-mint-green',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
    ),
    title: 'Aftercare Planning',
    description: 'We don\'t just close the door when treatment ends. Personalized step-down plans keep your teen on track for lasting recovery.',
    href: '/services#aftercare',
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-24 bg-whisper-gray">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-14">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas-white w-fit"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.05) 0px 0px 0px 1px inset' }}
            >
              <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">Our Services</span>
            </div>
            <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight">
              Comprehensive care at<br />every level of need
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[15px] text-muted-ash leading-[1.75] font-light">
              From weekly therapy to intensive outpatient programs, we meet teens and families exactly where they are — and guide them toward lasting mental wellness.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-midnight-ink cursor-pointer group w-fit"
            >
              View all services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Services grid + image */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: 3 services */}
          <div className="flex flex-col gap-4">
            {services.slice(0, 3).map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="bg-canvas-white rounded-xl p-5 flex flex-col gap-3 cursor-pointer group hover:-translate-y-0.5 transition-transform duration-200"
                style={{ boxShadow: 'rgba(17, 17, 17, 0.02) 0px -6px 6px 0px, rgba(17, 17, 17, 0.01) 0px -23px 9px 0px' }}
              >
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-midnight-ink tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-muted-ash leading-[1.6] mt-1 font-light">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Center: image */}
          <div className="relative rounded-xl overflow-hidden min-h-[400px] lg:min-h-0"
            style={{ boxShadow: 'rgba(17, 17, 17, 0.08) 0px 24px 60px -10px' }}
          >
            <Image
              src={SERVICES_IMG}
              alt="Teen journaling in a calm therapeutic setting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 33vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-ink/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-canvas-white/70 text-[11px] tracking-widest uppercase mb-1">Our approach</p>
              <p className="text-canvas-white font-semibold text-[15px] leading-tight tracking-tight">Evidence-based care<br />tailored to each teen</p>
            </div>
          </div>

          {/* Right: 3 services */}
          <div className="flex flex-col gap-4">
            {services.slice(3, 6).map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="bg-canvas-white rounded-xl p-5 flex flex-col gap-3 cursor-pointer group hover:-translate-y-0.5 transition-transform duration-200"
                style={{ boxShadow: 'rgba(17, 17, 17, 0.02) 0px -6px 6px 0px, rgba(17, 17, 17, 0.01) 0px -23px 9px 0px' }}
              >
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                  {s.icon}
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-midnight-ink tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-muted-ash leading-[1.6] mt-1 font-light">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
