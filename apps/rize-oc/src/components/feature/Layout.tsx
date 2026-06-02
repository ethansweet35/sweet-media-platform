'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin =
    pathname?.startsWith('/admin') || pathname?.startsWith('/report');
  const isLp = pathname?.startsWith('/lp');

  useEffect(() => {
    if (!isAdmin) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, isAdmin]);

  if (isAdmin || isLp) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />

    </div>
  );
}
