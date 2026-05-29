'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { PHONE_DISPLAY, PHONE_HREF } from '@/data/site';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, isAdmin]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return <>{children}</>;

  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <div className={`flex-1 ${isHome ? "" : "pt-[116px] lg:pt-[116px]"}`}>{children}</div>
      <Footer />

      {/* Mobile sticky CTA — only visible on small screens, fades in after scroll */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3 bg-mbh-forest px-4 py-3">
          <a
            href={PHONE_HREF}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-mbh-green py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors active:bg-mbh-green-hover"
          >
            <i className="ri-phone-line text-sm"></i>
            Call {PHONE_DISPLAY}
          </a>
          <Link
            href="/verify-insurance"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors active:bg-white/10"
          >
            <i className="ri-shield-check-line text-sm"></i>
            Insurance
          </Link>
        </div>
      </div>

      {/* Desktop floating call button — bottom-right, appears after scroll */}
      <div
        className={`hidden md:flex fixed bottom-8 right-8 z-50 flex-col items-end gap-3 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <a
          href={PHONE_HREF}
          className="group flex cursor-pointer items-center gap-3 rounded-full bg-mbh-green py-4 pl-5 pr-6 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-mbh-forest"
          style={{ boxShadow: "0 8px 32px rgba(30, 80, 39, 0.35)" }}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/10">
            <i className="ri-phone-line text-sm"></i>
          </div>
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
