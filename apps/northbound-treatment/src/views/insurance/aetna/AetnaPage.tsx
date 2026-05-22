import InsurancePageTemplate, { type InsurancePageData } from "@/views/shared/InsurancePageTemplate";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_insurance_hero_aetna.jpg";

const OTHER_CARRIERS = [
  { name: "Anthem / BCBS", href: "/insurance/anthem-blue-cross/" },
  { name: "Cigna", href: "/insurance/cigna/" },
  { name: "Tricare", href: "/insurance/tricare/" },
  { name: "Health Net (MHN)", href: "/insurance/health-net/" },
  { name: "Multiplan", href: "/insurance/multiplan/" },
  { name: "Beacon Health", href: "/insurance/beacon/" },
  { name: "ComPsych", href: "/insurance/compsych/" },
  { name: "First Health", href: "/insurance/first-health/" },
];

const data: InsurancePageData = {
  /* ── Hero ───────────────────────────────────────────────── */
  heroImage: HERO,
  heroImageAlt:
    "Northbound admissions counselor reviewing Aetna insurance benefits with a prospective client",
  carrierName: "Aetna",
  carrierTagline: "In-network preferred provider",
  heroBody:
    "Aetna covers drug and alcohol treatment — including detox, residential, PHP, and virtual IOP — for most of its members. Northbound is an in-network preferred provider, which means lower costs and streamlined authorization for you.",

  /* ── About ──────────────────────────────────────────────── */
  aboutHeadline: "Does Aetna Cover Addiction Treatment?",
  aboutBody: [
    "Yes — Aetna provides coverage for drug and alcohol treatment, including inpatient, residential, detox, partial hospitalization, and intensive outpatient care for most of its plan members. As one of the nation's largest insurance companies serving nearly 50 million members across all 50 states, Aetna has established robust behavioral health coverage aligned with the mental health parity requirements of the Affordable Care Act.",
    "Aetna determines coverage on an individual basis, so the specific length of stay and cost-sharing will vary depending on your plan type — whether that's an open-access plan, copay-only plan, or high-deductible plan. Northbound's admissions team contacts Aetna directly on your behalf to determine exactly what your policy covers before you arrive — at no cost to you.",
    "As an in-network preferred provider with Aetna, Northbound's contracted rates mean your out-of-pocket costs are significantly lower than going out-of-network. A majority of Northbound clients with Aetna coverage pay little to nothing out-of-pocket for treatment.",
  ],
  carrierFacts: [
    { icon: "ri-user-line", label: "Members Served", value: "~50 Million Members" },
    { icon: "ri-map-pin-2-line", label: "Availability", value: "All 50 States" },
    { icon: "ri-team-line", label: "Network Size", value: "470,000+ Doctors" },
    { icon: "ri-shield-check-line", label: "Northbound Status", value: "In-Network Preferred Provider" },
    { icon: "ri-hospital-line", label: "Behavioral Health", value: "Covers SUD + Mental Health" },
    { icon: "ri-time-line", label: "Verification Timeline", value: "1 Business Day" },
  ],

  /* ── Coverage ───────────────────────────────────────────── */
  coverageHeadline: "What Aetna Typically Covers at Northbound",
  coverageIntro:
    "Aetna covers most levels of addiction treatment at Northbound as an in-network provider. Coverage is determined by your specific plan and medical necessity — Northbound's team handles this verification for you.",
  coverageItems: [
    {
      icon: "ri-capsule-line",
      label: "Medical Detoxification",
      detail:
        "Aetna covers medically supervised detox in most plan types. Length of stay is determined based on clinical necessity and the specific substance being treated. Our IMS-certified detox in Garden Grove qualifies.",
    },
    {
      icon: "ri-home-heart-line",
      label: "Residential / Inpatient",
      detail:
        "Most Aetna plans include residential treatment coverage, with many offering 0% coinsurance after deductible for inpatient services. Length of stay varies by plan and clinical need — Northbound advocates for the full stay required.",
    },
    {
      icon: "ri-hospital-line",
      label: "Partial Hospitalization (PHP)",
      detail:
        "Aetna covers PHP as an intermediate level of care. PHP at Northbound provides up to 6 hours of structured programming daily — typically covered at in-network rates under your plan.",
    },
    {
      icon: "ri-calendar-check-line",
      label: "Virtual IOP (Telehealth)",
      detail:
        "Northbound's virtual IOP (HomeBound) — 6 to 12 hours of weekly clinical programming — is covered by most Aetna plans. Flexible day and evening scheduling makes IOP accessible while maintaining your work or family commitments.",
    },
    {
      icon: "ri-brain-line",
      label: "Dual-Diagnosis / Mental Health",
      detail:
        "Federal parity law requires Aetna to cover mental health treatment on par with physical health. Co-occurring disorders (PTSD, anxiety, depression, bipolar) are treated alongside addiction at Northbound — all under the same authorization.",
    },
    {
      icon: "ri-group-line",
      label: "Continuing Care Programs",
      detail:
        "Aetna's 'Continuing Care' model values ongoing community and alumni programming — aligned with Northbound's alumni association and aftercare services. Ongoing outpatient therapy following discharge is typically covered.",
    },
  ],

  /* ── How It Works ───────────────────────────────────────── */
  steps: [
    {
      number: "01",
      title: "Call or Submit Your Info",
      body: "Contact Northbound's admissions team by phone or submit the verification form on this page. You'll need your Aetna member ID and basic contact information.",
    },
    {
      number: "02",
      title: "We Verify Your Benefits",
      body: "Our benefits team contacts Aetna directly to determine your exact coverage — deductible status, copay, coinsurance, covered levels of care, and authorized length of stay. Typically completed within one business day.",
    },
    {
      number: "03",
      title: "Arrive at Northbound",
      body: "With your coverage confirmed and treatment plan ready, you check in to Northbound. Our team handles all ongoing utilization reviews and insurance authorizations throughout your stay — you focus on recovery.",
    },
  ],

  /* ── FAQ ────────────────────────────────────────────────── */
  faqs: [
    {
      q: "Does Aetna cover rehab for drug and alcohol addiction?",
      a: "Yes. Aetna covers drug and alcohol rehabilitation across most plan types, including inpatient, residential, detox, partial hospitalization (PHP), and virtual IOP (telehealth). Coverage for mental health treatment is also required under federal parity law. Specific benefits — length of stay, copays, deductible requirements — vary by your individual plan. Northbound verifies your benefits directly with Aetna at no cost to you.",
    },
    {
      q: "Is Northbound in-network with Aetna?",
      a: "Yes. Northbound Treatment Services is an in-network preferred provider with Aetna. This means your treatment costs are based on Northbound's negotiated in-network rates rather than higher out-of-network rates — significantly reducing your out-of-pocket expenses. Most Northbound patients with Aetna coverage pay little to nothing out-of-pocket.",
    },
    {
      q: "What is the difference between in-network and out-of-network coverage?",
      a: "When a treatment provider is in-network with your insurance, the rates are pre-negotiated and significantly discounted. You pay your deductible and any applicable coinsurance, and the insurer covers the rest at a predetermined rate. Out-of-network treatment is not subject to negotiated rates — your insurer will reimburse at a lower rate and you are responsible for a much higher share of the cost. As an Aetna in-network provider, Northbound ensures you maximize your benefit.",
    },
    {
      q: "What is a deductible, and how does it affect my Aetna coverage?",
      a: "Your deductible is the annual amount you must pay out-of-pocket before your insurance begins covering a larger share of your costs. For example, if your deductible is $1,000, you pay that first — then Aetna's coinsurance kicks in. Deductibles reset annually. If you've already met your deductible for the year, your out-of-pocket responsibility for treatment is significantly reduced. Northbound's team will review your deductible status during benefits verification.",
    },
    {
      q: "What is coinsurance, and what percentage does Aetna cover for inpatient rehab?",
      a: "Coinsurance is your percentage share of costs after your deductible is met. Many Aetna plans offer 0% coinsurance for in-network inpatient services — meaning Aetna covers 100% after your deductible is paid. This varies by plan type (open-access, copay, high-deductible). Northbound's benefits team will identify your specific coinsurance percentage during verification.",
    },
    {
      q: "Does Aetna require pre-authorization for addiction treatment?",
      a: "Yes, most Aetna plans require pre-certification (pre-authorization) before admission for inpatient and residential treatment. Northbound's admissions team handles the pre-certification process on your behalf — we're experienced in Aetna's requirements and will complete this step before you arrive. For plans that require you to notify Aetna directly, we guide you through that process.",
    },
    {
      q: "Can Aetna reduce or end my treatment coverage early?",
      a: "Insurance companies, including Aetna, conduct regular utilization reviews throughout treatment — checking that continued care is medically necessary. Northbound's dedicated team manages all utilization reviews, advocates strongly for continued coverage when clinically warranted, and ensures that certified medical professionals guide all care decisions. We fight to keep your coverage intact throughout your stay.",
    },
    {
      q: "What if I've already met my deductible for the year?",
      a: "If you've already met your annual deductible, your out-of-pocket costs for addiction treatment at Northbound are significantly reduced — in some cases to zero. This makes the end of the calendar year an excellent time to begin treatment if you've had other medical expenses. Northbound's team checks your deductible status as part of benefits verification.",
    },
  ],

  /* ── Related Carriers ────────────────────────────────────── */
  relatedCarriers: OTHER_CARRIERS,
};

export default function AetnaPage() {
  return <InsurancePageTemplate data={data} />;
}
