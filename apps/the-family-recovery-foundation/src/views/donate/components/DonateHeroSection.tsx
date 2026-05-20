'use client';

import { useState, FormEvent } from "react";

const suggestedAmounts = [5, 10, 25, 50, 100, 500];

export default function DonateHeroSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "quarterly" | "annually">("one-time");
  const [dedicate, setDedicate] = useState(false);
  const [comment, setComment] = useState(false);
  const [honoreeName, setHonoreeName] = useState("");
  const [honorType, setHonorType] = useState<"honor" | "memory">("honor");
  const [recipientMessage, setRecipientMessage] = useState("");
  const [userComment, setUserComment] = useState("");

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const finalAmount = selectedAmount ?? (customAmount ? parseFloat(customAmount) : 0);

  const donorboxUrl = `https://donorbox.org/embed/the-family-recovery-foundation?a=b&amount=${finalAmount}&default_interval=${frequency}`;

  return (
    <section className="relative min-h-[700px] md:min-h-[800px]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://jkiafgbizwufsycqlfyr.supabase.co/storage/v1/object/public/site-assets/images/tfrf_sq_8d7904a2_LifeLinesGrey_Banner.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-content mx-auto px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left column — text content */}
          <div className="lg:col-span-5">
            <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-tfrf-blue mb-4">
              Help Advance Awareness
            </p>
            <h1 className="text-display-m font-display text-deep-navy mb-6">
              Donate to The Family Recovery Foundation
            </h1>
            <p className="text-body-m font-body text-slate mb-4">
              Help support the The Family Recovery Foundation mission. Donate today!
            </p>
            <p className="text-caption font-body italic text-stone-blue mb-4">
              The Family Recovery Foundation is a 501(c)(3) nonprofit organization, Tax I.D. #87-4108362 - Donations to The Family Recovery Foundation are tax-deductible to the fullest extent of the law. No goods or services were received in exchange for these donations.
            </p>
            <p className="text-caption font-body italic text-deep-navy mb-1">
              <strong>Please make checks payable to "Lifeline Recovery Services Foundation" with a note "DBA The Family Recovery Foundation" and mail to:</strong>
            </p>
            <p className="text-caption font-body italic text-deep-navy mb-8">
              <strong>
                Lifeline Recovery Services Foundation<br />
                9842 13th St<br />
                Garden Grove CA 92844
              </strong>
            </p>

            <hr className="border-mist mb-8" />

            <p className="text-body-s font-body text-slate leading-relaxed">
              Our non-profit is spearheading a Drug Prevention Campaign aimed at financing educational initiatives and providing resources to parents of youth to assist them in navigating the complexities of addiction within their homes and communities.
            </p>
          </div>

          {/* Spacer column */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right column — donation widget */}
          <div className="lg:col-span-6">
            <div className="bg-pure-white rounded-xl border border-mist/60 overflow-hidden shadow-sm">
              {/* Widget header */}
              <div className="bg-tfrf-blue px-5 py-3 flex items-center justify-between">
                <span className="text-body-s font-body font-semibold text-pure-white">Choose amount</span>
                <div className="flex items-center gap-2 text-pure-white/70">
                  <i className="ri-lock-line w-4 h-4 flex items-center justify-center text-sm" />
                  <span className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full ${i === 0 ? "bg-pure-white" : "bg-pure-white/30"}`}
                      />
                    ))}
                  </span>
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center text-sm" />
                </div>
              </div>

              {/* Widget body */}
              <div className="p-5 md:p-6">
                {/* Frequency tabs */}
                <div className="flex flex-wrap gap-0 mb-5 border border-mist rounded-md overflow-hidden">
                  {([
                    { key: "one-time", label: "One-time" },
                    { key: "monthly", label: "Monthly" },
                    { key: "quarterly", label: "Quarterly" },
                    { key: "annually", label: "Annually" },
                  ] as const).map((freq) => (
                    <button
                      key={freq.key}
                      onClick={() => setFrequency(freq.key)}
                      className={`flex-1 min-w-[70px] px-3 py-2 text-xs font-body font-medium whitespace-nowrap cursor-pointer transition-colors duration-150 ${
                        frequency === freq.key
                          ? "bg-tfrf-blue text-pure-white"
                          : "bg-pure-white text-deep-navy hover:bg-mist/50"
                      }`}
                    >
                      {freq.key === "monthly" && (
                        <i className="ri-heart-fill w-3 h-3 inline-flex items-center justify-center mr-1 text-[10px]" />
                      )}
                      {freq.label}
                    </button>
                  ))}
                </div>

                {/* Amount grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountClick(amount)}
                      className={`py-3 px-2 rounded-md border text-body-m font-body font-medium cursor-pointer transition-all duration-150 ${
                        selectedAmount === amount
                          ? "border-tfrf-blue bg-tfrf-blue/5 text-tfrf-blue"
                          : "border-mist text-deep-navy hover:border-sky-blue hover:text-sky-blue"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="relative mb-5">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-body-m font-body text-slate">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={(e) => handleCustomChange(e.target.value)}
                    className="w-full pl-7 pr-3 py-3 border border-mist rounded-md text-body-m font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3 mb-5">
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={dedicate}
                        onChange={(e) => setDedicate(e.target.checked)}
                        className="w-4 h-4 rounded border-mist text-tfrf-blue focus:ring-tfrf-blue cursor-pointer"
                      />
                    </div>
                    <span className="text-body-s font-body text-slate group-hover:text-deep-navy transition-colors duration-150">
                      Dedicate my donation in honor or in memory of someone
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={comment}
                        onChange={(e) => setComment(e.target.checked)}
                        className="w-4 h-4 rounded border-mist text-tfrf-blue focus:ring-tfrf-blue cursor-pointer"
                      />
                    </div>
                    <span className="text-body-s font-body text-slate group-hover:text-deep-navy transition-colors duration-150">
                      Write us a comment
                    </span>
                  </label>
                </div>

                {/* Dedication fields */}
                {dedicate && (
                  <div className="mb-5 p-4 bg-soft-white rounded-lg border border-mist">
                    <fieldset className="mb-3">
                      <legend className="text-caption font-body font-semibold text-deep-navy mb-2 sr-only">
                        In honor / memoriam
                      </legend>
                      <div className="flex gap-4 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="honorType"
                            value="honor"
                            checked={honorType === "honor"}
                            onChange={() => setHonorType("honor")}
                            className="w-4 h-4 text-tfrf-blue cursor-pointer"
                          />
                          <span className="text-body-s font-body text-deep-navy">In honor of</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="honorType"
                            value="memory"
                            checked={honorType === "memory"}
                            onChange={() => setHonorType("memory")}
                            className="w-4 h-4 text-tfrf-blue cursor-pointer"
                          />
                          <span className="text-body-s font-body text-deep-navy">In memory of</span>
                        </label>
                      </div>
                    </fieldset>
                    <div className="mb-3">
                      <label className="block text-caption font-body font-semibold text-deep-navy mb-1">
                        {honorType === "honor" ? "Honoree Name" : "In memoriam of"}
                      </label>
                      <input
                        type="text"
                        value={honoreeName}
                        onChange={(e) => setHonoreeName(e.target.value)}
                        className="w-full px-3 py-2.5 border border-mist rounded-md text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150"
                        placeholder={honorType === "honor" ? "Honoree Name" : "Name"}
                      />
                    </div>
                    <div>
                      <label className="block text-caption font-body font-semibold text-deep-navy mb-1">
                        Message for the honoree (optional)
                      </label>
                      <textarea
                        rows={2}
                        value={recipientMessage}
                        onChange={(e) => setRecipientMessage(e.target.value)}
                        className="w-full px-3 py-2.5 border border-mist rounded-md text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Comment field */}
                {comment && (
                  <div className="mb-5">
                    <label className="block text-caption font-body font-semibold text-deep-navy mb-1">
                      Your comment
                    </label>
                    <textarea
                      rows={2}
                      value={userComment}
                      onChange={(e) => setUserComment(e.target.value)}
                      className="w-full px-3 py-2.5 border border-mist rounded-md text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue transition-colors duration-150 resize-none"
                    />
                  </div>
                )}

                {/* Next button */}
                <a
                  href={donorboxUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-tfrf-blue hover:bg-deep-navy text-pure-white text-body-m font-body font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  Next
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                </a>

                <p className="text-center mt-3">
                  <a
                    href="https://donorbox.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caption font-body text-tfrf-blue hover:text-deep-navy transition-colors duration-150"
                  >
                    Powered by Donorbox
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}