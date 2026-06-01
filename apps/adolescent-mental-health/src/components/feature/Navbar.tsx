"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { INSURANCE_CARRIER_PATHS } from "@/lib/insurance-carrier-pages";
import { BRAND_LOGO, CONTAINER, INSURANCE_LOGOS, SITE } from "@/lib/site";

type MegaLink = {
  label: string;
  path: string;
  icon?: string;
  prominent?: boolean;
};

type MegaMenuConfig = {
  path: string;
  label: string;
  widthClass?: string;
  left: {
    eyebrow: string;
    links: MegaLink[];
    description: string;
  };
  right: {
    eyebrow: string;
    links: { label: string; path: string }[];
    compact?: boolean;
  };
};

const CARRIER_LABELS: Record<string, string> = {
  aetna: "Aetna",
  cigna: "Cigna",
  anthem: "Anthem",
  becn: "Beacon",
  umr: "UMR",
};

const INSURANCE_NAV_PATH = "/verify-insurance";

const insuranceCarriers = (Object.keys(INSURANCE_LOGOS) as (keyof typeof INSURANCE_LOGOS)[]).map(
  (key) => ({
    key,
    label: CARRIER_LABELS[key] ?? key,
    logo: INSURANCE_LOGOS[key],
    path: INSURANCE_CARRIER_PATHS[key],
  }),
);

const treatmentPrograms = [
  { label: "Teen Depression Treatment", path: "/teen-depression-treatment" },
  { label: "PTSD Treatment Online", path: "/ptsd-treatment-online" },
  { label: "Online Bipolar Treatment", path: "/online-bipolar-treatment" },
  { label: "Online OCD Treatment", path: "/online-ocd-treatment" },
  { label: "Online Anxiety Treatment", path: "/online-anxiety-treatment" },
  { label: "ADHD Treatment for Teens", path: "/adhd-treatment-for-teens" },
  { label: "Self-Harm Support", path: "/conditions/self-harm" },
  { label: "School Avoidance", path: "/conditions/school-avoidance" },
  { label: "LGBTQ+ Teen Mental Health", path: "/lgbtq-teen-mental-health" },
  { label: "Online Insomnia Treatment", path: "/online-insomnia-treatment-for-teens" },
  { label: "Schizophrenia in Adolescence", path: "/schizophrenia-in-adolescence" },
  { label: "Psychiatrist for Teens", path: "/psychiatrist-for-teens" },
];

const therapyLinks = [
  { label: "Cognitive Behavioral Therapy", path: "/online-cognitive-behavioral-therapy" },
  { label: "Dialectical Behavioral Therapy", path: "/online-dialectical-behavioral-therapy" },
  { label: "Individual Therapy", path: "/therapy/individual-therapy-for-teens" },
  { label: "Group Therapy", path: "/therapy/group-therapy-with-adolescents" },
  { label: "Family Therapy", path: "/therapy/adolescent-family-therapy" },
];

const levelsLinks = [
  { label: "Virtual IOP for Teens", path: "/virtual-iop-for-teens" },
  { label: "Adolescent IOP for Teens", path: "/adolescent-iop-for-teens" },
];

const aboutLinks = [
  { label: "Resources", path: "/resources" },
  { label: "Blog", path: "/blog" },
];

