import ProgramsApproach from "@/components/pages/programs/ProgramsApproach";
import ProgramsCta from "@/components/pages/programs/ProgramsCta";
import ProgramsIndexGrid from "@/components/pages/programs/ProgramsIndexGrid";
import ProgramsPageHero from "@/components/pages/programs/ProgramsPageHero";
import ProgramsPillars from "@/components/pages/programs/ProgramsPillars";

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-[var(--sr-linen)]">
      <ProgramsPageHero />
      <ProgramsIndexGrid />
      <ProgramsApproach />
      <ProgramsPillars />
      <ProgramsCta />
    </main>
  );
}
