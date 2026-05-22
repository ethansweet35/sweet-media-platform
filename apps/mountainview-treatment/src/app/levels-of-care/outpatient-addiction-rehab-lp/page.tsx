import type { Metadata } from "next";
import LpPage from "@/views/lp/LpPage";
import LpFeatureImage from "@/components/lp/LpFeatureImage";

const FEATURE_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/mvt_addiction_lp_feature01.jpg";

export const metadata: Metadata = {
  title: "Outpatient Addiction Rehab Seattle | Mountain View Treatment",
  description:
    "Outpatient addiction rehab in Seattle — flexible programs for alcohol, opioids, stimulants, and co-occurring conditions. Keep working while you recover. Insurance accepted.",
  robots: { index: false, follow: false },
};

const FAQS = [
  {
    q: "What addictions does Mountain View Treatment's outpatient rehab treat?",
    a: "Our outpatient addiction rehab programs treat alcohol use disorder, opioid use disorder, stimulant use disorder (meth, cocaine), benzodiazepine dependence, marijuana use disorder, prescription drug addiction, and polysubstance use disorders. We also treat co-occurring mental health conditions alongside addiction.",
  },
  {
    q: "Do I need to take time off work to attend outpatient addiction rehab?",
    a: "No. Our outpatient programs are specifically designed to accommodate work and school schedules. IOP offers evening tracks, and our standard outpatient appointments can typically be scheduled around your work hours.",
  },
  {
    q: "Is medication-assisted treatment (MAT) available in outpatient rehab?",
    a: "Yes. We offer comprehensive MAT including Suboxone and Buprenorphine for opioid use disorder, Naltrexone and Vivitrol for alcohol and opioid dependence, and other evidence-based pharmacological interventions. Our psychiatric team manages all medications as part of your overall treatment plan.",
  },
  {
    q: "What is the difference between outpatient rehab and inpatient rehab?",
    a: "Inpatient (residential) rehab involves living at the treatment facility for 28–90 days. Outpatient rehab allows you to live at home while attending structured sessions several times per week. Outpatient is appropriate when a person has a stable living environment and does not require 24-hour medical supervision.",
  },
  {
    q: "How long does outpatient addiction rehab take?",
    a: "Program length varies based on individual clinical needs. PHP typically lasts 4–8 weeks, IOP 6–12 weeks, and standard outpatient can continue as long as clinically necessary. Your treatment team continuously monitors progress and adjusts the timeline to support lasting recovery.",
  },
];

export default function Page() {
  return (
    <LpPage
      eyebrow="Addiction Rehab · Seattle"
      headline="Outpatient Addiction Rehab in Seattle"
      subheadline="Flexible, evidence-based addiction rehabilitation for alcohol, opioids, stimulants, and co-occurring disorders — designed to work around your schedule. Multiple levels of care available."
      stat="Same Day"
      statLabel="Intake Available"
      faqs={FAQS}
      overview={{
        eyebrow: "Understanding Outpatient Addiction Treatment",
        headline: "What Is Outpatient Addiction Rehab?",
        paragraphs: [
          "Outpatient addiction rehabilitation delivers structured, clinical treatment for substance use disorders without requiring residential admission. At Mountain View Treatment in Seattle, our outpatient rehab programs span three levels of intensity — PHP (25–30 hrs/week), IOP (9–12 hrs/week), and standard outpatient — allowing us to match the level of care to the severity of each client's addiction and clinical needs.",
          "Our addiction rehab programs integrate medication-assisted treatment (MAT), individual therapy, group therapy, family programming, psychiatric care, and evidence-based modalities including CBT, DBT, motivational interviewing, and trauma-focused therapy. We treat addiction alongside co-occurring mental health conditions for a fully integrated approach to recovery.",
        ],
        listHeading: "Substances We Treat",
        listItems: [
          "Alcohol use disorder — from problem drinking to severe dependence",
          "Opioid use disorder — heroin, fentanyl, prescription opioids",
          "Stimulant addiction — methamphetamine, cocaine, prescription stimulants",
          "Benzodiazepine dependence — Xanax, Klonopin, Valium",
          "Prescription drug addiction — opioids, sedatives, stimulants",
          "Marijuana use disorder — including high-potency THC products",
          "Polysubstance use — multiple concurrent substance dependencies",
          "Co-occurring addiction and mental health disorders",
        ],
        callout:
          "Addiction is a chronic, treatable medical condition — not a moral failing. Evidence-based outpatient rehab gives you the tools, clinical support, and structure to achieve lasting recovery without stepping away from your life.",
      }}
    >
      <LpFeatureImage
        eyebrow="Compassionate Addiction Care"
        headline="One-on-One Counseling at the Core of Your Recovery"
        body={[
          "Every client in Mountain View's outpatient addiction program is paired with a dedicated addiction counselor who provides consistent individual therapy throughout treatment — building trust, processing underlying trauma, and developing a personalized relapse prevention plan.",
          "Our addiction counselors are licensed and certified in evidence-based modalities including CBT, motivational interviewing, and trauma-informed care, with specialized training in co-occurring mental health conditions.",
        ]}
        bullets={[
          "Dedicated addiction counselor for the full course of treatment",
          "Medication-assisted treatment (MAT) — Suboxone, Vivitrol, Naltrexone",
          "Trauma-informed therapy for underlying causes",
          "Relapse prevention planning and skills training",
          "Peer support and alumni programming",
          "Family education and relationship repair",
        ]}
        ctaLabel="Call Now — (253)-252-5875"
        imageSrc={FEATURE_IMG}
        imageAlt="Addiction counselor in a compassionate one-on-one session with a patient in Seattle"
        layout="image-right"
      />
    </LpPage>
  );
}
