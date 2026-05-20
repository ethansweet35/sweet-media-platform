'use client';

import { useEffect, useRef, useState } from "react";

const headlineStats = [
  {
    number: "1,732",
    label: "Families Served",
    description:
      "Through our Fix Your Family program, where overwhelmed loved ones learned tools to navigate recovery with strength and unity.",
  },
  {
    number: "1,100",
    label: "Morning Meditations",
    description:
      "Participants engaged in our daily Morning Meditation support, creating a sacred space for reflection, peace, and collective resilience each dawn.",
  },
  {
    number: "421",
    label: "Coaching Hours",
    description:
      "Hours of one-on-one coaching provided at no cost since September, offering personalized guidance that turned whispers of doubt into roars of empowerment.",
  },
  {
    number: "70",
    label: "Crisis Interventions",
    description:
      "Family crisis interventions delivering immediate, compassionate help in those raw, pivotal moments when everything hangs in the balance.",
  },
  {
    number: "90",
    label: "Family Room Families",
    description:
      "Families supported through The Family Room, fostering safe havens where stories are shared, burdens are lightened, and bonds are mended.",
  },
  {
    number: "41",
    label: "Treatment Placements",
    description:
      "Individuals placed into treatment or intervention services through scholarships or reduced-fee access, removing financial obstacles so healing could truly begin.",
  },
];

function HeadlineCard({
  stat,
  index,
  visible,
}: {
  stat: (typeof headlineStats)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="relative bg-pure-white rounded-xl border border-mist/60 p-6 md:p-7 transition-all duration-500 hover:border-tfrf-blue/20 hover:shadow-sm group overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100 + 150}ms`,
      }}
    >
      {/* Subtle top accent */}
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-tfrf-blue/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <p className="text-[36px] md:text-[44px] font-display font-medium text-tfrf-blue leading-none mb-2">
        {stat.number}
      </p>
      <p className="text-[13px] md:text-[14px] font-display font-medium text-deep-navy mb-3 tracking-wide uppercase">
        {stat.label}
      </p>
      <p className="text-[13px] md:text-[14px] font-body text-slate leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
}

export default function ImpactHeadlineSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-soft-white py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Section header */}
        <div
          className="text-center mb-10 md:mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2 className="text-display-s font-display text-deep-navy mb-3">
            2025 at a Glance
          </h2>
          <div className="w-16 h-[2px] bg-tfrf-blue/30 mx-auto mb-5" />
          <p className="text-body-m font-body text-slate max-w-xl mx-auto">
            These are the moments your support brought to life. Together, we
            achieved:
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {headlineStats.map((stat, i) => (
            <HeadlineCard key={stat.label} stat={stat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}