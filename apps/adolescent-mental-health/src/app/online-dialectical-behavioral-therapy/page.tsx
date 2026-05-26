import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineDbtPage from "@/views/treatment/OnlineDbtPage";

const fallbackMetadata: Metadata = {
  title: "Online DBT for Teens | Adolescent Mental Health",
  description:
    "Online Dialectical Behavior Therapy for teens ages 12–17. Mindfulness, distress tolerance, emotion regulation, and interpersonal skills. Insurance accepted.",
  alternates: { canonical: "/online-dialectical-behavioral-therapy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-dialectical-behavioral-therapy", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is online DBT as effective as in-person?", acceptedAnswer: { "@type": "Answer", text: "Research shows virtual DBT can be equally effective when delivered by licensed clinicians using structured DBT protocols. Many teens feel more comfortable practicing skills in their home environment — where stress actually occurs." } },
    { "@type": "Question", name: "Do parents participate in DBT?", acceptedAnswer: { "@type": "Answer", text: "Yes. Adolescent DBT often includes family skills training so caregivers learn the same vocabulary and tools their teen is practicing — reducing invalidation and conflict at home." } },
    { "@type": "Question", name: "How is DBT different from CBT?", acceptedAnswer: { "@type": "Answer", text: "DBT evolved from CBT but adds acceptance-based skills and a focus on emotional dysregulation. It is especially effective for teens with intense mood swings, impulsivity, and self-harm — not just negative thought patterns." } },
    { "@type": "Question", name: "What are the four DBT modules?", acceptedAnswer: { "@type": "Answer", text: "Mindfulness, Distress Tolerance, Emotion Regulation, and Interpersonal Effectiveness. Teens practice skills in individual sessions, group skills training, and between-session homework." } },
    { "@type": "Question", name: "Is DBT only for severe cases?", acceptedAnswer: { "@type": "Answer", text: "DBT is often recommended when emotions feel unmanageable or behaviors are escalating — but it is also used preventively in IOP for teens who need more structure than weekly therapy provides." } },
    { "@type": "Question", name: "Is online DBT covered by insurance?", acceptedAnswer: { "@type": "Answer", text: "When delivered as part of outpatient therapy or Virtual IOP, DBT sessions are typically covered by most major insurance plans. We verify benefits before enrollment." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/online-dialectical-behavioral-therapy"
        brandName="Adolescent Mental Health"
      />
      <OnlineDbtPage />
    </>
  );
}
