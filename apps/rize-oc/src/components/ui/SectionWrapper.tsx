import { cn } from "@/lib/cn";
import { PAGE_GRID } from "@/components/ui/PageHeroShell";

interface SectionWrapperProps {
  children: React.ReactNode;
  /** Additional Tailwind classes — appended after the base layout classes.
   *  Use for grids, flex overrides, or per-section adjustments. */
  className?: string;
  /** Override the default 100px section vertical rhythm when a section needs an exception. */
  py?: string;
  /** Optional background class for wrapper compatibility in existing views. */
  bg?: string;
}

/**
 * Constrains content to the 1300px brand grid with standard padding.
 * Wrap the inner content div of every section with this component.
 */
export default function SectionWrapper({ children, className, py = "py-[75px] lg:py-section", bg }: SectionWrapperProps) {
  return (
    <div className={cn(PAGE_GRID, py, bg, className)}>
      {children}
    </div>
  );
}
