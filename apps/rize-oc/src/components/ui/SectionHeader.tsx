import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";

interface SectionHeaderProps {
  eyebrow: string;
  /** Heading content — can include JSX (e.g. <em> for italic accents). */
  heading: React.ReactNode;
  body?: string;
  /** "center" renders a centered, max-w-2xl constrained layout (default).
   *  "left" renders left-aligned with no max-width constraint on the heading. */
  align?: "center" | "left";
  /** Additional class on the heading's parent div */
  className?: string;
  headingStyle?: React.CSSProperties;
  eyebrowColorClass?: string;
  /** Additional bottom margin after the entire header block */
  mb?: string;
}

/**
 * Reusable section intro block: eyebrow → h2 heading → optional body paragraph.
 * Used in AdmissionsSection, ConditionsSection, ContinuumSection, DaySection,
 * TherapiesSection, InsuranceSection, and more.
 */
export default function SectionHeader({
  eyebrow,
  heading,
  body,
  align = "center",
  className,
  headingStyle,
  eyebrowColorClass,
  mb = "mb-12",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter && "text-center", mb, className)}>
      <Eyebrow colorClass={eyebrowColorClass} className="mb-4">
        {eyebrow}
      </Eyebrow>

      <h2
        className="font-[family-name:var(--font-display)] font-normal text-ink mb-5"
        style={headingStyle}
      >
        {heading}
      </h2>

      {body && (
        <p
          className={cn(
            "text-[15px] font-light text-ink/65",
            isCenter && "max-w-2xl mx-auto"
          )}
        >
          {body}
        </p>
      )}
    </div>
  );
}
