"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

const IMG = "https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const levelsOfCare = [
  { label: "Drug & Alcohol Detox",                 path: "/drug-alcohol-detox" },
  { label: "Partial Hospitalization Program (PHP)", path: "/partial-hospitalization-program-orange-county" },
  { label: "Intensive Outpatient Program (IOP)",    path: "/iop-program-orange-county" },
  { label: "Outpatient Program (OP)",               path: "/outpatient-program" },
  { label: "Virtual Outpatient Program",            path: "/virtual-outpatient-program" },
];

const addictionSubs = [
  { label: "Alcohol Addiction",       path: "/addiction/alcohol" },
  { label: "Benzodiazepine Addiction",path: "/addiction/benzodiazepine" },
  { label: "Cocaine Addiction",       path: "/addiction/cocaine" },
  { label: "Hallucinogen Addiction",  path: "/addiction/hallucinogen" },
  { label: "Inhalant Addiction",      path: "/addiction/inhalant" },
  { label: "Meth Addiction",          path: "/addiction/meth" },
  { label: "Opiate Addiction",        path: "/addiction/opiate" },
  { label: "Xanax Addiction",         path: "/addiction/xanax" },
];

const mentalHealthSubs = [
  { label: "ADHD",                          path: "/mental-health/adhd" },
  { label: "Anxiety",                       path: "/mental-health/anxiety" },
  { label: "Bipolar Disorder",              path: "/mental-health/bipolar-disorder" },
  { label: "Borderline Personality Disorder", path: "/mental-health/borderline-personality-disorder" },
  { label: "Depression",                    path: "/mental-health/depression" },
  { label: "Insomnia",                      path: "/mental-health/insomnia" },
  { label: "OCD",                           path: "/mental-health/ocd" },
  { label: "Post Traumatic Stress Disorder",path: "/mental-health/ptsd" },
  { label: "Schizophrenia",                 path: "/mental-health/schizophrenia" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  const [treatOpen, setTreatOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [mhOpen, setMhOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const addTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mhTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aboutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resourcesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile accordion states
  const [mobileLocOpen, setMobileLocOpen] = useState(false);
  const [mobileTreatOpen, setMobileTreatOpen] = useState(false);
  const [mobileAddOpen, setMobileAddOpen] = useState(false);
  const [mobileMhOpen, setMobileMhOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const isLOCActive = [
    "/drug-alcohol-detox", "/partial-hospitalization-program-orange-county",
    "/iop-program-orange-county", "/outpatient-program",
    "/virtual-outpatient-program", "/levels-of-care",
  ].some((p) => pathname === p || pathname.startsWith(p + "/"));

  const isTreatActive = pathname.startsWith("/addiction") || pathname.startsWith("/mental-health");

  const handleAddEnter = () => {
    if (addTimer.current) clearTimeout(addTimer.current);
    setAddOpen(true);
  };
  const handleAddLeave = () => {
    addTimer.current = setTimeout(() => setAddOpen(false), 120);
  };
  const handleMhEnter = () => {
    if (mhTimer.current) clearTimeout(mhTimer.current);
    setMhOpen(true);
  };
  const handleMhLeave = () => {
    mhTimer.current = setTimeout(() => setMhOpen(false), 120);
  };
  const handleAboutEnter = () => {
    if (aboutTimer.current) clearTimeout(aboutTimer.current);
    setAboutOpen(true);
  };
  const handleAboutLeave = () => {
    aboutTimer.current = setTimeout(() => setAboutOpen(false), 120);
  };
  const handleResourcesEnter = () => {
    if (resourcesTimer.current) clearTimeout(resourcesTimer.current);
    setResourcesOpen(true);
  };
  const handleResourcesLeave = () => {
    resourcesTimer.current = setTimeout(() => setResourcesOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-nav">
      <nav className="mx-auto flex max-w-[1300px] w-full items-center justify-between gap-5 px-6 py-[34px]">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={`${IMG}/rize-logo.png`}
            alt="Rize OC"
            width={200}
            height={70}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* ── Desktop nav ──────────────────────────────────────────────── */}
        <div className="hidden items-center gap-8 lg:flex">

          {/* Levels of Care */}
          <div
            className="relative"
            onMouseEnter={() => setLocOpen(true)}
            onMouseLeave={() => setLocOpen(false)}
          >
            <Link
              href="/levels-of-care"
              className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                isLOCActive ? "text-accent" : "text-ink hover:text-accent"
              }`}
            >
              Levels of Care
              <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${locOpen ? "rotate-180" : ""}`} />
            </Link>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                locOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-cream-nav border border-soft shadow-lg w-[340px] py-2">
                <div className="h-[2px] bg-accent w-full mb-1" />
                {levelsOfCare.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`block px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 last:border-0 transition-colors ${
                      pathname === item.path ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* What We Treat — two-level: Addiction has nested flyout */}
          <div
            className="relative"
            onMouseEnter={() => setTreatOpen(true)}
            onMouseLeave={() => { setTreatOpen(false); setAddOpen(false); }}
          >
            <button
              className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                isTreatActive ? "text-accent" : "text-ink hover:text-accent"
              }`}
            >
              What We Treat
              <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${treatOpen ? "rotate-180" : ""}`} />
            </button>

            {/* First-level dropdown */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                treatOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-cream-nav border border-soft shadow-lg w-[200px] py-2">
                <div className="h-[2px] bg-accent w-full mb-1" />

                {/* Addiction — has nested flyout */}
                <div
                  className="relative"
                  onMouseEnter={handleAddEnter}
                  onMouseLeave={handleAddLeave}
                >
                  <div
                    className={`flex items-center justify-between px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 transition-colors cursor-pointer ${
                      pathname.startsWith("/addiction") ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    <Link href="/addiction" className="flex-1">Addiction</Link>
                    <i className="ri-arrow-right-s-line text-xs opacity-50 ml-2" />
                  </div>

                  {/* Second-level flyout — appears to the right */}
                  <div
                    className={`absolute top-0 left-full pl-1 transition-all duration-150 ${
                      addOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-1 pointer-events-none"
                    }`}
                    onMouseEnter={handleAddEnter}
                    onMouseLeave={handleAddLeave}
                  >
                    <div className="bg-cream-nav border border-soft shadow-lg w-[240px] py-2">
                      <div className="h-[2px] bg-accent w-full mb-1" />
                      {addictionSubs.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`block px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 last:border-0 transition-colors ${
                            pathname === item.path ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mental Health — has nested flyout */}
                <div
                  className="relative"
                  onMouseEnter={handleMhEnter}
                  onMouseLeave={handleMhLeave}
                >
                  <div
                    className={`flex items-center justify-between px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] transition-colors cursor-pointer ${
                      pathname.startsWith("/mental-health") ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    <Link href="/mental-health" className="flex-1">Mental Health</Link>
                    <i className="ri-arrow-right-s-line text-xs opacity-50 ml-2" />
                  </div>

                  {/* MH second-level flyout */}
                  <div
                    className={`absolute top-0 left-full pl-1 transition-all duration-150 ${
                      mhOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 -translate-x-1 pointer-events-none"
                    }`}
                    onMouseEnter={handleMhEnter}
                    onMouseLeave={handleMhLeave}
                  >
                    <div className="bg-cream-nav border border-soft shadow-lg w-[280px] py-2">
                      <div className="h-[2px] bg-accent w-full mb-1" />
                      {mentalHealthSubs.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`block px-6 py-3 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 last:border-0 transition-colors ${
                            pathname === item.path ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Rize — dropdown */}
          <div
            className="relative"
            onMouseEnter={handleAboutEnter}
            onMouseLeave={handleAboutLeave}
          >
            <button
              className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                pathname.startsWith("/about") || pathname === "/telehealth-schedule" || pathname === "/in-person-schedule" || pathname === "/our-team"
                  ? "text-accent"
                  : "text-ink hover:text-accent"
              }`}
            >
              About Rize
              <i className="ri-arrow-down-s-line text-sm opacity-60" />
            </button>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-150 ${
                aboutOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-cream-nav border border-soft shadow-lg w-[240px] py-2">
                <div className="h-[2px] bg-accent w-full mb-1" />
                {[
                  { label: "About Rize",          path: "/about" },
                  { label: "Our Team",            path: "/our-team" },
                  { label: "Telehealth Schedule", path: "/telehealth-schedule" },
                  { label: "In-Person Schedule",  path: "/in-person-schedule" },
                ].map(({ label, path }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`block px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 last:border-0 transition-colors ${
                      pathname === path ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={handleResourcesEnter}
            onMouseLeave={handleResourcesLeave}
          >
            <button
              className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                pathname.startsWith("/resources") || pathname === "/verify-insurance" || pathname.startsWith("/service-areas") || pathname === "/employee-assistance-program"
                  ? "text-accent"
                  : "text-ink hover:text-accent"
              }`}
            >
              Resources
              <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                resourcesOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-cream-nav border border-soft shadow-lg w-[290px] py-2">
                <div className="h-[2px] bg-accent w-full mb-1" />
                {[
                  { label: "Verify Insurance",            path: "/verify-insurance" },
                  { label: "Service Areas",               path: "/service-areas" },
                  { label: "Employee Assistance (EAP)",   path: "/employee-assistance-program" },
                ].map(({ label, path }) => (
                  <Link
                    key={path}
                    href={path}
                    className={`block px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 last:border-0 transition-colors ${
                      pathname === path ? "text-accent bg-accent/5" : "text-ink hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a
            href="tel:9494612620"
            className="ml-2 rounded-sm bg-ink px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:bg-ink/80 transition-colors whitespace-nowrap"
          >
            (949)-461-2620
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={menuOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"} />
        </button>
      </nav>

      {/* ── Mobile menu ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <div className="border-t border-soft bg-cream-nav px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">

            {/* Levels of Care */}
            <div>
              <button
                onClick={() => setMobileLocOpen(!mobileLocOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink"
              >
                Levels of Care
                <i className={`ri-arrow-down-s-line text-lg transition-transform ${mobileLocOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileLocOpen && (
                <div className="mb-2 border-l-2 border-accent pl-4 flex flex-col gap-1">
                  {levelsOfCare.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-ink/70 hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* What We Treat */}
            <div>
              <button
                onClick={() => setMobileTreatOpen(!mobileTreatOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink"
              >
                What We Treat
                <i className={`ri-arrow-down-s-line text-lg transition-transform ${mobileTreatOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileTreatOpen && (
                <div className="mb-2 border-l-2 border-accent pl-4 flex flex-col gap-1">
                  {/* Addiction sub-section */}
                  <button
                    onClick={() => setMobileAddOpen(!mobileAddOpen)}
                    className="w-full flex items-center justify-between py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-ink/70"
                  >
                    Addiction
                    <i className={`ri-arrow-down-s-line text-base transition-transform ${mobileAddOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileAddOpen && (
                    <div className="mb-1 border-l-2 border-accent/40 pl-3 flex flex-col gap-1">
                      <Link
                        href="/addiction"
                        onClick={() => setMenuOpen(false)}
                        className="py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/60 hover:text-accent"
                      >
                        All Addiction
                      </Link>
                      {addictionSubs.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/60 hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Mental Health sub-section */}
                  <button
                    onClick={() => setMobileMhOpen(!mobileMhOpen)}
                    className="w-full flex items-center justify-between py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-ink/70"
                  >
                    Mental Health
                    <i className={`ri-arrow-down-s-line text-base transition-transform ${mobileMhOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileMhOpen && (
                    <div className="mb-1 border-l-2 border-accent/40 pl-3 flex flex-col gap-1">
                      <Link
                        href="/mental-health"
                        onClick={() => setMenuOpen(false)}
                        className="py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/60 hover:text-accent"
                      >
                        All Mental Health
                      </Link>
                      {mentalHealthSubs.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-ink/60 hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* About Rize — mobile accordion */}
            <div>
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink"
              >
                About Rize
                <i className={`ri-arrow-down-s-line text-lg transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAboutOpen && (
                <div className="mb-2 border-l-2 border-accent pl-4 flex flex-col gap-1">
                  {[
                  { label: "About Rize",          path: "/about" },
                  { label: "Our Team",            path: "/our-team" },
                  { label: "Telehealth Schedule", path: "/telehealth-schedule" },
                  { label: "In-Person Schedule",  path: "/in-person-schedule" },
                ].map(({ label, path }) => (
                    <Link
                      key={path}
                      href={path}
                      onClick={() => setMenuOpen(false)}
                      className={`py-2.5 text-sm font-medium uppercase tracking-[0.15em] transition-colors ${
                        pathname === path ? "text-accent" : "text-ink/70 hover:text-accent"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources — mobile accordion */}
            <div>
              <button
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink"
              >
                Resources
                <i className={`ri-arrow-down-s-line text-lg transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileResourcesOpen && (
                <div className="mb-2 border-l-2 border-accent pl-4 flex flex-col gap-1">
                  {[
                    { label: "Verify Insurance",           path: "/verify-insurance" },
                    { label: "Service Areas",              path: "/service-areas" },
                    { label: "Employee Assistance (EAP)",  path: "/employee-assistance-program" },
                  ].map(({ label, path }) => (
                    <Link
                      key={path}
                      href={path}
                      onClick={() => setMenuOpen(false)}
                      className={`py-2.5 text-sm font-medium uppercase tracking-[0.15em] transition-colors ${
                        pathname === path ? "text-accent" : "text-ink/70 hover:text-accent"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="tel:9494612620"
              className="mt-3 inline-block rounded-sm bg-ink px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-white"
            >
              (949)-461-2620
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
