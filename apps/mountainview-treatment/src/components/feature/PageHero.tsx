import { EditableText } from "@sweetmedia/admin-core/page-editor";
import { SITE } from "@/lib/site";

/**
 * Reusable interior page hero — eyebrow + headline + body over a
 * landscape video/image backdrop, with a dark overlay for legibility.
 */
export type PageHeroProps = {
  eyebrow: string;
  headline: string;
  body?: string;
  /** Optional background image URL. Defaults to the seattle landscape video. */
  backgroundImage?: string;
  /** When true, mute & autoplay the hero video. Default true. */
  useVideo?: boolean;
};

export default async function PageHero({
  eyebrow,
  headline,
  body,
  backgroundImage,
  useVideo = true,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--mvt-ink)] text-white">
      {useVideo && !backgroundImage && (
        <video
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
        >
          <source src={SITE.assets.heroVideo} type="video/mp4" />
        </video>
      )}
      {backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
          aria-hidden="true"
        />
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[var(--mvt-ink)]/55 via-[var(--mvt-ink)]/45 to-[var(--mvt-ink)]/70" />

      <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <EditableText
          fieldKey="hero.eyebrow"
          defaultValue={eyebrow}
          as="p"
          className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/85"
        />
        <EditableText
          fieldKey="hero.headline"
          defaultValue={headline}
          as="h1"
          className="mt-6 max-w-3xl font-heading text-[44px] leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[64px]"
        />
        {body ? (
          <EditableText
            fieldKey="hero.body"
            defaultValue={body}
            as="p"
            className="mt-6 max-w-3xl text-base leading-7 text-white/85 sm:text-[17px]"
          />
        ) : null}
      </div>
    </section>
  );
}
