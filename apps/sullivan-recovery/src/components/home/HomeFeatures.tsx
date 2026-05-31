const FEATURES = [
  { icon: "ri-24-hours-line", title: "Available 24/7", desc: "Round-the-clock medical care and compassionate support." },
  { icon: "ri-smartphone-line", title: "Keep Your Phone", desc: "Stay connected with your loved ones and your life." },
  { icon: "ri-door-lock-line", title: "Private Rooms", desc: "Comfortable, private spaces dedicated to your healing." },
  { icon: "ri-calendar-check-line", title: "Same Day Intake", desc: "Immediate help and intake when you need it most." },
  { icon: "ri-shield-check-line", title: "Insurance Verified", desc: "We work with most major PPO policies to cover costs." },
  { icon: "ri-group-line", title: "Aftercare Path", desc: "Long-term planning and support for lasting sobriety." },
];

const REVIEWS = [
  {
    name: "Jesse Green",
    text: "I came to Sullivan with no idea of what to expect. Cory Sullivan is amazing and so is his staff. T.J., Amber, Jessica, Brian, Dory and the rest of the team made me feel at home.",
  },
  {
    name: "Tami Collins",
    text: "I love this place so much. It's a beautiful and clean house. All the staff here are awesome and caring people. I will truly miss all of them.",
  },
  {
    name: "Mark Williams",
    text: "Joining Sullivan Recovery was a life-changing decision for me. The unwavering support from the staff were beyond my expectations.",
  }
];

export default function HomeFeatures() {
  return (
    <>
      {/* Features Section */}
      <section className="bg-[var(--sr-parchment)] py-[100px]">
        <div className="sr-container">
          {/* Split Editorial Header */}
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="sr-eyebrow mb-4">Sullivan Recovery</p>
              <h2
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Drug &amp; Alcohol <br />
                <span className="italic text-[var(--sr-fern)]">Addiction Treatment</span>
              </h2>
            </div>
            <div className="max-w-md lg:pb-2">
              <p
                className="text-base leading-relaxed text-[var(--sr-body)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                We offer the highest quality resources to support your recovery journey,
                ensuring absolute comfort and maximizing your insurance benefits.
              </p>
            </div>
          </div>

          {/* Architectural Flush Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--sr-sand)]">
            {FEATURES.map((feat, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between overflow-hidden border-r border-b border-[var(--sr-sand)] bg-white p-10 transition-all duration-500 hover:bg-[var(--sr-moss)]"
              >
                {/* Top Row: Icon & Visible Number */}
                <div className="mb-14 flex items-start justify-between relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--sr-parchment)] transition-colors duration-500 group-hover:bg-[var(--sr-bark)]">
                    <i className={`${feat.icon} text-2xl text-[var(--sr-moss)] transition-colors duration-500 group-hover:text-[var(--sr-parchment)]`} />
                  </div>
                  <div
                    className="text-5xl font-light text-[var(--sr-clay)] opacity-50 transition-colors duration-500 group-hover:text-[var(--sr-fern)] group-hover:opacity-100"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    0{i + 1}
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative z-10">
                  <h3
                    className="mb-3 text-[1.75rem] font-light text-[var(--sr-ink)] transition-colors duration-500 group-hover:text-white"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="text-[15px] leading-relaxed text-[var(--sr-body)] transition-colors duration-500 group-hover:text-[var(--sr-parchment)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {feat.desc}
                  </p>
                </div>
                
                {/* Decorative Bottom Line (Animates on hover) */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[var(--sr-fern)] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section — dense, editorial, full-bleed moss */}
      <section className="bg-[var(--sr-moss)] py-[100px]">
        <div className="sr-container">

          {/* Compact label row */}
          <div className="mb-12 flex items-center justify-between border-b border-[var(--sr-sage)]/20 pb-6">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Patient Stories
            </p>
            <div className="flex items-center gap-2.5">
              <div className="flex text-[var(--sr-clay)]">
                {[...Array(5)].map((_, i) => <i key={i} className="ri-star-fill text-xs" />)}
              </div>
              <span
                className="text-[10px] font-medium uppercase tracking-widest text-white/50"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                5.0 Google
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2
            className="mb-16 text-[clamp(2.5rem,4vw,4rem)] font-light leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Hear from those who have{" "}
            <span className="italic text-[var(--sr-sage)]">walked this path</span>
          </h2>

          {/* Stacked horizontal reviews — feels like a feed, not cards */}
          <div className="flex flex-col divide-y divide-[var(--sr-sage)]/20">
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="group grid grid-cols-1 gap-6 py-10 transition-colors duration-300 hover:bg-[var(--sr-bark)]/20 md:grid-cols-12 md:gap-12 md:py-8"
              >
                {/* Index */}
                <div className="hidden items-start pt-1 md:col-span-1 md:flex">
                  <span
                    className="text-sm font-light text-[var(--sr-sage)]/50"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Quote text */}
                <p
                  className="text-[1.25rem] italic leading-relaxed text-white md:col-span-7"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author + stars — right-aligned */}
                <div className="flex flex-col justify-center gap-2 md:col-span-4 md:items-end md:text-right">
                  <div className="flex text-[var(--sr-clay)] md:justify-end">
                    {[...Array(5)].map((_, j) => <i key={j} className="ri-star-fill text-xs" />)}
                  </div>
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-wider text-[var(--sr-sage)]/70"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Verified Alumni
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
