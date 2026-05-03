'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'What We Treat', path: '/what-we-treat' },
  { label: 'Virtual Outpatient', path: '/levels-of-care' },
  { label: 'Therapy', path: '/therapy' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Resources', path: '/resources' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBg = scrolled || !isHome
    ? 'bg-[#FAF8F5] shadow-sm'
    : 'bg-transparent';

  const textColor = scrolled || !isHome ? 'text-[#2C3B2E]' : 'text-[#FAF8F5]';
  const logoFilter = scrolled || !isHome ? '' : 'brightness-0 invert';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBg}`}>

      {/* ── Top utility bar ── */}
      <div className={`hidden lg:block w-full border-b transition-all duration-500 ${scrolled || !isHome ? 'border-[#2C3B2E]/8 bg-[#2C3B2E]' : 'border-[#FAF8F5]/10 bg-[#2C3B2E]/70 backdrop-blur-sm'}`}>
        <div className="w-full px-8 md:px-16 lg:px-24 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="tel:+17197338556" className="flex items-center gap-1.5 text-[#F0ECE1]/70 hover:text-[#DDA15E] transition-colors duration-200 cursor-pointer">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line text-xs"></i>
                </div>
                <span className="text-[11px] font-light tracking-wide">719-733-8556</span>
              </a>
              <a href="mailto:admissions@innerpeakcolorado.com" className="flex items-center gap-1.5 text-[#F0ECE1]/70 hover:text-[#DDA15E] transition-colors duration-200 cursor-pointer">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-mail-line text-xs"></i>
                </div>
                <span className="text-[11px] font-light tracking-wide">admissions@innerpeakcolorado.com</span>
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-[11px] text-[#F0ECE1]/50 font-light">
                <span className="text-[#DDA15E] font-medium">24/7 Intake:</span> Call anytime — no commitment required
              </span>
              <div className="flex items-center gap-3">
                {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line'].map((icon) => (
                  <a key={icon} href="#" className="w-4 h-4 flex items-center justify-center text-[#F0ECE1]/50 hover:text-[#DDA15E] transition-colors duration-200 cursor-pointer">
                    <i className={`${icon} text-xs`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-8 md:px-16 lg:px-24 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/logo.png"
              alt="Inner Peak Colorado Logo"
              width={160}
              height={40}
              className={`h-10 w-auto object-contain transition-all duration-500 ${logoFilter}`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs uppercase tracking-widest font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer hover:text-[#C8795A] ${
                  pathname === link.path ? 'text-[#C8795A]' : textColor
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className={`whitespace-nowrap cursor-pointer text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                scrolled || !isHome
                  ? 'border-[#2C3B2E] text-[#2C3B2E] hover:bg-[#2C3B2E] hover:text-[#FAF8F5]'
                  : 'border-[#FAF8F5] text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#2C3B2E]'
              }`}
            >
              Begin Your Journey
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden w-8 h-8 flex items-center justify-center cursor-pointer ${textColor}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#F0ECE1] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-xs uppercase tracking-widest font-medium cursor-pointer hover:text-[#C8795A] ${
                pathname === link.path ? 'text-[#C8795A]' : 'text-[#2C3B2E]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="whitespace-nowrap cursor-pointer text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border border-[#2C3B2E] text-[#2C3B2E] hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300 font-medium text-center"
          >
            Begin Your Journey
          </Link>
        </div>
      )}
    </nav>
  );
}
