/** Topic cards — detail outside the FAQ accordion. */
export const DETOX_BILLING_ESSENTIALS = [
  {
    icon: "ri-hospital-line",
    title: "Revenue code 0116 & inpatient detox",
    body: "Institutional inpatient detox often bills with revenue code 0116 on UB-04 claims alongside appropriate bill types and H0008/H0009 HCPCS lines. Cipher aligns per diem rates, room-and-board exclusions, and facility billing rules before claims submitted to insurance companies.",
  },
  {
    icon: "ri-route-line",
    title: "Levels of detox care",
    body: "Hospital inpatient detox under 24/7 physician and nurse supervision differs from residential detox, ambulatory detox at home with medical professional oversight, and outpatient detox programs. Each setting uses distinct billing codes—Cipher prevents acuity mismatches that trigger disorder billing denials.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Dual diagnosis & concurrent MH",
    body: "Detox patients with co-occurring mental health needs careful billing coding so psychotherapy or psychiatric lines do not bundle incorrectly with detox per diem. Compliance requirements for dual diagnosis patients include separate auth and diagnosis codes where payers require them.",
  },
  {
    icon: "ri-logout-box-r-line",
    title: "AMA discharges & telehealth detox",
    body: "Patients who leave against medical advice need timely discharge documentation and correct patient status codes. Telehealth detox services follow payer telehealth policies—modifiers and POS must match the delivery model or reimbursement stalls.",
  },
] as const;
