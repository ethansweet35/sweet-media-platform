import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Adult Mental Health Treatment in Orange County | Rize OC",
  description: "Specialized adult mental health treatment in Orange County — residential, PHP, and IOP programs for depression, anxiety, bipolar, PTSD, and more. Insurance accepted.",
  alternates: { canonical: "/adult-mental-health" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/adult-mental-health", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Adult Mental Health Programs"
      headline="Adult Mental Health Treatment in Orange County"
      subhead="Rize OC provides comprehensive mental health treatment designed specifically for adults — across the full continuum of care, from residential to outpatient, with evidence-based therapies and psychiatric oversight at every level."
      overviewTitle="Specialized Mental Health Treatment for Adults"
      overviewBody={[
        "Adult mental health treatment addresses the full range of psychiatric conditions affecting adults — from mood disorders and anxiety to personality disorders, psychotic disorders, and trauma. The clinical needs of adults differ from adolescents and require programs designed with adult life contexts in mind: careers, relationships, parenting responsibilities, and the weight of long-term symptom burden.",
        "Rize OC's adult mental health programs span the full continuum of care — residential, inpatient, PHP (Partial Hospitalization), IOP (Intensive Outpatient), and standard outpatient. Our multidisciplinary clinical team includes psychiatrists, licensed therapists, and clinical support staff who specialize in adult mental health across all presentations.",
        "Every adult client receives an individualized treatment plan built from a thorough clinical assessment — not a generic program template. We address the biological, psychological, and social dimensions of mental health and recovery, with particular attention to the life circumstances and relational factors that are unique to adult presentations.",
      ]}
      features={[
        { icon: "ri-hospital-line", title: "Full Continuum of Care", desc: "Residential, inpatient, PHP, IOP, and outpatient — all adult-focused programs under one clinical team." },
        { icon: "ri-stethoscope-line", title: "Psychiatric Services", desc: "Board-certified psychiatrists providing evaluation, diagnosis, and ongoing medication management." },
        { icon: "ri-brain-line", title: "Evidence-Based Therapy", desc: "CBT, DBT, EMDR, ACT, and trauma-focused modalities — selected based on your specific diagnosis and presentation." },
        { icon: "ri-group-line", title: "Adult Peer Groups", desc: "Group therapy with other adults — shared experience, peer accountability, and community in recovery." },
        { icon: "ri-family-line", title: "Family Therapy", desc: "Adults don't recover in isolation. Family therapy and communication support are integrated throughout treatment." },
        { icon: "ri-wifi-line", title: "Virtual Options", desc: "PHP and IOP programs are available via telehealth for adults across California." },
      ]}
      steps={[
        { step: "01", title: "Adult Assessment", desc: "A comprehensive psychiatric and psychosocial assessment designed for adult presentations — history, current symptoms, and life context." },
        { step: "02", title: "Level of Care Match", desc: "We recommend the clinically appropriate level of care — from residential through outpatient — based on symptom severity and safety." },
        { step: "03", title: "Insurance Verified", desc: "We verify your mental health benefits and prior authorization requirements — completely free and before any commitment." },
        { step: "04", title: "Treatment Begins", desc: "Your individualized adult mental health program begins with a full clinical team — therapist, psychiatrist, and support staff." },
      ]}
      whyRize={[
        { icon: "ri-user-heart-line", title: "Adult-Focused Programming", desc: "Our groups, therapy modalities, and clinical approach are designed for adults — not adapted from programs built for other populations." },
        { icon: "ri-medal-2-line", title: "Specialist Clinical Team", desc: "Psychiatrists and therapists who specialize in adult mental health — with experience in complex, treatment-resistant presentations." },
        { icon: "ri-road-map-line", title: "Long-Term Recovery Planning", desc: "We plan for life beyond treatment from day one — career, relationships, and sustained mental health maintenance." },
      ]}
      faqs={[
        { q: "What mental health conditions do you treat in your adult program?", a: "Our adult mental health programs treat depression (including treatment-resistant depression), anxiety disorders, bipolar disorder, PTSD and complex trauma, borderline personality disorder, OCD, schizophrenia and schizoaffective disorder, ADHD, and co-occurring mental health and substance use disorders." },
        { q: "What's the difference between PHP and IOP for adults?", a: "PHP (Partial Hospitalization Program) provides 5–6 hours of structured daily treatment, 5–7 days per week — appropriate for moderate to severe mental health symptoms requiring intensive daily support without 24/7 inpatient care. IOP provides 9–15 hours per week and is better suited for moderate symptoms or those stepping down from PHP." },
        { q: "Is mental health treatment covered by insurance for adults?", a: "Yes. Most major PPO plans cover adult mental health treatment — residential, PHP, IOP, and outpatient — under mental health parity law. Our team verifies your specific benefits before you begin and handles all prior authorization." },
        { q: "How long does adult mental health treatment take?", a: "Duration depends on diagnosis, severity, and level of care. Residential programs typically run 30–60 days. PHP programs run 4–6 weeks. IOP programs typically run 8–12 weeks. Outpatient maintenance therapy can continue indefinitely. Our clinical team provides regular level-of-care reviews and adjusts duration based on your progress." },
      ]}
    />
  );
}
