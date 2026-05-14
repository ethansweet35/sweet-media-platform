const features = [
  {
    icon: "ri-smartphone-line",
    title: "Keep Your Phone With You",
    body: "We understand that staying connected to your loved ones is an important part of the healing process. Unlike many detox programs, we allow you to keep your phone so you can reach out for support, encouragement, and reassurance whenever you need it.",
  },
  {
    icon: "ri-door-closed-line",
    title: "Private Rooms",
    body: "Privacy matters when you're going through detox. That's why we offer comfortable private rooms where you can rest, reflect, and recover at your own pace. Having your own space helps reduce stress and gives you the quiet you need to heal physically and emotionally.",
  },
  {
    icon: "ri-hotel-line",
    title: "Luxury Amenities",
    body: "Get placed in one of our luxury houses by the beach, in the mountains, or in the city. With calming surroundings, supportive staff, and a safe space away from daily stress, you can begin your journey toward lasting sobriety in an environment built for healing.",
  },
];

export default function LpAccommodations() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">House Accommodations</p>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
          >
            Comfort &amp; Privacy Throughout Your Recovery
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="border border-warm/40 bg-[#F8F6F3] p-8">
              <div className="w-11 h-11 flex items-center justify-center border border-ink/15 mb-5">
                <i className={`${f.icon} text-accent text-xl`} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-3">{f.title}</h3>
              <p className="text-sm font-light leading-relaxed text-ink/70">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
