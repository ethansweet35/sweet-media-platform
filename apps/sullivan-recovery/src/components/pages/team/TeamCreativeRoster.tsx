import { TEAM_CLINICAL, TEAM_FEATURED, TEAM_MEMBERS } from "@/data/team";
import TeamClinicalSpotlight from "./TeamClinicalSpotlight";
import TeamPortrait from "./TeamPortrait";

const CLINICAL_LEAD = TEAM_CLINICAL.find((m) => m.slug === "chandra-medina");
const CLINICAL_REST = TEAM_CLINICAL.filter((m) => m.slug !== "chandra-medina");

export default function TeamCreativeRoster() {
  return (
    <>
      {/* ── Leadership ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--sr-moss)] py-[100px]">
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[var(--sr-fern)]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[var(--sr-sage)]/10 blur-2xl" />

        <div className="sr-container relative z-10">
          <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-10 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-sage)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Leadership
              </p>
              <h2
                className="max-w-xl text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                The Sullivan family &amp;{" "}
                <span className="italic text-[var(--sr-sage)]">leadership team</span>
              </h2>
            </div>
            <p
              className="max-w-sm text-[14px] leading-[1.85] text-white/60 md:text-right"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Founded on lived experience — led by people who understand recovery from the
              inside out.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {TEAM_FEATURED.map((member) => (
              <TeamPortrait
                key={member.slug}
                member={member}
                index={TEAM_MEMBERS.findIndex((x) => x.slug === member.slug)}
                tone="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Clinical & support ─────────────────────────────────── */}
      <section className="bg-[var(--sr-linen)] py-[100px]">
        <div className="sr-container">
          <div className="mb-10 grid grid-cols-1 gap-8 md:mb-14 md:grid-cols-12 md:items-end md:gap-10">
            <div className="md:col-span-5">
              <p className="sr-eyebrow mb-4">Clinical &amp; Support</p>
              <h2
                className="text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Every role, <span className="italic text-[var(--sr-fern)]">one mission</span>
              </h2>
            </div>
            <div className="md:col-span-7">
              <p
                className="text-[15px] leading-[1.85] text-[var(--sr-body)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                From medical directors and licensed therapists to case managers and detox
                specialists — each member of our team brings specialized skill and genuine care
                to your recovery.
              </p>
            </div>
          </div>

          {CLINICAL_LEAD ? (
            <div className="mb-8 md:mb-10">
              <TeamClinicalSpotlight member={CLINICAL_LEAD} />
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {CLINICAL_REST.map((member) => (
              <TeamPortrait
                key={member.slug}
                member={member}
                index={TEAM_MEMBERS.findIndex((x) => x.slug === member.slug)}
                tone="light"
              />
            ))}
          </div>

          <div className="mt-16 border-t border-[var(--sr-sand)] pt-12 md:mt-20">
            <p
              className="mb-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Full roster — {TEAM_MEMBERS.length} team members
            </p>

            <ol className="grid gap-0 sm:grid-cols-2 lg:gap-x-12">
              {TEAM_MEMBERS.map((m, i) => (
                <li
                  key={m.slug}
                  className="group flex items-baseline gap-4 border-b border-[var(--sr-sand)]/60 py-4 transition-colors hover:border-[var(--sr-fern)]/40"
                >
                  <span
                    className="w-8 shrink-0 text-lg font-light tabular-nums text-[var(--sr-sand)] transition-colors group-hover:text-[var(--sr-fern)]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      className="block text-xl font-medium text-[var(--sr-ink)]"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {m.name}
                    </span>
                    {m.role ? (
                      <span
                        className="mt-0.5 block text-[11px] uppercase tracking-[0.1em] text-[var(--sr-muted)]"
                        style={{ fontFamily: "var(--font-dm-sans)" }}
                      >
                        {m.role}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
