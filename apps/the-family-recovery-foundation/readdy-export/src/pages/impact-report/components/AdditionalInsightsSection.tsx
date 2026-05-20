import { useEffect, useRef, useState } from "react";
import { additionalInsights } from "@/mocks/impact-report";
import PrimaryButton from "@/components/base/PrimaryButton";

function InsightRow({
  insight,
  index,
  visible,
}: {
  insight: (typeof additionalInsights)[0];
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="flex items-start gap-4 md:gap-5 bg-pure-white rounded-xl border border-mist/60 px-5 py-4 md:px-6 md:py-5 transition-all duration-500 hover:border-tfrf-blue/20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transitionDelay: `${index * 100 + 200}ms`,
      }}
    >
      {/* Percentage badge */}
      <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-powder-blue/40 flex items-center justify-center">
        <span className="text-[16px] md:text-[18px] font-display font-semibold text-tfrf-blue">
          {insight.percentage}%
        </span>
      </div>
      <p className="text-[14px] md:text-[15px] font-body text-deep-navy/85 leading-relaxed pt-1 md:pt-2">
        {insight.text}
      </p>
    </div>
  );
}

export default function AdditionalInsightsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="bg-soft-white py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div
            className="text-center mb-10 md:mb-14 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h2 className="text-display-s font-display text-deep-navy mb-3">
              Additional Insights from the Survey
            </h2>
            <div className="w-16 h-[2px] bg-tfrf-blue/30 mx-auto" />
          </div>

          {/* Insights list */}
          <div className="flex flex-col gap-4">
            {additionalInsights.map((insight, i) => (
              <InsightRow
                key={insight.id}
                insight={insight}
                index={i}
                visible={visible}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            className="text-center mt-12 md:mt-16 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "600ms",
            }}
          >
            <p className="text-body-m font-body text-slate mb-6">
              Your family&apos;s healing starts here.
            </p>
            <PrimaryButton href="/our-services">
              Join Our Programs
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}