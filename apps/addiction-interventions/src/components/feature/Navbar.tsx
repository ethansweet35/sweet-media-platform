"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  path: string;
  children?: { label: string; path: string }[];
};

const navItems: NavItem[] = [
  { label: "About", path: "/about-us" },
  {
    label: "Intervention Services",
    path: "/intervention-services",
    children: [
      { label: "Alcohol Abuse Interventions", path: "/alcohol-abuse-interventions" },
      { label: "Drug Abuse Interventions", path: "/drug-abuse-interventions" },
      { label: "Mental Health Interventions", path: "/mental-health-interventions" },
      { label: "Family Interventions", path: "/family-interventions" },
      { label: "Teen Interventions", path: "/interventions-for-teens" },
      { label: "Executive Interventions", path: "/interventions-for-executives" },
      { label: "Crisis Interventions", path: "/crisis-interventions" },
      { label: "Dual Diagnosis Interventions", path: "/dual-diagnosis-interventions" },
      { label: "ARISE® Intervention", path: "/intervention-types/arise" },
    ],
  },
  {
    label: "Resources",
    path: "/resources",
    children: [
      { label: "Intervention Quiz", path: "/intervention-quiz" },
      { label: "Codependency Assessment", path: "/codependency-assessment" },
      { label: "How To Plan an Intervention", path: "/how-to-plan-an-intervention-for-success" },
      { label: "Is It Time For An Intervention?", path: "/is-it-time-for-an-intervention" },
      { label: "Find Your Missing Loved One", path: "/find-your-missing-loved-one" },
      { label: "FAQs", path: "/faqs" },
    ],
  },
  { label: "Service Areas", path: "/service-areas" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const PHONE_DISPLAY = "949-776-7093";
const PHONE_HREF = "tel:9497767093";

const LOGO_URL =
  "https://addictioninterventions.com/wp-content/uploads/2025/07/cropped-Untitled-design-2025-07-09T160603.260.png";

export default function Navbar() {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  function openMenu(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenSubmenu(label);
  }

  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenSubmenu(null), 140);
  }

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-[#8FAC87] px-6 py-2 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span className="hidden text-white/90 sm:inline">
            Available 24/7 — speak with a certified interventionist now.
          </span>
          <span className="text-white/90 sm:hidden">Available 24/7</span>
          <a
            href={PHONE_HREF}
            className="font-semibold text-white transition hover:text-white/80"
          >
            <i className="ri-phone-line mr-1.5 align-middle"></i>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-[#EFEFEF] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={LOGO_URL}
              alt="Addiction Interventions"
              width={260}
              height={60}
              className="h-14 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.path || pathname?.startsWith(item.path + "/");
              const hasChildren = !!item.children?.length;

              return (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => hasChildren && openMenu(item.label)}
                  onMouseLeave={() => hasChildren && scheduleClose()}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-0.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "text-[#6F8E68]"
                        : "text-[#1A1A17] hover:text-[#6F8E68]"
                    }`}
                  >
                    {item.label}
                    {hasChildren && (
                      <i className="ri-arrow-down-s-line text-base opacity-60"></i>
                    )}
                  </Link>

                  {hasChildren && openSubmenu === item.label && (
                    <div
                      className="absolute left-0 top-full z-50 min-w-[280px] rounded-xl border border-[#EFEFEF] bg-white p-2 shadow-xl ring-1 ring-black/[0.03]"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={scheduleClose}
                    >
                      {item.children!.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block rounded-lg px-3 py-2 text-sm text-[#4B4B4B] transition hover:bg-[#F5F3E7] hover:text-[#6F8E68]"
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

          {/* Desktop CTA */}
          <a
            href={PHONE_HREF}
            className="hidden shrink-0 items-center gap-2 rounded-full bg-[#8FAC87] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68] lg:inline-flex"
          >
            <i className="ri-phone-fill"></i>
            Call Now
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-[#1A1A17] lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="border-t border-[#EFEFEF] bg-white px-4 py-4 lg:hidden">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const hasChildren = !!item.children?.length;
                const expanded = mobileExpanded === item.label;
                return (
                  <div key={item.path}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.path}
                        className="flex-1 rounded-md px-3 py-3 text-base font-medium text-[#1A1A17] transition hover:bg-[#F5F3E7] hover:text-[#6F8E68]"
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          className="px-3 py-3 text-[#4B4B4B]"
                          aria-label={expanded ? "Collapse" : "Expand"}
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                        >
                          <i
                            className={`text-xl ${
                              expanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"
                            }`}
                          ></i>
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <div className="ml-3 grid gap-0.5 border-l border-[#EFEFEF] pl-3 pb-2">
                        {item.children!.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="rounded-md px-3 py-2 text-sm text-[#4B4B4B] transition hover:bg-[#F5F3E7] hover:text-[#6F8E68]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <a
                href={PHONE_HREF}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-5 py-3 text-sm font-semibold text-white"
              >
                <i className="ri-phone-fill"></i>
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
