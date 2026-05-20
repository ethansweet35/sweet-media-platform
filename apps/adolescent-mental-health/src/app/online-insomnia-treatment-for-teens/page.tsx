import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import InsomniaTreatmentPage from "@/views/treatment/InsomniaTreatmentPage";

const fallbackMetadata: Metadata = {
  title: "Online Insomnia Treatment for Teens | Adolescent Mental Health",
  description:
    "Clinical insomnia treatment for teens ages 12–17. CBT-I informed care addressing sleep disruption alongside anxiety and depression. Family coaching. Insurance accepted.",
  alternates: { canonical: "/online-insomnia-treatment-for-teens" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-insomnia-treatment-for-teens", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is teen insomnia a clinical condition?", acceptedAnswer: { "@type": "Answer", text: "Yes. Chronic insomnia disorder in adolescents is a recognized clinical condition characterized by difficulty initiating or maintaining sleep, lasting at least three nights per week for three or more months, with meaningful daytime impairment. It is not just a phase." } },
    { "@type": "Question", name: "What is CBT-I and can it help teens?", acceptedAnswer: { "@type": "Answer", text: "Cognitive Behavioral Therapy for Insomnia (CBT-I) is the gold-standard treatment for insomnia in adults and has strong evidence in adolescents. It addresses the behavioral patterns and thoughts that perpetuate insomnia — without relying on medication." } },
    { "@type": "Question", name: "Do you prescribe sleep medication?", acceptedAnswer: { "@type": "Answer", text: "No. We are a therapy-based program. Medication decisions belong with your teen's prescribing physician or psychiatrist. We coordinate with medical providers when appropriate and focus on behavioral and cognitive interventions." } },
    { "@type": "Question", name: "Can virtual care address sleep problems effectively?", acceptedAnswer: { "@type": "Answer", text: "Yes. Sleep logs, behavioral recommendations, parent coaching, and cognitive work are all well-suited to a telehealth format. The key is consistent clinician contact — which Virtual IOP provides multiple days per week." } },
    { "@type": "Question", name: "How quickly can sleep improve with treatment?", acceptedAnswer: { "@type": "Answer", text: "Many teens see meaningful improvement in sleep onset and maintenance within four to six weeks of consistent CBT-I based treatment. Progress depends on adherence to sleep schedule recommendations and co-occurring factors." } },
    { "@type": "Question", name: "Does my teen need to have a sleep problem to enroll in Virtual IOP?", acceptedAnswer: { "@type": "Answer", text: "No. Virtual IOP treats a range of adolescent mental health concerns. Insomnia treatment is often part of a broader plan when sleep is disrupted alongside anxiety, depression, or school avoidance." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/online-insomnia-treatment-for-teens"
        brandName="Adolescent Mental Health"
      />
      <InsomniaTreatmentPage />
    </>
  );
}
