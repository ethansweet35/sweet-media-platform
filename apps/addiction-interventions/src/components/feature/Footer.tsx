import Link from "next/link";

const PHONE_DISPLAY = "949-776-7093";
const PHONE_HREF = "tel:9497767093";

const serviceLinks = [
  { label: "Substance Abuse Interventions", path: "/substance-abuse-interventions" },
  { label: "Alcohol Abuse Interventions", path: "/substance-abuse-interventions/alcohol" },
  { label: "Drug Abuse Interventions", path: "/substance-abuse-interventions/drug" },
  { label: "Mental Health Interventions", path: "/mental-health-interventions" },
  { label: "Family Interventions", path: "/family-interventions" },
  { label: "Teen Interventions", path: "/interventions-for-teens" },
  { label: "Crisis Interventions", path: "/crisis-interventions" },
  { label: "Dual Diagnosis Interventions", path: "/dual-diagnosis-interventions" },
  { label: "ARISE® Intervention", path: "/intervention-types/arise" },
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
  { label: "David Gates", path: "/david-gates" },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3E5B50] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex flex-col items-start leading-none">
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Addiction Interventions
              </span>
              <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#8FAC87]">
                Intervene Today · Change Tomorrow
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Compassionate, family-centered addiction and mental health interventions.
              Trusted by more than 1,500 families nationwide.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#6F8E68]"
            >
              <i className="ri-phone-fill"></i>
              Call {PHONE_DISPLAY}
            </a>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/40">
              Available 24/7
            </p>
          </div>

          <FooterColumn title="Intervention Services" links={serviceLinks} />
          <FooterColumn title="Resources" links={resourceLinks} />
          <FooterColumn title="Company" links={aboutLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Addiction Interventions. All rights reserved.</p>
          <p>Accredited by The Joint Commission. Serving all 50 states.</p>
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
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8FAC87]">
        {title}
      </h3>
      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-sm text-white/60 transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
