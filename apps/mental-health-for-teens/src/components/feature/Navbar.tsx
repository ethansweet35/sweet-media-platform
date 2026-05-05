'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'What We Treat', path: '/what-we-treat' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Resources', path: '/resources' },
  { label: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = !isHome || scrolled;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isLight ? 'bg-white' : 'bg-transparent'}`}
      style={isLight ? { boxShadow: 'rgba(17, 17, 17, 0.05) 0px 0px 1px 0px, rgba(17, 17, 17, 0.04) 1px 1px 1px 0px, rgba(17, 17, 17, 0.03) 2px 3px 2px 0px, rgba(17, 17, 17, 0.01) 4px 4px 2px 0px' } : {}}
    >
      {/* Layer 1 — Utility bar */}
      <div className="hidden lg:block bg-midnight-ink">
        <div className="max-w-7xl mx-auto px-8 xl:px-12 h-9 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="tel:+17197338556"
              className="flex items-center gap-1.5 text-canvas-white/60 hover:text-canvas-white transition-colors duration-200 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>
              <span className="text-[11px] tracking-wide">(719) 733-8556</span>
            </a>
            <a
              href="mailto:admissions@mentalhealthforteens.com"
              className="flex items-center gap-1.5 text-canvas-white/60 hover:text-canvas-white transition-colors duration-200 cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span className="text-[11px] tracking-wide">admissions@mentalhealthforteens.com</span>
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-[11px] text-canvas-white/40">
              <span className="text-engagement-gold font-medium">Free Consultation:</span> No commitment required
            </span>
            <div className="flex items-center gap-3">
              {[
                { icon: 'instagram', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
                { icon: 'facebook', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
              ].map(({ icon, d }) => (
                <a key={icon} href="#" className="text-canvas-white/40 hover:text-canvas-white transition-colors duration-200 cursor-pointer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2 — Main nav */}
      <div className={`transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 xl:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer flex-shrink-0">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/logo.png"
              alt="Mental Health For Teens"
              width={148}
              height={36}
              className={`h-9 w-auto object-contain transition-all duration-300 ${isLight ? '' : 'brightness-0 invert'}`}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium tracking-tight transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  pathname === link.path
                    ? isLight ? 'text-midnight-ink bg-whisper-gray' : 'text-canvas-white bg-canvas-white/10'
                    : isLight
                      ? 'text-muted-ash hover:text-midnight-ink hover:bg-whisper-gray'
                      : 'text-canvas-white/70 hover:text-canvas-white hover:bg-canvas-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+17197338556"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                isLight ? 'text-muted-ash hover:text-midnight-ink' : 'text-canvas-white/70 hover:text-canvas-white'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>
              Call Now
            </a>
            <Link
              href="/admissions"
              className="px-5 py-2 rounded-lg text-[13px] font-medium bg-midnight-ink text-canvas-white hover:bg-surface-charcoal transition-colors duration-200 cursor-pointer whitespace-nowrap"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.04) 0px 1px 2px 0px, rgba(17, 17, 17, 0.04) 0px 4px 8px 0px' }}
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer ${
              isLight ? 'text-midnight-ink hover:bg-whisper-gray' : 'text-canvas-white hover:bg-canvas-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-black/[0.06] px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-[14px] font-medium cursor-pointer transition-colors duration-200 ${
                pathname === link.path ? 'text-midnight-ink bg-whisper-gray' : 'text-muted-ash hover:text-midnight-ink hover:bg-whisper-gray'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-black/[0.06] flex flex-col gap-2">
            <a
              href="tel:+17197338556"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-black/[0.08] text-[14px] font-medium text-midnight-ink cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>
              (719) 733-8556
            </a>
            <Link
              href="/admissions"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center py-2.5 rounded-lg bg-midnight-ink text-canvas-white text-[14px] font-medium cursor-pointer"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
