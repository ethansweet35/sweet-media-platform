import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BipolarTreatmentPage from "@/views/treatment/BipolarTreatmentPage";

const fallbackMetadata: Metadata = {
  title: "Online Bipolar Treatment for Teens | Adolescent Mental Health",
  description:
    "Virtual bipolar treatment for adolescents ages 12–17. Mood monitoring, CBT and DBT therapy, family education, and prescriber coordination. Insurance accepted.",
  alternates: { canonical: "/online-bipolar-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-bipolar-treatment", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can teens have bipolar disorder?", acceptedAnswer: { "@type": "Answer", text: "Yes. Bipolar disorder can emerge in adolescence and is often initially misdiagnosed as depression, ADHD, or behavioral problems. Accurate diagnosis and early intervention significantly improve long-term outcomes." } },
    { "@type": "Question", name: "Do you diagnose bipolar disorder?", acceptedAnswer: { "@type": "Answer", text: "Our licensed clinicians conduct comprehensive assessments as part of intake. We coordinate with prior providers and, when needed, refer for additional psychiatric evaluation. We do not make diagnoses in isolation from a full clinical picture." } },
    { "@type": "Question", name: "Is Virtual IOP safe for teens with bipolar disorder?", acceptedAnswer: { "@type": "Answer", text: "IOP is appropriate for medically and psychiatrically stable teens who do not require 24/7 monitoring. We assess acuity carefully at intake and will recommend a higher level of care if inpatient or residential is clinically indicated." } },
    { "@type": "Question", name: "Who manages medication for bipolar disorder?", acceptedAnswer: { "@type": "Answer", text: "Prescribing decisions belong with your teen's psychiatrist or medical provider. Our role is to provide therapy, mood monitoring, family education, and to communicate proactively with the prescribing team about symptom patterns." } },
    { "@type": "Question", name: "Can Virtual IOP happen alongside medication management?", acceptedAnswer: { "@type": "Answer", text: "Yes — this is our model for most teens with bipolar disorder. Therapy, skills work, and family support in IOP complement medication management. We coordinate with prescribers to ensure care is aligned." } },
    { "@type": "Question", name: "What happens if my teen decompensates during IOP?", acceptedAnswer: { "@type": "Answer", text: "We have clear protocols for clinical deterioration. If a teen requires a higher level of care during IOP, we facilitate transition to inpatient or residential programs and maintain family communication throughout." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/online-bipolar-treatment"
        brandName="Adolescent Mental Health"
      />
      <BipolarTreatmentPage />
    </>
  );
}