const megaMenus: MegaMenuConfig[] = [
  {
    path: "/treatment",
    label: "Treatment",
    widthClass: "w-[540px]",
    left: {
      eyebrow: "Overview",
      links: [
        { label: "All Treatment Programs", path: "/treatment", icon: "ri-heart-pulse-line", prominent: true },
        { label: "Admissions", path: "/admissions", icon: "ri-file-list-3-line" },
        { label: "Verify Insurance", path: INSURANCE_NAV_PATH, icon: "ri-shield-check-line" },
      ],
      description: `Evidence-based Virtual IOP for teens ages ${SITE.ages}. Most conditions we treat are covered by insurance.`,
    },
    right: {
      eyebrow: "Conditions we treat",
      links: treatmentPrograms,
      compact: true,
    },
  },
  {
    path: "/therapy",
    label: "Therapies",
    left: {
      eyebrow: "Overview",
      links: [
        { label: "All Therapies", path: "/therapy", icon: "ri-brain-line", prominent: true },
        { label: "Admissions", path: "/admissions", icon: "ri-file-list-3-line" },
      ],
      description: "CBT, DBT, and family-inclusive modalities delivered online by licensed clinicians who specialize in adolescent care.",
    },
    right: {
      eyebrow: "Therapy types",
      links: therapyLinks,
    },
  },
  {
    path: "/levels-of-care",
    label: "Levels of Care",
    left: {
      eyebrow: "Overview",
      links: [
        { label: "Compare Levels of Care", path: "/levels-of-care", icon: "ri-stack-line", prominent: true },
        { label: "Free Assessment", path: "/contact", icon: "ri-calendar-check-line" },
      ],
      description: "Structured outpatient support that fits school schedules — with more clinical hours than weekly therapy alone.",
    },
    right: {
      eyebrow: "Programs",
      links: levelsLinks,
    },
  },
  {
    path: INSURANCE_NAV_PATH,
    label: "Insurance",
    left: {
      eyebrow: "Get started",
      links: [
        { label: "Verify Insurance", path: INSURANCE_NAV_PATH, icon: "ri-shield-check-line", prominent: true },
        { label: "Admissions", path: "/admissions", icon: "ri-file-list-3-line" },
      ],
      description: `Free benefits review for teens ages ${SITE.ages}. Most major plans cover Virtual IOP.`,
    },
    right: {
      eyebrow: "Coverage by plan",
      links: [],
    },
  },
  {
    path: "/about",
    label: "About",
    left: {
      eyebrow: "Overview",
      links: [
        { label: "About Us", path: "/about", icon: "ri-information-line", prominent: true },
        { label: "Admissions", path: "/admissions", icon: "ri-file-list-3-line" },
        { label: "Contact Us", path: "/contact", icon: "ri-mail-line" },
      ],
      description: "Virtual adolescent mental health care built for families — transparent admissions, clinical expertise, and ongoing parent support.",
    },
    right: {
      eyebrow: "Learn more",
      links: aboutLinks,
    },
  },
];

/** Flat list for mobile accordion sections */
const mobileNavSections = megaMenus.map((menu) => ({
  label: menu.label,
  path: menu.path,
  leftLinks: menu.left.links,
  rightLinks: menu.right.links,
  rightEyebrow: menu.right.eyebrow,
  isInsurance: menu.path === INSURANCE_NAV_PATH,
}));

function leftLinkClass(prominent?: boolean) {
  return prominent
    ? "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white hover:text-accent"
    : "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-body transition-colors hover:bg-white hover:text-accent";
}

function rightLinkClass(compact?: boolean) {
  return compact
    ? "block rounded-md px-2 py-1.5 text-xs leading-snug text-body transition-colors hover:bg-surface-muted hover:text-accent"
    : "block rounded-lg px-3 py-2 text-sm text-body transition-colors hover:bg-surface-muted hover:text-accent";
}

