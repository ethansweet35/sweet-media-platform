'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'About',          path: '/about' },
  { label: 'Levels of Care', path: '/levels-of-care' },
  { label: 'What We Treat',  path: '/what-we-treat' },
  { label: 'Admissions',     path: '/admissions' },
  { label: 'Resources',      path: '/resources' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-50" style={{ background: '#F5F1EB', borderBottom: '1px solid rgba(28,58,92,0.08)' }}>

      {/* ── Utility bar ── */}
      <div style={{ background: '#1C3A5C' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+16190000000" className="flex items-center gap-2 text-[11px] font-light tracking-wide transition-colors duration-200 cursor-pointer" style={{ color: 'rgba(245,241,235,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C47F6A')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.6)')}>
              <i className="ri-phone-line text-xs"></i>(619) 000-0000
            </a>
            <a href="mailto:admissions@mentalhealthforteens.com" className="hidden sm:flex items-center gap-2 text-[11px] font-light tracking-wide transition-colors duration-200 cursor-pointer" style={{ color: 'rgba(245,241,235,0.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C47F6A')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.6)')}>
              <i className="ri-mail-line text-xs"></i>admissions@mentalhealthforteens.com
            </a>
          </div>
          <span className="hidden lg:block text-[11px] font-light" style={{ color: 'rgba(245,241,235,0.45)' }}>
            <span style={{ color: '#6B9EB5', fontWeight: 500 }}>Now accepting new clients</span> · Virtual care throughout California
          </span>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5 cursor-pointer flex-shrink-0">
          <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#1C3A5C' }}>Mental Health</span>
          <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#6B9EB5' }}>For Teens</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className="text-[11px] uppercase tracking-widest font-medium whitespace-nowrap cursor-pointer transition-colors duration-200"
              style={{ color: pathname === link.path ? '#C47F6A' : '#2C4558' }}
              onMouseEnter={e => { if (pathname !== link.path) (e.currentTarget as HTMLElement).style.color = '#1C3A5C'; }}
              onMouseLeave={e => { if (pathname !== link.path) (e.currentTarget as HTMLElement).style.color = '#2C4558'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden lg:inline-flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white cursor-pointer transition-all duration-200"
            style={{ background: '#C47F6A' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1C3A5C')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C47F6A')}
          >
            Get Started
          </Link>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center cursor-pointer rounded-full transition-colors duration-200"
            style={{ color: '#1C3A5C' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="lg:hidden px-6 py-6 flex flex-col gap-5 border-t" style={{ background: '#F5F1EB', borderColor: 'rgba(28,58,92,0.08)' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-[11px] uppercase tracking-widest font-medium cursor-pointer transition-colors duration-200"
              style={{ color: pathname === link.path ? '#C47F6A' : '#2C4558' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold text-white cursor-pointer"
            style={{ background: '#C47F6A' }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
