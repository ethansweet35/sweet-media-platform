"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Resources", path: "/resources" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="border-b border-slate-100 bg-slate-950 px-6 py-2 text-xs text-white/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span>Call anytime</span>
          <a href="mailto:hello@northboundtreatment.com" className="hover:text-white">
            hello@northboundtreatment.com
          </a>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5">
        <Link href="/" className="group">
          <div className="text-xl font-semibold tracking-tight text-slate-950">
            Northbound Treatment
          </div>
          <div className="mt-0.5 text-xs tracking-wide text-slate-500">
            Reusable client website starter
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                  active ? "text-slate-950" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="hidden rounded-full border border-slate-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 hover:bg-slate-950 hover:text-white lg:inline-flex"
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
}
