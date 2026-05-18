import GuideArticlePage from "./GuideArticlePage";

const BASE = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images";

export default function PayingForRehabPage() {
  return (
    <GuideArticlePage
      title="How to Pay for Drug Rehab in Washington State"
      intro="Cost should never stand between someone and addiction treatment. This guide breaks down insurance coverage, Washington State Medicaid, Employee Assistance Programs, financing options, and how to navigate insurance denials."
      readTime="11 min read"
      topics={["Insurance", "Cost", "Washington State", "Coverage"]}
      heroImage={`${BASE}/mvt_guide_insurance.jpg`}
      heroAlt="A professional desk with laptop and notes, researching addiction treatment costs and insurance"
      keyFacts={[
        { label: "PPO Plans Often Cover", value: "Partial–Full" },
        { label: "Mental Health Parity", value: "Law in WA" },
        { label: "Apple Health (Medicaid)", value: "Covers Some Tx" },
        { label: "Insurance Verification", value: "Free, 24/7" },
      ]}
      sections={[
        {
          heading: "Understanding Insurance Coverage for Addiction Treatment",
          body: [
            "Under the Affordable Care Act (ACA), substance use disorder treatment is classified as an Essential Health Benefit — meaning most health insurance plans sold in the individual or group marketplace must cover it. In practice, coverage varies significantly by plan type, network, and benefit tier.",
            "Most PPO (Preferred Provider Organization) plans cover some level of addiction treatment, though deductibles, copays, and prior authorization requirements vary. HMO plans may require in-network treatment only or a referral from a primary care physician. Before beginning treatment, our admissions team can verify your specific benefits — at no cost to you — typically within a few hours.",
          ],
          callout:
            "Mountain View Treatment is in-network with most major PPO plans. Call or submit your insurance information online to receive a free benefits verification with no obligation.",
        },
        {
          heading: "Washington State's Mental Health Parity Laws",
          body: [
            "Washington State has enacted mental health parity laws that require insurance plans regulated in-state to cover substance use disorder and mental health conditions at the same level as other medical conditions. This means insurers cannot impose more restrictive limitations (higher copays, lower visit caps, stricter prior authorization) on behavioral health care than they apply to comparable medical or surgical care.",
            "If you believe your insurer is applying discriminatory limitations to your addiction treatment coverage, you can file a complaint with the Washington State Office of the Insurance Commissioner (OIC). The OIC has enforcement authority and a dedicated mental health parity complaint process.",
            "Federal parity laws (the Mental Health Parity and Addiction Equity Act, or MHPAEA) provide a parallel layer of protection for self-insured employer health plans regulated under ERISA.",
          ],
          list: [
            "WA State parity: Insurance Commissioner (insurance.wa.gov)",
            "Federal MHPAEA: applies to employer self-insured plans (Department of Labor)",
            "File a parity complaint if co-pays or visit limits seem unusually restrictive",
            "Keep records of all coverage denials and appeal correspondence",
          ],
        },
        {
          heading: "Apple Health (Medicaid) and Treatment Options",
          body: [
            "Washington's Medicaid program, Apple Health, covers a range of substance use disorder treatment services for eligible enrollees. Coverage includes outpatient treatment, IOP, medication-assisted treatment (buprenorphine and methadone), and in some cases residential treatment.",
            "Apple Health is available to Washington residents at or below 138% of the federal poverty level. Enrollment is open year-round. Applications can be submitted online through Washington Healthplanfinder (wahealthplanfinder.org) or by calling 1-855-923-4633.",
            "Not all treatment providers accept Apple Health. King County Behavioral Health and Recovery Division (BHRD) manages a network of publicly funded providers. SAMHSA's treatment locator allows filtering by Medicaid acceptance.",
          ],
          list: [
            "Apply at wahealthplanfinder.org or call 1-855-923-4633",
            "Covers outpatient, IOP, and some residential treatment",
            "MAT (Suboxone, methadone) covered",
            "King County BHRD: kingcounty.gov/bhrd",
            "SAMHSA locator: findtreatment.gov — filter by Medicaid",
          ],
          callout:
            "If you earn above Medicaid limits but cannot afford private insurance, Washington's Basic Health Plan and qualified health plans through Washington Healthplanfinder may offer subsidized premiums.",
        },
        {
          heading: "Financing and Payment Plans for Private Treatment",
          body: [
            "For those without insurance coverage or with high out-of-pocket costs, several financing options can make private residential treatment accessible.",
            "Healthcare financing companies like Prosper Healthcare Lending, CareCredit, and MediBid offer low-interest or interest-deferred financing specifically for medical treatment, including addiction care. Terms typically range from 6 to 60 months.",
            "Mountain View Treatment also offers direct payment plans for clients who are paying out-of-pocket or have high deductibles. Our financial coordinators work with each client to identify the arrangement that makes treatment accessible without creating additional financial stress.",
          ],
          list: [
            "Prosper Healthcare Lending: personalloans designed for healthcare costs",
            "CareCredit: revolving credit for healthcare with promotional interest-free periods",
            "Mountain View direct payment plans: call admissions to discuss",
            "Family loans: structured formally with promissory notes for tax purposes",
            "Retirement account hardship withdrawals: consult a financial advisor first",
          ],
        },
        {
          heading: "Employee Assistance Programs (EAPs)",
          body: [
            "Most large employers (and many medium-sized ones) offer Employee Assistance Programs as a benefit. EAPs provide confidential counseling, referrals, and sometimes direct financial assistance for employees facing mental health or substance use challenges.",
            "EAP counseling is typically free for 3–8 sessions, and EAP coordinators can provide referrals to local treatment programs and help navigate insurance coverage. Importantly, EAP services are fully confidential — your employer receives only aggregate utilization data, never individual information.",
            "Contact your HR department or look in your benefits portal for EAP information. The toll-free number for your EAP is typically accessible 24/7.",
          ],
          callout:
            "EAPs are a grossly underutilized benefit. Many employees don't know their EAP covers addiction treatment referrals or offers free short-term counseling — it is worth calling before you do anything else.",
        },
        {
          heading: "How to Appeal an Insurance Denial",
          body: [
            "Insurance denials for addiction treatment are common — and many are overturned on appeal. Do not accept a denial as final. You have a legal right to a formal appeal process, and treatment facilities like Mountain View have staff experienced in assisting with clinical appeals.",
            "When you receive a denial, request the specific clinical criteria used to deny your claim (insurance companies are legally required to provide these). Ask your treatment provider to submit a clinical peer-to-peer review request — where your provider speaks directly with the insurance company's medical reviewer.",
            "If the internal appeal is unsuccessful, you can file an external independent review request — in Washington, managed through the OIC. External reviews are often free and result in reversal of denials at significant rates.",
          ],
          list: [
            "Request the specific denial reason and clinical criteria in writing",
            "Ask your provider to submit a peer-to-peer review immediately",
            "File a formal internal appeal within the deadline (usually 60–180 days)",
            "Simultaneously file a complaint with the WA Office of the Insurance Commissioner",
            "Request an independent external review if internal appeal fails",
            "Contact a patient advocate or attorney if the denial involves significant costs",
          ],
        },
      ]}
      relatedGuides={[
        {
          title: "Taking Leave for Rehab: WA PFML & FMLA Guide",
          href: "/guide/taking-leave-for-rehab-washington-state-pfml-fmla-guide/",
          excerpt: "How to protect your job and income while taking medical leave for addiction treatment.",
        },
        {
          title: "The Seattle Professional's Guide to Outpatient Treatment",
          href: "/guide/the-seattle-professionals-guide-to-outpatient-addiction-treatment/",
          excerpt: "Confidential, schedule-flexible treatment options for working professionals in Seattle.",
        },
        {
          title: "The Complete Guide to Drug and Alcohol Detox",
          href: "/guide/the-complete-guide-to-drug-and-alcohol-detox/",
          excerpt: "What medically supervised detox involves and how to access it in Seattle.",
        },
      ]}
    />
  );
}
