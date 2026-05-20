"use client";

import { useState } from "react";
import { VIRTUAL_LP_FAQS } from "./content";

export default function VirtualLpFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand-dark border border-sand-dark bg-white">
      {VIRTUAL_LP_FAQS.map((faq, i) => (
        <div key={faq.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left transition hover:bg-sand/40"
          >
            <span className="font-heading text-base font-bold text-navy md:text-lg">{faq.q}</span>
            <span
              className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-sand-dark text-navy transition-transform duration-300 ${
                open === i ? "rotate-45" : ""
              }`}
            >
              <i className="ri-add-line text-sm" />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === i ? "max-h-[28rem] pb-6" : "max-h-0"
            }`}
          >
            <p className="px-6 text-sm leading-relaxed text-espresso/70">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
