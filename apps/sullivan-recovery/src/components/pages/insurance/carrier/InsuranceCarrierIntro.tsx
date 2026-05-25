import type { InsuranceCarrierPageData } from "@/types/insuranceCarrierPage";

type Props = InsuranceCarrierPageData["intro"];

export default function InsuranceCarrierIntro({ title, titleAccent, paragraphs }: Props) {
  const lead = paragraphs[0];
  const rest = paragraphs.slice(1);

  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="sr-eyebrow mb-4">Coverage overview</p>
            <h2
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
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

          <div className="lg:col-span-7">
            {lead ? (
              <p
                className="mb-6 border-l-2 border-[var(--sr-sage)] pl-6 text-[16px] leading-[1.85] text-[var(--sr-ink)] md:text-[17px]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {lead}
              </p>
            ) : null}
            <div className="space-y-4 border border-[var(--sr-sand)] bg-[var(--sr-linen)] p-6 md:p-8">
              {rest.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-[15px] leading-[1.8] text-[var(--sr-body)]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
