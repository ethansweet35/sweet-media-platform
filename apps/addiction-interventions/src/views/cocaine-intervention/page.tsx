import Image from "next/image";
import Link from "next/link";
import TrustStrip from "@/components/sections/TrustStrip";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import HeroContactForm from "@/components/feature/HeroContactForm";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import type { Faq } from "@/data/faqs";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE_IMAGES =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images";

const HERO_BG = `${SUPABASE_IMAGES}/cocaine_hero01.jpg`;
const FAMILY_IMG = `${SUPABASE_IMAGES}/cocaine_family01.jpg`;

const SIGNS = [
  "Frequent nosebleeds, runny nose, or nasal septum damage",
  "Financial problems despite a good income — money disappearing on 'entertainment'",
  "Grandiosity, irritability, or paranoia that comes and goes with use",
  "Staying up all night and sleeping through the day (cocaine insomnia)",
  "Neglecting work, family, or health while maintaining a convincing exterior",
  "Repeated failed attempts to stop or cut back on their own",
  "Secretive behaviour around phone, money, or weekend plans",
  "Physical decline — weight loss, skin issues, or frequent illnesses",
];

const COCAINE_FAQS: Faq[] = [
  {
    question: "Cocaine addiction often looks 'functional' — why intervene early?",
    answer:
      "Cocaine addiction often hides behind a successful exterior — until it doesn't. By the time financial, professional, or physical damage becomes obvious, the addiction has deep roots and the consequences (job loss, divorce, health crisis) are much harder to recover from. Early intervention protects everything they've built.",
  },
  {
    question: "Does cocaine require medical detox like alcohol or opioids?",
    answer:
      "Cocaine withdrawal is primarily psychological (intense cravings, depression, fatigue, anhedonia) rather than life-threatening like alcohol or opioid withdrawal. However, the psychological crash is so severe that most people cannot sustain abstinence without structured support. Residential or intensive outpatient is almost always required.",
  },
  {
    question: "What if they also drink heavily (very common with cocaine)?",
    answer:
      "Alcohol + cocaine is one of the most dangerous combinations — it creates cocaethylene, a toxic metabolite that is more cardiotoxic than either substance alone. We treat this as a dual-substance intervention and place with programmes that address both simultaneously.",
  },
];

