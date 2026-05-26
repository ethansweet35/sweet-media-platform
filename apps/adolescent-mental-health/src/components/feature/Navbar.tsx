"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND_LOGO, CONTAINER, SITE } from "@/lib/site";

const navLinks = [
  {
    label: "Treatment",
    path: "/treatment",
    children: [
      { label: "Virtual IOP for Teens", path: "/virtual-iop-for-teens" },
      { label: "Adolescent IOP", path: "/adolescent-iop-for-teens" },
      { label: "Online CBT", path: "/online-cognitive-behavioral-therapy" },
      { label: "Insomnia Treatment", path: "/online-insomnia-treatment-for-teens" },
      { label: "Bipolar Treatment", path: "/online-bipolar-treatment" },
    ],
  },
  {
    label: "Therapies",
    path: "/therapy",
    children: [
      { label: "Individual Therapy", path: "/therapy/individual-therapy-for-teens" },
      { label: "Group Therapy", path: "/therapy/group-therapy-with-adolescents" },
      { label: "Family Therapy", path: "/therapy/adolescent-family-therapy" },
    ],
  },
  {
    label: "Levels of Care",
    path: "/levels-of-care",
    children: [
      { label: "Anxiety", path: "/conditions/anxiety" },
      { label: "Depression", path: "/conditions/depression" },
      { label: "Trauma & PTSD", path: "/conditions/trauma-ptsd" },
      { label: "ADHD", path: "/conditions/adhd" },
      { label: "Self-Harm", path: "/conditions/self-harm" },
      { label: "School Avoidance", path: "/conditions/school-avoidance" },
    ],
  },
  {
    label: "About",
    path: "/about",
    children: [
      { label: "About Us", path: "/about" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contact" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50" style={{ fontFamily: "var(--font-montserrat)" }}>
      <div className="bg-dark px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
        Free Assessment | Verify Insurance
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
              {navLinks.map((link) => {
                const active = pathname === link.path || pathname?.startsWith(`${link.path}/`);
                return (
                  <div
                    key={link.path}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.path)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                        active ? "text-accent" : "text-ink hover:text-accent"
                      }`}
                    >
                      {link.label}
                      <i className="ri-arrow-down-s-line text-sm opacity-60" />
                    </button>

                    {openDropdown === link.path && link.children && (
                      <div className="absolute left-0 top-full mt-0 w-52 rounded-b-xl border border-t-0 border-border bg-white py-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="block px-4 py-2.5 text-sm text-body transition-colors hover:bg-surface-muted hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
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
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <p className="px-3 pb-1 pt-3 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                      {link.label}
                    </p>
                    {link.children?.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-2.5 text-sm text-body transition-colors hover:bg-surface-muted hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
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
