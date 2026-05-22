import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const strategies = [
  { icon: "ri-heart-line", title: "Educate Yourself on Addiction", body: "Understanding that addiction is a disease — not a moral failing — is the first step. The more you learn, the better equipped you'll be to respond with compassion rather than anger or shame." },
  { icon: "ri-shield-line", title: "Set Healthy Boundaries", body: "Boundaries protect both of you. Clearly communicated, consistently enforced limits about what behavior you will and won't accept are essential to prevent enabling while maintaining the relationship." },
  { icon: "ri-group-line", title: "Find Your Own Support", body: "Al-Anon, Nar-Anon, and family therapy groups exist specifically for spouses and family members of people struggling with addiction. You need community too — this is not something to carry alone." },
  { icon: "ri-forbid-line", title: "Avoid Enabling", body: "Enabling looks like covering for your spouse, providing money for substances, or making excuses. It feels like helping but delays their path to treatment. Our family services team can help you identify enabling patterns." },
  { icon: "ri-mental-health-line", title: "Encourage Treatment", body: "Express your concern from a place of love rather than ultimatum whenever possible. When the time is right, having a concrete plan — like Northbound's admissions process — makes it easier to say yes to help." },
  { icon: "ri-user-heart-line", title: "Take Care of Yourself", body: "Your own mental health, finances, and wellbeing matter. You cannot pour from an empty cup. Therapy, self-care, and maintaining your own life outside the relationship are not selfish — they are necessary." },
];

export default function SpouseOfAnAddictPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="nb-hero-overlay bg-[#3a6697] py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Family Support</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Spouse of an <span className="italic text-[#e97a52]">Addict</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Being married to someone with a substance addiction is one of life&apos;s most painful and\n            disorienting experiences. Northbound is here to help you understand what you&apos;re going\n            through — and how to support your spouse without losing yourself."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/admissions/" className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f09068]">
              Get Help Now <i className="ri-arrow-right-line" />
            </Link>
            <a href="tel:8663110003" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              <i className="ri-phone-fill" /> (866) 311-0003
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#cdd8e8] bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#cdd8e8]">
            {[
              { stat: "1 in 10", label: "Americans will struggle with addiction in their lifetime" },
              { stat: "15.4M", label: "Americans affected by alcohol use disorder" },
              { stat: "40%", label: "Of people in treatment have a co-occurring mental health disorder" },
            ].map((s) => (
              <div key={s.label} className="py-10 px-8">
                <p className="font-heading text-4xl font-bold text-[#e97a52]"><AutoLinkedText>{s.stat}</AutoLinkedText></p>
                <p className="mt-2 text-sm text-[#64748b]"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedText>{"Guidance for Spouses"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">How to Support Recovery</h2>
            <p className="mt-4 max-w-2xl text-[#64748b] leading-7">
              <AutoLinkedText>{"Our team at Northbound hopes to give you the information and tools you need to help your\n              spouse achieve a full recovery — while also protecting your own wellbeing."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {strategies.map((s) => (
              <div key={s.title} className="bg-white p-8 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#3a6697]">
                  <i className={`${s.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-xl font-bold text-[#3a6697]">{s.title}</h3>
                <p className="text-sm leading-7 text-[#64748b]"><AutoLinkedText>{s.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Services CTA */}
      <section className="bg-[#eef2f7] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#3a6697] md:text-4xl">
              Our Family Services team is here for you too.
            </h2>
            <p className="mt-3 text-[#64748b] max-w-xl">
              <AutoLinkedText>{"Northbound&apos;s family therapy program helps loved ones heal alongside their family member in treatment."}</AutoLinkedText>
            </p>
          </div>
          <Link href="/programs/family-therapy/" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            Family Services <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
