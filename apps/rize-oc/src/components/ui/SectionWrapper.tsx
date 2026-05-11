import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  children: React.ReactNode;
  /** Additional Tailwind classes — appended after the base layout classes.
   *  Use for grids, flex overrides, or per-section adjustments. */
  className?: string;
  /** Override the default py-[100px] vertical rhythm (e.g. AccreditationsBar uses py-[56px]). */
  py?: string;
}

/**
 * Constrains content to the 1300px brand grid with standard padding.
 * Wrap the inner content div of every section with this component.
 */
export default function SectionWrapper({ children, className, py = "py-[100px]" }: SectionWrapperProps) {
  return (
    <div className={cn("mx-auto max-w-[1300px] w-full px-6", py, className)}>
      {children}
    </div>
  );
}
