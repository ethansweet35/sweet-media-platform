import { cn } from "@/lib/cn";

/** Matches SectionWrapper horizontal grid — keeps hero copy aligned with page body. */
export const PAGE_GRID = "mx-auto w-full max-w-[1300px] px-[30px] lg:px-6";

interface PageHeroShellProps {
  children: React.ReactNode;
  /** Eyebrow or label above the main hero row */
  topSlot?: React.ReactNode;
  /** Full-width strip below the main row (stats, continuum nav, etc.) */
  bottomBar?: React.ReactNode;
  className?: string;
  mainClassName?: string;
}

/**
 * Constrains cinematic full-bleed hero copy to the same 1300px grid as SectionWrapper.
 * Use inside `CinematicHeroSection` (do not wrap the section in flex justify-end).
 */
export default function PageHeroShell({
  children,
  topSlot,
  bottomBar,
  className,
  mainClassName,
}: PageHeroShellProps) {
  return (
    <div className={cn("relative z-10 w-full", className)}>
      <div className={PAGE_GRID}>
        {topSlot ? <div className="mb-5">{topSlot}</div> : null}
        <div
          className={cn(
            "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-12 lg:pb-16",
            mainClassName,
          )}
        >
          {children}
        </div>
      </div>
      {bottomBar ? <div className={PAGE_GRID}>{bottomBar}</div> : null}
    </div>
  );
}
