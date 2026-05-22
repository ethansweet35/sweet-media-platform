/** Topic cards — expanded detail outside the FAQ accordion. */
export const RESIDENTIAL_BILLING_ESSENTIALS = [
  {
    icon: "ri-home-heart-line",
    title: "Residential vs IOP billing",
    body: "Residential treatment billing uses per diem HCPCS such as H0017 and H0018 with inpatient-level authorization—not the intensive outpatient program hours and codes used when patients step down to outpatient care. Cipher maintains separate crosswalks so level-of-care transitions do not overlap on the same dates.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "ASAM & medical necessity",
    body: "H0018 for short-term residential care often requires ASAM Level 3.5 documentation for substance use disorder treatment; mental health residential programs follow payer-specific medical necessity rules. MCG Health and ASAM criteria must support continued stay—Cipher aligns clinical notes for both disorder types.",
  },
  {
    icon: "ri-capsule-line",
    title: "Medication management & therapy",
    body: "Residential treatment facilities bill medication management, individual counseling, and group therapy when payers allow services outside the per diem. Cipher confirms whether psychotherapy CPT codes bundle into H0017 or bill separately—preventing claim denials on concurrent sessions.",
  },
  {
    icon: "ri-arrow-left-right-line",
    title: "Level-of-care transitions",
    body: "Any change in level of care—including PHP step-down or outpatient discharge—requires a new authorization number even within the same agency. Cipher handles residential-to-PHP and residential-to-outpatient billing implications before patients receive services at the new LOC.",
  },
] as const;
