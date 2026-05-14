interface LpConditionOverviewProps {
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  listHeading: string;
  listItems: string[];
  callout?: string;
}

export default function LpConditionOverview({
  eyebrow,
  headline,
  paragraphs,
  listHeading,
  listItems,
  callout,
}: LpConditionOverviewProps) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">

          {/* Left — clinical overview */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-4">{eyebrow}</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-6"
              style={{ fontSize: "clamp(28px, 3vw, 46px)", lineHeight: 1.08 }}
            >
              {headline}
            </h2>
            <div className="w-12 h-[2px] bg-accent mb-6" />
            <div className="flex flex-col gap-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-base font-light leading-relaxed text-ink/70">
                  {para}
                </p>
              ))}
            </div>

            {callout && (
              <div className="mt-8 border-l-2 border-accent pl-6 bg-[#F8F6F3] py-4 pr-6">
                <p className="text-sm font-light leading-relaxed text-ink/80 italic">{callout}</p>
              </div>
            )}
          </div>

          {/* Right — symptoms / key points list */}
          <div className="lg:pt-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent mb-5">{listHeading}</p>
            <div className="flex flex-col gap-3">
              {listItems.map((item) => (
                <div key={item} className="flex items-start gap-3 border border-warm/40 bg-[#F8F6F3] px-5 py-4">
                  <i className="ri-checkbox-circle-line text-accent text-sm shrink-0 mt-0.5" />
                  <span className="text-sm font-light leading-snug text-ink/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
