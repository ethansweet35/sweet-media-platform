import type { Metadata } from "next";
import LpPage from "@/views/lp/LpPage";
import LpFeatureImage from "@/components/lp/LpFeatureImage";

const FEATURE_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/mvt_iop_lp_feature01.jpg";

export const metadata: Metadata = {
  title: "IOP Treatment Seattle | Intensive Outpatient Program | Mountain View Treatment",
  description:
    "Intensive Outpatient Program (IOP) in Seattle — 9–12 hours per week of structured addiction and mental health treatment. Morning, afternoon, and evening tracks. Insurance accepted.",
  robots: { index: false, follow: false },
};

const FAQS = [
  {
    q: "How many hours per week is IOP at Mountain View Treatment?",
    a: "Our IOP requires 9–12 hours of structured programming per week, typically 3 hours per day, 3–4 days per week. We offer morning, afternoon, and evening tracks to fit around work and school schedules.",
  },
  {
    q: "Can I work full-time while attending IOP in Seattle?",
    a: "Yes — IOP is specifically designed for people who need intensive clinical support while maintaining employment, school enrollment, or family responsibilities. Our evening IOP track (typically 5–8 PM) is built for working professionals.",
  },
  {
    q: "What is the difference between IOP and PHP?",
    a: "Partial Hospitalization (PHP) involves 25–30 hours per week — about 5–6 hours daily. IOP is 9–12 hours per week. IOP is appropriate for those with moderate severity or as a step-down from PHP, while PHP is for those who need near-daily clinical oversight.",
  },
  {
    q: "Does insurance cover IOP in Seattle?",
    a: "Most major PPO insurance plans cover IOP at Mountain View Treatment, including Cigna, Aetna, United Health, Anthem, Regence, and Premera. Our admissions team verifies your benefits before you begin — at no cost to you.",
  },
  {
    q: "Does IOP include individual therapy?",
    a: "Yes. Our IOP includes 1–2 individual therapy sessions per week alongside group therapy, psychoeducation, and skills training. You will work one-on-one with a licensed therapist to address personal issues and build a customized recovery plan.",
  },
];

export default function Page() {
  return (
    <LpPage
      eyebrow="Intensive Outpatient · Seattle"
      headline="IOP Treatment in Seattle"
      subheadline="Structured, clinical recovery 3–4 days per week — morning, afternoon, or evening tracks available. Get the intensive support you need without putting your career or family on hold."
      stat="9–12"
      statLabel="Hours / Week"
      faqs={FAQS}
      overview={{
        eyebrow: "Understanding IOP",
        headline: "What Is an Intensive Outpatient Program?",
        paragraphs: [
          "An Intensive Outpatient Program (IOP) delivers structured clinical treatment — group therapy, individual sessions, psychiatric care, and skills training — across 9–12 hours per week. Mountain View Treatment's Seattle IOP serves the greater Seattle area including Bellevue, Kirkland, Redmond, Renton, Tacoma, and surrounding Pacific Northwest communities.",
          "IOP is designed for individuals who have a stable living environment and moderate treatment needs, including those stepping down from PHP or inpatient care and those entering treatment for the first time. Our program integrates evidence-based therapies including CBT, DBT, motivational interviewing, trauma-informed care, and medication-assisted treatment where appropriate.",
        ],
        listHeading: "Who Benefits from IOP",
        listItems: [
          "Working professionals who cannot attend full-day programming",
          "Parents and caregivers with daily family responsibilities",
          "Individuals stepping down from PHP or residential treatment",
          "College students managing addiction or mental health challenges",
          "Those with moderate substance use or mental health severity",
          "People with strong home support systems seeking flexible care",
        ],
        callout:
          "IOP is one of the most effective models for long-term recovery — it builds the skills and accountability needed for lasting sobriety while keeping you connected to real life.",
      }}
    >
      <LpFeatureImage
        eyebrow="Group Therapy at IOP"
        headline="Peer Support That Accelerates Recovery"
        body={[
          "Small-group therapy is at the heart of Mountain View's IOP. Groups of 6–10 clients meet 3–5 times per week, guided by a licensed clinician, to build insight, accountability, and genuine peer connection.",
          "Topics rotate through relapse prevention, emotion regulation, communication skills, and trauma-informed processing — so each session delivers practical tools you can use the same day.",
        ]}
        bullets={[
          "Groups capped at 6–10 clients for real connection",
          "CBT, DBT, and motivational interviewing modalities",
          "Morning, afternoon, and evening scheduling tracks",
          "1–2 individual therapy sessions per week",
          "Medication-assisted treatment (MAT) available",
          "Family therapy and aftercare planning included",
        ]}
        ctaLabel="Call Now — (253)-252-5875"
        imageSrc={FEATURE_IMG}
        imageAlt="Small IOP group therapy session with Pacific Northwest forest views in Seattle"
        layout="image-right"
      />
    </LpPage>
  );
}
