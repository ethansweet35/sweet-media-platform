import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Borderline Personality Disorder Treatment Centers | Rize OC",
  description: "Specialized BPD treatment at a top-rated residential center. DBT, individual therapy, and expert care for borderline personality disorder. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Borderline Personality Disorder Treatment Centers"
      subheadline="Rize OC offers specialized residential and inpatient treatment for borderline personality disorder. Our evidence-based programs — including DBT, individual therapy, and family support — are designed to create lasting emotional stability."
      eyebrow="BPD Treatment Specialists"
      stat="1,000+"
      statLabel="Patients Helped"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding BPD"
          headline="What Is Borderline Personality Disorder & How Is It Treated?"
          paragraphs={[
            "Borderline personality disorder (BPD) is a complex mental health condition characterized by intense emotional dysregulation, unstable relationships, distorted self-image, and impulsive behaviors. People with BPD often experience rapid mood shifts and struggle with a persistent fear of abandonment — making it one of the most challenging conditions to navigate without specialized professional support.",
            "Dialectical Behavior Therapy (DBT) — developed specifically for BPD — is the gold standard treatment and a cornerstone of our residential program. Our clinical team integrates DBT with individual therapy, group skills training, and family therapy to build a complete foundation for emotional stability and lasting recovery.",
          ]}
          listHeading="Common BPD Symptoms"
          listItems={[
            "Intense fear of abandonment (real or imagined)",
            "Unstable and intense interpersonal relationships",
            "Distorted or rapidly shifting self-image",
            "Impulsive and self-destructive behaviors",
            "Self-harm or recurrent suicidal ideation",
            "Extreme mood swings lasting hours to days",
            "Chronic feelings of emptiness",
            "Explosive or inappropriate anger outbursts",
          ]}
          callout="DBT (Dialectical Behavior Therapy) is clinically proven to reduce self-harm, hospitalizations, and suicidal behavior in individuals with BPD. Our residential program delivers DBT in its full, evidence-based format — with individual sessions, group skills training, and between-session coaching."
        />
      }
    />
  );
}
