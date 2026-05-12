import LevelOfCareTemplate from "../LevelOfCareTemplate";
import type { LevelOfCareData } from "../types";

const BASE = "https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images";

const data: LevelOfCareData = {
  eyebrow: "Levels of Care",
  heading: "Outpatient Program",
  tagline:
    "Ongoing therapeutic support — one to two sessions per week — for individuals who have achieved meaningful stability and are committed to sustaining long-term recovery.",
  heroImage: `${BASE}/op_hero01.jpg`,
  heroImageAlt: "Outdoor oceanview terrace at Rize OC outpatient wellness center",
  stats: [
    { value: "1–2", label: "Sessions Per Week" },
    { value: "Open", label: "Ended Duration" },
    { value: "Home", label: "Based Recovery" },
    { value: "Alumni", label: "Network Access" },
  ],

  overviewTitle: "Long-Term Recovery Sustainment",
  overviewBody: [
    "Standard Outpatient (OP) is the final structured level of care in the continuum — a vital support system for individuals who have built a strong recovery foundation and are reintegrating fully into life.",
    "Rather than intensive programming, OP focuses on maintaining therapeutic momentum through regular individual and group sessions, relapse prevention planning, and connection to the broader Rize alumni community.",
    "At this level, the therapeutic relationship deepens into one of partnership — your clinician becomes a long-term guide as you navigate the real-world challenges of sustained recovery.",
  ],
  overviewFeatures: [
    { icon: "ri-calendar-line",     title: "Flexible Frequency",       desc: "One to two sessions per week scheduled around your professional and family life" },
    { icon: "ri-user-smile-line",   title: "Ongoing Individual Therapy",desc: "Continued personalized therapeutic work with your primary clinician" },
    { icon: "ri-shield-check-line", title: "Relapse Prevention Focus",  desc: "Regular review and refinement of your relapse prevention plan as life circumstances evolve" },
    { icon: "ri-team-line",         title: "Alumni Community Access",   desc: "Connection to the Rize alumni network, peer mentorship, and ongoing community events" },
  ],

  expectTitle: "The Outpatient Experience at Rize",
  expectBody:
    "OP is less a formal program and more an ongoing therapeutic partnership. Here's what that looks like in practice.",
  expectSteps: [
    { num: "1", title: "Regular Check-ins",         desc: "Weekly or bi-weekly individual therapy sessions maintain momentum, address challenges, and celebrate milestones." },
    { num: "2", title: "Group Participation",        desc: "Optional alumni and continuing care groups provide community support and shared experience with others in sustained recovery." },
    { num: "3", title: "Psychiatric Continuity",    desc: "Medication management and psychiatric follow-up continues for clients on pharmacological support." },
    { num: "4", title: "Crisis & Relapse Support",  desc: "Immediate access to your clinical team if challenges arise — including step-up to a higher level of care if clinically indicated." },
  ],

  candidacyTitle: "Who Benefits From Outpatient?",
  candidacyBody:
    "OP is ideal for individuals who have completed a higher level of care and are ready to take the lead in their recovery with ongoing professional support alongside.",
  candidacyItems: [
    { label: "Stepped down from IOP with demonstrated stability" },
    { label: "Fully reintegrated into work, school, or family life" },
    { label: "Committed to long-term recovery as an ongoing practice" },
    { label: "Building or maintaining a strong sober support network" },
    { label: "Navigating life transitions that benefit from therapeutic support" },
    { label: "Requires occasional medication management follow-up" },
    { label: "Seeking alumni community connection and peer accountability" },
  ],

  prevLevel: { label: "← Intensive Outpatient (IOP)",  href: "/iop-program-orange-county" },
  nextLevel: { label: "Virtual Outpatient →",           href: "/virtual-outpatient-program" },
};

export default function OpPage() {
  return <LevelOfCareTemplate data={data} />;
}
