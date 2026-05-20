import { useState } from "react";

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="about" className="bg-pure-white pt-20 md:pt-28 lg:pt-36 pb-10 md:pb-14 lg:pb-20 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24">
          {/* Left: Video / Image */}
          <div className="w-full lg:w-[45%] shrink-0 relative">
            {/* Soft decorative shape behind */}
            <div className="absolute -top-8 -left-8 w-[85%] h-[85%] rounded-[40px] bg-mist -z-10" />

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-deep-navy/10 shadow-xl">
              {!isPlaying ? (
                <>
                  <img
                    src="https://readdy.ai/api/search-image?query=A%20professional%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20sitting%20outdoors%20near%20a%20large%20tree%20trunk%2C%20natural%20park%20setting%20with%20soft%20green%20grass%20and%20blurred%20background%2C%20warm%20natural%20daylight%2C%20friendly%20approachable%20expression%2C%20documentary%20interview%20style%20photography%2C%20cool%20natural%20tones%2C%20shallow%20depth%20of%20field%2C%20professional%20video%20thumbnail%20composition%20with%20subject%20centered&width=800&height=1000&seq=aboutvideo01&orientation=portrait"
                    alt="Video thumbnail featuring a speaker sharing their recovery story"
                    className="w-full h-full object-cover object-top"
                  />
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    aria-label="Play video"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/40 flex items-center justify-center group-hover:bg-black/50 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                      <i className="ri-play-fill w-8 h-8 flex items-center justify-center text-pure-white text-3xl ml-1" />
                    </div>
                  </button>
                </>
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  poster="https://readdy.ai/api/search-image?query=A%20professional%20man%20in%20his%2030s%20wearing%20a%20light%20blue%20button-up%20shirt%20sitting%20outdoors%20near%20a%20large%20tree%20trunk%2C%20natural%20park%20setting%20with%20soft%20green%20grass%20and%20blurred%20background%2C%20warm%20natural%20daylight%2C%20friendly%20approachable%20expression%2C%20documentary%20interview%20style%20photography%2C%20cool%20natural%20tones%2C%20shallow%20depth%20of%20field%2C%20professional%20video%20thumbnail%20composition%20with%20subject%20centered&width=800&height=1000&seq=aboutvideo01&orientation=portrait"
                >
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-[55%]">
            {/* Eyebrow */}
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
              About The Family Recovery Foundation
            </p>

            {/* Heading */}
            <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15] mb-6 md:mb-8">
              Nationwide Recovery Support, Built Around <em className="italic">Families</em>
            </h2>

            {/* Body paragraphs */}
            <p className="text-body-m font-body text-slate leading-relaxed mb-4">
              At The Family Recovery Foundation, we have built a nationwide network of certified counselors,
              peer advocates, and community partners — all committed to delivering exceptional recovery
              support through an innovative, family-centered approach.
            </p>
            <p className="text-body-m font-body text-slate leading-relaxed mb-8 md:mb-10">
              Our services foster prevention, education, and lasting support, with a strong focus on
              client needs. Every day, we cultivate a flexible and supportive environment that encourages
              healing, growth, and generational change for families in recovery.
            </p>

            {/* Contact numbers */}
            <div className="flex items-center gap-4 mb-8 md:mb-10 font-display text-deep-navy">
              <a href="tel:888-964-8825" className="text-[22px] md:text-[26px] hover:text-tfrf-blue transition-colors duration-200">
                888-964-8825
              </a>
              <span className="text-stone-blue text-lg">or</span>
              <a href="tel:949-701-0145" className="text-[22px] md:text-[26px] hover:text-tfrf-blue transition-colors duration-200">
                949-701-0145
              </a>
            </div>

            {/* Progress bar */}
            <div className="mb-8 md:mb-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-s font-body font-semibold text-deep-navy">
                  Families Reached
                </span>
                <span className="text-body-s font-body font-semibold text-deep-navy">
                  247+
                </span>
              </div>
              <div className="h-1.5 bg-mist rounded-full overflow-hidden">
                <div
                  className="h-full bg-tfrf-blue rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>

            {/* Founder / Signature area */}
            <div className="flex items-center gap-6 mb-8 md:mb-10">
              <div className="w-12 h-12 rounded-full bg-mist flex items-center justify-center shrink-0">
                <i className="ri-quill-pen-line w-5 h-5 flex items-center justify-center text-tfrf-blue text-xl" />
              </div>
              <div>
                <p className="text-body-s font-body font-semibold text-deep-navy">
                  Ryan Soares
                </p>
                <p className="text-caption font-body text-slate">
                  CEO &amp; Founder of The Family Recovery Foundation
                </p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-mist flex items-center justify-center text-slate hover:bg-tfrf-blue hover:text-pure-white hover:border-tfrf-blue transition-all duration-200"
              >
                <i className="ri-youtube-fill w-5 h-5 flex items-center justify-center text-lg" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-mist flex items-center justify-center text-slate hover:bg-tfrf-blue hover:text-pure-white hover:border-tfrf-blue transition-all duration-200"
              >
                <i className="ri-tiktok-fill w-5 h-5 flex items-center justify-center text-lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-mist flex items-center justify-center text-slate hover:bg-tfrf-blue hover:text-pure-white hover:border-tfrf-blue transition-all duration-200"
              >
                <i className="ri-instagram-line w-5 h-5 flex items-center justify-center text-lg" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-mist flex items-center justify-center text-slate hover:bg-tfrf-blue hover:text-pure-white hover:border-tfrf-blue transition-all duration-200"
              >
                <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center text-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}