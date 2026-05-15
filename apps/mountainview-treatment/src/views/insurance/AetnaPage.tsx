import InsurancePage from "./InsurancePage";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/admissions-1.webp";

export default function AetnaPage() {
  return (
    <InsurancePage
      carrier="Aetna"
      slug="aetna"
      heroImage={HERO_IMG}
      headline="Mountain View Treatment Accepts Aetna Insurance"
      heroBody="In-network coverage for PHP, IOP, and outpatient care. Our admissions team verifies your Aetna benefits at no cost so you can focus on what matters — your recovery."
      memberStat="39M+"
      memberStatLabel="Aetna members served nationwide"
      aboutBody="Aetna is one of the largest health insurance carriers in the United States, serving approximately 39 million members through employer-sponsored plans, individual plans purchased through the Health Insurance Marketplace, Medicare Advantage, and Medicaid programs. Aetna is a subsidiary of CVS Health and operates a broad network of in-network behavioral health providers nationwide."
      planTypes={[
        {
          label: "HMO (Health Maintenance Organization)",
          desc: "Requires care from in-network providers and often a referral from a primary care physician.",
        },
        {
          label: "PPO (Preferred Provider Organization)",
          desc: "Offers flexibility to see in-network or out-of-network providers, with lower costs in-network.",
        },
        {
          label: "EPO (Exclusive Provider Organization)",
          desc: "Covers in-network providers only, no referral required.",
        },
        {
          label: "POS (Point of Service)",
          desc: "Combines HMO and PPO features, generally requiring referrals for specialists.",
        },
        {
          label: "HDHP (High-Deductible Health Plan)",
          desc: "Lower premiums paired with higher deductibles, often combined with an HSA.",
        },
      ]}
      parityBody="Under the Mental Health Parity and Addiction Equity Act of 2008, insurance carriers including Aetna are required to provide coverage for mental health and substance use disorder treatment that is comparable to coverage for medical and surgical care. This means Aetna plans generally cannot impose stricter limits on behavioral health benefits than they do on other medical benefits."
      necessityBody="Coverage decisions are based on medical necessity, typically determined using standardized clinical criteria such as the ASAM criteria for substance use treatment. Aetna reviews the severity of the condition, prior treatment history, co-occurring disorders, and the appropriate level of care."
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
        {
          label: "Deductible",
          desc: "The amount paid out-of-pocket before insurance begins covering services.",
        },
        {
          label: "Copayment",
          desc: "A fixed dollar amount paid for specific services, such as a therapy session.",
        },
        {
          label: "Coinsurance",
          desc: "A percentage of the service cost paid after the deductible is met.",
        },
        {
          label: "Out-of-Pocket Maximum",
          desc: "The annual cap on total cost-sharing, after which the plan pays 100% of covered services.",
        },
      ]}
      oonNote="Choosing an in-network provider like Mountain View Treatment generally results in lower deductibles, lower coinsurance rates, and a lower out-of-pocket maximum compared to out-of-network care."
      preAuthBody="Most Aetna plans require pre-authorization for residential treatment, partial hospitalization, and intensive outpatient programs. This process involves Mountain View's clinical team submitting documentation to Aetna to demonstrate that the requested level of care meets medical necessity criteria."
      concurrentBody="Once treatment begins, Aetna conducts concurrent reviews at regular intervals to determine whether continued care at the current level remains medically necessary. Mountain View's utilization review team manages this process directly with Aetna, advocating for the appropriate length of stay based on each individual's clinical progress."
      privacyBody="Treatment records are protected under federal law, including HIPAA and 42 CFR Part 2 — the federal regulation governing the confidentiality of substance use disorder treatment records. Aetna receives only the information necessary to process claims and authorize care. Employers, family members not involved in payment, and other third parties do not receive details of treatment without explicit written authorization from the patient."
      privacyNote="Dependents covered under a family member's Aetna plan, including adult children up to age 26, are entitled to the same confidentiality protections as the policyholder."
      vobIntro="Because coverage varies significantly between plans, the most accurate way to understand benefits is through a verification of benefits (VOB). Mountain View's admissions team can complete this process by contacting Aetna directly with the member's policy information."
      vobBullets={[
        "Whether the plan is active and in-network",
        "The deductible amount and how much has been met",
        "Coinsurance and copayment amounts",
        "Out-of-pocket maximum and progress toward it",
        "Pre-authorization requirements",
        "Coverage limits for specific levels of care",
      ]}
      faqs={[
        {
          q: "Does Aetna cover the full cost of treatment?",
          a: "Coverage depends on the specific plan, the level of care, and where the member is in their deductible and out-of-pocket maximum. Few plans cover 100% of treatment from the first day, but in-network care substantially reduces costs. Our admissions team will walk you through your exact benefits before you begin.",
        },
        {
          q: "What happens if Aetna denies coverage for a recommended level of care?",
          a: "Aetna decisions can be appealed. Mountain View's clinical team assists with appeals by providing documentation supporting medical necessity, and members have the right to external review under the Affordable Care Act.",
        },
        {
          q: "Are medications covered during treatment?",
          a: "Medications used in treatment, including those for medication-assisted treatment (MAT) such as buprenorphine, naltrexone, and methadone, are generally covered under Aetna's pharmacy or medical benefits, depending on how they are administered.",
        },
        {
          q: "Does using Aetna for treatment affect future insurance rates?",
          a: "Under the Affordable Care Act, insurers cannot raise premiums or deny coverage based on a history of mental health or substance use treatment.",
        },
      ]}
    />
  );
}
