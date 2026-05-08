"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";

export default function FaqAccordion({
  eyebrow = "Still Have Questions?",
  title = "Frequently Asked Questions",
  faqs,
}: {
  eyebrow?: string;
  title?: string;
  faqs: Faq[];
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-[#F5F3E7] py-24">
      <div className="mx-auto w-full max-w-4xl px-6 lg:px-10">
        <div className="mb-12">
          <p className="brand-eyebrow mb-3 text-[#8FAC87]">{eyebrow}</p>
          <h2 className="font-heading text-4xl font-bold text-[#1A1A17] md:text-5xl">
            {title}
          </h2>
        </div>

        <div className="divide-y divide-[#EFEFEF] overflow-hidden rounded-3xl border border-[#EFEFEF] bg-white shadow-sm">
          {faqs.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 px-8 py-6 text-left transition hover:bg-[#F5F3E7]/50"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? null : i)}
                >
                  <span className="font-heading text-lg font-bold text-[#1A1A17]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      open ? "bg-[#8FAC87] text-white" : "bg-[#F5F3E7] text-[#507969]"
                    }`}
                  >
                    <i
                      className={`text-lg transition-transform duration-200 ${
                        open ? "ri-subtract-line" : "ri-add-line"
                      }`}
                    ></i>
                  </span>
                </button>
                {open && (
                  <div className="px-8 pb-6 pr-16">
                    <p className="text-base leading-relaxed text-[#4B4B4B]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
