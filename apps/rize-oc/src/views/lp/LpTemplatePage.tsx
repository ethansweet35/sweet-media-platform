import LpShell from "@/components/lp/LpShell";
import LpHero from "@/components/lp/LpHero";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import PhilosophySection from "@/views/home/components/PhilosophySection";
import ConditionsSection from "@/views/home/components/ConditionsSection";
import ContinuumSection from "@/views/home/components/ContinuumSection";
import TherapiesSection from "@/views/home/components/TherapiesSection";
import AdmissionsSection from "@/views/home/components/AdmissionsSection";
import InsuranceSection from "@/views/home/components/InsuranceSection";

export interface LpTemplatePageProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
}

export default function LpTemplatePage(props: LpTemplatePageProps) {
  return (
    <LpShell>
      <LpHero {...props} />
      <AccreditationsBar />
      <PhilosophySection />
      <ConditionsSection />
      <ContinuumSection />
      <TherapiesSection />
      <AdmissionsSection />
      <InsuranceSection />
    </LpShell>
  );
}
