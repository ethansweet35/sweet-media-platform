import Image from 'next/image';
import Link from 'next/link';

const PARENTS_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-parents.png';

const resources = [
  {
    color: 'bg-petal-pink',
    title: 'Warning Signs Guide',
    description: 'Learn the early warning signs of teen mental health struggles — and what to do when you spot them.',
    href: '/resources/warning-signs',
  },
  {
    color: 'bg-mint-green',
    title: 'How to Talk to Your Teen',
    description: 'A practical guide for opening conversations about mental health without pushback or shutdown.',
    href: '/resources/talking-to-teens',
  },
  {
    color: 'bg-subtle-lavender',
    title: 'Understanding IOP',
    description: 'Everything parents need to know about intensive outpatient programs — what to expect, and how to help.',
    href: '/resources/understanding-iop',
  },
  {
    color: 'bg-canary-yellow',
    title: 'Insurance & Cost FAQ',
    description: 'Navigating insurance coverage for mental health treatment can be confusing. We\'ve broken it down for you.',
    href: '/resources/insurance-faq',
  },
];

export default function ResourcesForParentsSection() {
  return (
    <section className="w-full py-24 bg-whisper-gray">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Header + image row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-14">
          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas-white w-fit"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.05) 0px 0px 0px 1px inset' }}
            >
              <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">Resources For Parents</span>
            </div>
            <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight">
              Helping parents navigate<br />the hardest conversations
            </h2>
            <p className="text-[15px] text-muted-ash leading-[1.75] font-light">
              You don't have to figure this out alone. Our parent resource center is filled with guides, articles, and tools designed to support you through every step of your teen's mental health journey.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-midnight-ink cursor-pointer group w-fit"
            >
              View all resources
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.08) 0px 24px 60px -10px' }}
            >
              <Image
                src={PARENTS_IMG}
                alt="Parent and teen having a warm conversation about mental health"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-5 -left-4 md:left-6 bg-canvas-white rounded-xl px-5 py-4"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.08) 0px 8px 32px -4px, rgba(17, 17, 17, 0.04) 0px 0px 0px 1px' }}
            >
              <p className="text-[24px] font-bold text-midnight-ink tracking-tight">86%</p>
              <p className="text-[11px] text-muted-ash mt-0.5 font-light">of parents feel more confident after<br />our parent orientation session</p>
            </div>
          </div>
        </div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {resources.map(({ color, title, description, href }) => (
            <Link
              key={title}
              href={href}
              className="bg-canvas-white rounded-xl p-5 flex flex-col gap-3 cursor-pointer group hover:-translate-y-0.5 transition-transform duration-200"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.02) 0px -6px 6px 0px, rgba(17, 17, 17, 0.01) 0px -23px 9px 0px' }}
            >
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-midnight-ink tracking-tight">{title}</h3>
                <p className="text-[13px] text-muted-ash leading-[1.6] mt-1 font-light">{description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-medium text-midnight-ink mt-auto pt-1">
                Read guide
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
