import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Mental Health Treatment That Takes Insurance | Rize OC",
  description:
    "Rize OC accepts Anthem, Cigna, Aetna, UHC, and BCBS for California mental health treatment. Free insurance verification — residential, inpatient, and outpatient.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Mental Health Treatment That Takes Insurance"
      subheadline="Don't let cost uncertainty stand between you and care. Rize OC accepts most major PPO insurance plans for California residents — residential, inpatient, PHP, IOP, and outpatient. Free benefits verification, usually within the hour."
      eyebrow="Insurance Accepted Treatment"
      stat="Free"
      statLabel="Benefits Verification"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Insurance Coverage in California"
          headline="What Your Insurance Covers for Mental Health Treatment in California"
          paragraphs={[
            "Uncertainty about insurance coverage is one of the biggest barriers to mental health treatment. Under the Mental Health Parity and Addiction Equity Act (MHPAEA), most PPO plans — including Anthem, Cigna, Aetna, UHC, and Blue Cross Blue Shield — must cover mental health at the same level as physical health for California policyholders.",
            "At Rize OC, our insurance verification team handles the entire benefits process for California clients — free and with no obligation. We contact your provider, determine coverage and out-of-pocket costs, and give you a clear picture before you commit.",
          ]}
          listHeading="Insurance Plans We Work With"
          listItems={[
            "Anthem Blue Cross — residential, PHP, IOP, and outpatient",
            "Cigna — full continuum of care, in-network rates available",
            "Aetna — mental health residential and intensive outpatient",
            "United Healthcare (UHC) — behavioral health and residential",
            "Blue Cross Blue Shield (BCBS) — mental health inpatient and outpatient",
            "Most other major PPO plans — free verification in under an hour",
            "Flexible private pay options for uninsured or underinsured California clients",
          ]}
          callout="Mental health parity law requires your plan to cover treatment like physical health care. California residents — call Rize OC now and our team will verify your benefits in under an hour, completely confidential."
        />
      }
    />
  );
}
