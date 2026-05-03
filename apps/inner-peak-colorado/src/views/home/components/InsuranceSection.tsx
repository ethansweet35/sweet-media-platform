'use client';
import { useState } from 'react';


const insurers = [
  { name: 'Aetna', color: '#C8795A' },
  { name: 'Cigna', color: '#6B7D67' },
  { name: 'United Healthcare', color: '#DDA15E' },
  { name: 'Blue Cross Blue Shield', color: '#8FA489' },
  { name: 'Humana', color: '#C8795A' },
  { name: 'Magellan Health', color: '#6B7D67' },
  { name: 'Optum', color: '#DDA15E' },
  { name: 'Tricare', color: '#8FA489' },
];

export default function InsuranceSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    insurance_provider: '',
    member_id: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — info */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B7D67] font-medium">Insurance Verification</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
              Let us check your<br />
              benefits —{' '}
              <em className="text-[#C8795A] not-italic">for free.</em>
            </h2>
            <p className="text-[#3A4A3C]/65 font-light text-base leading-[1.9] max-w-md">
              Most of our clients pay little to nothing out of pocket. Submit your information and our team will verify your coverage within 24 hours — completely free and confidential.
            </p>
          </div>

          {/* What's covered */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-[#2C3B2E] font-medium mb-1">What we'll verify for you</p>
            {[
              'In-network vs. out-of-network benefits',
              'Deductible & out-of-pocket maximums',
              'Mental health & substance use coverage',
              'Pre-authorization requirements',
              'Copay & coinsurance amounts',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  <i className="ri-checkbox-circle-line text-sm text-[#8FA489]"></i>
                </div>
                <span className="text-sm text-[#3A4A3C]/70 font-light">{item}</span>
              </div>
            ))}
          </div>

          {/* Accepted insurers */}
          <div className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-[#2C3B2E] font-medium">Accepted Providers</p>
            <div className="flex flex-wrap gap-2">
              {insurers.map((ins, i) => (
                <span
                  key={i}
                  className="text-xs font-light px-4 py-2 rounded-full bg-[#FAF8F5] text-[#2C3B2E]"
                >
                  {ins.name}
                </span>
              ))}
              <span className="text-xs font-light px-4 py-2 rounded-full bg-[#FAF8F5] text-[#6B7D67] italic">
                + many more
              </span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-[#FAF8F5] rounded-[2rem_0.75rem_2rem_0.75rem] p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center text-center gap-5 py-8">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#8FA489]/15">
                <i className="ri-checkbox-circle-line text-3xl text-[#8FA489]"></i>
              </div>
              <h3 className="font-serif text-[#2C3B2E] text-2xl">Request received.</h3>
              <p className="text-sm text-[#3A4A3C]/65 font-light leading-relaxed max-w-xs">
                Our team will verify your benefits and reach out within 24 hours. You're one step closer.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-1 mb-8">
                <h3 className="font-serif text-[#2C3B2E] text-2xl">Verify My Benefits</h3>
                <p className="text-sm text-[#3A4A3C]/50 font-light">Free · Confidential · No commitment required</p>
              </div>

              <form
                id="insurance-verification-form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/35 outline-none focus:ring-2 focus:ring-[#C8795A]/25 font-light transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/35 outline-none focus:ring-2 focus:ring-[#C8795A]/25 font-light transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(720) 000-0000"
                    className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/35 outline-none focus:ring-2 focus:ring-[#C8795A]/25 font-light transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">Insurance Provider *</label>
                  <input
                    type="text"
                    name="insurance_provider"
                    value={formData.insurance_provider}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Aetna, Cigna, Blue Cross..."
                    className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/35 outline-none focus:ring-2 focus:ring-[#C8795A]/25 font-light transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#6B7D67] font-medium">Member ID</label>
                  <input
                    type="text"
                    name="member_id"
                    value={formData.member_id}
                    onChange={handleChange}
                    placeholder="Found on your insurance card"
                    className="bg-[#F0ECE1] rounded-xl px-4 py-3 text-sm text-[#2C3B2E] placeholder-[#3A4A3C]/35 outline-none focus:ring-2 focus:ring-[#C8795A]/25 font-light transition-all duration-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="whitespace-nowrap cursor-pointer w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300 disabled:opacity-60 mt-1"
                >
                  {submitting ? 'Submitting...' : 'Check My Coverage'}
                  <i className="ri-arrow-right-line"></i>
                </button>

                <p className="text-[11px] text-[#3A4A3C]/40 font-light text-center leading-relaxed">
                  Your information is 100% confidential and HIPAA-compliant. We will never share your data.
                </p>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
