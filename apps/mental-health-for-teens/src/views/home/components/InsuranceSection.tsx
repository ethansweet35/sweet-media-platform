import Link from 'next/link';

const insurers = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'United Healthcare',
  'Humana',
  'Tricare',
  'Medicaid',
  'Medicare',
];

const paymentFeatures = [
  {
    color: 'bg-mint-green',
    title: 'Insurance Verification',
    description: 'We verify your benefits before your first appointment — no surprise bills.',
  },
  {
    color: 'bg-petal-pink',
    title: 'Sliding Scale Fees',
    description: 'Financial hardship shouldn't be a barrier. Ask about our sliding scale payment options.',
  },
  {
    color: 'bg-subtle-lavender',
    title: 'Flexible Payment Plans',
    description: 'We offer payment plans that fit your family\'s budget, with no interest and no pressure.',
  },
  {
    color: 'bg-canary-yellow',
    title: 'HSA / FSA Accepted',
    description: 'Use your pre-tax health savings or flexible spending account for treatment costs.',
  },
];

export default function InsuranceSection() {
  return (
    <section className="w-full py-24 bg-whisper-gray">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas-white w-fit"
            style={{ boxShadow: 'rgba(17, 17, 17, 0.05) 0px 0px 0px 1px inset' }}
          >
            <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">Insurance & Payment</span>
          </div>
          <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight">
            We make the financial<br />side simple
          </h2>
          <p className="text-[15px] text-muted-ash leading-[1.75] font-light">
            Getting your teen the help they need shouldn't be complicated by paperwork and billing confusion. We handle insurance verification and work with most major plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Insurer grid */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[14px] font-semibold text-midnight-ink tracking-tight">Accepted Insurance Plans</h3>
            <div className="grid grid-cols-2 gap-3">
              {insurers.map((name) => (
                <div
                  key={name}
                  className="bg-canvas-white rounded-xl px-5 py-4 flex items-center gap-3"
                  style={{ boxShadow: 'rgba(17, 17, 17, 0.02) 0px -6px 6px 0px, rgba(17, 17, 17, 0.01) 0px -23px 9px 0px' }}
                >
                  <div className="w-6 h-6 rounded-lg bg-deliver-green/20 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#47d096" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </div>
                  <span className="text-[13px] font-medium text-midnight-ink">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-muted-ash font-light mt-1">
              Don't see your plan? Call us — we work with many additional insurers on a case-by-case basis.
            </p>
          </div>

          {/* Right: Payment features */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[14px] font-semibold text-midnight-ink tracking-tight">Payment Options</h3>
            {paymentFeatures.map(({ color, title, description }) => (
              <div
                key={title}
                className="bg-canvas-white rounded-xl p-5 flex items-start gap-4"
                style={{ boxShadow: 'rgba(17, 17, 17, 0.02) 0px -6px 6px 0px, rgba(17, 17, 17, 0.01) 0px -23px 9px 0px' }}
              >
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-midnight-ink tracking-tight">{title}</h4>
                  <p className="text-[13px] text-muted-ash leading-[1.6] mt-1 font-light">{description}</p>
                </div>
              </div>
            ))}

            <div className="bg-midnight-ink rounded-xl px-6 py-5 flex items-center justify-between gap-4 mt-1">
              <div>
                <p className="text-canvas-white font-semibold text-[14px] tracking-tight">Free benefits check</p>
                <p className="text-canvas-white/50 text-[12px] mt-0.5 font-light">We'll verify your coverage in minutes.</p>
              </div>
              <Link
                href="/admissions"
                className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-canvas-white text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200 whitespace-nowrap"
              >
                Check My Coverage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
