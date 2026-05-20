import { useState } from "react";
import { services } from "@/mocks/services";

export default function ServicesSection() {
  const [openId, setOpenId] = useState<string | null>(services[0].id);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="services" className="bg-soft-white py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Family Programming
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15]">
            Programs Designed for <em className="italic">Recovery</em>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row-reverse items-start gap-12 lg:gap-16 xl:gap-24">
          {/* Right: Image */}
          <div className="w-full lg:w-[48%] shrink-0">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-deep-navy/10">
              <img
                src="https://readdy.ai/api/search-image?query=A%20warm%20and%20supportive%20family%20counseling%20session%20indoors%20with%20a%20professional%20female%20counselor%20seated%20across%20from%20a%20mother%20and%20teenage%20daughter%20in%20a%20modern%20bright%20therapy%20office%20with%20soft%20neutral%20tones%2C%20bookshelves%20in%20the%20background%2C%20natural%20daylight%20coming%20through%20large%20windows%2C%20the%20counselor%20holding%20a%20notebook%20and%20pen%20while%20listening%20attentively%2C%20the%20family%20members%20engaged%20in%20conversation%20showing%20hope%20and%20connection%2C%20editorial%20photography%20style%2C%20warm%20inviting%20atmosphere%20with%20cream%20and%20soft%20white%20color%20palette%2C%20professional%20but%20approachable%20mood%2C%20shallow%20depth%20of%20field%2C%20high%20quality%20documentary%20style%20composition&width=800&height=1000&seq=services01&orientation=portrait"
                alt="A family counselor listening attentively to a mother and daughter during a support session"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Left: Accordion */}
          <div className="w-full lg:w-[52%]">
            <div className="border-t border-mist">
              {services.map((service) => {
                const isOpen = openId === service.id;
                return (
                  <div
                    key={service.id}
                    className="border-b border-mist"
                  >
                    <button
                      onClick={() => toggle(service.id)}
                      className="w-full flex items-center justify-between py-5 md:py-6 text-left group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[17px] md:text-[19px] font-display text-deep-navy group-hover:text-tfrf-blue transition-colors duration-200 pr-4">
                        {service.title}
                      </span>
                      <span
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-mist flex items-center justify-center shrink-0 group-hover:border-tfrf-blue group-hover:bg-tfrf-blue group-hover:text-pure-white transition-all duration-200"
                      >
                        <i
                          className={`ri-arrow-right-up-line w-5 h-5 flex items-center justify-center text-lg transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                        />
                      </span>
                    </button>

                    {/* Expanded content */}
                    <div
                      className="overflow-hidden transition-all duration-300 ease-out"
                      style={{
                        maxHeight: isOpen ? "200px" : "0px",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="pb-5 md:pb-6 pr-14">
                        <p className="text-caption font-body font-semibold uppercase tracking-wider text-tfrf-blue mb-2">
                          {service.schedule}
                        </p>
                        <p className="text-body-s font-body text-slate leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}