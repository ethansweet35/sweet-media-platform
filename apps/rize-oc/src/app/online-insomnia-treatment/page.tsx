import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online Insomnia Treatment in California | Rize OC",
  description: "Virtual insomnia treatment via telehealth — CBT-I, sleep therapy, and medication management available online across California. Insurance accepted. Same-day intake.",
  alternates: { canonical: "/online-insomnia-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-insomnia-treatment", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual Sleep & Insomnia Care"
      headline="Online Insomnia Treatment in California"
      subhead="CBT-I (Cognitive Behavioral Therapy for Insomnia) — the most effective insomnia treatment available — delivered via secure telehealth across all of California. No sleep lab required. Insurance accepted."
      conditionName="Insomnia"
      overviewTitle="The Most Effective Insomnia Treatment, Now Available Online"
      overviewBody={[
        "Chronic insomnia affects approximately 30% of the adult population and has significant downstream effects on mental health, physical health, occupational functioning, and quality of life. Despite its prevalence, most people with insomnia never receive an evidence-based treatment — relying instead on sleep medications that address symptoms without resolving the underlying disorder.",
        "Cognitive Behavioral Therapy for Insomnia (CBT-I) is the gold-standard treatment for chronic insomnia disorder — consistently outperforming sleep medications in clinical trials, with effects that are more durable and without the dependency risks associated with pharmacological approaches. CBT-I is highly effective via telehealth, making specialist sleep treatment accessible from anywhere in California.",
        "Our virtual insomnia program also addresses the co-occurring mental health conditions that frequently drive or worsen insomnia — including anxiety, depression, PTSD, and ADHD. Treating insomnia in isolation without addressing these conditions produces limited and short-lived results.",
      ]}
      whatWeProvide={[
        { icon: "ri-moon-line", title: "CBT-I", desc: "Gold-standard Cognitive Behavioral Therapy for Insomnia — sleep restriction, stimulus control, and cognitive restructuring." },
        { icon: "ri-mental-health-line", title: "Sleep Hygiene Coaching", desc: "Evidence-based sleep environment and behavioral recommendations tailored to your specific sleep pattern." },
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "Evaluation and management of sleep medications when clinically appropriate, with a focus on tapering dependency." },
        { icon: "ri-heart-pulse-line", title: "Co-occurring Disorder Treatment", desc: "Integrated treatment for anxiety, depression, or PTSD that co-occurs with and drives insomnia symptoms." },
      ]}
      howItWorks={[
        { step: "01", title: "Sleep History Intake", desc: "Speak with our team about your insomnia history, sleep patterns, current medications, and any co-occurring conditions." },
        { step: "02", title: "Sleep Assessment", desc: "A clinician trained in sleep medicine conducts a comprehensive evaluation, including sleep diary review and CBT-I candidacy assessment." },
        { step: "03", title: "Insurance Verified", desc: "We verify your mental health benefits for virtual care — at no cost and before you make any commitment." },
        { step: "04", title: "CBT-I Program Begins", desc: "Your structured CBT-I program begins — typically 6–8 sessions — with improvements often noticeable within the first 2–3 weeks." },
      ]}
      faqs={[
        { q: "What is CBT-I and how does it work?", a: "CBT-I is a structured 6–8 session program that addresses the thoughts, behaviors, and environmental factors maintaining chronic insomnia. Core components include sleep restriction (temporarily reducing time in bed to rebuild sleep drive), stimulus control (reassociating the bed with sleep rather than wakefulness), cognitive restructuring (addressing unhelpful beliefs about sleep), and relaxation techniques. It produces durable results that persist long after treatment ends." },
        { q: "Is CBT-I better than sleeping pills?", a: "Clinical guidelines from the American Academy of Sleep Medicine recommend CBT-I as the first-line treatment for chronic insomnia — ahead of pharmacological intervention. CBT-I produces more durable results and avoids the dependency, tolerance, and cognitive side effects associated with sleep medications. For people currently using sleep medications, CBT-I can support a supervised taper." },
        { q: "Can insomnia be treated without medication?", a: "Yes — CBT-I is specifically designed as a non-pharmacological treatment for insomnia and has been shown to be more effective than medications in head-to-head trials, with benefits that are maintained at 12-month follow-up." },
        { q: "Does insurance cover online insomnia treatment?", a: "CBT-I delivered by a licensed mental health provider is covered by most major PPO plans under mental health parity. Our team verifies your specific benefits before you begin." },
      ]}
    />
  );
}
