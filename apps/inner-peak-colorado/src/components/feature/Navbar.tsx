'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

type SubItem = {
  icon: string;
  label: string;
  desc: string;
  path: string;
};

type NavItem = {
  label: string;
  path: string;
  dropdown?: {
    accentColor: string;
    featured: {
      icon: string;
      heading: string;
      desc: string;
      ctaLabel: string;
    };
    items: SubItem[];
  };
};

const navItems: NavItem[] = [
  {
    label: 'About',
    path: '/about',
    dropdown: {
      accentColor: '#8FA489',
      featured: {
        icon: 'ri-leaf-line',
        heading: 'Our Story',
        desc: 'Inner Peak Colorado is a women-only mental health practice built around the belief that every woman deserves specialized, compassionate clinical care.',
        ctaLabel: 'Meet the Practice',
      },
      items: [
        {
          icon: 'ri-team-line',
          label: 'Our Team',
          desc: 'Licensed clinicians specializing in women\'s mental health',
          path: '/team',
        },
      ],
    },
  },
  {
    label: 'What We Treat',
    path: '/what-we-treat',
    dropdown: {
      accentColor: '#C8795A',
      featured: {
        icon: 'ri-mental-health-line',
        heading: 'Conditions We Treat',
        desc: 'We specialize in the full spectrum of women\'s mental health — from trauma and eating disorders to mood conditions and life transitions.',
        ctaLabel: 'See All Conditions',
      },
      items: [
        {
          icon: 'ri-seedling-line',
          label: 'Eating Disorders',
          desc: 'Anorexia, bulimia, BED, and ARFID',
          path: '/what-we-treat/eating-disorders',
        },
        {
          icon: 'ri-shield-line',
          label: 'PTSD & Trauma',
          desc: 'Trauma-informed care for all trauma types',
          path: '/what-we-treat/ptsd-and-trauma',
        },
        {
          icon: 'ri-parent-line',
          label: 'Postpartum Depression & Anxiety',
          desc: 'Perinatal-specialized support for new mothers',
          path: '/what-we-treat/postpartum-depression-and-anxiety',
        },
        {
          icon: 'ri-user-star-line',
          label: 'Imposter Syndrome',
          desc: 'For high-achieving women battling self-doubt',
          path: '/what-we-treat/imposter-syndrome',
        },
        {
          icon: 'ri-scales-3-line',
          label: 'Bipolar Disorder',
          desc: 'Mood stabilization and long-term wellness',
          path: '/what-we-treat/bipolar-disorder',
        },
      ],
    },
  },
  {
    label: 'Virtual Outpatient',
    path: '/levels-of-care',
    dropdown: {
      accentColor: '#DDA15E',
      featured: {
        icon: 'ri-computer-line',
        heading: 'Virtual Programs',
        desc: 'Evidence-based intensive and standard outpatient care — delivered virtually so you can heal from anywhere in Colorado.',
        ctaLabel: 'Explore Programs',
      },
      items: [
        {
          icon: 'ri-stack-line',
          label: 'Virtual IOP',
          desc: 'Intensive Outpatient Program — 3 days/week',
          path: '/levels-of-care/virtual-iop',
        },
        {
          icon: 'ri-calendar-check-line',
          label: 'Virtual OP',
          desc: 'Standard Outpatient — flexible weekly sessions',
          path: '/levels-of-care/virtual-op',
        },
      ],
    },
  },
  {
    label: 'Therapy',
    path: '/therapy',
    dropdown: {
      accentColor: '#6B7D67',
      featured: {
        icon: 'ri-heart-pulse-line',
        heading: 'Our Therapies',
        desc: 'We use only evidence-based modalities — each selected for its clinical effectiveness with women\'s mental health conditions.',
        ctaLabel: 'View All Therapies',
      },
      items: [
        {
          icon: 'ri-user-heart-line',
          label: 'Individual Therapy',
          desc: 'One-on-one sessions with a licensed clinician',
          path: '/therapy/individual',
        },
        {
          icon: 'ri-group-line',
          label: 'Group Therapy',
          desc: 'Peer-supported healing in a women-only space',
          path: '/therapy/group',
        },
        {
          icon: 'ri-home-heart-line',
          label: 'Family Therapy',
          desc: 'Healing relationships and building support systems',
          path: '/therapy/family',
        },
        {
          icon: 'ri-brain-line',
          label: 'CBT',
          desc: 'Cognitive Behavioral Therapy — restructure thinking',
          path: '/therapy/cbt',
        },
        {
          icon: 'ri-scales-3-line',
          label: 'DBT',
          desc: 'Dialectical Behavior Therapy — emotional regulation',
          path: '/therapy/dbt',
        },
        {
          icon: 'ri-heart-line',
          label: 'ACT',
          desc: 'Acceptance & Commitment Therapy — values-based living',
          path: '/therapy/act',
        },
        {
          icon: 'ri-leaf-line',
          label: 'Nutritional Counseling',
          desc: 'Weight-neutral nutrition support for recovery',
          path: '/therapy/nutritional-counseling',
        },
      ],
    },
  },
  {
    label: 'Resources',
    path: '/resources',
    dropdown: {
      accentColor: '#DDA15E',
      featured: {
        icon: 'ri-book-open-line',
        heading: 'Resources & Support',
        desc: 'Educational guides, clinical articles, and practical tools to help you understand your options and take the first step toward healing.',
        ctaLabel: 'Browse All Resources',
      },
      items: [
        {
          icon: 'ri-article-line',
          label: 'Blog & Articles',
          desc: 'Clinical insights, recovery stories, and mental health education',
          path: '/blog',
        },
        {
          icon: 'ri-file-list-3-line',
          label: 'Admissions Guide',
          desc: 'How our intake process works — step by step',
          path: '/admissions',
        },
        {
          icon: 'ri-secure-payment-line',
          label: 'Insurance & Coverage',
          desc: 'Understanding your mental health benefits',
          path: '/resources#insurance',
        },
        {
          icon: 'ri-question-answer-line',
          label: 'Mental Health FAQs',
          desc: 'Answers to the questions we hear most often',
          path: '/resources#faqs',
        },
        {
          icon: 'ri-map-pin-line',
          label: 'Colorado Crisis Resources',
          desc: 'Immediate help for women across Colorado',
          path: '/resources#crisis',
        },
      ],
    },
  },
];

