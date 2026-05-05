import Link from 'next/link';

const comparisons = [
  {
    topic: 'Session Frequency',
    outpatient: '3–5 days/week, structured programming',
    traditional: '1 session per week',
  },
  {
    topic: 'Level of Support',
    outpatient: 'High-intensity, wraparound care',
    traditional: 'Low-to-moderate, maintenance-focused',
  },
  {
    topic: 'Group Therapy',
    outpatient: 'Included — daily peer connection',
    traditional: 'Rarely included',
  },
  {
    topic: 'Family Involvement',
    outpatient: 'Structured family sessions weekly',
    traditional: 'Occasionally offered',
  },
  {
    topic: 'Crisis Response',
    outpatient: 'Immediate clinical support available',
    traditional: 'Between-session gaps',
  },
  {
    topic: 'Best For',
    outpatient: 'Moderate-to-severe symptoms needing structure',
    traditional: 'Maintenance after stabilization',
  },
];

export default function OutpatientVsTraditionalSection() {
  return (
    <section className="w-full py-24 bg-midnight-ink overflow-hidden relative">
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #b7efb2 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #e2ddfd 0%, transparent 70%)', transform: 'translate(20%, 20%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 relative z-10">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-14 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas-white/10 w-fit">
            <span className="text-[11px] font-medium text-canvas-white/60 uppercase tracking-widest">Outpatient vs. Traditional</span>
          </div>
          <h2 className="text-[40px] font-bold text-canvas-white leading-[1.1] tracking-tight">
            Is outpatient the right<br />level of care?
          </h2>
          <p className="text-[15px] text-canvas-white/55 leading-[1.75] font-light">
            Not every teen needs weekly therapy — and some need more. Understanding the difference helps families make the right choice.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl overflow-hidden border border-canvas-white/10">
          {/* Table header */}
          <div className="grid grid-cols-3 bg-canvas-white/8 border-b border-canvas-white/10">
            <div className="px-6 py-4">
              <span className="text-[11px] font-medium text-canvas-white/40 uppercase tracking-widest">Category</span>
            </div>
            <div className="px-6 py-4 border-l border-canvas-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-mint-green" />
                <span className="text-[11px] font-medium text-canvas-white uppercase tracking-widest">Outpatient (IOP)</span>
              </div>
            </div>
            <div className="px-6 py-4 border-l border-canvas-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-canvas-white/30" />
                <span className="text-[11px] font-medium text-canvas-white/50 uppercase tracking-widest">Traditional Therapy</span>
              </div>
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, i) => (
            <div
              key={row.topic}
              className={`grid grid-cols-3 border-b border-canvas-white/8 last:border-b-0 ${i % 2 === 0 ? '' : 'bg-canvas-white/[0.03]'}`}
            >
              <div className="px-6 py-4">
                <span className="text-[13px] font-medium text-canvas-white/50">{row.topic}</span>
              </div>
              <div className="px-6 py-4 border-l border-canvas-white/8">
                <div className="flex items-start gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b7efb2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-[13px] text-canvas-white/80 font-light leading-[1.5]">{row.outpatient}</span>
                </div>
              </div>
              <div className="px-6 py-4 border-l border-canvas-white/8">
                <span className="text-[13px] text-canvas-white/40 font-light leading-[1.5]">{row.traditional}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-[14px] text-canvas-white/50 font-light">
            Our clinical team will help determine the right level of care for your teen during a free intake call.
          </p>
          <Link
            href="/admissions"
            className="flex-shrink-0 px-5 py-2.5 rounded-lg bg-canvas-white text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200 whitespace-nowrap"
          >
            Schedule a Free Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
