import Image from 'next/image';
import Link from 'next/link';

const SERVICES_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-services.png';

const services = [
  {
    num: '01',
    title: 'Intensive Outpatient (IOP)',
    description:
      'Structured group and individual sessions 3–5 days per week. The right level of support for teens who need more than weekly therapy.',
    href: '/services#iop',
  },
  {
    num: '02',
    title: 'Individual Therapy',
    description:
      'One-on-one sessions with a licensed adolescent therapist. Confidential, personalized, and built around your teen's specific challenges.',
    href: '/services#individual',
  },
  {
    num: '03',
    title: 'Group Therapy',
    description:
      'Facilitated peer groups where teens connect and build coping skills alongside others who truly understand what they're going through.',
    href: '/services#group',
  },
  {
    num: '04',
    title: 'Family Therapy',
    description:
      'Healing is a family process. We strengthen communication and help build a home environment where your teen can recover.',
    href: '/services#family',
  },
  {
    num: '05',
    title: 'Crisis Support',
    description:
      'When things escalate, we're here. Immediate crisis assessment and stabilization — including after-hours response.',
    href: '/services#crisis',
  },
  {
    num: '06',
    title: 'Aftercare Planning',
    description:
      'We don't close the door at discharge. Personalized step-down plans keep your teen on track for lasting recovery.',
    href: '/services#aftercare',
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-24 md:py-28 bg-whisper-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-end mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-ash font-medium">
              Our Programs
            </span>
            <h2
              className="text-midnight-ink font-black leading-[1.0]"
              style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', letterSpacing: '-0.03em' }}
            >
              Comprehensive care
              <br />
              at every level of need.
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:pb-1">
            <p className="text-[15px] text-muted-ash font-light leading-[1.8]">
              From weekly therapy to intensive outpatient programs, we meet teens and
              families where they are — and guide them toward lasting wellness.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-midnight-ink cursor-pointer group w-fit"
            >
              View all services
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Three-column: services / image / services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Left: services 01–03 */}
          <div className="flex flex-col gap-3">
            {services.slice(0, 3).map(({ num, title, description, href }) => (
              <Link
                key={num}
                href={href}
                className="group bg-canvas-white rounded-2xl p-6 flex flex-col gap-3 cursor-pointer hover:-translate-y-0.5 transition-all duration-200 border border-black/[0.05]"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-ash font-medium">{num}</span>
                <h3
                  className="text-midnight-ink font-bold leading-tight tracking-tight"
                  style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-[13px] text-muted-ash font-light leading-[1.65] flex-1">{description}</p>
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-phoenix-orange mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Center: image */}
          <div
            className="relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-0 border border-black/[0.05]"
          >
            <Image
              src={SERVICES_IMG}
              alt="Teen in a calm therapeutic setting"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 33vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-canvas-white/60 text-[10px] tracking-[0.18em] uppercase mb-1.5 font-medium">
                Our approach
              </p>
              <p
                className="text-canvas-white font-bold leading-tight"
                style={{ fontSize: '18px', letterSpacing: '-0.02em' }}
              >
                Evidence-based care
                <br />
                tailored to each teen.
              </p>
            </div>
          </div>

          {/* Right: services 04–06 */}
          <div className="flex flex-col gap-3">
            {services.slice(3, 6).map(({ num, title, description, href }) => (
              <Link
                key={num}
                href={href}
                className="group bg-canvas-white rounded-2xl p-6 flex flex-col gap-3 cursor-pointer hover:-translate-y-0.5 transition-all duration-200 border border-black/[0.05]"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted-ash font-medium">{num}</span>
                <h3
                  className="text-midnight-ink font-bold leading-tight tracking-tight"
                  style={{ fontSize: '15px', letterSpacing: '-0.02em' }}
                >
                  {title}
                </h3>
                <p className="text-[13px] text-muted-ash font-light leading-[1.65] flex-1">{description}</p>
                <div className="flex items-center gap-1.5 text-[12px] font-medium text-phoenix-orange mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
