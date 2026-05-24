import Image from "next/image";
import Link from "next/link";
import AboutSectionHeader from "./AboutSectionHeader";

const TEAM_MAIN =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_team_group.png";
const TEAM_INSET =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_team1.png";

const STATS = [
  { value: "25+", label: "Years Combined Experience" },
  { value: "500+", label: "Lives Changed" },
  { value: "24/7", label: "Clinical Coverage" },
  { value: "1:1", label: "Personalized Plans" },
];

export default function AboutOrigin() {
  return (
    <section className="bg-[var(--sr-parchment)] py-[100px]">
      <div className="sr-container">
        <AboutSectionHeader
          variant="stacked"
          eyebrow="Our Story"
          title={
            <>
              Born from <span className="italic text-[var(--sr-fern)]">lived experience</span>
            </>
          }
          description={
            <>
              Brothers Cory &amp; Tyson Sullivan founded Sullivan Recovery on one conviction:
              recovery works best when it feels human.
            </>
          }
        />

        {/* Image + copy — tops aligned */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="relative pr-0 md:pr-28 lg:pr-32">
              <div className="overflow-hidden">
                <Image
                  src={TEAM_MAIN}
                  alt="Sullivan Recovery leadership and clinical team"
                  width={960}
                  height={600}
                  className="h-[280px] w-full object-cover object-top sm:h-[360px] lg:h-[400px]"
                />
              </div>
              <div className="absolute bottom-4 right-0 border-4 border-[var(--sr-parchment)] bg-[var(--sr-linen)] p-1 shadow-xl md:bottom-6">
                <Image
                  src={TEAM_INSET}
                  alt="Cory and Tyson Sullivan, founders"
                  width={200}
                  height={200}
                  className="h-28 w-28 object-cover sm:h-32 sm:w-32 lg:h-36 lg:w-36"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-0">
            <p
              className="text-[15px] leading-[1.85] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Sullivan Recovery was born from the lived experiences of brothers Cory and
              Tyson Sullivan. Having faced drug and alcohol addiction and mental health
              challenges firsthand, they understand that the journey to recovery is deeply
              personal — and that clinical excellence alone is not enough.
            </p>
            <p
              className="text-[15px] leading-[1.85] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              With more than 25 years of combined experience in addiction and mental health
              treatment, they built a program that pairs evidence-based medical detox with
              the restorative power of community, nature, music, and surf therapy — right
              here in Orange County.
            </p>

            <blockquote className="border-l-2 border-[var(--sr-fern)] py-1 pl-5">
              <p
                className="text-xl font-light italic leading-snug text-[var(--sr-moss)] lg:text-2xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                &ldquo;We&apos;ve been there. That&apos;s what makes us different.&rdquo;
              </p>
              <footer
                className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                — Cory &amp; Tyson Sullivan, Founders
              </footer>
            </blockquote>

            <Link href="/our-approach/our-team/" className="sr-btn-primary mt-1 self-start">
              Meet the Team
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
        </div>

        {/* Stats — full container width */}
        <div className="mt-12 grid grid-cols-2 border-t border-l border-[var(--sr-sand)] md:mt-14 md:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col justify-center border-r border-b border-[var(--sr-sand)] px-5 py-6 md:px-8 md:py-8"
            >
              <span
                className="text-3xl font-light leading-none text-[var(--sr-moss)] md:text-4xl"
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
    </section>
  );
}
