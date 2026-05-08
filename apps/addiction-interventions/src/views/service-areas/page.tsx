import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import TrustStrip from "@/components/sections/TrustStrip";
import BottomCta from "@/components/sections/BottomCta";
import { LOCATIONS } from "@/data/locations";

export default function ServiceAreasPage() {
  const states = LOCATIONS.filter((l) => l.type === "state").sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );
  const cities = LOCATIONS.filter((l) => l.type === "city").sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Service Areas"
        headline="On-site interventions, nationwide."
        body="Our certified interventionists travel to every state in the country. Find your area below — or call us for help anywhere our state pages don't yet list."
        image="https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_service-areas_hero01.jpg"
        imageAlt="Families connected across the United States map"
      />

      <TrustStrip />

      {/* Cities (highlighted) */}
      {cities.length > 0 && (
        <section className="bg-[var(--color-cream)]">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                  Featured Cities
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
                  Local on-site coverage.
                </h2>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group flex items-center justify-between rounded-2xl border border-[var(--color-divider)] bg-white p-6 transition hover:border-[var(--color-sage)] hover:shadow-md"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                      {c.parentRegion}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                      {c.displayName}
                    </h3>
                  </div>
                  <i className="ri-arrow-right-line text-xl text-[var(--color-sage-deep)] transition-transform group-hover:translate-x-1"></i>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All states */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="brand-eyebrow text-[var(--color-sage-deep)]">
                All States
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
                {states.length}+ states with dedicated landing pages.
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--color-ink-muted)] md:text-lg">
                Don't see yours listed? We still cover you — call us and we'll
                connect you with a certified interventionist serving your area.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {states.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="flex items-center justify-between rounded-xl border border-[var(--color-divider)] bg-white px-5 py-4 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-sage)] hover:text-[var(--color-sage-deep)]"
              >
                <span>{s.displayName}</span>
                <i className="ri-arrow-right-s-line text-lg text-[var(--color-ink-muted)]"></i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BottomCta
        title="Don't see your state?"
        body="We serve families nationwide — including states without dedicated pages here. Call us and we'll connect you with the right interventionist for your area."
      />
    </main>
  );
}
