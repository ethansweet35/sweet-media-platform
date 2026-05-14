import LpShell from "@/components/lp/LpShell";
import LpHero from "@/components/lp/LpHero";
import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import LpAccommodations from "@/components/lp/LpAccommodations";
import LpLocationOptions from "@/components/lp/LpLocationOptions";
import LpSubstanceList from "@/components/lp/LpSubstanceList";
import LpDetoxJourney from "@/components/lp/LpDetoxJourney";
import LpGalpAdmissions from "@/components/lp/LpGalpAdmissions";
import InsuranceSection from "@/views/home/components/InsuranceSection";
import LpFaq from "@/components/lp/LpFaq";

export interface LpGalpDetoxPageProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
  substanceHeadline?: string;
  substanceIntro?: string;
  substances?: string[];
  showLocationOptions?: boolean;
}

export default function LpGalpDetoxPage({
  showLocationOptions = true,
  ...props
}: LpGalpDetoxPageProps) {
  return (
    <LpShell>
      <LpHero {...props} />
      <AccreditationsBar />
      <LpAccommodations />
      {showLocationOptions && <LpLocationOptions />}
      <LpSubstanceList
        headline={props.substanceHeadline}
        intro={props.substanceIntro}
        substances={props.substances}
      />
      <LpDetoxJourney />
      <LpGalpAdmissions />
      <InsuranceSection />
      <LpFaq />
    </LpShell>
  );
}
