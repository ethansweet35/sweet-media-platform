import { stories } from "@/mocks/stories";

const stats = [
  { value: "247+", label: "Families Supported" },
  { value: "$1.2M", label: "Financial Aid Provided" },
  { value: "23", label: "States Reached" },
  { value: "24/7", label: "Private Messaging Access" },
];

export default function StoriesSection() {
  return (
    <section id="families" className="bg-pure-white pt-14 md:pt-18 lg:pt-20 pb-20 md:pb-28 lg:pb-36 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="max-w-xl mb-12 md:mb-16">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Our Impact
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15]">
            The Families We <em className="italic">Impact</em>
          </h2>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 pb-16 md:pb-24 border-b border-mist">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[36px] md:text-[48px] lg:text-[56px] font-display text-tfrf-blue leading-none mb-2">
                {stat.value}
              </p>
              <p className="text-body-s font-body text-slate">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Blocks */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 xl:gap-24">
          {/* Left: Image */}
          <div className="w-full lg:w-[45%] shrink-0 relative">
            <div className="absolute -top-4 -left-4 w-[65%] h-[65%] rounded-[30px] bg-powder-blue -z-10" />
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-deep-navy/5">
              <img
                src="https://readdy.ai/api/search-image?query=A%20warm%20diverse%20family%20of%20four%20sitting%20together%20on%20a%20couch%20in%20a%20bright%20living%20room%20having%20a%20genuine%20conversation%2C%20mother%20and%20father%20with%20two%20teenage%20children%2C%20soft%20natural%20window%20light%2C%20neutral%20cream%20and%20warm%20beige%20interior%20tones%2C%20plants%20and%20bookshelves%20in%20the%20soft%20background%2C%20expressions%20of%20hope%20and%20reconnection%2C%20editorial%20family%20photography%20style%20with%20shallow%20depth%20of%20field%2C%20warm%20inviting%20atmosphere%2C%20professional%20composition%20centered%20on%20the%20family%20group%2C%20documentary%20style%20authenticity%20showing%20real%20emotional%20healing%20and%20togetherness&width=800&height=600&seq=impact01&orientation=landscape"
                alt="A family sitting together on a couch having a genuine conversation, showing hope and reconnection"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right: Program descriptions */}
          <div className="w-full lg:w-[55%] flex flex-col gap-10 md:gap-14">
            {stories.map((story) => (
              <div key={story.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center shrink-0">
                    <i className="ri-heart-3-line w-5 h-5 flex items-center justify-center text-tfrf-blue text-lg" />
                  </div>
                  <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue">
                    {story.heading}
                  </p>
                </div>

                <h3 className="text-[22px] md:text-[26px] font-display text-deep-navy leading-[1.2] mb-4">
                  {story.name}
                </h3>

                <p className="text-body-m font-body text-slate leading-relaxed">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}