import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import ProcessSteps from "@/components/sections/ProcessSteps";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { DEFAULT_FAQS, type Faq } from "@/data/faqs";
import { SERVICE_BY_SLUG, type ServiceConfig } from "@/data/services";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

export default function ServiceLanding({
  config,
  faqs,
}: {
  config: ServiceConfig;
  faqs?: Faq[];
}) {
  const related = (config.related || [])
    .map((slug) => SERVICE_BY_SLUG.get(slug))
    .filter((s): s is ServiceConfig => Boolean(s))
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <PageHero
        eyebrow={config.heroEyebrow ?? "Intervention Services"}
        headline={config.heroHeadline}
        body={config.heroBody}
      />

      <TrustStrip />

      {/* Overview */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            {/* Body copy */}
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">
                {config.overviewTitle ?? `Understanding ${config.shortName} Intervention`}
              </p>
              <h2 className="font-heading mb-6 text-3xl font-bold leading-tight text-[#1A1A17] md:text-4xl">
                What a{" "}
                <span className="italic text-[#507969]">
                  {config.shortName.toLowerCase()}
                </span>{" "}
                intervention really looks like
              </h2>
              <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                {config.overviewBody}
              </p>
              <div className="mt-8">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill"></i>
                  Call Now | {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            {/* Signs sidebar */}
            {config.signs && config.signs.length > 0 && (
              <aside className="rounded-3xl border border-[#EFEFEF] bg-[#F5F3E7] p-8">
                <p className="brand-eyebrow mb-5 text-[#8FAC87]">
                  {config.signsTitle ?? "Signs it may be time"}
                </p>
                <ul className="grid gap-3">
                  {config.signs.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                        <i className="ri-check-line text-xs"></i>
                      </span>
                      <span className="text-sm leading-relaxed text-[#4B4B4B]">{s}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps
        eyebrow="Our Approach"
        title={`How a ${config.shortName.toLowerCase()} intervention unfolds`}
        subtitle="Every intervention follows a clear, family-centered process — from the first private call through long-term recovery support."
        steps={config.customProcessSteps}
      />

      {/* Related services */}
      {related.length > 0 && (
        <section className="bg-[#F5F3E7] py-24">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
            <div className="mb-12">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Related Services</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
                You may also need{" "}
                <span className="italic text-[#507969]">these</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-white p-7 shadow-sm transition hover:border-[#8FAC87]/40 hover:shadow-md"
                >
                  {rel.navIcon && (
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                      <i className={`${rel.navIcon} text-xl`}></i>
                    </span>
                  )}
                  <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">
                    {rel.displayName}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]">
                    {rel.heroBody.slice(0, 140)}
                    {rel.heroBody.length > 140 ? "…" : ""}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition group-hover:gap-2">
                    Learn more <i className="ri-arrow-right-line"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqAccordion
        title={`${config.shortName} intervention questions, answered`}
        faqs={faqs ?? DEFAULT_FAQS}
      />

      <BottomCta
        title={`Ready to start a ${config.shortName.toLowerCase()} intervention?`}
        italicWord={config.shortName.toLowerCase()}
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
      />
    </main>
  );
}
