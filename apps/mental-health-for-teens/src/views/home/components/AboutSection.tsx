import Image from 'next/image';
import Link from 'next/link';

const ABOUT_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-about.png';

const differentiators = [
  {
    label: 'Teen-Only Practice',
    detail: 'We treat adolescents exclusively — ages 12–18. No adults sharing space or scheduling.',
  },
  {
    label: 'Licensed Specialists',
    detail: 'Every clinician holds state licensure and specializes in adolescent development.',
  },
  {
    label: 'Evidence-Based Methods',
    detail: 'CBT, DBT, EMDR, and trauma-informed care — proven modalities, not guesswork.',
  },
  {
    label: 'Family-Integrated Care',
    detail: 'We involve parents and caregivers throughout. Recovery is a team effort.',
  },
];

export default function AboutSection() {
  return (
    <section className="w-full py-24 md:py-28 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-black/[0.05]">
              <Image
                src={ABOUT_IMG}
                alt="Licensed therapist working one-on-one with a teen in a calm office"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>
            {/* Floating credential card */}
            <div className="absolute -bottom-5 right-4 md:right-8 bg-canvas-white rounded-xl border border-black/[0.07] px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-phoenix-orange/10 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8400d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-midnight-ink tracking-tight">State-Licensed Clinicians</p>
                <p className="text-[11px] text-muted-ash font-light mt-0.5">Adolescent specialists only</p>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="flex flex-col gap-8 lg:pt-5">
            <div className="flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-ash font-medium">
                Why Mental Health For Teens
              </span>
              <h2
                className="text-midnight-ink font-black leading-[1.0]"
                style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.03em' }}
              >
                Specialized care built
                <br />
                for the teenage mind.
              </h2>
              <p className="text-[15px] text-muted-ash font-light leading-[1.8] max-w-md">
                Mental Health For Teens is a Colorado-based outpatient program dedicated
                exclusively to adolescents. We believe teenagers deserve specialized care —
                not a watered-down version of adult treatment.
              </p>
            </div>

            {/* Differentiators */}
            <div className="flex flex-col gap-0 border-t border-black/[0.06]">
              {differentiators.map(({ label, detail }) => (
                <div
                  key={label}
                  className="flex items-start gap-5 py-5 border-b border-black/[0.06]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-phoenix-orange flex-shrink-0 mt-2" />
                  <div>
                    <p className="text-[14px] font-semibold text-midnight-ink tracking-tight mb-0.5">{label}</p>
                    <p className="text-[13px] text-muted-ash font-light leading-[1.65]">{detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-midnight-ink cursor-pointer group w-fit"
            >
              Meet our clinical team
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
      </div>
    </section>
  );
}
