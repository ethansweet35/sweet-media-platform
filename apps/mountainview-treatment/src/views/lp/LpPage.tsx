import type { ReactNode } from "react";
import LpShell from "@/components/lp/LpShell";
import LpHero from "@/components/lp/LpHero";
import LpLevels from "@/components/lp/LpLevels";
import LpOverview from "@/components/lp/LpOverview";
import LpAdmissions from "@/components/lp/LpAdmissions";
import LpInsurance from "@/components/lp/LpInsurance";
import LpFaq from "@/components/lp/LpFaq";

export interface LpPageProps {
  headline: string;
  subheadline?: string;
  eyebrow?: string;
  stat?: string;
  statLabel?: string;
  overview: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    listHeading: string;
    listItems: string[];
    callout?: string;
  };
  faqs?: { q: string; a: string }[];
  children?: ReactNode;
}

export default function LpPage({ overview, faqs, children, ...heroProps }: LpPageProps) {
  return (
    <LpShell>
      <LpHero {...heroProps} />
      <LpLevels />
      <LpOverview {...overview} />
      {children}
      <LpAdmissions />
      <LpInsurance />
      <LpFaq faqs={faqs} />
    </LpShell>
  );
}
