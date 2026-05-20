import { useEffect, useRef, useState } from "react";
import { worksheets } from "@/mocks/family-programming";

export default function WorksheetsSection() {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-pure-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {worksheets.map((worksheet, i) => (
            <div
              key={worksheet.id}
              className="group bg-soft-white rounded-xl border border-mist/50 p-7 md:p-8 transition-all duration-500 hover:border-tfrf-blue/30 hover:shadow-md text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <h3 className="text-[18px] md:text-[20px] font-display font-medium text-deep-navy mb-2">
                Worksheet {worksheet.number}
              </h3>
              <p className="text-[14px] md:text-[15px] font-body text-slate mb-6">
                {worksheet.title}
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-tfrf-blue text-pure-white font-body font-medium text-[13px] hover:bg-deep-navy transition-colors cursor-pointer">
                <i className="ri-download-line w-4 h-4 flex items-center justify-center" />
                Download Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}