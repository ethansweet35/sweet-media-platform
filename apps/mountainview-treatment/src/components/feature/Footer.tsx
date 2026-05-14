import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

const FOOTER_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Programs",
    links: [
      { label: "Partial Hospitalization (PHP)", href: "/levels-of-care/partial-hospitalization-program/" },
      { label: "Intensive Outpatient (IOP)", href: "/levels-of-care/intensive-outpatient-program/" },
      { label: "Outpatient Program", href: "/levels-of-care/outpatient-program/" },
      { label: "All Levels of Care", href: "/levels-of-care/" },
    ],
  },
  {
    title: "What We Treat",
    links: [
      { label: "Addiction", href: "/what-we-treat/addiction/" },
      { label: "Mental Health", href: "/what-we-treat/mental-health/" },
      { label: "Anxiety", href: "/what-we-treat/mental-health/anxiety/" },
      { label: "Depression", href: "/what-we-treat/mental-health/depression/" },
      { label: "Trauma", href: "/what-we-treat/mental-health/trauma/" },
    ],
  },
  {
    title: "Therapies",
    links: [
      { label: "EMDR", href: "/therapies/emdr/" },
      { label: "Cognitive & Dialectical", href: "/therapies/cognitive-dialectical/" },
      { label: "Medication-Assisted", href: "/therapies/medication-assisted/" },
      { label: "Somatic Experiencing", href: "/therapies/somatic-experiencing/" },
      { label: "Holistic Integration", href: "/therapies/holistic-integration/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About Us", href: "/about-us/" },
      { label: "Our Team", href: "/about-us/team/" },
      { label: "Admissions", href: "/admissions/" },
      { label: "Insurance", href: "/admissions/insurance/" },
      { label: "Guides", href: "/guide/" },
      { label: "Blog", href: "/blog/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--mvt-ink)] text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex" aria-label={SITE.brand}>
              <Image
                src={SITE.assets.logoHorizontal}
                alt={SITE.brand}
                width={400}
                height={156}
                className="h-14 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
              A premier sanctuary for mental health and addiction recovery in the
              serene Pacific Northwest. Outpatient programs for adults seeking
              clinical excellence with absolute discretion.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/75">
              <a
                href={SITE.phone.href}
                className="group flex items-center gap-3 hover:text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mvt-forest)] text-white">
                  <i className="ri-phone-fill text-sm" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                    Call 24/7
                  </div>
                  <div className="font-heading text-xl text-white">
                    {SITE.phone.display}
                  </div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--mvt-forest)] text-white">
                  <i className="ri-map-pin-2-fill text-sm" aria-hidden="true" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">
                    Visit
                  </div>
                  <div className="text-sm text-white/85">
                    {SITE.address.street}
                    <br />
                    {SITE.address.cityStateZip}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-cream)]">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.brandLong}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy/" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/terms-service/" className="hover:text-white/70">
              Terms of Service
            </Link>
            <Link
              href="/hipaa-notice-of-privacy-practices/"
              className="hover:text-white/70"
            >
              HIPAA Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
