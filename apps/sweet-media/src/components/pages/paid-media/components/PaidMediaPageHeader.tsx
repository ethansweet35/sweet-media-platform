"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Industries", href: "/#industries" },
  { label: "Results", href: "/#results" },
  { label: "About", href: "/#difference" },
  { label: "Contact", href: "/#getting-started" },
];

export default function PaidMediaPageHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      router.push("/");
      setTimeout(() => {
        const el = document.querySelector(href.replace("/", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white border-b ${scrolled ? "border-neutral-200 shadow-sm" : "border-neutral-100"}`}>
      <div className="w-full">
        <div className="max-w-screen-xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="https://ynmldknprfusujudvutq.supabase.co/storage/v1/object/public/public_bucket/sweet%20media%20logo.png"
              alt="Sweet Media Logo"
              width={200}
              height={48}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap text-neutral-400 hover:text-black"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+17143005115" className="text-[11px] tracking-widest font-mono transition-colors whitespace-nowrap text-neutral-400 hover:text-black">
              (714) 300-5115
            </a>
            <a
              href="#paid-contact"
              className="text-[11px] tracking-[0.18em] uppercase font-bold px-5 py-2.5 rounded-full transition-colors cursor-pointer whitespace-nowrap bg-black text-white hover:bg-neutral-800"
            >
              Free Media Audit
            </a>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl text-black ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                className="text-[11px] tracking-[0.2em] uppercase font-medium text-neutral-400 hover:text-black text-left cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-neutral-100 flex flex-col gap-3">
              <a href="tel:+17143005115" className="text-[11px] text-neutral-400 font-mono">(714) 300-5115</a>
              <a href="#paid-contact" className="bg-black text-white text-[11px] tracking-[0.18em] uppercase font-bold px-5 py-3 rounded-full text-center cursor-pointer whitespace-nowrap">
                Free Media Audit
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
