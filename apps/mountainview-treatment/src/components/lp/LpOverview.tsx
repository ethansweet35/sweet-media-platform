interface LpOverviewProps {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  listHeading: string;
  listItems: string[];
  callout?: string;
}

export default function LpOverview({
  eyebrow,
  headline,
  paragraphs,
  listHeading,
  listItems,
  callout,
}: LpOverviewProps) {
  return (
    <section id="overview" className="bg-[var(--mvt-cream)] py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Left — clinical overview */}
          <div>
            <p className="mvt-eyebrow mb-4">{eyebrow}</p>
            <h2
              className="font-heading font-light text-[var(--mvt-ink)] mb-6"
              style={{ fontSize: "clamp(26px, 2.8vw, 44px)", lineHeight: 1.08 }}
            >
              {headline}
            </h2>
            <div className="w-12 h-[2px] bg-[var(--mvt-forest)] mb-6" />
            <div className="flex flex-col gap-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-base font-light leading-relaxed text-[var(--mvt-muted)]">
                  {para}
                </p>
              ))}
            </div>

            {callout && (
              <div className="mt-8 border-l-2 border-[var(--mvt-forest)] pl-6 bg-[var(--mvt-cream-2)] py-4 pr-6">
                <p className="text-sm font-light leading-relaxed text-[var(--mvt-text)] italic">{callout}</p>
              </div>
            )}
          </div>

          {/* Right — key points list */}
          <div className="lg:pt-10">
            <p className="mvt-eyebrow mb-5">{listHeading}</p>
            <div className="flex flex-col gap-3">
              {listItems.map((item) => (
                <div key={item} className="flex items-start gap-3 border border-[var(--mvt-cream-2)] bg-white px-5 py-4">
                  <i className="ri-checkbox-circle-line text-[var(--mvt-forest)] text-sm shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm font-light leading-snug text-[var(--mvt-text)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
