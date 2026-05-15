import InsurancePage from "./InsurancePage";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/admissions-1.webp";

export default function AnthemPage() {
  return (
    <InsurancePage
      carrier="Anthem"
      slug="anthem"
      heroImage={HERO_IMG}
      headline="Anthem Insurance Coverage for Treatment at Mountain View"
      heroBody="In-network coverage through Anthem Blue Cross Blue Shield for PHP, IOP, and outpatient behavioral health care. Our admissions team verifies your Anthem benefits at no cost."
      memberStat="14 States"
      memberStatLabel="Anthem Blue Cross Blue Shield coverage"
      aboutBody="Anthem is one of the largest health insurance brands in the United States, operating as Anthem Blue Cross and Blue Shield across 14 states. Anthem is operated by Elevance Health, Inc. — the largest for-profit managed care company in the Blue Cross Blue Shield Association — covering tens of millions of members nationwide. Because Anthem is a licensed Blue Cross Blue Shield plan, members generally have access to the national BlueCard program, which allows in-network benefits to apply when receiving care from providers contracted with other BCBS plans across the country. Behavioral health benefits for many Anthem members are managed by Carelon Behavioral Health, an Elevance Health subsidiary."
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
      parityBody="Under the Mental Health Parity and Addiction Equity Act of 2008, Anthem is required to provide coverage for mental health and substance use disorder treatment comparable to coverage for medical and surgical care. Anthem plans generally cannot impose stricter limits on behavioral health benefits than they do on other medical benefits."
      necessityBody="Coverage decisions are based on medical necessity, typically determined using ASAM criteria for substance use treatment and MCG Health guidelines for mental health care. Anthem reviews the severity of the condition, prior treatment history, co-occurring disorders, and the appropriate level of care."
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
      oonNote="Choosing an in-network provider like Mountain View Treatment results in lower deductibles, lower coinsurance rates, and a lower out-of-pocket maximum. Anthem members traveling outside their home state may also receive in-network rates through the BlueCard program."
      preAuthBody="Most Anthem plans require pre-authorization for residential treatment, partial hospitalization, and intensive outpatient programs. Mountain View's clinical team submits documentation — often to Carelon Behavioral Health on Anthem's behalf — to demonstrate that the requested level of care meets medical necessity criteria."
      concurrentBody="Once treatment begins, Anthem (or Carelon) conducts concurrent reviews at regular intervals to determine whether continued care remains medically necessary. Mountain View's utilization review team manages this process directly, advocating for the appropriate length of stay."
      privacyBody="Treatment records are protected under federal law, including HIPAA and 42 CFR Part 2. Anthem receives only the information necessary to process claims and authorize care. Employers, family members not involved in payment, and other third parties do not receive details of treatment without explicit written authorization."
      privacyNote="Dependents covered under a family member's Anthem plan, including adult children up to age 26, are entitled to the same confidentiality protections as the policyholder."
      vobIntro="Because coverage varies significantly between plans and across the 14 states where Anthem operates, the most accurate way to understand benefits is through a verification of benefits (VOB). Mountain View's admissions team contacts Anthem directly with the member's policy information."
      vobBullets={[
        "Whether the plan is active and in-network (or eligible for BlueCard in-network coverage)",
        "The deductible amount and how much has been met",
        "Coinsurance and copayment amounts",
        "Out-of-pocket maximum and progress toward it",
        "Pre-authorization requirements and whether benefits are managed by Carelon",
        "Coverage limits for specific levels of care",
      ]}
      faqs={[
        {
          q: "Does Anthem cover the full cost of treatment?",
          a: "Coverage depends on the specific plan, the level of care, and where the member is in their deductible and out-of-pocket maximum. Few plans cover 100% of treatment from the first day, but in-network care substantially reduces costs.",
        },
        {
          q: "My card says Blue Cross Blue Shield but not Anthem. Am I still covered?",
          a: "Possibly. Anthem is the licensed Blue Cross Blue Shield plan in 14 states, and the BlueCard program allows members of other BCBS plans to access in-network care at facilities contracted with Anthem. A benefits verification will confirm how the plan applies.",
        },
        {
          q: "What happens if Anthem denies coverage for a recommended level of care?",
          a: "Anthem decisions can be appealed. Mountain View's clinical team assists with appeals by providing documentation supporting medical necessity, and members have the right to external review under the Affordable Care Act.",
        },
        {
          q: "Are medications covered during treatment?",
          a: "Medications used in treatment, including those for MAT such as buprenorphine, naltrexone, and methadone, are generally covered under Anthem's pharmacy or medical benefits, depending on how they are administered.",
        },
        {
          q: "Does using Anthem for treatment affect future insurance rates?",
          a: "Under the Affordable Care Act, insurers cannot raise premiums or deny coverage based on a history of mental health or substance use treatment.",
        },
      ]}
    />
  );
}
