import InsurancePage from "./InsurancePage";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/admissions-1.webp";

export default function CignaPage() {
  return (
    <InsurancePage
      carrier="Cigna"
      slug="cigna"
      heroImage={HERO_IMG}
      headline="Cigna Insurance Coverage for Treatment at Mountain View"
      heroBody="In-network coverage through Cigna and Evernorth Behavioral Health for PHP, IOP, and outpatient behavioral health care. Our admissions team verifies your Cigna benefits at no cost."
      memberStat="2 Divisions"
      memberStatLabel="Cigna Healthcare + Evernorth Health Services"
      aboutBody="Cigna Healthcare is one of the largest health service organizations in the United States, operating as a division of The Cigna Group alongside Evernorth Health Services. Cigna provides medical, behavioral, pharmacy, and dental coverage to tens of millions of members through employer-sponsored plans, individual marketplace plans, and Medicare Advantage. A defining feature of Cigna's structure is that while Cigna is the health plan and contracting entity, Evernorth Behavioral Health handles behavioral health authorization, utilization management, and clinical review on Cigna's behalf. Many Cigna members are also covered under self-funded employer plans, in which the employer assumes financial responsibility and Cigna serves as administrator."
      planTypes={[
        {
          label: "Open Access Plus (OAP)",
          desc: "Cigna's most common PPO-style network — members can see in-network specialists without a referral and have reduced (but not eliminated) out-of-network coverage.",
        },
        {
          label: "HMO (Health Maintenance Organization)",
          desc: "Requires care from in-network providers and often a referral from a primary care physician.",
        },
        {
          label: "LocalPlus",
          desc: "A regionally focused network available in select states with lower premiums and a more limited provider list.",
        },
        {
          label: "EPO (Exclusive Provider Organization)",
          desc: "Covers in-network providers only, no referral required.",
        },
        {
          label: "HDHP (High-Deductible Health Plan)",
          desc: "Lower premiums paired with higher deductibles, often combined with an HSA.",
        },
      ]}
      parityBody="Under the Mental Health Parity and Addiction Equity Act of 2008, Cigna is required to provide coverage for mental health and substance use disorder treatment comparable to coverage for medical and surgical care. Cigna plans generally cannot impose stricter limits on behavioral health benefits than they do on other medical benefits."
      necessityBody="Coverage decisions are made by Evernorth Behavioral Health based on medical necessity. For substance use disorder care, level-of-care decisions are guided by the ASAM Criteria. Reviewers consider the severity of the condition, prior treatment history, co-occurring disorders, and the appropriate level of care."
      levelsOfCare={[
        {
          title: "Partial Hospitalization Program (PHP)",
          body: "Intensive daytime treatment, typically 5–6 hours per day, 5 days per week, while the individual returns home or to supportive housing in the evenings.",
        },
        {
          title: "Intensive Outpatient Program (IOP)",
          body: "Approximately 9–12 hours of treatment per week, designed for individuals stepping down from higher levels of care or maintaining work, school, or family responsibilities.",
        },
        {
          title: "Standard Outpatient Care",
          body: "Individual therapy, group therapy, medication management, and aftercare planning as part of an ongoing recovery plan.",
        },
        {
          title: "Co-Occurring Disorder Treatment",
          body: "Addresses substance use alongside mental health conditions such as depression, anxiety, PTSD, and bipolar disorder as part of integrated treatment.",
        },
      ]}
      outOfPocket={[
        { label: "Deductible", desc: "The amount paid out-of-pocket before insurance begins covering services." },
        { label: "Copayment", desc: "A fixed dollar amount paid for specific services, such as a therapy session." },
        { label: "Coinsurance", desc: "A percentage of the service cost paid after the deductible is met." },
        { label: "Out-of-Pocket Maximum", desc: "The annual cap on total cost-sharing, after which the plan pays 100% of covered services." },
      ]}
      oonNote="Choosing an in-network provider like Mountain View Treatment results in lower deductibles, lower coinsurance rates, and a lower out-of-pocket maximum. For members on self-funded employer plans, the benefit structure is set by the employer — verification confirms the exact terms."
      preAuthBody="Most Cigna plans require pre-authorization for residential treatment, partial hospitalization, and intensive outpatient programs. Mountain View's clinical team submits documentation to Evernorth Behavioral Health to demonstrate that the requested level of care meets medical necessity criteria."
      concurrentBody="Once treatment begins, Evernorth conducts concurrent reviews at regular intervals to determine whether continued care remains medically necessary. Mountain View's utilization review team manages this process directly with Evernorth, advocating for the appropriate length of stay."
      privacyBody="Treatment records are protected under federal law, including HIPAA and 42 CFR Part 2. Cigna and Evernorth receive only the information necessary to process claims and authorize care. Employers, family members not involved in payment, and other third parties do not receive details of treatment without explicit written authorization."
      privacyNote="Dependents covered under a family member's Cigna plan, including adult children up to age 26, are entitled to the same confidentiality protections as the policyholder."
      vobIntro="Because coverage varies significantly between fully insured plans, self-funded employer plans, and individual marketplace plans, the most accurate way to understand benefits is through a verification of benefits. Mountain View's admissions team contacts Cigna and Evernorth directly with the member's policy information."
      vobBullets={[
        "Whether the plan is active and in-network",
        "Whether the plan is fully insured or self-funded, which affects the benefit structure",
        "The deductible amount and how much has been met",
        "Coinsurance and copayment amounts",
        "Out-of-pocket maximum and progress toward it",
        "Pre-authorization requirements",
        "Coverage limits for specific levels of care",
        "Out-of-network benefit availability if applicable",
      ]}
      faqs={[
        {
          q: "Does Cigna cover the full cost of treatment?",
          a: "Coverage depends on the specific plan, the level of care, and where the member is in their deductible and out-of-pocket maximum. Few plans cover 100% of treatment from the first day, but in-network care substantially reduces costs.",
        },
        {
          q: "My card says Cigna but I was told my behavioral health is managed by Evernorth. Is that a separate plan?",
          a: "No. Evernorth Behavioral Health is Cigna's behavioral health subsidiary. Authorization and clinical reviews for mental health and substance use treatment are handled by Evernorth, but the coverage itself is part of the Cigna plan.",
        },
        {
          q: "What if my employer self-funds my Cigna plan?",
          a: "Self-funded plans use Cigna's network and administrative services, but the actual benefit design is set by the employer. Some self-funded plans have different limits or authorization requirements than standard Cigna commercial plans, which is why benefits verification is especially important for these members.",
        },
        {
          q: "What happens if Cigna denies coverage for a recommended level of care?",
          a: "Coverage decisions can be appealed. Mountain View's clinical team assists with appeals by providing documentation supporting medical necessity, and members have the right to external review under the Affordable Care Act.",
        },
        {
          q: "Are medications covered during treatment?",
          a: "Medications used in treatment, including those for MAT such as buprenorphine, naltrexone, and methadone, are generally covered under Cigna's pharmacy or medical benefits, depending on how they are administered.",
        },
        {
          q: "Does using Cigna for treatment affect future insurance rates?",
          a: "Under the Affordable Care Act, insurers cannot raise premiums or deny coverage based on a history of mental health or substance use treatment.",
        },
      ]}
    />
  );
}
