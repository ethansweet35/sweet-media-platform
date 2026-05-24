import Link from "next/link";

const HERO_VIDEO =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/videos/sr_home_hero_video.mp4";

export default function HomeHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-start overflow-hidden py-[100px]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      {/* Dark Earthy Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(30,31,27,0.95) 0%, rgba(44,57,40,0.7) 50%, rgba(0,0,0,0.2) 100%)",
        }}
      />


      <div className="sr-container relative z-10 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.2em] uppercase text-[#D4C9B5]">
            <span className="h-2 w-2 rounded-full bg-[#8FA882]" />
            Welcome to Sullivan Recovery
          </div>

          {/* Headline */}
          <h1
            className="mb-6 text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Drug &amp; Alcohol Detox In Mission Viejo
          </h1>

          {/* Sub-copy */}
          <p
            className="mb-10 text-base leading-relaxed text-[#EDE8DF] md:text-lg"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Are you ready to reclaim your life? Start your journey with our
            dedicated team of compassionate professionals in Orange County.
            Expert medical detox with a foundation in nature and wellness.
          </p>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-8">
            <Link
              href="/insurance/"
              className="flex items-center justify-center bg-[#8FA882] px-8 py-4 text-[14px] font-medium text-[#1E1F1B] transition hover:bg-[#D4C9B5]"
            >
              Verify Insurance
            </Link>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1E1F1B] bg-[#5C7A4E] text-white shadow-sm">
                  <i className="ri-user-smile-fill text-lg" />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1E1F1B] bg-[#A6876A] text-white shadow-sm">
                  <i className="ri-user-heart-fill text-lg" />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1E1F1B] bg-[#D4C9B5] text-[#1E1F1B] shadow-sm">
                  <span className="text-[10px] font-bold">5.0</span>
                </div>
              </div>
              <div className="text-[13px] font-medium text-white/90">
                More than 500+ <br /> Client Reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
