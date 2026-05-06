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

const paymentOptions = [
  {
    title: 'Free Benefits Check',
    detail: 'We verify your insurance before your first appointment — no surprise bills, ever.',
  },
  {
    title: 'Sliding Scale Fees',
    detail: "Financial hardship shouldn't be a barrier. Ask about our income-based payment options.",
  },
  {
    title: 'HSA / FSA Accepted',
    detail: 'Use your pre-tax health savings or flexible spending account toward treatment costs.',
  },
  {
    title: 'Flexible Payment Plans',
    detail: 'No-interest payment plans available for families with out-of-pocket costs.',
  },
];

export default function InsuranceSection() {
  return (
    <section className="w-full py-24 md:py-28 bg-whisper-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-end mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-ash font-medium">
              Insurance & Payment
            </span>
            <h2
              className="text-midnight-ink font-black leading-[1.0]"
              style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', letterSpacing: '-0.03em' }}
            >
              We handle the
              <br />
              financial side.
            </h2>
          </div>
          <p className="text-[15px] text-muted-ash font-light leading-[1.8] lg:pb-1">
            Getting your teen help shouldn't be complicated by billing confusion. We
            verify insurance, explain your coverage, and offer flexible payment options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: insurers */}
          <div className="flex flex-col gap-5">
            <p className="text-[13px] font-semibold text-midnight-ink tracking-tight">
              Accepted Insurance Plans
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {insurers.map((name) => (
                <div
                  key={name}
                  className="bg-canvas-white rounded-xl px-5 py-3.5 flex items-center gap-3 border border-black/[0.05]"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e8400d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[13px] font-medium text-midnight-ink">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-muted-ash font-light">
              Don&rsquo;t see your plan? Call us — we work with many additional insurers on a case-by-case basis.
            </p>
          </div>

          {/* Right: payment options */}
          <div className="flex flex-col gap-3">
            <p className="text-[13px] font-semibold text-midnight-ink tracking-tight mb-2">
              Payment Options
            </p>
            {paymentOptions.map(({ title, detail }) => (
              <div
                key={title}
                className="bg-canvas-white rounded-xl p-5 flex items-start gap-4 border border-black/[0.05]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-phoenix-orange flex-shrink-0 mt-2" />
                <div>
                  <p className="text-[14px] font-semibold text-midnight-ink tracking-tight mb-1">{title}</p>
                  <p className="text-[13px] text-muted-ash font-light leading-[1.65]">{detail}</p>
                </div>
              </div>
            ))}

            {/* Inline CTA */}
            <div className="bg-midnight-ink rounded-xl px-6 py-5 flex items-center justify-between gap-4 mt-1">
              <div>
                <p className="text-canvas-white font-semibold text-[14px] tracking-tight">Free benefits check</p>
                <p className="text-canvas-white/50 text-[12px] mt-0.5 font-light">
                  We verify your coverage in minutes.
                </p>
              </div>
              <Link
                href="/admissions"
                className="flex-shrink-0 px-5 py-2.5 rounded-full bg-canvas-white text-midnight-ink text-[13px] font-semibold cursor-pointer hover:bg-whisper-gray transition-colors duration-200 whitespace-nowrap"
              >
                Check Coverage
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
