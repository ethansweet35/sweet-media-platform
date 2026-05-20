import { useState } from "react";
import { cn } from "@/lib/utils";

interface SponsorTier {
  name: string;
  amount: string;
  accentColor: string;
  details: string[];
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "Silver Sponsor",
    amount: "$1,500",
    accentColor: "bg-stone-blue",
    details: [
      "Name or Logo listed in event program",
      "Social Media Thank You (1 post)",
      "2 Complimentary Tickets to the gala",
      "Recognition on Gala Sponsor Slide during event",
    ],
  },
  {
    name: "Gold Sponsor",
    amount: "$5,000",
    accentColor: "bg-[#C9A44A]",
    details: [
      "Small Logo Placement on gala signage",
      "Verbal Acknowledgment during opening remarks",
      "4 Complimentary Tickets to the gala",
      "Social Media Highlight (2 posts)",
    ],
  },
  {
    name: "Platinum Sponsor",
    amount: "$7,500",
    accentColor: "bg-sky-blue",
    details: [
      "Medium Logo Placement on gala signage",
      "Half-Page Ad or Tribute in gala program",
      "6 Complimentary Tickets to the gala",
      "Sponsor Feature on social media (with company bio and link)",
    ],
  },
  {
    name: "Legacy Sponsor",
    amount: "$10,000",
    accentColor: "bg-tfrf-blue",
    details: [
      "Premier Logo Placement on all printed materials",
      "Full-Page Ad or Tribute in gala program",
      "8 Complimentary Tickets with VIP Table Seating",
      "Exclusive On-Stage Thank You",
    ],
  },
];

export default function NashvilleSponsorshipsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleTier = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="sponsorships" className="bg-soft-white py-16 md:py-20 lg:py-24">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-3">
            Partner With Us
          </p>
          <h2 className="font-display text-display-m text-deep-navy mb-4">
            Sponsorship Opportunities
          </h2>
          <p className="text-body-m font-body text-slate max-w-xl mx-auto">
            Support our mission while gaining meaningful visibility for your organization. Every sponsorship directly impacts families in need.
          </p>
        </div>

        {/* Sponsor tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-12">
          {sponsorTiers.map((tier, index) => (
            <div
              key={tier.name}
              className="group bg-pure-white rounded-2xl border border-mist/80 overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:border-powder-blue/60 transition-all duration-300"
            >
              {/* Colored accent bar */}
              <div className={cn("h-1.5 w-full", tier.accentColor)} />

              <div className="p-6 md:p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-display text-display-s text-deep-navy mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-body-l font-display text-[#C9A44A] font-medium">
                      {tier.amount}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleTier(index)}
                    className="w-9 h-9 rounded-full bg-soft-white hover:bg-mist flex items-center justify-center transition-colors duration-200 cursor-pointer shrink-0"
                    aria-label={`Toggle ${tier.name} details`}
                  >
                    <i
                      className={cn(
                        "ri-arrow-down-s-line w-5 h-5 flex items-center justify-center text-slate transition-transform duration-200",
                        openIndex === index && "rotate-180 text-tfrf-blue"
                      )}
                    />
                  </button>
                </div>

                {/* Expandable benefits */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-400",
                    openIndex === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-2.5 pb-2">
                    {tier.details.map((detail) => (
                      <li
                        key={detail}
                        className="text-body-s font-body text-slate flex items-start gap-2.5"
                      >
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-tfrf-blue mt-0.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Always-visible benefit preview */}
                {openIndex !== index && (
                  <p className="text-body-s font-body text-slate/70">
                    {tier.details[0]} and {tier.details.length - 1} more benefits...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://donorbox.org/the-family-recovery-foundation-s-annual-gala-nashville-tn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 bg-deep-navy hover:bg-tfrf-blue text-pure-white font-body font-semibold text-[14px] uppercase tracking-[0.06em] rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Become a Sponsor
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}