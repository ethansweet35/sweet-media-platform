import Link from "next/link";
import MarketingPageHero, { MarketingCtaLink } from "@/components/marketing/MarketingPageHero";

const ways = [
  {
    icon: "ri-hand-coin-line",
    title: "Donate",
    body: "Your financial contribution can help fund vital programs and resources aimed at prevention, education, and rehabilitation.",
    href: "/donate",
    cta: "Donate today",
  },
  {
    icon: "ri-quill-pen-line",
    title: "Contribute to our Blog",
    body: "Share your insights, experiences, and perspectives to raise awareness and inspire others to join the cause.",
    href: "/blog",
    cta: "Read the blog",
  },
  {
    icon: "ri-team-line",
    title: "Volunteer Leadership",
    body: "Become actively involved by volunteering your time and expertise — join a committee or offer spiritual support through prayer.",
    href: "/form-make-a-difference",
    cta: "Get involved",
  },
  {
    icon: "ri-funds-line",
    title: "Fundraising",
    body: "Organize or participate in fundraising events to mobilize resources and support our efforts to combat addiction head-on.",
    href: "/form-make-a-difference",
    cta: "Contact our team",
  },
];

const pledges = [
  "Yes… I want to prevent kids from falling victim to the grips of fentanyl addiction.",
  "Yes… I want to empower parents with the knowledge and resources they need to effectively manage drugs and alcohol within their households.",
  "Yes… I want to put an end to the heartbreaking reality of tens of thousands of lives lost each year due to fentanyl overdoses.",
  "And yes… I want to invite you to join me in supporting the invaluable work of the FRF by taking meaningful action today.",
];

export default function MakeADifferencePage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Take Action"
        title="Make a Difference"
        body="Here are some ways you can make a difference for families impacted by addiction — through giving, sharing your story, volunteering, and fundraising."
      >
        <MarketingCtaLink href="/form-make-a-difference" label="Contact us to help" primary />
      </MarketingPageHero>

      <section className="py-12 md:py-16 bg-pure-white border-b border-mist/60">
        <div className="max-w-content mx-auto px-6 lg:px-16 max-w-3xl">
          <ul className="space-y-4">
            {pledges.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tfrf-blue text-pure-white">
                  <i className="ri-check-line text-xs" />
                </span>
                <span className="text-[15px] font-body text-slate leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <h2 className="text-[26px] md:text-[32px] font-display text-deep-navy text-center mb-10">
            Ways you can help
          </h2>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {ways.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl bg-pure-white border border-mist/60 p-8 shadow-sm"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-tfrf-blue/10 text-tfrf-blue">
                  <i className={`${item.icon} text-xl`} />
                </span>
                <h3 className="text-[22px] font-display text-deep-navy mb-3">{item.title}</h3>
                <p className="text-[15px] font-body text-slate leading-relaxed mb-6">{item.body}</p>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[14px] font-body font-semibold text-tfrf-blue hover:text-deep-navy"
                >
                  {item.cta}
                  <i className="ri-arrow-right-line" />
                </Link>
              </article>
            ))}
          </div>
          <p className="text-center text-[14px] font-body text-slate mt-10 max-w-xl mx-auto">
            Support FRF with professional services such as photography, videography, and more —{" "}
            <Link href="/form-make-a-difference" className="text-tfrf-blue font-semibold hover:underline">
              contact our team
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
