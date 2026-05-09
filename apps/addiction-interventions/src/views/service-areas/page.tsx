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

      {/* How nationwide coverage works */}
      <section className="bg-[#F5F3E7] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">How Our National Coverage Works</p>
              <h2 className="font-heading mb-5 text-3xl font-bold leading-tight text-[#1A1A17] md:text-4xl">
                We come to you — <span className="italic text-[#507969]">wherever your family is</span>
              </h2>
              <p className="mb-4 text-base leading-relaxed text-[#4B4B4B]">
                An effective intervention happens in your loved one&apos;s own environment, not in a clinical office. That means our certified interventionists travel to you — your home, your city, and your state. We have worked in all 50 states, from densely populated metro areas like Los Angeles and New York City to rural communities where access to addiction services is thin and the stigma around seeking help runs deep.
              </p>
              <p className="mb-4 text-base leading-relaxed text-[#4B4B4B]">
                When you call, we immediately assess the geographic landscape: which local treatment facilities have openings, which transport options exist, and how far your loved one may need to travel to access the right level of care. In some cases, staying local is the right choice. In others — especially when local relationships are part of the enabling pattern — an out-of-state residential program is clinically indicated. We help you understand both options before the intervention day.
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                Our interventionists typically arrive within 24 to 48 hours of your initial call. We conduct a full pre-intervention briefing with every participating family member, prepare written impact statements, establish a clear treatment admission date, and remain on-site through the entire session — and available by phone in the hours and days that follow.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                { icon: "ri-flight-takeoff-line", title: "24–48 hour response", body: "We confirm a travel plan and pre-intervention call within hours of your first contact. No waiting weeks for an opening." },
                { icon: "ri-home-heart-line", title: "On-site, in your home", body: "We travel to wherever your family is — living rooms, treatment centres, or hotel suites. The location is chosen for comfort and safety." },
                { icon: "ri-map-2-line", title: "All 50 states covered", body: "We have active referral networks and clinical relationships in every US state, including rural and underserved areas." },
                { icon: "ri-hospital-line", title: "Pre-arranged admissions", body: "A treatment bed is confirmed before the intervention begins, so there is no gap between acceptance and admission." },
                { icon: "ri-phone-line", title: "Post-intervention follow-up", body: "We stay available by phone to family members for the days following the intervention — because the hardest conversations often come after." },
                { icon: "ri-shield-check-line", title: "100% confidential", body: "We never share family information with employers, insurance companies, or third parties without your written consent." },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4 rounded-2xl border border-[#EFEFEF] bg-white p-5 shadow-sm">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                    <i className={`${f.icon} text-lg`}></i>
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#1A1A17]">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#4B4B4B]">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
