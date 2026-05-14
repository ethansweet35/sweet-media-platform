import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online Therapy for Schizophrenia in California | Rize OC",
  description: "Virtual schizophrenia therapy and support via telehealth — medication monitoring, CBT for psychosis, and structured programs available online across California. Insurance accepted.",
  alternates: { canonical: "/online-therapy-for-schizophrenia" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-therapy-for-schizophrenia", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual Schizophrenia Support"
      headline="Online Therapy for Schizophrenia in California"
      subhead="Structured virtual therapy, medication monitoring, and psychosocial support for schizophrenia and schizoaffective disorder — available via telehealth across California. Supporting recovery and community integration from home."
      conditionName="Schizophrenia"
      overviewTitle="Supporting Schizophrenia Recovery Through Virtual Care"
      overviewBody={[
        "Schizophrenia is a complex, serious mental disorder that requires ongoing, consistent clinical support. Access to that support is one of the greatest barriers to stable recovery — many individuals with schizophrenia live far from specialty centers, face transportation challenges, or experience barriers that make in-person attendance difficult. Virtual care can bridge this gap.",
        "Online therapy for schizophrenia is most appropriate for individuals who are clinically stable — with symptoms managed through medication — and who are seeking ongoing psychosocial support, therapy, and medication monitoring. Our virtual program includes CBT for psychosis (CBTp), supportive therapy, medication adherence support, family psychoeducation, and social skills coaching.",
        "For individuals experiencing an acute psychotic episode or who are not yet stabilized on medication, residential or inpatient care is typically the appropriate first step. Our team can help coordinate this level of care and transition clients to virtual support once stabilization is achieved.",
      ]}
      whatWeProvide={[
        { icon: "ri-brain-line", title: "CBT for Psychosis (CBTp)", desc: "Evidence-based cognitive therapy addressing psychotic symptoms, delusional thinking, and negative beliefs." },
        { icon: "ri-medicine-bottle-line", title: "Medication Monitoring", desc: "Regular psychiatric check-ins to monitor medication effectiveness, side effects, and adherence." },
        { icon: "ri-team-line", title: "Family Psychoeducation", desc: "Education and support for family members to understand schizophrenia and reduce relapse risk." },
        { icon: "ri-community-line", title: "Social Skills & Integration", desc: "Coaching and structured support for social functioning, daily living skills, and community integration." },
      ]}
      howItWorks={[
        { step: "01", title: "Initial Consultation", desc: "Speak with our team about your current stability level, medication history, and goals for virtual support." },
        { step: "02", title: "Clinical Assessment", desc: "A clinician reviews your history, current medication regimen, and symptom status to determine virtual care suitability." },
        { step: "03", title: "Insurance Verified", desc: "We verify your mental health benefits for virtual psychiatric and therapy services — at no cost to you." },
        { step: "04", title: "Virtual Program Begins", desc: "Your individualized virtual schedule — combining therapy, medication check-ins, and group support — begins within days." },
      ]}
      faqs={[
        { q: "Is online therapy appropriate for schizophrenia?", a: "Virtual therapy is appropriate for individuals with schizophrenia who are clinically stable on medication. CBT for psychosis (CBTp) can be delivered effectively via telehealth and has evidence supporting its use in this format. Acute psychosis, significant negative symptoms, or cognitive impairment affecting technology use may necessitate in-person care." },
        { q: "What is CBT for psychosis (CBTp)?", a: "CBT for Psychosis is an adaptation of standard CBT specifically designed for individuals with psychotic disorders. It targets distressing delusions and hallucinations by examining the evidence for beliefs, exploring alternative explanations, and reducing the distress associated with psychotic experiences — rather than attempting to eliminate them through argument or confrontation." },
        { q: "Can antipsychotic medications be prescribed via telehealth?", a: "Yes. Antipsychotic medications are not controlled substances and can be prescribed and managed by licensed psychiatric providers via telehealth in California. Our providers specialize in psychotic disorders and have experience with the full range of first and second-generation antipsychotics, including long-acting injectables (coordinated with local administration)." },
        { q: "How does family involvement work in virtual care?", a: "Family members or caregivers can be included in sessions with the client's consent. We also offer separate family psychoeducation sessions that provide education about schizophrenia, strategies for reducing expressed emotion (a key relapse risk factor), and support for family members managing the caregiving role." },
      ]}
    />
  );
}
