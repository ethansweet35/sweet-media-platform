import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";

interface SectionHeaderProps {
  eyebrow?: string;
  /** Heading content — can include JSX (e.g. <em> for italic accents). */
  heading?: React.ReactNode;
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
  /** Legacy mode: semantic heading tag. */
  as?: "h1" | "h2" | "h3" | "h4";
  /** Legacy mode: heading content passed as children. */
  children?: React.ReactNode;
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
  as = "h2",
  children,
}: SectionHeaderProps) {
  // Backward-compat: older pages use <SectionHeader as="h2">...</SectionHeader>
  // while newer sections use eyebrow/heading/body props.
  if (!eyebrow && !heading && !body && children) {
    const HeadingTag = as;
    return (
      <HeadingTag
        className={cn("font-[family-name:var(--font-display)] font-normal text-ink", className)}
        style={headingStyle}
      >
        {children}
      </HeadingTag>
    );
  }

  const isCenter = align === "center";
  const resolvedHeading = heading ?? children;

  return (
    <div className={cn(isCenter && "text-center", mb, className)}>
      {eyebrow && (
        <Eyebrow colorClass={eyebrowColorClass} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}

      <h2
        className="font-[family-name:var(--font-display)] font-normal text-ink mb-5"
        style={headingStyle}
      >
        {resolvedHeading}
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
