'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Levels of Care', path: '/levels-of-care' },
  { label: 'What We Treat', path: '/what-we-treat' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Resources', path: '/resources' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = scrolled || !isHome;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${solid ? 'bg-[#F5F1EB] shadow-sm' : 'bg-transparent'}`}>

      {/* ── Top utility bar ── */}
      <div className={`hidden lg:block w-full transition-all duration-500 ${solid ? 'bg-[#1C3A5C]' : 'bg-[#1C3A5C]/75 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+16190000000"
              className="flex items-center gap-2 text-[#F5F1EB]/65 hover:text-[#C47F6A] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-phone-line text-xs"></i>
              <span className="text-[11px] font-light tracking-wide">(619) 000-0000</span>
            </a>
            <a
              href="mailto:admissions@mentalhealthforteens.com"
              className="flex items-center gap-2 text-[#F5F1EB]/65 hover:text-[#C47F6A] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-mail-line text-xs"></i>
              <span className="text-[11px] font-light tracking-wide">admissions@mentalhealthforteens.com</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[11px] text-[#F5F1EB]/45 font-light">
              <span className="text-[#C47F6A] font-medium">Accepting new clients</span> — Serving all of California
            </span>
            <div className="flex items-center gap-3">
              {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line'].map((icon) => (
                <a key={icon} href="#" className="text-[#F5F1EB]/45 hover:text-[#C47F6A] transition-colors duration-200 cursor-pointer">
                  <i className={`${icon} text-xs`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col cursor-pointer group">
          <span
            className={`font-serif font-bold leading-none tracking-tight transition-colors duration-500 ${solid ? 'text-[#1C3A5C]' : 'text-[#F5F1EB]'}`}
            style={{ fontSize: '18px', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Mental Health
          </span>
          <span
            className="font-serif font-bold leading-none tracking-tight transition-colors duration-300 group-hover:text-[#C47F6A]"
            style={{ fontSize: '18px', color: '#6B9EB5', fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            For Teens
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[11px] uppercase tracking-widest font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer ${
                pathname === link.path
                  ? 'text-[#C47F6A]'
                  : solid
                  ? 'text-[#2C4558] hover:text-[#C47F6A]'
                  : 'text-[#F5F1EB]/85 hover:text-[#F5F1EB]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className={`hidden lg:inline-flex whitespace-nowrap cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-medium transition-all duration-300 ${
              solid
                ? 'bg-[#C47F6A] text-[#F5F1EB] hover:bg-[#1C3A5C]'
                : 'bg-[#F5F1EB]/15 border border-[#F5F1EB]/40 text-[#F5F1EB] hover:bg-[#F5F1EB] hover:text-[#1C3A5C] backdrop-blur-sm'
            }`}
          >
            Get Started
            <i className="ri-arrow-right-line text-xs"></i>
          </Link>

          <button
            className={`lg:hidden w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-300 ${solid ? 'text-[#1C3A5C]' : 'text-[#F5F1EB]'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: '#F5F1EB', borderTop: '1px solid #EAE4D6' }}
      >
        <div className="px-8 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-[11px] uppercase tracking-widest font-medium cursor-pointer transition-colors duration-200 ${
                pathname === link.path ? 'text-[#C47F6A]' : 'text-[#2C4558] hover:text-[#C47F6A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C47F6A] text-[#F5F1EB] text-[11px] uppercase tracking-widest font-medium hover:bg-[#1C3A5C] transition-all duration-300 mt-2"
          >
            Get Started
            <i className="ri-arrow-right-line text-xs"></i>
          </Link>
          <div className="flex flex-col gap-1.5 pt-2 border-t border-[#EAE4D6]">
            <a href="tel:+16190000000" className="text-xs text-[#5C7A8E] font-light">(619) 000-0000</a>
            <a href="mailto:admissions@mentalhealthforteens.com" className="text-xs text-[#5C7A8E] font-light">admissions@mentalhealthforteens.com</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
