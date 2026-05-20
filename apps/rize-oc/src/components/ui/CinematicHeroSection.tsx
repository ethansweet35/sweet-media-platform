import { cn } from "@/lib/cn";

interface CinematicHeroSectionProps {
  children: React.ReactNode;
  /** Background image + gradient overlays (`Image fill` must be a direct child of this section) */
  media: React.ReactNode;
  /** Tailwind min-height utility — must match on section + content shell */
  minHeight?: string;
  className?: string;
  contentClassName?: string;
}

/**
 * Full-bleed photo hero under the sticky nav.
 * Negative margin pulls the section up so the photo reaches the viewport top;
 * content padding keeps copy below the nav bar.
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
        "relative isolate overflow-hidden bg-ink -mt-[var(--rize-nav-offset)]",
        minHeight,
        className,
      )}
    >
      {media}
      {/* Darken the strip under the cream nav so bright photos do not read as a gap */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[var(--rize-nav-offset)] bg-gradient-to-b from-ink/92 via-ink/75 to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          "relative z-10 flex w-full flex-col items-stretch justify-end pt-[calc(var(--rize-nav-offset)+var(--rize-hero-below-nav))]",
          minHeight,
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
