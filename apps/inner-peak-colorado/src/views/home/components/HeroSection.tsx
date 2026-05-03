'use client';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { useParallax } from '@/hooks/useParallax';


export default function HeroSection() {
  const parallaxRef = useParallax<HTMLImageElement>({ speed: 0.25, maxOffset: 80 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div ref={parallaxRef as React.RefObject<HTMLDivElement>} className="absolute inset-0">
  <Image
  src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/hero002.jpg"
  alt="Inner Peak Colorado hero"
  fill
  className="w-full h-full object-cover object-center"
  priority
/>
</div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/95 via-[#2C3B2E]/80 to-[#2C3B2E]/65"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C3B2E]/40 via-transparent to-[#2C3B2E]/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pt-28 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — headline + CTAs */}
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#DDA15E]"></div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#DDA15E] font-medium">
                Colorado · Women-Only · Virtual
              </span>
            </div>

            <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
              Virtual Mental Healthcare,<br className="hidden sm:block" />
              <em className="text-[#DDA15E] not-italic">For Women.</em>
            </h1>

            <p className="text-[#F0ECE1]/80 font-light text-base leading-[1.85] max-w-md">
              Colorado's women-only virtual outpatient program — delivering evidence-based, trauma-informed mental health and addiction treatment from the comfort of your own home.
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/admissions"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Start Admissions
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link
                href="/levels-of-care"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/50 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] hover:bg-[#FAF8F5]/10 transition-all duration-300"
              >
                Our Program
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 pt-2">
              {[
                { icon: 'ri-map-pin-line', label: 'Colorado Residents Only' },
                { icon: 'ri-lock-line', label: 'HIPAA Compliant' },
                { icon: 'ri-time-line', label: 'Intake Available 24/7' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${badge.icon} text-[#8FA489] text-sm`}></i>
                  </div>
                  <span className="text-[11px] text-[#FAF8F5]/60 font-light tracking-wide">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className="w-full">
            <div className="bg-[#2C3B2E]/70 backdrop-blur-md border border-[#FAF8F5]/10 rounded-2xl p-8 flex flex-col gap-6">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 text-center py-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#8FA489]/20">
                    <i className="ri-checkbox-circle-line text-3xl text-[#8FA489]"></i>
                  </div>
                  <h3 className="font-serif text-[#FAF8F5] text-xl">We'll be in touch soon.</h3>
                  <p className="text-[#F0ECE1]/65 font-light text-sm leading-relaxed">
                    A member of our intake team will contact you within a few hours. If you need immediate support, call us at 719-733-8556.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-serif text-[#FAF8F5] text-xl">Request a Free Consultation</h2>
                    <p className="text-[#F0ECE1]/50 font-light text-xs leading-relaxed">Confidential · No commitment required · We respond within hours</p>
                  </div>

                  <form
                    id="hero-contact-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="bg-[#FAF8F5]/10 border border-[#FAF8F5]/15 rounded-xl px-4 py-2.5 text-sm text-[#FAF8F5] placeholder-[#F0ECE1]/35 outline-none focus:ring-2 focus:ring-[#DDA15E]/40 focus:border-[#DDA15E]/40 font-light transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="bg-[#FAF8F5]/10 border border-[#FAF8F5]/15 rounded-xl px-4 py-2.5 text-sm text-[#FAF8F5] placeholder-[#F0ECE1]/35 outline-none focus:ring-2 focus:ring-[#DDA15E]/40 focus:border-[#DDA15E]/40 font-light transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(720) 000-0000"
                        className="bg-[#FAF8F5]/10 border border-[#FAF8F5]/15 rounded-xl px-4 py-2.5 text-sm text-[#FAF8F5] placeholder-[#F0ECE1]/35 outline-none focus:ring-2 focus:ring-[#DDA15E]/40 focus:border-[#DDA15E]/40 font-light transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">How Can We Help?</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        maxLength={500}
                        placeholder="Tell us a little about what you're going through..."
                        className="bg-[#FAF8F5]/10 border border-[#FAF8F5]/15 rounded-xl px-4 py-2.5 text-sm text-[#FAF8F5] placeholder-[#F0ECE1]/35 outline-none focus:ring-2 focus:ring-[#DDA15E]/40 focus:border-[#DDA15E]/40 font-light transition-all duration-300 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="whitespace-nowrap cursor-pointer w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300 disabled:opacity-60"
                    >
                      {submitting ? 'Sending...' : 'Request Free Consultation'}
                      <i className="ri-arrow-right-line"></i>
                    </button>

                    <p className="text-[10px] text-[#F0ECE1]/35 text-center font-light">
                      HIPAA-compliant · Strictly confidential · No obligation
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#FAF8F5]/40">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#FAF8F5]/40 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
