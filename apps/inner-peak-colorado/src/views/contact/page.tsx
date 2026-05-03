'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/base/Breadcrumb';


const faqs = [
  { q: 'Do you accept insurance?', a: 'Yes. We work with most major insurance providers including Aetna, Cigna, United Healthcare, Blue Cross Blue Shield, and many others. Our intake team will verify your benefits before you begin.' },
  { q: 'How quickly can I start treatment?', a: 'Most women are able to begin within 24–72 hours of their initial assessment. We move quickly because we know that when someone is ready to heal, timing matters.' },
  { q: 'Is virtual treatment as effective as in-person?', a: 'Research consistently shows that virtual treatment produces outcomes equivalent to in-person care — and for many women, the comfort and privacy of home actually enhances the therapeutic experience.' },
  { q: 'What if I\'m not sure I need treatment?', a: 'Call us anyway. Our intake specialists are trained to help you assess where you are and what level of support might be helpful — with zero pressure and complete confidentiality.' },
];

export default function ContactPage() {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://innerpeakcolorado.com';
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${siteUrl}/contact`,
          url: `${siteUrl}/contact`,
          name: 'Contact Inner Peak Colorado | Free Confidential Consultation',
          description: 'Contact Inner Peak Colorado for a free, confidential consultation. Our compassionate intake team is available 24/7. Call 719-733-8556 or send a message today.',
          isPartOf: { '@type': 'WebSite', url: siteUrl },
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
            ],
          },
        },
        {
          '@type': 'ContactPage',
          url: `${siteUrl}/contact`,
          name: 'Contact Inner Peak Colorado',
          description: 'Reach out for a free, confidential consultation with our intake team, available 24/7.',
        },
        {
          '@type': 'LocalBusiness',
          name: 'Inner Peak Colorado',
          telephone: '+17197338556',
          email: 'admissions@innerpeakcolorado.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '685 Citadel Drive East, Suite #598',
            addressLocality: 'Colorado Springs',
            addressRegion: 'CO',
            postalCode: '80909',
            addressCountry: 'US',
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    };
    const el = document.getElementById('schema-contact');
    if (el) { el.textContent = JSON.stringify(schema); }
    else {
      const s = document.createElement('script');
      s.id = 'schema-contact';
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(schema);
      document.head.appendChild(s);
    }
    document.title = 'Contact Inner Peak Colorado | Free Confidential Consultation';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Contact Inner Peak Colorado for a free, confidential consultation. Our compassionate intake team is available 24/7. Call 719-733-8556 or send a message today.');
    return () => { const el2 = document.getElementById('schema-contact'); if (el2) el2.remove(); };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'message') {
      if (value.length > 500) return;
      setCharCount(value.length);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.message.length > 500) return;
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
    <main className="bg-[#FAF8F5]">
      {/* Hero */}
      <section className="relative w-full pt-32 pb-24 px-8 md:px-16 bg-[#2C3B2E] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#3A4A3C] blur-[120px] opacity-60 pointer-events-none"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <Breadcrumb items={[{ label: 'Contact Us' }]} light />
            <span className="text-xs uppercase tracking-[0.3em] text-[#DDA15E] font-medium block mb-6 mt-6">Contact Us</span>
            <h1 className="font-serif text-[#FAF8F5] leading-[1.15] mb-6" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
              Your first step<br />
              starts with a<br />
              <em className="text-[#DDA15E]">conversation.</em>
            </h1>
            <p className="text-[#F0ECE1]/70 font-light text-lg leading-relaxed max-w-xl">
              Reach out today. Our compassionate intake team is available 24/7 — no judgment, no pressure, just genuine care.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="w-full py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-serif text-[#2C3B2E] text-3xl mb-8">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-[#F0ECE1] rounded-[2rem_0.75rem_2rem_0.75rem] p-10 flex flex-col gap-4 items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#8FA489]/20">
                  <i className="ri-checkbox-circle-line text-3xl text-[#8FA489]"></i>
                </div>
                <h3 className="font-serif text-[#2C3B2E] text-2xl">Thank you for reaching out.</h3>
                <p className="text-[#3A4A3C]/70 font-light text-base leading-relaxed">
                  A member of our intake team will contact you within 24 hours. If you need immediate support, please call us at 719-733-8556.
                </p>
              </div>
            ) : (
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(720) 000-0000"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Program of Interest</label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Select a track</option>
                      <option value="IOP">Virtual Intensive Outpatient (IOP)</option>
                      <option value="OP">Virtual Standard Outpatient (OP)</option>
                      <option value="Not Sure">Not Sure Yet</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-[#6B7D67] font-medium">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    placeholder="Tell us a little about what you're going through and how we can help..."
                    className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/40 outline-none focus:ring-2 focus:ring-[#C8795A]/30 font-light transition-all duration-300 resize-none"
                  />
                  <p className="text-xs text-[#3A4A3C]/40 text-right font-light">{charCount}/500</p>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300 disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                  <i className="ri-send-plane-line"></i>
                </button>
                <p className="text-xs text-[#3A4A3C]/40 font-light">
                  All communications are strictly confidential and HIPAA-compliant.
                </p>
              </form>
            )}
          </div>

          {/* Info + FAQ */}
          <div className="flex flex-col gap-10">
            {/* Contact Info */}
            <div className="bg-[#2C3B2E] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 flex flex-col gap-6">
              <h3 className="font-serif text-[#FAF8F5] text-xl">Get in Touch</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: 'ri-phone-line', label: 'Call Us', value: '719-733-8556', color: '#DDA15E' },
                  { icon: 'ri-mail-line', label: 'Email Us', value: 'admissions@innerpeakcolorado.com', color: '#8FA489' },
                  { icon: 'ri-time-line', label: 'Available', value: '24 Hours / 7 Days a Week', color: '#C8795A' },
                  { icon: 'ri-map-pin-line', label: 'Address', value: '685 Citadel Drive East, Suite #598, Colorado Springs, CO 80909', color: '#6B7D67' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: `${item.color}20` }}>
                      <i className={`${item.icon} text-base`} style={{ color: item.color }}></i>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/40 font-medium">{item.label}</p>
                      <p className="text-sm text-[#FAF8F5] font-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="flex flex-col gap-4">
              <h3 className="font-serif text-[#2C3B2E] text-xl">Frequently Asked Questions</h3>
              {faqs.map((faq, i) => (
                <div key={i} className="border border-[#F0ECE1] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-[#F0ECE1] transition-colors duration-300"
                  >
                    <span className="text-sm font-medium text-[#2C3B2E] pr-4">{faq.q}</span>
                    <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                      <i className={`text-[#6B7D67] transition-transform duration-300 ${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'}`}></i>
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-[#3A4A3C]/70 font-light leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
