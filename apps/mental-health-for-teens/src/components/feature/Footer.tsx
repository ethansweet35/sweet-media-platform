'use client';

import { useState } from 'react';
import Link from 'next/link';

const pages = [
  { label: 'About Us', path: '/about' },
  { label: 'Levels of Care', path: '/levels-of-care' },
  { label: 'What We Treat', path: '/what-we-treat' },
  { label: 'Admissions', path: '/admissions' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

const conditions = [
  'Anxiety & Panic', 'Depression', 'Trauma & PTSD',
  'OCD', 'ADHD & ADD', 'Eating Disorders',
  'Bipolar Disorder', 'Insomnia',
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
    } catch { /* fail silently */ }
    finally {
      setSubmitted(true);
      setSubmitting(false);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: '#1C3A5C' }}>

      {/* ── Wave divider ── */}
      <div className="w-full overflow-hidden leading-none" style={{ marginBottom: '-2px' }}>
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
          <path
            d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,0 L0,0 Z"
            fill="#F5F1EB"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-12 pb-8">

        {/* ── Brand header ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="flex flex-col gap-1">
            <Link href="/" className="cursor-pointer" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              <span className="font-bold text-white text-2xl">Mental Health</span>
              <span className="font-bold text-2xl ml-2" style={{ color: '#6B9EB5' }}>For Teens</span>
            </Link>
            <p className="text-sm font-light" style={{ color: 'rgba(245,241,235,0.5)' }}>
              San Diego, CA · Virtual care throughout California
            </p>
          </div>
          <div className="flex items-center gap-3">
            {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line', 'ri-tiktok-line'].map(icon => (
              <a key={icon} href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{ background: 'rgba(245,241,235,0.08)' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C47F6A')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,241,235,0.08)')}
              >
                <i className={`${icon} text-sm text-white/60`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* ── Three-column grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12 border-b border-white/10">

          {/* Pages */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: '#6B9EB5' }}>Navigation</p>
            <div className="flex flex-col gap-2">
              {pages.map(p => (
                <Link key={p.path} href={p.path}
                  className="text-sm font-light transition-colors duration-200 cursor-pointer w-fit"
                  style={{ color: 'rgba(245,241,235,0.55)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,241,235,1)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.55)')}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          {/* What We Treat */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: '#6B9EB5' }}>What We Treat</p>
            <div className="flex flex-col gap-2">
              {conditions.map(c => (
                <Link key={c} href="/what-we-treat"
                  className="text-sm font-light transition-colors duration-200 cursor-pointer w-fit"
                  style={{ color: 'rgba(245,241,235,0.55)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,241,235,1)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.55)')}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: '#6B9EB5' }}>Contact</p>
              <a href="tel:+16190000000" className="flex items-center gap-2.5 text-sm font-light cursor-pointer transition-colors duration-200 w-fit"
                style={{ color: 'rgba(245,241,235,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C47F6A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.55)')}
              >
                <i className="ri-phone-line text-xs" style={{ color: '#87A892' }}></i>
                (619) 000-0000
              </a>
              <a href="mailto:admissions@mentalhealthforteens.com"
                className="flex items-center gap-2.5 text-sm font-light cursor-pointer transition-colors duration-200 w-fit"
                style={{ color: 'rgba(245,241,235,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C47F6A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.55)')}
              >
                <i className="ri-mail-line text-xs" style={{ color: '#87A892' }}></i>
                admissions@mentalhealthforteens.com
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: '#6B9EB5' }}>Stay Connected</p>
              {submitted ? (
                <p className="text-sm font-light" style={{ color: '#87A892' }}>You're on the list. Thank you.</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="bg-transparent border-b py-2 text-sm font-light outline-none transition-colors duration-200"
                    style={{ borderColor: 'rgba(245,241,235,0.2)', color: '#F5F1EB' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#6B9EB5')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(245,241,235,0.2)')}
                  />
                  <button type="submit" disabled={submitting}
                    className="self-start text-[10px] uppercase tracking-widest font-semibold px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300"
                    style={{ background: '#6B9EB5', color: '#F5F1EB' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#C47F6A')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#6B9EB5')}
                  >
                    {submitting ? 'Subscribing…' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs font-light" style={{ color: 'rgba(245,241,235,0.3)' }}>
            © 2026 Mental Health For Teens. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'HIPAA Notice'].map(label => (
              <a key={label} href="#"
                className="text-xs font-light cursor-pointer transition-colors duration-200"
                style={{ color: 'rgba(245,241,235,0.3)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.65)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,241,235,0.3)')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
