const stats = [
  { value: '500+', label: 'Teens Helped' },
  { value: '98%', label: 'Family Satisfaction' },
  { value: '3–5', label: 'Days to First Session' },
  { value: '24/7', label: 'Crisis Support' },
];

export default function TrustStrip() {
  return (
    <section className="w-full bg-canvas-white border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className={`py-8 md:py-10 flex flex-col gap-1.5 ${
                i < stats.length - 1
                  ? 'border-r border-black/[0.06] pr-8 md:pr-12'
                  : ''
              } ${i > 0 ? 'pl-8 md:pl-12' : ''} ${
                i === 1 ? 'border-b md:border-b-0 border-black/[0.06]' : ''
              } ${i === 0 ? 'border-b md:border-b-0 border-black/[0.06]' : ''}`}
            >
              <span
                className="text-midnight-ink font-black leading-none"
                style={{ fontSize: 'clamp(28px, 3vw, 38px)', letterSpacing: '-0.04em' }}
              >
                {value}
              </span>
              <span className="text-[11px] uppercase tracking-[0.1em] text-muted-ash font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
