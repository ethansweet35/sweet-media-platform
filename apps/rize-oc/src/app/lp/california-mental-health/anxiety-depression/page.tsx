import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Inpatient Treatment for Anxiety & Depression | Rize OC",
  description:
    "Top-rated residential and inpatient treatment for co-occurring anxiety and depression in California. Evidence-based care, insurance accepted, same-day admissions.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Inpatient Treatment for Depression & Anxiety"
      subheadline="Co-occurring anxiety and depression require integrated, intensive care. Rize OC provides California residents with residential and inpatient treatment designed for this dual presentation — in-person in Orange County and virtual options statewide."
      eyebrow="California Anxiety & Depression Specialists"
      stat="Same Day"
      statLabel="Admissions Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Co-Occurring Anxiety & Depression in California"
          headline="Why Anxiety & Depression Often Require Integrated Inpatient Treatment"
          paragraphs={[
            "Anxiety and depression frequently co-occur — approximately 60% of people with depression also experience symptoms of anxiety, and vice versa. This dual presentation often requires more intensive treatment than either condition alone, as each condition can amplify the other.",
            "At Rize OC, our integrated California program addresses anxiety and depression together within a unified plan. Our clinical team targets the interconnected roots of both conditions — serving clients in Orange County in-person and throughout California via virtual intensive care.",
          ]}
          listHeading="Common Symptoms of Co-Occurring Anxiety & Depression"
          listItems={[
            "Persistent worry or dread combined with persistent low mood",
            "Physical symptoms — chest tightness, fatigue, restlessness, and sleep disruption",
            "Avoidance of activities due to both fear and lack of motivation",
            "Difficulty concentrating or completing daily tasks",
            "Irritability and chronic emotional exhaustion",
            "Social withdrawal and increasing isolation",
            "Hopelessness about the future combined with constant worry",
            "Panic attacks occurring alongside depressive episodes",
          ]}
          callout="Co-occurring anxiety and depression is one of the most common presentations we treat at Rize OC. Our California residential and inpatient programs use integrated, evidence-based protocols that address both conditions at once."
        />
      }
    />
  );
}
