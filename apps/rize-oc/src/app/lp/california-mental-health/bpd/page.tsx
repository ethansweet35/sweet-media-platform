import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Borderline Personality Disorder Treatment | Rize OC",
  description:
    "Specialized BPD treatment for California residents. DBT, individual therapy, and expert residential care. In-person in Orange County, virtual statewide. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Borderline Personality Disorder Treatment Centers"
      subheadline="Rize OC offers specialized residential and inpatient BPD treatment for California residents. Evidence-based programs — including DBT, individual therapy, and family support — designed for lasting emotional stability."
      eyebrow="California BPD Treatment Specialists"
      stat="1,000+"
      statLabel="Patients Helped"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding BPD"
          headline="What Is Borderline Personality Disorder & How Is It Treated?"
          paragraphs={[
            "Borderline personality disorder (BPD) is characterized by intense emotional dysregulation, unstable relationships, distorted self-image, and impulsive behaviors. Without specialized support, BPD can significantly disrupt daily life — making expert residential or intensive care essential for many California clients.",
            "Dialectical Behavior Therapy (DBT) — developed specifically for BPD — is the gold standard treatment at Rize OC. Our California program integrates DBT with individual therapy, group skills training, and family therapy for in-person and virtual clients statewide.",
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
          callout="DBT is clinically proven to reduce self-harm, hospitalizations, and suicidal behavior in individuals with BPD. Rize OC delivers full-format DBT for California residents — individual sessions, group skills training, and between-session coaching."
        />
      }
    />
  );
}
