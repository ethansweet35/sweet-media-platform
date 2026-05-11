"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const IMG = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const levelsOfCare = [
  { label: "Drug & Alcohol Detox",                path: "/drug-alcohol-detox" },
  { label: "Partial Hospitalization Program (PHP)",path: "/partial-hospitalization-program-orange-county" },
  { label: "Intensive Outpatient Program (IOP)",   path: "/iop-program-orange-county" },
  { label: "Outpatient Program (OP)",              path: "/outpatient-program" },
  { label: "Virtual Outpatient Program",           path: "/virtual-outpatient-program" },
];

const navLinks = [
  { label: "Levels of Care", path: "/levels-of-care", dropdown: levelsOfCare },
  { label: "What We Treat",  path: "/what-we-treat" },
  { label: "About Rize",     path: "/about-rize" },
  { label: "Resources",      path: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);

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

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.path || pathname.startsWith(link.path + "/");

            if (link.dropdown) {
              return (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setLocOpen(true)}
                  onMouseLeave={() => setLocOpen(false)}
                >
                  <Link
                    href={link.path}
                    className={`flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      active ? "text-accent" : "text-ink hover:text-accent"
                    }`}
                  >
                    {link.label}
                    <i className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${locOpen ? "rotate-180" : ""}`} />
                  </Link>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      locOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="bg-cream-nav border border-soft shadow-lg w-[320px] py-2">
                      {/* Accent top bar */}
                      <div className="h-[2px] bg-accent w-full mb-1" />
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={`block px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] border-b border-soft/50 last:border-0 transition-colors ${
                            pathname === item.path
                              ? "text-accent bg-accent/5"
                              : "text-ink hover:text-accent hover:bg-accent/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-accent" : "text-ink hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-soft bg-cream-nav px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-1">
            {/* Levels of Care — expandable in mobile */}
            <div>
              <button
                onClick={() => setLocOpen(!locOpen)}
                className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink"
              >
                Levels of Care
                <i className={`ri-arrow-down-s-line text-lg transition-transform ${locOpen ? "rotate-180" : ""}`} />
              </button>
              {locOpen && (
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

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink hover:text-accent"
              >
                {link.label}
              </Link>
            ))}

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
