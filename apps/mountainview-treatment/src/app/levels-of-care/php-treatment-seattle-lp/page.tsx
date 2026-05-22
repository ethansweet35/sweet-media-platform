import type { Metadata } from "next";
import LpPage from "@/views/lp/LpPage";
import LpFeatureImage from "@/components/lp/LpFeatureImage";

const FEATURE_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/mvt_php_lp_feature01.jpg";

export const metadata: Metadata = {
  title: "PHP Treatment Seattle | Partial Hospitalization Program | Mountain View Treatment",
  description:
    "Partial Hospitalization Program (PHP) in Seattle — 25–30 hours/week of intensive addiction and mental health treatment. A structured step-down from inpatient care. Insurance accepted.",
  robots: { index: false, follow: false },
};

const FAQS = [
  {
    q: "What is a Partial Hospitalization Program (PHP)?",
    a: "PHP provides 25–30 hours of structured clinical programming per week — typically 5–6 hours a day, 5 days a week. It bridges the gap between inpatient/residential care and standard outpatient treatment, offering intensive support while you return home each evening.",
  },
  {
    q: "Who is PHP appropriate for?",
    a: "PHP is best suited for individuals stepping down from inpatient or residential care, those who need near-daily clinical oversight but have a safe and stable home environment, and those whose condition requires more support than IOP can provide.",
  },
  {
    q: "Does PHP at Mountain View Treatment include medication management?",
    a: "Yes. Our PHP includes psychiatric evaluation, medication management, and medication-assisted treatment (MAT) where clinically indicated. Our psychiatric team monitors and adjusts prescriptions throughout your time in the program.",
  },
  {
    q: "Can I transition from PHP to IOP?",
    a: "Absolutely — this is a very common and clinically recommended path. As you stabilize and progress, our clinical team will recommend transitioning to IOP (9–12 hours/week) and eventually to standard outpatient. We support the full continuum of care.",
  },
  {
    q: "Does insurance cover PHP in Seattle?",
    a: "Most major PPO plans cover PHP at Mountain View Treatment, including Cigna, Aetna, United Health, Anthem, Regence, and Premera. Our admissions team verifies your specific benefits at no charge before treatment begins.",
  },
];

export default function Page() {
  return (
    <LpPage
      eyebrow="Partial Hospitalization · Seattle"
      headline="PHP Treatment in Seattle"
      subheadline="25–30 hours per week of intensive, structured care — the highest level of outpatient treatment available. Designed for those who need near-daily clinical support while living at home."
      stat="25–30"
      statLabel="Hours / Week"
      faqs={FAQS}
      overview={{
        eyebrow: "Understanding PHP",
        headline: "What Is a Partial Hospitalization Program?",
        paragraphs: [
          "Partial Hospitalization (PHP) is the most intensive level of outpatient care available — providing roughly 25–30 hours of structured programming per week across 5 days. Mountain View Treatment's Seattle PHP serves clients throughout the greater Seattle metro area, offering a rigorous clinical experience while allowing you to return home each evening.",
          "PHP is appropriate as a direct step-down from inpatient or residential care, or as an entry point for those whose clinical presentation requires near-daily support. Programming includes individual therapy, group therapy, psychiatric medication management, psychoeducation, and evidence-based interventions such as DBT, EMDR, and trauma-focused CBT.",
        ],
        listHeading: "What PHP Includes",
        listItems: [
          "25–30 hours of structured programming per week",
          "Individual therapy sessions with a licensed clinician",
          "Daily therapeutic groups and psychoeducation",
          "Psychiatric evaluation and medication management",
          "Trauma-focused modalities including EMDR and somatic therapies",
          "Dual diagnosis treatment for co-occurring conditions",
          "Family therapy and support coordination",
          "Individualized aftercare and step-down planning",
        ],
        callout:
          "PHP provides the clinical intensity of residential care without requiring you to leave home. It is ideal for those who have completed inpatient treatment and are ready to begin reintegrating — but still need a high level of daily support.",
      }}
    >
      <LpFeatureImage
        eyebrow="Individualized PHP Care"
        headline="Intensive Daily Support With a Dedicated Clinical Team"
        body={[
          "In Mountain View's PHP, each client works with a dedicated treatment team — a primary therapist, psychiatrist, and case manager — who coordinate care daily and adjust the treatment plan in real time as you progress.",
          "Sessions run Monday through Friday in a structured, therapeutic environment designed to replicate the clinical intensity of residential care while allowing you to return to the comfort and support of home each evening.",
        ]}
        bullets={[
          "Dedicated primary therapist and psychiatrist",
          "Daily individual and group therapy sessions",
          "On-site psychiatric evaluation and medication management",
          "EMDR, somatic experiencing, and trauma-focused CBT",
          "Family therapy sessions and education",
          "Structured step-down planning to IOP",
        ]}
        ctaLabel="Call Now — (253)-252-5875"
        imageSrc={FEATURE_IMG}
        imageAlt="PHP clinician working one-on-one with a patient in a calm Seattle treatment office"
        layout="image-left"
      />
    </LpPage>
  );
}
