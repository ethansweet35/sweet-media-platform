import Image from "next/image";

const BASE = "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images";

const ACTIVITIES = [
  { img: `${BASE}/sr_act_surfing.jpg`,   title: "Surfing",       icon: "ri-ripple-line",        pos: "object-center" },
  { img: `${BASE}/sr_act_hiking.jpg`,    title: "Hiking",        icon: "ri-footprint-line",     pos: "object-center" },
  { img: `${BASE}/sr_act_yoga.jpg`,      title: "Yoga",          icon: "ri-mental-health-line", pos: "object-top" },
  { img: `${BASE}/sr_act_parks.jpg`,     title: "Parks",         icon: "ri-tree-line",          pos: "object-center" },
  { img: `${BASE}/sr_act_paddle.jpg`,    title: "Paddle Boarding", icon: "ri-sailboat-line",    pos: "object-center" },
  { img: `${BASE}/sr_act_themepark.jpg`, title: "Theme Parks",   icon: "ri-riding-line",        pos: "object-center" },
  { img: `${BASE}/sr_act_angels.jpg`,    title: "Angels Game",   icon: "ri-baseball-line",      pos: "object-center" },
  { img: `${BASE}/sr_act_beach.jpg`,     title: "Beach Life",    icon: "ri-sun-line",           pos: "object-center" },
];

export default function HomeActivities() {
  return (
    <section className="bg-[var(--sr-linen)] py-[100px]">
      <div className="sr-container">

        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-fern)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Life in Recovery
            </p>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Our <em className="italic text-[var(--sr-fern)]">activities</em>
            </h2>
          </div>
          <p
            className="max-w-sm text-[14px] leading-[1.8] text-[var(--sr-body)] md:text-right"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Recovery is more than treatment. We fill your days with experiences
            that remind you life is worth showing up for.
          </p>
        </div>

        {/* Asymmetric mosaic grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

          {/* Row 1: 2 tall + 1 wide spanning 2 cols */}
          {/* Col 1: tall */}
          <div className="group relative overflow-hidden md:row-span-2" style={{ minHeight: 420 }}>
            <Image src={ACTIVITIES[0].img} alt={ACTIVITIES[0].title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${ACTIVITIES[0].pos} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <i className={`${ACTIVITIES[0].icon} mb-2 text-xl text-white/60`} />
              <p className="text-lg font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>{ACTIVITIES[0].title}</p>
            </div>
          </div>

          {/* Col 2: tall */}
          <div className="group relative overflow-hidden md:row-span-2" style={{ minHeight: 420 }}>
            <Image src={ACTIVITIES[1].img} alt={ACTIVITIES[1].title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${ACTIVITIES[1].pos} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <i className={`${ACTIVITIES[1].icon} mb-2 text-xl text-white/60`} />
              <p className="text-lg font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>{ACTIVITIES[1].title}</p>
            </div>
          </div>

          {/* Col 3-4: two short stacked */}
          <div className="group relative col-span-2 overflow-hidden md:col-span-2" style={{ minHeight: 200 }}>
            <Image src={ACTIVITIES[2].img} alt={ACTIVITIES[2].title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${ACTIVITIES[2].pos} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <i className={`${ACTIVITIES[2].icon} mb-2 text-xl text-white/60`} />
              <p className="text-lg font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>{ACTIVITIES[2].title}</p>
            </div>
          </div>

          <div className="group relative col-span-2 overflow-hidden md:col-span-2" style={{ minHeight: 200 }}>
            <Image src={ACTIVITIES[3].img} alt={ACTIVITIES[3].title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${ACTIVITIES[3].pos} transition-transform duration-700 group-hover:scale-105`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <i className={`${ACTIVITIES[3].icon} mb-2 text-xl text-white/60`} />
              <p className="text-lg font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>{ACTIVITIES[3].title}</p>
            </div>
          </div>

          {/* Row 2: 4 equal */}
          {ACTIVITIES.slice(4).map((act) => (
            <div key={act.title} className="group relative overflow-hidden" style={{ minHeight: 220 }}>
              <Image src={act.img} alt={act.title} fill loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" className={`object-cover ${act.pos} transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-charcoal)]/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <i className={`${act.icon} mb-1.5 text-lg text-white/60`} />
                <p className="text-base font-light text-white" style={{ fontFamily: "var(--font-cormorant)" }}>{act.title}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
