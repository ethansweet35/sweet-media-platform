import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Inpatient Treatment Centers for Anxiety & Depression | Rize OC",
  description: "Top-rated residential and inpatient treatment for co-occurring anxiety and depression. Evidence-based care, insurance accepted, same-day admissions at Rize OC.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Inpatient Treatment Centers for Depression & Anxiety"
      subheadline="Co-occurring anxiety and depression require integrated, intensive care. Rize OC provides residential and inpatient treatment specifically designed for this dual presentation — with evidence-based therapies, personalized treatment plans, and full insurance verification."
      eyebrow="Anxiety & Depression Specialists"
      stat="Same Day"
      statLabel="Admissions Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Co-Occurring Anxiety & Depression"
          headline="Why Anxiety & Depression Often Require Integrated Inpatient Treatment"
          paragraphs={[
            "Anxiety and depression frequently co-occur — approximately 60% of people with depression also experience symptoms of anxiety, and vice versa. This dual presentation often requires more intensive treatment than either condition alone, as each condition can amplify the other and significantly complicate recovery if not addressed simultaneously.",
            "At Rize OC, our integrated treatment approach addresses anxiety and depression together within a unified plan. Rather than treating each in isolation, our clinical team targets the interconnected roots of both conditions — reducing overall symptom burden and creating more durable, lasting recovery outcomes.",
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
          callout="Co-occurring anxiety and depression is the most common mental health presentation we see at Rize OC. Our residential and inpatient programs are specifically designed to treat this combination with integrated, evidence-based protocols that address both conditions at once."
        />
      }
    />
  );
}
