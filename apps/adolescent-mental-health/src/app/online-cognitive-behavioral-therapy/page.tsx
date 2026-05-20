import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineCbtPage from "@/views/treatment/OnlineCbtPage";

const fallbackMetadata: Metadata = {
  title: "Online CBT for Teens | Adolescent Mental Health",
  description:
    "Online CBT for teens ages 12–17. Evidence-based therapy for anxiety, depression, OCD, and avoidance. Licensed clinicians. Insurance accepted.",
  alternates: { canonical: "/online-cognitive-behavioral-therapy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-cognitive-behavioral-therapy", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is CBT and how does it work?", acceptedAnswer: { "@type": "Answer", text: "Cognitive Behavioral Therapy is a structured, skills-based approach to mental health treatment. It teaches teens to recognize and change the thought patterns driving anxiety, depression, and avoidance — then practice new responses in real life." } },
    { "@type": "Question", name: "Is online CBT as effective as in-person?", acceptedAnswer: { "@type": "Answer", text: "Research shows that online CBT can be equally effective for adolescents when delivered by licensed clinicians using structured protocols. The key factors are therapeutic alliance and skill practice — both of which are achievable in a well-run virtual format." } },
    { "@type": "Question", name: "How long does CBT take?", acceptedAnswer: { "@type": "Answer", text: "Standard CBT is typically 12–20 sessions. In our Virtual IOP format — where CBT is delivered multiple times per week across individual and group sessions — teens often see meaningful change faster than in once-weekly outpatient care." } },
    { "@type": "Question", name: "Do parents participate in CBT?", acceptedAnswer: { "@type": "Answer", text: "Yes. Parent coaching is an important part of adolescent CBT — caregivers learn how to respond to avoidance, reinforce skills at home, and avoid inadvertently maintaining anxiety or depression patterns." } },
    { "@type": "Question", name: "Is CBT good for all conditions?", acceptedAnswer: { "@type": "Answer", text: "CBT has the strongest evidence base for anxiety disorders, depression, OCD, and trauma. It is also used as part of treatment for ADHD, school avoidance, and self-harm. Our clinicians will recommend the most appropriate modalities for your teen's specific presentation." } },
    { "@type": "Question", name: "Is Online CBT covered by insurance?", acceptedAnswer: { "@type": "Answer", text: "When delivered as part of outpatient therapy or IOP, CBT sessions are typically covered by most major insurance plans. We verify benefits before enrollment so families understand their coverage up front." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/online-cognitive-behavioral-therapy"
        brandName="Adolescent Mental Health"
      />
      <OnlineCbtPage />
    </>
  );
}
