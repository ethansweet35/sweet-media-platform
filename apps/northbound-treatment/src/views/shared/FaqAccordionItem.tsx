"use client";

import { useState, type ReactNode } from "react";

interface FaqAccordionItemProps {
  question: ReactNode;
  answer: ReactNode;
  initialOpen?: boolean;
}

/**
 * Client accordion shell. Question + answer are passed as JSX so the parent
 * server component can wrap them in AutoLinkedText.
 */
export default function FaqAccordionItem({
  question,
  answer,
  initialOpen = false,
}: FaqAccordionItemProps) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="font-heading text-base font-bold text-navy md:text-lg">{question}</span>
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-sand-dark text-navy transition-transform duration-300 ${
            open ? "rotate-45 border-terracotta bg-terracotta text-white" : ""
          }`}
        >
          <i className="ri-add-line text-sm" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <div className="text-sm leading-relaxed text-espresso/70">{answer}</div>
      </div>
    </div>
  );
}
