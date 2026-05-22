/** Topic cards moved out of the FAQ accordion — still on-page for SEO and scanability. */
export const PHP_BILLING_ESSENTIALS = [
  {
    icon: "ri-hospital-line",
    title: "PHP vs inpatient psychiatric billing",
    body: "Acute inpatient stays use different revenue and bill types than partial hospitalization program services. PHP bills per diem HCPCS such as S0201, H0035, and H0015, revenue code 0912 for less intensive PHP, and often bill type 132 for interim first admission—distinct from full hospitalization claim paths.",
  },
  {
    icon: "ri-file-text-line",
    title: "Documentation & recertification",
    body: "PHP certification must be signed by a physician or clinical therapist. Payers require treatment plans, progress notes tied to hours rendered, and recertification on day eighteen, then every thirty days. Bill type 131 applies when joining PHP from inpatient discharge; 132 for interim first admission.",
  },
  {
    icon: "ri-user-shared-line",
    title: "Dual diagnosis & same-day therapy",
    body: "Patients with co-occurring mental health and substance use diagnoses are often limited to one billable PHP session per day. Separate psychotherapy must follow payer bundling rules—Cipher validates CPT and HCPCS before claim submissions so comorbid patients do not trigger duplicate-day denials.",
  },
  {
    icon: "ri-government-line",
    title: "Medicaid, Medicare & commercial payers",
    body: "State Medicaid programs set their own PHP fee schedules and prior authorization steps. Medicare and commercial plans vary on per diem vs hourly models and covered health services. Cipher applies payer-specific billing guidelines—not one template for every health provider.",
  },
] as const;
