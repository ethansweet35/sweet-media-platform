import type { Metadata } from "next";
import { OptimizationStatusBanner, resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdolescentIopPage from "@/views/treatment/AdolescentIopPage";

const fallbackMetadata: Metadata = {
  title: "Adolescent IOP for Teens | Adolescent Mental Health",
  description:
    "Adolescent Intensive Outpatient Program for teens ages 12–17. 9–20 hours per week of individual, group, and family therapy. Virtual delivery. Insurance accepted.",
  alternates: { canonical: "/adolescent-iop-for-teens" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/adolescent-iop-for-teens", fallbackMetadata);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is Adolescent IOP?", acceptedAnswer: { "@type": "Answer", text: "Adolescent IOP (Intensive Outpatient Program) is a structured mental health treatment model providing 9–20 hours of therapy per week — combining individual, group, and family sessions — for teens who need more support than standard weekly therapy." } },
    { "@type": "Question", name: "How is this different from Virtual IOP?", acceptedAnswer: { "@type": "Answer", text: "Virtual IOP is how we deliver Adolescent IOP — through HIPAA-compliant video from home. The clinical structure, modalities, and hours are the same. Most families choose the virtual format because it eliminates commute and fits around school." } },
    { "@type": "Question", name: "Can my teen stay in school during IOP?", acceptedAnswer: { "@type": "Answer", text: "Yes. Schedules are built specifically around your teen's school and activity commitments. Many families use afternoon or early-evening tracks." } },
    { "@type": "Question", name: "Is IOP covered by insurance?", acceptedAnswer: { "@type": "Answer", text: "Most major insurance plans cover adolescent IOP, including telehealth IOP. We verify benefits at no cost before enrollment and walk through any out-of-pocket costs." } },
    { "@type": "Question", name: "How quickly can we start?", acceptedAnswer: { "@type": "Answer", text: "Many families complete intake within 24–48 hours of the initial consultation. We handle insurance verification and scheduling so you can focus on your teen." } },
    { "@type": "Question", name: "What if my teen needs more than IOP?", acceptedAnswer: { "@type": "Answer", text: "If assessment indicates a higher level of care is needed, we will explain the options and help connect you with the right program. We will not enroll a teen in IOP if a higher level of care is clinically indicated." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <OptimizationStatusBanner
        trackedPagePath="/adolescent-iop-for-teens"
        brandName="Adolescent Mental Health"
      />
      <AdolescentIopPage />
    </>
  );
}
