"use client";

import { useState, type ReactNode } from "react";

interface VirtualLpFaqItemProps {
  question: ReactNode;
  answer: ReactNode;
  initialOpen?: boolean;
}

/** Client-side accordion shell. Question + answer are passed in as JSX so
 *  the parent server component can wrap them in editable text. */
export default function VirtualLpFaqItem({
  question,
  answer,
  initialOpen = false,
}: VirtualLpFaqItemProps) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-6 px-6 py-6 text-left transition hover:bg-sand/40"
      >
        <span className="font-heading text-base font-bold text-navy md:text-lg">{question}</span>
        <span
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-sand-dark text-navy transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <i className="ri-add-line text-sm" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[28rem] pb-6" : "max-h-0"
        }`}
      >
        <div className="px-6 text-sm leading-relaxed text-espresso/70">{answer}</div>
      </div>
    </div>
  );
}
