import Link from "next/link";

const PHONE_DISPLAY = "949-776-7093";
const PHONE_HREF = "tel:9497767093";

const serviceLinks = [
  { label: "Alcohol Abuse Interventions", path: "/alcohol-abuse-interventions" },
  { label: "Drug Abuse Interventions", path: "/drug-abuse-interventions" },
  { label: "Mental Health Interventions", path: "/mental-health-interventions" },
  { label: "Family Interventions", path: "/family-interventions" },
  { label: "Teen Interventions", path: "/interventions-for-teens" },
  { label: "Crisis Interventions", path: "/crisis-interventions" },
  { label: "Dual Diagnosis Interventions", path: "/dual-diagnosis-interventions" },
  { label: "ARISE® Intervention", path: "/arise-intervention" },
];

const resourceLinks = [
  { label: "Intervention Quiz", path: "/intervention-quiz" },
  { label: "Codependency Assessment", path: "/codependency-assessment" },
  { label: "How To Plan an Intervention", path: "/how-to-plan-an-intervention-for-success" },
  { label: "Is It Time For An Intervention?", path: "/is-it-time-for-an-intervention" },
  { label: "Find Your Missing Loved One", path: "/find-your-missing-loved-one" },
  { label: "Intervention Blog", path: "/blog" },
  { label: "FAQs", path: "/faqs" },
];

const aboutLinks = [
  { label: "About Us", path: "/about-us" },
  { label: "Why Choose Us", path: "/why-choose-us" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-[var(--color-cream)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Addiction Interventions</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-ink-muted)]">
              Compassionate, family-centered addiction and mental health interventions.
              Trusted by more than 1,500 families nationwide.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-sage)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-sage-deep)]"
            >
              <i className="ri-phone-fill"></i>
              Call {PHONE_DISPLAY}
            </a>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
              Available 24/7
            </p>
          </div>

          <FooterColumn title="Intervention Services" links={serviceLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Company" links={aboutLinks} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--color-divider)] pt-6 text-xs text-[var(--color-ink-muted)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Addiction Interventions. All rights reserved.</p>
          <p>Accredited by The Joint Commission.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; path: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
        {title}
      </h3>
      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-sm text-[var(--color-ink)] hover:text-[var(--color-sage-deep)]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