const simpleLinks = [
  { label: 'Admissions', path: '/admissions' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      setScrolled(window.scrollY > 40);
      frame = null;
    };
    const handleScroll = () => {
      if (frame != null) return;
      frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame != null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const solid = scrolled || !isHome || mobileOpen;
  const navBg = solid ? 'bg-[#FAF8F5] shadow-sm' : 'bg-transparent';
  const textColor = solid ? 'text-[#2C3B2E]' : 'text-[#FAF8F5]';
  const logoFilter = solid ? '' : 'brightness-0 invert';

  const openMenu = (label: string) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveMenu(label);
  };

  const scheduleClose = () => {
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const activeItem = navItems.find((n) => n.label === activeMenu);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBg}`}>

      {/* ── Top utility bar ── */}
      <div className={`hidden lg:block w-full border-b transition-all duration-500 ${scrolled || !isHome ? 'border-[#2C3B2E]/8 bg-[#2C3B2E]' : 'border-[#FAF8F5]/10 bg-[#2C3B2E]/70 backdrop-blur-sm'}`}>
        <div className="w-full px-8 md:px-16 lg:px-24 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="tel:+17197338556" className="flex items-center gap-1.5 text-[#F0ECE1]/70 hover:text-[#DDA15E] transition-colors duration-200 cursor-pointer">
                <i className="ri-phone-line text-xs"></i>
                <span className="text-[11px] font-light tracking-wide">719-733-8556</span>
              </a>
              <a href="mailto:admissions@innerpeakcolorado.com" className="flex items-center gap-1.5 text-[#F0ECE1]/70 hover:text-[#DDA15E] transition-colors duration-200 cursor-pointer">
                <i className="ri-mail-line text-xs"></i>
                <span className="text-[11px] font-light tracking-wide">admissions@innerpeakcolorado.com</span>
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-[11px] text-[#F0ECE1]/50 font-light">
                <span className="text-[#DDA15E] font-medium">24/7 Intake:</span> Call anytime — no commitment required
              </span>
              <div className="flex items-center gap-3">
                {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line'].map((icon) => (
                  <a key={icon} href="#" className="w-4 h-4 flex items-center justify-center text-[#F0ECE1]/50 hover:text-[#DDA15E] transition-colors duration-200 cursor-pointer">
                    <i className={`${icon} text-xs`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="w-full px-8 md:px-16 lg:px-24 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer flex-shrink-0">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/logo.png"
              alt="Inner Peak Colorado"
              width={160}
              height={40}
              className={`h-10 w-auto object-contain transition-all duration-500 ${logoFilter}`}
              sizes="160px"
              loading="lazy"
              quality={60}
            />
          </Link>

          {/* Desktop nav items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (pathname ?? '').startsWith(item.path + '/');
              const isOpen = activeMenu === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown ? openMenu(item.label) : undefined}
                  onMouseLeave={item.dropdown ? scheduleClose : undefined}
                >
                  <Link
                    href={item.path}
                    className={`group flex items-center gap-1 px-3 py-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer rounded-md hover:text-[#C8795A] ${
                      isActive ? 'text-[#C8795A]' : textColor
                    }`}
                  >
                    {item.label}
                    {item.dropdown && (
                      <i className={`ri-arrow-down-s-line text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                    )}
                  </Link>
                </div>
              );
            })}
            {simpleLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-2 text-xs uppercase tracking-widest font-medium transition-colors duration-300 whitespace-nowrap cursor-pointer hover:text-[#C8795A] ${
                  pathname === link.path ? 'text-[#C8795A]' : textColor
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className={`whitespace-nowrap cursor-pointer text-xs uppercase tracking-widest px-6 py-2.5 rounded-full border transition-all duration-300 font-medium ${
                solid
                  ? 'border-[#2C3B2E] text-[#2C3B2E] hover:bg-[#2C3B2E] hover:text-[#FAF8F5]'
                  : 'border-[#FAF8F5] text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#2C3B2E]'
              }`}
            >
              Begin Your Journey
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden w-8 h-8 flex items-center justify-center cursor-pointer ${textColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? 'ri-close-line' : 'ri-menu-3-line'}`}></i>
          </button>
        </div>
      </div>

      {/* ── MEGA MENU PANEL ── */}
      {activeItem?.dropdown && (
        <div
          className="hidden lg:block absolute top-full left-0 w-full"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{ zIndex: 49 }}
        >
          {/* Thin accent line at top */}
          <div className="h-px w-full" style={{ backgroundColor: activeItem.dropdown.accentColor, opacity: 0.4 }} />

          <div className="w-full bg-[#2C3B2E] shadow-2xl" style={{ boxShadow: '0 24px 64px rgba(44,59,46,0.35)' }}>
            <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-10">
              <div className="grid grid-cols-12 gap-10">

                {/* Left: Featured card */}
                <div className="col-span-3">
                  <div
                    className="h-full rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-7 flex flex-col gap-5 relative overflow-hidden"
                    style={{ backgroundColor: `${activeItem.dropdown.accentColor}18`, border: `1px solid ${activeItem.dropdown.accentColor}25` }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: `${activeItem.dropdown.accentColor}25` }}
                    >
                      <i className={`${activeItem.dropdown.featured.icon} text-xl`} style={{ color: activeItem.dropdown.accentColor }}></i>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-serif text-[#FAF8F5] text-lg leading-snug">
                        {activeItem.dropdown.featured.heading}
                      </h3>
                      <p className="text-[#F0ECE1]/55 font-light text-sm leading-[1.8]">
                        {activeItem.dropdown.featured.desc}
                      </p>
                    </div>
                    <Link
                      href={activeItem.path}
                      className="mt-auto self-start inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 group"
                      style={{ color: activeItem.dropdown.accentColor }}
                      onClick={() => setActiveMenu(null)}
                    >
                      {activeItem.dropdown.featured.ctaLabel}
                      <i className="ri-arrow-right-line text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
                    </Link>
                    {/* Decorative ring */}
                    <div
                      className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                      style={{ border: `1px solid ${activeItem.dropdown.accentColor}` }}
                    />
                    <div
                      className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10 pointer-events-none"
                      style={{ border: `1px solid ${activeItem.dropdown.accentColor}` }}
                    />
                  </div>
                </div>

                {/* Right: Sub-links grid */}
                <div className="col-span-9">
                  <div className={`grid gap-3 ${
                    activeItem.dropdown.items.length <= 3
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : activeItem.dropdown.items.length <= 6
                      ? 'grid-cols-2'
                      : 'grid-cols-3'
                  }`}>
                    {activeItem.dropdown.items.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-[#FAF8F5]/8 cursor-pointer"
                      >
                        <div
                          className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${activeItem.dropdown!.accentColor}20` }}
                        >
                          <i className={`${sub.icon} text-sm`} style={{ color: activeItem.dropdown!.accentColor }}></i>
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[#FAF8F5] text-sm font-medium leading-snug group-hover:text-[#DDA15E] transition-colors duration-300 truncate">
                            {sub.label}
                          </span>
                          <span className="text-[#F0ECE1]/45 text-xs font-light leading-snug">
                            {sub.desc}
                          </span>
                        </div>
                        <i className="ri-arrow-right-line text-xs text-[#F0ECE1]/20 group-hover:text-[#DDA15E] transition-all duration-300 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transform"></i>
                      </Link>
                    ))}
                  </div>

                  {/* Bottom strip */}
                  <div className="mt-6 pt-6 border-t border-[#FAF8F5]/8 flex items-center justify-between">
                    <p className="text-[#F0ECE1]/35 text-xs font-light">
                      Women-only · Virtual care · Colorado
                    </p>
                    <Link
                      href="/contact"
                      onClick={() => setActiveMenu(null)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#C8795A] hover:text-[#DDA15E] transition-colors duration-300 cursor-pointer"
                    >
                      Free Consultation
                      <i className="ri-arrow-right-line text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-t border-[#F0ECE1] overflow-y-auto max-h-[85vh]">
          <div className="px-6 py-5 flex flex-col">

            {/* Nav items with accordions */}
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-[#F0ECE1] last:border-b-0">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-4 cursor-pointer"
                    >
                      <span className={`text-xs uppercase tracking-widest font-medium ${(pathname ?? '').startsWith(item.path) ? 'text-[#C8795A]' : 'text-[#2C3B2E]'}`}>
                        {item.label}
                      </span>
                      <i className={`text-[#2C3B2E]/40 text-sm transition-transform duration-300 ${mobileExpanded === item.label ? 'ri-subtract-line' : 'ri-add-line'}`}></i>
                    </button>
                    {mobileExpanded === item.label && (
                      <div className="pb-4 flex flex-col gap-1">
                        <Link
                          href={item.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0ECE1] transition-colors duration-200"
                        >
                          <i className={`${item.dropdown.featured.icon} text-sm`} style={{ color: item.dropdown.accentColor }}></i>
                          <span className="text-xs font-medium text-[#2C3B2E]">
                            {item.dropdown.featured.ctaLabel}
                          </span>
                        </Link>
                        {item.dropdown.items.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F0ECE1] transition-colors duration-200"
                          >
                            <i className={`${sub.icon} text-sm`} style={{ color: item.dropdown!.accentColor }}></i>
                            <span className="text-xs font-medium text-[#3A4A3C]">{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center py-4 text-xs uppercase tracking-widest font-medium cursor-pointer ${pathname === item.path ? 'text-[#C8795A]' : 'text-[#2C3B2E]'}`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Simple links */}
            {simpleLinks.map((link) => (
              <div key={link.path} className="border-b border-[#F0ECE1]">
                <Link
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center py-4 text-xs uppercase tracking-widest font-medium cursor-pointer ${pathname === link.path ? 'text-[#C8795A]' : 'text-[#2C3B2E]'}`}
                >
                  {link.label}
                </Link>
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-5">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center cursor-pointer text-xs uppercase tracking-widest px-6 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] hover:bg-[#DDA15E] transition-all duration-300 font-medium"
              >
                Begin Your Journey
              </Link>
              <a
                href="tel:+17197338556"
                className="mt-3 flex items-center justify-center gap-2 text-xs text-[#2C3B2E]/60 font-light tracking-wide"
              >
                <i className="ri-phone-line text-xs"></i>
                719-733-8556 · Free 24/7 Intake
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
