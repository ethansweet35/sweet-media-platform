import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VirtualIopPage from "@/views/virtual-iop/VirtualIopPage";

const fallbackMetadata: Metadata = {
  title: "Virtual IOP for Teens | Adolescent Mental Health",
  description:
    "Virtual Intensive Outpatient Program for teens ages 12–17. 9–20 hours per week of individual, group, and family therapy from home. Insurance accepted.",
  alternates: { canonical: "/virtual-iop-for-teens" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/virtual-iop-for-teens", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How is Virtual IOP different from weekly therapy?", acceptedAnswer: { "@type": "Answer", text: "Weekly therapy typically offers one session per week. Virtual IOP provides 9–20 structured hours of care — individual therapy, group therapy, family sessions, and skills work — designed for teens who need more support than standard outpatient care." } },
    { "@type": "Question", name: "Can my teen stay in school during Virtual IOP?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our schedules are built around school and extracurricular commitments. Many families choose afternoon or early-evening tracks so teens can maintain academics while receiving intensive clinical support." } },
    { "@type": "Question", name: "Is online IOP effective for adolescents?", acceptedAnswer: { "@type": "Answer", text: "Research and clinical experience show that virtual IOP can be as effective as in-person care for medically stable teens when delivered by licensed clinicians using evidence-based modalities like CBT and DBT." } },
    { "@type": "Question", name: "What conditions do you treat in Virtual IOP?", acceptedAnswer: { "@type": "Answer", text: "We treat anxiety, depression, trauma and PTSD, ADHD, bipolar disorder, self-harm, school avoidance, OCD, and related adolescent mental health concerns. Our admissions team confirms clinical fit during your free consultation." } },
    { "@type": "Question", name: "Is Virtual IOP covered by insurance?", acceptedAnswer: { "@type": "Answer", text: "Most major insurance plans cover adolescent IOP, including telehealth. We verify benefits at no cost before enrollment and explain any copay or authorization requirements up front." } },
    { "@type": "Question", name: "How involved do parents need to be?", acceptedAnswer: { "@type": "Answer", text: "Family participation is a core part of our model — not optional add-on care. Parents attend dedicated family therapy sessions and coaching to learn how to support progress, communicate effectively, and respond to challenges between appointments." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/virtual-iop-for-teens"
        brandName="Adolescent Mental Health"
      />
      <VirtualIopPage />
    </>
  );
}
