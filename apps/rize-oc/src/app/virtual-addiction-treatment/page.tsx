import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Virtual Addiction Treatment in California | Rize OC",
  description: "Online IOP and outpatient addiction treatment via telehealth across California. MAT support, individual therapy, group sessions, and insurance coverage. Same-day intake.",
  alternates: { canonical: "/virtual-addiction-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/virtual-addiction-treatment", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Virtual Addiction Treatment"
      headline="Virtual Addiction Treatment in California"
      subhead="Evidence-based addiction treatment delivered via secure telehealth — IOP and outpatient programs for alcohol, opioids, stimulants, and more. Available across California with same-day intake and full insurance coverage."
      overviewTitle="Effective Addiction Recovery, Delivered Virtually"
      overviewBody={[
        "Virtual addiction treatment has expanded significantly in recent years — and the clinical evidence supports its effectiveness for individuals who do not require medical detox or residential-level stabilization. For those with mild to moderate substance use disorders, or those stepping down from a higher level of care, telehealth-delivered IOP and outpatient programs produce outcomes comparable to in-person treatment.",
        "Rize OC's virtual addiction program includes individual therapy (motivational interviewing, CBT for substance use, contingency management), group therapy covering relapse prevention and recovery skills, medication-assisted treatment (MAT) support and monitoring, and co-occurring mental health treatment — all delivered via a secure, HIPAA-compliant platform.",
        "Virtual addiction treatment is not appropriate for everyone. Individuals who require medical detox, who are at high relapse risk without 24/7 structure, or who have severe co-occurring psychiatric conditions may need in-person residential care first. Our assessment team will help determine the right level of care for your specific situation.",
      ]}
      features={[
        { icon: "ri-video-chat-line", title: "Fully Virtual IOP", desc: "Structured virtual IOP — 9 to 15 hours per week — for alcohol, opioid, stimulant, and polysubstance use disorders." },
        { icon: "ri-medicine-bottle-line", title: "MAT Support", desc: "Medication-assisted treatment monitoring and coordination for buprenorphine, naltrexone, and other MAT medications." },
        { icon: "ri-brain-line", title: "Evidence-Based Therapy", desc: "Motivational Interviewing, CBT for substance use, DBT, and relapse prevention skills delivered by licensed clinicians." },
        { icon: "ri-group-line", title: "Recovery Groups", desc: "Virtual group sessions covering relapse prevention, coping skills, and long-term recovery — with peer community." },
        { icon: "ri-heart-pulse-line", title: "Dual Diagnosis Support", desc: "Integrated mental health treatment for co-occurring conditions that drive substance use — not treated separately." },
        { icon: "ri-family-line", title: "Family Involvement", desc: "Optional family therapy and psychoeducation sessions — supporting the recovery ecosystem around each client." },
      ]}
      steps={[
        { step: "01", title: "Initial Consultation", desc: "Speak with our admissions team about your substance use history, current situation, and recovery goals — same day when possible." },
        { step: "02", title: "Addiction Assessment", desc: "A licensed clinician conducts an ASAM-based assessment to determine the appropriate level of care and identify co-occurring conditions." },
        { step: "03", title: "Insurance Verified", desc: "We verify your substance use treatment benefits for virtual care — most major PPO plans provide coverage." },
        { step: "04", title: "Virtual Program Begins", desc: "You begin your individualized virtual addiction treatment program — typically within 24 to 48 hours of assessment." },
      ]}
      whyRize={[
        { icon: "ri-award-line", title: "ASAM-Guided Placement", desc: "We use ASAM criteria to ensure you're placed at the clinically appropriate level of care — virtual or in-person." },
        { icon: "ri-focus-3-line", title: "Dual Diagnosis Integration", desc: "Co-occurring mental health conditions are treated alongside addiction — not deferred to a separate program or provider." },
        { icon: "ri-shield-check-line", title: "Continued Care Planning", desc: "Recovery planning begins at intake — we build your aftercare plan from day one, not at discharge." },
      ]}
      faqs={[
        { q: "Is virtual addiction treatment as effective as in-person?", a: "For individuals with mild to moderate substance use disorders who do not require medical detox or 24/7 structure, research supports virtual IOP and outpatient as producing comparable outcomes to in-person programs. The key factors are clinical suitability (ASAM level of care placement), engagement, and motivation — not the delivery format." },
        { q: "Can I get MAT (medication-assisted treatment) virtually?", a: "Yes. Buprenorphine (Suboxone) can be initiated and managed via telehealth in California under current prescribing regulations. Naltrexone (Vivitrol) can also be managed virtually, with injections coordinated at local clinical sites. Our virtual prescribers are experienced in MAT and can initiate treatment rapidly." },
        { q: "What substances does virtual addiction treatment cover?", a: "Our virtual program treats alcohol use disorder, opioid use disorder (with MAT support), stimulant use disorder (cocaine, meth, prescription stimulants), cannabis use disorder, and polysubstance use. We do not offer virtual benzodiazepine or alcohol detox — medical detox for these substances requires in-person care." },
        { q: "Does insurance cover virtual addiction treatment?", a: "Yes. Most major PPO plans cover virtual addiction treatment under substance use and mental health parity provisions. Coverage typically includes IOP, outpatient sessions, and MAT medications (subject to formulary). Our team verifies your specific benefits before you begin." },
      ]}
    />
  );
}
