"use client";

import { FormEvent, useState } from "react";

export default function FormMakeADifferenceContent() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      form_type: "Make a Difference",
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: [
        `Interest: ${formData.get("interest")}`,
        String(formData.get("message") ?? ""),
      ]
        .filter(Boolean)
        .join("\n\n"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-md border border-mist bg-pure-white text-body-s font-body text-deep-navy focus:outline-none focus:border-tfrf-blue focus:ring-1 focus:ring-tfrf-blue/20";

  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-content mx-auto px-6 lg:px-16 max-w-xl">
        {status === "success" ? (
          <div className="rounded-2xl bg-powder-blue/30 border border-tfrf-blue/20 p-8 text-center">
            <p className="text-[16px] font-body font-semibold text-deep-navy">Thank you!</p>
            <p className="text-[14px] font-body text-slate mt-2">Our team will be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-pure-white border border-mist/60 p-8 shadow-sm">
            <div>
              <label htmlFor="name" className="block text-body-m font-body font-semibold text-deep-navy mb-2">
                Name <span className="text-stone-blue font-normal">(required)</span>
              </label>
              <input id="name" name="name" type="text" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="block text-body-m font-body font-semibold text-deep-navy mb-2">
                Email <span className="text-stone-blue font-normal">(required)</span>
              </label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-body-m font-body font-semibold text-deep-navy mb-2">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" className={inputClass} />
            </div>
            <div>
              <label htmlFor="interest" className="block text-body-m font-body font-semibold text-deep-navy mb-2">
                How would you like to help?
              </label>
              <select id="interest" name="interest" required defaultValue="" className={`${inputClass} cursor-pointer`}>
                <option value="" disabled>
                  Select one
                </option>
                <option value="Blog contribution">Blog contribution</option>
                <option value="Volunteer / committee">Volunteer / committee</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Professional services">Professional services (photo, video, etc.)</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-body-m font-body font-semibold text-deep-navy mb-2">
                Message
              </label>
              <textarea id="message" name="message" rows={4} className={`${inputClass} resize-none`} />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-deep-navy px-8 py-4 text-body-s font-body font-semibold text-pure-white hover:bg-tfrf-blue transition-colors disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Submit"}
            </button>
            {status === "error" ? (
              <p className="text-[13px] font-body text-red-600">Something went wrong. Please try again.</p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}
