import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";

const SUPABASE_IMAGES = "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";
const HERO_BG = `${SUPABASE_IMAGES}/find_missing_hero01.jpg`;

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const STEPS = [
  {
    icon: "ri-file-text-line",
    title: "File a missing persons report — now",
    body: "Contrary to popular belief, you do not have to wait 24 or 48 hours. Most jurisdictions allow an immediate report when there is reason to believe the person is in danger — and active addiction or mental health crisis qualifies. Call your local police non-emergency line or visit the precinct in person. Bring a recent photo, physical description, last known location, vehicle info, and medical/psychiatric history.",
    urgent: true,
  },
  {
    icon: "ri-hospital-line",
    title: "Contact local hospitals and emergency departments",
    body: "Call every hospital within driving distance of where your loved one was last seen. HIPAA limits what they can share, but most hospitals will confirm whether a person matching your description is currently a patient. Be specific — provide full name, date of birth, and physical description.",
    urgent: false,
  },
  {
    icon: "ri-building-line",
    title: "Check jails, detention centres, and treatment facilities",
    body: "Use county and state inmate locator websites. Call any treatment programs your loved one has attended before — they may have voluntarily checked in. Many states also have public-facing involuntary commitment search tools. This step often produces results faster than families expect.",
    urgent: false,
  },
  {
    icon: "ri-group-line",
    title: "Reach out to known associates",
    body: "Contact friends, sponsors, ex-partners, and anyone else your loved one may have been in contact with. Be honest about why you are calling — this is not the time for embarrassment. Most people will help if you ask directly. Ask who they spoke to last and when.",
    urgent: false,
  },
  {
    icon: "ri-smartphone-line",
    title: "Use every technology available",
    body: "If Find My Phone or Google Location Sharing was previously enabled, check it. Review credit and debit card activity. Check social media for recent posts, check-ins, or messages. Contact the cell phone provider — they can ping the device for law enforcement. Check rideshare and delivery apps for recent activity if you have account access.",
    urgent: false,
  },
  {
    icon: "ri-government-line",
    title: "Engage missing persons resources",
    body: "Non-profits and national resources can provide critical support and visibility. The National Center for Missing & Exploited Children (under 18s), the National Missing and Unidentified Persons System (NamUs), and local addiction-focused outreach organisations. SAMHSA's helpline (1-800-662-4357) can also assist with crisis navigation.",
    urgent: false,
  },
  {
    icon: "ri-heart-pulse-line",
    title: "Have a plan for when they are found",
    body: "If your loved one is located, the next 24 hours are critical. This is the moment when an intervention is most effective — and when relapse is most dangerous. Have a treatment plan and a certified interventionist ready before you make contact. Otherwise, you risk losing them again.",
    urgent: true,
  },
];

const TECH_TOOLS = [
  "Find My (iPhone) or Google Find My Device",
  "Credit and debit card transaction alerts",
  "Social media location tags and check-ins",
  "Rideshare app ride history (Uber, Lyft)",
  "Food delivery app history (DoorDash, Uber Eats)",
  "Cell carrier location ping (requires police involvement)",
  "Google Maps Timeline (if location history was on)",
];

const FAQS: Faq[] = [
  {
    question: "Do I really have to wait 24 hours to file a missing persons report?",
    answer:
      "No. The 24-hour rule is a myth. Most jurisdictions allow an immediate missing persons report when there is reason to believe the person may be in danger. Active addiction, mental health crisis, or a history of suicidal ideation all qualify. File immediately and be explicit about the reason for your concern.",
  },
  {
    question: "My loved one is an adult. Will the police actually help?",
    answer:
      "Adults have the right to disappear, and police resources vary significantly by jurisdiction. However, an adult with a documented mental health condition or active addiction who has gone missing without contact is almost always treated as a welfare check situation. Emphasise the medical nature of the crisis when you file the report.",
  },
  {
    question: "What should I say to my loved one when I find them?",
    answer:
      "This is one of the most important moments you will face. What you say in the first 60 seconds can either open or close the door to treatment. Call us before you make contact if at all possible. We can coach you through exactly how to approach the conversation — and ideally, we should be there with you.",
  },
  {
    question: "Can you help locate my loved one, not just intervene?",
    answer:
      "We are not a search-and-rescue service, but we have helped families coordinate the search process many times. More importantly, we can be on call and ready to deploy the moment your loved one is found — so you don't lose the critical window between location and treatment.",
  },
  {
    question: "My loved one checks in occasionally but then disappears again. What do I do?",
    answer:
      "This pattern — episodic contact followed by disappearance — is common in active addiction. Each contact is a potential intervention window. We can prepare you and your family for exactly what to say and do during those brief windows to maximise the chance of getting your loved one into treatment.",
  },
  {
    question: "What resources are available for families of missing persons?",
    answer:
      "SAMHSA's National Helpline (1-800-662-4357) provides 24/7 crisis navigation. NamUs (National Missing and Unidentified Persons System) helps with case management. The National Alliance on Mental Illness (NAMI) also provides family support. For under-18s, the National Center for Missing & Exploited Children (NCMEC) provides dedicated resources.",
  },
];

