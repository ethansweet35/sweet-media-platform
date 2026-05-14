import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SpecialtyProgramPage from "@/views/specialty/SpecialtyProgramPage";

const fallback: Metadata = {
  title: "Virtual Mental Health IOP in California | Rize OC",
  description: "Intensive Outpatient Program (IOP) for mental health delivered via telehealth across California. Evidence-based, insurance covered, flexible scheduling. Same-day intake.",
  alternates: { canonical: "/virtual-iop-mental-health" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/virtual-iop-mental-health", fallback);
}

export default function Page() {
  return (
    <SpecialtyProgramPage
      eyebrow="Virtual Mental Health IOP"
      headline="Virtual Mental Health Intensive Outpatient Program"
      subhead="Rize OC's virtual mental health IOP delivers structured, evidence-based group and individual therapy — 3 to 5 days per week — via secure telehealth from anywhere in California. More support than weekly therapy. More flexibility than residential."
      overviewTitle="What Is a Virtual Mental Health IOP?"
      overviewBody={[
        "An Intensive Outpatient Program (IOP) is a structured mental health treatment program that meets multiple days per week for several hours per session — providing significantly more therapeutic support than standard weekly therapy while allowing you to continue living at home, working, and maintaining family responsibilities.",
        "Rize OC's virtual mental health IOP is clinically equivalent to our in-person program — delivered via a HIPAA-compliant video platform with the same evidence-based therapies, the same clinical oversight, and the same structured scheduling. Clients from across California access expert-level mental health treatment without geographic barriers.",
        "Our virtual IOP treats the full range of mental health conditions — depression, anxiety, bipolar disorder, PTSD, OCD, BPD, and co-occurring disorders. Each client receives an individualized treatment plan and is matched to groups appropriate for their clinical presentation and recovery phase.",
      ]}
      features={[
        { icon: "ri-calendar-check-line", title: "3–5 Days Per Week", desc: "Structured programming 3 to 5 days per week, typically 3 hours per session — 9 to 15 hours per week total." },
        { icon: "ri-video-chat-line", title: "Fully Virtual", desc: "Attend from anywhere in California via secure, HIPAA-compliant video — no commute, no in-person requirement." },
        { icon: "ri-user-voice-line", title: "Individual Therapy", desc: "Regular one-on-one sessions with your dedicated licensed therapist throughout the IOP program." },
        { icon: "ri-group-line", title: "Group Therapy", desc: "Structured group sessions covering skills, process, psychoeducation, and condition-specific topics." },
        { icon: "ri-medicine-bottle-line", title: "Medication Management", desc: "Optional psychiatric services available — evaluation, prescribing, and ongoing medication oversight." },
        { icon: "ri-road-map-line", title: "Aftercare Planning", desc: "Discharge planning begins from day one — ensuring a smooth transition to the appropriate next step in care." },
      ]}
      steps={[
        { step: "01", title: "Free Consultation", desc: "Call or submit an inquiry. Our team connects with you the same day to discuss your mental health needs and IOP fit." },
        { step: "02", title: "Clinical Assessment", desc: "A licensed clinician completes a comprehensive assessment to confirm IOP as the right level of care and design your treatment plan." },
        { step: "03", title: "Insurance Verified", desc: "We verify your mental health IOP benefits and virtual care coverage — at no cost before you commit." },
        { step: "04", title: "IOP Begins", desc: "You receive your virtual schedule and begin the program — typically within 24–48 hours of completing your assessment." },
      ]}
      whyRize={[
        { icon: "ri-wifi-line", title: "True Virtual Parity", desc: "Our virtual IOP uses the same clinical protocols, therapists, and evidence base as our in-person program — not a reduced version." },
        { icon: "ri-time-line", title: "Flexible Scheduling", desc: "Morning and afternoon program tracks available — designed to work around work, school, and family schedules." },
        { icon: "ri-award-line", title: "Licensed Clinical Team", desc: "All individual therapists are licensed mental health professionals. Psychiatric services are board-certified." },
      ]}
      faqs={[
        { q: "Who is virtual mental health IOP right for?", a: "Virtual IOP is appropriate for individuals with moderate to severe mental health symptoms who can safely manage daily life at home but need more support than weekly therapy provides. It's also ideal for those stepping down from residential or PHP care, working adults who cannot attend in-person, and those in areas without local IOP options." },
        { q: "Is virtual IOP covered by insurance?", a: "Yes. Most major PPO plans cover virtual IOP for mental health under parity law. Our team verifies your specific benefits — including the number of sessions covered, your copay, and any prior authorization requirements — at no cost before you begin." },
        { q: "How is virtual IOP different from regular online therapy?", a: "Standard outpatient therapy typically involves 1–2 hours per week with a therapist. IOP provides 9–15 structured hours per week — including individual sessions, multiple group therapies, skills training, and psychoeducation. The intensity and structure of IOP is what makes it clinically distinct and more effective for moderate to severe presentations." },
        { q: "Can I work while in virtual mental health IOP?", a: "Many clients in our virtual IOP continue working. We offer both morning and afternoon programming tracks specifically to accommodate working adults. Some employers also support FMLA or ADA accommodations for mental health treatment — our team can provide the necessary documentation." },
      ]}
    />
  );
}
