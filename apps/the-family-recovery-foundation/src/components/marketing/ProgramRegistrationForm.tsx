'use client';

import { useState } from "react";

interface ProgramRegistrationFormProps {
  programTitle: string;
  formId?: string;
}

export default function ProgramRegistrationForm({
  programTitle,
  formId = "program-registration",
}: ProgramRegistrationFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      form_type: `Registration — ${programTitle}`,
      name: [formData.get("firstName"), formData.get("lastName")].filter(Boolean).join(" "),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      hearAbout: String(formData.get("hearAbout") ?? ""),
      message: `Registered for: ${programTitle}. Zoom details to be sent.`,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-mist bg-pure-white text-[14px] font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue focus:ring-1 focus:ring-tfrf-blue/20";

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-powder-blue/30 border border-tfrf-blue/20 p-8 text-center">
        <i className="ri-check-line text-3xl text-tfrf-blue mb-3" />
        <p className="text-[16px] font-body font-semibold text-deep-navy">Thank you for registering!</p>
        <p className="text-[14px] font-body text-slate mt-2">
          We will send your Zoom login details for {programTitle} shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-[13px] font-body text-tfrf-blue underline cursor-pointer"
        >
          Register another person
        </button>
      </div>
    );
  }

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4">
      <p className="text-[14px] font-body text-slate mb-2">
        Your Zoom login details will be sent after registration.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name" required className={inputClass} />
        <input type="text" name="lastName" placeholder="Last Name" required className={inputClass} />
      </div>
      <input type="email" name="email" placeholder="Email Address" required className={inputClass} />
      <input type="tel" name="phone" placeholder="Phone Number" required className={inputClass} />
      <input
        type="text"
        name="hearAbout"
        placeholder="How did you hear about us?"
        required
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-tfrf-blue px-6 py-3.5 text-[14px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <i className="ri-loader-4-line animate-spin" />
            Submitting…
          </>
        ) : (
          "Register Now"
        )}
      </button>
      {status === "error" ? (
        <p className="text-[13px] font-body text-red-600">
          Something went wrong. Please try again or call{" "}
          <a href="tel:888-964-8825" className="underline">
            888-964-8825
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
