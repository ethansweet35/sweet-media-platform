import type { Metadata } from "next";
import LpPage from "@/views/lp/LpPage";
import LpFeatureImage from "@/components/lp/LpFeatureImage";

const FEATURE_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/mvt_mh_lp_feature01.jpg";

export const metadata: Metadata = {
  title: "Outpatient Mental Health Treatment Seattle | Mountain View Treatment",
  description:
    "Flexible outpatient mental health treatment in Seattle — anxiety, depression, trauma, PTSD, bipolar disorder, and dual diagnosis. Evidence-based care that fits your life. Insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpPage
      eyebrow="Mental Health Treatment · Seattle"
      headline="Outpatient Mental Health Treatment in Seattle"
      subheadline="Comprehensive, evidence-based outpatient care for anxiety, depression, trauma, PTSD, and dual diagnosis — designed to fit around work, family, and your daily life in the greater Seattle area."
      stat="Same Day"
      statLabel="Assessments Available"
      overview={{
        eyebrow: "Understanding Outpatient Mental Health Care",
        headline: "What Is Outpatient Mental Health Treatment?",
        paragraphs: [
          "Outpatient mental health treatment provides structured, clinical care without requiring you to step away from your daily life. At Mountain View Treatment, our Seattle-based programs offer individual therapy, group sessions, psychiatric medication management, and evidence-based modalities — including CBT, DBT, EMDR, and somatic therapies — across multiple levels of intensity.",
          "Whether you are managing anxiety, depression, trauma, PTSD, bipolar disorder, or a co-occurring substance use disorder, our outpatient model allows you to receive professional mental health care while continuing to work, parent, attend school, and maintain your relationships.",
        ],
        listHeading: "Conditions We Treat",
        listItems: [
          "Generalized anxiety disorder (GAD) and panic disorder",
          "Major depression and persistent depressive disorder",
          "PTSD, complex trauma, and acute stress responses",
          "Bipolar I and bipolar II disorder",
          "Borderline personality disorder (BPD)",
          "Schizoaffective disorder and psychotic conditions",
          "Dual diagnosis — co-occurring addiction and mental health",
          "Grief, life transitions, and adjustment disorders",
        ],
        callout:
          "Mental health conditions are among the most treatable medical issues — especially when caught early and treated consistently. Our outpatient program makes expert psychiatric and therapeutic care accessible without disrupting your life.",
      }}
    >
      <LpFeatureImage
        eyebrow="Our Clinical Approach"
        headline="Evidence-Based Therapy in a Calming Pacific Northwest Setting"
        body={[
          "Mountain View Treatment's outpatient mental health program pairs the most clinically validated therapies — CBT, DBT, EMDR, and somatic experiencing — with the naturally restorative environment of the Pacific Northwest.",
          "Each client works one-on-one with a licensed therapist and participates in small-group sessions designed to build practical coping skills, process underlying trauma, and create sustainable patterns of mental wellness.",
        ]}
        bullets={[
          "Individual therapy sessions with a licensed clinician",
          "Small group therapy — 6–10 clients per group",
          "Psychiatric care and medication management on-site",
          "EMDR for trauma and PTSD",
          "Somatic experiencing and mindfulness-based practices",
          "Family therapy and relationship support",
        ]}
        ctaLabel={`Call Now — (253)-252-5875`}
        imageSrc={FEATURE_IMG}
        imageAlt="Therapist and client in a calming outpatient mental health session with views of Seattle evergreens"
        layout="image-left"
      />
    </LpPage>
  );
}
