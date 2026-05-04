const stats = [
  { value: '50+', label: 'Years Collective Experience', icon: 'ri-heart-line', color: '#C8795A' },
  { value: '12+', label: 'Therapeutic Modalities', icon: 'ri-group-line', color: '#6B7D67' },
  { value: '100%', label: 'Licensed Clinicians', icon: 'ri-seedling-line', color: '#DDA15E' },
  { value: 'CO', label: 'Colorado Residents', icon: 'ri-map-pin-line', color: '#8FA489' },
];

export default function StatsSection() {
  return (
    <section className="w-full bg-[#FAF8F5] py-14 px-8 md:px-16 border-b border-[#F0ECE1]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center gap-3 py-8 px-4 rounded-2xl bg-[#F0ECE1] anim-fade-up anim-delay-${i + 1} anim-visible`}
          >
            <div
              className="w-11 h-11 flex items-center justify-center rounded-full"
              style={{ backgroundColor: `${stat.color}18` }}
            >
              <i className={`${stat.icon} text-lg`} style={{ color: stat.color }}></i>
            </div>
            <p
              className="font-serif text-[#2C3B2E] font-bold leading-none"
              style={{ fontSize: 'clamp(30px, 3.5vw, 48px)' }}
            >
              {stat.value}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-[#3A4A3C]/50 font-light leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
