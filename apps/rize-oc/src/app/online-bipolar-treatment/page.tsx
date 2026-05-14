import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OnlineTreatmentPage from "@/views/online-treatment/OnlineTreatmentPage";

const fallback: Metadata = {
  title: "Online Bipolar Disorder Treatment in California | Rize OC",
  description: "Virtual bipolar disorder treatment via telehealth — medication management, mood stabilization therapy, PHP and IOP programs available online across California. Insurance accepted.",
  alternates: { canonical: "/online-bipolar-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/online-bipolar-treatment", fallback);
}

export default function Page() {
  return (
    <OnlineTreatmentPage
      eyebrow="Virtual Mental Health Care"
      headline="Online Bipolar Disorder Treatment in California"
      subhead="Expert bipolar disorder treatment delivered via telehealth — precise medication management, mood-focused therapy, and structured programs matched to your level of care need. Available across California with same-day intake."
      conditionName="Bipolar Disorder"
      overviewTitle="Managing Bipolar Disorder With Virtual Expert Care"
      overviewBody={[
        "Bipolar disorder requires consistent, expert clinical oversight — including precise medication management and regular therapeutic support. Virtual care makes this level of clinical engagement accessible without geographic barriers, allowing people across California to receive the same quality of care as those living near major treatment centers.",
        "Our online bipolar program combines psychiatric evaluation and medication management (mood stabilizers, atypical antipsychotics, antidepressants) with evidence-based therapy (CBT for Bipolar, IPSRT — Interpersonal and Social Rhythm Therapy, and DBT). This combined approach is supported by the strongest evidence base for bipolar disorder treatment.",
        "We treat all presentations of bipolar disorder — Bipolar I, Bipolar II, cyclothymia, and bipolar disorder with co-occurring anxiety, trauma, or substance use. Our virtual PHP and IOP programs provide the structure and intensity needed for stabilization, while our outpatient program supports long-term maintenance.",
      ]}
      whatWeProvide={[
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "Psychiatric evaluation and management of mood stabilizers, antipsychotics, and supporting medications." },
        { icon: "ri-brain-line", title: "Mood-Focused Therapy", desc: "CBT for Bipolar and IPSRT — therapies specifically validated for bipolar disorder management." },
        { icon: "ri-calendar-check-line", title: "Structured Daily Routine", desc: "IPSRT-informed social rhythm guidance to stabilize mood through consistent daily schedules." },
        { icon: "ri-group-line", title: "Peer Group Support", desc: "Virtual group sessions with others managing bipolar disorder — reducing isolation and building community." },
      ]}
      howItWorks={[
        { step: "01", title: "Initial Consultation", desc: "Our admissions team speaks with you the same day to understand your history with bipolar disorder and your current situation." },
        { step: "02", title: "Psychiatric Assessment", desc: "A licensed psychiatrist reviews your history, current medications, and symptoms to develop a comprehensive clinical picture." },
        { step: "03", title: "Insurance Verification", desc: "We verify your mental health benefits and confirm virtual care coverage — at no cost to you." },
        { step: "04", title: "Treatment Begins", desc: "Your individualized virtual bipolar program begins — typically within 24–48 hours of your initial call." },
      ]}
      faqs={[
        { q: "Can bipolar disorder be managed with online treatment?", a: "Yes, particularly for ongoing management and maintenance phases. Virtual care is excellent for regular medication check-ins, therapy sessions, and structured programs like PHP and IOP. For acute manic or severe depressive episodes requiring stabilization, a higher level of in-person or residential care may be initially needed before transitioning to virtual care." },
        { q: "What medications are prescribed for bipolar disorder online?", a: "Our virtual psychiatric providers can prescribe and manage the full range of bipolar medications, including mood stabilizers (lithium, valproate, lamotrigine), atypical antipsychotics (quetiapine, aripiprazole, risperidone), and adjunctive medications for anxiety or sleep. All prescriptions comply with applicable telehealth prescribing regulations." },
        { q: "Is group therapy helpful for bipolar disorder?", a: "Research supports the value of group therapy and peer support for bipolar disorder. Sharing experiences with others who understand the condition reduces isolation and shame, while structured psychoeducation groups build practical skills for mood management and early recognition of episode warning signs." },
        { q: "Does insurance cover virtual bipolar treatment?", a: "Most major PPO insurance plans cover virtual mental health treatment at parity with in-person care. Our team verifies your specific benefits before you begin — including your deductible, copay, and any prior authorization requirements." },
      ]}
    />
  );
}
