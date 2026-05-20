import { cn } from "@/lib/cn";

interface CinematicHeroSectionProps {
  children: React.ReactNode;
  /** Background image, gradient overlays, decorative layers */
  media: React.ReactNode;
  /** Tailwind min-height utility — must match on section + content shell */
  minHeight?: string;
  className?: string;
  contentClassName?: string;
}

/**
 * Full-bleed photo hero that sits flush under the sticky navbar.
 * Pulls the section up with --rize-nav-offset so the photo meets the nav edge,
 * and keeps an in-flow min-height shell so `Image fill` covers the full area.
 */
export default function CinematicHeroSection({
  children,
  media,
  minHeight = "min-h-[88vh]",
  className,
  contentClassName,
}: CinematicHeroSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink",
        "-mt-[var(--rize-nav-offset)] pt-[var(--rize-nav-offset)]",
        minHeight,
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 relative" aria-hidden="true">
        {media}
        {/* Extra top scrim so bright sky/window areas never mimic the cream nav band */}
        <div className="absolute inset-x-0 top-0 z-[2] h-28 bg-gradient-to-b from-ink/90 via-ink/50 to-transparent" />
      </div>
      <div className={cn("relative z-10 flex flex-col justify-end", minHeight, contentClassName)}>
        {children}
      </div>
    </section>
  );
}
