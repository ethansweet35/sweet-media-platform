import LevelOfCareTemplate from "../LevelOfCareTemplate";
import type { LevelOfCareData } from "../types";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const data: LevelOfCareData = {
  eyebrow: "Levels of Care",
  heading: "Virtual Outpatient Program",
  tagline:
    "All the clinical depth of in-person IOP and OP — delivered through a secure, HIPAA-compliant telehealth platform from wherever you feel most comfortable.",
  heroImage: `${BASE}/vop_hero01.jpg`,
  heroImageAlt: "Person in telehealth therapy session from coastal California home",
  stats: [
    { value: "HIPAA", label: "Compliant Platform" },
    { value: "CA", label: "State Licensed" },
    { value: "IOP+OP", label: "Levels Offered" },
    { value: "Any", label: "Device Supported" },
  ],

  overviewTitle: "Premium Care, Delivered Remotely",
  overviewBody: [
    "Virtual care is not a compromise — it is an expansion of access. Rize OC's Virtual Outpatient Program brings our full clinical team, evidence-based curriculum, and community-oriented approach directly to your home, office, or wherever life takes you.",
    "Via our secure telehealth platform, clients participate in individual therapy, structured group sessions, and psychiatric check-ins with the same clinicians they would see in person — with no reduction in quality or engagement.",
    "Virtual IOP and OP are California state licensed and accepted by most major insurance providers. Whether you live outside of Orange County, travel frequently, or simply prefer the comfort and privacy of your own space, virtual care makes clinical excellence accessible.",
  ],
  overviewFeatures: [
    { icon: "ri-video-line",          title: "Secure Video Platform",    desc: "HIPAA-compliant telehealth technology with end-to-end encryption on any device" },
    { icon: "ri-group-line",          title: "Live Group Sessions",       desc: "Real-time, interactive group therapy with Rize clients across California" },
    { icon: "ri-user-heart-line",     title: "Individual Therapy",        desc: "Private weekly sessions with your dedicated licensed therapist, from anywhere" },
    { icon: "ri-shield-check-line",   title: "Insurance Accepted",        desc: "Most major PPO plans cover virtual behavioral health services at the same rate as in-person" },
  ],

  expectTitle: "How Virtual Care Works at Rize",
  expectBody:
    "Getting started with virtual care is simple. Everything happens through a single secure link — no apps to download, no complicated setup.",
  expectSteps: [
    { num: "1", title: "Technology Onboarding",   desc: "A care coordinator walks you through our telehealth platform, schedules your sessions, and confirms your insurance coverage before day one." },
    { num: "2", title: "Live Group Sessions",      desc: "Join scheduled group therapy sessions with a small cohort of peers via secure video — same format, same depth as in-person groups." },
    { num: "3", title: "Private Therapy",          desc: "Weekly individual sessions with your clinician are conducted via secure video — building the same therapeutic alliance as in-person work." },
    { num: "4", title: "Progress & Transition",   desc: "Your team monitors progress continuously, adjusting session frequency and recommending step-up or step-down as clinically indicated." },
  ],

  candidacyTitle: "Virtual Care Is Ideal When…",
  candidacyBody:
    "Virtual IOP and OP are appropriate for a broad range of individuals. Distance, schedule, and privacy are no longer barriers to receiving exceptional behavioral health care.",
  candidacyItems: [
    { label: "Located outside Orange County but in California" },
    { label: "Frequent travel makes a fixed in-person schedule difficult" },
    { label: "Privacy concerns make attending a physical clinic uncomfortable" },
    { label: "Childcare, transportation, or disability limits in-person attendance" },
    { label: "Stepping down from in-person PHP or IOP and transitioning home" },
    { label: "Comfortable with technology and self-directed in a home setting" },
    { label: "Stable enough to benefit from outpatient-level support" },
  ],

  prevLevel: { label: "← Outpatient Program (OP)",  href: "/outpatient-program" },
};

export default function VirtualPage() {
  return <LevelOfCareTemplate data={data} />;
}
