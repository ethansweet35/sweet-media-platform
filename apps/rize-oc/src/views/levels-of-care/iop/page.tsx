import LevelOfCareTemplate from "../LevelOfCareTemplate";
import type { LevelOfCareData } from "../types";

const BASE = "https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images";

const data: LevelOfCareData = {
  eyebrow: "Levels of Care",
  heading: "Intensive Outpatient Program",
  tagline:
    "Flexible, targeted clinical programming — 3 to 9 hours per week — that integrates recovery support into your daily life while you live at home or in sober living.",
  heroImage: `${BASE}/iop_hero01.jpg`,
  heroImageAlt: "Intimate therapy office with coastal California hillside view at Rize OC",
  stats: [
    { value: "3–9", label: "Hours Per Week" },
    { value: "8–12", label: "Week Average Stay" },
    { value: "AM/PM", label: "Schedule Options" },
    { value: "In & Out", label: "Patient Supported" },
  ],

  overviewTitle: "Recovery Woven Into Your Life",
  overviewBody: [
    "Intensive Outpatient Program (IOP) represents the bridge between intensive day treatment and independent living. It provides structured therapeutic support while allowing you to maintain professional responsibilities, family commitments, and community connections.",
    "At Rize OC, our IOP is not a diluted version of higher levels of care — it is a thoughtfully designed program that meets clients where they are. Group sessions, individual therapy, and psychiatric check-ins are scheduled to accommodate morning and evening availability.",
    "IOP is most effective when paired with a supportive living environment, strong social connections, and a genuine commitment to applying the skills learned in sessions to real-world situations.",
  ],
  overviewFeatures: [
    { icon: "ri-calendar-check-line", title: "Flexible Scheduling",     desc: "Morning and evening session tracks accommodate professional and family schedules" },
    { icon: "ri-group-line",          title: "Structured Group Therapy", desc: "Evidence-based group sessions covering relapse prevention, DBT skills, and peer support" },
    { icon: "ri-user-heart-line",     title: "Individual Therapy",       desc: "Weekly one-on-one sessions with your dedicated therapist to deepen personalized work" },
    { icon: "ri-mental-health-line",  title: "Continued Psych Support",  desc: "Ongoing medication management and psychiatric follow-up as clinically indicated" },
  ],

  expectTitle: "What a Week in IOP Looks Like",
  expectBody:
    "IOP at Rize is structured yet flexible, providing consistency without inflexibility. Here's how a typical week unfolds.",
  expectSteps: [
    { num: "1", title: "Group Sessions",          desc: "Structured group therapy 3 evenings (or mornings) per week covers skills, community processing, and relapse prevention strategies." },
    { num: "2", title: "Individual Therapy",      desc: "A dedicated weekly session with your primary therapist provides continuity, depth, and personalized clinical attention." },
    { num: "3", title: "Skill Practice",          desc: "Between sessions, clients apply learned skills in daily life — with access to crisis support and peer accountability." },
    { num: "4", title: "Step-Down Planning",      desc: "Throughout IOP, your team collaborates with you on the eventual transition to outpatient care and long-term recovery planning." },
  ],

  candidacyTitle: "Who Is IOP For?",
  candidacyBody:
    "IOP is designed for individuals who have achieved a foundation of stability — whether from detox, residential, or PHP — and are ready to integrate recovery into their everyday environment.",
  candidacyItems: [
    { label: "Stepping down from PHP or residential treatment" },
    { label: "Stable at home or in a sober living environment" },
    { label: "Able to maintain employment, school, or family responsibilities" },
    { label: "Requires continued clinical support without full-day programming" },
    { label: "Motivated and engaged in the recovery process" },
    { label: "Benefits from peer community and structured group accountability" },
    { label: "Mild to moderate symptoms that do not require intensive daily care" },
  ],

  prevLevel: { label: "← Partial Hospitalization (PHP)",  href: "/partial-hospitalization-program-orange-county" },
  nextLevel: { label: "Outpatient Program (OP) →",         href: "/outpatient-program" },
};

export default function IopPage() {
  return <LevelOfCareTemplate data={data} />;
}