export default function FindYourMissingLovedOnePage() {
  return (
    <main className="min-h-screen">

      {/* Hero — urgent tone */}
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/92 via-[#1A1A17]/80 to-[#1A1A17]/55" />
        <div className={`relative ${CONTAINER} py-24 lg:py-32`}>
          <div className="max-w-2xl">
            <p className="brand-eyebrow mb-4 text-[#8FAC87]">Crisis Resource</p>
            <h1 className="font-heading mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              How to find a missing loved one <span className="italic text-[#8FAC87]">struggling with addiction</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80">
              When a family member disappears in the middle of an addiction or mental health crisis, every minute matters.
              Here is exactly what to do — in order — to bring them home safely.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Call Us Now — 24 / 7
              </a>
              <a
                href="#steps"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                See the steps <i className="ri-arrow-down-line"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Urgent callout */}
      <section className="bg-[#3E5B50] py-10">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                <i className="ri-alarm-warning-line text-2xl"></i>
              </span>
              <p className="text-base font-semibold text-white">
                If you believe your loved one is in immediate danger — call 911 first, then call us.
              </p>
            </div>
            <a
              href={PHONE_HREF}
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
            >
              <i className="ri-phone-fill"></i> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      {/* 7-step guide */}
      <section id="steps" className="bg-white py-24">
        <div className={CONTAINER}>
          <div className="mb-14">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Action Steps</p>
            <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
              What to do — <span className="italic text-[#507969]">in this exact order</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4B4B4B]">
              These steps are drawn from hundreds of cases where families located — and then successfully intervened with — a missing loved one in active addiction or mental health crisis.
            </p>
          </div>

          <div className="grid gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={`flex gap-6 rounded-3xl p-8 shadow-sm ring-1 ${
                  step.urgent
                    ? "bg-[#3E5B50] ring-[#507969]/30"
                    : "bg-white ring-[#EFEFEF]"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-md ${step.urgent ? "bg-[#8FAC87]" : "bg-[#3E5B50]"} text-white`}>
                    <i className={`${step.icon} text-2xl`}></i>
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className={`font-heading text-lg font-bold ${step.urgent ? "text-white" : "text-[#1A1A17]"}`}>{step.title}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${step.urgent ? "text-white/80" : "text-[#4B4B4B]"}`}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology tools */}
      <section className="bg-[#F5F3E7] py-20">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Technology Checklist</p>
              <h2 className="font-heading mb-6 text-4xl font-bold text-[#1A1A17] md:text-5xl">
                Digital tools that can <span className="italic text-[#507969]">locate your loved one</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B]">
                Technology often finds people faster than traditional searches. Check every tool available before concluding your loved one cannot be found.
              </p>
              <ul className="grid gap-3">
                {TECH_TOOLS.map((tool) => (
                  <li key={tool} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    <span className="text-sm leading-relaxed text-[#4B4B4B]">{tool}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-[#3E5B50] p-8 text-white">
              <i className="ri-search-eye-line text-4xl text-[#8FAC87]"></i>
              <h3 className="font-heading mt-5 text-2xl font-bold">When they are found</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                The 24 hours after a missing person is located are the highest-risk window in the entire recovery journey. The emotional intensity creates an unprecedented opening for treatment acceptance — but it also carries enormous risk of relapse or flight.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Have a certified interventionist on call before you make contact. We can be ready to deploy within hours of your call.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion title="Missing loved one questions, answered" faqs={FAQS} />

      <BottomCta
        title="Need help bringing your loved one home?"
        italicWord="home"
        body="Call us 24/7. Our crisis intervention team will guide you through every step — and be ready to act the moment your loved one is found."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}
