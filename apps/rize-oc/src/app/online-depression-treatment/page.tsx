import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online Depression Treatment in California | Rize OC",
  description: "Virtual depression treatment via telehealth — CBT, EMDR, medication management, PHP, IOP, and outpatient programs available online across California. Insurance accepted.",
  alternates: { canonical: "/online-depression-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-depression-treatment", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual Mental Health Care"
      headline="Online Depression Treatment in California"
      subhead="Receive the same evidence-based depression treatment — CBT, EMDR, medication management, and more — from the privacy and comfort of your home. Rize OC's virtual programs are available across all of California with same-day intake."
      conditionName="Depression"
      overviewTitle="Effective Depression Treatment, Delivered Virtually"
      overviewBody={[
        "Major depressive disorder is one of the most common and most treatable mental health conditions in the United States — yet millions of people never receive adequate care due to access barriers, stigma, or geographic limitations. Virtual depression treatment removes those barriers entirely.",
        "Research consistently shows that evidence-based therapy for depression is equally effective when delivered via telehealth. At Rize OC, our online depression program includes individual therapy (CBT, DBT, EMDR for trauma-related depression), psychiatric medication management, group therapy, and psychoeducation — all delivered via a secure, HIPAA-compliant video platform.",
        "Whether you're managing major depressive disorder, treatment-resistant depression, or depression co-occurring with anxiety or trauma, our clinical team conducts a thorough assessment and builds an individualized treatment plan matched to your specific presentation.",
      ]}
      whatWeProvide={[
        { icon: "ri-brain-line", title: "Individual Therapy", desc: "CBT, DBT, and EMDR sessions with a dedicated licensed therapist via secure video." },
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "Psychiatric evaluation and ongoing medication oversight with a licensed prescriber." },
        { icon: "ri-group-line", title: "Group Therapy", desc: "Structured online group sessions covering depression skills, processing, and peer support." },
        { icon: "ri-file-list-3-line", title: "Psychoeducation", desc: "Evidence-based education on the neurobiology of depression, coping strategies, and relapse prevention." },
      ]}
      howItWorks={[
        { step: "01", title: "Free Consultation", desc: "Call or submit an inquiry. Our team will speak with you within hours — same day whenever possible." },
        { step: "02", title: "Clinical Assessment", desc: "A licensed clinician conducts a comprehensive intake assessment to evaluate your depression and any co-occurring conditions." },
        { step: "03", title: "Insurance Verified", desc: "Our team verifies your benefits, confirms coverage for your program level, and handles all paperwork." },
        { step: "04", title: "Treatment Begins", desc: "You receive a personalized schedule and begin your virtual depression treatment program — often within 24–48 hours." },
      ]}
      faqs={[
        { q: "Is online therapy as effective as in-person for depression?", a: "Yes. Multiple peer-reviewed studies have demonstrated that cognitive behavioral therapy (CBT) and other evidence-based therapies are equally effective when delivered via telehealth for major depressive disorder. The therapeutic relationship and clinical skill of the provider are what drive outcomes — not the delivery format." },
        { q: "What insurance plans cover online depression treatment?", a: "Most major PPO plans — including Anthem, Cigna, Aetna, United Healthcare, and Blue Cross Blue Shield — cover virtual mental health treatment at the same level as in-person care under federal mental health parity law. Our team verifies your specific benefits at no charge." },
        { q: "What level of care do I need for depression treatment online?", a: "This depends on your symptom severity and clinical history. Mild to moderate depression may be appropriate for standard outpatient therapy (1–2 sessions per week). Moderate to severe depression often benefits from IOP (9–15 hours per week) or PHP (25–30 hours per week). Our assessment team will recommend the right level for you." },
        { q: "Can I get medication for depression online?", a: "Yes. Our virtual program includes licensed psychiatric providers who can evaluate, prescribe, and manage antidepressant medications. Medication management is integrated into our PHP and IOP programs and available as a standalone service for outpatient clients." },
      ]}
    />
  );
}
