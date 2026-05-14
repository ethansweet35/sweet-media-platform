const locations = [
  {
    label: "By The Beach",
    icon: "ri-sun-line",
    body: "Living in a detox facility by the beach offers a uniquely calming environment where the natural rhythm of the ocean supports emotional balance and stress reduction. The serene atmosphere encourages mindfulness, making it easier to focus on healing while enjoying restorative activities like beach walks and fresh coastal air.",
  },
  {
    label: "In The Mountains",
    icon: "ri-mountain-line",
    body: "A rehab facility in the mountains provides a peaceful, secluded setting that fosters reflection and renewal. Surrounded by nature, individuals benefit from quiet spaces, breathtaking scenery, and outdoor activities like hiking and meditation that help build resilience and create an ideal atmosphere for deep healing.",
  },
  {
    label: "In The City",
    icon: "ri-building-line",
    body: "Rehab programs in the city offer convenience, accessibility, and a wealth of resources that support long-term recovery. Urban facilities help individuals gradually reintegrate into everyday life, practicing new coping skills in real-world settings while receiving structured guidance and support.",
  },
];

export default function LpLocationOptions() {
  return (
    <section style={{ background: "linear-gradient(145deg, #F8F6F3 0%, #F4F4F6 100%)" }} className="py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Location Options</p>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
          >
            Choose Your Recovery Setting
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm font-light leading-relaxed text-ink/60">
            We place clients in homes curated for healing — by the coast, in the mountains, or in the city depending on your needs and preferences.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {locations.map((loc) => (
            <div key={loc.label} className="bg-white border border-warm/50 p-8">
              <div className="w-10 h-10 flex items-center justify-center border border-ink/15 mb-5">
                <i className={`${loc.icon} text-accent text-lg`} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink mb-3">{loc.label}</h3>
              <p className="text-sm font-light leading-relaxed text-ink/70">{loc.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
