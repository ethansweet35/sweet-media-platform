import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online PTSD Treatment in California | Virtual Trauma Therapy | Rize OC",
  description: "Virtual PTSD and trauma treatment via telehealth — EMDR, trauma-focused CBT, and structured PHP/IOP programs available online across California. Insurance accepted.",
  alternates: { canonical: "/ptsd-treatment-online" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/ptsd-treatment-online", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual Trauma & PTSD Care"
      headline="Online PTSD & Trauma Treatment in California"
      subhead="EMDR, trauma-focused CBT, and somatic therapy delivered via secure telehealth — from anywhere in California. Our trauma specialists provide intensive virtual PHP, IOP, and outpatient programs with same-day intake available."
      conditionName="PTSD"
      overviewTitle="Trauma Treatment That Meets You Where You Are"
      overviewBody={[
        "Post-traumatic stress disorder affects the way the brain processes memory and threat — keeping the nervous system in a state of chronic hyperarousal long after the traumatic event has passed. Accessing trauma treatment can feel overwhelming, especially when leaving home triggers anxiety or when in-person options are geographically inaccessible. Virtual PTSD treatment removes these barriers.",
        "EMDR (Eye Movement Desensitization and Reprocessing) — the most extensively researched trauma therapy available — has been validated for telehealth delivery with outcomes equivalent to in-person treatment. Our virtual trauma program also incorporates trauma-focused CBT (TF-CBT), somatic awareness techniques, and phase-based trauma processing in a structured, safe therapeutic environment.",
        "We treat all presentations of trauma — acute PTSD, complex PTSD (C-PTSD), childhood trauma, combat trauma, sexual assault trauma, and trauma co-occurring with depression, anxiety, or substance use. Our clinical team includes specialists in trauma neurobiology and trauma-informed care.",
      ]}
      whatWeProvide={[
        { icon: "ri-eye-line", title: "EMDR Therapy", desc: "Online EMDR delivered by certified therapists — clinically validated for telehealth with equivalent outcomes." },
        { icon: "ri-brain-line", title: "Trauma-Focused CBT", desc: "Structured cognitive processing of traumatic memories and trauma-related beliefs." },
        { icon: "ri-body-scan-line", title: "Somatic Therapy", desc: "Body-based approaches to regulate the nervous system and address the physiological impact of trauma." },
        { icon: "ri-group-line", title: "Trauma-Informed Groups", desc: "Virtual group therapy with trauma-informed facilitators — structured for safety and therapeutic growth." },
      ]}
      howItWorks={[
        { step: "01", title: "Safe First Contact", desc: "Reach out by phone or form. Our trauma-informed admissions team prioritizes comfort and confidentiality from the first call." },
        { step: "02", title: "Trauma Assessment", desc: "A trauma specialist conducts a comprehensive assessment — history, symptom severity, safety, and clinical needs — via secure video." },
        { step: "03", title: "Insurance Verified", desc: "We confirm your virtual mental health benefits and coverage level — at no cost and with no obligation." },
        { step: "04", title: "Phased Treatment Begins", desc: "You begin your individualized virtual trauma program — starting with stabilization and progressing through processing at your own pace." },
      ]}
      faqs={[
        { q: "Is EMDR effective when done via telehealth?", a: "Yes. Multiple clinical trials have found that EMDR delivered via telehealth produces outcomes equivalent to in-person EMDR for PTSD. Clients often report that conducting sessions from their own environment — a familiar, safe space — enhances rather than reduces the effectiveness of the treatment." },
        { q: "Is it safe to do trauma therapy online?", a: "With a skilled, trauma-trained therapist and appropriate pacing, virtual trauma therapy is safe and effective. Our trauma program begins with a stabilization phase — building coping and grounding skills — before moving to processing work. Safety is assessed continuously throughout treatment." },
        { q: "What's the difference between PTSD and complex PTSD?", a: "Standard PTSD typically follows a discrete traumatic event. Complex PTSD (C-PTSD) develops from prolonged, repeated trauma — such as childhood abuse, domestic violence, or captivity — and includes additional symptoms like chronic shame, identity disruption, and relational difficulties. Our virtual program treats both presentations effectively." },
        { q: "Does insurance cover online PTSD treatment?", a: "Yes. Virtual PTSD and trauma treatment is covered by most major PPO plans under mental health parity law. Our admissions team verifies your specific benefits before you begin and handles all prior authorization paperwork." },
      ]}
    />
  );
}
