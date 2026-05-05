import Image from 'next/image';
import Link from 'next/link';

const ABOUT_IMG =
  'https://awalaktpqqwpdvzbafkv.supabase.co/storage/v1/object/public/site-assets/images/mhft-about.png';

export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image column */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.08) 0px 24px 60px -10px' }}
            >
              <Image
                src={ABOUT_IMG}
                alt="Therapist working with a teenager in a supportive environment"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>
            {/* Floating credential card */}
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-canvas-white rounded-xl px-5 py-4 flex items-center gap-4"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.08) 0px 8px 32px -4px, rgba(17, 17, 17, 0.04) 0px 0px 0px 1px' }}
            >
              <div className="w-10 h-10 rounded-lg bg-mint-green flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-midnight-ink tracking-tight">Licensed Clinicians</p>
                <p className="text-[11px] text-muted-ash mt-0.5">All therapists are state-licensed</p>
              </div>
            </div>
            {/* Accent gradient */}
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-40 -z-10"
              style={{ background: 'radial-gradient(circle, #b7efb2 0%, transparent 70%)' }}
            />
          </div>

          {/* Text column */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-whisper-gray w-fit">
              <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">About Us</span>
            </div>
            <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight">
              Specialized care built<br />for the teenage mind
            </h2>
            <p className="text-[15px] text-muted-ash leading-[1.75] font-light">
              Mental Health For Teens is a Colorado-based outpatient program dedicated exclusively to adolescent mental health. We believe teenagers deserve specialized care — not a watered-down version of adult treatment.
            </p>
            <p className="text-[15px] text-muted-ash leading-[1.75] font-light">
              Our clinicians are trained in evidence-based modalities including CBT, DBT, EMDR, and trauma-informed care — all tailored to the unique developmental needs of teens ages 12–18.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { color: 'bg-petal-pink', label: 'Teen-Focused' },
                { color: 'bg-mint-green', label: 'Evidence-Based' },
                { color: 'bg-canary-yellow', label: 'Family-Inclusive' },
                { color: 'bg-subtle-lavender', label: 'Trauma-Informed' },
              ].map(({ color, label }) => (
                <div key={label} className={`${color} rounded-xl px-4 py-3 flex items-center gap-2.5`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-[13px] font-medium text-midnight-ink">{label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-midnight-ink mt-2 cursor-pointer group w-fit"
            >
              Meet our team
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
