'use client';

import { useState } from 'react';
import Link from 'next/link';

const quickLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Levels of Care', path: '/levels-of-care' },
  { label: 'What We Treat', path: '/what-we-treat' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

const conditions = [
  'Anxiety & Panic',
  'Depression',
  'Trauma & PTSD',
  'OCD',
  'ADHD & ADD',
  'Eating Disorders',
  'Bipolar Disorder',
  'Insomnia',
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message: 'Newsletter signup' }),
      });
    } catch {
      // fail silently
    } finally {
      setSubmitted(true);
      setSubmitting(false);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C3A5C] text-[#F5F1EB]">

      {/* ── Upper grid ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span
              className="font-serif font-bold leading-none tracking-tight text-[#F5F1EB]"
              style={{ fontSize: '20px', fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Mental Health
            </span>
            <span
              className="font-serif font-bold leading-none tracking-tight"
              style={{ fontSize: '20px', color: '#6B9EB5', fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              For Teens
            </span>
          </div>
          <p className="text-sm text-[#F5F1EB]/60 font-light leading-relaxed">
            An effective alternative to traditional therapy for teens — evidence-based virtual care for adolescents and families throughout California.
          </p>
          <div className="flex gap-3 mt-1">
            {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F5F1EB]/8 hover:bg-[#C47F6A] transition-all duration-300 cursor-pointer text-[#F5F1EB]/55 hover:text-[#F5F1EB]"
              >
                <i className={`${icon} text-sm`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#6B9EB5]">Pages</h4>
          <div className="flex flex-col gap-2.5">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="text-sm text-[#F5F1EB]/60 hover:text-[#F5F1EB] transition-colors duration-300 cursor-pointer font-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#6B9EB5]">What We Treat</h4>
          <div className="flex flex-col gap-2.5">
            {conditions.map((c) => (
              <Link
                key={c}
                href="/what-we-treat"
                className="text-sm text-[#F5F1EB]/60 hover:text-[#F5F1EB] transition-colors duration-300 cursor-pointer font-light"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact + Newsletter */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#6B9EB5]">Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a href="tel:+16190000000" className="flex items-center gap-3 text-sm text-[#F5F1EB]/60 hover:text-[#C47F6A] transition-colors cursor-pointer font-light">
                <i className="ri-phone-line text-[#87A892] text-sm"></i>
                (619) 000-0000
              </a>
              <a href="mailto:admissions@mentalhealthforteens.com" className="flex items-center gap-3 text-sm text-[#F5F1EB]/60 hover:text-[#C47F6A] transition-colors cursor-pointer font-light">
                <i className="ri-mail-line text-[#87A892] text-sm"></i>
                admissions@mentalhealthforteens.com
              </a>
              <div className="flex items-center gap-3 text-sm text-[#F5F1EB]/60 font-light">
                <i className="ri-map-pin-line text-[#87A892] text-sm"></i>
                San Diego, CA — Virtual statewide
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#6B9EB5]">Stay in the Loop</h4>
            <p className="text-xs text-[#F5F1EB]/45 font-light leading-relaxed">
              Resources, teen mental health insights, and program updates.
            </p>
            {submitted ? (
              <p className="text-sm text-[#87A892] font-light">Thank you — you're on the list.</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="bg-transparent border-b border-[#F5F1EB]/20 text-sm text-[#F5F1EB] placeholder-[#F5F1EB]/30 py-2 outline-none focus:border-[#6B9EB5] transition-colors duration-300 font-light"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="whitespace-nowrap cursor-pointer self-start text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-full bg-[#6B9EB5] text-[#F5F1EB] hover:bg-[#C47F6A] transition-colors duration-300 font-medium"
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Watermark text ── */}
      <div className="w-full px-8 md:px-16 overflow-hidden select-none">
        <p
          className="font-serif font-bold leading-none text-[#F5F1EB]/[0.04]"
          style={{ fontSize: 'clamp(56px, 10vw, 140px)', letterSpacing: '-0.02em', fontFamily: 'var(--font-playfair), Georgia, serif' }}
        >
          For Teens
        </p>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-6 border-t border-[#F5F1EB]/8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#F5F1EB]/35 font-light">© 2026 Mental Health For Teens. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-[#F5F1EB]/35 hover:text-[#F5F1EB]/65 transition-colors cursor-pointer font-light">Privacy Policy</a>
          <a href="#" className="text-xs text-[#F5F1EB]/35 hover:text-[#F5F1EB]/65 transition-colors cursor-pointer font-light">Terms of Service</a>
          <a href="#" className="text-xs text-[#F5F1EB]/35 hover:text-[#F5F1EB]/65 transition-colors cursor-pointer font-light">HIPAA Notice</a>
        </div>
      </div>
    </footer>
  );
}
