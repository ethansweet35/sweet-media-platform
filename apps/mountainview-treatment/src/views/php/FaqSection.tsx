const FAQS = [
  {
    q: "How long does the Partial Hospitalization Program last?",
    a: "The typical duration of our PHP is 2-4 weeks, though this varies based on individual progress and clinical needs. Some clients may need 6-8 weeks of PHP before transitioning to a lower level of care like IOP. Your treatment team will continuously assess your progress and recommend the appropriate length of stay.",
  },
  {
    q: "Can I work while attending PHP in Seattle?",
    a: "While PHP is intensive (5-6 hours daily, 5-6 days per week), some clients may maintain part-time work or educational commitments outside of program hours. However, we typically recommend taking time off during PHP to fully focus on recovery. Our admissions team can discuss FMLA and leave options with you.",
  },
  {
    q: "What's the difference between PHP and inpatient rehab?",
    a: "The main difference is that PHP clients return home or to sober living each evening instead of staying overnight at the facility. PHP provides comparable clinical intensity to inpatient care but allows for more independence and real-world application of recovery skills. It’s often used as a step-down from residential treatment.",
  },
  {
    q: "Does PHP include medication-assisted treatment (MAT)?",
    a: "Yes, our PHP offers comprehensive medication-assisted treatment for opioid use disorder (Suboxone, Vivitrol) and alcohol use disorder (Naltrexone, Acamprosate). Our medical team provides ongoing medication management, monitoring, and adjustment as part of your individualized treatment plan.",
  },
  {
    q: "What if I relapse during PHP?",
    a: "Relapse is sometimes part of the recovery process. If a relapse occurs during PHP, our clinical team will immediately assess the situation, provide crisis support, and modify your treatment plan as needed. This may involve increased monitoring, additional therapy sessions, or temporary step-up to a higher level of care.",
  },
  {
    q: "Do you offer family therapy in the PHP program?",
    a: "Absolutely. Family involvement is a crucial component of lasting recovery. Our PHP includes weekly family therapy sessions, family education workshops, and ongoing communication with loved ones (with your consent). We help families understand addiction, develop healthy boundaries, and support your recovery journey.",
  },
  {
    q: "Will I have the same therapist throughout PHP?",
    a: "Yes, you’ll be assigned a primary therapist who will work with you throughout your PHP treatment and coordinate with our multidisciplinary team. Continuity of care is important, and your primary therapist will also help facilitate your transition to the next level of care when appropriate.",
  },
  {
    q: "What happens after I complete PHP?",
    a: "Most clients transition from PHP to our Intensive Outpatient Program (IOP) or standard outpatient therapy. We create a comprehensive aftercare plan that may include ongoing individual therapy, support group participation, alumni programming, and community resources. Our goal is to set you up for long-term success in recovery.",
  },
];

export default function FaqSection() {
  return (
    <section className="bg-white text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Common Questions
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight sm:text-5xl lg:text-[52px]">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-black/10 border-y border-black/10">
          {FAQS.map((item, idx) => (
            <details
              key={item.q}
              className="group py-5"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[16px] font-semibold text-[var(--mvt-ink)] [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--mvt-ink)]/30 text-[var(--mvt-ink)] transition group-open:rotate-45"
                >
                  <i className="ri-add-line text-base" />
                </span>
              </summary>
              <p className="mt-3 max-w-3xl pr-10 text-[14px] leading-7 text-[var(--mvt-text)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
