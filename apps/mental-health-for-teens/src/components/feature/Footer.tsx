'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    } finally {
      setSubmitted(true);
      setSubmitting(false);
      setEmail('');
    }
  };

  return (
    <footer className="bg-midnight-ink text-canvas-white">
      {/* Upper grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/logo.png"
            alt="Mental Health For Teens"
            width={148}
            height={36}
            className="h-9 w-auto object-contain brightness-0 invert"
            loading="lazy"
          />
          <p className="text-[13px] text-canvas-white/50 font-light leading-[1.7]">
            Specialized adolescent mental health care for teens ages 12–18. Evidence-based, family-inclusive, and always compassionate.
          </p>
          <div className="flex gap-3 mt-1">
            {[
              { label: 'Instagram', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
            ].map(({ label, path }) => (
              <a key={label} href="#" aria-label={label} className="w-8 h-8 rounded-lg bg-canvas-white/[0.07] hover:bg-canvas-white/[0.12] flex items-center justify-center transition-colors duration-200 cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] font-medium text-canvas-white/40 uppercase tracking-widest">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'About Us', href: '/about' },
              { label: 'Our Services', href: '/services' },
              { label: 'What We Treat', href: '/what-we-treat' },
              { label: 'Admissions', href: '/admissions' },
              { label: 'Resources for Parents', href: '/resources' },
              { label: 'Blog', href: '/blog' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-[13px] text-canvas-white/50 hover:text-canvas-white transition-colors duration-200 cursor-pointer font-light">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] font-medium text-canvas-white/40 uppercase tracking-widest">Contact</h4>
          <div className="flex flex-col gap-3.5">
            {[
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.91a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.04 6.04l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.46 16z"/></svg>, text: '(719) 733-8556' },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, text: 'admissions@mentalhealthforteens.com' },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>, text: '685 Citadel Drive East, Suite 598\nColorado Springs, CO 80909' },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="text-canvas-white/30 flex-shrink-0 mt-0.5">{icon}</div>
                <span className="text-[13px] text-canvas-white/50 font-light leading-[1.5] whitespace-pre-line">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] font-medium text-canvas-white/40 uppercase tracking-widest">Stay Connected</h4>
          <p className="text-[13px] text-canvas-white/50 font-light leading-[1.7]">
            Mental health resources and parenting guidance, delivered monthly.
          </p>
          {submitted ? (
            <div className="flex items-center gap-2 text-[13px] text-deliver-green font-light">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Thank you for subscribing.
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-canvas-white/[0.07] border border-canvas-white/10 rounded-lg px-4 py-2.5 text-[13px] text-canvas-white placeholder-canvas-white/30 outline-none focus:border-canvas-white/25 transition-colors duration-200 font-light"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2.5 rounded-lg bg-canvas-white text-midnight-ink text-[13px] font-medium cursor-pointer hover:bg-whisper-gray transition-colors duration-200"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Crisis line banner */}
      <div className="border-t border-canvas-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-deliver-green animate-pulse flex-shrink-0" />
            <span className="text-[12px] text-canvas-white/50 font-light">
              <span className="text-canvas-white/80 font-medium">Crisis line available 24/7:</span> If your teen is in immediate danger, call 988 (Suicide &amp; Crisis Lifeline) or 911.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-canvas-white/[0.06]">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-canvas-white/30 font-light">© 2026 Mental Health For Teens. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'HIPAA Notice', 'Accessibility'].map((label) => (
              <a key={label} href="#" className="text-[11px] text-canvas-white/30 hover:text-canvas-white/60 transition-colors duration-200 cursor-pointer font-light">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
