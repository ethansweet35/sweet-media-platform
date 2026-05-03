'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />

      {/* Mobile sticky CTA — only visible on small screens, fades in after scroll */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-[#2C3B2E] px-4 py-3 flex items-center gap-3">
          <a
            href="tel:+17197338556"
            className="whitespace-nowrap cursor-pointer flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium active:bg-[#DDA15E] transition-colors duration-200"
          >
            <i className="ri-phone-line text-sm"></i>
            Call Now — Free Help
          </a>
          <Link
            href="/admissions#inquiry-form"
            className="whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium active:bg-[#FAF8F5]/10 transition-colors duration-200"
          >
            <i className="ri-file-list-line text-sm"></i>
            Apply
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
          href="tel:+17197338556"
          className="whitespace-nowrap cursor-pointer flex items-center gap-3 pl-5 pr-6 py-4 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] transition-all duration-300 group"
          style={{ boxShadow: '0 8px 32px rgba(200,121,90,0.35)' }}
        >
          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[#FAF8F5]/20 group-hover:bg-[#FAF8F5]/10 transition-colors duration-300 flex-shrink-0">
            <i className="ri-phone-line text-sm"></i>
          </div>
          Call Now — Free Help
        </a>
      </div>
    </div>
  );
}
