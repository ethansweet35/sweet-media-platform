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
 * Full-bleed photo hero that starts flush under the sticky navbar.
 * Uses an in-flow min-height shell so `Image fill` covers the full section
 * (all-absolute children alone can collapse height and leave a gap above the photo).
 */
export default function CinematicHeroSection({
  children,
  media,
  minHeight = "min-h-[88vh]",
  className,
  contentClassName,
}: CinematicHeroSectionProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink", minHeight, className)}>
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {media}
      </div>
      <div className={cn("relative z-10 flex flex-col justify-end", minHeight, contentClassName)}>
        {children}
      </div>
    </section>
  );
}
