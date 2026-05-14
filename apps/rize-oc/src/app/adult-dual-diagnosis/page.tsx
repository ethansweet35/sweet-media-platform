import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Adult Dual Diagnosis Treatment Centers | Rize OC",
  description: "Specialized adult dual diagnosis treatment in Orange County — integrated care for co-occurring mental health and addiction. Residential, PHP, and IOP programs. Insurance accepted.",
  alternates: { canonical: "/adult-dual-diagnosis" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/adult-dual-diagnosis", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Adult Co-Occurring Disorders"
      headline="Adult Dual Diagnosis Treatment Centers"
      subhead="Rize OC provides specialized dual diagnosis treatment for adults — integrating mental health and addiction care within a unified clinical program. Residential, PHP, and IOP levels of care with full insurance coverage."
      overviewTitle="Adult Dual Diagnosis: Why Integration Is Essential"
      overviewBody={[
        "Dual diagnosis — the simultaneous presence of a mental health disorder and a substance use disorder — is the norm rather than the exception among adults seeking addiction treatment. Studies consistently show that over 50% of adults with a substance use disorder have at least one co-occurring mental health condition. Treating only the addiction without addressing the mental health component leads to predictable relapse.",
        "Adult dual diagnosis treatment requires clinical expertise in both domains simultaneously — not sequential treatment, and not parallel treatment in separate programs. Rize OC's adult dual diagnosis program was designed from the start to integrate psychiatric care, addiction medicine, and evidence-based therapy into a single unified treatment plan for each client.",
        "Our adult program addresses the most common co-occurring presentations in adults: depression and alcohol use disorder, anxiety and benzodiazepine dependence, PTSD and opioid use disorder, ADHD and stimulant use, and bipolar disorder with polysubstance use. We also treat less common but complex presentations, including personality disorders with co-occurring addiction.",
      ]}
      features={[
        { icon: "ri-brain-line", title: "Psychiatric Integration", desc: "Psychiatrists managing mental health treatment are co-equal partners in addiction treatment — one unified plan." },
        { icon: "ri-heart-pulse-line", title: "Medical Detox", desc: "Supervised medical detox for alcohol, opioids, and benzodiazepines — managed by our physician team for safety." },
        { icon: "ri-medicine-bottle-line", title: "MAT Integration", desc: "Medication-assisted treatment for opioid and alcohol use disorder, integrated with psychiatric medication management." },
        { icon: "ri-group-line", title: "Dual Diagnosis Groups", desc: "Specialized adult group therapy addressing the interaction between mental health symptoms and substance use — not generic groups." },
        { icon: "ri-hospital-line", title: "Residential to Outpatient", desc: "Full continuum — residential, PHP, IOP, and outpatient — with coordinated transitions between levels." },
        { icon: "ri-family-line", title: "Family Involvement", desc: "Adult family therapy and education addressing the systemic impact of dual diagnosis on relationships and family functioning." },
      ]}
      steps={[
        { step: "01", title: "Dual Assessment", desc: "A comprehensive ASAM and psychiatric assessment addresses both your substance use and mental health history in one integrated evaluation." },
        { step: "02", title: "Integrated Plan", desc: "A unified treatment plan is developed — with psychiatry and addiction medicine informing each other from the start." },
        { step: "03", title: "Insurance Verified", desc: "We verify your benefits for both mental health and substance use treatment — often covered together under a single authorization." },
        { step: "04", title: "Treatment Begins", desc: "Your individualized dual diagnosis program begins — treating both conditions simultaneously, not sequentially." },
      ]}
      whyRize={[
        { icon: "ri-focus-3-line", title: "True Integration", desc: "Our psychiatrists and addiction medicine physicians collaborate directly — not in separate silos treating separate conditions." },
        { icon: "ri-shield-star-line", title: "Complex Case Expertise", desc: "We have experience with complex, treatment-resistant dual diagnosis presentations that have not responded to other programs." },
        { icon: "ri-road-map-line", title: "Aftercare Built-In", desc: "Discharge planning and long-term recovery support are built into every dual diagnosis treatment plan from day one." },
      ]}
      faqs={[
        { q: "What are the most common adult dual diagnosis combinations you treat?", a: "The most common adult dual diagnosis presentations we treat are: major depression + alcohol use disorder, generalized anxiety + benzodiazepine dependence, PTSD + opioid use disorder, ADHD + stimulant or cannabis use disorder, and bipolar disorder + alcohol or polysubstance use. We also treat BPD + alcohol use, schizophrenia + cannabis use, and OCD + alcohol use as a coping mechanism." },
        { q: "Does insurance cover adult dual diagnosis treatment?", a: "Yes. Most major PPO plans cover adult dual diagnosis treatment under mental health and substance use parity provisions. Coverage applies to residential, PHP, IOP, and outpatient levels of care. Our team verifies your specific benefits — including both mental health and substance use benefits — at no cost before you begin." },
        { q: "Is dual diagnosis treatment longer than standard addiction treatment?", a: "Typically yes — because treatment must address both conditions adequately. Residential dual diagnosis programs often run 45–90 days, compared to 28–30 days for single-diagnosis addiction programs. The additional length is associated with substantially better long-term outcomes and significantly lower relapse rates." },
        { q: "Can dual diagnosis be treated on an outpatient basis?", a: "For mild to moderate presentations, yes. IOP and outpatient programs can effectively treat dual diagnosis when symptoms are stable enough to allow daily functioning at home. More severe presentations — particularly those involving active psychosis, suicidality, or high-risk substance use — require residential or inpatient care for initial stabilization." },
      ]}
    />
  );
}
