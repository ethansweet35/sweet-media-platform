import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Mental Health Treatment That Takes Insurance | Rize OC",
  description: "Rize OC accepts Anthem, Cigna, Aetna, UHC, and BCBS for mental health treatment. Free insurance verification — no obligation. Residential and inpatient care.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Mental Health Treatment That Takes Insurance"
      subheadline="Don't let cost uncertainty stand between you and the help you need. Rize OC accepts most major PPO insurance plans for residential, inpatient, and outpatient mental health treatment. Our team verifies your benefits for free — usually within the hour."
      eyebrow="Insurance Verification Specialists"
      stat="Free"
      statLabel="Benefits Verification"
      conditionOverview={
        <LpConditionOverview
          eyebrow="How Insurance Coverage Works"
          headline="What Your Insurance Is Required to Cover for Mental Health Treatment"
          paragraphs={[
            "One of the most common barriers to accessing quality mental health treatment is uncertainty about what insurance actually covers. Under the Mental Health Parity and Addiction Equity Act (MHPAEA), most PPO insurance plans — including Anthem, Cigna, Aetna, UHC, and Blue Cross Blue Shield — are legally required to cover mental health treatment at the same level as physical health treatment.",
            "At Rize OC, our dedicated insurance verification team handles the entire benefits process for you — completely free and with no obligation. We contact your provider directly, determine your exact coverage and out-of-pocket costs, and present you with a clear picture of what treatment will cost before you make any commitment.",
          ]}
          listHeading="Insurance Plans We Work With"
          listItems={[
            "Anthem Blue Cross — residential, PHP, IOP, and outpatient",
            "Cigna — full continuum of care, in-network rates available",
            "Aetna — mental health residential and intensive outpatient",
            "United Healthcare (UHC) — behavioral health and residential",
            "Blue Cross Blue Shield (BCBS) — mental health inpatient and outpatient",
            "Most other major PPO plans — free verification in under an hour",
            "Flexible private pay options for uninsured or underinsured clients",
          ]}
          callout="Mental health parity law requires your insurance plan to cover mental health treatment the same way it covers physical health care. Don't assume you're not covered — call us now and our team will verify your specific benefits in under an hour, completely confidential."
        />
      }
    />
  );
}
