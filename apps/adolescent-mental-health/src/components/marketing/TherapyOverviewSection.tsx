import Image from "next/image";
import { CONTAINER } from "@/lib/site";
import { SECTION_PY } from "./tokens";

export type TherapyOverviewHighlight = {
  icon: string;
  title: string;
  body: string;
};

type TherapyOverviewSectionProps = {
  eyebrow: string;
  title: React.ReactNode;
  summary: string;
  highlights: [TherapyOverviewHighlight, TherapyOverviewHighlight, TherapyOverviewHighlight];
  pullQuote?: string;
  image: { src: string; alt: string };
  imageStat?: { value: string; label: string };
};

export default function TherapyOverviewSection({
  eyebrow,
  title,
  summary,
  highlights,
  pullQuote,
  image,
  imageStat,
}: TherapyOverviewSectionProps) {
  return (
    <section className={`bg-surface px-6 ${SECTION_PY} lg:px-10`}>
      <div className={`${CONTAINER} w-full`}>
        <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-border">
          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)]">
            <div className="flex flex-col justify-center p-8 lg:p-12 xl:p-14">
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-10 bg-accent" aria-hidden />
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
              </div>

              <h2
                className="text-3xl font-bold leading-[1.12] text-ink md:text-4xl lg:text-[2.75rem]"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                {title}
              </h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-body">{summary}</p>

              <ul className="mt-9 space-y-5">
                {highlights.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-accent ring-1 ring-border">
                      <i className={`${item.icon} text-lg`} aria-hidden />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="text-base font-bold text-ink" style={{ fontFamily: "var(--font-heebo)" }}>
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-body">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {pullQuote ? (
                <p className="mt-9 border-t border-border pt-7 text-sm italic leading-7 text-body/90">
                  &ldquo;{pullQuote}&rdquo;
                </p>
              ) : null}
            </div>

            <div className="relative min-h-[280px] border-t border-border lg:min-h-[520px] lg:border-l lg:border-t-0">
              <Image src={image.src} alt={image.alt} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 640px" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-dark/5 to-transparent lg:bg-gradient-to-l lg:from-dark/30 lg:via-transparent lg:to-transparent" />
              {imageStat ? (
                <div className="absolute bottom-5 left-5 right-5 lg:bottom-8 lg:left-8 lg:right-8">
                  <div className="inline-flex flex-col rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur-md">
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                      {imageStat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">
                      {imageStat.label}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
