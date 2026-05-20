export default function GalaScheduleSection() {
  const scheduleItems = [
    {
      time: "6:00 PM",
      title: "Doors Open",
      description: "Welcome reception with hors d'oeuvres and refreshments. Mingle with fellow attendees and explore the venue.",
      icon: "ri-door-open-line",
    },
    {
      time: "6:30 PM",
      title: "Dinner Service",
      description: "A beautifully plated dinner experience. Enjoy an evening of fine cuisine while connecting with community leaders.",
      icon: "ri-restaurant-line",
    },
    {
      time: "7:30 PM",
      title: "Mission Moment",
      description: "Hear powerful stories from families who have been impacted by our programs and the hope your support brings.",
      icon: "ri-heart-3-line",
    },
    {
      time: "8:00 PM",
      title: "Live Auction & Fundraising",
      description: "Exciting auction items and a special fundraising appeal to directly support our family programming initiatives.",
      icon: "ri-auction-line",
    },
    {
      time: "9:00 PM",
      title: "Entertainment & Dancing",
      description: "Live music and dancing to close out an unforgettable evening of community, compassion, and celebration.",
      icon: "ri-music-2-line",
    },
  ];

  return (
    <section className="bg-pure-white py-16 md:py-20 lg:py-24 border-t border-mist/60">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-3">
            The Evening
          </p>
          <h2 className="font-display text-display-m text-deep-navy">
            What to Expect
          </h2>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {scheduleItems.map((item, index) => (
            <div key={item.title} className="relative flex gap-5 md:gap-8">
              {/* Timeline line */}
              {index !== scheduleItems.length - 1 && (
                <div className="absolute left-[18px] md:left-[22px] top-12 bottom-0 w-[2px] bg-mist" />
              )}

              {/* Icon / dot */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-soft-white border-2 border-powder-blue flex items-center justify-center">
                  <i className={`${item.icon} w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-tfrf-blue text-sm md:text-base`} />
                </div>
              </div>

              {/* Content */}
              <div className="pb-10 md:pb-12 flex-1 min-w-0">
                <span className="inline-block px-3 py-1 bg-soft-white rounded-full text-caption font-body font-semibold text-tfrf-blue tracking-wider mb-2">
                  {item.time}
                </span>
                <h3 className="font-display text-body-l md:text-display-s text-deep-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-body-s font-body text-slate leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}