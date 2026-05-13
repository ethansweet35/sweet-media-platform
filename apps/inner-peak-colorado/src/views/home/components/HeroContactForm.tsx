"use client";

import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

export default function HeroContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <div className="w-full">
      <div className="bg-[#2C3B2E]/70 backdrop-blur-md border border-[#FAF8F5]/10 rounded-2xl p-8 flex flex-col gap-6">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 text-center py-6">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#8FA489]/20">
              <i className="ri-checkbox-circle-line text-3xl text-[#8FA489]"></i>
            </div>
            <h3 className="font-serif text-[#FAF8F5] text-xl">We'll be in touch soon.</h3>
            <p className="text-[#F0ECE1]/65 font-light text-sm leading-relaxed">
              <AutoLinkedTextClient>{"A member of our intake team will contact you within a few hours. If you need immediate\n              support, call us at 719-733-8556."}</AutoLinkedTextClient>
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-[#FAF8F5] text-xl">Request a Free Consultation</h2>
              <p className="text-[#F0ECE1]/50 font-light text-xs leading-relaxed">
                <AutoLinkedTextClient>{"Confidential · No commitment required · We respond within hours"}</AutoLinkedTextClient>
              </p>
            </div>

            <form id="hero-contact-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">
                    Full Name *
                  </label>
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
                  <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">
                    Email *
                  </label>
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
                <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">
                  Phone Number
                </label>
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
                <label className="text-[10px] uppercase tracking-widest text-[#DDA15E] font-medium">
                  How Can We Help?
                </label>
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
                {submitting ? "Sending..." : "Request Free Consultation"}
                <i className="ri-arrow-right-line"></i>
              </button>

              <p className="text-[10px] text-[#F0ECE1]/35 text-center font-light">
                <AutoLinkedTextClient>{"HIPAA-compliant · Strictly confidential · No obligation"}</AutoLinkedTextClient>
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
