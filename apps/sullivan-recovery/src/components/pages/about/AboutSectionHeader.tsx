import type { ReactNode } from "react";

type AboutSectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Split title left / description right on large screens (homepage pattern) */
  variant?: "split" | "stacked";
  className?: string;
  /** For dark sections (e.g. journey) */
  tone?: "light" | "dark";
};

export default function AboutSectionHeader({
  eyebrow,
  title,
  description,
  variant = "split",
  className = "",
  tone = "light",
}: AboutSectionHeaderProps) {
  const isDark = tone === "dark";
  const eyebrowClass = isDark ? "text-[var(--sr-sage)]" : "";
  const titleClass = isDark ? "text-white" : "text-[var(--sr-ink)]";
  const bodyClass = isDark ? "text-white/70" : "text-[var(--sr-body)]";

  if (variant === "stacked") {
    return (
      <div className={`mb-12 md:mb-16 ${className}`}>
        <p className={`sr-eyebrow mb-4 ${eyebrowClass}`}>{eyebrow}</p>
        <h2
          className={`max-w-3xl text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.05] ${titleClass}`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h2>
        {description ? (
          <div
            className={`mt-6 max-w-2xl text-[15px] leading-[1.85] ${bodyClass}`}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {description}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`mb-12 grid grid-cols-1 gap-6 md:mb-16 lg:grid-cols-12 lg:gap-10 lg:items-end ${className}`}
    >
      <div className="lg:col-span-6">
        <p className={`sr-eyebrow mb-4 ${eyebrowClass}`}>{eyebrow}</p>
        <h2
          className={`text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.05] ${titleClass}`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <div className="lg:col-span-6">
          <div
            className={`text-[15px] leading-[1.85] lg:ml-auto lg:max-w-lg ${bodyClass}`}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {description}
          </div>
        </div>
      ) : null}
    </div>
  );
}
