"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LOGO_URL =
  "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated/Get-Simple-Health-Logo-1.svg";

export const SCHEDULE_CTA_URL =
  "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";

type NavChild = { label: string; href: string; group?: string };

type MegaMenuColumn = { heading: string; items: { label: string; href: string }[] };

type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  mega?: MegaMenuColumn[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Weight Loss",
    href: "/weight-loss/",
    children: [
      { label: "Retatrutide", href: "/retatrutide/" },
      { label: "Tirzepatide", href: "/tirzepatide/" },
      { label: "Semaglutide", href: "/semaglutide/" },
      { label: "Oral Semaglutide", href: "/oral-semaglutide/" },
    ],
  },
  {
    label: "Peptides",
    href: "/peptides/",
    mega: [
      {
        heading: "Growth Hormone",
        items: [
          { label: "Sermorelin", href: "/sermorelin/" },
          { label: "CJC / Ipamorelin", href: "/cjc-ipamorelin/" },
          { label: "Tesamorelin", href: "/tesamorelin/" },
          { label: "GHRP-6", href: "/ghrp-6/" },
          { label: "IGF-LR3", href: "/igf-lr3/" },
        ],
      },
      {
        heading: "Recovery & Healing",
        items: [
          { label: "BPC-157", href: "/bpc-157/" },
          { label: "TB-500", href: "/tb-500/" },
          { label: "Wolverine Stack", href: "/wolverine-stack/" },
          { label: "KPV", href: "/kvp/" },
          { label: "Glow Stack", href: "/glow-stack/" },
        ],
      },
      {
        heading: "Metabolic & Fat Loss",
        items: [
          { label: "NAD+", href: "/nad/" },
          { label: "MOTS-C", href: "/mots-c/" },
          { label: "AOD-9604", href: "/aod-9604/" },
          { label: "SS-31", href: "/ss-31/" },
          { label: "5-Amino-1MQ", href: "/5-amino-1mq/" },
          { label: "SLU-PP-332", href: "/slu-pp-332/" },
          { label: "Adipotide", href: "/adipotide/" },
        ],
      },
      {
        heading: "Cognitive & Neuro",
        items: [
          { label: "Semax", href: "/semax/" },
          { label: "Selank", href: "/selank/" },
          { label: "DSIP", href: "/dsip/" },
          { label: "Dihexa", href: "/dihexa/" },
          { label: "PE-22-28", href: "/pe-22-28/" },
          { label: "Pinealon", href: "/pinealon/" },
          { label: "Ara-290", href: "/ara-290/" },
        ],
      },
      {
        heading: "Sexual & Hormonal",
        items: [
          { label: "PT-141", href: "/pt-141/" },
          { label: "Oxytocin", href: "/oxytocin/" },
          { label: "Kisspeptin-10", href: "/kisspeptin-10/" },
          { label: "Melanotan II", href: "/melanotan-ii/" },
        ],
      },
      {
        heading: "Longevity & Aesthetics",
        items: [
          { label: "Thymosin Alpha-1", href: "/thymosin-alpha-1/" },
          { label: "Epithalon", href: "/epithalon/" },
          { label: "Thymalin", href: "/thymalin/" },
          { label: "GHK-Cu", href: "/ghk-cu/" },
          { label: "KLOW", href: "/klow/" },
          { label: "Glutathione", href: "/glutathione/" },
          { label: "LL-37", href: "/ll-37/" },
        ],
      },
    ],
  },
  {
    label: "Skin & Hair",
    href: "/skin-hair/",
    children: [
      { label: "Isotretinoin", href: "/isotretinoin/", group: "Skin" },
      { label: "Tretinoin", href: "/tretinoin/", group: "Skin" },
      { label: "Skin Care Routine", href: "/skin-care-routine/", group: "Skin" },
      { label: "Finasteride / Dutasteride", href: "/finasteride/", group: "Hair" },
      { label: "Minoxidil", href: "/minoxidil/", group: "Hair" },
      { label: "Red Light Laser Cap", href: "/red-light-laser-cap/", group: "Hair" },
    ],
  },
  { label: "Pricing", href: "/pricing/" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setOpenDesktop(null);
  }, [pathname]);

  useEffect(() => {
    if (!openDesktop) return;
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktop(null);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [openDesktop]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-[#FAF7F4]/95 backdrop-blur"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Simple Health home">
          <Image
            src={LOGO_URL}
            alt="Simple Health"
            width={170}
            height={36}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const hasChildren = !!(item.children?.length);
            const hasMega = !!(item.mega?.length);
            const hasDropdown = hasChildren || hasMega;
            const active = isActive(item.href);
            return (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => hasDropdown ? setOpenDesktop(item.label) : setOpenDesktop(null)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-[0.86rem] font-medium tracking-wide transition-colors ${active ? "text-[#C67B5C]" : "text-[#3A3A3A] hover:text-[#C67B5C]"}`}
                >
                  {item.label}
                  {hasDropdown && (
                    <i className={`ri-arrow-down-s-line text-base transition-transform ${openDesktop === item.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {/* Regular grouped dropdown */}
                {hasChildren && openDesktop === item.label && (
                  <div
                    className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 min-w-[16rem] overflow-hidden rounded-xl border border-[#E8E2D9] bg-white shadow-xl"
                    onMouseLeave={() => setOpenDesktop(null)}
                  >
                    {(() => {
                      const children = item.children ?? [];
                      const hasGroups = children.some((c) => c.group);
                      if (!hasGroups) {
                        return (
                          <div className="py-2">
                            {children.map((child) => (
                              <Link key={child.href} href={child.href} className="group flex items-center gap-2.5 px-5 py-2 text-sm text-[#3A3A3A] transition-colors hover:bg-[#FAF7F4] hover:text-[#C67B5C]">
                                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D9C8BF] transition-colors group-hover:bg-[#C67B5C]" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        );
                      }
                      const groups: string[] = [];
                      children.forEach((c) => { if (c.group && !groups.includes(c.group)) groups.push(c.group); });
                      return (
                        <div className="py-2">
                          {groups.map((group, gi) => (
                            <div key={group}>
                              {gi > 0 && <div className="my-1.5 border-t border-[#F0EBE4]" />}
                              <p className="px-5 pb-1 pt-2.5 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-[#C67B5C]">{group}</p>
                              {children.filter((c) => c.group === group).map((child) => (
                                <Link key={child.href} href={child.href} className="group flex items-center gap-2.5 px-5 py-1.5 text-sm text-[#3A3A3A] transition-colors hover:bg-[#FAF7F4] hover:text-[#C67B5C]">
                                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D9C8BF] transition-colors group-hover:bg-[#C67B5C]" />
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Mega-menu (Peptides) */}
                {hasMega && openDesktop === item.label && (
                  <div
                    className="fixed left-1/2 top-[62px] z-50 mt-1.5 -translate-x-1/2 w-[1140px] overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white shadow-2xl"
                    onMouseLeave={() => setOpenDesktop(null)}
                  >
                    {/* Header strip */}
                    <div className="flex items-center justify-between border-b border-[#EDE7DD] bg-gradient-to-r from-[#FAF7F4] via-[#FAF7F4] to-white px-7 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C67B5C]/10">
                          <i className="ri-capsule-line text-sm text-[#C67B5C]" />
                        </span>
                        <div>
                          <p className="text-[0.82rem] font-semibold text-[#1A1A1A]">Peptide Therapies</p>
                          <p className="text-[0.7rem] text-[#999]">35+ clinically-backed protocols</p>
                        </div>
                        <span className="ml-1 rounded-full border border-[#C67B5C]/20 bg-[#C67B5C]/8 px-2.5 py-0.5 text-[0.62rem] font-semibold text-[#C67B5C]">
                          New protocols available
                        </span>
                      </div>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#C67B5C] underline-offset-2 hover:underline"
                      >
                        Browse all peptides <i className="ri-arrow-right-line text-sm" />
                      </Link>
                    </div>

                    {/* Column grid */}
                    <div className="grid grid-cols-6 divide-x divide-[#F2EDE6] pb-5 pt-5">
                      {item.mega?.map((col) => (
                        <div key={col.heading} className="px-5">
                          <p className="mb-3 flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#C67B5C]">
                            {col.heading}
                          </p>
                          <ul className="space-y-0.5">
                            {col.items.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[0.8rem] text-[#3A3A3A] transition-all hover:bg-[#FAF7F4] hover:text-[#C67B5C]"
                                >
                                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D9C8BF] transition-colors group-hover:bg-[#C67B5C]" />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Footer CTA strip */}
                    <div className="flex items-center justify-between border-t border-[#EDE7DD] bg-gradient-to-r from-[#FAF7F4] to-white px-7 py-3">
                      <p className="text-[0.72rem] text-[#999]">
                        Not sure where to start? Our physicians build personalized peptide protocols.
                      </p>
                      <a
                        href={SCHEDULE_CTA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#C67B5C] px-4 py-1.5 text-[0.72rem] font-semibold text-white transition hover:bg-[#A66647]"
                      >
                        Schedule Consultation <i className="ri-arrow-right-line" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <a
          href={SCHEDULE_CTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-[#A66647] hover:shadow-md"
        >
          Schedule Consultation
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full p-2 text-[#3A3A3A] lg:hidden"
        >
          <i className={`text-2xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8E2D9] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-3">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const hasChildren = !!(item.children?.length);
                const hasMega = !!(item.mega?.length);
                const hasDropdown = hasChildren || hasMega;
                const isExpanded = mobileExpanded === item.label;
                return (
                  <li key={item.href} className="border-b border-[#F2EDE5] last:border-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="flex-1 py-3 text-base font-medium text-[#3A3A3A]"
                      >
                        {item.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          type="button"
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={isExpanded}
                          onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                          className="p-3 text-[#6B7456]"
                        >
                          <i className={`ri-arrow-down-s-line text-xl transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    {/* Regular children */}
                    {hasChildren && isExpanded && (
                      <ul className="pb-3 pl-4 -mt-1">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} className="block py-2 text-sm text-[#555555] hover:text-[#C67B5C]">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* Mega-menu mobile: flat list with group labels */}
                    {hasMega && isExpanded && (
                      <div className="pb-3 pl-4 -mt-1">
                        {item.mega?.map((col) => (
                          <div key={col.heading} className="mt-2">
                            <p className="py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#C67B5C]">{col.heading}</p>
                            {col.items.map((child) => (
                              <Link key={child.href} href={child.href} className="block py-1.5 text-sm text-[#555] hover:text-[#C67B5C]">
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href={SCHEDULE_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 mb-3 flex w-full items-center justify-center gap-2 rounded-md bg-[#C67B5C] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
