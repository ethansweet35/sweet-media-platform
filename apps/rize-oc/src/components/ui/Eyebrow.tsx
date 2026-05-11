import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  /** Pass a color utility class — e.g. "text-accent" or "text-ink/45". Defaults to text-accent. */
  colorClass?: string;
  /** Tracking variant. Defaults to tracking-[0.35em] (standard section eyebrow). */
  tracking?: "standard" | "wide" | "tight";
  className?: string;
}

const trackingMap = {
  standard: "tracking-[0.35em]",
  wide: "tracking-[0.3em]",
  tight: "tracking-[0.22em]",
};

/**
 * Uppercase micro-label used above every section heading.
 * Font: Montserrat (body), 10px, semibold, wide tracking.
 */
export default function Eyebrow({
  children,
  colorClass = "text-accent",
  tracking = "standard",
  className,
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[10px] font-semibold uppercase",
        trackingMap[tracking],
        colorClass,
        className
      )}
    >
      {children}
    </p>
  );
}
