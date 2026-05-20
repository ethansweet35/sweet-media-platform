import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IndividualTherapyPage from "@/views/therapy/IndividualTherapyPage";

const fallbackMetadata: Metadata = {
  title: "Individual Therapy for Teens | Adolescent Mental Health",
  description:
    "One-on-one virtual therapy for teens ages 12–17. Licensed clinicians matched by clinical fit. CBT and DBT-informed. 2–3 sessions per week within Virtual IOP. Insurance accepted.",
  alternates: { canonical: "/therapy/individual-therapy-for-teens" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapy/individual-therapy-for-teens", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How many individual therapy sessions does my teen get per week?", acceptedAnswer: { "@type": "Answer", text: "In our Virtual IOP, teens typically receive 2–3 individual therapy sessions per week alongside 3–4 group sessions and 1–2 family sessions. Individual frequency may adjust based on clinical need and phase of treatment." } },
    { "@type": "Question", name: "How do you match my teen with the right therapist?", acceptedAnswer: { "@type": "Answer", text: "We match based on clinical presentation, therapy style, and your teen's specific needs — including identity, cultural background, and the nature of their primary concerns. We prioritize genuine therapeutic fit over schedule convenience." } },
    { "@type": "Question", name: "Can my teen request a different therapist if it's not a good fit?", acceptedAnswer: { "@type": "Answer", text: "Yes. Therapeutic fit matters, and we take it seriously. If your teen doesn't feel connected to their clinician after a few sessions, we facilitate a rematch within our team without disruption to the rest of their program." } },
    { "@type": "Question", name: "Are individual sessions confidential?", acceptedAnswer: { "@type": "Answer", text: "Yes, with standard limits. Content shared in individual sessions is protected by HIPAA and standard confidentiality rules — with exceptions for safety concerns (self-harm, harm to others, child abuse). We explain this clearly at intake." } },
    { "@type": "Question", name: "What does a typical individual session look like?", acceptedAnswer: { "@type": "Answer", text: "Sessions are 45–50 minutes via secure HIPAA-compliant video. Early sessions focus on rapport and assessment. Active treatment sessions involve skills practice, thought challenging, or processing difficult experiences, followed by a between-session assignment." } },
    { "@type": "Question", name: "Do parents have access to what's discussed in individual sessions?", acceptedAnswer: { "@type": "Answer", text: "Not by default — teen confidentiality is foundational to therapeutic trust. However, clinicians will share safety-relevant information and general progress with caregivers, and family sessions provide a space for caregiver involvement in a structured way." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/therapy/individual-therapy-for-teens"
        brandName="Adolescent Mental Health"
      />
      <IndividualTherapyPage />
    </>
  );
}
