"use client";

import { useState } from "react";

const DEFAULT_FAQS = [
  {
    q: "Can family members be involved in the treatment process?",
    a: "We encourage family involvement when appropriate. We offer family education sessions and support resources to help loved ones understand addiction and mental health challenges, fostering a supportive recovery environment.",
  },
  {
    q: "Do you offer individualized treatment plans?",
    a: "Absolutely. Every client receives a customized treatment plan based on their medical history, substance use, and mental health needs. Our multidisciplinary team ensures holistic care tailored to each individual.",
  },
  {
    q: "What amenities or support services do you provide during detox?",
    a: "Our facility offers a comfortable, serene environment with private rooms, nutritious meals, and holistic therapies like mindfulness and stress management to support physical and emotional well-being during detox.",
  },
  {
    q: "Is detox safe at your facility?",
    a: "Yes, safety is our top priority. Our detox programs are medically supervised 24/7 by experienced healthcare professionals, ensuring clients receive personalized care and support throughout the detoxification process.",
  },
];

interface LpFaqProps {
  faqs?: { q: string; a: string }[];
}

export default function LpFaq({ faqs = DEFAULT_FAQS }: LpFaqProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#F5F3E7]">
      <div className="mx-auto max-w-[1300px] w-full px-[30px] py-[75px] lg:px-6 lg:py-[100px]">
        <div className="grid lg:grid-cols-[320px_1fr] gap-14 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent mb-5">
              FAQ
            </p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink leading-[1.05] mb-5"
              style={{ fontSize: "clamp(32px, 3.5vw, 46px)" }}
            >
              Common<br />
              <em className="italic text-ink/50">Questions</em>
            </h2>
            <p className="text-[14px] font-light leading-relaxed text-ink/60">
              Still have questions? Call our admissions team 24/7 — we are always here to help.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between px-0 py-5 text-left group gap-4"
                >
                  <span className={`text-[15px] font-light leading-snug transition-colors duration-200 ${open === i ? "text-ink" : "text-ink/70 group-hover:text-ink"}`}>
                    {faq.q}
                  </span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-200 mt-0.5 ${open === i ? "bg-ink border-ink text-white" : "border-ink/20 text-ink/40 group-hover:border-ink/40"}`}>
                    <i className={`text-sm ${open === i ? "ri-subtract-line" : "ri-add-line"}`} />
                  </span>
                </button>
                {open === i && (
                  <div className="pb-5">
                    <p className="text-[14px] font-light leading-relaxed text-ink/60">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
