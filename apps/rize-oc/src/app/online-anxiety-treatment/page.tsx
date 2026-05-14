import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online Anxiety Treatment in California | Rize OC",
  description: "Virtual anxiety treatment via telehealth — CBT, exposure therapy, medication management, and PHP/IOP programs available online across California. Insurance accepted.",
  alternates: { canonical: "/online-anxiety-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-anxiety-treatment", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual Mental Health Care"
      headline="Online Anxiety Treatment in California"
      subhead="Evidence-based anxiety treatment — CBT, exposure therapy, medication management — delivered via secure telehealth from anywhere in California. Rize OC offers virtual PHP, IOP, and outpatient programs with same-day intake."
      conditionName="Anxiety"
      overviewTitle="Treating Anxiety Effectively Through Telehealth"
      overviewBody={[
        "Anxiety disorders affect more than 40 million adults in the United States, making them the most common mental health condition in the country. Despite being highly treatable, many people never receive adequate care. Virtual anxiety treatment removes the most common barriers — geographic, logistical, and financial.",
        "Cognitive Behavioral Therapy (CBT) and Exposure and Response Prevention (ERP) — the gold-standard treatments for anxiety disorders including GAD, panic disorder, social anxiety, and OCD — are clinically validated to be equally effective via telehealth. Our virtual anxiety program delivers these modalities through a secure, HIPAA-compliant platform.",
        "Our clinical team specializes in all presentations of anxiety — from generalized worry and panic attacks to social phobia, health anxiety, and OCD. Each client receives a thorough assessment and a personalized treatment plan targeting their specific anxiety profile.",
      ]}
      whatWeProvide={[
        { icon: "ri-brain-line", title: "CBT & Exposure Therapy", desc: "Gold-standard cognitive behavioral therapy and graduated exposure protocols delivered via secure video." },
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "Psychiatric evaluation and management of anti-anxiety and SSRI/SNRI medications by a licensed prescriber." },
        { icon: "ri-mental-health-line", title: "Mindfulness-Based Therapy", desc: "MBSR and somatic approaches to regulate the nervous system and reduce physiological anxiety symptoms." },
        { icon: "ri-group-line", title: "Group Skills Training", desc: "Virtual group sessions covering anxiety management skills, coping strategies, and peer connection." },
      ]}
      howItWorks={[
        { step: "01", title: "Free Consultation", desc: "Call or submit an inquiry. Our admissions team will connect with you the same day to discuss your anxiety and treatment goals." },
        { step: "02", title: "Clinical Assessment", desc: "A licensed clinician completes a comprehensive intake to identify your anxiety disorder type and any co-occurring conditions." },
        { step: "03", title: "Benefits Verified", desc: "Our team verifies your insurance benefits and confirms virtual mental health coverage — no out-of-pocket surprises." },
        { step: "04", title: "Treatment Begins", desc: "You receive your personalized virtual schedule and begin evidence-based anxiety treatment — often within 24 hours." },
      ]}
      faqs={[
        { q: "Can anxiety be effectively treated online?", a: "Yes. CBT for anxiety disorders has been extensively studied in telehealth delivery and shows equivalent outcomes to in-person treatment. Exposure therapy — the most effective treatment for phobias, panic disorder, and OCD — can be delivered effectively via video, often with some advantages (like conducting exposures in the client's actual environment)." },
        { q: "What anxiety disorders do you treat virtually?", a: "We treat all presentations of anxiety via telehealth, including generalized anxiety disorder (GAD), panic disorder with or without agoraphobia, social anxiety disorder, OCD, health anxiety, specific phobias, and anxiety co-occurring with depression or PTSD." },
        { q: "Does insurance cover online anxiety treatment?", a: "Most major PPO plans cover virtual anxiety treatment under federal mental health parity law. Our team verifies your specific benefits at no charge before you commit to any program." },
        { q: "What's the difference between PHP, IOP, and outpatient for anxiety?", a: "PHP (Partial Hospitalization) provides 5–6 hours of daily treatment and is suited for severe anxiety requiring intensive daily support. IOP (Intensive Outpatient) provides 9–15 hours per week and works for moderate anxiety or as a step-down from PHP. Standard outpatient (1–2 sessions weekly) is appropriate for mild to moderate anxiety or long-term maintenance." },
      ]}
    />
  );
}