export default function CocaineInterventionPage() {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image src={HERO_BG} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/90 via-[#1A1A17]/75 to-[#1A1A17]/60" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_460px]">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]"><AutoLinkedText>{"Cocaine Intervention"}</AutoLinkedText></p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Cocaine interventions —{" "}
                <span className="italic text-[#8FAC87]">before the crash destroys everything</span>
              </h1>
              <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
                <AutoLinkedText>{"Cocaine addiction often hides behind a successful exterior — until it doesn't. We help families confront cocaine use early, before the financial, professional, and physical damage becomes irreversible."}</AutoLinkedText>
              </p>
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]">
                  <i className="ri-phone-fill"></i> Call {PHONE_DISPLAY}
                </a>
                <a href="#signs" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
                  See the warning signs <i className="ri-arrow-down-line"></i>
                </a>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {[
                  { icon: "ri-shield-check-line", text: "100% Confidential" },
                  { icon: "ri-time-line", text: "Available 24 / 7" },
                  { icon: "ri-award-line", text: "Joint Commission Accredited" },
                  { icon: "ri-map-pin-2-line", text: "Nationwide" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/30 text-[#8FAC87]">
                      <i className={`${b.icon} text-xs`}></i>
                    </span>
                    <span className="text-sm font-medium text-white/80">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <HeroContactForm />
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="signs" className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">Recognise the Signs</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                Is it time for a{" "}
                <span className="italic text-[#507969]">cocaine intervention?</span>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                <AutoLinkedText>{"Cocaine addiction often hides behind a successful exterior — until the money runs out, the job is lost, or a health crisis forces the issue. These signs indicate the situation is more serious than it appears."}</AutoLinkedText>
              </p>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full bg-[#3E5B50] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#507969]">
                <i className="ri-phone-fill"></i> Speak with an interventionist now
              </a>
            </div>
            <ul className="grid gap-3">
              {SIGNS.map((sign) => (
                <li key={sign} className="flex items-start gap-4 rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7]/60 px-5 py-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#8FAC87] text-white">
                    <i className="ri-check-line text-xs"></i>
                  </span>
                  <span className="text-sm leading-relaxed text-[#4B4B4B]">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Visual — real families */}
      <section className="relative h-[420px] overflow-hidden">
        <Image src={FAMILY_IMG} alt="A couple supporting each other through cocaine addiction" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-10 text-white">
          <p className="font-heading max-w-md text-2xl italic">
            <AutoLinkedText>{"\"We almost lost everything before we found the courage to ask for help.\""}</AutoLinkedText>
          </p>
          <p className="mt-2 text-sm text-white/70"><AutoLinkedText>{"— Wife of a husband now 18 months sober"}</AutoLinkedText></p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87]">What We Do</p>
              <h2 className="font-heading mb-6 text-4xl font-bold leading-tight text-[#1A1A17] md:text-5xl">
                What a professional cocaine intervention{" "}
                <span className="italic text-[#507969]">actually looks like</span>
              </h2>
              <p className="mb-5 text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"Because cocaine addiction frequently co-occurs with alcohol and other stimulants, our intervention plan is comprehensive. We coordinate detox, residential care, and longer-term outpatient support — not just a one-off conversation."}</AutoLinkedText>
              </p>
              <p className="text-base leading-relaxed text-[#4B4B4B]">
                <AutoLinkedText>{"We help families confront cocaine use early, before the financial, professional, and physical damage becomes irreversible. The intervention is structured, compassionate, and comes with a pre-arranged treatment bed — not a vague suggestion to 'get help'."}</AutoLinkedText>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "Early", label: "Intervention focus", icon: "ri-time-line" },
                { number: "Dual", label: "Alcohol + cocaine expertise", icon: "ri-goblet-line" },
                { number: "90+", label: "Day minimum programmes", icon: "ri-home-smile-line" },
                { number: "24 / 7", label: "Available for families", icon: "ri-alarm-warning-line" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center rounded-2xl border border-[#EFEFEF] bg-[#F5F3E7] p-7 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3E5B50] text-white">
                    <i className={`text-xl ${s.icon}`}></i>
                  </span>
                  <p className="font-heading mt-4 text-3xl font-bold text-[#3E5B50]"><AutoLinkedText>{s.number}</AutoLinkedText></p>
                  <p className="mt-1 text-xs font-medium text-[#4B4B4B]"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">Related Services</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
              You may also need{" "}
              <span className="italic text-[#507969]">these</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { slug: "drug-abuse-interventions", icon: "ri-capsule-line", name: "Drug Abuse Interventions", desc: "When cocaine is part of a broader pattern of substance use." },
              { slug: "alcohol-abuse-interventions", icon: "ri-goblet-line", name: "Alcohol Abuse Interventions", desc: "Cocaine and alcohol use together is extremely common and dangerous." },
              { slug: "dual-diagnosis-interventions", icon: "ri-link-m", name: "Dual Diagnosis Interventions", desc: "Cocaine use often masks or co-occurs with depression or bipolar disorder." },
            ].map((rel) => (
              <Link key={rel.slug} href={`/${rel.slug}`} className="group flex flex-col rounded-3xl border border-[#EFEFEF] bg-[#F5F3E7]/50 p-7 shadow-sm transition hover:border-[#8FAC87]/40 hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969] transition group-hover:bg-[#8FAC87] group-hover:text-white">
                  <i className={`${rel.icon} text-xl`}></i>
                </span>
                <h3 className="font-heading mt-5 text-xl font-bold text-[#1A1A17]">{rel.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B4B4B]"><AutoLinkedText>{rel.desc}</AutoLinkedText></p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#507969] transition group-hover:gap-2.5">
                  Learn more <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion title="Cocaine intervention questions, answered" faqs={COCAINE_FAQS} />

      <BottomCta
        title="Don't wait for the crash"
        italicWord="crash"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next."
        primaryLabel={`Call Now | ${PHONE_DISPLAY}`}
        primaryHref={PHONE_HREF}
      />
    </main>
  );
}
