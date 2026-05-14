import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online OCD Treatment in California | Rize OC",
  description: "Virtual OCD treatment via telehealth — ERP, CBT, medication management, and structured IOP programs available online across California. Insurance accepted.",
  alternates: { canonical: "/online-ocd-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-ocd-treatment", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual OCD Specialist Care"
      headline="Online OCD Treatment in California"
      subhead="Exposure and Response Prevention (ERP) — the gold standard for OCD — delivered via secure telehealth by specialist clinicians. Virtual PHP, IOP, and outpatient programs available across California with same-day intake."
      conditionName="OCD"
      overviewTitle="Specialist OCD Treatment, Accessible From Home"
      overviewBody={[
        "Obsessive-compulsive disorder is one of the most misunderstood and underserved mental health conditions — and finding a specialist trained in Exposure and Response Prevention (ERP) can be difficult, particularly outside major metropolitan areas. Virtual OCD treatment solves this access problem, connecting clients across California with specialist-level care from home.",
        "ERP is the gold-standard behavioral treatment for OCD, with decades of evidence demonstrating its superiority over other therapeutic modalities. Crucially, ERP is particularly well-suited for telehealth delivery — conducting exposures in the client's actual environment (home, workplace, community) can make treatment more relevant and generalizable than clinic-based work.",
        "Our virtual OCD program combines ERP with Acceptance and Commitment Therapy (ACT) for OCD, inference-based CBT (I-CBT), and — when indicated — psychiatric medication management with SRIs (the first-line pharmacological treatment for OCD). All delivered by clinicians with specific training and experience in OCD treatment.",
      ]}
      whatWeProvide={[
        { icon: "ri-shield-cross-line", title: "ERP Therapy", desc: "Specialist-delivered Exposure and Response Prevention — the most effective treatment for OCD — via secure telehealth." },
        { icon: "ri-brain-line", title: "ACT for OCD", desc: "Acceptance and Commitment Therapy to reduce OCD's impact by changing your relationship with intrusive thoughts." },
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "SRI (SSRI/SNRI/clomipramine) prescribing and management by a psychiatrist experienced in OCD pharmacology." },
        { icon: "ri-group-line", title: "OCD Support Groups", desc: "Virtual peer support groups with others managing OCD — facilitated by trained clinicians." },
      ]}
      howItWorks={[
        { step: "01", title: "Specialist Consultation", desc: "Speak with our OCD-specialized admissions team about your specific presentation, symptom subtypes, and treatment goals." },
        { step: "02", title: "OCD Assessment", desc: "A specialist completes a Y-BOCS assessment and clinical interview to characterize your OCD and create a treatment hierarchy." },
        { step: "03", title: "Insurance Verified", desc: "We verify your mental health benefits and virtual care coverage — completely free and with no obligation." },
        { step: "04", title: "ERP Begins", desc: "Your ERP hierarchy is developed collaboratively and treatment begins — paced appropriately for your current functioning." },
      ]}
      faqs={[
        { q: "Can ERP be done effectively online?", a: "Yes — and in some ways, virtual ERP has advantages over clinic-based delivery. Conducting exposures in the actual environment where OCD symptoms are triggered (your home, workplace, or community) makes the treatment more ecologically valid and the results more generalizable. Multiple studies support the effectiveness of online ERP for OCD." },
        { q: "What OCD subtypes do you treat virtually?", a: "We treat all OCD subtypes including contamination OCD, harm OCD, sexual/relationship OCD (SO-OCD, ROCD), religious/scrupulosity OCD, symmetry and ordering OCD, and Pure O presentations. Our therapists complete a thorough assessment to identify your specific themes and tailor the ERP hierarchy accordingly." },
        { q: "How is OCD different from anxiety?", a: "While OCD is classified alongside anxiety disorders and shares the feature of distress, its core mechanism is distinct: intrusive, unwanted thoughts (obsessions) drive repetitive mental or physical behaviors (compulsions) that temporarily reduce distress but ultimately maintain the cycle. ERP specifically targets this mechanism, while general anxiety treatments often don't." },
        { q: "What medications are used for OCD?", a: "Serotonin reuptake inhibitors (SRIs) — particularly fluoxetine, fluvoxamine, sertraline, and clomipramine — are the first-line medications for OCD and are often used alongside ERP. Higher doses than those used for depression are typically required. Our psychiatric providers specialize in OCD pharmacology." },
      ]}
    />
  );
}
