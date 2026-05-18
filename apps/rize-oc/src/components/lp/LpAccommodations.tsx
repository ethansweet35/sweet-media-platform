const features = [
  {
    icon: "ri-smartphone-line",
    title: "Keep Your Phone",
    body: "Unlike many detox programs, we allow you to keep your phone so you can stay connected to loved ones and your support network throughout your recovery.",
  },
  {
    icon: "ri-door-closed-line",
    title: "Private Rooms",
    body: "Your own space to rest, reflect, and recover at your own pace. Privacy reduces stress and gives you the quiet you need to heal physically and emotionally.",
  },
  {
    icon: "ri-hotel-line",
    title: "Luxury Amenities",
    body: "Placed in a curated coastal sanctuary — calming surroundings, supportive staff, and a premium environment built for lasting transformation.",
  },
];

export default function LpAccommodations() {
  return (
    <section id="accommodations" className="bg-white">
      <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px]">
        <div className="grid lg:grid-cols-[360px_1fr] gap-14 lg:gap-20 items-start">

          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-5">
              House Accommodations
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.05] mb-6"
              style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
            >
              Comfort &amp; Privacy<br />
              <em className="italic text-ink/55">Throughout Recovery</em>
            </h2>
            <p className="text-[15px] font-light leading-relaxed text-ink/60">
              Every detail of our facility is designed to reduce friction and maximize healing — from your first day in detox through your last day of treatment.
            </p>
          </div>

          {/* Right — feature tiles */}
          <div className="grid gap-px bg-warm/40">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white hover:bg-cream-alt transition-colors duration-300 p-8 flex gap-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 mt-0.5">
                  <i className={`${f.icon} text-lg`} />
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-2 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-[14px] font-light leading-relaxed text-ink/65">{f.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
