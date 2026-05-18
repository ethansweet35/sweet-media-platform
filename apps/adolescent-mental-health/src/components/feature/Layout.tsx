'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, isAdmin]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-white" style={{ fontFamily: 'var(--font-montserrat)' }}>
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />

      {/* Mobile sticky CTA */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-[#000000] px-4 py-3 flex items-center gap-3 border-t border-white/10">
          <a
            href={PHONE_HREF}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-[#000000] text-xs uppercase tracking-widest font-bold active:bg-white/90 transition-colors"
          >
            <i className="ri-phone-fill text-sm"></i>
            {PHONE}
          </a>
          <a
            href="/admissions"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-white/30 text-white text-xs uppercase tracking-widest font-semibold active:bg-white/10 transition-colors"
          >
            Apply
          </a>
        </div>
      </div>

      {/* Desktop floating call button */}
      <div
        className={`hidden md:flex fixed bottom-8 right-8 z-50 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <a
          href={PHONE_HREF}
          className="flex items-center gap-3 pl-5 pr-6 py-4 rounded-full bg-[#000000] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#111111] transition-colors shadow-xl"
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/15 flex-shrink-0">
            <i className="ri-phone-fill text-sm"></i>
          </div>
          Call Now — Free Consult
        </a>
      </div>
    </div>
  );
}
