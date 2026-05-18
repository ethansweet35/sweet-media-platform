const locations = [
  {
    label: "By The Beach",
    icon: "ri-sun-line",
    tag: "Most Popular",
    body: "The natural rhythm of the ocean supports emotional balance and stress reduction. Restorative activities, coastal air, and a serene atmosphere make it easier to focus on healing.",
  },
  {
    label: "In The Mountains",
    icon: "ri-mountain-line",
    tag: "Peaceful & Secluded",
    body: "A peaceful, secluded setting that fosters deep reflection and renewal. Surrounded by nature with breathtaking scenery and outdoor activities like hiking and guided meditation.",
  },
  {
    label: "In The City",
    icon: "ri-building-line",
    tag: "Urban Convenience",
    body: "Convenience, accessibility, and a wealth of resources supporting long-term recovery. Urban facilities help you gradually reintegrate into everyday life while receiving structured guidance.",
  },
];

export default function LpLocationOptions() {
  return (
    <section className="bg-[#F5F3E7]">
      <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px]">

        {/* Header */}
        <div className="mb-12 lg:mb-14">
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-4">
            Location Options
          </p>
          <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-end">
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.05]"
              style={{ fontSize: "clamp(34px, 4vw, 52px)" }}
            >
              Choose Your<br />
              <em className="italic text-ink/50">Recovery Setting</em>
            </h2>
            <p className="text-[14px] font-light leading-relaxed text-ink/60">
              We place clients in homes curated for healing — by the coast, in the mountains, or in the city depending on your preferences and clinical needs.
            </p>
          </div>
        </div>

        {/* Location cards */}
        <div className="grid md:grid-cols-3 gap-px bg-warm/50">
          {locations.map((loc, i) => (
            <div
              key={loc.label}
              className={`p-8 flex flex-col gap-5 ${i === 0 ? "bg-ink" : "bg-white hover:bg-cream-alt"} transition-colors duration-300`}
            >
              <div className="flex items-start justify-between">
                <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${i === 0 ? "bg-white/10 text-accent" : "bg-accent/10 text-accent"}`}>
                  <i className={`${loc.icon} text-lg`} />
                </span>
                <span className={`text-[9px] font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${i === 0 ? "bg-white/10 text-white/60" : "bg-accent/10 text-accent"}`}>
                  {loc.tag}
                </span>
              </div>
              <h3
                className={`font-[family-name:var(--font-display)] font-normal leading-snug ${i === 0 ? "text-white" : "text-ink"}`}
                style={{ fontSize: "clamp(22px, 2.5vw, 28px)" }}
              >
                {loc.label}
              </h3>
              <p className={`text-[13.5px] font-light leading-relaxed ${i === 0 ? "text-white/55" : "text-ink/65"}`}>
                {loc.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
