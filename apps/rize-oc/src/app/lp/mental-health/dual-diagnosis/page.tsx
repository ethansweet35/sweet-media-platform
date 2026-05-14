import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Dual Diagnosis Treatment Centers | Rize OC",
  description: "Expert co-occurring disorder and dual diagnosis treatment at Rize OC. Residential and inpatient care for mental health and addiction. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Dual Diagnosis Treatment Centers"
      subheadline="Treating a mental health condition and substance use disorder together requires integrated, specialized care. Rize OC's dual diagnosis residential program addresses both sides of co-occurring disorders simultaneously — creating a more complete, lasting recovery."
      eyebrow="Co-Occurring Disorder Specialists"
      stat="50%+"
      statLabel="of Clients Have Dual Diagnosis"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Dual Diagnosis"
          headline="What Is Dual Diagnosis & Why Does It Require Integrated Treatment?"
          paragraphs={[
            "Dual diagnosis (also called co-occurring disorders) refers to the simultaneous presence of a mental health disorder and a substance use disorder. This is far more common than many people realize — studies show that more than 50% of individuals with a substance use disorder also have a co-occurring mental health condition, and vice versa.",
            "Treating dual diagnosis effectively requires integrated care that addresses both conditions simultaneously rather than sequentially. When only one condition is treated, the untreated condition often drives relapse or worsening symptoms. At Rize OC, our integrated dual diagnosis program is built from the ground up to address both components within a unified, coordinated treatment plan.",
          ]}
          listHeading="Common Dual Diagnosis Combinations We Treat"
          listItems={[
            "Depression + Alcohol Use Disorder",
            "Generalized Anxiety + Benzodiazepine or Cannabis Use",
            "PTSD + Opioid or Stimulant Use Disorder",
            "Bipolar Disorder + Substance Use",
            "ADHD + Stimulant or Cannabis Use Disorder",
            "BPD + Alcohol or Self-Medication",
            "Schizophrenia + Polysubstance Use",
            "OCD + Alcohol Use as a Coping Mechanism",
          ]}
          callout="Treating dual diagnosis requires specialists who understand both sides of the equation. Our clinical team includes experts in both addiction medicine and mental health — ensuring your treatment plan addresses every aspect of your recovery, not just one piece of it."
        />
      }
    />
  );
}
