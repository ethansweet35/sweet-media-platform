import type { ReactNode } from "react";
import LpShell from "@/components/lp/LpShell";
import LpHero from "@/components/lp/LpHero";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import LpMhLevels from "@/components/lp/LpMhLevels";
import LpMhConditions from "@/components/lp/LpMhConditions";
import LpGalpAdmissions from "@/components/lp/LpGalpAdmissions";
import InsuranceSection from "@/views/home/components/InsuranceSection";
import LpFaq from "@/components/lp/LpFaq";

export interface LpMentalHealthGalpPageProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
  conditionOverview?: ReactNode;
}

export default function LpMentalHealthGalpPage({ conditionOverview, ...props }: LpMentalHealthGalpPageProps) {
  return (
    <LpShell>
      <LpHero {...props} />
      <AccreditationsBar />
      <LpMhLevels />
      {conditionOverview}
      <LpMhConditions />
      <LpGalpAdmissions />
      <InsuranceSection />
      <LpFaq />
    </LpShell>
  );
}
