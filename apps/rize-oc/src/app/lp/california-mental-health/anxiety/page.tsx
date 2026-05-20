import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "California Inpatient Anxiety Treatment Centers | Rize OC",
  description:
    "Residential and inpatient anxiety treatment for California residents. Expert care for GAD, OCD, panic disorder, and social anxiety. In-person in Orange County, virtual statewide. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="California Inpatient Anxiety Treatment Centers"
      subheadline="Rize OC provides specialized residential and inpatient anxiety treatment for California residents — including generalized anxiety, panic disorder, OCD, and social anxiety. In-person care in Orange County with virtual options available statewide."
      eyebrow="California Anxiety Treatment Specialists"
      stat="Same Day"
      statLabel="Assessments Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Anxiety Disorders in California"
          headline="When Does Anxiety Require Residential or Inpatient Treatment?"
          paragraphs={[
            "Anxiety disorders are among the most common mental health conditions affecting California adults. When anxiety becomes intense, persistent, and disruptive to work, relationships, and daily life, residential or intensive inpatient treatment may be necessary for effective stabilization.",
            "Rize OC treats all forms of anxiety disorder for clients throughout California — including generalized anxiety disorder (GAD), panic disorder, social anxiety, and OCD. Our evidence-based program combines CBT, exposure therapy, somatic experiencing, and mindfulness-based approaches, delivered in-person in Orange County or through our virtual California program.",
          ]}
          listHeading="Anxiety Disorders We Treat"
          listItems={[
            "Generalized anxiety disorder (GAD) — persistent, excessive worry about everyday situations",
            "Panic disorder — recurrent, unexpected panic attacks with intense physical symptoms",
            "Social anxiety disorder — intense fear of social situations and judgment by others",
            "OCD — intrusive, unwanted thoughts with compulsive behaviors to reduce anxiety",
            "Agoraphobia — fear of situations where escape might be difficult",
            "Health anxiety — excessive worry about having or developing a serious illness",
            "Specific phobias causing significant impairment to daily functioning",
            "Anxiety with co-occurring depression or trauma",
          ]}
          callout="Anxiety disorders are highly treatable with the right level of care. California residents can access Rize OC's residential and intensive outpatient programs in-person or virtually — with same-day assessments and insurance verification available."
        />
      }
    />
  );
}
