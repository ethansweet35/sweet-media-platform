import Link from "next/link";
import { LEADERSHIP_TEAM } from "@/data/team";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import { CONTAINER } from "@/data/site";

/**
 * Section 8 — Meet Our Team (homepage preview)
 * Full staff on /about#team.
 */

export default function HomeTeam() {
  return (
    <section className="bg-white py-[100px]">
      <div className={CONTAINER}>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between lg:mb-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Meet Our Team
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
              Your Missouri mental health professionals.
            </h2>
          </div>
          <Link
            href="/about#team"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-mbh-forest/20 px-6 py-2.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
          >
            View full team
            <i className="ri-arrow-right-line" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERSHIP_TEAM.map((person) => (
            <TeamMemberCard key={person.slug} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
