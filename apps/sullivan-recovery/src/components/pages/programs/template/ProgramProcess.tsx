import Image from "next/image";
import type { ProgramPageData } from "@/types/programPage";

type Props = ProgramPageData["process"];

export default function ProgramProcess({
  eyebrow,
  title,
  titleAccent,
  description,
  steps,
}: Props) {
  const [featured, ...rest] = steps;

  return (
    <section className="border-t border-[var(--sr-sand)] bg-[var(--sr-linen)] py-14 md:py-20">
      <div className="sr-container">
        <div className="mb-10 flex flex-col gap-6 border-b border-[var(--sr-sand)] pb-10 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-xl">
            {eyebrow ? <p className="sr-eyebrow mb-4">{eyebrow}</p> : null}
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {title}
              {titleAccent ? (
                <>
                  {" "}
                  <span className="italic text-[var(--sr-fern)]">{titleAccent}</span>
                </>
              ) : null}
            </h2>
          </div>
          {description ? (
            <p
              className="max-w-md text-[15px] leading-[1.75] text-[var(--sr-body)] md:text-right"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {description}
            </p>
          ) : null}
        </div>

        {featured ? (
          <article className="mb-3 flex flex-col overflow-hidden border border-[var(--sr-sand)] bg-[var(--sr-parchment)] lg:flex-row">
            {featured.image && featured.imageAlt ? (
              <div className="relative aspect-[16/10] w-full shrink-0 lg:aspect-auto lg:w-[40%] lg:min-h-[300px]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={false}
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col justify-center px-7 py-8 md:px-10 md:py-10">
              <ProcessStepMeta step={featured} />
              <h3
                className="mb-3 text-2xl font-light text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {featured.title}
              </h3>
              <p
                className="max-w-2xl text-[15px] leading-[1.75] text-[var(--sr-body)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {featured.description}
              </p>
            </div>
          </article>
        ) : null}

        {rest.length > 0 ? (
          <ol className="grid gap-3 md:grid-cols-3">
            {rest.map((step) => (
              <li
                key={step.num}
                className="flex flex-col border border-[var(--sr-sand)] bg-[var(--sr-parchment)] px-6 py-7 md:px-7 md:py-8"
              >
                <ProcessStepMeta step={step} />
                <h3
                  className="mb-3 text-xl font-light text-[var(--sr-ink)]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[14px] leading-[1.7] text-[var(--sr-body)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}

function ProcessStepMeta({ step }: { step: Props["steps"][number] }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--sr-fern)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Step {step.num}
        {step.phase ? ` · ${step.phase}` : ""}
      </p>
      {step.icon ? (
        <span className="text-[var(--sr-moss)]">
          <i className={`${step.icon} text-xl`} aria-hidden />
        </span>
      ) : null}
    </div>
  );
}
