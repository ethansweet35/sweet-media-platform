import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Mental Health & Addiction Treatment for Working Professionals | Rize OC",
  description: "Confidential mental health and addiction treatment designed for executives and working professionals in Orange County. Flexible scheduling, FMLA support, and full insurance coverage.",
  alternates: { canonical: "/working-professionals" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/working-professionals", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Executive & Professional Programs"
      headline="Mental Health & Addiction Treatment for Working Professionals"
      subhead="Rize OC provides confidential, flexible treatment designed around the demands of professional life. Our executive programs protect your career, your privacy, and your recovery — simultaneously."
      overviewTitle="Treatment That Works Around Your Career"
      overviewBody={[
        "High-achieving professionals face unique challenges in accessing mental health and addiction treatment. The demands of leadership, the stigma associated with vulnerability, concerns about career consequences, and the practical difficulty of stepping away from professional responsibilities all create barriers that standard treatment models don't adequately address.",
        "Rize OC's professional program is built for executives, business owners, attorneys, physicians, and other high-functioning individuals who need treatment that is confidential, clinically rigorous, and compatible with their professional obligations. We offer flexible scheduling — including evening IOP programs — and full FMLA support for those who need to take protected medical leave.",
        "Our clinical approach addresses the specific drivers of mental health and addiction in professional contexts: high-functioning stress, performance pressure, identity fusion with work, and the executive persona that can make it difficult to seek help. We understand the world you operate in.",
      ]}
      features={[
        { icon: "ri-lock-line", title: "Complete Confidentiality", desc: "Your treatment is protected by HIPAA. We never contact your employer without your written consent." },
        { icon: "ri-calendar-line", title: "Flexible Scheduling", desc: "Evening and weekend IOP programs designed for those who cannot step away during business hours." },
        { icon: "ri-briefcase-line", title: "FMLA Support", desc: "Our team handles all FMLA paperwork and medical documentation for protected medical leave." },
        { icon: "ri-shield-user-line", title: "Executive-Level Privacy", desc: "Private rooms, discreet facility, and personalized intake process designed for professionals." },
        { icon: "ri-wifi-line", title: "Virtual Options Available", desc: "Attend PHP or IOP via telehealth — from your home or office — with equivalent clinical rigor." },
        { icon: "ri-award-line", title: "Continuing Education Credits", desc: "Support navigating professional licensing boards and continuing education requirements during treatment." },
      ]}
      steps={[
        { step: "01", title: "Confidential Call", desc: "Speak privately with our professional program coordinator — your call is confidential and will never be disclosed." },
        { step: "02", title: "Discreet Assessment", desc: "A clinical assessment is completed privately, with options for evening or weekend scheduling." },
        { step: "03", title: "FMLA & Insurance", desc: "Our team handles all FMLA documentation, insurance verification, and benefits coordination." },
        { step: "04", title: "Treatment Begins", desc: "You begin a personalized program that fits your professional schedule — in person, virtual, or a hybrid." },
      ]}
      whyRize={[
        { icon: "ri-eye-off-line", title: "Zero Employer Disclosure", desc: "HIPAA law prohibits us from disclosing your treatment to your employer. Your confidentiality is absolute." },
        { icon: "ri-stethoscope-line", title: "Clinical Rigor", desc: "Evidence-based treatment at every level — our clinical outcomes are the same for every client regardless of their professional status." },
        { icon: "ri-building-line", title: "Professional Network", desc: "Our team has experience navigating the specific systems — licensing boards, EAPs, FMLA — that affect working professionals." },
      ]}
      faqs={[
        { q: "Will my employer find out about my treatment?", a: "No. Your treatment is protected by HIPAA federal law. We cannot and will not disclose your participation in treatment to your employer, colleagues, or anyone else without your written authorization. The only exception is if you sign an authorization for us to communicate with specific parties — for example, to provide FMLA documentation to HR." },
        { q: "Can I keep working while in treatment?", a: "Depending on your level of care, yes. Outpatient programs (standard outpatient and IOP) are typically compatible with continued employment. Our evening IOP program is specifically designed for professionals who continue working. PHP programs require a more significant time commitment and typically necessitate either FMLA leave or flexible work arrangements." },
        { q: "What is FMLA and does it apply to addiction or mental health treatment?", a: "The Family and Medical Leave Act (FMLA) entitles eligible employees to up to 12 weeks of unpaid, job-protected leave per year for a serious health condition — which includes substance use disorders and mental health conditions requiring inpatient, residential, or intensive outpatient treatment. Our team prepares all necessary FMLA documentation." },
        { q: "Are virtual professional programs available?", a: "Yes. Our virtual PHP and IOP programs allow professionals to attend treatment via secure telehealth from a private location — their home, a private office, or anywhere with a reliable internet connection. The clinical programming is identical to our in-person programs." },
      ]}
      ctaLabel="Speak Confidentially With Our Team"
    />
  );
}
