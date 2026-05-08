"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function HeroContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service: "Intervention Services" }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/95 px-8 py-14 text-center shadow-2xl backdrop-blur-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8FAC87]/20">
          <i className="ri-check-double-line text-3xl text-[#507969]"></i>
        </span>
        <h3 className="font-heading text-2xl font-bold text-[#1A1A17]">We'll be in touch shortly.</h3>
        <p className="text-sm leading-relaxed text-[#4B4B4B]">
          Thank you for reaching out. A certified interventionist will contact you within a few hours — sooner if you need us urgently.
        </p>
        <a
          href="tel:9497767093"
          className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
        >
          <i className="ri-phone-fill"></i> Call us now: 949-776-7093
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/95 px-7 py-8 shadow-2xl backdrop-blur-sm"
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-[#8FAC87]">
        Free Confidential Consultation
      </p>
      <h3 className="font-heading mb-6 text-2xl font-bold text-[#1A1A17]">
        Speak with an interventionist today
      </h3>

      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#4B4B4B]">
              Your Name <span className="text-[#8FAC87]">*</span>
            </label>
            <input
              name="name"
              required
              type="text"
              placeholder="Jane Smith"
              className="w-full rounded-lg border border-[#EFEFEF] bg-white px-4 py-2.5 text-sm text-[#1A1A17] outline-none placeholder:text-[#9CA3AF] focus:border-[#8FAC87] focus:ring-2 focus:ring-[#8FAC87]/20 transition"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-[#4B4B4B]">
              Phone Number <span className="text-[#8FAC87]">*</span>
            </label>
            <input
              name="phone"
              required
              type="tel"
              placeholder="(949) 000-0000"
              className="w-full rounded-lg border border-[#EFEFEF] bg-white px-4 py-2.5 text-sm text-[#1A1A17] outline-none placeholder:text-[#9CA3AF] focus:border-[#8FAC87] focus:ring-2 focus:ring-[#8FAC87]/20 transition"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#4B4B4B]">
            Email Address <span className="text-[#8FAC87]">*</span>
          </label>
          <input
            name="email"
            required
            type="email"
            placeholder="jane@email.com"
            className="w-full rounded-lg border border-[#EFEFEF] bg-white px-4 py-2.5 text-sm text-[#1A1A17] outline-none placeholder:text-[#9CA3AF] focus:border-[#8FAC87] focus:ring-2 focus:ring-[#8FAC87]/20 transition"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-[#4B4B4B]">
            Briefly describe the situation
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="My son is struggling with opioid addiction and we don't know where to start..."
            className="w-full resize-none rounded-lg border border-[#EFEFEF] bg-white px-4 py-2.5 text-sm text-[#1A1A17] outline-none placeholder:text-[#9CA3AF] focus:border-[#8FAC87] focus:ring-2 focus:ring-[#8FAC87]/20 transition"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 text-xs text-red-600">
          Something went wrong — please call us directly at 949-776-7093.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full rounded-full bg-[#3E5B50] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#507969] disabled:opacity-60"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <i className="ri-loader-4-line animate-spin"></i> Sending…
          </span>
        ) : (
          "Request a Free Consultation"
        )}
      </button>

      <p className="mt-4 text-center text-xs text-[#9CA3AF]">
        <i className="ri-lock-line mr-1"></i>
        100% confidential · We never share your information
      </p>
    </form>
  );
}