function NavMegaMenu({ config, onNavigate }: { config: MegaMenuConfig; onNavigate?: () => void }) {
  const isInsurance = config.path === INSURANCE_NAV_PATH;
  const width = config.widthClass ?? "w-[480px]";

  return (
    <div className="absolute left-1/2 top-full z-50 mt-1 -translate-x-1/2 pt-1">
      <div className={`grid ${width} grid-cols-2 overflow-hidden rounded-xl border border-border bg-white shadow-xl`}>
        <div className="border-r border-border bg-surface-muted/40 px-5 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{config.left.eyebrow}</p>
          <div className="mt-4 space-y-1">
            {config.left.links.map((link) => (
              <Link
                key={`${link.path}-${link.label}`}
                href={link.path}
                onClick={onNavigate}
                className={leftLinkClass(link.prominent)}
              >
                {link.icon ? <i className={`${link.icon} text-accent`} aria-hidden /> : null}
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-body">{config.left.description}</p>
        </div>

        <div className="px-5 py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{config.right.eyebrow}</p>

          {isInsurance ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {insuranceCarriers.map((carrier) => (
                <Link
                  key={carrier.key}
                  href={carrier.path}
                  onClick={onNavigate}
                  className="flex flex-col items-center rounded-xl border border-border bg-white px-2 py-2.5 text-center transition hover:border-accent/40 hover:shadow-sm"
                >
                  <Image
                    src={carrier.logo}
                    alt={`${carrier.label} insurance logo`}
                    width={88}
                    height={36}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="mt-1.5 text-[10px] font-semibold text-ink">{carrier.label}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className={`mt-4 ${config.right.compact ? "grid grid-cols-2 gap-x-2 gap-y-0.5" : "space-y-1"}`}
            >
              {config.right.links.map((link) => (
                <Link
                  key={`${link.path}-${link.label}`}
                  href={link.path}
                  onClick={onNavigate}
                  className={rightLinkClass(config.right.compact)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function isNavActive(pathname: string | null, config: MegaMenuConfig) {
  if (config.path === INSURANCE_NAV_PATH) {
    return pathname === INSURANCE_NAV_PATH || pathname?.startsWith("/insurance/") === true;
  }

  const allPaths = [
    config.path,
    ...config.left.links.map((l) => l.path),
    ...config.right.links.map((l) => l.path),
  ];

  return allPaths.some(
    (path) => pathname === path || (path !== "/" && pathname?.startsWith(`${path}/`)),
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50" style={{ fontFamily: "var(--font-montserrat)" }}>
      <div className="bg-dark px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
        Free Assessment |{" "}
        <Link href={INSURANCE_NAV_PATH} className="transition-colors hover:text-white">
          Verify Insurance
        </Link>
      </div>

      <nav className="border-b border-border bg-white shadow-sm">
        <div className="px-6 lg:px-10">
          <div className={`${CONTAINER} flex items-center justify-between gap-6 py-3`}>
            <Link href="/" className="flex-shrink-0">
              <Image
                src={BRAND_LOGO}
                alt="Adolescent Mental Health"
                width={200}
                height={92}
                className="h-14 w-auto sm:h-16"
                priority
              />
            </Link>

            <div className="hidden items-center lg:flex">
              {megaMenus.map((menu) => {
                const active = isNavActive(pathname, menu);

                return (
                  <div
                    key={menu.path}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(menu.path)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <Link
                      href={menu.path}
                      className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                        active ? "text-accent" : "text-ink hover:text-accent"
                      }`}
                    >
                      {menu.label}
                      <i className="ri-arrow-down-s-line text-sm opacity-60" />
                    </Link>

                    {openDropdown === menu.path ? <NavMegaMenu config={menu} /> : null}
                  </div>
                );
              })}
            </div>

            <a
              href={SITE.phone.href}
              className="hidden items-center gap-2 rounded-md bg-dark px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-cta-hover lg:inline-flex"
            >
              {SITE.phone.display}
            </a>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-muted lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-white px-6 py-4 lg:hidden lg:px-10">
            <div className={CONTAINER}>
              <div className="flex flex-col gap-1">
                {mobileNavSections.map((section) => (
                  <div key={section.path}>
                    <Link
                      href={section.path}
                      onClick={closeMobile}
                      className="block px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-[0.15em] text-accent"
                    >
                      {section.label}
                    </Link>

                    {section.leftLinks.map((link) => (
                      <Link
                        key={`${link.path}-${link.label}`}
                        href={link.path}
                        onClick={closeMobile}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-colors hover:bg-surface-muted ${
                          link.prominent ? "font-semibold text-ink" : "text-body hover:text-ink"
                        }`}
                      >
                        {link.icon ? <i className={`${link.icon} text-accent`} aria-hidden /> : null}
                        {link.label}
                      </Link>
                    ))}

                    {section.isInsurance ? (
                      <>
                        <p className="px-4 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                          {section.rightEyebrow}
                        </p>
                        <div className="grid grid-cols-2 gap-2 px-4 pb-2">
                          {insuranceCarriers.map((carrier) => (
                            <Link
                              key={carrier.key}
                              href={carrier.path}
                              onClick={closeMobile}
                              className="flex flex-col items-center rounded-xl border border-border bg-surface px-2 py-3 text-center"
                            >
                              <Image
                                src={carrier.logo}
                                alt={`${carrier.label} insurance logo`}
                                width={88}
                                height={36}
                                className="h-7 w-auto object-contain"
                              />
                              <span className="mt-2 text-[11px] font-semibold text-ink">{carrier.label}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : section.rightLinks.length > 0 ? (
                      <>
                        <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
                          {section.rightEyebrow}
                        </p>
                        {section.rightLinks.map((link) => (
                          <Link
                            key={`${link.path}-${link.label}`}
                            href={link.path}
                            onClick={closeMobile}
                            className="block rounded-lg px-4 py-2.5 text-sm text-body transition-colors hover:bg-surface-muted hover:text-ink"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </>
                    ) : null}
                  </div>
                ))}

                <a
                  href={SITE.phone.href}
                  className="mt-4 flex items-center justify-center gap-2 rounded-md bg-dark px-5 py-3 text-sm font-bold text-white"
                >
                  <i className="ri-phone-fill" />
                  {SITE.phone.display}
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
