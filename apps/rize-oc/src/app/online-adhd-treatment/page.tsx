import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online ADHD Treatment in California | Rize OC",
  description: "Virtual ADHD treatment via telehealth — diagnosis, medication management, behavioral therapy, and coaching available online across California. Insurance accepted.",
  alternates: { canonical: "/online-adhd-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-adhd-treatment", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual ADHD Specialist Care"
      headline="Online ADHD Treatment in California"
      subhead="Comprehensive ADHD treatment via telehealth — diagnosis, medication management, and evidence-based behavioral therapy available from anywhere in California. Same-day assessments available."
      conditionName="ADHD"
      overviewTitle="Comprehensive ADHD Care Through Telehealth"
      overviewBody={[
        "Attention-deficit/hyperactivity disorder (ADHD) affects approximately 10% of children and 4–5% of adults — and a significant proportion remain undiagnosed or inadequately treated throughout adulthood. Virtual ADHD treatment makes comprehensive, specialist-level care accessible from anywhere in California.",
        "Effective ADHD treatment combines accurate diagnosis, medication management, and evidence-based behavioral interventions. Our virtual ADHD program includes comprehensive clinical assessment, stimulant and non-stimulant medication management, cognitive behavioral therapy adapted for ADHD (CBT-A), and practical executive function coaching — all delivered via a secure telehealth platform.",
        "We treat ADHD across all presentations — inattentive, hyperactive-impulsive, and combined type — and across the full adult age spectrum. We also address the common co-occurring conditions that accompany ADHD: anxiety, depression, sleep disorders, and substance use.",
      ]}
      whatWeProvide={[
        { icon: "ri-file-search-line", title: "ADHD Assessment", desc: "Comprehensive clinical evaluation including validated rating scales, clinical interview, and history review." },
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "Stimulant and non-stimulant medication prescribing and ongoing management by a specialist prescriber." },
        { icon: "ri-brain-line", title: "CBT for ADHD", desc: "Cognitive behavioral therapy adapted for ADHD — targeting executive function, organization, and emotional regulation." },
        { icon: "ri-lightbulb-line", title: "Executive Function Coaching", desc: "Practical strategies for time management, task completion, planning, and productivity skills." },
      ]}
      howItWorks={[
        { step: "01", title: "Initial Consultation", desc: "Speak with our team about your ADHD history, current challenges, and treatment goals — same day when possible." },
        { step: "02", title: "ADHD Assessment", desc: "A licensed provider completes a comprehensive evaluation including rating scales, clinical interview, and review of prior records." },
        { step: "03", title: "Insurance Verified", desc: "We verify your mental health and prescription benefits for virtual care — completely free and before any commitment." },
        { step: "04", title: "Treatment Plan Begins", desc: "You receive a personalized plan combining medication management and behavioral support — often starting within 48 hours." },
      ]}
      faqs={[
        { q: "Can ADHD be diagnosed online?", a: "Yes. ADHD diagnosis can be completed via telehealth using validated assessment tools (Conners' Adult ADHD Rating Scales, CAARS), comprehensive clinical interview, developmental history, and review of any prior records. Our providers are experienced in adult ADHD evaluation via telehealth." },
        { q: "Can stimulant medications be prescribed via telehealth in California?", a: "Yes — California allows licensed prescribers to prescribe controlled substances (including stimulants like Adderall and Ritalin) via telehealth, subject to applicable prescribing regulations. Our providers comply with all state and federal telehealth prescribing requirements." },
        { q: "What's the most effective treatment for adult ADHD?", a: "Research supports a combined approach: stimulant medication (first-line for most adults) combined with CBT adapted for ADHD. Medication alone improves core symptoms but doesn't address the skill deficits and compensatory habits that ADHD creates over a lifetime. CBT addresses organization, time blindness, emotional dysregulation, and procrastination." },
        { q: "Does insurance cover virtual ADHD treatment?", a: "Most major PPO plans cover virtual ADHD assessment and treatment under mental health parity law. Our team verifies your specific benefits, including psychiatric evaluation and therapy coverage, before you begin." },
      ]}
    />
  );
}
