import InsurancePage from "./InsurancePage";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/admissions-1.webp";

export default function UhcPage() {
  return (
    <InsurancePage
      carrier="UnitedHealthcare"
      slug="uhc"
      heroImage={HERO_IMG}
      headline="UnitedHealthcare Insurance Coverage for Treatment at Mountain View"
      heroBody="In-network coverage through UnitedHealthcare and Optum Behavioral Health for PHP, IOP, and outpatient care. Our admissions team verifies your UnitedHealthcare benefits at no cost."
      memberStat="50M+"
      memberStatLabel="UnitedHealthcare members served"
      aboutBody="UnitedHealthcare is the largest health insurance company in the United States, serving approximately 50 million members through employer-sponsored plans, individual marketplace plans, Medicare Advantage, Medicaid, and TRICARE supplemental programs. UnitedHealthcare is a subsidiary of UnitedHealth Group. A defining feature of UnitedHealthcare's structure is that while UnitedHealthcare is the health plan and contracting entity, Optum Behavioral Health handles behavioral health authorization, utilization management, and clinical review on UnitedHealthcare's behalf. Many UnitedHealthcare members are also covered under self-funded employer plans, making benefits verification especially important."
      planTypes={[
        {
          label: "Choice Plus",
          desc: "UnitedHealthcare's most widely used PPO-style network — members can see in-network specialists without a referral and have reduced (but not eliminated) out-of-network coverage.",
        },
        {
          label: "Choice",
          desc: "An EPO-style network covering in-network providers only, with no out-of-network benefits except for emergencies.",
        },
        {
          label: "Navigate",
          desc: "A gatekeeper-style plan requiring a primary care provider and referrals for specialty care.",
        },
        {
          label: "Charter",
          desc: "A localized network plan with lower premiums and a more limited provider list.",
        },
        {
          label: "HMO / HDHP",
          desc: "HMO requires in-network providers and referrals; HDHP offers lower premiums with higher deductibles, often paired with an HSA.",
        },
      ]}
      parityBody="Under the Mental Health Parity and Addiction Equity Act of 2008, UnitedHealthcare is required to provide coverage for mental health and substance use disorder treatment comparable to coverage for medical and surgical care. UnitedHealthcare plans generally cannot impose stricter limits on behavioral health benefits than they do on other medical benefits."
      necessityBody="Coverage decisions are made by Optum Behavioral Health based on medical necessity. Substance use disorder decisions are guided by the ASAM Criteria; mental health decisions follow LOCUS and CALOCUS frameworks. Reviewers consider the severity of the condition, prior treatment history, co-occurring disorders, and the appropriate level of care."
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
          title: "Medication-Assisted Treatment (MAT)",
          body: "Covered for opioid use disorder, including buprenorphine, naltrexone, and methadone delivered through office-based providers or authorized opioid treatment programs.",
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
      oonNote="Choosing an in-network provider like Mountain View Treatment results in lower deductibles, lower coinsurance rates, and a lower out-of-pocket maximum. Members on Choice Plus plans may have out-of-network benefits at higher cost-sharing levels; members on Choice, Charter, or HMO plans generally have no out-of-network coverage except in emergencies."
      preAuthBody="Most UnitedHealthcare plans require pre-authorization for residential treatment, partial hospitalization, and intensive outpatient programs. Mountain View's clinical team submits documentation to Optum Behavioral Health to demonstrate that the requested level of care meets medical necessity criteria."
      concurrentBody="Once treatment begins, Optum conducts concurrent reviews at regular intervals to determine whether continued care remains medically necessary. Mountain View's utilization review team manages this process directly with Optum, advocating for the appropriate length of stay based on each individual's clinical progress."
      privacyBody="Treatment records are protected under federal law, including HIPAA and 42 CFR Part 2. UnitedHealthcare and Optum receive only the information necessary to process claims and authorize care. Employers, family members not involved in payment, and other third parties do not receive details of treatment without explicit written consent."
      privacyNote="Dependents covered under a family member's UnitedHealthcare plan, including adult children up to age 26, are entitled to the same confidentiality protections as the policyholder."
      vobIntro="Because coverage varies significantly between fully insured plans, self-funded employer plans, and individual marketplace plans, the most accurate way to understand benefits is through a verification of benefits. Mountain View's admissions team contacts UnitedHealthcare and Optum directly with the member's policy information."
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
          q: "Does UnitedHealthcare cover the full cost of treatment?",
          a: "Coverage depends on the specific plan, the level of care, and where the member is in their deductible and out-of-pocket maximum. Few plans cover 100% of treatment from the first day, but in-network care substantially reduces costs.",
        },
        {
          q: "My card says UnitedHealthcare but I was told my behavioral health is managed by Optum. Is that a separate plan?",
          a: "No. Optum Behavioral Health is UnitedHealthcare's behavioral health management division — both are part of UnitedHealth Group. Authorization and clinical reviews are handled by Optum, but the coverage itself is part of the UnitedHealthcare plan.",
        },
        {
          q: "What if my employer self-funds my UnitedHealthcare plan?",
          a: "Self-funded plans use UnitedHealthcare's network and administrative services, but the actual benefit design is set by the employer. Some self-funded plans have different limits or authorization requirements than standard UnitedHealthcare commercial plans, which is why benefits verification is especially important for these members.",
        },
        {
          q: "What happens if UnitedHealthcare denies coverage for a recommended level of care?",
          a: "Coverage decisions can be appealed. Mountain View's clinical team assists with appeals by providing documentation supporting medical necessity, and members have the right to external review under the Affordable Care Act.",
        },
        {
          q: "Are medications covered during treatment?",
          a: "Medications used in treatment, including those for MAT such as buprenorphine, naltrexone, and methadone, are generally covered under UnitedHealthcare's pharmacy or medical benefits, depending on how they are administered.",
        },
        {
          q: "Does using UnitedHealthcare for treatment affect future insurance rates?",
          a: "Under the Affordable Care Act, insurers cannot raise premiums or deny coverage based on a history of mental health or substance use treatment.",
        },
      ]}
    />
  );
}
