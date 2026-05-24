'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import CallNowLink from '@/components/ui/CallNowLink';
import CallRailPhoneLink from '@/components/ui/CallRailPhoneLink';
import { CALLRAIL_PHONE_DISPLAY_PARENS } from '@/lib/callrailPhone';
import Navbar from './Navbar';
import HomeFooterContact from './HomeFooterContact';
import Footer from './Footer';

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
    <div className="min-h-screen flex flex-col" style={{ background: '#F2EDE4' }}>
      <Navbar />
      <div className={`flex-1 ${pathname !== '/' ? 'pt-[88px]' : ''}`}>
        {children}
      </div>
      <HomeFooterContact />
      <Footer />

      {/* Mobile sticky CTA */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ background: '#2C3928', borderTop: '1px solid #3D3028' }}
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <CallNowLink
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-medium tracking-[0.1em] uppercase text-white active:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          />
          <div style={{ width: '1px', height: '2rem', background: 'rgba(143,168,130,0.25)' }} />
          <Link
            href="/admissions-process/"
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-medium tracking-[0.1em] uppercase text-white active:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <i className="ri-file-list-line text-[#8FA882] text-sm"></i>
            Verify Insurance
          </Link>
        </div>
      </div>

      {/* Desktop floating call button */}
      <div
        className={`hidden md:flex fixed bottom-8 right-8 z-50 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <CallRailPhoneLink
          className="flex items-center gap-2.5 px-5 py-3.5 text-[11px] font-medium tracking-[0.1em] uppercase text-[#F2EDE4] transition-all duration-300 shadow-lg"
          style={{
            background: '#2C3928',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          <i className="ri-phone-fill text-[#8FA882]" aria-hidden />
          {CALLRAIL_PHONE_DISPLAY_PARENS}
        </CallRailPhoneLink>
      </div>
    </div>
  );
}
