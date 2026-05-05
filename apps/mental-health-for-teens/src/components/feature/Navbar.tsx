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
    <nav className="fixed top-0 left-0 w-full z-50" style={{ background: '#1C3A5C' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="cursor-pointer flex-shrink-0">
          <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#F5F1EB' }}>
            Mental Health <span style={{ color: '#6B9EB5' }}>For Teens</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              className="text-[11px] uppercase tracking-widest font-medium whitespace-nowrap cursor-pointer transition-colors duration-200"
              style={{ color: pathname === link.path ? '#C47F6A' : 'rgba(245,241,235,0.65)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#F5F1EB'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = pathname === link.path ? '#C47F6A' : 'rgba(245,241,235,0.65)'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden lg:inline-flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-semibold cursor-pointer transition-all duration-200"
            style={{ background: '#C47F6A', color: '#F5F1EB' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#87A892')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C47F6A')}
          >
            Get Started
          </Link>
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center cursor-pointer"
            style={{ color: '#F5F1EB' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden px-6 py-6 flex flex-col gap-5" style={{ borderTop: '1px solid rgba(245,241,235,0.08)', background: '#1C3A5C' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-[11px] uppercase tracking-widest font-medium cursor-pointer"
              style={{ color: pathname === link.path ? '#C47F6A' : 'rgba(245,241,235,0.65)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="self-start px-6 py-3 rounded-full text-[11px] uppercase tracking-widest font-semibold cursor-pointer"
            style={{ background: '#C47F6A', color: '#F5F1EB' }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
