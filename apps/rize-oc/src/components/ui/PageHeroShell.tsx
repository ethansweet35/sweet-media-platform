import { cn } from "@/lib/cn";

/** Matches SectionWrapper horizontal grid — keeps hero copy aligned with page body. */
export const PAGE_GRID = "mx-auto w-full max-w-[1300px] px-[30px] lg:px-6";

/** Left-aligned cinematic copy — full grid width (no inner max-width cap) */
export const HERO_COPY_BLOCK = "w-full min-w-0";

/** Lead paragraph under cinematic headlines */
export const HERO_LEAD =
  "text-[16px] font-light leading-relaxed text-white/80 max-w-2xl";

/** Left column in two-column PageHeroShell heroes (headline + CTAs) */
export const HERO_SPLIT_LEFT = "flex-1 min-w-0 w-full";

/** Padding wrapper for custom heroes that use PAGE_GRID directly */
export function CinematicHeroGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(PAGE_GRID, "w-full pb-12 lg:pb-16", className)}>{children}</div>;
}

interface PageHeroShellProps {
  children: React.ReactNode;
  /** Eyebrow or label above the main hero row */
  topSlot?: React.ReactNode;
  /** Full-width strip below the main row (stats, continuum nav, etc.) */
  bottomBar?: React.ReactNode;
  /** Stats/continuum strip spans the section edge-to-edge (not capped at 1300px) */
  fullBleedBottomBar?: boolean;
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
  fullBleedBottomBar = false,
  className,
  mainClassName,
}: PageHeroShellProps) {
  return (
    <div className={cn("relative z-10 w-full", className)}>
      <div className={PAGE_GRID}>
        {topSlot ? <div className="mb-6 pt-1">{topSlot}</div> : null}
        <div
          className={cn(
            "flex w-full flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 pb-12 lg:pb-16",
            mainClassName,
          )}
        >
          {children}
        </div>
      </div>
      {bottomBar ? (
        fullBleedBottomBar ? (
          <div className="w-full">{bottomBar}</div>
        ) : (
          <div className={PAGE_GRID}>{bottomBar}</div>
        )
      ) : null}
    </div>
  );
}
