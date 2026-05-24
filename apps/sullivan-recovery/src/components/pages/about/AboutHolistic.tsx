import Image from "next/image";
import Link from "next/link";
import AboutSectionHeader from "./AboutSectionHeader";

const TRAIL_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_process_trail.jpg";
const SURF_IMG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_cory_surf_v2.jpg";

const THERAPIES = [
  {
    label: "Surf Therapy",
    desc: "Ocean-centered sessions led by founder Cory Sullivan — movement, mindfulness, and renewal.",
    href: "/addiction-aftercare-program/",
    icon: "ri-ripple-line",
  },
  {
    label: "Music Therapy",
    desc: "Creative expression and live performance as tools for emotional processing and connection.",
    href: "/programs/",
    icon: "ri-music-2-line",
  },
  {
    label: "Nature & Outings",
    desc: "Hiking, beaches, and Orange County experiences that remind clients life beyond addiction is vivid.",
    href: "/daily-schedule/",
    icon: "ri-landscape-line",
  },
];

export default function AboutHolistic() {
  return (
    <section className="bg-[var(--sr-linen)] py-[100px]">
      <div className="sr-container">
        <AboutSectionHeader
          variant="stacked"
          eyebrow="Holistic Healing"
          title={
            <>
              Recovery that reaches beyond the{" "}
              <span className="italic text-[var(--sr-fern)]">clinical chart</span>
            </>
          }
          description={
            <>
              We believe sustainable sobriety grows when the body, mind, and spirit are all
              tended to. Sullivan Recovery integrates experiential therapies alongside medical
              detox and residential treatment in one of California&apos;s most beautiful settings.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          {/* Therapy cards */}
          <ul className="flex flex-col gap-3 lg:justify-center">
            {THERAPIES.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-4 border border-[var(--sr-sand)] bg-[var(--sr-parchment)] p-4 transition hover:border-[var(--sr-fern)] md:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--sr-moss)] text-[var(--sr-sage)]">
                    <i className={`${item.icon} text-lg`} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-lg font-medium text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-0.5 text-[13px] leading-relaxed text-[var(--sr-muted)]"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <i
                    className="ri-arrow-right-line shrink-0 text-[var(--sr-muted)] transition group-hover:text-[var(--sr-fern)]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Images — equal height, stretches to match card column on desktop */}
          <div className="grid h-[300px] min-h-[300px] grid-cols-5 gap-3 sm:h-[380px] sm:min-h-[380px] lg:h-full lg:min-h-[420px]">
            <div className="relative col-span-3 h-full min-h-[200px] overflow-hidden">
              <Image
                src={TRAIL_IMG}
                alt="Nature trail near Sullivan Recovery for holistic outings"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 55vw, 28vw"
              />
            </div>
            <div className="relative col-span-2 h-full min-h-[200px] overflow-hidden">
              <Image
                src={SURF_IMG}
                alt="Surf therapy session with Cory Sullivan"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 40vw, 18vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--sr-moss)]/90 via-[var(--sr-moss)]/25 to-transparent" />
              <p
                className="absolute inset-x-0 bottom-0 p-4 text-base font-light italic leading-snug text-white sm:p-5 sm:text-lg"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Healing on the water, on the trail, in community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
