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
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Frequently Asked Questions</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1.1 }}
            >
              Common Questions
            </h2>
          </div>

          <div className="divide-y divide-warm/40 border border-warm/40">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors pr-4">
                    {faq.q}
                  </span>
                  <i
                    className={`ri-${open === i ? "subtract" : "add"}-line text-accent text-lg shrink-0 transition-transform duration-200`}
                  />
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm font-light leading-relaxed text-ink/70">{faq.a}</p>
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
