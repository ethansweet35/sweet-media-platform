import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Adult Addiction Intensive Outpatient Program | Rize OC",
  description: "Adult addiction IOP in Orange County — structured intensive outpatient treatment for alcohol, opioids, stimulants, and more. Evidence-based, insurance accepted, flexible scheduling.",
  alternates: { canonical: "/adult-addiction" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/adult-addiction", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Adult Addiction IOP"
      headline="Adult Addiction Intensive Outpatient Program"
      subhead="Rize OC's adult addiction IOP delivers structured, evidence-based treatment — 3 to 5 days per week — for alcohol, opioids, stimulants, and co-occurring disorders. In-person in Orange County or virtual across California."
      overviewTitle="Intensive Outpatient Treatment Designed for Adult Recovery"
      overviewBody={[
        "An Intensive Outpatient Program (IOP) for addiction provides the structure and clinical intensity of higher levels of care — without requiring you to step away from your life entirely. Adults with substance use disorders who do not need medical detox or 24/7 residential support, or who are stepping down from a residential or PHP program, are well-suited for IOP.",
        "Rize OC's adult addiction IOP is built around the reality of adult life — careers, families, financial obligations, and the complex social environments where recovery must be maintained. Our program provides 9–15 hours per week of structured treatment, while evenings and weekends remain yours.",
        "Our adult IOP integrates individual therapy, group therapy, relapse prevention, MAT support, and co-occurring mental health treatment — all under one clinical team. We do not treat addiction in isolation from the mental health conditions and life stressors that drive and maintain it.",
      ]}
      features={[
        { icon: "ri-calendar-check-line", title: "9–15 Hours Per Week", desc: "3 to 5 days per week, with morning and evening track options designed around adult schedules." },
        { icon: "ri-user-voice-line", title: "Individual Therapy", desc: "Regular one-on-one sessions with a licensed addiction therapist — motivational interviewing, CBT, and relapse prevention." },
        { icon: "ri-group-line", title: "Adult Recovery Groups", desc: "Structured group therapy with adult peers — recovery skills, relapse prevention, and peer accountability." },
        { icon: "ri-medicine-bottle-line", title: "MAT Support", desc: "Medication-assisted treatment for opioid and alcohol use disorder — integrated with therapy, not separate from it." },
        { icon: "ri-brain-line", title: "Co-occurring Treatment", desc: "Mental health symptoms treated alongside addiction — no waiting list, no referral required." },
        { icon: "ri-wifi-line", title: "Virtual Option", desc: "Attend via secure telehealth from anywhere in California — same clinical programming as in-person." },
      ]}
      steps={[
        { step: "01", title: "Addiction Assessment", desc: "Our team conducts an ASAM-based assessment to confirm IOP as the right level of care and identify any co-occurring conditions." },
        { step: "02", title: "Personalized Plan", desc: "A treatment plan is built around your specific substances, triggers, co-occurring conditions, and recovery goals." },
        { step: "03", title: "Insurance Verified", desc: "We verify your substance use IOP benefits and MAT coverage — at no cost before you commit." },
        { step: "04", title: "IOP Begins", desc: "You begin your adult addiction IOP — in the morning or evening track, in-person or virtual — within 24–48 hours." },
      ]}
      whyRize={[
        { icon: "ri-time-line", title: "Evening & Morning Tracks", desc: "Schedule your IOP around your work and family obligations — not the other way around." },
        { icon: "ri-focus-3-line", title: "Addiction + Mental Health", desc: "Co-occurring disorders treated as part of your IOP — not deferred to a separate provider or program." },
        { icon: "ri-shield-check-line", title: "Evidence-Based Protocols", desc: "Motivational Interviewing, CBT for substance use, contingency management, and relapse prevention — not 12-step only." },
      ]}
      faqs={[
        { q: "What substances does your adult addiction IOP treat?", a: "Our adult IOP treats alcohol use disorder, opioid use disorder (with MAT integration), stimulant use disorder (cocaine, meth, prescription stimulants), cannabis use disorder, benzodiazepine use disorder (non-detox phase), and polysubstance use. Active benzodiazepine or alcohol withdrawal requires medical detox before IOP admission." },
        { q: "Can I work full-time while in IOP?", a: "Yes — this is one of the primary advantages of IOP. Our evening track runs from approximately 5:00–8:00 PM on weekdays, allowing full-time employment during the day. Morning tracks are also available for those with flexible schedules or who are on medical leave." },
        { q: "What is MAT and is it available in your adult IOP?", a: "Medication-Assisted Treatment (MAT) uses FDA-approved medications — buprenorphine/naloxone (Suboxone), naltrexone (Vivitrol), or acamprosate — to reduce cravings and withdrawal symptoms in opioid and alcohol use disorder. MAT is available and integrated into our adult IOP, with prescribing and monitoring by our clinical team." },
        { q: "Does insurance cover adult addiction IOP?", a: "Yes. Most major PPO plans cover adult addiction IOP under substance use parity law. Coverage typically includes the group and individual therapy components, with MAT medications covered under your pharmacy benefit. Our team verifies your specific benefits at no cost before you begin." },
      ]}
    />
  );
}
