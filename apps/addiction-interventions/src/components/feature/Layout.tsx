'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PHONE_DISPLAY = '949-776-7093';
const PHONE_HREF = 'tel:9497767093';

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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />

      {/* Mobile sticky CTA — small screens only, fades in after scroll */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-[var(--color-ink)] px-4 py-3 flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="whitespace-nowrap cursor-pointer flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[var(--color-sage)] text-white text-xs uppercase tracking-widest font-semibold active:bg-[var(--color-sage-deep)] transition-colors duration-200"
          >
            <i className="ri-phone-line text-sm"></i>
            Call {PHONE_DISPLAY}
          </a>
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
          className="whitespace-nowrap cursor-pointer flex items-center gap-3 pl-5 pr-6 py-4 rounded-full bg-[var(--color-sage)] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[var(--color-sage-deep)] transition-all duration-300 group"
          style={{ boxShadow: '0 8px 32px rgba(143,172,135,0.45)' }}
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 group-hover:bg-white/10 transition-colors duration-300 flex-shrink-0">
            <i className="ri-phone-line text-sm"></i>
          </div>
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}
