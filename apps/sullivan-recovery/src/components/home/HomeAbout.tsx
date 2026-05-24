import Image from "next/image";
import Link from "next/link";

const TEAM_PHOTO =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_team_group.png";
const TEAM_PHOTO_2 =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_team1.png";

const STATS = [
  { value: "25+", label: "Years Combined Experience" },
  { value: "500+", label: "Alumni & Counting" },
  { value: "24/7", label: "Medical Supervision" },
  { value: "100%", label: "Individualized Care" },
];

export default function HomeAbout() {
  return (
    <section className="bg-[var(--sr-parchment)] pt-[100px] pb-14">
      <div className="sr-container">

        {/* Top label row */}
        <div className="mb-16 flex items-center gap-6 border-b border-[var(--sr-sand)] pb-8">
          <p className="sr-eyebrow">Who We Are</p>
          <div className="h-px flex-1 bg-[var(--sr-sand)]" />
          <p
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Mission Viejo, CA
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* Left: Big team photo + stat strip */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Main portrait photo */}
              <div className="overflow-hidden">
                <Image
                  src={TEAM_PHOTO}
                  alt="Sullivan Recovery team"
                  width={900}
                  height={560}
                  className="h-[320px] w-full object-cover object-top md:h-[420px]"
                />
              </div>

              {/* Inset small photo — overlaps bottom-right */}
              <div className="absolute -bottom-8 right-6 hidden overflow-hidden border-4 border-[var(--sr-parchment)] shadow-xl md:block">
                <Image
                  src={TEAM_PHOTO_2}
                  alt="Sullivan Recovery founders"
                  width={200}
                  height={200}
                  className="h-36 w-36 object-cover object-center"
                />
              </div>
            </div>

            {/* Stat strip below photo */}
            <div className="mt-10 grid grid-cols-2 border-t border-l border-[var(--sr-sand)] md:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col border-r border-b border-[var(--sr-sand)] px-6 py-5"
                >
                  <span
                    className="text-3xl font-light leading-none text-[var(--sr-moss)]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--sr-muted)]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Copy */}
          <div className="flex flex-col justify-center lg:col-span-5 lg:pl-6">
            <h2
              className="mb-8 text-[clamp(2.25rem,4vw,3.75rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Born from <br />
              <span className="italic text-[var(--sr-fern)]">lived experience</span>
            </h2>

            <p
              className="mb-6 text-base leading-7 text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Sullivan Recovery was born from the lived experiences of brothers
              Cory and Tyson Sullivan. Having faced the challenges of drug and
              alcohol addiction + mental health struggles firsthand, they
              understand the journey to recovery is deeply personal.
            </p>
            <p
              className="mb-10 text-base leading-7 text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              With over 25 years of combined experience in the addiction and
              mental health treatment field, they've made it their mission to
              provide compassionate, effective care — individualized,
              evidence-based therapy tailored to each person's unique needs.
            </p>

            {/* Inline quote */}
            <blockquote
              className="mb-10 border-l-2 border-[var(--sr-fern)] pl-5"
            >
              <p
                className="text-xl italic leading-snug text-[var(--sr-moss)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                "We've been there. That's what makes us different."
              </p>
              <footer
                className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                — Cory &amp; Tyson Sullivan, Founders
              </footer>
            </blockquote>

            <Link href="/our-approach/" className="sr-btn-primary self-start">
              Meet the Team
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
