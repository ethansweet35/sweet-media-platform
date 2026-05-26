import { CONTAINER } from "@/lib/site";
import { cn } from "@/lib/cn";
import Eyebrow from "./Eyebrow";
import Heading from "./Heading";
import HeroImage from "./HeroImage";
import { HERO_INNER, HERO_INNER_COMPACT } from "./tokens";

type HeroImageConfig = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

type PageHeroProps = {
  eyebrow: string;
  headline: React.ReactNode;
  body?: string;
  actions?: React.ReactNode;
  image?: HeroImageConfig;
  /** Text-only hero with narrower content (e.g. Contact) */
  compact?: boolean;
  glow?: "left" | "right" | "both";
};

export default function PageHero({
  eyebrow,
  headline,
  body,
  actions,
  image,
  compact,
  glow = "left",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-surface">
      {glow === "left" || glow === "both" ? (
        <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-accent/15 blur-[100px]" />
      ) : null}
      {glow === "right" || glow === "both" ? (
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[90px]" />
      ) : null}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-dot-grid",
          compact ? "opacity-30" : "opacity-35",
        )}
      />

      <div className={compact ? HERO_INNER_COMPACT : HERO_INNER}>
        {image ? (
          <div className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}>
            <div className="max-w-2xl">
              <Eyebrow>{eyebrow}</Eyebrow>
              <Heading as={1} className="mt-4">
                {headline}
              </Heading>
              {body ? <p className="mt-6 max-w-lg text-base leading-8 text-body">{body}</p> : null}
              {actions ? <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
            </div>
            <HeroImage
              src={image.src}
              alt={image.alt}
              priority={image.priority}
              className={image.className}
              imageClassName={image.imageClassName}
            />
          </div>
        ) : (
          <div className={cn(CONTAINER, compact && "max-w-3xl")}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading as={1} className="mt-4">
              {headline}
            </Heading>
            {body ? (
              <p className={cn("mt-5 text-base leading-8 text-body", compact && "max-w-2xl")}>
                {body}
              </p>
            ) : null}
            {actions ? <div className="mt-9 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          </div>
        )}
      </div>
    </section>
  );
}
