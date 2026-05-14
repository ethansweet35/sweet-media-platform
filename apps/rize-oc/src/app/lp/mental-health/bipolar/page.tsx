import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Residential Treatment Center for Bipolar Disorder | Rize OC",
  description: "Top-rated residential treatment for bipolar disorder in Orange County. Expert inpatient care, medication management, and evidence-based therapy. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Residential Treatment Center for Bipolar Disorder"
      subheadline="Rize OC provides expert residential and inpatient care for bipolar disorder — including severe bipolar, bipolar I, and bipolar II. Our multidisciplinary clinical team offers medication management, mood stabilization, and evidence-based therapy in a private coastal sanctuary."
      eyebrow="Bipolar Disorder Specialists"
      stat="Same Day"
      statLabel="Assessments Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Bipolar Disorder"
          headline="What Is Bipolar Disorder & When Is Residential Care Needed?"
          paragraphs={[
            "Bipolar disorder is a mood disorder characterized by dramatic shifts in energy, mood, and activity levels. Episodes of mania or hypomania (elevated, expansive, or irritable mood) alternate with episodes of depression — sometimes with periods of normal mood in between. Severe bipolar disorder, including Bipolar I, can involve psychotic features and require intensive residential stabilization.",
            "Effective treatment for bipolar disorder requires precise medication management combined with evidence-based therapy. At Rize OC, our psychiatrists specialize in mood disorders and work collaboratively with our therapy team to develop a comprehensive plan that stabilizes mood, addresses underlying trauma, and builds sustainable long-term coping skills.",
          ]}
          listHeading="Bipolar Disorder Presentations We Treat"
          listItems={[
            "Manic episodes — elevated mood, grandiosity, decreased sleep, racing thoughts, impulsive behavior",
            "Depressive episodes — persistent sadness, hopelessness, fatigue, and concentration problems",
            "Hypomanic episodes (less severe than full mania but still disruptive to daily life)",
            "Mixed states — simultaneous manic and depressive symptoms",
            "Rapid cycling (4 or more mood episodes per year)",
            "Psychotic features in severe Bipolar I disorder",
          ]}
          callout="Without proper treatment, bipolar disorder can progressively worsen over time. Residential care provides the structured environment needed for accurate diagnosis, medication stabilization, and the foundational therapeutic work that creates lasting stability."
        />
      }
    />
  );
}
