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
      setSubmitted(true);
      setEmail('');
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#2C3B2E] text-[#FAF8F5]">
      {/* Upper Grid */}
      <div className="w-full px-8 md:px-16 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Image
            src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/logo.png"
            alt="Inner Peak Colorado"
            width={160}
            height={40}
            className="h-10 w-auto object-contain brightness-0 invert"
            loading="lazy"
          />
          <p className="text-sm text-[#F0ECE1]/70 font-light leading-relaxed">
            A virtual sanctuary for women ready to reclaim their lives through evidence-based, trauma-informed care rooted in the healing power of nature.
          </p>
          <div className="flex gap-4 mt-2">
            {['ri-instagram-line', 'ri-facebook-circle-line', 'ri-linkedin-box-line'].map((icon) => (
              <a key={icon} href="#" className="w-8 h-8 flex items-center justify-center cursor-pointer text-[#F0ECE1]/60 hover:text-[#DDA15E] transition-colors duration-300">
                <i className={`${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-[#DDA15E] font-medium">Quick Links</h4>
          <div className="flex flex-col gap-2.5">
            {[
              { label: 'About Us', path: '/about' },
              { label: 'What We Treat', path: '/what-we-treat' },
              { label: 'Virtual Outpatient', path: '/levels-of-care' },
              { label: 'Therapy', path: '/therapy' },
              { label: 'Admissions', path: '/admissions' },
              { label: 'Resources', path: '/resources' },
            ].map((link) => (
              <Link key={link.path} href={link.path} className="text-sm text-[#F0ECE1]/70 hover:text-[#FAF8F5] transition-colors duration-300 cursor-pointer font-light">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-[#DDA15E] font-medium">Contact</h4>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <i className="ri-phone-line text-[#8FA489]"></i>
              </div>
              <span className="text-sm text-[#F0ECE1]/70 font-light">719-733-8556</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <i className="ri-mail-line text-[#8FA489]"></i>
              </div>
              <span className="text-sm text-[#F0ECE1]/70 font-light">admissions@innerpeakcolorado.com</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                <i className="ri-map-pin-line text-[#8FA489]"></i>
              </div>
              <span className="text-sm text-[#F0ECE1]/70 font-light">685 Citadel Drive East, Suite #598<br />Colorado Springs, CO 80909</span>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-widest text-[#DDA15E] font-medium">Stay Connected</h4>
          <p className="text-sm text-[#F0ECE1]/70 font-light leading-relaxed">
            Gentle wisdom, healing resources, and community updates — delivered with care.
          </p>
          {submitted ? (
            <p className="text-sm text-[#8FA489] font-light">Thank you for joining our community.</p>
          ) : (
            <form
              id="newsletter-form"
              onSubmit={handleNewsletter}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-transparent border-b border-[#FAF8F5]/30 text-sm text-[#FAF8F5] placeholder-[#FAF8F5]/40 py-2 outline-none focus:border-[#DDA15E] transition-colors duration-300 font-light"
              />
              <button
                type="submit"
                disabled={submitting}
                className="whitespace-nowrap cursor-pointer text-xs uppercase tracking-widest px-5 py-2.5 rounded-full bg-[#C8795A] text-[#FAF8F5] hover:bg-[#DDA15E] transition-colors duration-300 font-medium self-start"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Big Brand Text */}
      <div className="w-full px-8 md:px-16 overflow-hidden">
        <p className="text-[#DDA15E]/20 font-serif font-bold leading-none select-none" style={{ fontSize: 'clamp(60px, 12vw, 160px)', letterSpacing: '-0.02em' }}>
          INNER PEAK
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-8 md:px-16 py-6 border-t border-[#FAF8F5]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-[#FAF8F5]/40 font-light">© 2026 Inner Peak Colorado. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70 transition-colors cursor-pointer font-light">Privacy Policy</a>
          <a href="#" className="text-xs text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70 transition-colors cursor-pointer font-light">Terms of Service</a>
          <a href="#" className="text-xs text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70 transition-colors cursor-pointer font-light">HIPAA Notice</a>
        </div>
      </div>
    </footer>
  );
}
