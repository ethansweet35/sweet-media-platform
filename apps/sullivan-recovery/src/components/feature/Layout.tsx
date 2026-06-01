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
import GeneralDetoxNavbar from '@/components/landing/GeneralDetoxNavbar';
import GeneralDetoxFooter from '@/components/landing/GeneralDetoxFooter';
import { isGeneralDetoxPath } from '@/lib/generalDetoxLanding';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Admin and public client reports render without the marketing site chrome.
  const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/report');
  const isGeneralDetoxLanding = isGeneralDetoxPath(pathname ?? null);
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

  if (isGeneralDetoxLanding) {
    return (
      <div className="flex min-h-screen flex-col" style={{ background: '#F2EDE4' }}>
        <GeneralDetoxNavbar />
        <div className="flex-1">{children}</div>
        <GeneralDetoxFooter />

        <div
          className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 md:hidden ${
            visible ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ background: '#2C3928', borderTop: '1px solid #3D3028' }}
        >
          <div className="px-4 py-3">
            <CallNowLink
              className="flex w-full items-center justify-center gap-2 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-white"
              style={{ fontFamily: 'var(--font-dm-sans)' }}
            />
          </div>
        </div>

        <div
          className={`fixed bottom-8 right-8 z-50 hidden transition-all duration-500 md:flex ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <CallRailPhoneLink
            className="flex items-center gap-2.5 px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#F2EDE4] shadow-lg"
            style={{ background: '#2C3928', fontFamily: 'var(--font-dm-sans)' }}
          >
            <i className="ri-phone-fill text-[#8FA882]" aria-hidden />
            {CALLRAIL_PHONE_DISPLAY_PARENS}
          </CallRailPhoneLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F2EDE4' }}>
      <Navbar />
      <div className="flex-1 sr-site-content">
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
            href="/insurance/"
            className="flex-1 flex items-center justify-center gap-2 py-3 text-[11px] font-medium tracking-[0.1em] uppercase text-white active:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            <i className="ri-shield-check-line text-[#8FA882] text-sm"></i>
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
