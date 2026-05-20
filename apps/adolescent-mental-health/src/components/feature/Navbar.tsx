"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB = "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

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
      {/* Utility bar */}
      <div className="bg-[#000000] px-6 py-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
        Free Assessment | Verify Insurance
      </div>

      {/* Main nav */}
      <nav className="border-b border-slate-100 bg-white shadow-sm">
        <div className="px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1350px] items-center justify-between gap-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={`${SB}/amh-logo-optimized.png`}
              alt="Adolescent Mental Health"
              width={200}
              height={92}
              className="h-14 w-auto sm:h-16"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.path || pathname?.startsWith(link.path + "/");
              return (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.path)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                      active ? "text-[#83B3DC]" : "text-[#1F2124] hover:text-[#83B3DC]"
                    }`}
                  >
                    {link.label}
                    <i className="ri-arrow-down-s-line text-sm opacity-60"></i>
                  </button>

                  {openDropdown === link.path && link.children && (
                    <div className="absolute top-full left-0 mt-0 w-52 rounded-b-xl border border-t-0 border-slate-100 bg-white py-2 shadow-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block px-4 py-2.5 text-sm text-[#54595F] hover:bg-[#F4F9FC] hover:text-[#83B3DC] transition-colors"
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

          {/* CTA button */}
          <a
            href={PHONE_HREF}
            className="hidden lg:inline-flex items-center gap-2 rounded-md bg-[#000000] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#111111] transition-colors"
          >
            {PHONE}
          </a>

          {/* Mobile hamburger */}
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-md text-[#1F2124] hover:bg-[#F4F9FC]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 lg:px-10">
            <div className="mx-auto max-w-[1350px]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <p className="px-3 pt-3 pb-1 text-xs font-bold uppercase tracking-[0.15em] text-[#83B3DC]">
                    {link.label}
                  </p>
                  {link.children?.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm text-[#54595F] hover:bg-[#F4F9FC] hover:text-[#1F2124] transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <a
                href={PHONE_HREF}
                className="mt-4 flex items-center justify-center gap-2 rounded-md bg-[#000000] px-5 py-3 text-sm font-bold text-white"
              >
                <i className="ri-phone-fill"></i>
                {PHONE}
              </a>
            </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
