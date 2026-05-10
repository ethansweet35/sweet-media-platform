"use client";

import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const FAQS = [
  {
    q: "How do I start the admissions process?",
    a: "Simply call our 24/7 admissions line at (866) 311-0003. You'll be connected with an Admissions Representative who will conduct a confidential pre-admission assessment to understand your history, needs, and any co-occurring disorders that need to be addressed in your treatment plan.",
  },
  {
    q: "Does Northbound accept my insurance?",
    a: "Northbound is a preferred in-network provider with over 15 major insurance companies, including Aetna, Anthem, BCBS, Cigna, Health Net, TriCare, and more. Our team will verify your benefits at no cost to you and walk you through your coverage before you arrive.",
  },
  {
    q: "What if I'm traveling from out of state?",
    a: "More than half of our patients travel to our Southern California facilities from other states. Our travel coordination team will assist you in making all necessary arrangements to get to our facilities comfortably and safely.",
  },
  {
    q: "How long does treatment last?",
    a: "Treatment length varies based on individual need and the level of care required. We offer a full continuum — from medical detox through residential, PHP, IOP, sober living, and aftercare — allowing us to step you up or down based on progress. Many clients complete a 30, 60, or 90-day program.",
  },
  {
    q: "What does treatment at Northbound cost?",
    a: "We work with most major insurance plans to minimize or eliminate out-of-pocket costs. For those without insurance, we offer affordable self-pay and financing options. Our team will build a financial plan before you arrive so there are no surprises.",
  },
  {
    q: "What should I bring to treatment?",
    a: "Pack comfortable clothing, toiletries, prescription medications (we'll store and distribute them), a photo ID and insurance card, photos of loved ones for motivation, a contact list, and books or personal items for downtime. We'll send you a complete packing list after your intake call.",
  },
  {
    q: "Will I have access to my family during treatment?",
    a: "Family involvement is a cornerstone of our program. We offer structured family therapy sessions, family education workshops, and regular communication to keep your loved ones informed and supportive throughout your recovery.",
  },
  {
    q: "Is Northbound accredited and licensed?",
    a: "Yes. Northbound is licensed by the California Department of Health Care Services (DHCS License #300661CP) and is a proud member of NAATP (National Association of Addiction Treatment Providers), adhering to the highest standards of ethics and quality care.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-sand-dark">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-6 py-6 text-left"
          >
            <span className="font-heading text-base font-bold text-navy md:text-lg">
              {faq.q}
            </span>
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
              open === i ? "max-h-96 pb-6" : "max-h-0"
            }`}
          >
            <p className="text-sm leading-relaxed text-espresso/70"><AutoLinkedTextClient>{faq.a}</AutoLinkedTextClient></p>
          </div>
        </div>
      ))}
    </div>
  );
}
