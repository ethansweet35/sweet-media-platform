import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import BottomCta from "@/components/sections/BottomCta";
import { SERVICE_BY_SLUG, type ServiceConfig } from "@/data/services";
import type { ArticleBlock, ResourceConfig } from "@/data/resources";

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
        {block.text}
      </p>
    );
  }
  if (block.type === "heading") {
    const level = block.level ?? 2;
    if (level === 3) {
      return (
        <h3 className="mt-10 text-xl font-semibold tracking-tight text-[var(--color-ink)] md:text-2xl">
          {block.text}
        </h3>
      );
    }
    return (
      <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[var(--color-ink)] md:text-3xl">
        {block.text}
      </h2>
    );
  }
  if (block.type === "list") {
    if (block.ordered) {
      return (
        <ol className="ml-6 list-decimal space-y-3 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    }
    return (
      <ul className="space-y-3">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-base leading-7 text-[var(--color-ink-muted)] md:text-lg"
          >
            <i className="ri-checkbox-circle-line mt-1 flex-none text-lg text-[var(--color-sage-deep)]"></i>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "callout") {
    return (
      <aside className="my-2 rounded-2xl border border-[var(--color-divider)] bg-[var(--color-cream)] p-6">
        {block.title && (
          <p className="text-base font-semibold tracking-tight text-[var(--color-ink)]">
            {block.title}
          </p>
        )}
        <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)] md:text-base">
          {block.text}
        </p>
      </aside>
    );
  }
  return null;
}

export default function ResourceArticle({ config }: { config: ResourceConfig }) {
  const recommended = (config.recommendedServices || [])
    .map((slug) => SERVICE_BY_SLUG.get(slug))
    .filter((s): s is ServiceConfig => Boolean(s))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow={config.heroEyebrow ?? config.category}
        headline={config.heroHeadline}
        body={config.heroBody}
      />

      <article className="bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          {config.intro && (
            <p className="mb-10 text-lg leading-8 text-[var(--color-ink)] md:text-xl">
              {config.intro}
            </p>
          )}
          <div className="space-y-5">
            {config.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {recommended.length > 0 && (
        <section className="border-t border-[var(--color-divider)] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                Continue Reading
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
                Related intervention services.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {recommended.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group flex flex-col rounded-2xl border border-[var(--color-divider)] bg-white p-7 transition hover:border-[var(--color-sage)] hover:shadow-md"
                >
                  {rel.navIcon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-cream)] text-[var(--color-sage-deep)]">
                      <i className={`text-2xl ${rel.navIcon}`}></i>
                    </div>
                  )}
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                    {rel.displayName}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--color-ink-muted)]">
                    {rel.heroBody.slice(0, 140)}
                    {rel.heroBody.length > 140 ? "…" : ""}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-sage-deep)] group-hover:gap-2 transition-all">
                    Learn more
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BottomCta title={config.ctaTitle} body={config.ctaBody} />
    </main>
  );
}
