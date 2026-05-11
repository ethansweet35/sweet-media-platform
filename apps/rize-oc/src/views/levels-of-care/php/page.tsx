import LevelOfCareTemplate from "../LevelOfCareTemplate";
import type { LevelOfCareData } from "../types";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const data: LevelOfCareData = {
  eyebrow: "Levels of Care",
  heading: "Partial Hospitalization Program",
  tagline:
    "Intensive full-day clinical programming — 6 hours per day, 5 to 7 days per week — providing hospital-level structure while you sleep in a therapeutic environment each evening.",
  heroImage: `${BASE}/php_hero01.jpg`,
  heroImageAlt: "Bright group therapy room at Rize OC partial hospitalization program",
  stats: [
    { value: "6hrs", label: "Daily Programming" },
    { value: "5–7", label: "Days Per Week" },
    { value: "2–4", label: "Week Average Stay" },
    { value: "1:3", label: "Staff-to-Client Ratio" },
  ],

  overviewTitle: "Hospital-Level Care, Without the Hospital",
  overviewBody: [
    "Partial Hospitalization (PHP) is widely recognized as one of the most clinically effective levels of care available. It delivers the full breadth of inpatient programming — individual therapy, group process, medication management, and psychiatric support — within a structured daytime schedule.",
    "At Rize OC, PHP clients benefit from the same seasoned clinical team, premium accommodations, and evidence-based curriculum as our residential clients, while being able to sleep in a structured living environment each evening.",
    "PHP is an ideal step-down from residential treatment, or a powerful first level for those who do not require around-the-clock supervision but need significant daily structure to achieve and maintain stability.",
  ],
  overviewFeatures: [
    { icon: "ri-mental-health-line", title: "Daily Individual Therapy",  desc: "One-on-one sessions with your primary therapist five or more times per week" },
    { icon: "ri-group-line",         title: "Intensive Group Process",   desc: "Multiple structured group sessions daily exploring trauma, skills, and community" },
    { icon: "ri-medicine-bottle-line",title: "Psychiatric Oversight",   desc: "Regular medication management and psychiatric evaluation as clinically indicated" },
    { icon: "ri-sun-line",           title: "Holistic Modalities",       desc: "Art therapy, somatic movement, mindfulness, and experiential programming woven into each week" },
  ],

  expectTitle: "A Typical PHP Day at Rize",
  expectBody:
    "PHP days are purposeful, varied, and paced to balance intensity with restoration. No two days are identical, but each one is intentional.",
  expectSteps: [
    { num: "1", title: "Morning Check-in",           desc: "The day begins with a mindfulness-based group, setting intentions and reviewing goals for the day with the clinical team." },
    { num: "2", title: "Individual & Group Therapy", desc: "Core therapeutic work — including EMDR, CBT, DBT skills, and trauma-focused modalities — delivered by licensed clinicians." },
    { num: "3", title: "Experiential Programming",  desc: "Afternoon sessions incorporate art, movement, equine-assisted therapy, or community outings as part of whole-person healing." },
    { num: "4", title: "Evening Transition",         desc: "Clients transition to a sober living or family setting each evening, practicing skills in real life with clinical support nearby." },
  ],

  candidacyTitle: "Is PHP Right for You?",
  candidacyBody:
    "PHP is appropriate for individuals who are medically stable but require intensive clinical support to address the psychological, behavioral, and relational dimensions of their condition.",
  candidacyItems: [
    { label: "Recently completed medical detox or residential treatment" },
    { label: "Significant anxiety, depression, or trauma alongside substance use" },
    { label: "Motivated for change but unable to function independently yet" },
    { label: "Requires psychiatric medication management and monitoring" },
    { label: "History of relapse following lower levels of care" },
    { label: "Strong desire to return home each evening while in intensive treatment" },
    { label: "Stable housing or sober living environment available" },
  ],

  prevLevel: { label: "← Drug & Alcohol Detox",          href: "/drug-alcohol-detox" },
  nextLevel: { label: "Intensive Outpatient (IOP) →",     href: "/iop-program-orange-county" },
};

export default function PhpPage() {
  return <LevelOfCareTemplate data={data} />;
}
