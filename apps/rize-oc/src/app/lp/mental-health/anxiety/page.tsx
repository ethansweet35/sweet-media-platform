import type { Metadata } from "next";
import LpMentalHealthGalpPage from "@/views/lp/LpMentalHealthGalpPage";
import LpConditionOverview from "@/components/lp/LpConditionOverview";

export const metadata: Metadata = {
  title: "Inpatient Anxiety Treatment Centers | Rize OC",
  description: "Best residential anxiety treatment centers in Orange County. Expert inpatient care for generalized anxiety, OCD, panic disorder, and social anxiety. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpMentalHealthGalpPage
      headline="Inpatient Anxiety Treatment Centers"
      subheadline="Rize OC provides specialized residential and inpatient treatment for anxiety disorders — including generalized anxiety, panic disorder, OCD, and social anxiety. Our evidence-based programs combine CBT, DBT, and somatic therapies in a private coastal sanctuary."
      eyebrow="Anxiety Treatment Specialists"
      stat="Same Day"
      statLabel="Assessments Available"
      conditionOverview={
        <LpConditionOverview
          eyebrow="Understanding Anxiety Disorders"
          headline="When Does Anxiety Require Residential or Inpatient Treatment?"
          paragraphs={[
            "Anxiety disorders are the most common mental health conditions in the United States, affecting approximately 40 million adults. While some anxiety is a normal part of life, anxiety disorders involve intense, excessive, and persistent fear or worry that significantly interferes with daily activities — work, relationships, and quality of life. When anxiety reaches this level, residential or intensive inpatient treatment may be necessary for effective stabilization.",
            "Rize OC specializes in treating all forms of anxiety disorder, including generalized anxiety disorder (GAD), panic disorder, social anxiety, and OCD. Our evidence-based residential program combines cognitive-behavioral therapy (CBT), exposure therapy, somatic experiencing, and mindfulness-based approaches to address both the psychological and physiological dimensions of anxiety.",
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
          callout="Anxiety disorders are among the most treatable mental health conditions. With the right residential or intensive outpatient program, most individuals experience significant symptom reduction — allowing them to reclaim their lives and return to the activities and relationships they value."
        />
      }
    />
  );
}
