import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Dual Diagnosis Treatment Center in Orange County | Rize OC",
  description: "Expert co-occurring disorder treatment at Rize OC in Orange County. Integrated residential and intensive outpatient care for mental health and addiction. Insurance accepted.",
  alternates: { canonical: "/dual-diagnosis" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/dual-diagnosis", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Co-Occurring Disorders"
      headline="Dual Diagnosis Treatment in Orange County"
      subhead="More than 50% of people with addiction have a co-occurring mental health condition — and treating only one side of this equation leads to relapse. Rize OC's integrated dual diagnosis program addresses both simultaneously."
      overviewTitle="What Is Dual Diagnosis & Why Does Integrated Treatment Matter?"
      overviewBody={[
        "Dual diagnosis refers to the simultaneous presence of a mental health disorder and a substance use disorder. This is more common than most people realize — research consistently shows that more than half of all individuals with a substance use disorder have at least one co-occurring mental health condition, and vice versa.",
        "The relationship between mental health and substance use is bidirectional and mutually reinforcing. Substances are often used to self-medicate the symptoms of untreated mental health conditions — anxiety, depression, PTSD, ADHD. Over time, substance use worsens the mental health condition, which in turn drives greater substance use. This cycle cannot be broken by treating only one component.",
        "Rize OC's integrated dual diagnosis program was built from the ground up to treat both conditions simultaneously within a unified clinical team. We do not have separate programs that treat addiction first and mental health second — every treatment plan addresses the full clinical picture from day one.",
      ]}
      features={[
        { icon: "ri-brain-line", title: "Integrated Clinical Team", desc: "Addiction specialists and mental health clinicians working together under one unified treatment plan." },
        { icon: "ri-medicine-bottle-line", title: "Psychiatric Care", desc: "Comprehensive psychiatric evaluation, diagnosis, and medication management for all co-occurring mental health conditions." },
        { icon: "ri-heart-pulse-line", title: "Medical Detox", desc: "Supervised medical detox when required — managed by our physician team for safety and comfort." },
        { icon: "ri-group-line", title: "Dual Diagnosis Groups", desc: "Specialized group therapy addressing the intersection of mental health and addiction — not just one or the other." },
        { icon: "ri-road-map-line", title: "Full Continuum of Care", desc: "Residential, PHP, IOP, and outpatient programs — we match level of care to clinical severity." },
        { icon: "ri-family-line", title: "Family Therapy", desc: "Family involvement throughout treatment — education, therapy, and communication repair." },
      ]}
      steps={[
        { step: "01", title: "Dual Diagnosis Assessment", desc: "Our clinical team conducts a comprehensive assessment of both your mental health and substance use history and severity." },
        { step: "02", title: "Integrated Treatment Plan", desc: "A unified treatment plan is developed that addresses both your mental health condition and substance use disorder simultaneously." },
        { step: "03", title: "Insurance Verified", desc: "We verify your benefits for both mental health and substance use treatment — often covered under a single combined plan." },
        { step: "04", title: "Integrated Treatment Begins", desc: "You begin your personalized dual diagnosis program — with your mental health and addiction treated together, not sequentially." },
      ]}
      whyRize={[
        { icon: "ri-focus-3-line", title: "Built-In Integration", desc: "Most programs treat mental health and addiction separately. Rize OC's model integrates them from assessment through discharge." },
        { icon: "ri-medal-2-line", title: "Specialist Clinical Team", desc: "Board-certified addiction psychiatrists and licensed mental health therapists under one roof — treating the full picture." },
        { icon: "ri-shield-star-line", title: "Evidence-Based Modalities", desc: "CBT, DBT, EMDR, motivational interviewing, and medication-assisted treatment — applied to both sides of dual diagnosis." },
      ]}
      faqs={[
        { q: "Which mental health conditions most commonly co-occur with addiction?", a: "The most prevalent co-occurring combinations include: major depression with alcohol use disorder, anxiety disorders with benzodiazepine or cannabis use, PTSD with opioid or stimulant use, ADHD with stimulant or cannabis use, and bipolar disorder with alcohol or drug use. All of these are treated at Rize OC with integrated protocols." },
        { q: "Does insurance cover dual diagnosis treatment?", a: "Yes. Most major PPO insurance plans cover dual diagnosis treatment — including residential, PHP, and IOP levels of care — under mental health and substance use parity provisions. Our team verifies your specific benefits and handles all prior authorization." },
        { q: "What comes first — treating the mental health or the addiction?", a: "Neither comes first, because the evidence supports simultaneous integrated treatment. Sequential approaches — treating addiction first, mental health second — produce worse outcomes because the untreated mental health condition typically drives relapse. Our integrated model addresses both from day one." },
        { q: "Can dual diagnosis be treated on an outpatient basis?", a: "Yes, for mild to moderate dual diagnosis presentations. More severe presentations — particularly those involving active psychosis, severe depression with suicidality, or high-risk substance use — typically require a residential or inpatient level of care for safe stabilization. Our assessment team determines the clinically appropriate level of care for your specific presentation." },
      ]}
    />
  );
}
