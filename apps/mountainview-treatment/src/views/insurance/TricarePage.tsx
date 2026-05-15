import InsurancePage from "./InsurancePage";

const HERO_IMG =
  "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/03/admissions-1.webp";

export default function TricarePage() {
  return (
    <InsurancePage
      carrier="TRICARE"
      slug="tricare"
      heroImage={HERO_IMG}
      headline="TRICARE Coverage for Treatment at Mountain View"
      heroBody="Comprehensive behavioral health coverage for active duty service members, veterans, National Guard and Reserve members, and their families. Our admissions team verifies your TRICARE benefits at no cost."
      memberStat="9.6M"
      memberStatLabel="TRICARE beneficiaries worldwide"
      aboutBody="TRICARE is the health care program of the United States Department of Defense, managed by the Defense Health Agency (DHA). It provides comprehensive medical and behavioral health coverage to active duty service members, members of the National Guard and Reserve, military retirees, and their eligible family members and survivors — approximately 9.6 million beneficiaries worldwide. Unlike commercial insurance, TRICARE is a single federal program administered through regional contractors who handle network management, authorizations, and claims on DHA's behalf. Mountain View Treatment is a TRICARE-authorized facility and contracts as a network provider with the appropriate regional contractor."
      planTypes={[
        {
          label: "TRICARE Prime",
          desc: "A managed care option similar to an HMO, required for active duty service members. Most care is coordinated through a Primary Care Manager (PCM), and referrals are typically required for specialty care.",
        },
        {
          label: "TRICARE Select",
          desc: "A self-managed preferred provider organization option allowing beneficiaries to see any TRICARE-authorized provider without a referral, though pre-authorization is still required for certain services.",
        },
        {
          label: "TRICARE For Life",
          desc: "Medicare-wraparound coverage for TRICARE beneficiaries who are eligible for Medicare, typically retirees age 65 and older.",
        },
        {
          label: "TRICARE Reserve Select",
          desc: "A premium-based plan for qualified Selected Reserve members and their families.",
        },
        {
          label: "TRICARE Young Adult",
          desc: "Coverage for adult dependent children up to age 26 who have aged out of regular TRICARE eligibility.",
        },
      ]}
      parityBody="Federal regulations governing TRICARE require parity between behavioral health and other medical services. The Defense Health Agency has expanded behavioral health coverage in recent years by removing prior session limits and adding coverage for additional levels of care — including PHP and IOP — that were previously more restricted."
      necessityBody="Medical necessity is determined using established clinical criteria. For substance use disorder care, the regional contractor applies the ASAM Criteria, the standard clinical framework used across the field. Mental health level-of-care decisions follow evidence-based guidelines outlined in the TRICARE Policy Manual. PTSD treatment is a particular focus, including evidence-based therapies such as cognitive processing therapy, prolonged exposure, and EMDR."
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
          body: "Individual, family, and group psychotherapy, medication management, and aftercare planning.",
        },
        {
          title: "Medication-Assisted Treatment (MAT)",
          body: "Covered for opioid use disorder, including buprenorphine, naltrexone, and methadone delivered through office-based providers or TRICARE-authorized Opioid Treatment Programs.",
        },
      ]}
      outOfPocket={[
        {
          label: "Active Duty Members",
          desc: "Covered treatment is typically provided at no out-of-pocket cost for active duty service members.",
        },
        {
          label: "Cost-Share",
          desc: "For other beneficiaries, cost-shares apply based on plan type, sponsor status, and group classification (Group A or Group B).",
        },
        {
          label: "Catastrophic Cap",
          desc: "TRICARE's annual cap on total cost-sharing. Network providers accept the TRICARE-allowable charge as payment in full.",
        },
        {
          label: "Deductible",
          desc: "Annual deductibles apply to most TRICARE Select and Reserve plans; Prime enrollees generally have no annual deductible.",
        },
      ]}
      oonNote="Network providers like Mountain View Treatment accept the TRICARE-allowable charge as payment in full, so beneficiaries are responsible only for any applicable copayment, cost-share, or remaining deductible — not balance billing."
      preAuthBody="TRICARE requires pre-authorization for residential treatment, partial hospitalization, intensive outpatient programs, and substance use disorder treatment. Mountain View's clinical team submits documentation to the appropriate regional contractor to demonstrate that the requested level of care meets medical necessity criteria."
      concurrentBody="Once treatment begins, the regional contractor conducts concurrent reviews at regular intervals. Mountain View's utilization review team advocates for the appropriate length of stay. For active duty service members, additional coordination with the service member's command and the Defense Health Agency may be required — our admissions team is experienced in navigating these requirements."
      privacyBody="Treatment records are protected under federal law, including HIPAA and 42 CFR Part 2. TRICARE receives only the information necessary to process claims and authorize care. Seeking behavioral health care is generally protected and encouraged within the Department of Defense, and a wide range of treatment can be accessed without command notification."
      privacyNote="Certain situations — including specific safety-sensitive duties or fitness-for-duty concerns — may involve limited disclosures, but the scope of those disclosures is defined by DoD policy rather than discretionary."
      vobIntro="Because coverage varies between plan types, beneficiary categories, and group classifications, the most accurate way to understand benefits is through a verification of benefits. Mountain View's admissions team contacts the appropriate regional contractor with the beneficiary's policy information."
      vobBullets={[
        "Active TRICARE eligibility and plan type (Prime, Select, For Life, Reserve Select, etc.)",
        "Beneficiary category and group classification",
        "Network status and applicable cost-shares",
        "Annual deductible amount and how much has been met",
        "Catastrophic cap status",
        "Pre-authorization requirements for the recommended level of care",
        "Referral requirements, if applicable",
      ]}
      faqs={[
        {
          q: "Does TRICARE cover the full cost of treatment?",
          a: "For active duty service members, covered treatment is typically provided at no out-of-pocket cost. For other beneficiaries, cost-shares apply but are capped annually by the catastrophic cap, and network providers like Mountain View accept the TRICARE-allowable charge as payment in full.",
        },
        {
          q: "Do I need a referral to get treatment?",
          a: "TRICARE Prime enrollees typically require a referral from their Primary Care Manager for behavioral health care. TRICARE Select enrollees do not require a referral for most behavioral health services, but pre-authorization is still required for higher levels of care such as PHP and IOP.",
        },
        {
          q: "Will treatment affect my service member's career?",
          a: "Seeking behavioral health care is generally protected and encouraged within the Department of Defense. A wide range of treatment can be accessed without command notification. Certain safety-sensitive situations may involve limited disclosures defined by DoD policy — Mountain View's admissions team can help navigate these questions.",
        },
        {
          q: "What happens if TRICARE denies coverage for a recommended level of care?",
          a: "TRICARE coverage decisions can be appealed. Mountain View's clinical team assists with appeals by providing documentation supporting medical necessity. TRICARE has a formal appeals process with multiple levels of review.",
        },
        {
          q: "Are veterans eligible for treatment at Mountain View through TRICARE?",
          a: "Military retirees enrolled in TRICARE — including TRICARE For Life, TRICARE Retired Reserve, and other retiree plans — can access treatment through their TRICARE benefits. Veterans receiving care exclusively through the Department of Veterans Affairs use a separate benefit system.",
        },
        {
          q: "Are medications covered during treatment?",
          a: "Medications for MAT including buprenorphine, naltrexone, and methadone are covered under TRICARE's pharmacy or medical benefits, depending on how they are administered. Pre-authorization may be required for certain medications.",
        },
      ]}
    />
  );
}
