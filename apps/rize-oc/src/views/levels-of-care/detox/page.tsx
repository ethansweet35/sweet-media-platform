import LevelOfCareTemplate from "../LevelOfCareTemplate";
import type { LevelOfCareData } from "../types";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const data: LevelOfCareData = {
  eyebrow: "Levels of Care",
  heading: "Drug & Alcohol Detox",
  tagline:
    "A medically supervised, comfort-focused withdrawal process that provides a safe foundation for the recovery journey ahead — available 24 hours a day, 7 days a week.",
  heroImage: `${BASE}/detox_hero01.jpg`,
  heroImageAlt: "Private medical detox suite with coastal views at Rize OC",
  stats: [
    { value: "24/7", label: "Medical Supervision" },
    { value: "3–10", label: "Days Average Stay" },
    { value: "100%", label: "Private Suites" },
    { value: "Same", label: "Day Admissions" },
  ],

  overviewTitle: "Safe, Comfortable Medical Detox",
  overviewBody: [
    "Medical detoxification is the first — and often most critical — step in the recovery process. It involves the supervised elimination of substances from the body while managing the potentially dangerous symptoms of withdrawal.",
    "At Rize OC, our medical detox program is designed to maximize physical safety and comfort. Our licensed medical team monitors each client around the clock, adjusting protocols as needed to ensure the smoothest possible withdrawal experience.",
    "We believe detox should be the beginning of healing, not an ordeal to endure. Every element of our program — from our private suites to our chef-prepared meals — is designed to restore dignity and instill hope from day one.",
  ],
  overviewFeatures: [
    { icon: "ri-stethoscope-line",  title: "24/7 Medical Team",         desc: "Physicians and nurses monitor vitals continuously throughout withdrawal" },
    { icon: "ri-capsule-line",      title: "Medication-Assisted Care",  desc: "Evidence-based protocols to minimize discomfort and reduce complications" },
    { icon: "ri-hotel-line",        title: "Private Accommodations",    desc: "Fully private suites with organic linens and en-suite baths" },
    { icon: "ri-heart-pulse-line",  title: "Holistic Comfort Measures", desc: "IV therapy, massage, acupuncture, and nutritional support alongside medical care" },
  ],

  expectTitle: "Your First Days at Rize",
  expectBody:
    "Every detox experience is different. Here is what you can generally expect during your medically supervised stay.",
  expectSteps: [
    { num: "1", title: "Arrival & Assessment",       desc: "A comprehensive medical evaluation establishes your baseline health, substance history, and individualized detox protocol within hours of arrival." },
    { num: "2", title: "Medical Stabilization",      desc: "Our team initiates your withdrawal management plan — medications, monitoring, and comfort measures begin immediately to ensure your safety." },
    { num: "3", title: "Therapeutic Introduction",  desc: "As medical stability allows, you'll meet your primary therapist and begin the gentle process of addressing the underlying drivers of use." },
    { num: "4", title: "Transition Planning",        desc: "Before discharge, we create a seamless care plan — typically transitioning directly into Residential or PHP — so momentum is never lost." },
  ],

  candidacyTitle: "Who Benefits From Medical Detox?",
  candidacyBody:
    "Medical detox is indicated for individuals whose substance use carries significant physical withdrawal risk. Our team assesses each client individually to determine the appropriate level of medical supervision.",
  candidacyItems: [
    { label: "Alcohol dependence with history of seizures or delirium" },
    { label: "Opioid dependence or misuse of prescription pain medication" },
    { label: "Benzodiazepine or sedative dependence" },
    { label: "Stimulant use with significant mental health symptoms" },
    { label: "Polysubstance use requiring complex medical management" },
    { label: "Failed prior outpatient detox attempts" },
    { label: "Medical co-morbidities requiring close monitoring" },
  ],

  nextLevel: { label: "Residential Treatment →", href: "/partial-hospitalization-program-orange-county" },
};

export default function DetoxPage() {
  return <LevelOfCareTemplate data={data} />;
}
