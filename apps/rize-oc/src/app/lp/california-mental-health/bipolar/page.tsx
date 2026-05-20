import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Residential Treatment for Bipolar Disorder | Rize OC",
  description:
    "Top-rated residential bipolar disorder treatment in California. Expert inpatient care, medication management, and evidence-based therapy. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Residential Treatment for Bipolar Disorder"
      subheadline="Rize OC provides expert residential and inpatient care for bipolar disorder for California residents — including bipolar I, bipolar II, and severe presentations. Medication management, mood stabilization, and evidence-based therapy in Orange County with virtual options statewide."
      eyebrow="California Bipolar Disorder Specialists"
      stat="Same Day"
      statLabel="Assessments Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Bipolar Disorder"
          headline="What Is Bipolar Disorder & When Is Residential Care Needed?"
          paragraphs={[
            "Bipolar disorder is a mood disorder characterized by dramatic shifts in energy, mood, and activity levels. Severe bipolar disorder, including Bipolar I, can involve psychotic features and require intensive residential stabilization — care that California residents can access at Rize OC.",
            "Effective bipolar treatment requires precise medication management combined with evidence-based therapy. Our psychiatrists specialize in mood disorders and work with our therapy team to stabilize mood, address underlying trauma, and build sustainable coping skills for clients across California.",
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
          callout="Without proper treatment, bipolar disorder can progressively worsen. Residential care provides the structured environment needed for accurate diagnosis, medication stabilization, and foundational therapeutic work — available to California residents in-person or virtually."
        />
      }
    />
  );
}
