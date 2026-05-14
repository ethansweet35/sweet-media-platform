import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Mental Health Leave of Absence Treatment | FMLA Support | Rize OC",
  description: "Rize OC supports patients taking medical leave for mental health or addiction treatment. FMLA documentation, insurance coordination, and returning-to-work planning included.",
  alternates: { canonical: "/leave-of-absence" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/leave-of-absence", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Medical Leave & FMLA Support"
      headline="Mental Health Treatment During a Leave of Absence"
      subhead="Taking a medical leave of absence for mental health or addiction treatment is a protected right — and Rize OC makes the process simple. We handle all FMLA documentation, insurance coordination, and return-to-work planning so you can focus entirely on recovery."
      overviewTitle="Using Your Medical Leave to Get Real Help"
      overviewBody={[
        "The Family and Medical Leave Act (FMLA) entitles eligible employees to up to 12 weeks of unpaid, job-protected leave per year for a serious health condition — including mental health conditions and substance use disorders that require inpatient, residential, or intensive outpatient treatment. Taking this leave is a protected right, not a career risk.",
        "Many people who could benefit from residential or intensive treatment never pursue it because they fear losing their job. In reality, FMLA provides meaningful protection — your employer cannot terminate your position, reduce your seniority, or take adverse action based on protected medical leave. Our team is experienced in navigating this process and will handle all documentation.",
        "A medical leave of absence creates a rare and valuable window for intensive treatment — removing the daily stressors of work while preserving your employment. Rize OC's residential, PHP, and IOP programs are designed to make the most of this time, delivering intensive, evidence-based treatment in a structured environment that produces meaningful, lasting change.",
      ]}
      features={[
        { icon: "ri-file-list-3-line", title: "Complete FMLA Paperwork", desc: "Our clinical team prepares all required FMLA documentation — WH-380 and supporting certifications — at no additional cost." },
        { icon: "ri-shield-check-line", title: "Job Protection Guidance", desc: "We provide clear information about your FMLA rights and how to protect your employment throughout treatment." },
        { icon: "ri-hospital-line", title: "All Levels of Care", desc: "Residential, inpatient, PHP, and IOP programs — matched to your clinical need and leave timeline." },
        { icon: "ri-money-dollar-circle-line", title: "Insurance Coordination", desc: "We verify your short-term disability and health insurance benefits and handle all prior authorization." },
        { icon: "ri-route-line", title: "Return-to-Work Planning", desc: "Structured discharge planning and return-to-work support, including ongoing IOP or outpatient after leave ends." },
        { icon: "ri-lock-line", title: "Employer Confidentiality", desc: "HIPAA protects all clinical information. Your employer only receives the minimum required FMLA certification, not clinical details." },
      ]}
      steps={[
        { step: "01", title: "Confidential Consultation", desc: "Call us and speak privately with our admissions team about your situation, clinical needs, and leave timeline." },
        { step: "02", title: "Clinical Assessment", desc: "A comprehensive assessment determines the right level of care — residential, PHP, or IOP — and projected treatment duration." },
        { step: "03", title: "FMLA & Insurance", desc: "Our team prepares all FMLA paperwork, coordinates with HR on your behalf, and verifies all insurance benefits." },
        { step: "04", title: "Treatment & Return Planning", desc: "You engage fully in treatment, and we build a return-to-work plan ensuring continuity of care when your leave ends." },
      ]}
      whyRize={[
        { icon: "ri-file-shield-2-line", title: "FMLA Expertise", desc: "We handle FMLA paperwork routinely and understand how to document treatment in ways that satisfy employer and insurer requirements." },
        { icon: "ri-focus-3-line", title: "Intensive Treatment", desc: "A leave of absence is best used for intensive, immersive treatment — our residential and PHP programs deliver this." },
        { icon: "ri-route-line", title: "Continuity of Care", desc: "We plan your return to work before discharge — ensuring you step down to IOP or outpatient when your leave ends." },
      ]}
      faqs={[
        { q: "Am I eligible for FMLA leave for mental health treatment?", a: "FMLA applies to employees who have worked for a covered employer (50+ employees) for at least 12 months and at least 1,250 hours in the past year. Mental health conditions and substance use disorders that require ongoing treatment qualify as serious health conditions under FMLA. California's CFRA provides additional protections for employees who don't meet all federal FMLA requirements." },
        { q: "What does FMLA actually protect?", a: "FMLA entitles you to up to 12 weeks of unpaid, job-protected leave per year. Your employer must maintain your group health benefits during leave and restore you to your same or equivalent position when you return. Employers cannot retaliate against you for taking FMLA leave — interfering with FMLA rights is a federal violation." },
        { q: "Does my employer find out why I'm on leave?", a: "Your employer receives only the minimum necessary information — typically the FMLA certification form (WH-380) completed by our medical provider, which indicates that you have a serious health condition requiring treatment. Your employer does not receive your diagnosis, treatment details, or any other clinical information." },
        { q: "Can I use short-term disability during a mental health leave?", a: "In many cases, yes. Short-term disability insurance typically covers mental health and substance use treatment under the same terms as physical health conditions. Our team verifies your specific STD benefits and coordinates with your carrier to maximize coverage during your leave." },
      ]}
      ctaLabel="Speak With Our FMLA Specialist"
    />
  );
}
