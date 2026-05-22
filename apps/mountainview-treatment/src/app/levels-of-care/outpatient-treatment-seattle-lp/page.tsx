import type { Metadata } from "next";
import LpPage from "@/views/lp/LpPage";
import LpFeatureImage from "@/components/lp/LpFeatureImage";

const FEATURE_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/mvt_op_lp_feature01.jpg";

export const metadata: Metadata = {
  title: "Outpatient Treatment Seattle | Addiction & Mental Health | Mountain View Treatment",
  description:
    "Outpatient treatment in Seattle for addiction and mental health — PHP, IOP, and standard outpatient programs. Evidence-based care built around your schedule. Insurance accepted.",
  robots: { index: false, follow: false },
};

const FAQS = [
  {
    q: "What types of outpatient treatment does Mountain View Treatment offer in Seattle?",
    a: "We offer three levels of outpatient care: Partial Hospitalization (PHP) at 25–30 hours/week, Intensive Outpatient (IOP) at 9–12 hours/week, and standard Outpatient at 1–2 sessions/week. Each level is designed for different clinical needs, and many clients move through multiple levels as they progress in recovery.",
  },
  {
    q: "Is outpatient treatment effective for serious addiction or mental health conditions?",
    a: "Yes. Research consistently shows that outpatient treatment — particularly PHP and IOP — achieves outcomes comparable to residential treatment for many individuals with moderate to severe conditions. The key is matching the right level of care to the individual's clinical needs and living environment.",
  },
  {
    q: "Do you offer virtual or telehealth outpatient options?",
    a: "We offer hybrid options for some components of care based on clinical appropriateness. Our clinical team will assess whether telehealth elements are suitable for your situation during your initial intake assessment.",
  },
  {
    q: "How is outpatient treatment at Mountain View different from a therapist or counselor?",
    a: "Outpatient treatment programs provide a multidisciplinary clinical team — therapists, psychiatrists, case managers, and peer support specialists — along with structured group programming, medication management, and a full continuum of care. An individual therapist provides valuable support but cannot replicate the comprehensive clinical environment of an outpatient program.",
  },
  {
    q: "What areas of Seattle does Mountain View Treatment serve?",
    a: "Our facility is located in Seattle and serves the greater Seattle metro area, including Bellevue, Redmond, Kirkland, Renton, Tacoma, Burien, Tukwila, Kent, and surrounding King County and Pierce County communities.",
  },
];

export default function Page() {
  return (
    <LpPage
      eyebrow="Outpatient Treatment · Seattle"
      headline="Outpatient Treatment in Seattle"
      subheadline="PHP, IOP, and outpatient programs for addiction and mental health — all under one roof in Seattle. Evidence-based care built around your schedule, your life, and your goals."
      stat="3"
      statLabel="Levels of Care"
      faqs={FAQS}
      overview={{
        eyebrow: "Seattle's Outpatient Recovery Programs",
        headline: "Outpatient Treatment That Fits Your Life",
        paragraphs: [
          "Mountain View Treatment provides a full continuum of outpatient addiction and mental health care in Seattle — from our most intensive Partial Hospitalization Program (PHP) through our Intensive Outpatient Program (IOP) to ongoing standard outpatient therapy. Our programs serve the greater Seattle area, including Bellevue, Kirkland, Renton, Tacoma, and surrounding Pacific Northwest communities.",
          "All levels of our outpatient treatment are integrated — meaning addiction and mental health are treated simultaneously by a unified clinical team that includes licensed therapists, psychiatrists, case managers, and certified peer support specialists. Evidence-based treatment modalities include CBT, DBT, EMDR, somatic experiencing, trauma-focused therapy, motivational interviewing, and medication-assisted treatment.",
        ],
        listHeading: "What Sets Our Programs Apart",
        listItems: [
          "Fully integrated dual diagnosis treatment",
          "Multiple scheduling tracks — morning, afternoon, evening",
          "Small group sizes for individualized attention",
          "In-house psychiatric care and medication management",
          "Evidence-based modalities including EMDR and somatic therapies",
          "Family therapy and support coordination",
          "Pacific Northwest–focused alumni and aftercare network",
          "Most major insurance plans accepted",
        ],
        callout:
          "Recovery does not require putting your life on hold. Our outpatient programs deliver the clinical depth of residential care — without requiring you to leave Seattle, your job, or your family.",
      }}
    >
      <LpFeatureImage
        eyebrow="Our Seattle Location"
        headline="A Healing Environment in the Heart of the Pacific Northwest"
        body={[
          "Mountain View Treatment's outpatient facility is located in Seattle and designed to leverage the naturally restorative Pacific Northwest environment as part of the recovery experience. Surrounded by towering evergreens, our setting reinforces calm, clarity, and connection to something larger than the struggle.",
          "Clients describe our facility as a sanctuary — a place that feels nothing like a typical clinical setting, yet delivers the full rigor of evidence-based outpatient treatment.",
        ]}
        bullets={[
          "Centrally located in Seattle — convenient to King County",
          "Serves Bellevue, Kirkland, Renton, Tacoma, and surrounding areas",
          "Calm, private therapeutic environment",
          "Free parking and accessible public transit",
          "Flexible scheduling — morning, afternoon, and evening",
          "Admissions available same day, 7 days a week",
        ]}
        ctaLabel="Call Now — (253)-252-5875"
        imageSrc={FEATURE_IMG}
        imageAlt="Mountain View Treatment outpatient center surrounded by Pacific Northwest evergreen forest in Seattle"
        layout="image-left"
      />
    </LpPage>
  );
}
