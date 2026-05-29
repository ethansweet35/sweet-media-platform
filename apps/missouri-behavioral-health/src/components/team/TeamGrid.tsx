import type { TeamMember, TeamGroup } from "@/data/team";
import { TEAM_GROUPS, TEAM_GROUP_LABELS } from "@/data/team";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import { CONTAINER } from "@/data/site";

type TeamGridProps = {
  members: TeamMember[];
  /** When true, splits roster into leadership / admin / clinical / wellness sections */
  grouped?: boolean;
  id?: string;
  eyebrow?: string;
  headline?: string;
  intro?: string;
};

export default function TeamGrid({
  members,
  grouped = false,
  id = "team",
  eyebrow = "Meet our team",
  headline = "Your Missouri mental health professionals.",
  intro,
}: TeamGridProps) {
  const renderGrid = (list: TeamMember[]) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((person) => (
        <TeamMemberCard key={person.slug} person={person} />
      ))}
    </div>
  );

  return (
    <section id={id} className="scroll-mt-24 bg-white py-[100px]">
      <div className={CONTAINER}>
        <div className="mb-12 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-green" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
            {headline}
          </h2>
          {intro ? (
            <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">{intro}</p>
          ) : null}
        </div>

        {grouped ? (
          <div className="space-y-16">
            {TEAM_GROUPS.map((group: TeamGroup) => {
              const list = members.filter((m) => m.group === group);
              if (list.length === 0) return null;
              return (
                <div key={group}>
                  <h3 className="mb-6 font-display text-xl font-semibold text-mbh-forest">
                    {TEAM_GROUP_LABELS[group]}
                  </h3>
                  {renderGrid(list)}
                </div>
              );
            })}
          </div>
        ) : (
          renderGrid(members)
        )}
      </div>
    </section>
  );
}
