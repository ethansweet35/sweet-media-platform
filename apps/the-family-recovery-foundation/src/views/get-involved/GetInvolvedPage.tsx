import Link from "next/link";
import MarketingPageHero, { MarketingCtaLink } from "@/components/marketing/MarketingPageHero";

const ways = [
  {
    icon: "ri-heart-line",
    title: "Donate",
    body: "Your financial contribution funds vital programs and resources aimed at prevention, education, and family support.",
    href: "/donate",
    cta: "Donate today",
  },
  {
    icon: "ri-quill-pen-line",
    title: "Share your story",
    body: "Contribute to our blog or share experiences to raise awareness and inspire other families on the recovery journey.",
    href: "/blog",
    cta: "Read the blog",
  },
  {
    icon: "ri-team-line",
    title: "Volunteer",
    body: "Join a committee, offer professional services, or provide spiritual support — your time strengthens our mission on the ground.",
    href: "/form-make-a-difference",
    cta: "Volunteer with us",
  },
  {
    icon: "ri-funds-line",
    title: "Fundraise",
    body: "Organize or participate in events that mobilize resources for families impacted by addiction.",
    href: "/make-a-difference",
    cta: "Ways to help",
  },
  {
    icon: "ri-hand-heart-line",
    title: "Partner with us",
    body: "Treatment centers and community organizations collaborate on programming, events, and resource sharing.",
    href: "/partnerships",
    cta: "View partnerships",
  },
  {
    icon: "ri-phone-line",
    title: "Connect a family",
    body: "Share our resources with someone who needs help, or introduce us to your community.",
    href: "/contact",
    cta: "Contact us",
  },
];

export default function GetInvolvedPage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Get Involved"
        title="Join us in standing with families"
        body="Whether you give, volunteer, partner, or share our mission — you help create generational change for families impacted by addiction."
      >
        <MarketingCtaLink href="/make-a-difference" label="Make a difference" primary />
      </MarketingPageHero>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {ways.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-2xl border border-mist bg-pure-white p-8 shadow-sm"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-tfrf-blue/10 text-tfrf-blue">
                  <i className={`${item.icon} text-xl`} />
                </span>
                <h2 className="text-[20px] font-display text-deep-navy mb-3">{item.title}</h2>
                <p className="text-[15px] font-body text-slate leading-relaxed mb-6 flex-1">{item.body}</p>
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
        </div>
      </section>
    </main>
  );
}
