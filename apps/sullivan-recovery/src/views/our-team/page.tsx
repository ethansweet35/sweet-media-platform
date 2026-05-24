import TeamCreativeRoster from "@/components/pages/team/TeamCreativeRoster";
import TeamJourneyCta from "@/components/pages/team/TeamJourneyCta";
import TeamPageHero from "@/components/pages/team/TeamPageHero";

export default function OurTeamPage() {
  return (
    <main className="min-h-screen bg-[var(--sr-parchment)]">
      <TeamPageHero />
      <TeamCreativeRoster />
      <TeamJourneyCta />
    </main>
  );
}
