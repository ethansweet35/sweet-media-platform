import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Dual Diagnosis Treatment Centers | Rize OC",
  description:
    "Expert co-occurring disorder and dual diagnosis treatment for California residents. Residential and inpatient care for mental health and addiction. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Dual Diagnosis Treatment Centers"
      subheadline="Treating mental health and substance use together requires integrated, specialized care. Rize OC's dual diagnosis program serves California residents — addressing co-occurring disorders simultaneously for more complete, lasting recovery."
      eyebrow="California Co-Occurring Disorder Specialists"
      stat="50%+"
      statLabel="of Clients Have Dual Diagnosis"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Dual Diagnosis"
          headline="What Is Dual Diagnosis & Why Does It Require Integrated Treatment?"
          paragraphs={[
            "Dual diagnosis (co-occurring disorders) means a mental health disorder and a substance use disorder are present at the same time. More than 50% of individuals with a substance use disorder also have a co-occurring mental health condition — a presentation we treat extensively for California clients.",
            "Effective dual diagnosis treatment addresses both conditions simultaneously. When only one is treated, the untreated condition often drives relapse. Rize OC's integrated California program is built to address both within a unified, coordinated treatment plan — in-person or virtual.",
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
          callout="Dual diagnosis requires specialists who understand both addiction medicine and mental health. Rize OC's California team ensures your treatment plan addresses every aspect of recovery — not just one piece of it."
        />
      }
    />
  );
}
